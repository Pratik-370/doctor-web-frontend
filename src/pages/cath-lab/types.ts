export interface SafetyChecklistState {
  patientIdentity: boolean;
  clinicalSafety: boolean;
  diagnosticImaging: boolean;
  plannedProcedure: boolean;
  signedConsents: boolean;
  teamRoster: boolean;
}

export interface CathLabContext {
  patientName: string;
  patientDob: string;
  patientAgeGender: string;
  patientCid: string;
  nfcToken: string;
  wristbandStatus: string;
  verbalConfirmation: string;

  // Allergies & Safety Safeguards
  allergyFlagged: boolean;
  allergyName: string;
  contraindicatedDrug: string;
  substituteDrug: string;
  metforminStatus: string;
  coagulationInr: string;
  plateletCount: string;
  vitals: {
    bp: string;
    hr: string;
    spo2: string;
    temp: string;
  };

  // Diagnostic & Imaging Correlation
  stressTestResult: string;
  stressTestDetail: string;
  tteLvef: string;
  tteDetail: string;

  // Planned Procedure & Site Verification
  procedureName: string;
  cptCode: string;
  tierAccess: string;
  primaryAccessSite: string;
  primaryAccessDetail: string;
  secondaryAccessSite: string;
  secondaryAccessDetail: string;
  cathSuite: string;
  fluoroscopyUnit: string;
  contrastMedia: string;

  // Signed Consents & Clearance
  consentFormName: string;
  consentSignedBy: string;
  consentWitness: string;
  financialSettlementId: string;
  financialPlanDetail: string;

  // Team Roster
  roster: Array<{
    role: string;
    name: string;
    initials: string;
    status: string;
    avatarBg: string;
    avatarText: string;
  }>;

  // Operational State
  protocolStatus: 'active' | 'hold' | 'ratified';
  holdReason?: string;
  holdNotes?: string;
  holdTimestamp?: string;
  ratifiedTimestamp?: string;
}

export const DEFAULT_CATH_LAB_DATA: CathLabContext = {
  patientName: 'Robert J. Sterling',
  patientDob: 'Mar 14, 1981',
  patientAgeGender: 'Age: 45 yrs • Male',
  patientCid: 'CID #8472-9901',
  nfcToken: '0x9B41...E8C2',
  wristbandStatus: 'Scanned & cross-matched to Bedside Monitor #04',
  verbalConfirmation:
    'Robert J. Sterling verbally affirmed full legal name, DOB, and intended diagnostic coronary catheterization during morning huddle.',

  allergyFlagged: true,
  allergyName: 'Severe Penicillin Allergy (Anaphylaxis Risk)',
  contraindicatedDrug: 'Cefazolin (Ancef)',
  substituteDrug: 'Vancomycin 1g IVPB infusion initiated at 09:50 EST (Running, line patent).',
  metforminStatus: 'Withheld 52 hrs (Renal baseline eGFR 74)',
  coagulationInr: '1.1 (Therapeutic) • Normal homeostatic range',
  plateletCount: '240,000 / µL • Adequate for hemostasis',
  vitals: {
    bp: '128/78 mmHg',
    hr: '68 bpm reg',
    spo2: '99% RA',
    temp: '98.4°F',
  },

  stressTestResult: 'Positive Result',
  stressTestDetail:
    'Demonstrated 1.8mm horizontal ST-depression in anterolateral leads V4-V6 at 8.4 METs. Correlates with suspected mid-to-distal LAD or diagonal lesion.',
  tteLvef: '~55% Preserved',
  tteDetail:
    'No resting regional wall motion abnormalities noted. Normal chamber dimensions; valves without significant stenosis or regurgitation.',

  procedureName:
    'Diagnostic Left Heart Catheterization & Selective Coronary Angiography',
  cptCode: 'CPT Code #93458 • Ventriculography on Standby if indicated',
  tierAccess: 'Tier-1 Access',
  primaryAccessSite: 'Right Radial Artery',
  primaryAccessDetail: "Allen's Test Positive (Patent Arch)",
  secondaryAccessSite: 'Right Common Femoral Artery',
  secondaryAccessDetail: 'Prepped & draped in surgical field',
  cathSuite: 'Mount Sinai #03',
  fluoroscopyUnit: 'Siemens Artis Q',
  contrastMedia: 'Isovue-370 Low-Osm',

  consentFormName: 'Informed Consent for Coronary Angiogram & PCI',
  consentSignedBy: 'Robert J. Sterling',
  consentWitness: 'Nurse Keith Vance, RN',
  financialSettlementId: 'Care ID Financial Settlement #FIN-TR8921-12M',
  financialPlanDetail: 'Care Coverage Plan: $4,420 settled / Underwritten pre-auth confirmed',

  roster: [
    {
      role: 'Attending Interventionalist (Present)',
      name: 'Dr. Michael Chang, MD',
      initials: 'MC',
      status: 'Present',
      avatarBg: 'bg-[#28006d]',
      avatarText: 'text-white',
    },
    {
      role: 'Lead Circulator (Scrubbed)',
      name: 'Keith Vance, RN',
      initials: 'KV',
      status: 'Scrubbed',
      avatarBg: 'bg-[#5af8fb]',
      avatarText: 'text-[#002020]',
    },
    {
      role: 'Cath Scrub Technologist',
      name: 'J. Morales, CST',
      initials: 'JM',
      status: 'Scrubbed',
      avatarBg: 'bg-[#dce9ff]',
      avatarText: 'text-[#0b1c30]',
    },
    {
      role: 'Standby MAC Provider',
      name: 'Tier 1 Sedation Monitoring',
      initials: 'CR',
      status: 'Standby',
      avatarBg: 'bg-[#dce9ff]',
      avatarText: 'text-[#0b1c30]',
    },
  ],

  protocolStatus: 'active',
};

