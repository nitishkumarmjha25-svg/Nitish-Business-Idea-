export type Role = 'customer' | 'seller' | 'admin';

export type Language = 'en' | 'hi' | 'mr';

export type Theme = 'light' | 'dark';

export type Page = 
  | 'landing' 
  | 'how-it-works' 
  | 'verify' 
  | 'passport' 
  | 'seller' 
  | 'admin' 
  | 'about' 
  | 'contact';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  companyId?: string;
  avatar?: string;
  phone?: string;
}

export interface Business {
  id: string;
  name: string;
  legalName: string;
  tagline: string;
  logoUrl: string;
  primaryColor: string;
  secondaryColor: string;
  gstin: string;
  fssaiNumber: string;
  website: string;
  address: string;
  city: string;
  state: string;
  description: string;
  verifiedBadge: boolean;
  establishedYear: number;
  contactEmail: string;
}

export interface LabTestParam {
  parameter: string;
  standardValue: string;
  observedValue: string;
  status: 'pass' | 'warning' | 'fail';
  certifiedBy: string;
}

export interface IngredientSupply {
  name: string;
  percentage: number;
  originLocation: string;
  organicCertified: boolean;
  supplierName: string;
}

export interface Certification {
  id: string;
  entityId: string; // Product or Brand ID
  type: 'FSSAI' | 'ISO 9001' | 'AGMARK' | 'ORGANIC_INDIA' | 'BIS' | 'GMP' | 'AYUSH' | 'NPOP';
  certificateNumber: string;
  issuedBy: string;
  validUntil: string;
  verificationUrl: string;
  status: 'verified' | 'pending' | 'rejected';
  documentUrl?: string;
  issuedDate: string;
}

export interface Batch {
  id: string;
  productId: string;
  batchNumber: string;
  mfgDate: string;
  expDate: string;
  productionFacility: string;
  facilityLocation: string;
  mfgLicense: string;
  quantityProduced: number;
  labTestResults: LabTestParam[];
  inspectionStatus: 'passed' | 'pending' | 'flagged';
  blockchainHash: string;
  tamperSealVerified: boolean;
  scanCount: number;
}

export interface Product {
  id: string;
  brandId: string;
  name: string;
  category: 'Ayurveda & Health' | 'Organic Foods & Spices' | 'Dairy & Fresh' | 'Beverages' | 'Electronics & Tech' | 'Cosmetics & Personal';
  sku: string;
  description: string;
  heroImage: string;
  packagingType: string;
  netWeight: string;
  mrp: number;
  storageInstructions: string;
  shelfLifeMonths: number;
  originCountry: string;
  ingredients: IngredientSupply[];
  status: 'published' | 'under_review' | 'draft' | 'rejected';
  trustScore: number; // 0 to 100
  certifications: Certification[];
  currentBatchId: string;
}

export interface QRCodeData {
  code: string;
  batchId: string;
  productId: string;
  serialNumber: string;
  generatedAt: string;
  scanCount: number;
  dynamicUrl: string;
}

export interface Review {
  id: string;
  productId: string;
  batchNumber?: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  userCity?: string;
  rating: number; // 1 to 5
  title: string;
  comment: string;
  verifiedPurchase: boolean;
  createdAt: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  status: 'published' | 'hidden' | 'flagged';
  likesCount: number;
}

export interface VerificationEvent {
  id: string;
  qrCode: string;
  productId: string;
  productName: string;
  brandName: string;
  batchNumber: string;
  timestamp: string;
  city: string;
  state: string;
  device: string;
  suspiciousFlag: boolean;
}

export interface ProductReport {
  id: string;
  productId: string;
  productName: string;
  brandName: string;
  batchNumber: string;
  reportedBy: string;
  contact: string;
  reason: 'Suspected Counterfeit' | 'Broken Tamper Seal' | 'Expired Product' | 'Quality Issue' | 'Mislabeling' | 'Other';
  evidenceNotes: string;
  purchaseLocation?: string;
  status: 'investigating' | 'resolved' | 'dismissed';
  timestamp: string;
}
