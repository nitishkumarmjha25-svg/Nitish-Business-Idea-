import { useState, useEffect, useRef, FormEvent } from 'react';
import { 
  Building2, 
  Package, 
  Tag, 
  QrCode, 
  BarChart3, 
  Star, 
  Plus, 
  Download, 
  Printer, 
  Save, 
  CheckCircle2, 
  Eye, 
  Sparkles, 
  FileText, 
  ShieldCheck, 
  ArrowUpRight,
  TrendingUp,
  MapPin,
  Smartphone,
  Palette
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Product, Batch, Business } from '../types';
import { generateQrDataUrl, generateQrSvgString } from '../utils/qrHelper';

export function SellerDashboard() {
  const { 
    businesses, 
    products, 
    batches, 
    reviews, 
    updateBusiness, 
    addProduct, 
    addBatch, 
    openProductPassport, 
    showToast, 
    t 
  } = useApp();

  // Pick seller's business (default to VedaPure for demo)
  const currentBiz = businesses[0];

  const [activeTab, setActiveTab] = useState<'branding' | 'products' | 'labels' | 'qr' | 'analytics' | 'reviews'>('branding');

  // Brand profile editing state
  const [name, setName] = useState(currentBiz.name);
  const [legalName, setLegalName] = useState(currentBiz.legalName);
  const [tagline, setTagline] = useState(currentBiz.tagline);
  const [logoUrl, setLogoUrl] = useState(currentBiz.logoUrl);
  const [primaryColor, setPrimaryColor] = useState(currentBiz.primaryColor);
  const [secondaryColor, setSecondaryColor] = useState(currentBiz.secondaryColor);
  const [fssaiNumber, setFssaiNumber] = useState(currentBiz.fssaiNumber);
  const [gstin, setGstin] = useState(currentBiz.gstin);
  const [description, setDescription] = useState(currentBiz.description);

  // Label studio state
  const [selectedLabelProduct, setSelectedLabelProduct] = useState<string>(products[0]?.id || '');
  const [labelFormat, setLabelFormat] = useState<'jar' | 'box' | 'pouch'>('jar');
  const [labelQrUrl, setLabelQrUrl] = useState<string>('');

  // QR Studio state
  const [selectedQrBatch, setSelectedQrBatch] = useState<string>(batches[0]?.id || '');
  const [qrPreviewUrl, setQrPreviewUrl] = useState<string>('');

  // Modal states
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showAddBatchModal, setShowAddBatchModal] = useState(false);

  // New product form
  const [newProdName, setNewProdName] = useState('');
  const [newProdCategory, setNewProdCategory] = useState<Product['category']>('Organic Foods & Spices');
  const [newProdSku, setNewProdSku] = useState('');
  const [newProdNetWt, setNewProdNetWt] = useState('');
  const [newProdMrp, setNewProdMrp] = useState(499);
  const [newProdDesc, setNewProdDesc] = useState('');
  const [newProdPackaging, setNewProdPackaging] = useState('Glass Jar with Holographic Tamper-Seal');

  // New batch form
  const [batchProdId, setBatchProdId] = useState(products[0]?.id || '');
  const [batchNum, setBatchNum] = useState('');
  const [batchMfgDate, setBatchMfgDate] = useState('2024-09-10');
  const [batchExpDate, setBatchExpDate] = useState('2026-09-09');
  const [batchFacility, setBatchFacility] = useState('Central Food Processing & Quality Facility');
  const [batchLocation, setBatchLocation] = useState('Sector 18, Industrial Estate, India');
  const [batchLicense, setBatchLicense] = useState('FSSAI-MFG-2024-8801');
  const [batchQty, setBatchQty] = useState(1500);

  // Filter seller's products
  const sellerProducts = products.filter((p) => p.brandId === currentBiz.id || true);
  const sellerBatches = batches.filter((b) => sellerProducts.some((p) => p.id === b.productId));

  // Generate QR for the Label Studio
  useEffect(() => {
    const prod = products.find((p) => p.id === selectedLabelProduct) || products[0];
    const b = batches.find((b) => b.id === prod?.currentBatchId || b.productId === prod?.id) || batches[0];
    const code = b ? b.batchNumber : prod.sku;
    generateQrDataUrl(`${window.location.origin}/?code=${code}`, {
      width: 180,
      darkColor: primaryColor || '#0a192f'
    }).then(setLabelQrUrl);
  }, [selectedLabelProduct, primaryColor, products, batches]);

  // Generate QR for QR Studio
  useEffect(() => {
    const b = batches.find((b) => b.id === selectedQrBatch) || batches[0];
    if (b) {
      generateQrDataUrl(`${window.location.origin}/?code=${b.batchNumber}`, {
        width: 260,
        darkColor: primaryColor || '#0a192f'
      }).then(setQrPreviewUrl);
    }
  }, [selectedQrBatch, primaryColor, batches]);

  const handleSaveBrand = (e: FormEvent) => {
    e.preventDefault();
    updateBusiness({
      ...currentBiz,
      name,
      legalName,
      tagline,
      logoUrl,
      primaryColor,
      secondaryColor,
      fssaiNumber,
      gstin,
      description
    });
  };

  const handleCreateProduct = (e: FormEvent) => {
    e.preventDefault();
    if (!newProdName.trim() || !newProdSku.trim()) return;

    addProduct({
      brandId: currentBiz.id,
      name: newProdName.trim(),
      category: newProdCategory,
      sku: newProdSku.trim().toUpperCase(),
      description: newProdDesc.trim() || 'Certified authentic formulation.',
      heroImage: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
      packagingType: newProdPackaging,
      netWeight: newProdNetWt.trim() || '100g',
      mrp: Number(newProdMrp),
      storageInstructions: 'Keep in a cool, dry place away from direct sunlight.',
      shelfLifeMonths: 24,
      originCountry: 'India',
      status: 'published',
      ingredients: [
        {
          name: 'Primary Certified Botanical Extract',
          percentage: 100,
          originLocation: 'Western Ghats / Kashmir Valley',
          organicCertified: true,
          supplierName: 'Direct Farmer Producer Org'
        }
      ]
    });

    setShowAddProductModal(false);
    setNewProdName('');
    setNewProdSku('');
    setNewProdNetWt('');
  };

  const handleCreateBatch = (e: FormEvent) => {
    e.preventDefault();
    if (!batchNum.trim()) return;

    addBatch({
      productId: batchProdId,
      batchNumber: batchNum.trim().toUpperCase(),
      mfgDate: batchMfgDate,
      expDate: batchExpDate,
      productionFacility: batchFacility,
      facilityLocation: batchLocation,
      mfgLicense: batchLicense,
      quantityProduced: Number(batchQty),
      inspectionStatus: 'passed',
      tamperSealVerified: true,
      labTestResults: [
        {
          parameter: 'Active Compound Purity Assay',
          standardValue: 'Min 95.0%',
          observedValue: '99.2%',
          status: 'pass',
          certifiedBy: 'NABL Certified Central Analytical Facility'
        },
        {
          parameter: 'Heavy Metal Screening (Pb, As, Hg, Cd)',
          standardValue: 'Below Limit of Quantification',
          observedValue: 'Negative / Compliant',
          status: 'pass',
          certifiedBy: 'CSIR Research Unit'
        }
      ]
    });

    setShowAddBatchModal(false);
    setBatchNum('');
  };

  const selectedProdObj = products.find((p) => p.id === selectedLabelProduct) || products[0];
  const selectedBatchObj = batches.find((b) => b.id === selectedProdObj.currentBatchId || b.productId === selectedProdObj.id) || batches[0];

  return (
    <div id="seller-dashboard-page" className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5" />
              <span>Verified Brand Hub</span>
            </span>
            <span className="text-xs text-slate-500">• {currentBiz.name}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-display tracking-tight">
            {t('sellerPortalTitle')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            {t('sellerPortalSub')}
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2.5">
          <button
            id="btn-seller-new-product"
            onClick={() => setShowAddProductModal(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 dark:bg-slate-800 text-white text-xs font-bold hover:bg-slate-800 transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>{t('addProduct')}</span>
          </button>
          <button
            id="btn-seller-new-batch"
            onClick={() => setShowAddBatchModal(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors shadow-sm shadow-emerald-600/20"
          >
            <Sparkles className="w-4 h-4" />
            <span>{t('addBatch')}</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Products</span>
            <Package className="w-4 h-4 text-indigo-500" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white mt-2 font-display">{sellerProducts.length}</p>
          <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1">100% Verified Passports</p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Batches</span>
            <Tag className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white mt-2 font-display">{sellerBatches.length}</p>
          <p className="text-[11px] text-slate-500 mt-1">All serialized with QR</p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Consumer Scans</span>
            <TrendingUp className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white mt-2 font-display">
            {sellerBatches.reduce((acc, b) => acc + b.scanCount, 0).toLocaleString()}
          </p>
          <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1">+14% this week in Mumbai & NCR</p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Avg Trust Rating</span>
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white mt-2 font-display">4.9 / 5.0</p>
          <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1">Zero counterfeit warnings</p>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl px-3 py-1 mb-6 shadow-sm overflow-x-auto">
        <button
          id="seller-tab-branding"
          onClick={() => setActiveTab('branding')}
          className={`px-4 py-2.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'branding'
              ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Palette className="w-4 h-4" />
          <span>{t('tabBranding')}</span>
        </button>

        <button
          id="seller-tab-products"
          onClick={() => setActiveTab('products')}
          className={`px-4 py-2.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'products'
              ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>{t('tabProducts')} ({sellerProducts.length})</span>
        </button>

        <button
          id="seller-tab-labels"
          onClick={() => setActiveTab('labels')}
          className={`px-4 py-2.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'labels'
              ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Tag className="w-4 h-4" />
          <span>{t('tabPackaging')}</span>
        </button>

        <button
          id="seller-tab-qr"
          onClick={() => setActiveTab('qr')}
          className={`px-4 py-2.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'qr'
              ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <QrCode className="w-4 h-4" />
          <span>{t('tabQrStudio')}</span>
        </button>

        <button
          id="seller-tab-analytics"
          onClick={() => setActiveTab('analytics')}
          className={`px-4 py-2.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'analytics'
              ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>{t('tabAnalytics')}</span>
        </button>

        <button
          id="seller-tab-reviews"
          onClick={() => setActiveTab('reviews')}
          className={`px-4 py-2.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'reviews'
              ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Star className="w-4 h-4" />
          <span>{t('tabSellerReviews')}</span>
        </button>
      </div>

      {/* TAB 1: BRAND IDENTITY & PROFILE TOOLKIT */}
      {activeTab === 'branding' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm animate-in fade-in duration-150">
          <div className="max-w-3xl">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display mb-1">
              Brand Identity & Statutory Credentials
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
              Configure your brand logo, corporate colors, FSSAI / GSTIN registration, and brand story shown on every consumer Digital Product Passport.
            </p>

            <form onSubmit={handleSaveBrand} className="space-y-5">
              
              {/* Logo Preview & Upload simulator */}
              <div className="flex items-center gap-5 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800">
                <img
                  src={logoUrl}
                  alt={name}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-white dark:border-slate-700 shadow-md shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t('brandLogo')} URL
                  </label>
                  <input
                    type="text"
                    value={logoUrl}
                    onChange={(e) => setLogoUrl(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                  <div className="mt-2 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setLogoUrl('https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=200')}
                      className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold hover:underline"
                    >
                      Use Herb Logo
                    </button>
                    <span className="text-slate-300">•</span>
                    <button
                      type="button"
                      onClick={() => setLogoUrl('https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?w=200')}
                      className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold hover:underline"
                    >
                      Use Dairy Logo
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Brand Public Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Registered Legal Entity Name
                  </label>
                  <input
                    type="text"
                    required
                    value={legalName}
                    onChange={(e) => setLegalName(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t('brandTagline')}
                  </label>
                  <input
                    type="text"
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Brand Palette (Primary Navy / Accent Green)
                  </label>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={primaryColor}
                        onChange={(e) => setPrimaryColor(e.target.value)}
                        className="w-8 h-8 rounded-lg cursor-pointer border border-slate-300"
                      />
                      <span className="text-[11px] font-mono text-slate-500">{primaryColor}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={secondaryColor}
                        onChange={(e) => setSecondaryColor(e.target.value)}
                        className="w-8 h-8 rounded-lg cursor-pointer border border-slate-300"
                      />
                      <span className="text-[11px] font-mono text-slate-500">{secondaryColor}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t('fssaiNo')}
                  </label>
                  <input
                    type="text"
                    value={fssaiNumber}
                    onChange={(e) => setFssaiNumber(e.target.value)}
                    className="w-full px-3 py-2 text-xs font-mono rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t('gstinNo')}
                  </label>
                  <input
                    type="text"
                    value={gstin}
                    onChange={(e) => setGstin(e.target.value)}
                    className="w-full px-3 py-2 text-xs font-mono rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Brand Story & Quality Commitment
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-emerald-500 focus:outline-none resize-none"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  id="btn-save-brand-identity"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>{t('saveChanges')}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TAB 2: PRODUCTS & BATCHES */}
      {activeTab === 'products' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Registered Products ({sellerProducts.length})
            </h3>
            <button
              onClick={() => setShowAddProductModal(true)}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Product</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {sellerProducts.map((prod) => {
              const currentBatch = batches.find((b) => b.id === prod.currentBatchId || b.productId === prod.id);
              return (
                <div
                  key={prod.id}
                  className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <img src={prod.heroImage} alt={prod.name} className="w-14 h-14 rounded-xl object-cover border border-slate-200" />
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold text-[10px]">
                        Score: {prod.trustScore}/100
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">{prod.name}</h4>
                    <p className="text-[11px] text-slate-500 font-mono mt-0.5">SKU: {prod.sku}</p>

                    <div className="mt-3 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-[11px] space-y-1">
                      <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                        <span>Current Active Batch:</span>
                        <strong className="font-mono text-emerald-600 dark:text-emerald-400">
                          {currentBatch?.batchNumber || 'No Batch'}
                        </strong>
                      </div>
                      <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                        <span>Net Wt / MRP:</span>
                        <span>{prod.netWeight} • ₹{prod.mrp}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <button
                      onClick={() => openProductPassport(prod.id)}
                      className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                    >
                      <span>View Passport</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        setBatchProdId(prod.id);
                        setShowAddBatchModal(true);
                      }}
                      className="px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
                    >
                      + New Batch
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: PACKAGING & LABEL STUDIO */}
      {activeTab === 'labels' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm animate-in fade-in duration-150">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Controls */}
            <div className="space-y-5">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white font-display">
                  Product Packaging & Label Studio
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Design compliant regulatory label strips with embedded dynamic TrustMark QR codes ready for printing.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Select Product for Label
                </label>
                <select
                  value={selectedLabelProduct}
                  onChange={(e) => setSelectedLabelProduct(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>{p.name} ({p.sku})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Packaging Die-cut Format
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setLabelFormat('jar')}
                    className={`py-2 px-2 text-xs font-bold rounded-xl border transition-all ${
                      labelFormat === 'jar'
                        ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-700 dark:text-emerald-300'
                        : 'border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    Glass Jar (Wrap)
                  </button>
                  <button
                    type="button"
                    onClick={() => setLabelFormat('box')}
                    className={`py-2 px-2 text-xs font-bold rounded-xl border transition-all ${
                      labelFormat === 'box'
                        ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-700 dark:text-emerald-300'
                        : 'border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    Mono Carton
                  </button>
                  <button
                    type="button"
                    onClick={() => setLabelFormat('pouch')}
                    className={`py-2 px-2 text-xs font-bold rounded-xl border transition-all ${
                      labelFormat === 'pouch'
                        ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-700 dark:text-emerald-300'
                        : 'border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    Foil Pouch
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
                <span className="font-bold text-slate-900 dark:text-white">Compliance Checklist:</span>
                <div className="space-y-1 text-slate-600 dark:text-slate-400 text-[11px]">
                  <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>FSSAI License ({currentBiz.fssaiNumber})</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Batch Number ({selectedBatchObj?.batchNumber})</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Dynamic Scan-for-Passport QR</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => window.print()}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-slate-900 dark:bg-slate-800 text-white text-xs font-bold hover:bg-slate-800 transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>{t('printLabel')}</span>
                </button>
                <button
                  onClick={() => showToast('Label template downloaded in High-Res SVG format!', 'success')}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-sm shadow-emerald-600/20"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{t('downloadLabel')}</span>
                </button>
              </div>
            </div>

            {/* Right Live Label Preview */}
            <div className="lg:col-span-2 flex flex-col items-center justify-center bg-slate-100 dark:bg-slate-950 p-6 rounded-3xl border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-3">
                Live Interactive Packaging Label Preview (Ready for Print)
              </span>

              {/* Physical Product Label Simulation */}
              <div 
                id="printable-product-label"
                className="w-full max-w-xl bg-white text-slate-900 rounded-2xl shadow-xl p-6 border-2 border-slate-300 relative overflow-hidden"
                style={{ borderTop: `6px solid ${primaryColor}` }}
              >
                {/* Header with Logo & Brand Name */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <div className="flex items-center gap-3">
                    <img src={currentBiz.logoUrl} alt={currentBiz.name} className="w-10 h-10 rounded-lg object-cover" />
                    <div>
                      <h4 className="text-base font-extrabold font-display leading-tight">{currentBiz.name}</h4>
                      <p className="text-[10px] text-slate-500">{currentBiz.tagline}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-black tracking-wider">
                      TrustMark VERIFIED
                    </span>
                    <p className="text-[9px] text-slate-400 mt-0.5">Lic: {currentBiz.fssaiNumber}</p>
                  </div>
                </div>

                {/* Main Product Title & QR */}
                <div className="grid grid-cols-3 gap-4 py-4 items-center">
                  <div className="col-span-2 space-y-1.5">
                    <h5 className="text-sm font-black leading-snug">{selectedProdObj.name}</h5>
                    <p className="text-[10px] text-slate-600 line-clamp-2 leading-relaxed">
                      {selectedProdObj.description}
                    </p>

                    <div className="pt-2 grid grid-cols-2 gap-x-2 gap-y-1 text-[10px] text-slate-700">
                      <div>Batch: <strong className="font-mono text-emerald-700">{selectedBatchObj?.batchNumber}</strong></div>
                      <div>Net Wt: <strong>{selectedProdObj.netWeight}</strong></div>
                      <div>Mfg: <strong>{selectedBatchObj?.mfgDate}</strong></div>
                      <div>MRP: <strong>₹{selectedProdObj.mrp}</strong> (incl. taxes)</div>
                    </div>
                  </div>

                  <div className="text-center p-2 rounded-xl bg-slate-50 border border-slate-200">
                    {labelQrUrl ? (
                      <img src={labelQrUrl} alt="Label QR" className="w-24 h-24 mx-auto object-contain" />
                    ) : (
                      <div className="w-24 h-24 mx-auto bg-slate-200 animate-pulse" />
                    )}
                    <p className="text-[9px] font-extrabold uppercase tracking-tight text-emerald-700 mt-1">
                      Scan for Passport
                    </p>
                  </div>
                </div>

                {/* Footer Statutory Warning */}
                <div className="pt-2.5 border-t border-slate-200 flex items-center justify-between text-[9px] text-slate-500">
                  <span>Mfg by: {selectedBatchObj?.productionFacility}</span>
                  <span className="font-semibold text-slate-700">100% Tamper Proof</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: QR CODE GENERATOR */}
      {activeTab === 'qr' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm animate-in fade-in duration-150">
          <div className="max-w-xl mx-auto text-center space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display">
                High-Resolution QR Serialization Studio
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Export vector SVG or PNG QR codes for laser etching or packaging printing.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Select Batch for QR Generation
              </label>
              <select
                value={selectedQrBatch}
                onChange={(e) => setSelectedQrBatch(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                {batches.map((b) => (
                  <option key={b.id} value={b.id}>{b.batchNumber} - {products.find(p => p.id === b.productId)?.name}</option>
                ))}
              </select>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 inline-block">
              {qrPreviewUrl ? (
                <img src={qrPreviewUrl} alt="QR Preview" className="w-52 h-52 rounded-2xl bg-white p-3 shadow-md mx-auto" />
              ) : (
                <div className="w-52 h-52 bg-slate-200 dark:bg-slate-700 rounded-2xl animate-pulse mx-auto" />
              )}
              <div className="mt-3">
                <span className="text-xs font-mono font-bold text-slate-900 dark:text-white">
                  {batches.find(b => b.id === selectedQrBatch)?.batchNumber}
                </span>
                <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">
                  Dynamic Redirect: https://trustmark.in/verify
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => {
                  const a = document.createElement('a');
                  a.href = qrPreviewUrl;
                  a.download = `TrustMark-${batches.find(b => b.id === selectedQrBatch)?.batchNumber}.png`;
                  a.click();
                  showToast('PNG QR downloaded successfully!', 'success');
                }}
                className="px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-800 text-white text-xs font-bold hover:bg-slate-800 transition-colors flex items-center gap-1.5"
              >
                <Download className="w-4 h-4" />
                <span>Download PNG (2000px)</span>
              </button>
              <button
                onClick={() => showToast('Vector SVG QR code generated and saved!', 'success')}
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors flex items-center gap-1.5"
              >
                <Sparkles className="w-4 h-4" />
                <span>Download Vector SVG</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: SCAN ANALYTICS */}
      {activeTab === 'analytics' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Scans by City in India */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-500" />
                <span>Top Regional Scan Volume (India)</span>
              </h4>

              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between font-semibold mb-1">
                    <span>Mumbai & MMR</span>
                    <span className="text-emerald-600">42% (1,280 scans)</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full w-[42%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-semibold mb-1">
                    <span>Delhi NCR</span>
                    <span className="text-emerald-600">28% (850 scans)</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full w-[28%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-semibold mb-1">
                    <span>Bengaluru</span>
                    <span className="text-emerald-600">18% (540 scans)</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full w-[18%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-semibold mb-1">
                    <span>Pune</span>
                    <span className="text-emerald-600">12% (360 scans)</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full w-[12%]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Device breakdown */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4 flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-indigo-500" />
                <span>Consumer Verification Platforms</span>
              </h4>

              <div className="space-y-4 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">Android Mobile (Chrome/Edge)</p>
                    <p className="text-[10px] text-slate-500">Samsung, OnePlus, Pixel</p>
                  </div>
                  <span className="font-extrabold text-indigo-600 text-sm">64%</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">Apple iOS (Safari Scanner)</p>
                    <p className="text-[10px] text-slate-500">iPhone 13 / 14 / 15</p>
                  </div>
                  <span className="font-extrabold text-indigo-600 text-sm">36%</span>
                </div>
              </div>
            </div>

            {/* Counterfeit flags summary */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>Integrity Audit Status</span>
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Real-time anti-cloning algorithm checking for concurrent scans across disparate locations.
                </p>
                <div className="mt-4 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 text-center">
                  <span className="text-2xl font-black text-emerald-600">0 Flags</span>
                  <p className="text-[11px] text-emerald-800 dark:text-emerald-300 font-semibold mt-1">
                    No suspicious clone patterns detected in the last 30 days
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: CUSTOMER REVIEWS */}
      {activeTab === 'reviews' && (
        <div className="space-y-4 animate-in fade-in duration-150">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-2">
            Recent Feedback Across Your Batches
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reviews.map((r) => (
              <div key={r.id} className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">{r.userName}</span>
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className={`w-3.5 h-3.5 ${s <= r.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-300'}`} />
                    ))}
                  </div>
                </div>
                <h5 className="text-xs font-semibold text-slate-800 dark:text-slate-200">{r.title}</h5>
                <p className="text-xs text-slate-600 dark:text-slate-400">{r.comment}</p>
                <div className="pt-2 text-[10px] text-slate-400 flex items-center justify-between">
                  <span>Batch: {r.batchNumber}</span>
                  <span>{r.createdAt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL: ADD PRODUCT */}
      {showAddProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Register New Product</h3>
            <form onSubmit={handleCreateProduct} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Product Name</label>
                <input
                  type="text"
                  required
                  value={newProdName}
                  onChange={(e) => setNewProdName(e.target.value)}
                  placeholder="e.g. Pure Kashmiri Walnut Oil (250ml)"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Category</label>
                  <select
                    value={newProdCategory}
                    onChange={(e) => setNewProdCategory(e.target.value as Product['category'])}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700"
                  >
                    <option value="Organic Foods & Spices">Organic Foods & Spices</option>
                    <option value="Ayurveda & Health">Ayurveda & Health</option>
                    <option value="Dairy & Fresh">Dairy & Fresh</option>
                    <option value="Beverages">Beverages</option>
                    <option value="Electronics & Tech">Electronics & Tech</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-1">SKU Code</label>
                  <input
                    type="text"
                    required
                    value={newProdSku}
                    onChange={(e) => setNewProdSku(e.target.value)}
                    placeholder="VP-WALNUT-250ML"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-mono uppercase"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Net Weight / Volume</label>
                  <input
                    type="text"
                    required
                    value={newProdNetWt}
                    onChange={(e) => setNewProdNetWt(e.target.value)}
                    placeholder="250 ml / 500 g"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">MRP (₹)</label>
                  <input
                    type="number"
                    required
                    value={newProdMrp}
                    onChange={(e) => setNewProdMrp(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Packaging Specification</label>
                <input
                  type="text"
                  value={newProdPackaging}
                  onChange={(e) => setNewProdPackaging(e.target.value)}
                  placeholder="Food-grade amber glass bottle"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Description</label>
                <textarea
                  rows={2}
                  value={newProdDesc}
                  onChange={(e) => setNewProdDesc(e.target.value)}
                  placeholder="Authentic description..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 resize-none"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddProductModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 hover:bg-slate-100 dark:border-slate-700 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold"
                >
                  Save & Publish Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD BATCH */}
      {showAddBatchModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">Create New Batch & QR Serial</h3>
            <form onSubmit={handleCreateBatch} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Target Product</label>
                <select
                  value={batchProdId}
                  onChange={(e) => setBatchProdId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>{p.name} ({p.sku})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Batch Code</label>
                  <input
                    type="text"
                    required
                    value={batchNum}
                    onChange={(e) => setBatchNum(e.target.value)}
                    placeholder="VP-SAF-2025-B01"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-mono uppercase"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Quantity Produced</label>
                  <input
                    type="number"
                    required
                    value={batchQty}
                    onChange={(e) => setBatchQty(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Mfg Date</label>
                  <input
                    type="date"
                    required
                    value={batchMfgDate}
                    onChange={(e) => setBatchMfgDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Expiry Date</label>
                  <input
                    type="date"
                    required
                    value={batchExpDate}
                    onChange={(e) => setBatchExpDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Manufacturing Facility Name</label>
                <input
                  type="text"
                  required
                  value={batchFacility}
                  onChange={(e) => setBatchFacility(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Facility Location & License</label>
                <input
                  type="text"
                  required
                  value={batchLocation}
                  onChange={(e) => setBatchLocation(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddBatchModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 hover:bg-slate-100 dark:border-slate-700 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold"
                >
                  Register Batch & Hash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
