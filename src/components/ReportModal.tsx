import { useState, FormEvent } from 'react';
import { X, AlertTriangle, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { Product, Batch, ProductReport } from '../types';
import { useApp } from '../context/AppContext';

interface ReportModalProps {
  product: Product;
  batch?: Batch;
  onClose: () => void;
}

export function ReportModal({ product, batch, onClose }: ReportModalProps) {
  const { reportCounterfeit, currentUser, businesses } = useApp();

  const brand = businesses.find((b) => b.id === product.brandId);

  const [reportedBy, setReportedBy] = useState(currentUser.name || '');
  const [contact, setContact] = useState(currentUser.phone || currentUser.email || '');
  const [reason, setReason] = useState<ProductReport['reason']>('Suspected Counterfeit');
  const [purchaseLocation, setPurchaseLocation] = useState('');
  const [evidenceNotes, setEvidenceNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!evidenceNotes.trim()) return;

    reportCounterfeit({
      productId: product.id,
      productName: product.name,
      brandName: brand?.name || 'Verified Brand',
      batchNumber: batch?.batchNumber || 'UNKNOWN',
      reportedBy: reportedBy.trim() || 'Anonymous Consumer',
      contact: contact.trim() || 'Not Provided',
      reason,
      purchaseLocation: purchaseLocation.trim() || 'Retail / Online Store',
      evidenceNotes: evidenceNotes.trim()
    });

    setSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 2200);
  };

  return (
    <div 
      id="report-counterfeit-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150"
    >
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 text-slate-900 dark:text-white max-h-[90vh] overflow-y-auto">
        <button
          id="btn-close-report-modal"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Report Submitted to Compliance</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-sm mx-auto">
              Incident ticket has been generated. Our national compliance team and the brand manufacturer will investigate this batch immediately.
            </p>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Report Counterfeit or Tampered Batch</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Protect Indian consumers. All reports are verified by TrustMark compliance officers.
                </p>
              </div>
            </div>

            {/* Targeted Product Info */}
            <div className="p-3 mb-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-700/60 text-xs">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Product: </span>
              <span className="text-slate-900 dark:text-white font-medium">{product.name}</span>
              <div className="mt-1 flex items-center gap-4 text-slate-500 dark:text-slate-400">
                <span>Brand: <strong>{brand?.name}</strong></span>
                <span>Batch: <strong className="font-mono text-emerald-600 dark:text-emerald-400">{batch?.batchNumber || 'N/A'}</strong></span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={reportedBy}
                    onChange={(e) => setReportedBy(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                    Contact Phone / Email
                  </label>
                  <input
                    type="text"
                    required
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="+91 98765 43210 or email"
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                  Reason for Report
                </label>
                <select
                  value={reason}
                  onChange={(e) => setReason(e.target.value as ProductReport['reason'])}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                >
                  <option value="Suspected Counterfeit">Suspected Counterfeit / Fake Product</option>
                  <option value="Broken Tamper Seal">Broken Tamper-Evident Seal on Arrival</option>
                  <option value="Expired Product">Sold Past Expiry Date</option>
                  <option value="Quality Issue">Severe Quality / Odor / Color Defect</option>
                  <option value="Mislabeling">Misleading or Missing FSSAI/Ingredients Label</option>
                  <option value="Other">Other Suspicious Activity</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                  Purchase Location / Retailer
                </label>
                <input
                  type="text"
                  value={purchaseLocation}
                  onChange={(e) => setPurchaseLocation(e.target.value)}
                  placeholder="e.g. Local Kirana Store in Dadar Mumbai or E-commerce Seller Name"
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                  Evidence & Detailed Observation
                </label>
                <textarea
                  rows={3}
                  required
                  value={evidenceNotes}
                  onChange={(e) => setEvidenceNotes(e.target.value)}
                  placeholder="Describe why you believe this is counterfeit (e.g., blurry logo, missing holographic strip, unusual taste, QR code returned 404)..."
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-amber-500 focus:outline-none resize-none"
                />
              </div>

              <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200/80 dark:border-amber-900/50 flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <p className="text-[11px] text-amber-800 dark:text-amber-300 leading-tight">
                  False reporting is penalized. Genuine reports safeguard consumer health and assist brand protection authorities.
                </p>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-medium rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  id="btn-submit-counterfeit-report"
                  className="px-4 py-2 text-xs font-semibold rounded-xl bg-amber-600 hover:bg-amber-700 text-white shadow-sm transition-colors"
                >
                  Submit Incident Report
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
