import { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { LandingPage } from './components/LandingPage';
import { VerifyPage } from './components/VerifyPage';
import { ProductPassportPage } from './components/ProductPassportPage';
import { SellerDashboard } from './components/SellerDashboard';
import { AdminPanel } from './components/AdminPanel';
import { HowItWorksPage } from './components/HowItWorksPage';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';

function AppContent() {
  const { currentPage, verifyBatchCode, openProductPassport } = useApp();

  // Handle URL query parameters for direct QR scan redirects (e.g. ?code=VP-SAF-2024-B09)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const productId = params.get('product');

    if (code) {
      verifyBatchCode(code);
    } else if (productId) {
      openProductPassport(productId);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-emerald-500 selection:text-white transition-colors duration-200">
      {/* Global Navbar */}
      <Navbar />

      {/* Main Page Router */}
      <main className="flex-1">
        {currentPage === 'landing' && <LandingPage />}
        {currentPage === 'verify' && <VerifyPage />}
        {currentPage === 'passport' && <ProductPassportPage />}
        {currentPage === 'seller' && <SellerDashboard />}
        {currentPage === 'admin' && <AdminPanel />}
        {currentPage === 'how-it-works' && <HowItWorksPage />}
        {currentPage === 'about' && <AboutPage />}
        {currentPage === 'contact' && <ContactPage />}
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Global Toast Notification */}
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
