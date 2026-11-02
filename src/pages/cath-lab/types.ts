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

export interface EncounterTelemetry {
  encounterId: string;
  scheduledSlot: string;
  actualInduction: string;
  elapsedSeconds: number;
  patientName: string;
  patientCid: string;
  patientDob: string;
  patientAgeGender: string;
  facility: string;
  attendingPhysician: string;
  cptCode: string;
  procedureName: string;
  accessApproach: string;
  fluoroTimeMinutes: number;
  radiationDap: number;
  contrastInjectedMl: number;
  bp: string;
  hr: string;
  spo2: string;
  actSeconds: number;
  lvedp: string;
  aorticRootBp: string;
  radialSbp: string;
}

export interface CoronaryVesselFinding {
  vessel: string;
  fullName: string;
  stenosisPercent: number;
  description: string;
  timiFlow: string;
  status: 'normal' | 'mild' | 'moderate' | 'severe';
  ffrIndicated: boolean;
}

export interface EncounterDocumentationState {
  encounterId: string;
  telemetry: EncounterTelemetry;
  vesselFindings: CoronaryVesselFinding[];
  lvefPercent: number;
  lvefDescription: string;
  hemostasisMethod: string;
  trBandAirMl: number;
  trBandWeaningSchedule: Array<{
    time: string;
    action: string;
    volumeRemaining: string;
    completed: boolean;
  }>;
  primaryDiagnosisIcd: string;
  primaryDiagnosisDesc: string;
  secondaryDiagnosisIcd: string;
  secondaryDiagnosisDesc: string;
  prescriptions: Array<{
    medication: string;
    dosage: string;
    sig: string;
    quantity: string;
  }>;
  recoveryBay: string;
  bedrestHours: number;
  dischargeEscort: string;
  followUpWeeks: number;
  physicianAttested: boolean;
  attestationTimestamp?: string;
  cryptoSealHash: string;
}

export const DEFAULT_ENCOUNTER_DATA: EncounterDocumentationState = {
  encounterId: 'ENC-2026-88419',
  telemetry: {
    encounterId: '#ENC-2026-88419',
    scheduledSlot: '09:30 - 11:00 AM EST',
    actualInduction: '09:32 AM EST',
    elapsedSeconds: 258,
    patientName: 'Robert J. Sterling',
    patientCid: 'CID #8472-9901',
    patientDob: 'Mar 14, 1981',
    patientAgeGender: '45yo M',
    facility: 'Mount Sinai Hospital, Cath Lab Station #03',
    attendingPhysician: 'Dr. Michael Chang, MD',
    cptCode: 'CPT #93458',
    procedureName: 'Diagnostic Left Heart Catheterization & Selective Coronary Angiography',
    accessApproach: 'Right Radial Arterial Approach (6F Glidesheath Slender)',
    fluoroTimeMinutes: 4.8,
    radiationDap: 32.4,
    contrastInjectedMl: 65,
    bp: '124/76 mmHg',
    hr: '72 bpm sinus',
    spo2: '99% RA',
    actSeconds: 265,
    lvedp: '14 mmHg',
    aorticRootBp: '122/74 mmHg',
    radialSbp: '124 mmHg',
  },
  vesselFindings: [
    {
      vessel: 'LM',
      fullName: 'Left Main Coronary Artery',
      stenosisPercent: 0,
      description: 'Smooth caliber throughout without luminal narrowing. Distal bifurcation intact.',
      timiFlow: 'TIMI 3',
      status: 'normal',
      ffrIndicated: false,
    },
    {
      vessel: 'LAD',
      fullName: 'Left Anterior Descending',
      stenosisPercent: 40,
      description: 'Eccentric atheromatous plaque in mid-vessel. Non-flow limiting. Distal vessel fills normally.',
      timiFlow: 'TIMI 3',
      status: 'mild',
      ffrIndicated: false,
    },
    {
      vessel: 'LCx',
      fullName: 'Left Circumflex',
      stenosisPercent: 20,
      description: 'Mild proximal luminal irregularity. OM1 and OM2 branches patent without significant stenosis.',
      timiFlow: 'TIMI 3',
      status: 'mild',
      ffrIndicated: false,
    },
    {
      vessel: 'RCA',
      fullName: 'Right Coronary Artery',
      stenosisPercent: 30,
      description: 'Dominant vessel. Mild eccentric proximal narrowing. PDA and PL branches widely patent.',
      timiFlow: 'TIMI 3',
      status: 'mild',
      ffrIndicated: false,
    },
  ],
  lvefPercent: 58,
  lvefDescription: 'Normal left ventricular systolic function. No regional wall motion abnormalities. Normal end-diastolic pressure.',
  hemostasisMethod: 'TR Band Radial Hemostatic Compression Device',
  trBandAirMl: 13,
  trBandWeaningSchedule: [
    { time: '10:45 AM', action: 'Remove 3 mL air; check puncture site for oozing / patent pulse', volumeRemaining: '10 mL', completed: true },
    { time: '11:00 AM', action: 'Remove 3 mL air; verify radial pulse palpable 2+', volumeRemaining: '7 mL', completed: false },
    { time: '11:15 AM', action: 'Remove 4 mL air; monitor site integrity', volumeRemaining: '3 mL', completed: false },
    { time: '11:30 AM', action: 'Complete removal; apply sterile pressure dressing', volumeRemaining: '0 mL', completed: false },
  ],
  primaryDiagnosisIcd: 'I25.10',
  primaryDiagnosisDesc: 'Atherosclerotic heart disease of native coronary artery without angina pectoris',
  secondaryDiagnosisIcd: 'R07.89',
  secondaryDiagnosisDesc: 'Other chest pain (Atypical angina symptoms on treadmill testing)',
  prescriptions: [
    { medication: 'Atorvastatin Calcium', dosage: '40 mg oral tablet', sig: 'Take 1 tablet by mouth daily at bedtime', quantity: '30 tablets (1 refill)' },
    { medication: 'Aspirin Enteric Coated', dosage: '81 mg oral tablet', sig: 'Take 1 tablet by mouth daily with meal', quantity: '90 tablets (3 refills)' },
  ],
  recoveryBay: 'Step-Down Recovery Bay #04',
  bedrestHours: 4,
  dischargeEscort: 'Mary Sterling (Spouse • Confirmed Driver)',
  followUpWeeks: 4,
  physicianAttested: true,
  attestationTimestamp: 'Nov 04, 2026 @ 10:45 AM EST',
  cryptoSealHash: 'SHA256: 7f89b02a9e14c5d883b271e892cfa318e4b91f638c03e8714ba329b871c890a2',
};

