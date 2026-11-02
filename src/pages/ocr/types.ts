export type OcrWorkflowStep = 'upload' | 'processing' | 'review' | 'success';

export type SupportedFileFormat = 'PDF' | 'PNG' | 'JPG / JPEG' | 'DICOM';

export interface PatientSummary {
  name: string;
  healthVaultId: string;
  age: string;
  gender: string;
  verified: boolean;
  avatarUrl: string;
}

export interface RecentUploadRecord {
  id: string;
  documentName: string;
  type: string;
  date: string;
  status: 'Verified' | 'Needs Review' | 'Processing' | 'Saved';
  statusColor: string;
  action: string;
}

export interface ExtractedClinicalField {
  id: string;
  label: string;
  value: string;
  originalValue: string;
  status: 'verified' | 'needs-review' | 'medium-confidence';
  confidenceScore: number;
  warningNote?: string;
  category: 'demographics' | 'report-details';
}

export interface ClinicalLabRow {
  id: string;
  testName: string;
  value: string;
  unit: string;
  referenceRange?: string;
  status?: 'normal' | 'high' | 'low';
}

export interface OcrProcessingState {
  isSimulating: boolean;
  progressPercent: number;
  currentStage: string;
  stageIndex: number;
}

export const DEFAULT_PATIENT_OCR: PatientSummary = {
  name: 'Eleanor Vance',
  healthVaultId: 'HV-884-291',
  age: '45 yrs',
  gender: 'Female',
  verified: true,
  avatarUrl: '/src/assets/avatars/patient-avatar-ocr.png',
};

export const INITIAL_RECENT_UPLOADS: RecentUploadRecord[] = [
  {
    id: 'DOC-901',
    documentName: 'Blood Work.pdf',
    type: 'Laboratory',
    date: '10/24/2023',
    status: 'Verified',
    statusColor: 'bg-[rgba(0,105,107,0.15)] text-[#00696b]',
    action: 'View',
  },
  {
    id: 'DOC-902',
    documentName: 'Chest X-Ray.dicom',
    type: 'Radiology',
    date: '09/15/2023',
    status: 'Verified',
    statusColor: 'bg-[rgba(0,105,107,0.15)] text-[#00696b]',
    action: 'View',
  },
  {
    id: 'DOC-903',
    documentName: 'Discharge Summary.pdf',
    type: 'Clinical Note',
    date: '08/30/2023',
    status: 'Verified',
    statusColor: 'bg-[rgba(0,105,107,0.15)] text-[#00696b]',
    action: 'View',
  },
  {
    id: 'DOC-904',
    documentName: 'Lab_Results_041123.pdf',
    type: 'Laboratory',
    date: '11/04/2023',
    status: 'Needs Review',
    statusColor: 'bg-[#ffdad6] text-[#93000a]',
    action: 'Review',
  },
];

export const INITIAL_EXTRACTED_FIELDS: ExtractedClinicalField[] = [
  {
    id: 'patient_name',
    label: 'Patient Name',
    value: 'Jane Doe',
    originalValue: 'Jane Doe',
    status: 'verified',
    confidenceScore: 0.98,
    category: 'demographics',
  },
  {
    id: 'hv_id',
    label: 'HV ID',
    value: 'HV-992-O81',
    originalValue: 'HV-992-O81',
    status: 'needs-review',
    confidenceScore: 0.72,
    warningNote: "Suspected 'O' instead of '0'",
    category: 'demographics',
  },
  {
    id: 'dob',
    label: 'DOB',
    value: '06/15/1985',
    originalValue: '06/15/1985',
    status: 'verified',
    confidenceScore: 0.96,
    category: 'demographics',
  },
  {
    id: 'gender',
    label: 'Gender',
    value: 'Female',
    originalValue: 'Female',
    status: 'verified',
    confidenceScore: 0.99,
    category: 'demographics',
  },
  {
    id: 'hospital_facility',
    label: 'Hospital / Facility',
    value: 'Mercy Gen. Hospita',
    originalValue: 'Mercy Gen. Hospita',
    status: 'medium-confidence',
    confidenceScore: 0.84,
    warningNote: 'Trailing character clipped by OCR scan edge',
    category: 'report-details',
  },
  {
    id: 'collection_date',
    label: 'Collection Date',
    value: '11/04/2023',
    originalValue: '11/04/2023',
    status: 'verified',
    confidenceScore: 0.95,
    category: 'report-details',
  },
  {
    id: 'report_type',
    label: 'Report Type',
    value: 'Complete Blood Count (CBC)',
    originalValue: 'Complete Blood Count (CBC)',
    status: 'verified',
    confidenceScore: 0.97,
    category: 'report-details',
  },
];

export const INITIAL_LAB_VALUES: ClinicalLabRow[] = [
  {
    id: 'lab_1',
    testName: 'Hemoglobin',
    value: '13.2',
    unit: 'g/dL',
    referenceRange: '12.0 - 15.5 g/dL',
    status: 'normal',
  },
  {
    id: 'lab_2',
    testName: 'Hematocrit',
    value: '40.5',
    unit: '%',
    referenceRange: '37.0 - 48.0 %',
    status: 'normal',
  },
  {
    id: 'lab_3',
    testName: 'WBC Count',
    value: '6.8',
    unit: 'x10^3/uL',
    referenceRange: '4.5 - 11.0 x10^3/uL',
    status: 'normal',
  },
  {
    id: 'lab_4',
    testName: 'Platelet Count',
    value: '240',
    unit: 'x10^3/uL',
    referenceRange: '150 - 450 x10^3/uL',
    status: 'normal',
  },
  {
    id: 'lab_5',
    testName: 'RBC Count',
    value: '4.42',
    unit: 'x10^6/uL',
    referenceRange: '3.90 - 5.20 x10^6/uL',
    status: 'normal',
  },
];

export const OCR_PROCESSING_STAGES = [
  'Reading document raster...',
  'Extracting clinical entities & optical characters...',
  'Analyzing confidence intervals & field anchors...',
  'Normalizing medical nomenclature to EHR format...',
];

