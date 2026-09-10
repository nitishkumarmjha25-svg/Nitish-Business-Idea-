import { useState } from 'react';
import { 
  ShieldAlert, 
  CheckCircle2, 
  XCircle, 
  Building2, 
  Package, 
  FileText, 
  AlertTriangle, 
  Eye, 
  Activity, 
  UserCheck, 
  Search,
  ExternalLink,
  ShieldCheck,
  Check,
  Ban
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Product, Business, ProductReport, Certification } from '../types';

export function AdminPanel() {
  const { 
    businesses, 
    products, 
    batches, 
    reports, 
    reviews, 
    verificationEvents, 
    approveProduct, 
    rejectProduct, 
    approveCertification, 
    resolveReport, 
    moderateReview,
    openProductPassport,
    t, 
    showToast 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'approvals' | 'brands' | 'certs' | 'reports' | 'reviews' | 'audit'>('approvals');
  const [searchFilter, setSearchFilter] = useState('');

  const pendingProducts = products.filter((p) => p.status === 'under_review' || p.status === 'draft');
  const pendingReports = reports.filter((r) => r.status === 'investigating');

  // Collect all certifications across products
  const allCerts: { cert: Certification; product: Product }[] = [];
  products.forEach((p) => {
    p.certifications.forEach((c) => {
      allCerts.push({ cert: c, product: p });
    });
  });

  return (
    <div id="admin-panel-page" className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>National Compliance Authority</span>
            </span>
            <span className="text-xs text-slate-500">• Official Audit Mode</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-display tracking-tight">
            {t('adminPortalTitle')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            {t('adminPortalSub')}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 font-semibold flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span>Anti-Counterfeit Net Active</span>
          </div>
        </div>
      </div>

      {/* Admin KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Registered Brands</span>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1 font-display">{businesses.length}</p>
          <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1">100% KYC & GSTIN Cleared</p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Verified Products</span>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1 font-display">{products.length}</p>
          <p className="text-[11px] text-slate-500 mt-1">{batches.length} Serialized Batches</p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Incident Reports</span>
          <p className="text-2xl font-extrabold text-amber-600 dark:text-amber-400 mt-1 font-display">{reports.length}</p>
          <p className="text-[11px] text-rose-600 dark:text-rose-400 font-semibold mt-1">{pendingReports.length} Open Investigations</p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Live Scans Today</span>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1 font-display">{verificationEvents.length}</p>
          <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1">Real-time Stream</p>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-2xl px-3 py-1 mb-6 shadow-sm overflow-x-auto">
        <button
          id="admin-tab-approvals"
          onClick={() => setActiveTab('approvals')}
          className={`px-4 py-2.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'approvals'
              ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Product Approvals ({pendingProducts.length > 0 ? pendingProducts.length : '0'})</span>
        </button>

        <button
          id="admin-tab-brands"
          onClick={() => setActiveTab('brands')}
          className={`px-4 py-2.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'brands'
              ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Registered Brands ({businesses.length})</span>
        </button>

        <button
          id="admin-tab-certs"
          onClick={() => setActiveTab('certs')}
          className={`px-4 py-2.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'certs'
              ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Certification Hub ({allCerts.length})</span>
        </button>

        <button
          id="admin-tab-reports"
          onClick={() => setActiveTab('reports')}
          className={`px-4 py-2.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'reports'
              ? 'bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <AlertTriangle className="w-4 h-4" />
          <span>Counterfeit Reports ({reports.length})</span>
        </button>

        <button
          id="admin-tab-reviews"
          onClick={() => setActiveTab('reviews')}
          className={`px-4 py-2.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'reviews'
              ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <UserCheck className="w-4 h-4" />
          <span>Review Moderation ({reviews.length})</span>
        </button>

        <button
          id="admin-tab-audit"
          onClick={() => setActiveTab('audit')}
          className={`px-4 py-2.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'audit'
              ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Live Scan Stream ({verificationEvents.length})</span>
        </button>
      </div>

      {/* TAB 1: PRODUCT APPROVALS */}
      {activeTab === 'approvals' && (
        <div className="space-y-4 animate-in fade-in duration-150">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
              National Product Registration Queue
            </h3>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">Product Details</th>
                  <th className="py-3.5 px-4">Brand</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Current Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {products.map((p) => {
                  const brand = businesses.find((b) => b.id === p.brandId);
                  return (
                    <tr key={p.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <img src={p.heroImage} alt={p.name} className="w-10 h-10 rounded-lg object-cover" />
                          <div>
                            <p className="font-bold text-slate-900 dark:text-white">{p.name}</p>
                            <p className="text-[10px] font-mono text-slate-500">SKU: {p.sku}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-slate-700 dark:text-slate-300">{brand?.name}</td>
                      <td className="py-3.5 px-4 text-slate-500">{p.category}</td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          p.status === 'published'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                            : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                        }`}>
                          {p.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openProductPassport(p.id)}
                            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 hover:bg-slate-100"
                            title="Inspect Passport"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          {p.status !== 'published' ? (
                            <button
                              onClick={() => approveProduct(p.id)}
                              className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px]"
                            >
                              Approve
                            </button>
                          ) : (
                            <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
                              <Check className="w-3.5 h-3.5" />
                              <span>Live</span>
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: REGISTERED BRANDS */}
      {activeTab === 'brands' && (
        <div className="space-y-4 animate-in fade-in duration-150">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {businesses.map((b) => (
              <div
                key={b.id}
                className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img src={b.logoUrl} alt={b.name} className="w-12 h-12 rounded-xl object-cover border border-slate-200" />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">{b.name}</h4>
                      <p className="text-[10px] text-slate-500">{b.legalName}</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-[10px] font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    <span>VERIFIED</span>
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400">{b.description}</p>

                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-500">GSTIN Registration:</span>
                    <strong className="font-mono text-slate-800 dark:text-slate-200">{b.gstin}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">FSSAI Master License:</span>
                    <strong className="font-mono text-slate-800 dark:text-slate-200">{b.fssaiNumber}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Registered Plant:</span>
                    <span className="text-slate-700 dark:text-slate-300">{b.city}, {b.state}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: CERTIFICATION HUB */}
      {activeTab === 'certs' && (
        <div className="space-y-4 animate-in fade-in duration-150">
          <div className="overflow-x-auto rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">Standard / Type</th>
                  <th className="py-3.5 px-4">Credential ID</th>
                  <th className="py-3.5 px-4">Associated Product</th>
                  <th className="py-3.5 px-4">Issuing Regulatory Body</th>
                  <th className="py-3.5 px-4">Valid Until</th>
                  <th className="py-3.5 px-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {allCerts.map(({ cert, product }) => (
                  <tr key={cert.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold text-[10px]">
                        {cert.type}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900 dark:text-white">
                      {cert.certificateNumber}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-700 dark:text-slate-300">
                      {product.name}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500">{cert.issuedBy}</td>
                    <td className="py-3.5 px-4 text-emerald-600 dark:text-emerald-400 font-semibold">{cert.validUntil}</td>
                    <td className="py-3.5 px-4 text-right">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-[10px] font-bold">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>AUTHENTICATED</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: COUNTERFEIT INCIDENT REPORTS */}
      {activeTab === 'reports' && (
        <div className="space-y-4 animate-in fade-in duration-150">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
              Consumer Flagged Counterfeit & Tamper Tickets
            </h3>
          </div>

          <div className="space-y-4">
            {reports.map((rep) => (
              <div
                key={rep.id}
                className="p-5 rounded-3xl bg-white dark:bg-slate-900 border-2 border-rose-200/80 dark:border-rose-900/60 shadow-md space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-rose-600 text-white text-[10px] font-bold">
                      {rep.reason}
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-900 dark:text-white">
                      Batch: {rep.batchNumber}
                    </span>
                  </div>

                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    rep.status === 'resolved'
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                      : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                  }`}>
                    {rep.status.toUpperCase()}
                  </span>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">{rep.productName} ({rep.brandName})</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 bg-slate-50 dark:bg-slate-800/80 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                    &ldquo;{rep.evidenceNotes}&rdquo;
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-500 pt-1">
                  <div>
                    <span>Reported by: <strong>{rep.reportedBy}</strong> ({rep.contact})</span>
                    <span className="mx-2">•</span>
                    <span>Location: <strong>{rep.purchaseLocation}</strong></span>
                  </div>

                  <div className="flex items-center gap-2">
                    {rep.status !== 'resolved' && (
                      <button
                        onClick={() => resolveReport(rep.id)}
                        className="px-3 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold"
                      >
                        {t('actionResolved')}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: REVIEW MODERATION */}
      {activeTab === 'reviews' && (
        <div className="space-y-4 animate-in fade-in duration-150">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reviews.map((r) => (
              <div key={r.id} className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">{r.userName}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    r.status === 'published' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {r.status.toUpperCase()}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">&ldquo;{r.comment}&rdquo;</p>
                <div className="pt-2 flex justify-end gap-2">
                  {r.status === 'published' ? (
                    <button
                      onClick={() => moderateReview(r.id, 'hidden')}
                      className="px-2.5 py-1 text-[11px] font-semibold text-rose-600 hover:bg-rose-50 rounded-lg"
                    >
                      Hide Review
                    </button>
                  ) : (
                    <button
                      onClick={() => moderateReview(r.id, 'published')}
                      className="px-2.5 py-1 text-[11px] font-semibold text-emerald-600 hover:bg-emerald-50 rounded-lg"
                    >
                      Publish
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: LIVE AUDIT SCAN STREAM */}
      {activeTab === 'audit' && (
        <div className="space-y-4 animate-in fade-in duration-150">
          <div className="overflow-x-auto rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Event Timestamp</th>
                  <th className="py-3 px-4">Scanned Product</th>
                  <th className="py-3 px-4">Batch Code</th>
                  <th className="py-3 px-4">Geographical City</th>
                  <th className="py-3 px-4">Device Agent</th>
                  <th className="py-3 px-4 text-right">Integrity Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {verificationEvents.map((ev) => (
                  <tr key={ev.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                    <td className="py-3 px-4 font-mono text-slate-500">{ev.timestamp}</td>
                    <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">{ev.productName}</td>
                    <td className="py-3 px-4 font-mono font-bold text-emerald-600 dark:text-emerald-400">{ev.batchNumber}</td>
                    <td className="py-3 px-4 text-slate-700 dark:text-slate-300">{ev.city}, {ev.state}</td>
                    <td className="py-3 px-4 text-slate-500">{ev.device}</td>
                    <td className="py-3 px-4 text-right">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold text-[10px]">
                        GENUINE
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
