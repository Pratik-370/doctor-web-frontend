export type ReferralDirection = 'outgoing' | 'incoming';
export type ReferralPriority = 'routine' | 'urgent';
export type ReferralStatus = 'pending' | 'accepted' | 'under_review' | 'completed' | 'declined';
export type ReferralSpecialty =
  | 'Cardiology'
  | 'Orthopedics'
  | 'Radiology'
  | 'Neurology'
  | 'Oncology'
  | 'Gastroenterology';

export interface ReferralAttachment {
  id: string;
  name: string;
  type: string;
  size: string;
  date: string;
}

export interface ReferralPatient {
  id: string;
  name: string;
  dob: string;
  age: number;
  gender: string;
  mrn: string;
  bloodGroup?: string;
  avatarUrl?: string;
  initials?: string;
}

export interface ReferralProvider {
  name: string;
  role: string;
  facility: string;
  email?: string;
  phone?: string;
  avatarUrl?: string;
  initials?: string;
}

export interface ReferralTimelineStep {
  title: string;
  timestamp: string;
  author: string;
  status: 'completed' | 'active' | 'pending';
}

export interface ReferralRecord {
  id: string;
  refNumber: string;
  direction: ReferralDirection;
  priority: ReferralPriority;
  status: ReferralStatus;
  specialty: ReferralSpecialty;
  date: string;
  patient: ReferralPatient;
  referringProvider: ReferralProvider;
  receivingProvider: ReferralProvider;
  reasonForReferral: string;
  clinicalSummary: string;
  chiefComplaint?: string;
  diagnoses: string[];
  medications: string[];
  vitals?: {
    bp: string;
    hr: number;
    spo2: number;
    bmi: number;
  };
  attachments: ReferralAttachment[];
  timeline: ReferralTimelineStep[];
}

