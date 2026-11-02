export type ReportType =
  | 'CBC Panel'
  | 'MRI Scan'
  | 'Consult Note'
  | 'Pathology'
  | 'Cardiac Biomarkers'
  | 'CT Angiography'
  | 'Comprehensive Metabolic Panel (CMP)';

export type ReportStatus = 'verified' | 'pending' | 'critical';

export type ReportPriority = 'routine' | 'urgent' | 'stat';

export interface CriticalFindingValue {
  name: string;
  value: number | string;
  unit: string;
  refRange: string;
  status: 'critical_high' | 'critical_low' | 'normal';
}

export interface ReportRecord {
  id: string;
  patientName: string;
  patientInitials: string;
  patientId: string;
  patientAge: number;
  patientGender: string;
  patientMrn: string;
  avatarUrl?: string;
  reportType: ReportType;
  hospital: string;
  createdDate: string;
  status: ReportStatus;
  priority: ReportPriority;
  receivedAgo: string;
  primaryDx: string;
  lastVisit: string;
  panelName: string;
  narrativeSummary: string;
  criticalValues?: CriticalFindingValue[];
  followUpWorkflow: {
    title: string;
    description: string;
    actions: string[];
  };
  reviewedAt?: string;
  reviewedBy?: string;
}

export const DEFAULT_REPORTS_DATA: ReportRecord[] = [
  {
    id: 'PT-84920',
    patientName: 'James Robertson',
    patientInitials: 'JR',
    patientId: 'PT-84920',
    patientAge: 68,
    patientGender: 'Male',
    patientMrn: '994-32A',
    reportType: 'Comprehensive Metabolic Panel (CMP)',
    hospital: 'General Hospital - Central Labs',
    createdDate: 'Oct 24, 2023',
    status: 'critical',
    priority: 'stat',
    receivedAgo: '10 mins ago',
    primaryDx: 'Hypertension, T2DM',
    lastVisit: '12 Days Ago',
    panelName: 'Comprehensive Metabolic Panel (CMP)',
    narrativeSummary:
      'Marked interval increase in serum creatinine and hyperkalemia compared to prior study dated 12 days ago. Findings are highly suspicious for acute kidney injury (AKI) likely superimposed on chronic kidney disease. Immediate clinical correlation and potential adjustment of nephrotoxic medications advised.',
    criticalValues: [
      {
        name: 'POTASSIUM (K)',
        value: '6.2',
        unit: 'mEq/L',
        refRange: 'Ref: 3.5 – 5.1 (High)',
        status: 'critical_high',
      },
      {
        name: 'CREATININE',
        value: '2.8',
        unit: 'mg/dL',
        refRange: 'Ref: 0.7 – 1.3 (High)',
        status: 'critical_high',
      },
    ],
    followUpWorkflow: {
      title: 'Required Follow-up Workflow',
      description:
        'Review current medication list (specifically ACEi/ARBs) and initiate urgent contact with patient.',
      actions: ['Start Consultation', 'Create Referral (Nephro)'],
    },
  },
  {
    id: 'HV-8842-A',
    patientName: 'John Smith',
    patientInitials: 'JS',
    patientId: 'HV-8842-A',
    patientAge: 52,
    patientGender: 'Male',
    patientMrn: '994-11B',
    reportType: 'CBC Panel',
    hospital: 'General Hospital',
    createdDate: 'Oct 24, 2023',
    status: 'pending',
    priority: 'urgent',
    receivedAgo: '2 hours ago',
    primaryDx: 'Fatigue, Suspected Anemia',
    lastVisit: '3 Weeks Ago',
    panelName: 'Complete Blood Count (CBC) with Differential',
    narrativeSummary:
      'Microcytic hypochromic anemia noted with Hemoglobin 9.4 g/dL and MCV 74 fL. Platelet count and WBC within normal limits. Peripheral smear demonstrates anisocytosis and mild poikilocytosis.',
    criticalValues: [
      {
        name: 'HEMOGLOBIN',
        value: '9.4',
        unit: 'g/dL',
        refRange: 'Ref: 13.5 – 17.5 (Low)',
        status: 'critical_low',
      },
    ],
    followUpWorkflow: {
      title: 'Required Follow-up Workflow',
      description: 'Order iron panel, ferritin, and schedule GI consultation for occult blood evaluation.',
      actions: ['Review Lab Slip', 'Order Ferritin Panel'],
    },
  },
  {
    id: 'HV-9102-C',
    patientName: 'Maria Rodriguez',
    patientInitials: 'MR',
    patientId: 'HV-9102-C',
    patientAge: 45,
    patientGender: 'Female',
    patientMrn: '982-44X',
    reportType: 'MRI Scan',
    hospital: 'Central Imaging Ctr',
    createdDate: 'Oct 23, 2023',
    status: 'verified',
    priority: 'routine',
    receivedAgo: 'Yesterday, 14:15',
    primaryDx: 'Lumbar Radiculopathy',
    lastVisit: '1 Month Ago',
    panelName: 'MRI Lumbar Spine Without Contrast',
    narrativeSummary:
      'L4-L5 broad-based disc bulge with mild bilateral neural foraminal narrowing. No central canal stenosis. Alignment and vertebral body heights preserved.',
    followUpWorkflow: {
      title: 'Clinical Follow-up Recommendation',
      description: 'Proceed with physical therapy and conservative analgesic regimen.',
      actions: ['Review Radiology Series', 'Send PT Referral'],
    },
  },
  {
    id: 'HV-3321-B',
    patientName: 'David Lee',
    patientInitials: 'DL',
    patientId: 'HV-3321-B',
    patientAge: 59,
    patientGender: 'Male',
    patientMrn: '774-90Z',
    reportType: 'Consult Note',
    hospital: 'City Clinic',
    createdDate: 'Oct 22, 2023',
    status: 'verified',
    priority: 'routine',
    receivedAgo: '2 days ago',
    primaryDx: 'Essential Hypertension',
    lastVisit: '5 Days Ago',
    panelName: 'Cardiology Specialist Encounter Note',
    narrativeSummary:
      'Blood pressure well controlled on Amlodipine 5mg. Transthoracic echocardiogram confirms normal left ventricular systolic function (EF 60-65%). Continue current medical therapy.',
    followUpWorkflow: {
      title: 'Clinical Follow-up Recommendation',
      description: 'Routine follow-up in 6 months with repeat basic metabolic panel.',
      actions: ['View Consultation Note', 'Print Patient Summary'],
    },
  },
  {
    id: 'HV-4401-E',
    patientName: 'Eleanor Vance',
    patientInitials: 'EV',
    patientId: 'HV-884-291',
    patientAge: 62,
    patientGender: 'Female',
    patientMrn: '884-291-K',
    reportType: 'Cardiac Biomarkers',
    hospital: 'St. Jude Heart Institute',
    createdDate: 'Oct 24, 2023',
    status: 'critical',
    priority: 'stat',
    receivedAgo: '25 mins ago',
    primaryDx: 'Chest Pain, Angina Pectoris',
    lastVisit: 'Today',
    panelName: 'High-Sensitivity Troponin I (hs-cTnI)',
    narrativeSummary:
      'Significant elevation in serial high-sensitivity Troponin I (0.142 ng/mL vs baseline <0.014 ng/mL). Consistent with acute myocardial injury / Non-ST Elevation Myocardial Infarction (NSTEMI). Immediate cardiology consult and coronary angiography recommended.',
    criticalValues: [
      {
        name: 'TROPONIN I (hs-cTnI)',
        value: '0.142',
        unit: 'ng/mL',
        refRange: 'Ref: < 0.014 (Critical High)',
        status: 'critical_high',
      },
    ],
    followUpWorkflow: {
      title: 'Emergency Cardiac Pathway',
      description: 'Initiate telemetry monitoring, dual antiplatelet therapy, and stat cath lab activation.',
      actions: ['Activate Cath Lab', 'Emergency Cardiology Consult'],
    },
  },
];

