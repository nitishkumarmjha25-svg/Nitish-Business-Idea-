import { useState, useEffect, FormEvent } from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  MapPin, 
  Calendar, 
  Building2, 
  Award, 
  FileText, 
  Star, 
  Share2, 
  AlertTriangle, 
  QrCode, 
  Download, 
  ExternalLink, 
  Check, 
  Sparkles, 
  ArrowLeft,
  ChevronRight,
  Fingerprint,
  Layers,
  FlaskConical,
  Clock,
  ThumbsUp,
  MessageSquare
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ShareModal } from './ShareModal';
import { ReportModal } from './ReportModal';
import { generateQrDataUrl } from '../utils/qrHelper';

export function ProductPassportPage() {
  const { 
    activeProductId, 
    activeBatchId, 
    products, 
    batches, 
    businesses, 
    reviews, 
    addReview,
    currentUser,
    setCurrentPage,
    t,
    showToast 
  } = useApp();

  const product = products.find((p) => p.id === activeProductId) || products[0];
  const batch = batches.find((b) => b.id === activeBatchId || b.productId === product.id) || batches[0];
  const brand = businesses.find((b) => b.id === product.brandId) || businesses[0];

  const [activeTab, setActiveTab] = useState<'overview' | 'origin' | 'quality' | 'reviews'>('overview');
  const [showShareModal, setShowShareModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [batchQrUrl, setBatchQrUrl] = useState<string>('');

  // Review Form State
  const [rating, setRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);

  // Generate QR for active batch
  useEffect(() => {
    if (batch) {
      const qrTarget = `${window.location.origin}/?code=${batch.batchNumber}`;
      generateQrDataUrl(qrTarget, { width: 220, darkColor: '#0a192f' }).then(setBatchQrUrl);
    }
  }, [batch]);

  // Product reviews
  const productReviews = reviews.filter((r) => r.productId === product.id && r.status === 'published');
  const avgRating = productReviews.length > 0
    ? (productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length).toFixed(1)
    : '5.0';

  const handleReviewSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!reviewComment.trim()) return;

    setSubmittingReview(true);
    addReview({
      productId: product.id,
      batchNumber: batch?.batchNumber,
      userId: currentUser.id,
      userName: currentUser.name,
      userAvatar: currentUser.avatar,
      userCity: 'Verified Indian Consumer',
      rating,
      title: reviewTitle.trim() || 'Verified Quality Feedback',
      comment: reviewComment.trim(),
      verifiedPurchase: true,
      sentiment: rating >= 4 ? 'positive' : rating === 3 ? 'neutral' : 'negative'
    });

    setReviewTitle('');
    setReviewComment('');
    setRating(5);
    setSubmittingReview(false);
  };

  const handlePrintCertificate = () => {
    window.print();
  };

  return (
    <div id="product-passport-page" className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      
      {/* Top Back & Status Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 no-print">
        <button
          id="btn-back-verify"
          onClick={() => setCurrentPage('verify')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Verify Another Batch</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            id="btn-open-share-modal"
            onClick={() => setShowShareModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shadow-sm"
          >
            <Share2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>{t('shareProduct')}</span>
          </button>
          <button
            id="btn-open-report-modal"
            onClick={() => setShowReportModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/50 dark:bg-rose-950/40 text-xs font-semibold text-rose-700 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/60 transition-colors"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Report Counterfeit</span>
            <span className="sm:hidden">Report</span>
          </button>
          <button
            id="btn-print-passport"
            onClick={handlePrintCertificate}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 dark:bg-slate-800 text-white text-xs font-semibold hover:bg-slate-800 dark:hover:bg-slate-700 transition-colors shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Print Certificate</span>
          </button>
        </div>
      </div>

      {/* Main Passport Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden mb-8 transition-colors">
        
        {/* Certificate Header Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 border-b border-indigo-900/60 relative overflow-hidden">
          <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            
            {/* Left Brand & Title */}
            <div className="flex items-start gap-4">
              <img
                src={product.heroImage}
                alt={product.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-white/20 shadow-lg shrink-0"
              />
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[11px] font-bold tracking-wide flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{t('verifiedBadge')}</span>
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-white/10 text-slate-300 text-[10px] font-medium">
                    {product.category}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 text-[10px] font-bold border border-amber-500/30">
                    DEMO DATA
                  </span>
                </div>
                
                <h1 className="text-xl sm:text-2xl font-extrabold text-white font-display tracking-tight leading-snug">
                  {product.name}
                </h1>
                
                <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-300">
                  <span className="font-semibold text-white">{brand.name}</span>
                  <span>•</span>
                  <span>Batch: <strong className="font-mono text-emerald-300">{batch.batchNumber}</strong></span>
                  <span>•</span>
                  <span>Net Wt: <strong className="text-white">{product.netWeight}</strong></span>
                  <span>•</span>
                  <span>MRP: <strong className="text-emerald-300">₹{product.mrp}</strong></span>
                </div>
              </div>
            </div>

            {/* Right: Trust Score Gauge */}
            <div className="flex items-center gap-4 sm:border-l sm:border-white/10 sm:pl-6 shrink-0">
              <div className="relative w-20 h-20 rounded-2xl bg-slate-800/80 border border-emerald-500/30 flex flex-col items-center justify-center text-center p-2 shadow-inner">
                <span className="text-2xl font-black text-emerald-400 font-display leading-none">
                  {product.trustScore}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-1">
                  Trust Score
                </span>
              </div>
              <div className="text-xs space-y-1">
                <div className="flex items-center gap-1.5 text-emerald-300 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Lab Tested & Cleared</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-300 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Govt. License Verified</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-300 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Tamper Seal Intact</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/80 overflow-x-auto no-print">
          <button
            id="tab-btn-overview"
            onClick={() => setActiveTab('overview')}
            className={`px-5 py-3.5 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
              activeTab === 'overview'
                ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400 bg-white dark:bg-slate-900'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>{t('tabOverview')}</span>
          </button>

          <button
            id="tab-btn-origin"
            onClick={() => setActiveTab('origin')}
            className={`px-5 py-3.5 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
              activeTab === 'origin'
                ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400 bg-white dark:bg-slate-900'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>{t('tabSupplyChain')}</span>
          </button>

          <button
            id="tab-btn-quality"
            onClick={() => setActiveTab('quality')}
            className={`px-5 py-3.5 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
              activeTab === 'quality'
                ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400 bg-white dark:bg-slate-900'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <FlaskConical className="w-4 h-4" />
            <span>{t('tabQuality')}</span>
          </button>

          <button
            id="tab-btn-reviews"
            onClick={() => setActiveTab('reviews')}
            className={`px-5 py-3.5 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
              activeTab === 'reviews'
                ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400 bg-white dark:bg-slate-900'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>{t('tabReviews')} ({productReviews.length})</span>
          </button>
        </div>

        {/* Tab Content Panels */}
        <div className="p-6 sm:p-8">
          
          {/* TAB 1: BATCH & FACTORY OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Left 2 Cols: Technical & Compliance Specs */}
                <div className="lg:col-span-2 space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
                    <Fingerprint className="w-4 h-4 text-emerald-500" />
                    <span>Manufacturing & Serialization Verification</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
                      <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{t('batchNo')}</span>
                      <p className="text-sm font-mono font-bold text-slate-900 dark:text-white mt-0.5">{batch.batchNumber}</p>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
                      <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{t('mfgDate')} / {t('expDate')}</span>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white mt-0.5">
                        {batch.mfgDate} → <span className="text-emerald-600 dark:text-emerald-400">{batch.expDate}</span>
                      </p>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
                      <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{t('facility')}</span>
                      <p className="text-xs font-semibold text-slate-900 dark:text-white mt-0.5">{batch.productionFacility}</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">{batch.facilityLocation}</p>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
                      <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{t('license')}</span>
                      <p className="text-xs font-mono font-bold text-slate-900 dark:text-white mt-0.5">{batch.mfgLicense}</p>
                      <div className="mt-1 flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>FSSAI / Ayush Licensed Facility</span>
                      </div>
                    </div>
                  </div>

                  {/* Tamper Seal & Blockchain Hash */}
                  <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                        <span className="text-xs font-bold text-emerald-900 dark:text-emerald-200">{t('tamperStatus')}</span>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-bold">
                        {t('sealIntact')}
                      </span>
                    </div>

                    <div className="pt-2 border-t border-emerald-200/60 dark:border-emerald-800/40">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800/80 dark:text-emerald-300/80">
                        {t('blockchainAudit')}
                      </span>
                      <p className="text-[11px] font-mono text-slate-700 dark:text-slate-300 break-all select-all mt-0.5 bg-white/70 dark:bg-slate-900/70 p-2 rounded-lg border border-emerald-300/50 dark:border-emerald-700/50">
                        {batch.blockchainHash}
                      </p>
                    </div>
                  </div>

                  {/* Storage Instructions & Packaging */}
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-1.5">Packaging & Storage Specifications</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300">
                      <strong>Packaging:</strong> {product.packagingType}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                      <strong>Storage:</strong> {product.storageInstructions}
                    </p>
                  </div>
                </div>

                {/* Right Col: Batch QR & Brand Profile Card */}
                <div className="space-y-4">
                  <div className="p-5 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-center">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                      Digital Batch Identity
                    </h4>
                    {batchQrUrl ? (
                      <img 
                        src={batchQrUrl} 
                        alt="Batch QR" 
                        className="w-40 h-40 mx-auto rounded-2xl bg-white p-2 border border-slate-200 shadow-md" 
                      />
                    ) : (
                      <div className="w-40 h-40 mx-auto rounded-2xl bg-slate-200 dark:bg-slate-700 animate-pulse" />
                    )}
                    <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400 mt-3">
                      Scan Count: <span className="font-bold text-slate-800 dark:text-slate-200">{batch.scanCount} verifications</span>
                    </p>
                  </div>

                  {/* Brand Card */}
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-3 mb-2.5">
                      <img src={brand.logoUrl} alt={brand.name} className="w-10 h-10 rounded-xl object-cover border border-slate-200 shadow-sm" />
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white">{brand.name}</h4>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400">{brand.legalName}</p>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                      {brand.description}
                    </p>
                    <div className="mt-3 pt-2.5 border-t border-slate-200 dark:border-slate-700/60 flex items-center justify-between text-[10px] text-slate-500">
                      <span>GSTIN: <strong className="font-mono text-slate-700 dark:text-slate-300">{brand.gstin}</strong></span>
                      <span>Est: <strong className="text-slate-700 dark:text-slate-300">{brand.establishedYear}</strong></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ORIGIN & SUPPLY CHAIN */}
          {activeTab === 'origin' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              
              {/* Origin Banner */}
              <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-start gap-4">
                <div className="p-3 rounded-xl bg-emerald-600 text-white shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-emerald-950 dark:text-emerald-200">
                    Geographical Origin: {product.originCountry}
                  </h3>
                  <p className="text-xs text-emerald-800 dark:text-emerald-300/90 mt-1 leading-relaxed">
                    Source provenance authenticated via geo-tagged farmer procurement receipts and regional agriculture licensing records.
                  </p>
                </div>
              </div>

              {/* Supply Chain Journey Timeline */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">
                  End-to-End Farm to Shelf Milestone Traceability
                </h4>
                <div className="relative pl-6 space-y-6 border-l-2 border-emerald-500/40 ml-3">
                  
                  <div className="relative group">
                    <div className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-emerald-500 ring-4 ring-emerald-100 dark:ring-emerald-950" />
                    <div>
                      <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Milestone 1 • Origin Harvest</span>
                      <h5 className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">Raw Material Sourcing & Hand-Plucking</h5>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                        Harvested directly by registered local agricultural collectives. Strict zero synthetic chemical pesticide standards enforced.
                      </p>
                    </div>
                  </div>

                  <div className="relative group">
                    <div className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-emerald-500 ring-4 ring-emerald-100 dark:ring-emerald-950" />
                    <div>
                      <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Milestone 2 • Laboratory Testing</span>
                      <h5 className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">NABL Analytical Assay & Adulteration Screening</h5>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                        Composite samples analyzed for purity, microbial counts, active constituent potency, and absence of heavy metals.
                      </p>
                    </div>
                  </div>

                  <div className="relative group">
                    <div className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-emerald-500 ring-4 ring-emerald-100 dark:ring-emerald-950" />
                    <div>
                      <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Milestone 3 • Clean-Room Packaging</span>
                      <h5 className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">Automated Hermetic Sealing & QR Serialization</h5>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                        Packaged in certified sterile facility ({batch.productionFacility}) with tamper-evident holographic security closure.
                      </p>
                    </div>
                  </div>

                  <div className="relative group">
                    <div className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-emerald-500 ring-4 ring-emerald-100 dark:ring-emerald-950" />
                    <div>
                      <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Milestone 4 • Quality Clearance</span>
                      <h5 className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">Cryptographic Batch Hash Published to TrustMark</h5>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                        Batch record locked on immutable ledger for public consumer verification.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Ingredients Breakdown Table */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                  Ingredients & Sourcing Breakdown
                </h4>
                <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      <tr>
                        <th className="py-3 px-4">Ingredient</th>
                        <th className="py-3 px-4">Share %</th>
                        <th className="py-3 px-4">Harvest Location</th>
                        <th className="py-3 px-4">Organic Status</th>
                        <th className="py-3 px-4">Supplier Collective</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {product.ingredients.map((ing, i) => (
                        <tr key={i} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                          <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">{ing.name}</td>
                          <td className="py-3 px-4 font-bold text-emerald-600 dark:text-emerald-400">{ing.percentage}%</td>
                          <td className="py-3 px-4 text-slate-600 dark:text-slate-300">{ing.originLocation}</td>
                          <td className="py-3 px-4">
                            {ing.organicCertified ? (
                              <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold text-[10px]">
                                Certified Organic
                              </span>
                            ) : (
                              <span className="text-slate-400 text-[11px]">Natural / Purified</span>
                            )}
                          </td>
                          <td className="py-3 px-4 text-slate-500 dark:text-slate-400">{ing.supplierName}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: QUALITY & CERTIFICATIONS */}
          {activeTab === 'quality' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              
              {/* Lab Test Results Matrix */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <FlaskConical className="w-4 h-4 text-emerald-500" />
                      <span>Laboratory Assay Certificate of Analysis (CoA)</span>
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Tested for chemical purity, natural markers, and heavy metals per national pharmacopeial standards.
                    </p>
                  </div>
                  <button
                    onClick={() => showToast('Simulated Lab Certificate PDF downloaded!', 'success')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Download CoA PDF</span>
                  </button>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      <tr>
                        <th className="py-3 px-4">Test Parameter</th>
                        <th className="py-3 px-4">Statutory Standard</th>
                        <th className="py-3 px-4">Observed Lab Value</th>
                        <th className="py-3 px-4">Result</th>
                        <th className="py-3 px-4">Certifying Lab Authority</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {batch.labTestResults.map((param, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                          <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">{param.parameter}</td>
                          <td className="py-3 px-4 text-slate-500 dark:text-slate-400">{param.standardValue}</td>
                          <td className="py-3 px-4 font-mono font-bold text-slate-800 dark:text-slate-200">{param.observedValue}</td>
                          <td className="py-3 px-4">
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold text-[10px]">
                              <Check className="w-3 h-3 text-emerald-600" />
                              <span>PASSED</span>
                            </span>
                          </td>
                          <td className="py-3 px-4 text-[11px] text-slate-500 dark:text-slate-400">{param.certifiedBy}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Official Certifications Cards */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                  Government Licenses & Verified Regulatory Accreditations
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {product.certifications.map((cert) => (
                    <div
                      key={cert.id}
                      className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 flex items-start justify-between gap-3"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 font-bold text-[10px]">
                            {cert.type}
                          </span>
                          <span className="text-xs font-mono font-bold text-slate-900 dark:text-white">
                            {cert.certificateNumber}
                          </span>
                        </div>
                        <p className="text-xs font-medium text-slate-700 dark:text-slate-300">
                          {cert.issuedBy}
                        </p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">
                          Valid through: <strong className="text-emerald-600 dark:text-emerald-400">{cert.validUntil}</strong>
                        </p>
                      </div>

                      <div className="flex flex-col items-end shrink-0">
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>VERIFIED</span>
                        </span>
                        <a
                          href={cert.verificationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 text-[10px] text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-0.5"
                        >
                          <span>Portal</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: CUSTOMER REVIEWS & RATINGS */}
          {activeTab === 'reviews' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              
              {/* Rating Overview Header */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
                <div className="text-center md:text-left">
                  <div className="flex items-baseline gap-2 justify-center md:justify-start">
                    <span className="text-4xl font-black text-slate-900 dark:text-white font-display">{avgRating}</span>
                    <span className="text-sm text-slate-500 font-medium">/ 5.0</span>
                  </div>
                  <div className="flex items-center gap-1 my-1 justify-center md:justify-start">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-500">Based on {productReviews.length} verified buyer reviews</p>
                </div>

                <div className="md:col-span-2 flex flex-col justify-center space-y-1.5 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-12 text-slate-500 text-right">5 Star</span>
                    <div className="flex-1 h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                      <div className="h-full bg-amber-400 rounded-full w-[85%]" />
                    </div>
                    <span className="w-8 text-slate-600 dark:text-slate-400">85%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-12 text-slate-500 text-right">4 Star</span>
                    <div className="flex-1 h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                      <div className="h-full bg-amber-400 rounded-full w-[15%]" />
                    </div>
                    <span className="w-8 text-slate-600 dark:text-slate-400">15%</span>
                  </div>
                </div>
              </div>

              {/* Submit a Review Form */}
              <div className="p-6 rounded-3xl bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/60">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-1">
                  <MessageSquare className="w-4 h-4 text-emerald-500" />
                  <span>{t('writeReview')}</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                  Purchased this batch? Share your feedback on purity, aroma, packaging, and authentic experience.
                </p>

                <form onSubmit={handleReviewSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      {t('ratingStars')}
                    </label>
                    <div className="flex items-center gap-1.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          id={`star-btn-${star}`}
                          onClick={() => setRating(star)}
                          className="p-1 hover:scale-110 transition-transform"
                        >
                          <Star
                            className={`w-6 h-6 ${
                              star <= rating ? 'text-amber-400 fill-amber-400' : 'text-slate-300 dark:text-slate-700'
                            }`}
                          />
                        </button>
                      ))}
                      <span className="ml-2 text-xs font-bold text-slate-700 dark:text-slate-300">
                        {rating} / 5 Stars
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        {t('reviewTitle')}
                      </label>
                      <input
                        type="text"
                        required
                        value={reviewTitle}
                        onChange={(e) => setReviewTitle(e.target.value)}
                        placeholder="e.g. Excellent purity, verified batch QR!"
                        className="w-full px-3.5 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Reviewer Identity
                      </label>
                      <input
                        type="text"
                        disabled
                        value={`${currentUser.name} (${currentUser.role})`}
                        className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Review Comments
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      placeholder={t('reviewComment')}
                      className="w-full px-3.5 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-emerald-500 focus:outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    id="btn-submit-review"
                    disabled={submittingReview}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all"
                  >
                    {t('submitReview')}
                  </button>
                </form>
              </div>

              {/* Reviews List */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Published Consumer Reviews
                </h4>
                {productReviews.length === 0 ? (
                  <p className="text-xs text-slate-500">No reviews published yet for this batch. Be the first to review!</p>
                ) : (
                  productReviews.map((rev) => (
                    <div
                      key={rev.id}
                      className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2.5 shadow-sm"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={rev.userAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=60'}
                            alt={rev.userName}
                            className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <h5 className="text-xs font-bold text-slate-900 dark:text-white">{rev.userName}</h5>
                              <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold flex items-center gap-0.5">
                                <CheckCircle2 className="w-2.5 h-2.5" />
                                <span>{t('verifiedBuyerBadge')}</span>
                              </span>
                            </div>
                            <p className="text-[10px] text-slate-500">{rev.userCity} • Batch: {rev.batchNumber || batch.batchNumber}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                              key={s}
                              className={`w-3.5 h-3.5 ${
                                s <= rev.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200 dark:text-slate-700'
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      <h6 className="text-xs font-bold text-slate-900 dark:text-white">{rev.title}</h6>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{rev.comment}</p>
                      
                      <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400">
                        <span>{rev.createdAt}</span>
                        <div className="flex items-center gap-1 text-slate-500 hover:text-emerald-600 cursor-pointer">
                          <ThumbsUp className="w-3.5 h-3.5" />
                          <span>Helpful ({rev.likesCount})</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <ShareModal product={product} batch={batch} onClose={() => setShowShareModal(false)} />
      )}

      {/* Report Modal */}
      {showReportModal && (
        <ReportModal product={product} batch={batch} onClose={() => setShowReportModal(false)} />
      )}
    </div>
  );
}
