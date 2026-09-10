import { 
  Building2, 
  QrCode, 
  FlaskConical, 
  Scan, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight,
  Layers,
  FileCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export function HowItWorksPage() {
  const { setCurrentPage } = useApp();

  return (
    <div id="how-it-works-page" className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider">
          Transparency Architecture
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-display mt-3">
          How TrustMark Verifies Brand Quality
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-3 leading-relaxed">
          From verified organic harvests in Kashmir and Maharashtra to consumer kitchens across India — learn how our cryptographic batch verification eliminates counterfeiting.
        </p>
      </div>

      {/* 4 Steps Timeline */}
      <div className="space-y-12 relative before:absolute before:inset-0 before:left-8 md:before:left-1/2 before:-translate-x-1/2 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
        
        {/* Step 1 */}
        <div className="relative flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2 md:text-right order-2 md:order-1">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Step 01</span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">Brand Registration & Statutory KYC</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
              Legitimate manufacturers register their GSTIN, FSSAI Food Licenses, and Ayush certifications. Every brand undergoes document validation before any product can be serialized.
            </p>
          </div>
          <div className="w-16 h-16 rounded-3xl bg-emerald-600 text-white flex items-center justify-center font-display text-xl font-bold z-10 shadow-lg shadow-emerald-600/30 order-1 md:order-2 shrink-0">
            <Building2 className="w-7 h-7" />
          </div>
          <div className="md:w-1/2 order-3">
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-xs">
              <span className="font-bold text-slate-900 dark:text-white">Validation Standards:</span>
              <ul className="mt-1 space-y-1 text-slate-500">
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> FSSAI Central/State Food License Check</li>
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> GSTIN Taxpayer Authenticity Clearance</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="relative flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2 order-2 md:order-1">
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-xs">
              <span className="font-bold text-slate-900 dark:text-white">Assay Parameters Tested:</span>
              <ul className="mt-1 space-y-1 text-slate-500">
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Active marker potency (e.g. Crocin, Curcumin)</li>
                <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Heavy metal limits (Lead, Arsenic, Cadmium)</li>
              </ul>
            </div>
          </div>
          <div className="w-16 h-16 rounded-3xl bg-indigo-600 text-white flex items-center justify-center font-display text-xl font-bold z-10 shadow-lg shadow-indigo-600/30 shrink-0">
            <FlaskConical className="w-7 h-7" />
          </div>
          <div className="md:w-1/2 order-3">
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">Step 02</span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">Batch Sourcing & NABL Lab Analysis</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
              When a production run finishes, composite samples are tested at accredited analytical laboratories. Passing Certificates of Analysis (CoA) are uploaded directly to the batch record.
            </p>
          </div>
        </div>

        {/* Step 3 */}
        <div className="relative flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2 md:text-right order-2 md:order-1">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Step 03</span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">Cryptographic Serialization & QR Etching</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
              TrustMark generates a unique dynamic QR code for each specific batch. The code is embedded directly into regulatory packaging labels alongside tamper-evident holographic seals.
            </p>
          </div>
          <div className="w-16 h-16 rounded-3xl bg-slate-900 dark:bg-slate-800 text-white flex items-center justify-center font-display text-xl font-bold z-10 shadow-lg shrink-0">
            <QrCode className="w-7 h-7" />
          </div>
          <div className="md:w-1/2 order-3">
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-xs">
              <span className="font-bold text-slate-900 dark:text-white">Tamper Protection:</span>
              <p className="text-slate-500 mt-1">
                Each QR is cryptographically hashed. Any cloned QR codes trigger automatic anomaly alerts if scanned concurrently across distant regions.
              </p>
            </div>
          </div>
        </div>

        {/* Step 4 */}
        <div className="relative flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2 order-2 md:order-1">
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-xs">
              <span className="font-bold text-slate-900 dark:text-white">Customer Assurance:</span>
              <p className="text-slate-500 mt-1">
                Instant reassurance in under 2 seconds right at the retail counter before purchasing.
              </p>
            </div>
          </div>
          <div className="w-16 h-16 rounded-3xl bg-emerald-600 text-white flex items-center justify-center font-display text-xl font-bold z-10 shadow-lg shadow-emerald-600/30 shrink-0">
            <Scan className="w-7 h-7" />
          </div>
          <div className="md:w-1/2 order-3">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Step 04</span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">Consumer Scans & Verifies in Seconds</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
              Customers scan with any smartphone camera or enter the batch code to open the comprehensive Digital Product Passport, inspect genuine lab scores, and submit verified feedback.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive CTA */}
      <div className="mt-16 text-center">
        <button
          onClick={() => setCurrentPage('verify')}
          className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-lg shadow-emerald-600/20 inline-flex items-center gap-2"
        >
          <span>Try Verifying a Demo Product</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
