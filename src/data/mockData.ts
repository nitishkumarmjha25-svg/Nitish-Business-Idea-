import { Business, Product, Batch, Certification, Review, User, VerificationEvent, ProductReport, QRCodeData } from '../types';

export const INITIAL_USERS: User[] = [
  {
    id: 'user_cust_1',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@example.in',
    role: 'customer',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
    phone: '+91 98201 44521',
  },
  {
    id: 'user_seller_1',
    name: 'Priya Patel',
    email: 'priya@vedapure.in',
    role: 'seller',
    companyId: 'biz_vedapure',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
    phone: '+91 98112 33412',
  },
  {
    id: 'user_admin_1',
    name: 'Vikram Malhotra',
    email: 'vikram.m@trustmark.gov.in',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
    phone: '+91 98100 88231',
  }
];

export const INITIAL_BUSINESSES: Business[] = [
  {
    id: 'biz_vedapure',
    name: 'VedaPure Organics',
    legalName: 'VedaPure Agro & Herbal Innovations Pvt. Ltd.',
    tagline: 'Purest Kashmiri Botanicals & Certified Ayurvedic Harvests',
    logoUrl: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=200&q=80',
    primaryColor: '#0a192f',
    secondaryColor: '#10b981',
    gstin: '07AAACV9012A1Z4',
    fssaiNumber: '10020011000842',
    website: 'https://vedapure.example.in',
    address: 'Plot 42, Saffron Industrial Corridor, Industrial Estate',
    city: 'Pampore',
    state: 'Jammu & Kashmir',
    description: 'Pioneering direct-from-farmer Kashmiri Saffron, Shilajit, and organic botanicals with laboratory purity certifications and transparent batch passports.',
    verifiedBadge: true,
    establishedYear: 2018,
    contactEmail: 'contact@vedapure.in'
  },
  {
    id: 'biz_saraswati',
    name: 'Saraswati Desi Dairy',
    legalName: 'Saraswati Indigenous Cattle Farmers LLP',
    tagline: 'Traditional Vedic Bilona Ghee from Grazing Gir Cows',
    logoUrl: 'https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?auto=format&fit=crop&w=200&q=80',
    primaryColor: '#1e3a8a',
    secondaryColor: '#059669',
    gstin: '24AAAFS9921B1Z9',
    fssaiNumber: '11518036000219',
    website: 'https://saraswatidairy.example.in',
    address: 'Gir Forest Eco Corridor, Village Somnath',
    city: 'Junagadh',
    state: 'Gujarat',
    description: 'Dedicated to preserving native Bos Indicus Gir cows and small-batch earthen pot Bilona churning without synthetic additives or hormone injections.',
    verifiedBadge: true,
    establishedYear: 2015,
    contactEmail: 'support@saraswatidairy.in'
  },
  {
    id: 'biz_nilgiri',
    name: 'Nilgiri Gold Estates',
    legalName: 'Nilgiri Single Origin Tea Producers Co-op',
    tagline: 'High-Altitude Whole Leaf Tea from 1,850m Mist Hills',
    logoUrl: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=200&q=80',
    primaryColor: '#064e3b',
    secondaryColor: '#10b981',
    gstin: '33AAACN8123C1ZQ',
    fssaiNumber: '12421008000145',
    website: 'https://nilgirigold.example.in',
    address: 'Tiger Hill Tea Gardens, Coonoor Post',
    city: 'Coonoor',
    state: 'Tamil Nadu',
    description: 'Award-winning high-grown single estate tea harvested by women-led cooperatives under Rainforest Alliance and Organic India protocols.',
    verifiedBadge: true,
    establishedYear: 2011,
    contactEmail: 'tea@nilgirigold.in'
  },
  {
    id: 'biz_ayurshield',
    name: 'AyurShield Life Sciences',
    legalName: 'AyurShield Nutraceuticals India Pvt. Ltd.',
    tagline: 'GMP-Standard Classical Formulations & Swarna Formulations',
    logoUrl: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=200&q=80',
    primaryColor: '#111827',
    secondaryColor: '#22c55e',
    gstin: '05AAACA7201D1ZS',
    fssaiNumber: '10819005000312',
    website: 'https://ayurshield.example.in',
    address: 'Shantikunj Industrial Herb Zone',
    city: 'Haridwar',
    state: 'Uttarakhand',
    description: 'Authentic Ayurvedic Rasayanas enriched with certified 24K Swarna Bhasma, heavy metal tested via ICP-MS spectrometry.',
    verifiedBadge: true,
    establishedYear: 2016,
    contactEmail: 'care@ayurshield.in'
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod_saffron_1g',
    brandId: 'biz_vedapure',
    name: 'Grade-A1 Pure Mongra Kashmiri Saffron (1g)',
    category: 'Organic Foods & Spices',
    sku: 'VP-SAF-KASH-1G',
    description: 'Hand-picked stigma flowers from the sun-drenched plateau of Pampore. Unadulterated deep crimson threads with natural high Crocin and Safranal potency.',
    heroImage: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80',
    packagingType: 'Airtight Borosilicate Glass Jar with Holographic Tamper-Seal',
    netWeight: '1.0 gram',
    mrp: 599,
    storageInstructions: 'Store in a cool, dark place away from direct sunlight and moisture.',
    shelfLifeMonths: 24,
    originCountry: 'India (Pampore, Kashmir)',
    status: 'published',
    trustScore: 98,
    currentBatchId: 'batch_vp_saf_09',
    ingredients: [
      {
        name: 'Mongra Saffron Stigmas (Crocus Sativus)',
        percentage: 100,
        originLocation: 'Pampore Plateau, Pulwama (1,600m MSL)',
        organicCertified: true,
        supplierName: 'Pulwama Saffron Growers Collective'
      }
    ],
    certifications: [
      {
        id: 'cert_fssai_1',
        entityId: 'prod_saffron_1g',
        type: 'FSSAI',
        certificateNumber: 'FSSAI-10020011000842',
        issuedBy: 'Food Safety and Standards Authority of India',
        validUntil: '2027-11-30',
        verificationUrl: 'https://foscos.fssai.gov.in',
        status: 'verified',
        issuedDate: '2022-12-01'
      },
      {
        id: 'cert_agmark_1',
        entityId: 'prod_saffron_1g',
        type: 'AGMARK',
        certificateNumber: 'AGMARK-JK-SP-8942',
        issuedBy: 'Directorate of Marketing & Inspection, Govt. of India',
        validUntil: '2026-08-15',
        verificationUrl: 'https://agmarkonline.dmi.gov.in',
        status: 'verified',
        issuedDate: '2023-08-15'
      },
      {
        id: 'cert_organic_1',
        entityId: 'prod_saffron_1g',
        type: 'ORGANIC_INDIA',
        certificateNumber: 'ORG-IND-2023-9901',
        issuedBy: 'NPOP / APEDA Accredited Certification Agency',
        validUntil: '2026-10-10',
        verificationUrl: 'https://apeda.gov.in',
        status: 'verified',
        issuedDate: '2023-10-11'
      },
      {
        id: 'cert_iso_1',
        entityId: 'prod_saffron_1g',
        type: 'ISO 9001',
        certificateNumber: 'ISO-9001-2015-DEL-4410',
        issuedBy: 'TUV SUD Quality Registrar',
        validUntil: '2027-04-14',
        verificationUrl: 'https://tuvsud.com',
        status: 'verified',
        issuedDate: '2024-04-15'
      }
    ]
  },
  {
    id: 'prod_ghee_500ml',
    brandId: 'biz_saraswati',
    name: 'Vedic A2 Gir Cow Bilona Cultured Ghee (500ml)',
    category: 'Dairy & Fresh',
    sku: 'SW-GHEE-BILONA-500',
    description: 'Authentic cultured ghee prepared from whole milk of indigenous free-grazing Gir cows using the age-old Vedic Bilona wooden-churn method. Tested free from synthetic beta-casein and adulterants.',
    heroImage: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
    packagingType: 'Amber Glass Jar with Vacuum Pressure Safety Cap',
    netWeight: '500 ml',
    mrp: 1450,
    storageInstructions: 'Do not refrigerate. Use dry spoon only. Keep away from water droplets.',
    shelfLifeMonths: 12,
    originCountry: 'India (Junagadh, Gujarat)',
    status: 'published',
    trustScore: 96,
    currentBatchId: 'batch_sw_ghee_41',
    ingredients: [
      {
        name: 'Pure Cultured Butterfat (A2/A2 Beta-Casein Cow Milk)',
        percentage: 100,
        originLocation: 'Gir Grassland Grazing Pastures, Saurashtra',
        organicCertified: true,
        supplierName: 'Gir Farmer Welfare Collective'
      }
    ],
    certifications: [
      {
        id: 'cert_fssai_2',
        entityId: 'prod_ghee_500ml',
        type: 'FSSAI',
        certificateNumber: 'FSSAI-11518036000219',
        issuedBy: 'Food Safety and Standards Authority of India (Gujarat Unit)',
        validUntil: '2027-05-20',
        verificationUrl: 'https://foscos.fssai.gov.in',
        status: 'verified',
        issuedDate: '2022-05-21'
      },
      {
        id: 'cert_agmark_2',
        entityId: 'prod_ghee_500ml',
        type: 'AGMARK',
        certificateNumber: 'AGMARK-GJ-GHEE-7712',
        issuedBy: 'Ministry of Agriculture & Farmers Welfare',
        validUntil: '2026-09-01',
        verificationUrl: 'https://agmarkonline.dmi.gov.in',
        status: 'verified',
        issuedDate: '2023-09-01'
      },
      {
        id: 'cert_ayush_2',
        entityId: 'prod_ghee_500ml',
        type: 'AYUSH',
        certificateNumber: 'AYUSH-PREM-2024-GIR-09',
        issuedBy: 'National Medicinal Plants Board / Ayush Ministry',
        validUntil: '2027-03-30',
        verificationUrl: 'https://ayush.gov.in',
        status: 'verified',
        issuedDate: '2024-03-31'
      }
    ]
  },
  {
    id: 'prod_tea_250g',
    brandId: 'biz_nilgiri',
    name: 'Single Origin Orthodox Whole Leaf Black Tea (250g)',
    category: 'Beverages',
    sku: 'NG-TEA-ORTH-250',
    description: 'High-altitude orthodox whole leaves hand-plucked during the frosty January flush from Tiger Hill at 1,850m elevation. Delicate floral muscatel notes with zero artificial flavors.',
    heroImage: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80',
    packagingType: 'Triple-Layer Kraft Paper Foil Barrier Bag with Freshness Valve',
    netWeight: '250 grams',
    mrp: 495,
    storageInstructions: 'Store in an airtight opaque container in a cool dry area.',
    shelfLifeMonths: 24,
    originCountry: 'India (Nilgiris, Tamil Nadu)',
    status: 'published',
    trustScore: 94,
    currentBatchId: 'batch_ng_tea_88',
    ingredients: [
      {
        name: 'Single Origin Orthodox Tea Leaves (Camellia Sinensis)',
        percentage: 100,
        originLocation: 'Tiger Hill Estate, Coonoor (1850m elevation)',
        organicCertified: true,
        supplierName: 'Nilgiri High Plantation Co-operative'
      }
    ],
    certifications: [
      {
        id: 'cert_fssai_3',
        entityId: 'prod_tea_250g',
        type: 'FSSAI',
        certificateNumber: 'FSSAI-12421008000145',
        issuedBy: 'FSSAI Southern Regional Office',
        validUntil: '2026-12-15',
        verificationUrl: 'https://foscos.fssai.gov.in',
        status: 'verified',
        issuedDate: '2021-12-16'
      },
      {
        id: 'cert_organic_3',
        entityId: 'prod_tea_250g',
        type: 'NPOP',
        certificateNumber: 'NPOP-IND-TEA-0034',
        issuedBy: 'Tea Board of India / APEDA',
        validUntil: '2026-07-20',
        verificationUrl: 'https://teaboard.gov.in',
        status: 'verified',
        issuedDate: '2023-07-21'
      }
    ]
  },
  {
    id: 'prod_chyawanprash_500g',
    brandId: 'biz_ayurshield',
    name: 'Immuno-Gold Chyawanprash with Swarna Bhasma (500g)',
    category: 'Ayurveda & Health',
    sku: 'AY-CHY-GOLD-500',
    description: 'Classical Ayurvedic Rasayana enriched with wild Indian Amla, 48 herbs, wild forest honey, and certified 24 Karat Swarna Bhasma (Gold nanoparticles) for immune vitality.',
    heroImage: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    packagingType: 'UV-Protected Food-Grade Glass Jar with Tamper Indicator Band',
    netWeight: '500 grams',
    mrp: 890,
    storageInstructions: 'Store in dry place at room temperature. Close cap tightly after each use.',
    shelfLifeMonths: 36,
    originCountry: 'India (Haridwar, Uttarakhand)',
    status: 'published',
    trustScore: 97,
    currentBatchId: 'batch_ay_chy_83',
    ingredients: [
      {
        name: 'Fresh Organic Indian Gooseberry (Amla Pulp)',
        percentage: 58,
        originLocation: 'Pratapgarh Forest Belt, UP',
        organicCertified: true,
        supplierName: 'Forest Produce Cooperative'
      },
      {
        name: 'Decoction of 48 Classical Ayurvedic Herbs (Dashmool, Ashwagandha, Guduchi)',
        percentage: 24,
        originLocation: 'Lower Himalayan Footprint, Uttarakhand',
        organicCertified: true,
        supplierName: 'Himalayan Herbal Harvesters'
      },
      {
        name: 'Wild Multifloral Forest Honey & Desi Ghee',
        percentage: 17.9,
        originLocation: 'Corbett Biosphere Fringe',
        organicCertified: true,
        supplierName: 'Tribal Honey Collective'
      },
      {
        name: 'Purified 24K Swarna Bhasma (Gold Calx)',
        percentage: 0.1,
        originLocation: 'Haridwar Ayurvedic Pharmacy',
        organicCertified: false,
        supplierName: 'Rasashastra Classical Lab'
      }
    ],
    certifications: [
      {
        id: 'cert_fssai_4',
        entityId: 'prod_chyawanprash_500g',
        type: 'FSSAI',
        certificateNumber: 'FSSAI-10819005000312',
        issuedBy: 'FSSAI Uttarakhand Unit',
        validUntil: '2027-08-10',
        verificationUrl: 'https://foscos.fssai.gov.in',
        status: 'verified',
        issuedDate: '2022-08-11'
      },
      {
        id: 'cert_ayush_4',
        entityId: 'prod_chyawanprash_500g',
        type: 'AYUSH',
        certificateNumber: 'AYUSH-PREMIUM-UK-904',
        issuedBy: 'Ministry of Ayush / Quality Council of India',
        validUntil: '2026-08-01',
        verificationUrl: 'https://qcin.org',
        status: 'verified',
        issuedDate: '2023-08-02'
      },
      {
        id: 'cert_gmp_4',
        entityId: 'prod_chyawanprash_500g',
        type: 'GMP',
        certificateNumber: 'GMP-WHO-COMP-2024-81',
        issuedBy: 'State Licensing Authority, Ayurvedic & Unani Services',
        validUntil: '2027-01-15',
        verificationUrl: 'https://ayushservices.uk.gov.in',
        status: 'verified',
        issuedDate: '2024-01-16'
      }
    ]
  }
];