export const DEFAULT_REFERRALS_DATA: ReferralRecord[] = [
  {
    id: 'REF-1042',
    refNumber: 'REF-1042',
    direction: 'outgoing',
    priority: 'urgent',
    status: 'pending',
    specialty: 'Cardiology',
    date: 'Today, 09:15 AM',
    patient: {
      id: 'P-1042',
      name: 'John Doe',
      dob: '12/04/1980',
      age: 44,
      gender: 'Male',
      mrn: 'HV-8472-9901',
      bloodGroup: 'A Positive',
      initials: 'JD',
    },
    referringProvider: {
      name: 'Dr. Clinical',
      role: 'Attending Physician',
      facility: 'CareID Health Center',
      email: 'dr.clinical@careid.health',
      initials: 'DC',
    },
    receivingProvider: {
      name: 'Dr. Sarah Jenkins',
      role: 'Interventional Cardiology',
      facility: 'Mercy General Hosp.',
      email: 'sarah.jenkins@mercygeneral.org',
      initials: 'SJ',
    },
    reasonForReferral: 'Evaluation for progressive exertional angina and positive stress test findings.',
    clinicalSummary:
      'Patient reports 3 weeks of crescendo retrosternal discomfort on moderate exertion. Resting ECG shows early T-wave inversions in leads V4-V6. Urgent interventional cardiology workup recommended.',
    chiefComplaint: 'Substernal chest pressure on moderate exertion, dyspnea on stairs.',
    diagnoses: ['Unstable Angina (I20.0)', 'Essential Hypertension (I10)'],
    medications: ['Aspirin 81mg', 'Metoprolol Tartrate 25mg', 'Nitroglycerin PRN'],
    vitals: {
      bp: '142/88',
      hr: 82,
      spo2: 97,
      bmi: 27.6,
    },
    attachments: [
      {
        id: 'att-1',
        name: 'Resting_ECG_Today.pdf',
        type: 'application/pdf',
        size: '1.4 MB',
        date: 'Today, 09:00 AM',
      },
      {
        id: 'att-2',
        name: 'Troponin_Serial_Labs.pdf',
        type: 'application/pdf',
        size: '520 KB',
        date: 'Today, 08:30 AM',
      },
    ],
    timeline: [
      {
        title: 'Referral Created',
        timestamp: 'Today • 09:15 AM',
        author: 'By Dr. Clinical',
        status: 'completed',
      },
      {
        title: 'Dispatched to Mercy General Hosp.',
        timestamp: 'Today • 09:16 AM',
        author: 'System Automated',
        status: 'completed',
      },
      {
        title: 'Triage & Specialist Review',
        timestamp: 'Pending Review',
        author: 'Dr. Sarah Jenkins',
        status: 'active',
      },
      {
        title: 'Consultation Scheduled',
        timestamp: 'Pending',
        author: 'Outpatient Scheduling',
        status: 'pending',
      },
      {
        title: 'Consultation Completed',
        timestamp: 'Pending encounter',
        author: 'Specialist Note',
        status: 'pending',
      },
    ],
  },
  {
    id: 'REF-1039',
    refNumber: 'REF-1039',
    direction: 'incoming',
    priority: 'routine',
    status: 'accepted',
    specialty: 'Orthopedics',
    date: 'Yesterday, 14:30',
    patient: {
      id: 'P-1039',
      name: 'Robert Smith',
      dob: '05/22/1945',
      age: 79,
      gender: 'Male',
      mrn: 'HV-7731-0024',
      bloodGroup: 'B Positive',
      initials: 'RS',
    },
    referringProvider: {
      name: 'Dr. Alan Vance (PCP)',
      role: 'Primary Care Physician',
      facility: 'City Health Clinic',
      email: 'alan.vance@cityhealth.org',
      initials: 'AV',
    },
    receivingProvider: {
      name: 'Dr. Clinical',
      role: 'Orthopedic Surgery',
      facility: 'CareID Specialty Pavilion',
      email: 'dr.clinical@careid.health',
      initials: 'DC',
    },
    reasonForReferral: 'Severe degenerative joint disease of right knee with limited ambulation.',
    clinicalSummary:
      'Patient has failed conservative therapy including NSAIDs and intra-articular corticosteroid injections. Standing AP/lateral radiograph demonstrates bone-on-bone medial compartment narrowing.',
    diagnoses: ['Severe Osteoarthritis, Right Knee (M17.11)'],
    medications: ['Meloxicam 15mg', 'Acetaminophen 650mg PRN'],
    vitals: {
      bp: '130/80',
      hr: 72,
      spo2: 98,
      bmi: 26.2,
    },
    attachments: [
      {
        id: 'att-3',
        name: 'Knee_Radiograph_AP_Lat.pdf',
        type: 'application/pdf',
        size: '3.8 MB',
        date: 'Oct 30, 2026',
      },
    ],
    timeline: [
      {
        title: 'Referral Created',
        timestamp: 'Yesterday • 14:30',
        author: 'Dr. Alan Vance (PCP)',
        status: 'completed',
      },
      {
        title: 'Intake Received',
        timestamp: 'Yesterday • 14:35',
        author: 'System automated',
        status: 'completed',
      },
      {
        title: 'Accepted by CareID Ortho',
        timestamp: 'Yesterday • 16:00',
        author: 'Dr. Clinical',
        status: 'active',
      },
      {
        title: 'Consultation Scheduled',
        timestamp: 'Pending appointment',
        author: 'CareID Scheduling',
        status: 'pending',
      },
    ],
  },
  {
    id: 'REF-0988',
    refNumber: 'REF-0988',
    direction: 'outgoing',
    priority: 'routine',
    status: 'completed',
    specialty: 'Radiology',
    date: 'Oct 24, 2023',
    patient: {
      id: 'P-0988',
      name: 'Emily Wong',
      dob: '11/10/1992',
      age: 32,
      gender: 'Female',
      mrn: 'HV-4412-8821',
      bloodGroup: 'O Negative',
      initials: 'EW',
    },
    referringProvider: {
      name: 'Dr. Clinical',
      role: 'Attending Physician',
      facility: 'CareID Health Center',
      email: 'dr.clinical@careid.health',
      initials: 'DC',
    },
    receivingProvider: {
      name: 'Dr. Lisa Ray',
      role: 'Diagnostic Radiologist',
      facility: 'Advanced Imaging Ctr.',
      email: 'lisa.ray@advancedimaging.org',
      initials: 'LR',
    },
    reasonForReferral: 'MRI Brain with and without contrast for persistent refractory migraine and aura.',
    clinicalSummary:
      '32-year-old female with 6-month history of worsening unilateral temporal headaches with visual scintillations. Neurological examination non-focal.',
    diagnoses: ['Migraine with Aura (G43.109)'],
    medications: ['Sumatriptan 50mg PRN', 'Propranolol 40mg daily'],
    vitals: {
      bp: '118/74',
      hr: 68,
      spo2: 99,
      bmi: 22.1,
    },
    attachments: [
      {
        id: 'att-4',
        name: 'Brain_MRI_Neuro_Report.pdf',
        type: 'application/pdf',
        size: '4.2 MB',
        date: 'Oct 24, 2023',
      },
    ],
    timeline: [
      {
        title: 'Referral Created',
        timestamp: 'Oct 24, 2023 • 08:30',
        author: 'Dr. Clinical',
        status: 'completed',
      },
      {
        title: 'Imaging Performed',
        timestamp: 'Oct 24, 2023 • 11:15',
        author: 'Technician Staff',
        status: 'completed',
      },
      {
        title: 'Radiology Report Finalized',
        timestamp: 'Oct 24, 2023 • 16:45',
        author: 'Dr. Lisa Ray',
        status: 'completed',
      },
    ],
  },
  {
    id: 'REF-2023-8910',
    refNumber: 'REF-2023-8910',
    direction: 'outgoing',
    priority: 'routine',
    status: 'accepted',
    specialty: 'Cardiology',
    date: 'Oct 15, 2023',
    patient: {
      id: 'P-8910',
      name: 'Robert J. Oppenheimer',
      dob: '12 Nov 1954',
      age: 69,
      gender: 'Male',
      mrn: 'HV360-112-884',
      bloodGroup: 'A Positive',
      avatarUrl: '/avatars/oppenheimer.png',
      initials: 'RO',
    },
    referringProvider: {
      name: 'Dr. Sarah Chen',
      role: 'Primary Care • General Practice',
      facility: 'HealthVault 360 Clinic',
      email: 'sarah.chen@hv360.org',
      initials: 'SC',
    },
    receivingProvider: {
      name: 'Dr. Elena Marcus',
      role: 'Interventional Cardiologist',
      facility: 'Cardiology Department',
      email: 'elena.marcus@hospital.org',
      initials: 'EM',
    },
    reasonForReferral:
      'Patient presents with increasing episodes of exertional angina and shortness of breath over the past 3 months. Previous stress test (completed in 2021) was borderline. Requesting full cardiac evaluation and updated echocardiogram to rule out progressive ischemic heart disease.',
    clinicalSummary:
      'Patient presents with increasing episodes of exertional angina and shortness of breath over the past 3 months. Previous stress test (completed in 2021) was borderline. Requesting full cardiac evaluation and updated echocardiogram to rule out progressive ischemic heart disease.',
    chiefComplaint: 'Exertional chest tightness and dyspnea on exertion.',
    diagnoses: ['Hypertension (I10)', 'Hyperlipidemia (E78.5)'],
    medications: ['Lisinopril 20mg', 'Atorvastatin 40mg'],
    attachments: [
      {
        id: 'att-5',
        name: 'ECG_Results_Oct23.pdf',
        type: 'application/pdf',
        size: '1.2 MB',
        date: 'Oct 14, 2023',
      },
      {
        id: 'att-6',
        name: 'Lab_Panel_Fasting.pdf',
        type: 'application/pdf',
        size: '450 KB',
        date: 'Oct 10, 2023',
      },
      {
        id: 'att-7',
        name: 'Clinical_Notes_DrChen.txt',
        type: 'text/plain',
        size: '12 KB',
        date: 'Oct 15, 2023',
      },
    ],
    timeline: [
      {
        title: 'Referral Created',
        timestamp: 'Oct 15, 2023 • 09:41 AM',
        author: 'By Dr. Sarah Chen',
        status: 'completed',
      },
      {
        title: 'Received',
        timestamp: 'Oct 15, 2023 • 09:45 AM',
        author: 'System automated',
        status: 'completed',
      },
      {
        title: 'Accepted',
        timestamp: 'Oct 16, 2023 • 14:20 PM',
        author: 'Pending clinical review by Dr. Marcus',
        status: 'active',
      },
      {
        title: 'Reviewed',
        timestamp: 'Pending',
        author: 'Specialist Note',
        status: 'pending',
      },
      {
        title: 'Completed',
        timestamp: 'Pending appointment',
        author: 'Clinical Handoff',
        status: 'pending',
      },
    ],
  },
  {
    id: 'REF-8924-A',
    refNumber: 'REF-8924-A',
    direction: 'incoming',
    priority: 'urgent',
    status: 'under_review',
    specialty: 'Cardiology',
    date: 'Today, 09:15 AM',
    patient: {
      id: 'P-8924',
      name: 'Robert Chen',
      dob: '05/12/1969',
      age: 54,
      gender: 'Male',
      mrn: '9482-1004-X',
      bloodGroup: 'O Positive',
      initials: 'RC',
    },
    referringProvider: {
      name: 'Dr. Sarah Jenkins',
      role: 'Primary Care',
      facility: 'City Health Clinic',
      email: 's.jenkins@cityhealth.org',
      initials: 'SJ',
    },
    receivingProvider: {
      name: 'Dr. Clinical',
      role: 'Cardiology Specialist',
      facility: 'CareID Heart Center',
      email: 'dr.clinical@careid.health',
      initials: 'DC',
    },
    reasonForReferral:
      'Persistent atypical chest pain radiating to left shoulder, exacerbated by exertion over the last 3 weeks.',
    chiefComplaint:
      'Persistent atypical chest pain radiating to left shoulder, exacerbated by exertion over the last 3 weeks. Shortness of breath during moderate activity.',
    clinicalSummary:
      'Patient presents with escalating angina symptoms despite initial management with nitrates. Recent resting ECG showed non-specific ST-T wave changes. Stress test inconclusive due to patient fatigue. Given family history of early CAD, referring to Cardiology for comprehensive evaluation, potential angiography, and advanced management plan.',
    diagnoses: ['Angina Pectoris', 'Dyspnea', 'High CAD Risk'],
    medications: ['Nitroglycerin SL 0.4mg PRN', 'Metoprolol Succinate 50mg', 'Atorvastatin 80mg'],
    vitals: {
      bp: '145/92',
      hr: 88,
      spo2: 96,
      bmi: 28.4,
    },
    attachments: [
      {
        id: 'att-8',
        name: 'ECG_Report_Oct12.pdf',
        type: 'application/pdf',
        size: '1.2 MB',
        date: 'Oct 12, 2023',
      },
      {
        id: 'att-9',
        name: 'Lab_Results_Panel.pdf',
        type: 'application/pdf',
        size: '845 KB',
        date: 'Oct 10, 2023',
      },
      {
        id: 'att-10',
        name: 'PCP_Encounter_Notes.pdf',
        type: 'application/pdf',
        size: '420 KB',
        date: 'Oct 15, 2023',
      },
    ],
    timeline: [
      {
        title: 'Referral Received',
        timestamp: 'Today • 09:15 AM',
        author: 'Dr. Sarah Jenkins',
        status: 'completed',
      },
      {
        title: 'Triage Categorization',
        timestamp: 'Today • 09:20 AM',
        author: 'CareID Intake Coordinator',
        status: 'completed',
      },
      {
        title: 'Specialist In-Review',
        timestamp: 'In Progress',
        author: 'Dr. Clinical',
        status: 'active',
      },
    ],
  },
];

