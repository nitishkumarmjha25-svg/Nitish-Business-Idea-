import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import confetti from 'canvas-confetti';
import { 
  Language, 
  Theme, 
  Page, 
  User, 
  Product, 
  Batch, 
  Business, 
  Review, 
  VerificationEvent, 
  ProductReport,
  QRCodeData,
  Role,
  Certification
} from '../types';
import { translations } from '../i18n/translations';
import { 
  INITIAL_USERS, 
  INITIAL_BUSINESSES, 
  INITIAL_PRODUCTS, 
  INITIAL_BATCHES, 
  INITIAL_REVIEWS, 
  INITIAL_VERIFICATION_EVENTS, 
  INITIAL_REPORTS,
  INITIAL_QR_CODES
} from '../data/mockData';

interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface AppContextType {
  // Localization & Theme
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations['en']) => string;
  theme: Theme;
  toggleTheme: () => void;
  
  // Navigation & Routing
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  activeProductId: string;
  setActiveProductId: (id: string) => void;
  activeBatchId: string;
  setActiveBatchId: (id: string) => void;
  
  // Auth & Roles
  currentUser: User;
  switchUserRole: (role: Role) => void;
  
  // Entities & Data
  businesses: Business[];
  products: Product[];
  batches: Batch[];
  reviews: Review[];
  verificationEvents: VerificationEvent[];
  reports: ProductReport[];
  qrCodes: QRCodeData[];
  
  // Actions
  verifyBatchCode: (inputCode: string) => { success: boolean; batch?: Batch; product?: Product; message?: string };
  openProductPassport: (productId: string, batchId?: string) => void;
  addReview: (review: Omit<Review, 'id' | 'createdAt' | 'likesCount' | 'status'>) => void;
  reportCounterfeit: (report: Omit<ProductReport, 'id' | 'timestamp' | 'status'>) => void;
  addProduct: (product: Omit<Product, 'id' | 'trustScore' | 'certifications' | 'currentBatchId'>) => void;
  addBatch: (batch: Omit<Batch, 'id' | 'scanCount' | 'blockchainHash'>) => void;
  updateBusiness: (biz: Business) => void;
  approveProduct: (productId: string) => void;
  rejectProduct: (productId: string) => void;
  approveCertification: (productId: string, certId: string) => void;
  resolveReport: (reportId: string) => void;
  moderateReview: (reviewId: string, status: 'published' | 'hidden') => void;
  generateBatchQR: (productId: string, batchId: string) => QRCodeData;
  
  // Toast
  toast: ToastMessage | null;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  // Load persistent or default settings
  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem('trustmark_lang') || localStorage.getItem('trustify_lang') as Language) || 'en';
  });

  const [theme, setThemeState] = useState<Theme>(() => {
    const saved = (localStorage.getItem('trustmark_theme') || localStorage.getItem('trustify_theme')) as Theme;
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [activeProductId, setActiveProductId] = useState<string>('prod_saffron_1g');
  const [activeBatchId, setActiveBatchId] = useState<string>('batch_vp_saf_09');

  // Entities state
  const [users] = useState<User[]>(INITIAL_USERS);
  const [currentUser, setCurrentUser] = useState<User>(INITIAL_USERS[0]); // Customer by default
  const [businesses, setBusinesses] = useState<Business[]>(INITIAL_BUSINESSES);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [batches, setBatches] = useState<Batch[]>(INITIAL_BATCHES);
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [verificationEvents, setVerificationEvents] = useState<VerificationEvent[]>(INITIAL_VERIFICATION_EVENTS);
  const [reports, setReports] = useState<ProductReport[]>(INITIAL_REPORTS);
  const [qrCodes, setQrCodes] = useState<QRCodeData[]>(INITIAL_QR_CODES);

  // Toast
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now().toString();
    setToast({ id, message, type });
    setTimeout(() => {
      setToast((curr) => (curr?.id === id ? null : curr));
    }, 4000);
  };

  // Sync theme class on document
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('trustmark_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('trustmark_lang', lang);
  };

  const t = (key: keyof typeof translations['en']): string => {
    return translations[language][key] || translations['en'][key] || String(key);
  };

  const switchUserRole = (role: Role) => {
    const foundUser = users.find((u) => u.role === role) || users[0];
    setCurrentUser(foundUser);
    
    // Auto-navigate to appropriate view when switching for convenience
    if (role === 'seller') {
      setCurrentPage('seller');
      showToast(`Switched to Brand Seller: ${foundUser.name}`, 'info');
    } else if (role === 'admin') {
      setCurrentPage('admin');
      showToast(`Switched to Compliance Admin: ${foundUser.name}`, 'info');
    } else {
      setCurrentPage('landing');
      showToast(`Switched to Consumer: ${foundUser.name}`, 'info');
    }
  };

  // Verify product or batch code (manual input or scanner result)
  const verifyBatchCode = (inputCode: string): { success: boolean; batch?: Batch; product?: Product; message?: string } => {
    const cleanCode = inputCode.trim().toUpperCase();
    if (!cleanCode) {
      return { success: false, message: 'Please enter a valid batch or QR code.' };
    }

    // Check by exact batchNumber or QR code string
    let matchedBatch = batches.find(
      (b) => b.batchNumber.toUpperCase() === cleanCode || b.id.toUpperCase() === cleanCode
    );

    let matchedProduct: Product | undefined;

    // If not found in batch directly, check QR codes
    if (!matchedBatch) {
      const qrMatch = qrCodes.find(
        (q) => q.code.toUpperCase() === cleanCode || q.dynamicUrl.toUpperCase().includes(cleanCode)
      );
      if (qrMatch) {
        matchedBatch = batches.find((b) => b.id === qrMatch.batchId);
        matchedProduct = products.find((p) => p.id === qrMatch.productId);
      }
    }

    // If still not found, check product SKU or ID
    if (!matchedBatch) {
      matchedProduct = products.find(
        (p) => p.sku.toUpperCase() === cleanCode || p.id.toUpperCase() === cleanCode || p.name.toUpperCase().includes(cleanCode)
      );
      if (matchedProduct) {
        matchedBatch = batches.find((b) => b.id === matchedProduct?.currentBatchId);
      }
    }

    if (matchedBatch) {
      if (!matchedProduct) {
        matchedProduct = products.find((p) => p.id === matchedBatch?.productId);
      }

      // Record successful verification event
      const indianCities = ['Mumbai', 'Pune', 'Bengaluru', 'Delhi NCR', 'Ahmedabad', 'Hyderabad', 'Kolkata', 'Jaipur'];
      const randomCity = indianCities[Math.floor(Math.random() * indianCities.length)];
      
      const newEvent: VerificationEvent = {
        id: `scan_ev_${Date.now()}`,
        qrCode: `QR-${matchedBatch.batchNumber}`,
        productId: matchedBatch.productId,
        productName: matchedProduct?.name || 'Verified Product',
        brandName: businesses.find(b => b.id === matchedProduct?.brandId)?.name || 'Verified Brand',
        batchNumber: matchedBatch.batchNumber,
        timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
        city: randomCity,
        state: randomCity === 'Mumbai' || randomCity === 'Pune' ? 'Maharashtra' : 'India',
        device: 'TrustMark Mobile Verifier',
        suspiciousFlag: false
      };

      setVerificationEvents((prev) => [newEvent, ...prev.slice(0, 49)]);

      // Increment batch scan count
      setBatches((prev) =>
        prev.map((b) => (b.id === matchedBatch?.id ? { ...b, scanCount: b.scanCount + 1 } : b))
      );

      // Celebrate verified authentication with confetti!
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#10b981', '#059669', '#34d399', '#0284c7']
        });
      } catch {
        // Fallback gracefully
      }

      setActiveProductId(matchedBatch.productId);
      setActiveBatchId(matchedBatch.id);
      setCurrentPage('passport');

      return {
        success: true,
        batch: matchedBatch,
        product: matchedProduct
      };
    }

    // Flagged as unverified
    return {
      success: false,
      message: `Batch code "${inputCode}" could not be authenticated in the official registry. Possible counterfeit or unregistered batch.`
    };
  };

  const openProductPassport = (productId: string, batchId?: string) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    const bId = batchId || product.currentBatchId || batches.find((b) => b.productId === productId)?.id || '';
    setActiveProductId(productId);
    if (bId) setActiveBatchId(bId);
    setCurrentPage('passport');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addReview = (reviewData: Omit<Review, 'id' | 'createdAt' | 'likesCount' | 'status'>) => {
    const newRev: Review = {
      ...reviewData,
      id: `rev_${Date.now()}`,
      createdAt: new Date().toISOString().slice(0, 10),
      likesCount: 1,
      status: 'published'
    };

    setReviews((prev) => [newRev, ...prev]);

    // Recalculate product trust score slightly upward on verified good review
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === reviewData.productId) {
          const delta = reviewData.rating >= 4 ? 1 : -1;
          const newScore = Math.min(100, Math.max(70, p.trustScore + delta));
          return { ...p, trustScore: newScore };
        }
        return p;
      })
    );

    showToast(t('reviewSuccess'), 'success');
  };

  const reportCounterfeit = (reportData: Omit<ProductReport, 'id' | 'timestamp' | 'status'>) => {
    const newReport: ProductReport = {
      ...reportData,
      id: `rep_${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      status: 'investigating'
    };

    setReports((prev) => [newReport, ...prev]);
    showToast('Counterfeit report logged successfully! Compliance team notified.', 'success');
  };

  const addProduct = (newProdData: Omit<Product, 'id' | 'trustScore' | 'certifications' | 'currentBatchId'>) => {
    const prodId = `prod_${Date.now()}`;
    const newProduct: Product = {
      ...newProdData,
      id: prodId,
      trustScore: 92,
      currentBatchId: '',
      certifications: [
        {
          id: `cert_${Date.now()}`,
          entityId: prodId,
          type: 'FSSAI',
          certificateNumber: `FSSAI-${Math.floor(10000000000000 + Math.random() * 90000000000000)}`,
          issuedBy: 'Food Safety and Standards Authority of India',
          validUntil: '2027-12-31',
          verificationUrl: 'https://foscos.fssai.gov.in',
          status: 'verified',
          issuedDate: '2024-01-01'
        }
      ]
    };

    setProducts((prev) => [newProduct, ...prev]);
    showToast(`Product "${newProduct.name}" created successfully!`, 'success');
  };

  const addBatch = (newBatchData: Omit<Batch, 'id' | 'scanCount' | 'blockchainHash'>) => {
    const batchId = `batch_${Date.now()}`;
    const randomHash = '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    
    const newBatch: Batch = {
      ...newBatchData,
      id: batchId,
      scanCount: 0,
      blockchainHash: randomHash
    };

    setBatches((prev) => [newBatch, ...prev]);

    // Update product's currentBatchId
    setProducts((prev) =>
      prev.map((p) => (p.id === newBatch.productId ? { ...p, currentBatchId: batchId } : p))
    );

    // Auto generate QR data
    generateBatchQR(newBatch.productId, batchId);

    showToast(`Batch "${newBatch.batchNumber}" created & QR registered!`, 'success');
  };

  const updateBusiness = (updatedBiz: Business) => {
    setBusinesses((prev) => prev.map((b) => (b.id === updatedBiz.id ? updatedBiz : b)));
    showToast(t('savedSuccess'), 'success');
  };

  const approveProduct = (productId: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, status: 'published', trustScore: 95 } : p))
    );
    showToast('Product verified and published to national registry!', 'success');
  };

  const rejectProduct = (productId: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, status: 'rejected' } : p))
    );
    showToast('Product application rejected.', 'info');
  };

  const approveCertification = (productId: string, certId: string) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const updatedCerts = p.certifications.map((c) =>
            c.id === certId ? ({ ...c, status: 'verified' } as Certification) : c
          );
          return { ...p, certifications: updatedCerts, trustScore: Math.min(100, p.trustScore + 2) };
        }
        return p;
      })
    );
    showToast('Certification status approved and verified!', 'success');
  };

  const resolveReport = (reportId: string) => {
    setReports((prev) =>
      prev.map((r) => (r.id === reportId ? { ...r, status: 'resolved' } : r))
    );
    showToast('Incident report marked as resolved.', 'info');
  };

  const moderateReview = (reviewId: string, status: 'published' | 'hidden') => {
    setReviews((prev) =>
      prev.map((r) => (r.id === reviewId ? { ...r, status } : r))
    );
    showToast(`Review marked as ${status}.`, 'info');
  };

  const generateBatchQR = (productId: string, batchId: string): QRCodeData => {
    const existing = qrCodes.find((q) => q.batchId === batchId);
    if (existing) return existing;

    const batch = batches.find((b) => b.id === batchId);
    const codeStr = `QR-${batch?.batchNumber || 'BATCH'}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newQR: QRCodeData = {
      code: codeStr,
      batchId,
      productId,
      serialNumber: `SR-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`,
      generatedAt: new Date().toISOString().slice(0, 10),
      scanCount: 0,
      dynamicUrl: `https://trustmark.in/verify?code=${batch?.batchNumber || ''}`
    };

    setQrCodes((prev) => [newQR, ...prev]);
    return newQR;
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t,
        theme,
        toggleTheme,
        currentPage,
        setCurrentPage,
        activeProductId,
        setActiveProductId,
        activeBatchId,
        setActiveBatchId,
        currentUser,
        switchUserRole,
        businesses,
        products,
        batches,
        reviews,
        verificationEvents,
        reports,
        qrCodes,
        verifyBatchCode,
        openProductPassport,
        addReview,
        reportCounterfeit,
        addProduct,
        addBatch,
        updateBusiness,
        approveProduct,
        rejectProduct,
        approveCertification,
        resolveReport,
        moderateReview,
        generateBatchQR,
        toast,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
