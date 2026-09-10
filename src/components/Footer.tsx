import { ShieldCheck, CheckCircle2, Heart, ExternalLink } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Page } from '../types';

export function Footer() {
  const { setCurrentPage, t } = useApp();

  const handleNav = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer 
      id="main-footer"
      className="bg-slate-900 text-slate-300 border-t border-slate-800 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-slate-800">
          
          {/* Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-900 to-slate-800 border border-indigo-500/40 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white font-display">
                Trust<span className="text-emerald-400">Mark</span>
              </span>
              <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-emerald-950 text-emerald-400 border border-emerald-700/50">
                PRO
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              India&apos;s premier Digital Product Passport (DPP) & Anti-Counterfeit platform. Enabling end-to-end transparency for FMCG, Ayurvedic, Organic, and Consumer brands through verified batch traceability.
            </p>
            <div className="flex items-center gap-2 text-xs text-amber-400/90 font-medium bg-amber-950/40 border border-amber-800/40 px-3 py-2 rounded-xl max-w-md">
              <span>⚠️ Demo Platform: All Indian brands, certificates, and batch codes shown are realistic simulations for demonstration.</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3.5">Platform</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleNav('verify')} className="hover:text-emerald-400 transition-colors">
                  {t('navVerify')}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('how-it-works')} className="hover:text-emerald-400 transition-colors">
                  {t('navHowItWorks')}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('seller')} className="hover:text-emerald-400 transition-colors">
                  {t('navSellerHub')}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('admin')} className="hover:text-emerald-400 transition-colors">
                  {t('navAdmin')}
                </button>
              </li>
            </ul>
          </div>

          {/* Compliance & Standards */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3.5">Standards & Regulators</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>FSSAI Food Safety Compliance</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>AGMARK Quality Grading</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Ayush Premium Mark</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>NABL Accredited Testing Labs</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>NPOP / India Organic (APEDA)</span>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3.5">Company</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-emerald-400 transition-colors">
                  {t('navAbout')}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-emerald-400 transition-colors">
                  {t('navContact')}
                </button>
              </li>
              <li>
                <span className="text-slate-500">Security & Privacy Policy</span>
              </li>
              <li>
                <span className="text-slate-500">Anti-Counterfeit Act 2026</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 TrustMark Technologies India. Building Trust in Every Purchase.</p>
          <div className="flex items-center gap-4">
            <span>Made with precision for Indian Consumers & Brands</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
