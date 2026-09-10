import { useState, FormEvent } from 'react';
import { 
  ShieldCheck, 
  QrCode, 
  Search, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  TrendingUp, 
  Award, 
  Building2, 
  FileCheck,
  ChevronRight,
  ExternalLink,
  Lock,
  Zap,
  Globe2,
  AlertTriangle,
  FileSpreadsheet,
  Check,
  X,
  BadgeCheck,
  ScanLine
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export function LandingPage() {
  const { 
    setCurrentPage, 
    verifyBatchCode, 
    products, 
    openProductPassport,
    t 
  } = useApp();

  const [inputCode, setInputCode] = useState('');

  const handleQuickVerify = (e: FormEvent) => {
    e.preventDefault();
    if (inputCode.trim()) {
      verifyBatchCode(inputCode.trim());
    }
  };

  return (
    <div id="landing-page" className="min-h-screen bg-slate-50/50 dark:bg-slate-950 transition-colors">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-slate-200/80 dark:border-slate-800/80 bg-gradient-to-b from-slate-50 via-white to-slate-50/60 dark:from-slate-950 dark:via-slate-900/90 dark:to-slate-950">
        
        {/* Subtle Ambient Background Gradients */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-emerald-500/10 dark:bg-emerald-500/15 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute top-24 right-10 w-[450px] h-[300px] bg-teal-500/10 dark:bg-teal-500/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Hero Copy & Search */}
            <div className="lg:col-span-7 text-left space-y-6">
              
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Next-Gen Digital Product Passport for India</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white font-display tracking-tight leading-[1.12]">
                {t('heroTitle')}
              </h1>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed font-body">
                {t('heroSubtitle')}
              </p>

              {/* Quick Verification Bar */}
              <div className="pt-2">
                <form 
                  onSubmit={handleQuickVerify}
                  className="p-2 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200/90 dark:border-slate-800 shadow-xl shadow-slate-900/5 dark:shadow-black/40 flex flex-col sm:flex-row gap-2 transition-all focus-within:border-emerald-500/80 dark:focus-within:border-emerald-500/80"
                >
                  <div className="relative flex-1 flex items-center">
                    <Search className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
                    <input
                      type="text"
                      id="landing-quick-code-input"
                      value={inputCode}
                      onChange={(e) => setInputCode(e.target.value)}
                      placeholder="Enter Batch ID (e.g. VP-SAF-2024-B09)"
                      className="w-full px-3 py-2.5 text-xs sm:text-sm bg-transparent border-none text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none font-mono"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="submit"
                      id="btn-landing-verify"
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-bold transition-all shadow-md shadow-emerald-600/25 flex items-center justify-center gap-2"
                    >
                      <span>{t('verifyNow')}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      id="btn-landing-scan"
                      onClick={() => setCurrentPage('verify')}
                      className="px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold transition-colors flex items-center gap-1.5 shrink-0"
                      title="Scan with Camera"
                    >
                      <ScanLine className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      <span className="hidden sm:inline">{t('scanWithCamera')}</span>
                    </button>
                  </div>
                </form>

                {/* Sample Batch Chips */}
                <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                  <span className="font-medium">Try verified samples:</span>
                  <button
                    type="button"
                    onClick={() => verifyBatchCode('VP-SAF-2024-B09')}
                    className="font-mono font-semibold text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-950/70 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-lg border border-emerald-200/60 dark:border-emerald-800/50 transition-colors"
                  >
                    VP-SAF-2024-B09 (Saffron)
                  </button>
                  <button
                    type="button"
                    onClick={() => verifyBatchCode('SW-GHEE-B041')}
                    className="font-mono font-semibold text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-950/70 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-lg border border-emerald-200/60 dark:border-emerald-800/50 transition-colors"
                  >
                    SW-GHEE-B041 (Gir Ghee)
                  </button>
                  <button
                    type="button"
                    onClick={() => verifyBatchCode('AY-CHY-883')}
                    className="font-mono font-semibold text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-950/70 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-lg border border-emerald-200/60 dark:border-emerald-800/50 transition-colors"
                  >
                    AY-CHY-883 (Chyawanprash)
                  </button>
                </div>
              </div>

              {/* Regulatory Standards Trust Marks */}
              <div className="pt-4 flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>FSSAI Compliant</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>AGMARK Certified</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Ayush Premium Mark</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>NABL Accredited Tests</span>
                </div>
              </div>

            </div>

            {/* Right Column: Live Interactive Digital Passport Preview Card */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md">
                
                {/* Holographic Glowing Frame */}
                <div className="absolute -inset-1.5 bg-gradient-to-tr from-emerald-500 via-teal-500 to-indigo-500 rounded-3xl blur-lg opacity-30 group-hover:opacity-60 transition duration-500" />
                
                <div className="relative rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden p-6 text-left">
                  
                  {/* Card Header with Verified Stamp */}
                  <div className="flex items-start justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                    <div>
                      <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[10px] font-extrabold uppercase tracking-wider mb-1">
                        <BadgeCheck className="w-3 h-3" />
                        <span>TrustMark Verified Passport</span>
                      </div>
                      <h3 className="text-base font-black text-slate-900 dark:text-white font-display">
                        Kashmiri Mongra Saffron (1g)
                      </h3>
                      <p className="text-xs text-slate-500">VedaPure Organics • Pampore, J&K</p>
                    </div>

                    <div className="text-right">
                      <div className="w-11 h-11 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/30 flex flex-col items-center justify-center text-emerald-600 dark:text-emerald-400">
                        <span className="text-sm font-black leading-none">98</span>
                        <span className="text-[8px] font-bold uppercase">Score</span>
                      </div>
                    </div>
                  </div>

                  {/* Batch Details & Quality Metrics Grid */}
                  <div className="py-4 space-y-3">
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                        <span className="text-[10px] font-bold text-slate-400 block uppercase">Batch Code</span>
                        <span className="font-mono font-bold text-slate-900 dark:text-white text-xs">VP-SAF-2024-B09</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                        <span className="text-[10px] font-bold text-slate-400 block uppercase">FSSAI Lic.</span>
                        <span className="font-mono font-bold text-slate-900 dark:text-white text-xs">10022011000492</span>
                      </div>
                    </div>

                    {/* Live Laboratory Clearance */}
                    <div className="p-3 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/60 space-y-2">
                      <div className="flex items-center justify-between text-xs font-bold text-emerald-900 dark:text-emerald-200">
                        <span className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                          NABL Lab Assay Clearance
                        </span>
                        <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-emerald-200/60 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300">
                          Pass 100%
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-1 text-[11px] text-slate-700 dark:text-slate-300">
                        <div>Crocin: <strong>28.4%</strong></div>
                        <div>Safranal: <strong>9.8%</strong></div>
                        <div>Heavy Metals: <strong>ND</strong></div>
                      </div>
                    </div>

                    {/* Timeline Peek */}
                    <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 px-1">
                      <span>Harvest: Oct 2024</span>
                      <span>•</span>
                      <span>Mfd: Nov 2024</span>
                      <span>•</span>
                      <span>Origin: Pampore (34.02° N)</span>
                    </div>
                  </div>

                  {/* Interactive Button */}
                  <button
                    type="button"
                    onClick={() => verifyBatchCode('VP-SAF-2024-B09')}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-md"
                  >
                    <QrCode className="w-4 h-4" />
                    <span>Open Live Product Passport</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* Key Metrics Strip */}
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-slate-200 dark:border-slate-800/80">
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800/80 text-left">
              <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-display">100%</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">Laboratory-Assayed Verification</p>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800/80 text-left">
              <p className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 font-display">42,000+</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">Authentic Consumer QR Scans</p>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800/80 text-left">
              <p className="text-2xl sm:text-3xl font-black text-indigo-600 dark:text-indigo-400 font-display">Zero</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">Counterfeit Tolerance Policy</p>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800/80 text-left">
              <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-display">FSSAI / NABL</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">Integrated Regulatory Standards</p>
            </div>
          </div>

        </div>
      </section>

      {/* Featured Verified Demo Passports */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Authentic Showcase</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-display tracking-tight">
            Explore Verified Digital Product Passports
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto mt-2">
            Select any authentic Indian product below to inspect its farm harvest origin, NABL lab test certificates, and statutory licenses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((p) => (
            <div
              key={p.id}
              onClick={() => openProductPassport(p.id)}
              className="group cursor-pointer rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl hover:border-emerald-500/40 dark:hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-52 overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img
                    src={p.heroImage}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-1 rounded-full bg-slate-900/85 backdrop-blur-md text-emerald-400 border border-emerald-500/40 text-[11px] font-extrabold flex items-center gap-1 shadow-md">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>{p.trustScore}/100 Trust</span>
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
                    <span className="px-2.5 py-0.5 rounded-lg bg-white/95 dark:bg-slate-900/95 text-slate-800 dark:text-slate-200 text-[10px] font-bold shadow-sm">
                      {p.category}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-lg bg-emerald-600/90 text-white text-[10px] font-bold shadow-sm">
                      Verified Batch
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-1 font-display">
                    {p.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {p.description}
                  </p>
                  
                  {/* Quality Highlights */}
                  <div className="pt-1 flex flex-wrap gap-1.5">
                    {p.certifications.slice(0, 2).map((cert, idx) => (
                      <span 
                        key={idx} 
                        className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-medium"
                      >
                        ✓ {cert.name}
                      </span>
                    ))}
                  </div>

                  <div className="pt-2 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800/80">
                    <span>Net Weight: <strong className="text-slate-900 dark:text-white">{p.netWeight}</strong></span>
                    <span>MRP: <strong className="text-emerald-600 dark:text-emerald-400 font-bold">₹{p.mrp}</strong></span>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <div className="w-full py-2.5 px-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 group-hover:bg-emerald-600 text-slate-700 dark:text-slate-300 group-hover:text-white text-xs font-bold flex items-center justify-between transition-colors shadow-sm">
                  <span>Inspect Full Passport</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison Section: Traditional Packaging vs TrustMark Digital Passport */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Why It Matters
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-display mt-1">
            Traditional Labels vs. TrustMark Digital Passport
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto mt-2">
            See how TrustMark replaces blind faith with immutable cryptographic verification.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Traditional Opaque Packaging */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-900/50 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 flex items-center justify-center">
                <X className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Traditional Opaque Packaging</h3>
                <p className="text-xs text-rose-500 font-semibold">High Counterfeit & Adulteration Risk</p>
              </div>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
              <li className="flex items-start gap-2">
                <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span>Static printed batch numbers easily duplicated by counterfeiters</span>
              </li>
              <li className="flex items-start gap-2">
                <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span>Zero proof of independent NABL laboratory assay tests</span>
              </li>
              <li className="flex items-start gap-2">
                <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span>Unverified marketing claims like "100% Pure" or "Natural" without evidence</span>
              </li>
              <li className="flex items-start gap-2">
                <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span>No mechanism for consumers to report suspected fake products in real-time</span>
              </li>
            </ul>
          </div>

          {/* TrustMark Digital Passport */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-emerald-300 dark:border-emerald-800/80 shadow-md space-y-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-bl-full pointer-events-none" />
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Check className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">TrustMark Digital Product Passport</h3>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">Verified Transparency & Purity</p>
              </div>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Cryptographically serialized dynamic QR code per batch</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Direct PDF downloads of accredited NABL laboratory Certificates of Analysis</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Transparent Transparency Score (0-100) calculated from verified criteria</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Verified consumer reviews from purchasers who verified real batches</span>
              </li>
            </ul>
          </div>

        </div>
      </section>

      {/* Why TrustMark Value Pillars */}
      <section className="py-16 bg-slate-100/70 dark:bg-slate-900/40 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-display">
              End-to-End Trust Architecture
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto mt-2">
              How TrustMark solves counterfeit risks, unverified claims, and opaque supply chains.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 hover:border-emerald-500/30 transition-colors">
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <QrCode className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Serialized Batch QR Codes</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Every manufacturing batch receives an immutable serialized identifier linked to production dates, factory GPS coordinates, and tamper seals.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 hover:border-indigo-500/30 transition-colors">
              <div className="w-10 h-10 rounded-2xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                <FileCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">NABL Lab Test Certificates</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Direct access to laboratory Certificate of Analysis (CoA) testing for active herbal markers, heavy metal compliance, and chemical purity.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 hover:border-amber-500/30 transition-colors">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Seller Branding Toolkit</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Brand profile builder, packaging die-cut label studio with dynamic QR embedding, and instant high-res print-ready downloads.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 px-4 text-center max-w-4xl mx-auto">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white relative overflow-hidden shadow-2xl border border-emerald-900/40">
          <div className="relative z-10 space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display">
              Are You an Honest Seller or Vigilant Consumer?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
              Scan your purchased package or register your authentic brand to publish your own verified Digital Product Passports today.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => setCurrentPage('verify')}
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-lg shadow-emerald-600/30 active:scale-95"
              >
                Scan Product Now
              </button>
              <button
                onClick={() => setCurrentPage('seller')}
                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all border border-white/20 active:scale-95"
              >
                Enter Seller Portal
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
