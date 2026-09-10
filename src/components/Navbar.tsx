import { useState, useRef, useEffect } from 'react';
import { 
  ShieldCheck, 
  Sun, 
  Moon, 
  Globe, 
  UserCircle2, 
  Menu, 
  X, 
  QrCode, 
  ChevronDown,
  Building2,
  ShieldAlert,
  ShoppingBag
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Language, Role, Page } from '../types';

export function Navbar() {
  const { 
    language, 
    setLanguage, 
    theme, 
    toggleTheme, 
    currentPage, 
    setCurrentPage, 
    currentUser, 
    switchUserRole,
    t 
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const langRef = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangDropdownOpen(false);
      }
      if (roleRef.current && !roleRef.current.contains(e.target as Node)) {
        setRoleDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems: { page: Page; label: string }[] = [
    { page: 'landing', label: t('navHome') },
    { page: 'how-it-works', label: t('navHowItWorks') },
    { page: 'verify', label: t('navVerify') },
    { page: 'seller', label: t('navSellerHub') },
    { page: 'admin', label: t('navAdmin') },
    { page: 'about', label: t('navAbout') },
    { page: 'contact', label: t('navContact') },
  ];

  const handleNavClick = (page: Page) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const languages: { code: Language; label: string; native: string }[] = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
    { code: 'mr', label: 'Marathi', native: 'मराठी' },
  ];

  const roles: { role: Role; title: string; subtitle: string; icon: typeof UserCircle2 }[] = [
    { role: 'customer', title: t('roleCustomer'), subtitle: 'Scan & view passports', icon: ShoppingBag },
    { role: 'seller', title: t('roleSeller'), subtitle: 'Manage brands & labels', icon: Building2 },
    { role: 'admin', title: t('roleAdmin'), subtitle: 'Verify compliance & certs', icon: ShieldAlert },
  ];

  return (
    <header 
      id="main-navbar"
      className="sticky top-0 z-40 w-full bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          
          {/* Brand Logo */}
          <div 
            id="brand-logo-container"
            onClick={() => handleNavClick('landing')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-tr from-slate-900 via-emerald-950 to-slate-900 dark:from-slate-900 dark:via-emerald-950 dark:to-slate-950 border border-emerald-500/30 flex items-center justify-center shadow-lg shadow-emerald-950/20 group-hover:scale-105 group-hover:border-emerald-500/50 transition-all">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full ring-2 ring-white dark:ring-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white font-display">
                  Trust<span className="text-emerald-500">Mark</span>
                </span>
                <span className="px-1.5 py-0.5 text-[9px] font-extrabold tracking-wider rounded-md bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border border-emerald-300/60 dark:border-emerald-700/60">
                  PASSPORT
                </span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 hidden sm:block font-medium tracking-tight">
                Authenticity & Quality Verification
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.page}
                id={`nav-link-${item.page}`}
                onClick={() => handleNavClick(item.page)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  currentPage === item.page
                    ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 font-semibold'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-800/60'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Controls: Language, Theme, Role, CTA */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            
            {/* Language Switcher */}
            <div className="relative" ref={langRef}>
              <button
                id="btn-language-dropdown"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
                title="Switch Language (English / हिन्दी / मराठी)"
              >
                <Globe className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                <span className="uppercase font-semibold tracking-wider">{language}</span>
                <ChevronDown className="w-3 h-3 opacity-60" />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-36 py-1.5 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      id={`lang-option-${l.code}`}
                      onClick={() => {
                        setLanguage(l.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3.5 py-2 text-xs text-left hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${
                        language === l.code ? 'font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/30' : 'text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <span>{l.label}</span>
                      <span className="text-[11px] opacity-70">{l.native}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Dark / Light Mode Toggle */}
            <button
              id="btn-theme-toggle"
              onClick={toggleTheme}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            {/* Role Switcher Menu */}
            <div className="relative" ref={roleRef}>
              <button
                id="btn-role-switcher"
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="flex items-center gap-2 pl-2 pr-2.5 py-1.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 text-slate-800 dark:text-slate-200 hover:bg-slate-200/80 dark:hover:bg-slate-700 transition-colors"
              >
                <img
                  src={currentUser.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=60'}
                  alt={currentUser.name}
                  className="w-5 h-5 rounded-full object-cover ring-1 ring-emerald-500/50"
                />
                <span className="font-semibold capitalize hidden sm:inline">{currentUser.role}</span>
                <ChevronDown className="w-3 h-3 opacity-60" />
              </button>

              {roleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 py-2 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3.5 pb-2 mb-1.5 border-b border-slate-100 dark:border-slate-800">
                    <p className="text-[11px] font-medium text-slate-400">Current User ({currentUser.name})</p>
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200 capitalize">{currentUser.role} Role</p>
                  </div>
                  <div className="px-1.5 space-y-1">
                    {roles.map((r) => {
                      const Icon = r.icon;
                      const isActive = currentUser.role === r.role;
                      return (
                        <button
                          key={r.role}
                          id={`role-option-${r.role}`}
                          onClick={() => {
                            switchUserRole(r.role);
                            setRoleDropdownOpen(false);
                          }}
                          className={`w-full flex items-start gap-2.5 p-2 rounded-xl text-left transition-colors ${
                            isActive
                              ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                              : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          <div className={`p-1.5 rounded-lg ${isActive ? 'bg-emerald-600 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-bold">{r.title}</div>
                            <div className="text-[10px] text-slate-500 dark:text-slate-400">{r.subtitle}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Quick Verify CTA */}
            <button
              id="btn-nav-verify"
              onClick={() => handleNavClick('verify')}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm transition-all shadow-emerald-600/20"
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>{t('navVerify')}</span>
            </button>

            {/* Mobile menu trigger */}
            <button
              id="btn-mobile-menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 lg:hidden rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 pt-3 pb-5 space-y-2 animate-in slide-in-from-top-2 duration-150">
          {navItems.map((item) => (
            <button
              key={item.page}
              id={`mobile-nav-${item.page}`}
              onClick={() => handleNavClick(item.page)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium ${
                currentPage === item.page
                  ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 font-bold'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <span>{item.label}</span>
            </button>
          ))}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => handleNavClick('verify')}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-600 text-white font-semibold text-sm shadow-md"
            >
              <QrCode className="w-4 h-4" />
              <span>{t('navVerify')}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
