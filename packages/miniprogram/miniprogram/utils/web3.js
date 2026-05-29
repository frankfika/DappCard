// 小程序端链上数据读取工具（纯查询，无需签名）
// 通过 RPC 节点直接调用合约 view 函数

const RPC_ENDPOINTS = {
  11155111: 'https://rpc.sepolia.org',
  84532: 'https://sepolia.base.org',
  421614: 'https://sepolia-rollup.arbitrum.io/rpc',
  80002: 'https://rpc-amoy.polygon.technology',
};

// 预计算的函数 selector（keccak256 前 4 字节）
const FUNCTION_SELECTORS = {
  getLatestProfile: '0xedb82346',
  getUserEntries: '0x904181d0',
  getEntry: '0xb319c9e4',
};

function encodeAddressParam(address) {
  return address.toLowerCase().replace('0x', '').padStart(64, '0');
}

function encodeStringParam(str) {
  // ABI encode string: offset (32 bytes) + length (32 bytes) + data (padded)
  const encoder = new TextEncoder();
  const bytes = encoder.encode(str);
  const length = bytes.length;
  // offset is always 32 (0x20) for a single dynamic param
  const offsetHex = '0000000000000000000000000000000000000000000000000000000000000020';
  const lengthHex = length.toString(16).padStart(64, '0');
  let dataHex = '';
  for (const b of bytes) {
    dataHex += b.toString(16).padStart(2, '0');
  }
  // pad to 32-byte boundary
  const padLength = Math.ceil(dataHex.length / 64) * 64;
  dataHex = dataHex.padEnd(padLength, '0');
  return offsetHex + lengthHex + dataHex;
}

function decodeStringResult(hex) {
  if (!hex || hex === '0x' || hex.length < 130) return '';
  try {
    const offset = parseInt(hex.slice(2, 66), 16) * 2;
    const length = parseInt(hex.slice(66, 130), 16) * 2;
    const start = 130 + offset;
    const strHex = hex.slice(start, start + length);
    if (!strHex) return '';
    const bytes = [];
    for (let i = 0; i < strHex.length; i += 2) {
      bytes.push(parseInt(strHex.slice(i, i + 2), 16));
    }
    return new TextDecoder().decode(new Uint8Array(bytes));
  } catch {
    return '';
  }
}

function getContractAddress(chainId) {
  const addresses = {
    11155111: '0x0000000000000000000000000000000000000000',
    84532: '0x0000000000000000000000000000000000000000',
    421614: '0x0000000000000000000000000000000000000000',
    80002: '0x0000000000000000000000000000000000000000',
  };
  return addresses[chainId] || null;
}

function makeEthCall(rpcUrl, to, data) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: rpcUrl,
      method: 'POST',
      header: { 'Content-Type': 'application/json' },
      data: {
        jsonrpc: '2.0',
        id: Date.now(),
        method: 'eth_call',
        params: [{ to, data }, 'latest'],
      },
      success: (res) => {
        if (res.statusCode === 200 && res.data && !res.data.error) {
          resolve(res.data.result);
        } else {
          reject(res.data?.error || new Error('RPC call failed'));
        }
      },
      fail: reject,
    });
  });
}

module.exports = {
  /**
   * 查询用户最新的链上名片 IPFS 哈希
   */
  async getLatestProfile(walletAddress, chainId = 84532) {
    const contractAddr = getContractAddress(chainId);
    const rpcUrl = RPC_ENDPOINTS[chainId];
    if (!contractAddr || !rpcUrl || contractAddr === '0x0000000000000000000000000000000000000000') {
      return null;
    }

    try {
      const data = FUNCTION_SELECTORS.getLatestProfile + encodeAddressParam(walletAddress);
      const result = await makeEthCall(rpcUrl, contractAddr, data);
      const ipfsHash = decodeStringResult(result);
      return ipfsHash || null;
    } catch (error) {
      console.error('getLatestProfile failed:', error);
      return null;
    }
  },

  /**
   * 从 IPFS 读取内容
   */
  async fetchFromIPFS(ipfsHash) {
    if (!ipfsHash || ipfsHash.startsWith('QmMock')) return null;

    const gateways = [
      `https://gateway.pinata.cloud/ipfs/${ipfsHash}`,
      `https://ipfs.io/ipfs/${ipfsHash}`,
    ];

    for (const url of gateways) {
      try {
        const res = await new Promise((resolve, reject) => {
          wx.request({ url, timeout: 8000, success: resolve, fail: reject });
        });
        if (res.statusCode === 200 && res.data) {
          return res.data;
        }
      } catch {
        continue;
      }
    }
    return null;
  },

  /**
   * 获取用户链上所有条目
   */
  async getUserEntries(walletAddress, chainId = 84532) {
    const contractAddr = getContractAddress(chainId);
    const rpcUrl = RPC_ENDPOINTS[chainId];
    if (!contractAddr || !rpcUrl) {
      return [];
    }

    try {
      const data = FUNCTION_SELECTORS.getUserEntries + encodeAddressParam(walletAddress);
      const result = await makeEthCall(rpcUrl, contractAddr, data);
      if (result) {
        return [{ rawResult: result }];
      }
      return [];
    } catch (error) {
      console.error('getUserEntries failed:', error);
      return [];
    }
  },

  /**
   * 获取单个条目详情
   */
  async getEntry(ipfsHash, chainId = 84532) {
    const contractAddr = getContractAddress(chainId);
    const rpcUrl = RPC_ENDPOINTS[chainId];
    if (!contractAddr || !rpcUrl || !ipfsHash) {
      return null;
    }

    try {
      const data = FUNCTION_SELECTORS.getEntry + encodeStringParam(ipfsHash);
      const result = await makeEthCall(rpcUrl, contractAddr, data);
      if (result) {
        return { rawResult: result };
      }
      return null;
    } catch (error) {
      console.error('getEntry failed:', error);
      return null;
    }
  },
};
