export interface DoctorProfile {
  name: string;
  credentials: string;
  title: string;
  specialty: string;
  npi: string;
  licenseNumber: string;
  licenseState: string;
  licenseStatus: string;
  licenseExpiry: string;
  hospital: string;
  department: string;
  office: string;
  email: string;
  phone: string;
  pager: string;
  bio: string;
  consultationTypes: string[];
}

export const DEFAULT_DOCTOR_PROFILE: DoctorProfile = {
  name: 'Dr. Julian Vance',
  credentials: 'MD, FACC, FSCAI',
  title: 'Director of Interventional Cardiology',
  specialty: 'Interventional Cardiology & Endovascular Medicine',
  npi: '1982736450',
  licenseNumber: 'CA-MED-948210',
  licenseState: 'Medical Board of California',
  licenseStatus: 'Active • Verified',
  licenseExpiry: 'October 31, 2028',
  hospital: 'Enterprise Healthcare — St. Jude Medical Center',
  department: 'Division of Cardiology / Cath Lab Suite #03',
  office: 'Heart & Vascular Pavilion, Suite 420, Metro Campus',
  email: 'dr.vance@enterprisehealthcare.org',
  phone: '+1 (555) 234-8900 (Ext. 4821)',
  pager: 'Pager #8842 (STAT Code Blue)',
  bio: 'Specializing in complex percutaneous coronary intervention (PCI), transcatheter valve replacement, and hemodynamic time-out protocols with over 15 years of academic and clinical practice.',
  consultationTypes: [
    'In-Person Clinical Consultation',
    'Telehealth Video Triage',
    'Emergency Cath Lab Code Call',
  ],
};

export interface TrustedDevice {
  id: string;
  name: string;
  platform: string;
  location: string;
  lastActive: string;
  isCurrent: boolean;
}

export const INITIAL_TRUSTED_DEVICES: TrustedDevice[] = [
  {
    id: 'dev-1',
    name: 'Workstation Desktop',
    platform: 'Chrome on Windows 11 Enterprise',
    location: 'St. Jude Cath Lab Suite #03 (192.168.1.42)',
    lastActive: 'Active Now',
    isCurrent: true,
  },
  {
    id: 'dev-2',
    name: 'Clinical Mobile Tablet',
    platform: 'Safari on Apple iPadOS 17.5',
    location: 'Clinician Roaming (Cellular Gateway)',
    lastActive: '2 hours ago',
    isCurrent: false,
  },
];

export interface SecurityAuditEntry {
  id: string;
  device: string;
  location: string;
  timestamp: string;
  method: string;
  status: 'Success' | 'Blocked';
}

export const INITIAL_AUDIT_LOGS: SecurityAuditEntry[] = [
  {
    id: 'sec-1',
    device: 'Chrome / Win11',
    location: '192.168.1.42 (Internal LAN)',
    timestamp: 'Today, 08:30 AM',
    method: '2FA Authenticator',
    status: 'Success',
  },
  {
    id: 'sec-2',
    device: 'CareID Mobile',
    location: 'Cellular Gateway',
    timestamp: 'Yesterday, 14:15 PM',
    method: 'Biometric Pass',
    status: 'Success',
  },
  {
    id: 'sec-3',
    device: 'Firefox / macOS',
    location: 'Remote IP 74.125.18.2',
    timestamp: 'Oct 28, 09:12 AM',
    method: 'Hardware Security Key',
    status: 'Success',
  },
  {
    id: 'sec-4',
    device: 'Unknown Device',
    location: 'External Proxy (185.220.101.4)',
    timestamp: 'Oct 26, 23:45 PM',
    method: 'Password Only',
    status: 'Blocked',
  },
];

export interface NotificationPreferences {
  criticalSms: boolean;
  criticalSound: boolean;
  criticalPush: boolean; // Locked true for clinical safety
  categories: {
    patientUpdates: { email: boolean; inApp: boolean; sms: boolean };
    referrals: { email: boolean; inApp: boolean; sms: boolean };
    prescriptions: { email: boolean; inApp: boolean; sms: boolean };
    ocrDocuments: { email: boolean; inApp: boolean; sms: boolean };
  };
  digestFrequency: 'daily' | 'weekly' | 'off';
  systemAlerts: boolean;
}

export const DEFAULT_NOTIFICATION_PREFERENCES: NotificationPreferences = {
  criticalSms: true,
  criticalSound: true,
  criticalPush: true,
  categories: {
    patientUpdates: { email: true, inApp: true, sms: false },
    referrals: { email: true, inApp: true, sms: true },
    prescriptions: { email: false, inApp: true, sms: false },
    ocrDocuments: { email: true, inApp: true, sms: false },
  },
  digestFrequency: 'daily',
  systemAlerts: true,
};

export interface FAQTopic {
  id: string;
  category: string;
  title: string;
  description: string;
  details: string;
}

export const HELP_TOPICS: FAQTopic[] = [
  {
    id: 'topic-1',
    category: 'Clinical Workflows',
    title: 'How do I initiate a Cath Lab clinical time-out?',
    description: 'Guidelines on pre-op checklist verification and surgical induction.',
    details: 'Navigate to the Cath Lab Safety Check-In workstation via Patients or Treatment Offers. Ratify all 6 multidisciplinary safety safeguards, verify allergy contraindications, and complete dual clinician biometrics before starting the surgical encounter timer.',
  },
  {
    id: 'topic-2',
    category: 'Clinical Workflows',
    title: 'Reviewing STAT Critical Diagnostic Findings',
    description: 'Protocol for acknowledging panic laboratory values and expedited nephrology referral.',
    details: 'When a critical lab finding (e.g., Potassium > 6.0 mEq/L or Creatinine elevation) is reported, click "Acknowledge Panic Alert". You can initiate a simulated clinical teleconsultation or dispatch an urgent referral to Nephrology pre-populated with patient context.',
  },
  {
    id: 'topic-3',
    category: 'Account Security',
    title: 'Configuring Two-Factor Authentication & Hardware Keys',
    description: 'Managing TOTP authenticator apps and FIDO2 YubiKey credentials.',
    details: 'Open Account & Security Settings. Enter your authenticator verification code or tap your registered hardware key to ratify privileged clinical orders.',
  },
  {
    id: 'topic-4',
    category: 'Troubleshooting',
    title: 'Resolving OCR Scanned Record Mismatches',
    description: 'Correcting document parsing discrepancies and missing analyte values.',
    details: 'In the Split-Screen OCR Review Workstation, click directly on highlighted yellow fields to correct OCR values. Click "Add Clinical Row" to capture any missing lab analytes before ratifying the medical record.',
  },
];