export const INITIAL_BATCHES: Batch[] = [
  {
    id: 'batch_vp_saf_09',
    productId: 'prod_saffron_1g',
    batchNumber: 'VP-SAF-2024-K09',
    mfgDate: '2024-08-15',
    expDate: '2026-08-14',
    productionFacility: 'Pampore Modern Saffron Processing & Quality Testing Park',
    facilityLocation: 'National Highway 44, Pampore, District Pulwama, J&K - 192121',
    mfgLicense: 'JK-MFG-AYUR-2020-044',
    quantityProduced: 2500,
    inspectionStatus: 'passed',
    blockchainHash: '0x8f4c2e917d0b3a1a67ce42119bb01eef2a8710360a891544cb48e89f81a179d2',
    tamperSealVerified: true,
    scanCount: 1420,
    labTestResults: [
      {
        parameter: 'Crocin Content (Coloring Strength E1% 440nm)',
        standardValue: 'Min 190 (ISO Category I)',
        observedValue: '246.4 (Exceptional Super-Grade)',
        status: 'pass',
        certifiedBy: 'NABL Accredited Testing Facility #TC-5120'
      },
      {
        parameter: 'Safranal (Natural Aroma Purity E1% 330nm)',
        standardValue: '20 to 50',
        observedValue: '41.8 (Optimal Floral Aroma)',
        status: 'pass',
        certifiedBy: 'CSIR - Indian Institute of Integrative Medicine'
      },
      {
        parameter: 'Picrocrocin (Bitterness Index E1% 257nm)',
        standardValue: 'Min 70',
        observedValue: '88.2 (High Medicative Strength)',
        status: 'pass',
        certifiedBy: 'CSIR - IIIM Testing Division'
      },
      {
        parameter: 'Moisture & Volatile Matter',
        standardValue: 'Max 12.0%',
        observedValue: '8.4%',
        status: 'pass',
        certifiedBy: 'NABL Certified Quality Lab'
      },
      {
        parameter: 'Synthetic Food Coloring (Tartrazine, Sunset Yellow)',
        standardValue: 'Strictly Absent (Zero Tolerance)',
        observedValue: 'Not Detected (Negative)',
        status: 'pass',
        certifiedBy: 'Central Food Laboratory Test Bench'
      },
      {
        parameter: 'Heavy Metals (Lead, Arsenic, Cadmium)',
        standardValue: 'Within FSSAI Maximum Permissible Limits',
        observedValue: 'Below Detectable Limit (<0.01 ppm)',
        status: 'pass',
        certifiedBy: 'ICP-MS Trace Element Analysis'
      }
    ]
  },
  {
    id: 'batch_sw_ghee_41',
    productId: 'prod_ghee_500ml',
    batchNumber: 'SW-GHEE-B041',
    mfgDate: '2024-09-01',
    expDate: '2025-09-01',
    productionFacility: 'Saraswati Gau-Sanrakshan Dairy & Traditional Churn Center',
    facilityLocation: 'Taluka Visavadar, Junagadh District, Gujarat - 362130',
    mfgLicense: 'GJ-DAIRY-FSSAI-00219',
    quantityProduced: 1200,
    inspectionStatus: 'passed',
    blockchainHash: '0x3a7e55099c01bfda33120ea782190bb4c90ef0119853da4402eb4719eac5049b',
    tamperSealVerified: true,
    scanCount: 980,
    labTestResults: [
      {
        parameter: 'Reichert-Meissl (RM) Value (Purity of Milkfat)',
        standardValue: '28.0 - 32.0 (AGMARK Special)',
        observedValue: '31.2 (Pristine Milk Fat)',
        status: 'pass',
        certifiedBy: 'National Dairy Development Board Laboratory'
      },
      {
        parameter: 'Baudouin Test (Adulteration with Vanaspati / Hydrogenated Oil)',
        standardValue: 'Negative (Colorless)',
        observedValue: 'Negative (Confirmed Pure)',
        status: 'pass',
        certifiedBy: 'Anand Agricultural University Quality Lab'
      },
      {
        parameter: 'Beta-Casein Genotyping (A2/A2 Allele Presence)',
        standardValue: '100% Homogenous A2/A2',
        observedValue: '100% Homogenous A2/A2 Confirmed',
        status: 'pass',
        certifiedBy: 'National Bureau of Animal Genetic Resources'
      },
      {
        parameter: 'Free Fatty Acids (FFA as Oleic Acid)',
        standardValue: 'Max 1.4%',
        observedValue: '0.42% (Low Acidity, High Freshness)',
        status: 'pass',
        certifiedBy: 'AGMARK Regional Quality Control Center'
      },
      {
        parameter: 'Moisture Content',
        standardValue: 'Max 0.3%',
        observedValue: '0.14%',
        status: 'pass',
        certifiedBy: 'NDDB Analytical Services'
      }
    ]
  },
  {
    id: 'batch_ng_tea_88',
    productId: 'prod_tea_250g',
    batchNumber: 'NG-TEA-2024-O88',
    mfgDate: '2024-07-20',
    expDate: '2026-07-19',
    productionFacility: 'Tiger Hill Orthodox Tea Factory & Specialty Testing Unit',
    facilityLocation: 'Upper Coonoor Estate, Nilgiris District, Tamil Nadu - 643101',
    mfgLicense: 'TN-TEA-AGR-4019',
    quantityProduced: 3000,
    inspectionStatus: 'passed',
    blockchainHash: '0x1c9842aef7723901bce55d81203aa98f0411b0e35298daff8331902cebb74100',
    tamperSealVerified: true,
    scanCount: 650,
    labTestResults: [
      {
        parameter: 'Total Polyphenols & Antioxidant Capacity',
        standardValue: 'Min 20.0%',
        observedValue: '28.4% (Rich Antioxidant Profile)',
        status: 'pass',
        certifiedBy: 'UPASI Tea Research Foundation, Valparai'
      },
      {
        parameter: 'Pesticide & Synthetic Chemical Residues (54 screened)',
        standardValue: 'Below Limit of Quantification (BLQ)',
        observedValue: 'BLQ / Zero Detected (100% Clean)',
        status: 'pass',
        certifiedBy: 'SGS India Certified Testing Laboratory'
      },
      {
        parameter: 'Water Extract Solids',
        standardValue: 'Min 32.0%',
        observedValue: '39.2%',
        status: 'pass',
        certifiedBy: 'Tea Board of India Certified Lab'
      }
    ]
  },
  {
    id: 'batch_ay_chy_83',
    productId: 'prod_chyawanprash_500g',
    batchNumber: 'AY-CHY-883',
    mfgDate: '2024-08-10',
    expDate: '2027-08-09',
    productionFacility: 'AyurShield WHO-GMP Formulation Unit',
    facilityLocation: 'Industrial Estate, Bahadrabad, Haridwar, UK - 249402',
    mfgLicense: 'UK-AYUR-GMP-1102',
    quantityProduced: 5000,
    inspectionStatus: 'passed',
    blockchainHash: '0x55d0124baef091bbce439120489aaef014892cfa77192305bad0194bcde88129',
    tamperSealVerified: true,
    scanCount: 2100,
    labTestResults: [
      {
        parameter: 'Natural Vitamin C Content (from Wild Amla)',
        standardValue: 'Min 300 mg / 100g',
        observedValue: '428 mg / 100g (High Potency)',
        status: 'pass',
        certifiedBy: 'Indian Pharmacopoeia Commission'
      },
      {
        parameter: 'Swarna Bhasma (Gold Calx) Particle Size (TEM Analysis)',
        standardValue: 'Sub-micron / Nano Range (15-50 nm)',
        observedValue: '28.4 nm (Authentic Bhasma Structure)',
        status: 'pass',
        certifiedBy: 'IIT Roorkee Nanomaterials Characterization Center'
      },
      {
        parameter: 'Heavy Metals Screen (Lead, Mercury, Arsenic, Cadmium)',
        standardValue: 'WHO / Ayush Permissible Tolerances',
        observedValue: 'Conforms to Ayush Safety Limit (Certified Clean)',
        status: 'pass',
        certifiedBy: 'NABL Certified Drug Testing Lab'
      },
      {
        parameter: 'Microbial Contamination & Yeast/Mould',
        standardValue: 'Strictly Absent',
        observedValue: 'Zero Colony Forming Units',
        status: 'pass',
        certifiedBy: 'Microbiology Quality Division'
      }
    ]
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev_1',
    productId: 'prod_saffron_1g',
    batchNumber: 'VP-SAF-2024-K09',
    userId: 'user_cust_1',
    userName: 'Aarav Sharma',
    userCity: 'Mumbai, Maharashtra',
    rating: 5,
    title: 'Remarkable color release & unmatched aroma!',
    comment: 'Scanned the QR on the glass bottle and checked the Pampore harvest date. Just 3 strands gave a golden yellow hue in warm milk within 10 minutes. The lab report showing 246 Crocin gives immense peace of mind in a market flooded with fake dyed saffron.',
    verifiedPurchase: true,
    createdAt: '2024-09-02',
    sentiment: 'positive',
    status: 'published',
    likesCount: 24
  },
  {
    id: 'rev_2',
    productId: 'prod_saffron_1g',
    batchNumber: 'VP-SAF-2024-K09',
    userId: 'user_cust_2',
    userName: 'Meera Deshmukh',
    userCity: 'Pune, Maharashtra',
    rating: 5,
    title: 'Original Kashmiri saffron, finally found a trustworthy brand!',
    comment: 'Verified the holographic seal and scanned the batch code on TrustMark. Seeing the FSSAI and AGMARK lab parameters right on my phone is revolutionary. Five stars for transparency.',
    verifiedPurchase: true,
    createdAt: '2024-08-28',
    sentiment: 'positive',
    status: 'published',
    likesCount: 19
  },
  {
    id: 'rev_3',
    productId: 'prod_ghee_500ml',
    batchNumber: 'SW-GHEE-B041',
    userId: 'user_cust_3',
    userName: 'Rajesh Kulkarni',
    userCity: 'Nagpur, Maharashtra',
    rating: 5,
    title: 'Grainy golden texture and nostalgic aroma of village bilona ghee',
    comment: 'Checked the A2/A2 beta-casein certificate and RM value. The ghee has that authentic Danedar grain and sweet grass-fed aroma. Worth every rupee for purity.',
    verifiedPurchase: true,
    createdAt: '2024-09-05',
    sentiment: 'positive',
    status: 'published',
    likesCount: 31
  },
  {
    id: 'rev_4',
    productId: 'prod_ghee_500ml',
    batchNumber: 'SW-GHEE-B041',
    userId: 'user_cust_4',
    userName: 'Sunita Verma',
    userCity: 'New Delhi',
    rating: 4,
    title: 'High quality pure ghee, packaging was super secure',
    comment: 'Scanned the QR code at my kitchen counter. Verified the vacuum seal indicator. A bit expensive, but knowing it is tested 100% free of adulterants makes it worth it.',
    verifiedPurchase: true,
    createdAt: '2024-09-04',
    sentiment: 'positive',
    status: 'published',
    likesCount: 12
  },
  {
    id: 'rev_5',
    productId: 'prod_chyawanprash_500g',
    batchNumber: 'AY-CHY-883',
    userId: 'user_cust_5',
    userName: 'Dr. Anand Iyer',
    userCity: 'Bengaluru, Karnataka',
    rating: 5,
    title: 'Doctor approved: Excellent phytochemical composition',
    comment: 'As a medical practitioner, I scrutinized the ICP-MS heavy metals clearance report on TrustMark. Clean records, no synthetic sweetening agents, and legitimate Swarna Bhasma nanoparticle confirmation.',
    verifiedPurchase: true,
    createdAt: '2024-08-22',
    sentiment: 'positive',
    status: 'published',
    likesCount: 45
  },
  {
    id: 'rev_6',
    productId: 'prod_tea_250g',
    batchNumber: 'NG-TEA-2024-O88',
    userId: 'user_cust_6',
    userName: 'Kavita Menon',
    userCity: 'Chennai, Tamil Nadu',
    rating: 5,
    title: 'Exquisite single origin orthodox tea!',
    comment: 'I love that you can see the exact harvest altitude (1,850m) and the Rainforest Alliance audit number. The tea leaves are intact whole leaves, giving a brilliant amber liquor.',
    verifiedPurchase: true,
    createdAt: '2024-08-19',
    sentiment: 'positive',
    status: 'published',
    likesCount: 15
  }
];

