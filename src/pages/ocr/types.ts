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

export interface RegisteredPatient {
  id: string;
  healthVaultId: string;
  name: string;
  age: string;
  gender: string;
  dob: string;
  verified: boolean;
  status: 'Active' | 'Critical' | 'Waiting';
  avatarUrl?: string;
}

export interface SourceDocumentIdentity {
  id: string;
  fileName: string;
  fileSize: string;
  fileType: string;
  genuinePatientName: string;
  genuineHealthVaultId: string;
  genuineDob: string;
  genuineGender: string;
  rawOcrName: string;
  rawOcrHvId: string;
  rawOcrWarning?: string;
  isOcrExtractionErrorOnly: boolean;
  unresolvedIdentity?: boolean;
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

export const CLINIC_PATIENT_REGISTRY: RegisteredPatient[] = [
  {
    id: 'HV-884-291',
    healthVaultId: 'HV-884-291',
    name: 'Eleanor Vance',
    age: '45 yrs',
    gender: 'Female',
    dob: '10/24/1978',
    verified: true,
    status: 'Active',
  },
  {
    id: 'HV-992-081',
    healthVaultId: 'HV-992-081',
    name: 'Jane Doe',
    age: '38 yrs',
    gender: 'Female',
    dob: '06/15/1985',
    verified: true,
    status: 'Active',
  },
  {
    id: 'HV-329-004',
    healthVaultId: 'HV-329-004',
    name: 'Marcus Chen',
    age: '62 yrs',
    gender: 'Male',
    dob: '04/12/1961',
    verified: true,
    status: 'Critical',
  },
  {
    id: 'PT-84920',
    healthVaultId: 'PT-84920',
    name: 'James Robertson',
    age: '68 yrs',
    gender: 'Male',
    dob: '07/14/1955',
    verified: true,
    status: 'Active',
  },
];

export function findRegisteredPatient(identifier: string): RegisteredPatient | undefined {
  if (!identifier) return undefined;
  const cleanId = identifier.replace(/[-_ ]/g, '').toUpperCase();
  const cleanName = identifier.trim().toLowerCase();

  return CLINIC_PATIENT_REGISTRY.find((p) => {
    const pCleanId = p.healthVaultId.replace(/[-_ ]/g, '').toUpperCase();
    const pCleanName = p.name.trim().toLowerCase();
    if (cleanId === pCleanId || (pCleanId === 'HV992081' && cleanId === 'HV992O81')) {
      return true;
    }
    if (cleanName === pCleanName) {
      return true;
    }
    return false;
  });
}

export const DEMO_SOURCE_DOCUMENTS: Record<string, SourceDocumentIdentity> = {
  jane_doe: {
    id: 'jane_doe',
    fileName: 'Lab_Results_041123.pdf',
    fileSize: '2.4 MB',
    fileType: 'application/pdf',
    genuinePatientName: 'Jane Doe',
    genuineHealthVaultId: 'HV-992-081',
    genuineDob: '06/15/1985',
    genuineGender: 'Female',
    rawOcrName: 'Jane Doe',
    rawOcrHvId: 'HV-992-O81',
    rawOcrWarning: "Suspected 'O' instead of '0'",
    isOcrExtractionErrorOnly: false,
    unresolvedIdentity: false,
  },
  eleanor_ocr_error: {
    id: 'eleanor_ocr_error',
    fileName: 'Blood_Work_Eleanor.pdf',
    fileSize: '1.8 MB',
    fileType: 'application/pdf',
    genuinePatientName: 'Eleanor Vance',
    genuineHealthVaultId: 'HV-884-291',
    genuineDob: '10/24/1978',
    genuineGender: 'Female',
    rawOcrName: 'Eleanor Vance',
    rawOcrHvId: 'HV-884-29I',
    rawOcrWarning: "Suspected 'I' instead of '1'",
    isOcrExtractionErrorOnly: true,
    unresolvedIdentity: false,
  },
  eleanor_verified: {
    id: 'eleanor_verified',
    fileName: 'Discharge_Summary_Eleanor.pdf',
    fileSize: '1.2 MB',
    fileType: 'application/pdf',
    genuinePatientName: 'Eleanor Vance',
    genuineHealthVaultId: 'HV-884-291',
    genuineDob: '10/24/1978',
    genuineGender: 'Female',
    rawOcrName: 'Eleanor Vance',
    rawOcrHvId: 'HV-884-291',
    isOcrExtractionErrorOnly: false,
    unresolvedIdentity: false,
  },
  unresolved: {
    id: 'unresolved',
    fileName: 'Unidentified_Clinic_Note.pdf',
    fileSize: '3.1 MB',
    fileType: 'application/pdf',
    genuinePatientName: 'Unidentified Patient',
    genuineHealthVaultId: 'HV-000-000',
    genuineDob: '01/01/1970',
    genuineGender: 'Unknown',
    rawOcrName: 'Unidentified Patient',
    rawOcrHvId: 'HV-000-000',
    rawOcrWarning: 'No matching patient records in EHR master index',
    isOcrExtractionErrorOnly: false,
    unresolvedIdentity: true,
  },
};

export function getExtractedFieldsForDocument(sourceDoc: SourceDocumentIdentity): ExtractedClinicalField[] {
  return [
    {
      id: 'patient_name',
      label: 'Patient Name',
      value: sourceDoc.rawOcrName,
      originalValue: sourceDoc.rawOcrName,
      status: 'verified',
      confidenceScore: 0.98,
      category: 'demographics',
    },
    {
      id: 'hv_id',
      label: 'HV ID',
      value: sourceDoc.rawOcrHvId,
      originalValue: sourceDoc.rawOcrHvId,
      status: sourceDoc.rawOcrWarning ? 'needs-review' : 'verified',
      confidenceScore: sourceDoc.rawOcrWarning ? 0.72 : 0.99,
      warningNote: sourceDoc.rawOcrWarning,
      category: 'demographics',
    },
    {
      id: 'dob',
      label: 'DOB',
      value: sourceDoc.genuineDob,
      originalValue: sourceDoc.genuineDob,
      status: 'verified',
      confidenceScore: 0.96,
      category: 'demographics',
    },
    {
      id: 'gender',
      label: 'Gender',
      value: sourceDoc.genuineGender,
      originalValue: sourceDoc.genuineGender,
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
}

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

export const INITIAL_EXTRACTED_FIELDS: ExtractedClinicalField[] =
  getExtractedFieldsForDocument(DEMO_SOURCE_DOCUMENTS.jane_doe);

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

