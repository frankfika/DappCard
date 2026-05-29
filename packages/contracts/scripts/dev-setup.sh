#!/bin/bash
# 一键启动本地开发环境
# 用法: bash scripts/dev-setup.sh

echo "🚀 启动本地 Hardhat 节点..."
npx hardhat node &
NODE_PID=$!
sleep 3

echo "📦 部署合约到本地网络..."
npx hardhat run scripts/deploy.js --network localhost

echo ""
echo "✅ 本地开发环境已启动！"
echo "   RPC: http://127.0.0.1:8545"
echo "   Chain ID: 31337"
echo ""
echo "📌 MetaMask 配置:"
echo "   网络名称: Hardhat Local"
echo "   RPC URL: http://127.0.0.1:8545"
echo "   Chain ID: 31337"
echo "   货币符号: ETH"
echo ""
echo "📌 导入测试账户到 MetaMask:"
echo "   私钥: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
echo ""
echo "按 Ctrl+C 停止本地节点"
echo ""

wait $NODE_PID