export const INITIAL_VERIFICATION_EVENTS: VerificationEvent[] = [
  {
    id: 'scan_ev_101',
    qrCode: 'QR-VP-SAF-09-8812',
    productId: 'prod_saffron_1g',
    productName: 'Grade-A1 Pure Mongra Kashmiri Saffron (1g)',
    brandName: 'VedaPure Organics',
    batchNumber: 'VP-SAF-2024-K09',
    timestamp: '2026-09-10 07:42:18',
    city: 'Mumbai',
    state: 'Maharashtra',
    device: 'Apple Safari / iPhone 15',
    suspiciousFlag: false
  },
  {
    id: 'scan_ev_102',
    qrCode: 'QR-SW-GHEE-41-1049',
    productId: 'prod_ghee_500ml',
    productName: 'Vedic A2 Gir Cow Bilona Cultured Ghee (500ml)',
    brandName: 'Saraswati Desi Dairy',
    batchNumber: 'SW-GHEE-B041',
    timestamp: '2026-09-10 07:31:05',
    city: 'Pune',
    state: 'Maharashtra',
    device: 'Google Chrome / Android 14',
    suspiciousFlag: false
  },
  {
    id: 'scan_ev_103',
    qrCode: 'QR-AY-CHY-83-5591',
    productId: 'prod_chyawanprash_500g',
    productName: 'Immuno-Gold Chyawanprash with Swarna Bhasma (500g)',
    brandName: 'AyurShield Life Sciences',
    batchNumber: 'AY-CHY-883',
    timestamp: '2026-09-10 06:55:40',
    city: 'Bengaluru',
    state: 'Karnataka',
    device: 'Google Chrome / Samsung S24',
    suspiciousFlag: false
  },
  {
    id: 'scan_ev_104',
    qrCode: 'QR-VP-SAF-09-3321',
    productId: 'prod_saffron_1g',
    productName: 'Grade-A1 Pure Mongra Kashmiri Saffron (1g)',
    brandName: 'VedaPure Organics',
    batchNumber: 'VP-SAF-2024-K09',
    timestamp: '2026-09-10 05:12:33',
    city: 'New Delhi',
    state: 'Delhi NCR',
    device: 'Mobile Safari / iOS',
    suspiciousFlag: false
  },
  {
    id: 'scan_ev_105',
    qrCode: 'QR-NG-TEA-88-7204',
    productId: 'prod_tea_250g',
    productName: 'Single Origin Orthodox Whole Leaf Black Tea (250g)',
    brandName: 'Nilgiri Gold Estates',
    batchNumber: 'NG-TEA-2024-O88',
    timestamp: '2026-09-09 21:40:11',
    city: 'Hyderabad',
    state: 'Telangana',
    device: 'Firefox Mobile / Android',
    suspiciousFlag: false
  }
];

