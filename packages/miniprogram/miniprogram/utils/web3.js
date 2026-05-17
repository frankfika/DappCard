// 小程序端链上数据读取工具（纯查询，无需签名）
// 通过 RPC 节点直接调用合约 view 函数

const RPC_ENDPOINTS = {
  11155111: 'https://rpc.sepolia.org',
  84532: 'https://sepolia.base.org',
  421614: 'https://sepolia-rollup.arbitrum.io/rpc',
  80002: 'https://rpc-amoy.polygon.technology',
};

const CONTRACT_ABI = [
  {
    inputs: [{ name: 'user', type: 'address' }],
    name: 'getLatestProfile',
    outputs: [{ name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ name: 'user', type: 'address' }],
    name: 'getUserEntries',
    outputs: [
      {
        components: [
          { name: 'contentType', type: 'string' },
          { name: 'ipfsHash', type: 'string' },
          { name: 'contentHash', type: 'bytes32' },
          { name: 'timestamp', type: 'uint256' },
          { name: 'chainId', type: 'uint256' },
        ],
        name: 'entries',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ name: 'ipfsHash', type: 'string' }],
    name: 'getEntry',
    outputs: [
      {
        components: [
          { name: 'contentType', type: 'string' },
          { name: 'ipfsHash', type: 'string' },
          { name: 'contentHash', type: 'bytes32' },
          { name: 'timestamp', type: 'uint256' },
          { name: 'chainId', type: 'uint256' },
        ],
        name: 'entry',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];

// 简单的 keccak256 方法名编码
function encodeFunctionCall(methodName, params) {
  // 小程序没有 ethers.js，用简单的 hex 编码
  // 只支持 address 类型的单参数函数
  if (params[0].type === 'address') {
    const methodSig = methodName + '(address)';
    // 简化的方法 ID：取前 8 个 hex 字符
    const methodId = simpleHash(methodSig).slice(0, 8);
    const paddedAddress = params[0].value.toLowerCase().replace('0x', '').padStart(64, '0');
    return '0x' + methodId + paddedAddress;
  }
  if (params[0].type === 'string') {
    // 字符串编码较复杂，小程序端暂不支持
    return null;
  }
  return null;
}

function simpleHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash + char) | 0;
  }
  return Math.abs(hash).toString(16).padStart(64, '0');
}

function decodeStringResult(hex) {
  if (!hex || hex === '0x' || hex.length < 130) return null;
  try {
    const offset = parseInt(hex.slice(2, 66), 16) * 2;
    const length = parseInt(hex.slice(66, 130), 16) * 2;
    if (offset + 64 + length > hex.length * 2) return null;
    const strHex = hex.slice(130 + offset, 130 + offset + length);
    if (!strHex) return null;
    const bytes = [];
    for (let i = 0; i < strHex.length; i += 2) {
      bytes.push(parseInt(strHex.slice(i, i + 2), 16));
    }
    return new TextDecoder().decode(new Uint8Array(bytes));
  } catch {
    return null;
  }
}

function getContractAddress(chainId) {
  // 小程序端硬编码的测试网合约地址
  // TODO: 部署后更新
  const addresses = {
    11155111: '0x0000000000000000000000000000000000000000',
    84532: '0x0000000000000000000000000000000000000000',
    421614: '0x0000000000000000000000000000000000000000',
    80002: '0x0000000000000000000000000000000000000000',
  };
  return addresses[chainId] || null;
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
      const data = encodeFunctionCall('getLatestProfile', [{ type: 'address', value: walletAddress }]);
      if (!data) return null;

      const res = await wx.request({
        url: rpcUrl,
        method: 'POST',
        header: { 'Content-Type': 'application/json' },
        data: {
          jsonrpc: '2.0',
          id: 1,
          method: 'eth_call',
          params: [{ to: contractAddr, data }, 'latest'],
        },
      });

      if (res.statusCode === 200 && res.data.result) {
        return decodeStringResult(res.data.result);
      }
      return null;
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
        const res = await wx.request({ url, timeout: 8000 });
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
      const data = encodeFunctionCall('getUserEntries', [{ type: 'address', value: walletAddress }]);
      if (!data) return [];

      const res = await wx.request({
        url: rpcUrl,
        method: 'POST',
        header: { 'Content-Type': 'application/json' },
        data: {
          jsonrpc: '2.0',
          id: 1,
          method: 'eth_call',
          params: [{ to: contractAddr, data }, 'latest'],
        },
      });

      if (res.statusCode === 200 && res.data.result) {
        // 解码数组结果需要 ABI decoder，小程序端暂返回原始数据
        // 实际项目中可以通过云函数做解码
        return [{ rawResult: res.data.result }];
      }
      return [];
    } catch (error) {
      console.error('getUserEntries failed:', error);
      return [];
    }
  },
};
