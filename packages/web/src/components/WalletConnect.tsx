import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ChevronDown, Wallet } from 'lucide-react';
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
        className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3.5 py-2 text-sm font-semibold text-amber-700 transition-colors hover:bg-amber-100"
      >
        <Wallet className="w-4 h-4" />
        在钱包中打开
      </button>
    );
  }

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        mounted,
        authenticationStatus,
        openAccountModal,
        openChainModal,
        openConnectModal,
      }) => {
        const ready = mounted && authenticationStatus !== 'loading';
        const connected = ready && account && chain && (!authenticationStatus || authenticationStatus === 'authenticated');

        if (!connected) {
          return (
            <button
              onClick={openConnectModal}
              type="button"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3.5 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
            >
              <Wallet className="h-4 w-4" />
              连接钱包
            </button>
          );
        }

        return (
          <div className="flex items-center gap-2">
            <button
              onClick={openChainModal}
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/70 text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
              title={chain.name ?? '切换网络'}
            >
              {chain.hasIcon ? (
                <div
                  className="h-4 w-4 overflow-hidden rounded-full"
                  style={{ background: chain.iconBackground }}
                >
                  {chain.iconUrl ? (
                    <img
                      alt={chain.name ?? 'Chain icon'}
                      src={chain.iconUrl}
                      className="h-4 w-4"
                    />
                  ) : null}
                </div>
              ) : (
                <Wallet className="h-4 w-4" />
              )}
            </button>
            <button
              onClick={openAccountModal}
              type="button"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3.5 py-2 text-sm font-semibold text-foreground transition-colors hover:border-foreground"
            >
              <span className="max-w-[96px] truncate">{account.displayName}</span>
              <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
            </button>
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}