export const INITIAL_REPORTS: ProductReport[] = [
  {
    id: 'rep_201',
    productId: 'prod_saffron_1g',
    productName: 'Grade-A1 Pure Mongra Kashmiri Saffron (1g)',
    brandName: 'VedaPure Organics',
    batchNumber: 'VP-SAF-FAKE-X99',
    reportedBy: 'Kishore Jha',
    contact: '+91 98440 21901',
    reason: 'Suspected Counterfeit',
    evidenceNotes: 'Local grocer in Chandni Chowk had packaging with low-resolution VedaPure logo, and the batch code VP-SAF-FAKE-X99 fails online TrustMark validation.',
    purchaseLocation: 'Chawri Bazar Spice Market, Old Delhi',
    status: 'investigating',
    timestamp: '2026-09-08 14:22:00'
  }
];

export const INITIAL_QR_CODES: QRCodeData[] = [
  {
    code: 'QR-VP-SAF-09-8812',
    batchId: 'batch_vp_saf_09',
    productId: 'prod_saffron_1g',
    serialNumber: 'SR-2024-00142',
    generatedAt: '2024-08-15',
    scanCount: 1420,
    dynamicUrl: 'https://trustmark.in/verify?code=VP-SAF-2024-K09'
  },
  {
    code: 'QR-SW-GHEE-41-1049',
    batchId: 'batch_sw_ghee_41',
    productId: 'prod_ghee_500ml',
    serialNumber: 'SR-2024-00981',
    generatedAt: '2024-09-01',
    scanCount: 980,
    dynamicUrl: 'https://trustmark.in/verify?code=SW-GHEE-B041'
  },
  {
    code: 'QR-NG-TEA-88-7204',
    batchId: 'batch_ng_tea_88',
    productId: 'prod_tea_250g',
    serialNumber: 'SR-2024-00650',
    generatedAt: '2024-07-20',
    scanCount: 650,
    dynamicUrl: 'https://trustmark.in/verify?code=NG-TEA-2024-O88'
  },
  {
    code: 'QR-AY-CHY-83-5591',
    batchId: 'batch_ay_chy_83',
    productId: 'prod_chyawanprash_500g',
    serialNumber: 'SR-2024-02100',
    generatedAt: '2024-08-10',
    scanCount: 2100,
    dynamicUrl: 'https://trustmark.in/verify?code=AY-CHY-883'
  }
];
