import { useState, useEffect } from 'react';
import { X, Copy, Check, Share2, MessageCircle, ExternalLink } from 'lucide-react';
import { Product, Batch } from '../types';
import { generateQrDataUrl } from '../utils/qrHelper';
import { useApp } from '../context/AppContext';

interface ShareModalProps {
  product: Product;
  batch?: Batch;
  onClose: () => void;
}

export function ShareModal({ product, batch, onClose }: ShareModalProps) {
  const { showToast } = useApp();
  const [copied, setCopied] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');

  const shareUrl = `${window.location.origin}/?code=${batch?.batchNumber || product.sku}`;
  const shareText = `Check verified authenticity of ${product.name} (Batch: ${batch?.batchNumber || 'Verified'}) on TrustMark Digital Product Passport!`;

  useEffect(() => {
    generateQrDataUrl(shareUrl, { width: 160 }).then(setQrDataUrl);
  }, [shareUrl]);

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    showToast('Passport link copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 3000);
  };

  const shareWhatsapp = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const shareTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const shareLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      id="share-passport-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150"
    >
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 text-slate-900 dark:text-white">
        <button
          id="btn-close-share-modal"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
            <Share2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold">Share Digital Passport</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Share verifiable authenticity proof with customers</p>
          </div>
        </div>

        {/* QR Code and Product Info */}
        <div className="flex items-center gap-4 p-3.5 mb-5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-700/60">
          {qrDataUrl ? (
            <img src={qrDataUrl} alt="Passport QR" className="w-20 h-20 rounded-lg bg-white p-1 shrink-0 shadow-sm" />
          ) : (
            <div className="w-20 h-20 rounded-lg bg-slate-200 dark:bg-slate-700 animate-pulse shrink-0" />
          )}
          <div className="min-w-0">
            <h4 className="text-sm font-semibold truncate">{product.name}</h4>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-mono mt-0.5">
              Batch: {batch?.batchNumber || 'VERIFIED'}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Score: <span className="font-bold text-slate-800 dark:text-slate-200">{product.trustScore}/100</span>
            </p>
          </div>
        </div>

        {/* Copy link input */}
        <div className="mb-5">
          <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
            Direct Passport URL
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="flex-1 px-3 py-2 text-xs font-mono rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 truncate focus:outline-none"
            />
            <button
              id="btn-copy-share-link"
              onClick={handleCopy}
              className="px-3 py-2 text-xs font-semibold rounded-xl bg-slate-900 text-white dark:bg-slate-700 hover:bg-slate-800 dark:hover:bg-slate-600 flex items-center gap-1.5 shrink-0 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>

        {/* Share buttons */}
        <div className="grid grid-cols-3 gap-2.5">
          <button
            id="btn-share-whatsapp"
            onClick={shareWhatsapp}
            className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp</span>
          </button>
          <button
            id="btn-share-twitter"
            onClick={shareTwitter}
            className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-white text-xs font-semibold shadow-sm transition-colors"
          >
            <span>X (Twitter)</span>
          </button>
          <button
            id="btn-share-linkedin"
            onClick={shareLinkedIn}
            className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-sky-700 hover:bg-sky-800 text-white text-xs font-semibold shadow-sm transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            <span>LinkedIn</span>
          </button>
        </div>
      </div>
    </div>
  );
}
