import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Wallet } from 'lucide-react';
import { detectBrowser } from '@/src/lib/compatibility/browser';

export default function WalletConnect() {
  const env = detectBrowser();

  if (env.isIMBrowser && !env.hasEthereum) {
    return (
      <button
        onClick={() => {
          const link = `https://metamask.app.link/dapp/${window.location.host}${window.location.pathname}`;
          window.location.href = link;
        }}
        className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl text-sm font-medium hover:opacity-90 transition-opacity"
      >
        <Wallet className="w-4 h-4" />
        在钱包中打开
      </button>
    );
  }

  return (
    <ConnectButton
      chainStatus="icon"
      accountStatus="avatar"
      showBalance={false}
    />
  );
}
