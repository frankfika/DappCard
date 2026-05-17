import { useEffect, useState } from 'react';
import { AlertTriangle, Copy, ExternalLink, X } from 'lucide-react';
import {
  detectBrowser,
  getIMBrowserName,
  getWalletConnectDeepLink,
  copyCurrentUrl,
  type IMBrowser,
} from '@/src/lib/compatibility/browser';
import { getIMAdapter } from '@/src/lib/compatibility/im-adapters';

export default function IMBrowserNotice() {
  const [visible, setVisible] = useState(false);
  const [browser, setBrowser] = useState<IMBrowser>('none');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const env = detectBrowser();
    if (env.isIMBrowser) {
      setBrowser(env.imBrowser);
      setVisible(true);
    }
  }, []);

  if (!visible || browser === 'none') return null;

  const adapter = getIMAdapter(browser);
  const deepLink = getWalletConnectDeepLink(detectBrowser());

  const handleCopy = async () => {
    await copyCurrentUrl();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenExternal = () => {
    if (deepLink) {
      window.location.href = deepLink;
    } else {
      handleCopy();
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] bg-amber-50 border-b border-amber-200 px-4 py-3">
      <div className="max-w-md mx-auto flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-amber-900">
            {getIMBrowserName(browser)}内置浏览器限制
          </p>
          <p className="text-xs text-amber-700 mt-1">{adapter.tipMessage}</p>
          <div className="flex gap-2 mt-2">
            <button
              onClick={handleOpenExternal}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-amber-600 text-white text-xs rounded-lg hover:bg-amber-700 transition-colors"
            >
              {deepLink ? (
                <>
                  <ExternalLink className="w-3.5 h-3.5" />
                  {adapter.actionLabel}
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  {copied ? '已复制' : adapter.actionLabel}
                </>
              )}
            </button>
          </div>
        </div>
        <button
          onClick={() => setVisible(false)}
          className="shrink-0 text-amber-500 hover:text-amber-700 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
