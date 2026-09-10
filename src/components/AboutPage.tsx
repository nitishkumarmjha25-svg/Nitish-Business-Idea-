import { ShieldCheck, Award, Users, Globe2, HeartHandshake, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export function AboutPage() {
  const { setCurrentPage } = useApp();

  return (
    <div id="about-page" className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider">
          Our Mission
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white font-display mt-3 leading-tight">
          Restoring Trust in Indian Products & Everyday Living
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-4 leading-relaxed">
          From adulterated spices and counterfeit saffron to synthetic ghee and unauthorized supplements, Indian consumers face significant transparency hurdles. TrustMark bridges the gap between honest producers and health-conscious families.
        </p>
      </div>

      {/* Core Principles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Radical Transparency</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            We believe consumers have a fundamental right to know what goes into their food and personal care — verified by independent accredited laboratories.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Championing Honest Brands</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Authentic small businesses and artisanal farmers invest heavily in pure ingredients. We give them the serialization technology to prove their quality.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center">
            <Globe2 className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Multi-Lingual Inclusion</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Trust should have no linguistic barrier. TrustMark is built from the ground up to support English, Hindi, and Marathi for accessibility across India.
          </p>
        </div>
      </div>

      {/* Recognized Standards */}
      <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-center space-y-6">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display">
          Aligned with Recognized National & Global Standards
        </h3>
        
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-bold">
          <span className="px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 shadow-sm">
            FSSAI (Food Safety and Standards Authority of India)
          </span>
          <span className="px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 shadow-sm">
            AGMARK Grade Standards
          </span>
          <span className="px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 shadow-sm">
            Ministry of Ayush (GMP Certified)
          </span>
          <span className="px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 shadow-sm">
            NABL Accredited Chemical Laboratories
          </span>
          <span className="px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 shadow-sm">
            ISO 22000:2018 Food Safety
          </span>
        </div>
      </div>
    </div>
  );
}
