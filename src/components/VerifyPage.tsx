import { useState, useRef, useEffect, FormEvent } from 'react';
import { 
  QrCode, 
  Camera, 
  Search, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight,
  RefreshCw,
  Zap,
  HelpCircle,
  ScanLine,
  Flag,
  FileCheck2,
  ExternalLink,
  Lock
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export function VerifyPage() {
  const { 
    verifyBatchCode, 
    batches, 
    products, 
    openProductPassport, 
    setCurrentPage, 
    t 
  } = useApp();

  const [inputCode, setInputCode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  
  // Camera scanning states
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Stop camera on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const startCamera = async () => {
    setCameraError('');
    setErrorMsg('');
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setCameraError('Camera API is not supported in this preview iframe. You can enter the batch code manually below or pick a sample product.');
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setCameraActive(true);
    } catch (err: any) {
      console.warn('Camera access issue:', err);
      setCameraError('Camera access unavailable or blocked. Please enter the batch code manually or select a demo product below.');
      setCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  };

  const handleSimulatedScan = (sampleCode: string) => {
    stopCamera();
    setInputCode(sampleCode);
    executeVerification(sampleCode);
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    executeVerification(inputCode);
  };

  const executeVerification = (codeToVerify: string) => {
    const trimmed = codeToVerify.trim();
    if (!trimmed) {
      setErrorMsg('Please enter a product QR or batch code.');
      return;
    }

    setIsVerifying(true);
    setErrorMsg('');

    setTimeout(() => {
      const res = verifyBatchCode(trimmed);
      setIsVerifying(false);
      if (!res.success) {
        setErrorMsg(res.message || 'Batch code not found in TrustMark registry. Suspect counterfeit or invalid code.');
      }
    }, 450);
  };

  const demoItems = [
    {
      code: 'VP-SAF-2024-K09',
      title: 'Kashmiri Mongra Saffron (1g)',
      brand: 'VedaPure Organics',
      location: 'Pampore, J&K',
      badge: '98/100 Purity Score',
      image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=400&q=80'
    },
    {
      code: 'SW-GHEE-B041',
      title: 'A2 Gir Cow Bilona Ghee (500ml)',
      brand: 'Saraswati Desi Dairy',
      location: 'Junagadh, Gujarat',
      badge: 'AGMARK Special Grade',
      image: 'https://images.unsplash.com/photo-1589927986089-35812388d1f4?auto=format&fit=crop&w=400&q=80'
    },
    {
      code: 'NG-TEA-2024-O88',
      title: 'Orthodox High-Grown Tea (250g)',
      brand: 'Nilgiri Gold Estates',
      location: 'Coonoor, Nilgiris',
      badge: 'Rainforest Certified',
      image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=400&q=80'
    },
    {
      code: 'AY-CHY-883',
      title: 'Immuno Chyawanprash Gold (500g)',
      brand: 'AyurShield Life Sciences',
      location: 'Haridwar, Uttarakhand',
      badge: 'Ayush Premium Mark',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80'
    }
  ];

  return (
    <div id="verify-page" className="min-h-[85vh] py-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider mb-3 shadow-sm border border-emerald-300/40 dark:border-emerald-800/60">
          <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>TrustMark National Verification Engine</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white font-display tracking-tight leading-tight">
          {t('verifyHeader')}
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
          {t('verifySubheader')}
        </p>
      </div>

      {/* Main Verification Terminal Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-slate-900/5 dark:shadow-black/40 border border-slate-200 dark:border-slate-800 p-6 sm:p-10 mb-10 transition-colors relative overflow-hidden">
        
        {/* Subtle accent border at top */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-500" />

        {/* Mode Toggle: Manual Entry vs Camera Scan */}
        <div className="flex items-center justify-center gap-2 p-1.5 max-w-md mx-auto mb-8 bg-slate-100 dark:bg-slate-800/80 rounded-2xl border border-slate-200/60 dark:border-slate-700/60">
          <button
            id="btn-tab-manual-entry"
            onClick={() => {
              stopCamera();
            }}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              !cameraActive
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>{t('enterBatchCode')}</span>
          </button>
          <button
            id="btn-tab-camera-scan"
            onClick={() => {
              if (cameraActive) stopCamera();
              else startCamera();
            }}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
              cameraActive
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>{t('scanWithCamera')}</span>
          </button>
        </div>

        {/* Camera Scanner Viewport */}
        {cameraActive && (
          <div className="mb-8 max-w-md mx-auto relative rounded-3xl overflow-hidden bg-slate-950 border-2 border-emerald-500 shadow-2xl">
            <video
              ref={videoRef}
              playsInline
              muted
              className="w-full h-72 object-cover"
            />
            {/* Holographic scanner reticle overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-56 h-56 border-2 border-dashed border-emerald-400/80 rounded-2xl relative">
                {/* Corner markers */}
                <div className="absolute -top-1 -left-1 w-5 h-5 border-t-3 border-l-3 border-emerald-400" />
                <div className="absolute -top-1 -right-1 w-5 h-5 border-t-3 border-r-3 border-emerald-400" />
                <div className="absolute -bottom-1 -left-1 w-5 h-5 border-b-3 border-l-3 border-emerald-400" />
                <div className="absolute -bottom-1 -right-1 w-5 h-5 border-b-3 border-r-3 border-emerald-400" />
                
                {/* Animated Horizontal Laser Scan Line */}
                <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-pulse shadow-[0_0_8px_#34d399]" />
              </div>
            </div>
            
            <div className="absolute bottom-3 inset-x-3 bg-slate-900/90 backdrop-blur-md p-3 rounded-2xl text-center border border-slate-700">
              <p className="text-xs text-emerald-400 font-semibold">{t('cameraActive')}</p>
              <div className="mt-2.5 flex items-center justify-center gap-2">
                <button
                  id="btn-scan-simulated-saffron"
                  onClick={() => handleSimulatedScan('VP-SAF-2024-K09')}
                  className="px-3 py-1.5 text-[11px] font-bold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-colors"
                >
                  Capture Demo Saffron QR
                </button>
                <button
                  id="btn-scan-simulated-ghee"
                  onClick={() => handleSimulatedScan('SW-GHEE-B041')}
                  className="px-3 py-1.5 text-[11px] font-bold rounded-xl bg-slate-800 hover:bg-slate-700 text-white shadow-sm transition-colors border border-slate-600"
                >
                  Capture Demo Ghee QR
                </button>
              </div>
            </div>
          </div>
        )}

        {cameraError && (
          <div className="max-w-xl mx-auto mb-6 p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300/80 dark:border-amber-900/50 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-3">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Camera scanner notice</p>
              <p className="text-slate-600 dark:text-slate-400 mt-0.5">{cameraError}</p>
            </div>
          </div>
        )}

        {/* Manual Input Form */}
        <form onSubmit={handleFormSubmit} className="max-w-2xl mx-auto">
          <div className="relative flex items-center shadow-sm">
            <div className="absolute left-4 text-slate-400">
              <QrCode className="w-6 h-6 text-emerald-500" />
            </div>
            <input
              type="text"
              id="input-batch-code"
              value={inputCode}
              onChange={(e) => {
                setInputCode(e.target.value);
                setErrorMsg('');
              }}
              placeholder={t('placeholderBatch')}
              className="w-full pl-14 pr-32 sm:pr-40 py-4 sm:py-4.5 text-sm sm:text-base font-mono uppercase font-bold rounded-2xl bg-slate-50 dark:bg-slate-800/80 border-2 border-slate-300 dark:border-slate-700 focus:border-emerald-500 dark:focus:border-emerald-500 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none transition-all shadow-inner"
            />
            <button
              type="submit"
              id="btn-submit-verify"
              disabled={isVerifying}
              className="absolute right-2.5 sm:right-3 px-5 sm:px-7 py-2.5 sm:py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs sm:text-sm font-extrabold shadow-md shadow-emerald-600/30 transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {isVerifying ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <span>{t('btnVerify')}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          {errorMsg && (
            <div className="mt-4 p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-rose-800 dark:text-rose-300 animate-in fade-in duration-150">
              <div className="flex items-start gap-2.5">
                <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">{errorMsg}</p>
                  <p className="text-[11px] text-rose-700/90 dark:text-rose-400 mt-0.5">
                    Check packaging label for spelling or verify one of the sample batch IDs below.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setCurrentPage('contact')}
                className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors shrink-0 flex items-center gap-1.5 self-start sm:self-auto"
              >
                <Flag className="w-3.5 h-3.5" />
                <span>Report Suspect Batch</span>
              </button>
            </div>
          )}
        </form>

        {/* Quick Demo Batch Selector */}
        <div className="mt-10 pt-8 border-t border-slate-100 dark:border-slate-800/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>{t('orChooseSample')}</span>
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Test with real serialized Indian products currently registered in TrustMark.
              </p>
            </div>
            <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-300/50 dark:border-emerald-800/60 self-start sm:self-auto">
              One-Click Direct Verification
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {demoItems.map((item) => (
              <button
                key={item.code}
                id={`btn-sample-code-${item.code}`}
                onClick={() => {
                  setInputCode(item.code);
                  executeVerification(item.code);
                }}
                className="group p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 hover:bg-emerald-50/70 dark:hover:bg-emerald-950/30 border border-slate-200 dark:border-slate-700/70 hover:border-emerald-400 dark:hover:border-emerald-600 text-left transition-all cursor-pointer shadow-sm hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-28 rounded-xl overflow-hidden mb-3 bg-slate-200 dark:bg-slate-700">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 right-2">
                      <span className="text-[9px] font-mono font-black text-emerald-900 dark:text-emerald-200 bg-white/95 dark:bg-slate-900/95 px-2 py-0.5 rounded shadow-sm">
                        {item.code}
                      </span>
                    </div>
                  </div>

                  <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-1">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                    {item.brand} • {item.location}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-200/60 dark:border-slate-700/50 flex items-center justify-between text-[10px] font-semibold text-slate-600 dark:text-slate-300">
                  <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{item.badge}</span>
                  </div>
                  <Zap className="w-3.5 h-3.5 text-amber-500 opacity-80 group-hover:scale-125 transition-transform" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Trust & Verification Pillars Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-slate-700 dark:text-slate-300">
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start gap-3.5 shadow-sm">
          <div className="p-2.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white">Government Lic. Verification</h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              Instant registry cross-check against FSSAI, AGMARK, and Ayush central regulatory databases.
            </p>
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start gap-3.5 shadow-sm">
          <div className="p-2.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white">Tamper-Proof Serialization</h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              Each package carries a unique cryptographic hash to identify and block cloned or duplicated codes.
            </p>
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start gap-3.5 shadow-sm">
          <div className="p-2.5 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 shrink-0">
            <FileCheck2 className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white">Lab Purity Parameters</h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              Inspect full Certificates of Analysis (CoA), active marker potency, and heavy metal limits by NABL labs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
