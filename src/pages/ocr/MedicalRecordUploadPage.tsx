import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import {
  Upload,
  Camera,
  FileText,
  Check,
  AlertCircle,
  AlertTriangle,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Maximize2,
  ChevronRight,
  Plus,
  Trash2,
  ArrowLeft,
  X,
  FileCheck2,
  Scan,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  OcrWorkflowStep,
  SupportedFileFormat,
  DEFAULT_PATIENT_OCR,
  INITIAL_RECENT_UPLOADS,
  INITIAL_LAB_VALUES,
  OCR_PROCESSING_STAGES,
  ExtractedClinicalField,
  ClinicalLabRow,
  RecentUploadRecord,
  DEMO_SOURCE_DOCUMENTS,
  SourceDocumentIdentity,
  findRegisteredPatient,
  getExtractedFieldsForDocument,
} from './types';
import patientAvatarOcr from '@/assets/avatars/patient-avatar-ocr.png';
import scannedLabReport from '@/assets/medical/scanned-lab-report.png';

interface UploadedFileMeta {
  name: string;
  size: string;
  type: string;
  previewUrl?: string;
}

export const MedicalRecordUploadPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Workflow Step Management (upload -> processing -> review -> success)
  const [currentStep, setCurrentStep] = useState<OcrWorkflowStep>(() => {
    if (location.pathname.includes('/review') || location.pathname.includes('/verify')) {
      return 'review';
    }
    if (location.pathname.includes('/processing')) {
      return 'processing';
    }
    if (location.pathname.includes('/success')) {
      return 'success';
    }
    return 'upload';
  });

  // Source Document Determination (determines the immutable physical provenance of the document)
  const docKeyParam = searchParams.get('doc') || 'jane_doe';
  const initialSourceDoc = DEMO_SOURCE_DOCUMENTS[docKeyParam] || DEMO_SOURCE_DOCUMENTS.jane_doe;

  const [sourceDoc, setSourceDoc] = useState<SourceDocumentIdentity>(initialSourceDoc);

  // Target Active Patient (EHR Context)
  const [patient, setPatient] = useState(DEFAULT_PATIENT_OCR);
  const [selectedFormat, setSelectedFormat] = useState<SupportedFileFormat>('PDF');
  const [uploadedFile, setUploadedFile] = useState<UploadedFileMeta | null>({
    name: initialSourceDoc.fileName,
    size: initialSourceDoc.fileSize,
    type: initialSourceDoc.fileType,
  });
  const [isDragging, setIsDragging] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [recentUploads, setRecentUploads] = useState<RecentUploadRecord[]>(INITIAL_RECENT_UPLOADS);

  // State 2: Processing Simulation
  const [processingStageIndex, setProcessingStageIndex] = useState(0);
  const [processingProgress, setProcessingProgress] = useState(15);

  // State 3: Review & Extracted Data
  const [extractedFields, setExtractedFields] = useState<ExtractedClinicalField[]>(() =>
    getExtractedFieldsForDocument(initialSourceDoc)
  );
  const [labValues, setLabValues] = useState<ClinicalLabRow[]>(INITIAL_LAB_VALUES);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [rotationDegrees, setRotationDegrees] = useState(0);
  const [showMismatchModal, setShowMismatchModal] = useState(false);
  const [mismatchError, setMismatchError] = useState<string | null>(null);

  // Normalization utility
  const normalizeId = (id: string) => id.replace(/[-_ ]/g, '').toUpperCase();

  // Demographic Field Values
  const extractedName = extractedFields.find((f) => f.id === 'patient_name')?.value || '';
  const extractedHvId = extractedFields.find((f) => f.id === 'hv_id')?.value || '';

  // Registered Patient Lookup for Source Document
  const matchingRegisteredPatient = findRegisteredPatient(sourceDoc.genuineHealthVaultId);

  // SCENARIO FLAGS:
  // 1. Unresolved Identity: Document does not match any registered clinic patient
  const isUnresolvedIdentity = Boolean(sourceDoc.unresolvedIdentity || !matchingRegisteredPatient);

  // 2. Source vs Target Match: Does physical source document match the active chart context?
  const isSourceTargetMatch =
    normalizeId(sourceDoc.genuineHealthVaultId) === normalizeId(patient.healthVaultId) &&
    sourceDoc.genuinePatientName.trim().toLowerCase() === patient.name.trim().toLowerCase();

  // 3. Genuine Different Patient Mismatch (e.g. Jane Doe vs Eleanor Vance)
  const isSourceDocumentMismatch = !isSourceTargetMatch && !isUnresolvedIdentity;

  // 4. Genuine OCR Extraction Error (source matches target patient, but fields still contain uncorrected OCR errors)
  const isOcrExtractionError = isSourceTargetMatch && (
    normalizeId(extractedHvId) !== normalizeId(patient.healthVaultId) ||
    extractedName.trim().toLowerCase() !== patient.name.trim().toLowerCase()
  );

  // 5. Manual Form Overrides Detection: Did user edit text inputs to differ from source document?
  const hasManualFormEdits =
    extractedName.trim().toLowerCase() !== sourceDoc.rawOcrName.trim().toLowerCase() ||
    normalizeId(extractedHvId) !== normalizeId(sourceDoc.rawOcrHvId);

  // 6. Overall Clinical Safety Mismatch Condition:
  // A source document for a different patient is ALWAYS a mismatch regardless of what text is typed!
  const isPatientMismatch = isUnresolvedIdentity || isSourceDocumentMismatch || isOcrExtractionError;

  // Document selection helper
  const handleSelectDocument = (docKey: string, customMeta?: UploadedFileMeta) => {
    const doc = DEMO_SOURCE_DOCUMENTS[docKey] || DEMO_SOURCE_DOCUMENTS.jane_doe;
    setSourceDoc(doc);
    setUploadedFile(
      customMeta || {
        name: doc.fileName,
        size: doc.fileSize,
        type: doc.fileType,
      }
    );
    setExtractedFields(getExtractedFieldsForDocument(doc));
    setMismatchError(null);
    setShowMismatchModal(false);
  };

  // Reconcile by Associating with Matching Registered Patient (Scenario C)
  const handleAssociateWithRegisteredPatient = () => {
    if (!matchingRegisteredPatient) return;
    setPatient({
      name: matchingRegisteredPatient.name,
      healthVaultId: matchingRegisteredPatient.healthVaultId,
      age: matchingRegisteredPatient.age,
      gender: matchingRegisteredPatient.gender,
      verified: matchingRegisteredPatient.verified,
      avatarUrl: matchingRegisteredPatient.avatarUrl || patientAvatarOcr,
    });
    setExtractedFields((prev) =>
      prev.map((f) => {
        if (f.id === 'patient_name') {
          return { ...f, value: matchingRegisteredPatient.name, status: 'verified', warningNote: undefined };
        }
        if (f.id === 'hv_id') {
          return { ...f, value: matchingRegisteredPatient.healthVaultId, status: 'verified', warningNote: undefined };
        }
        return f;
      })
    );
    setMismatchError(null);
    setShowMismatchModal(false);
  };

  // Handle Drag & Drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    setUploadError(null);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      processSelectedFile(files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError(null);
    const files = e.target.files;
    if (files && files.length > 0) {
      processSelectedFile(files[0]);
    }
  };

  const processSelectedFile = (file: File) => {
    const validExtensions = ['.pdf', '.png', '.jpg', '.jpeg', '.dicom', '.dcm'];
    const fileName = file.name.toLowerCase();
    const isValid = validExtensions.some((ext) => fileName.endsWith(ext));

    if (!isValid) {
      setUploadError('Unsupported document format. Please upload a PDF, PNG, JPG/JPEG, or DICOM file.');
      return;
    }

    if (file.size > 25 * 1024 * 1024) {
      setUploadError('File size exceeds the 25 MB clinical threshold.');
      return;
    }

    const fileSizeFormatted = file.size > 1024 * 1024
      ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
      : `${Math.round(file.size / 1024)} KB`;

    let docKey = 'jane_doe';
    if (fileName.includes('eleanor') || fileName.includes('vance')) {
      docKey = 'eleanor_ocr_error';
    } else if (fileName.includes('unregistered') || fileName.includes('unidentified') || fileName.includes('unknown')) {
      docKey = 'unresolved';
    }

    handleSelectDocument(docKey, {
      name: file.name,
      size: fileSizeFormatted,
      type: file.type || 'application/octet-stream',
    });
  };

  // Start Processing Action
  const handleStartProcessing = () => {
    setCurrentStep('processing');
    setProcessingProgress(15);
    setProcessingStageIndex(0);
  };

  // Processing Step Simulation Timer
  useEffect(() => {
    if (currentStep !== 'processing') return;

    const interval = setInterval(() => {
      setProcessingProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          setTimeout(() => {
            setCurrentStep('review');
          }, 400);
          return 100;
        }
        const next = prev + 15;
        if (next > 70 && processingStageIndex < 3) {
          setProcessingStageIndex(3);
        } else if (next > 45 && processingStageIndex < 2) {
          setProcessingStageIndex(2);
        } else if (next > 25 && processingStageIndex < 1) {
          setProcessingStageIndex(1);
        }
        return next;
      });
    }, 400);

    return () => clearInterval(interval);
  }, [currentStep, processingStageIndex]);

  // Field Correction Handlers
  const handleFieldChange = (id: string, newValue: string) => {
    setMismatchError(null);
    setExtractedFields((prev) =>
      prev.map((f) => {
        if (f.id === id) {
          const isCorrected =
            id === 'hv_id' && (
              normalizeId(newValue) === normalizeId(sourceDoc.genuineHealthVaultId) ||
              normalizeId(newValue) === normalizeId(patient.healthVaultId)
            );
          return {
            ...f,
            value: newValue,
            status: isCorrected ? 'verified' : f.status,
            warningNote: isCorrected ? undefined : f.warningNote,
          };
        }
        return f;
      })
    );
  };

  const handleLabValueChange = (id: string, field: 'testName' | 'value' | 'unit', val: string) => {
    setLabValues((prev) =>
      prev.map((row) => (row.id === id ? { ...row, [field]: val } : row))
    );
  };

  const handleAddLabRow = () => {
    const newRow: ClinicalLabRow = {
      id: `lab_${Date.now()}`,
      testName: 'New Test Parameter',
      value: '0.0',
      unit: 'mg/dL',
      status: 'normal',
    };
    setLabValues((prev) => [...prev, newRow]);
  };

  const handleDeleteLabRow = (id: string) => {
    setLabValues((prev) => prev.filter((r) => r.id !== id));
  };

  // Save to Record Action with Triple Independent EHR Gate Enforcers
  const handleSaveToRecord = () => {
    // GATE 1: Refuse Unresolved / Unregistered Patient Identities
    if (sourceDoc.unresolvedIdentity || !matchingRegisteredPatient) {
      setShowMismatchModal(true);
      setMismatchError(
        `Unresolved Patient Identity: Document identifies an unrecognized patient (${sourceDoc.genuineHealthVaultId}) not found in clinic directory. Chart association is refused under clinical governance policy.`
      );
      return false;
    }

    // GATE 2: Refuse Cross-Patient Source Document Mismatches
    // Editing demographic form fields does NOT establish document provenance!
    const isSourceMatch =
      normalizeId(sourceDoc.genuineHealthVaultId) === normalizeId(patient.healthVaultId) &&
      sourceDoc.genuinePatientName.trim().toLowerCase() === patient.name.trim().toLowerCase();

    if (!isSourceMatch) {
      setShowMismatchModal(true);
      setMismatchError(
        `Critical Patient Safety Interlock: Source document genuinely identifies "${sourceDoc.genuinePatientName}" (${sourceDoc.genuineHealthVaultId}), which does not match active chart "${patient.name}" (${patient.healthVaultId}). Editing demographic form fields cannot reassign a mismatched source document. Cross-patient chart commitment is strictly prohibited.`
      );
      return false;
    }

    // GATE 3: Require Field Correction for OCR Character Misreads
    const isFormMatch =
      normalizeId(extractedHvId) === normalizeId(patient.healthVaultId) &&
      extractedName.trim().toLowerCase() === patient.name.trim().toLowerCase();

    if (!isFormMatch) {
      setShowMismatchModal(true);
      setMismatchError(
        `OCR Review Required: Extracted demographic fields ("${extractedName}", "${extractedHvId}") contain uncorrected OCR errors. Please correct the fields using source document evidence before saving.`
      );
      return false;
    }

    // All 3 independent gates satisfied: Commit record
    const newRecord: RecentUploadRecord = {
      id: `DOC-${Math.floor(1000 + Math.random() * 9000)}`,
      documentName: uploadedFile?.name || sourceDoc.fileName,
      type: 'Laboratory',
      date: new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }),
      status: 'Verified',
      statusColor: 'bg-[rgba(0,105,107,0.15)] text-[#00696b]',
      action: 'View',
    };
    setRecentUploads((prev) => [newRecord, ...prev]);
    setCurrentStep('success');
    return true;
  };

  // Status Counts
  const verifiedCount = extractedFields.filter((f) => f.status === 'verified').length + labValues.length;
  const needsReviewCount = extractedFields.filter((f) => f.status === 'needs-review').length;

  return (
    <div className="w-full flex flex-col min-h-screen bg-[#f8f9fa] text-[#191c1d]">
      {/* ========================================================================= */}
      {/* STATE 1: UPLOAD MEDICAL RECORD - INITIAL STATE (Figma node 1:1167)        */}
      {/* ========================================================================= */}
      {currentStep === 'upload' && (
        <div className="max-w-[1440px] mx-auto w-full p-6 space-y-6" data-node-id="1:1167">
          {/* Breadcrumbs Sequence */}
          <nav aria-label="Breadcrumbs" className="flex items-center gap-2 text-sm text-[#494552]">
            <button
              type="button"
              onClick={() => navigate('/patients')}
              className="hover:text-[#191c1d] transition-colors"
            >
              Patients
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <button
              type="button"
              onClick={() => navigate('/patients/HV-884-291')}
              className="hover:text-[#191c1d] transition-colors"
            >
              Patient Profile
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <button
              type="button"
              onClick={() => navigate('/records')}
              className="hover:text-[#191c1d] transition-colors"
            >
              Medical Records
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-semibold text-[#191c1d]">Upload Record</span>
          </nav>

          {/* Page Header */}
          <div className="space-y-1">
            <h1 className="text-[32px] font-semibold text-[#191c1d] leading-tight">
              Upload Health Record
            </h1>
            <p className="text-sm text-[#494552]">
              Securely digitize and store patient documents for immediate clinical review.
            </p>
          </div>

          {/* Patient Summary Bar (Figma node 1:1192) */}
          <div className="bg-white border border-[#e7e8e9] rounded-[12px] p-5 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] relative overflow-hidden flex items-center justify-between">
            {/* Left Accent Bar */}
            <div className="absolute left-0 top-0 bottom-0 w-2 bg-[#28006d]" />

            <div className="flex items-center gap-6 pl-2">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#e1e3e4] shrink-0 shadow-xs">
                <img
                  src={patientAvatarOcr}
                  alt={patient.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <h2 className="text-[20px] font-semibold text-[#191c1d]">
                    {patient.name}
                  </h2>
                  <span className="bg-[#76f1ff] text-[#006d76] px-2 py-0.5 rounded-full text-xs font-medium tracking-wide flex items-center gap-1">
                    <Check className="w-3 h-3 stroke-[3]" />
                    <span>Verified</span>
                  </span>
                </div>

                <div className="flex items-center gap-4 text-sm text-[#494552]">
                  <span className="font-medium text-[#191c1d]">{patient.healthVaultId}</span>
                  <span>•</span>
                  <span>{patient.age}</span>
                  <span>•</span>
                  <span>{patient.gender}</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate('/records')}
              className="text-xs font-semibold text-[#5b14b8] hover:underline cursor-pointer"
            >
              View Full Medical Records
            </button>
          </div>

          {/* Bento Grid for Upload (Figma node 1:1217) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* 1. Scan with Camera Card */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="bg-white border border-[#e7e8e9] rounded-[12px] p-6 flex flex-col items-center justify-center text-center shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] hover:border-[#5b14b8] hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="w-16 h-16 rounded-full bg-[#edeeef] group-hover:bg-[#f3edff] flex items-center justify-center mb-4 transition-colors">
                <Camera className="w-7 h-7 text-[#28006d]" />
              </div>
              <h3 className="text-base font-semibold text-[#191c1d] mb-2">
                Scan with Camera
              </h3>
              <p className="text-sm text-[#494552] max-w-[240px]">
                Capture physical documents instantly using your device.
              </p>
            </div>

            {/* 2. Upload from Computer Dropzone (Figma node 1:1229) */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={cn(
                'bg-white border-2 border-dashed rounded-[12px] p-6 flex flex-col items-center justify-center text-center transition-all cursor-pointer shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]',
                isDragging
                  ? 'border-[#5b14b8] bg-[#f8f5ff] scale-[1.01]'
                  : 'border-[#cbc4d4] hover:border-[#5b14b8]'
              )}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.png,.jpg,.jpeg,.dicom,.dcm"
                onChange={handleFileInputChange}
                className="hidden"
              />
              <div className="w-16 h-16 rounded-full bg-[#edeeef] flex items-center justify-center mb-4">
                <Upload className="w-7 h-7 text-[#28006d]" />
              </div>
              <h3 className="text-base font-semibold text-[#191c1d] mb-1">
                Upload from Computer
              </h3>
              <p className="text-sm text-[#494552] mb-4">
                Drag &amp; drop files here or click to browse.
              </p>
              <span className="bg-[#e7e8e9] hover:bg-slate-300 text-[#191c1d] text-sm font-medium px-4 py-2 rounded-full transition-colors">
                Select Files
              </span>
            </div>

            {/* 3. Import PDF Card (Figma node 1:1242) */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="bg-white border border-[#e7e8e9] rounded-[12px] p-6 flex flex-col items-center justify-center text-center shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] hover:border-[#5b14b8] hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="w-16 h-16 rounded-full bg-[#edeeef] group-hover:bg-[#f3edff] flex items-center justify-center mb-4 transition-colors">
                <FileText className="w-7 h-7 text-[#006971]" />
              </div>
              <h3 className="text-base font-semibold text-[#191c1d] mb-2">
                Import PDF
              </h3>
              <p className="text-sm text-[#494552] max-w-[240px]">
                Extract data from large multi-page PDFs.
              </p>
            </div>
          </div>

          {/* Validation Error Banner */}
          {uploadError && (
            <div className="bg-red-50 border border-red-200 p-3 rounded-lg flex items-center gap-2 text-sm text-red-700 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{uploadError}</span>
            </div>
          )}

          {/* Selected File Preview Strip */}
          {uploadedFile && (
            <div className="bg-white border border-[#cbc4d4] rounded-lg p-3.5 flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-purple-50 text-[#5b14b8] flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-sm font-semibold text-[#191c1d]">
                    {uploadedFile.name}
                  </span>
                  <div className="flex items-center gap-2 text-xs text-[#494552]">
                    <span>{uploadedFile.size}</span>
                    <span>•</span>
                    <span className="text-[#00696b] font-medium flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      Ready for OCR Extraction
                    </span>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setUploadedFile(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
                aria-label="Remove selected file"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Supported Formats & Action Row (Figma node 1:1253) */}
          <div className="bg-[#f3f4f5] p-4 rounded-[12px] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-sm font-semibold text-[#191c1d]">
                Supported Formats:
              </span>
              {(['PDF', 'PNG', 'JPG / JPEG', 'DICOM'] as SupportedFileFormat[]).map((fmt) => (
                <button
                  key={fmt}
                  type="button"
                  onClick={() => setSelectedFormat(fmt)}
                  className={cn(
                    'px-2.5 py-1 rounded text-xs transition-colors',
                    selectedFormat === fmt
                      ? 'bg-[#e7e8e9] border border-[rgba(40,0,109,0.3)] text-[#28006d] font-semibold'
                      : 'bg-[#e7e8e9] text-[#494552]'
                  )}
                >
                  {fmt}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={handleStartProcessing}
              disabled={!uploadedFile}
              className={cn(
                'h-[46px] px-6 rounded-full font-bold text-sm text-white flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer',
                uploadedFile
                  ? 'bg-gradient-to-b from-[#a44cff] to-[#5b14b8] hover:opacity-95'
                  : 'bg-slate-300 cursor-not-allowed opacity-60'
              )}
            >
              <Scan className="w-4 h-4" />
              <span>Start OCR Processing</span>
            </button>
          </div>

          {/* Recent Uploads Table (Figma node 1:1270) */}
          <div className="bg-white border border-[#e7e8e9] rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] overflow-hidden">
            <div className="bg-[#f3f4f5] border-b border-[#e7e8e9] px-4 py-3.5 flex items-center justify-between">
              <h3 className="text-base font-semibold text-[#191c1d]">
                Recent Uploads
              </h3>
              <span className="text-xs text-[#494552]">
                Target Chart: <strong>{patient.name}</strong> ({patient.healthVaultId})
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-[#e7e8e9] text-[#494552] text-xs font-medium">
                    <th className="px-4 py-3">Document Name</th>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e7e8e9]">
                  {recentUploads.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="px-4 py-3 font-medium text-[#191c1d] flex items-center gap-2.5">
                        <FileText className="w-4 h-4 text-[#28006d] shrink-0" />
                        <span>{row.documentName}</span>
                      </td>
                      <td className="px-4 py-3 text-[#494552]">{row.type}</td>
                      <td className="px-4 py-3 text-[#494552]">{row.date}</td>
                      <td className="px-4 py-3">
                        <span className={cn('px-2.5 py-0.5 rounded-full text-xs font-semibold', row.statusColor)}>
                          {row.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          type="button"
                          onClick={() => {
                            if (row.documentName.includes('Blood Work') || row.documentName.includes('Eleanor')) {
                              handleSelectDocument('eleanor_ocr_error');
                            } else if (row.documentName.includes('Discharge Summary')) {
                              handleSelectDocument('eleanor_verified');
                            } else {
                              handleSelectDocument('jane_doe');
                            }
                            if (row.status === 'Needs Review') {
                              setCurrentStep('review');
                            } else {
                              navigate('/records');
                            }
                          }}
                          className="text-xs font-semibold text-[#5b14b8] hover:underline cursor-pointer"
                        >
                          {row.action}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Test & Clinical Demonstration Sample Document Selector */}
            <div data-testid="ocr-sample-document-selector" className="bg-[#f8f9fa] border-t border-[#e7e8e9] p-3 flex flex-wrap items-center gap-2 text-xs">
              <span className="font-semibold text-slate-700">Demonstration Provenance Test Sets:</span>
              <button
                type="button"
                data-testid="select-doc-jane-doe"
                onClick={() => handleSelectDocument('jane_doe')}
                className={cn(
                  'px-3 py-1 rounded-full border transition-all cursor-pointer font-medium',
                  sourceDoc.id === 'jane_doe'
                    ? 'bg-[#28006d] text-white border-[#28006d] shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                )}
              >
                Jane Doe (HV-992-081 Mismatch)
              </button>
              <button
                type="button"
                data-testid="select-doc-eleanor-error"
                onClick={() => handleSelectDocument('eleanor_ocr_error')}
                className={cn(
                  'px-3 py-1 rounded-full border transition-all cursor-pointer font-medium',
                  sourceDoc.id === 'eleanor_ocr_error'
                    ? 'bg-[#28006d] text-white border-[#28006d] shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                )}
              >
                Eleanor Vance (HV-884-29I OCR Error)
              </button>
              <button
                type="button"
                data-testid="select-doc-eleanor-verified"
                onClick={() => handleSelectDocument('eleanor_verified')}
                className={cn(
                  'px-3 py-1 rounded-full border transition-all cursor-pointer font-medium',
                  sourceDoc.id === 'eleanor_verified'
                    ? 'bg-[#28006d] text-white border-[#28006d] shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                )}
              >
                Eleanor Vance (HV-884-291 Verified)
              </button>
              <button
                type="button"
                data-testid="select-doc-unresolved"
                onClick={() => handleSelectDocument('unresolved')}
                className={cn(
                  'px-3 py-1 rounded-full border transition-all cursor-pointer font-medium',
                  sourceDoc.id === 'unresolved'
                    ? 'bg-[#ba1a1a] text-white border-[#ba1a1a] shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                )}
              >
                Unregistered Record (HV-000-000 Unresolved)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STATE 2: OCR PROCESSING - DATA EXTRACTION (Figma node 1:1088)              */}
      {/* ========================================================================= */}
      {currentStep === 'processing' && (
        <div
          className="min-h-screen w-full flex items-center justify-center p-6 relative overflow-hidden bg-[#f8f9fa]"
          data-node-id="1:1088"
        >
          {/* Blurred Background Texture */}
          <div
            className="absolute inset-0 opacity-15 bg-cover bg-center pointer-events-none filter blur-sm"
            style={{ backgroundImage: `url(${scannedLabReport})` }}
          />

          {/* Central Processing Modal Card (Figma node 1:1134) */}
          <div className="backdrop-blur-[6px] bg-[rgba(248,249,250,0.92)] border border-[#e1e3e4] rounded-[16px] max-w-[448px] w-full p-8 shadow-2xl flex flex-col items-center text-center relative z-10 animate-in fade-in zoom-in-95">
            {/* Circular Progress Indicator with Pulse Rings (Figma node 1:1145) */}
            <div className="relative size-[192px] flex items-center justify-center mb-6">
              {/* Outer Pulse Ring */}
              <div className="absolute inset-0 rounded-full border-4 border-[rgba(0,105,113,0.2)] animate-ping opacity-30" />
              {/* Inner Static Ring */}
              <div className="absolute inset-4 rounded-full border-4 border-[rgba(0,105,113,0.3)]" />

              {/* Rotating Orbit Spinner */}
              <div className="absolute inset-2 rounded-full border-4 border-transparent border-t-[#006971] border-r-[#5b14b8] animate-spin" />

              {/* Center Document Icon Badge */}
              <div className="size-20 rounded-full bg-[#f8f9fa] shadow-md flex items-center justify-center z-10">
                <Scan className="w-8 h-8 text-[#006971] animate-pulse" />
              </div>
            </div>

            {/* Status Headings (Figma node 1:1136) */}
            <div className="space-y-2 mb-6">
              <h2 className="text-[24px] font-semibold text-[#191c1d] leading-tight">
                OCR Processing...
              </h2>
              <p className="text-base text-[#494552] font-medium transition-all">
                {OCR_PROCESSING_STAGES[processingStageIndex]}
              </p>
            </div>

            {/* Simulated Progress Meter */}
            <div className="w-full bg-[#e1e3e4] rounded-full h-2 mb-6 overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#006971] to-[#5b14b8] h-full transition-all duration-300 ease-out"
                style={{ width: `${processingProgress}%` }}
              />
            </div>

            {/* Educational Transparency Note */}
            <p className="text-[11px] text-[#7a7583] mb-6 leading-relaxed">
              CareID OCR neural parser is extracting diagnostic telemetry and patient demographics.
            </p>

            {/* Cancel Action (Figma node 1:1142) */}
            <button
              type="button"
              onClick={() => setCurrentStep('upload')}
              className="w-full py-2.5 border border-[#7a7583] rounded-lg text-sm font-medium text-[#494552] hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STATE 3: OCR REVIEW & FIELD VERIFICATION (Figma node 1:1325)               */}
      {/* ========================================================================= */}
      {currentStep === 'review' && (
        <div className="w-full flex flex-col min-h-screen bg-[#f8f9fa]" data-node-id="1:1325">
          {/* Top Review Bar (Figma node 1:1326) */}
          <header className="h-16 bg-[#f8f9fa] border-b border-slate-200 px-6 flex items-center justify-between shrink-0 sticky top-0 z-20">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setCurrentStep('upload')}
                className="p-2 rounded-full hover:bg-slate-200/60 transition-colors cursor-pointer"
                aria-label="Back to Upload"
              >
                <ArrowLeft className="w-5 h-5 text-[#494552]" />
              </button>

              <div className="flex items-center gap-3">
                <h1 className="text-[20px] font-bold text-[#28006d]">
                  OCR Review
                </h1>
                <span className="bg-[#e7e8e9] text-[#191c1d] text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-[#494552]" />
                  <span>{uploadedFile?.name || 'Lab_Results_041123.pdf'}</span>
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => navigate('/records')}
                className="text-xs font-semibold text-[#494552] hover:text-[#191c1d] transition-colors"
              >
                Exit Review
              </button>
            </div>
          </header>

          {/* Main 60% / 40% Split Content (Figma node 1:1341) */}
          <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
            {/* ------------------------------------------------------------- */}
            {/* LEFT PANEL: Document Viewer (60%, w: 768px in Figma)          */}
            {/* ------------------------------------------------------------- */}
            <div className="w-full lg:w-[60%] border-r border-[#cbc4d4] bg-[#e0e0e0] flex flex-col min-h-[600px] relative">
              {/* Viewer Toolbar (Figma node 1:1343) */}
              <div className="h-12 bg-[#f3f4f5] border-b border-[#cbc4d4] px-4 flex items-center justify-between shrink-0">
                <span className="text-sm font-semibold text-[#494552]">
                  Page 1 of 2
                </span>

                {/* Zoom Controls Pill */}
                <div className="bg-[#f8f9fa] border border-slate-200 rounded-full px-2 py-0.5 flex items-center gap-1 shadow-xs">
                  <button
                    type="button"
                    onClick={() => setZoomLevel((z) => Math.max(50, z - 15))}
                    className="p-1 hover:bg-slate-200 rounded-full transition-colors"
                    aria-label="Zoom out"
                  >
                    <ZoomOut className="w-3.5 h-3.5 text-[#494552]" />
                  </button>
                  <span className="text-xs font-medium text-[#191c1d] px-2 min-w-[45px] text-center">
                    {zoomLevel}%
                  </span>
                  <button
                    type="button"
                    onClick={() => setZoomLevel((z) => Math.min(200, z + 15))}
                    className="p-1 hover:bg-slate-200 rounded-full transition-colors"
                    aria-label="Zoom in"
                  >
                    <ZoomIn className="w-3.5 h-3.5 text-[#494552]" />
                  </button>
                  <span className="h-4 w-px bg-slate-300 mx-1" />
                  <button
                    type="button"
                    onClick={() => setRotationDegrees((r) => (r + 90) % 360)}
                    className="p-1 hover:bg-slate-200 rounded-full transition-colors"
                    aria-label="Rotate document"
                  >
                    <RotateCw className="w-3.5 h-3.5 text-[#494552]" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setZoomLevel(100);
                      setRotationDegrees(0);
                    }}
                    className="p-1 hover:bg-slate-200 rounded-full transition-colors"
                    aria-label="Reset view"
                  >
                    <Maximize2 className="w-3.5 h-3.5 text-[#494552]" />
                  </button>
                </div>
              </div>

              {/* Document Canvas Area with Extraction Zone Bounding Boxes */}
              <div className="flex-1 p-6 overflow-auto flex items-start justify-center">
                <div
                  className="bg-white rounded-lg shadow-md p-6 max-w-[680px] w-full relative transition-transform duration-200"
                  style={{
                    transform: `scale(${zoomLevel / 100}) rotate(${rotationDegrees}deg)`,
                    transformOrigin: 'top center',
                  }}
                >
                  {/* Overlay Highlights (Figma node 1:1365 & 1:1366) */}
                  <div className="absolute top-12 left-8 border border-[rgba(40,0,109,0.4)] bg-[rgba(40,0,109,0.1)] rounded px-2 py-0.5 text-[10px] text-[#28006d] font-mono pointer-events-none">
                    OCR Zone: Demographics
                  </div>

                  <div className="absolute top-28 left-8 border-2 border-[#ba1a1a] bg-[rgba(186,26,26,0.12)] rounded px-2 py-0.5 text-[10px] text-[#ba1a1a] font-mono font-bold pointer-events-none animate-pulse">
                    Mismatch: HV ID Scan Mismatch
                  </div>

                  {/* Scanned Report Asset Image */}
                  <img
                    src={scannedLabReport}
                    alt="Scanned Laboratory Diagnostic Report"
                    className="w-full object-contain select-none"
                  />
                </div>
              </div>
            </div>

            {/* ------------------------------------------------------------- */}
            {/* RIGHT PANEL: Extracted Fields (40%, w: 512px in Figma)        */}
            {/* ------------------------------------------------------------- */}
            <div className="w-full lg:w-[40%] bg-white flex flex-col justify-between overflow-y-auto">
              {/* Panel Header (Figma node 1:1369) */}
              <div>
                <div className="h-16 border-b border-[#cbc4d4] px-6 flex items-center justify-between shrink-0">
                  <h2 className="text-[16px] font-semibold text-[#191c1d]">
                    Extracted Data
                  </h2>

                  {/* Status Indicator Badges */}
                  <div className="flex items-center gap-2">
                    <span className="bg-[#e1e3e4] text-[#191c1d] rounded-full px-2.5 py-1 text-xs font-medium flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#006971]" />
                      <span>{verifiedCount} Verified</span>
                    </span>

                    <span
                      className={cn(
                        'rounded-full px-2.5 py-1 text-xs font-medium flex items-center gap-1.5',
                        needsReviewCount > 0
                          ? 'bg-[#ffdad6] text-[#93000a]'
                          : 'bg-emerald-50 text-emerald-800'
                      )}
                    >
                      <span
                        className={cn(
                          'w-2 h-2 rounded-full',
                          needsReviewCount > 0 ? 'bg-[#ba1a1a]' : 'bg-emerald-600'
                        )}
                      />
                      <span>
                        {needsReviewCount > 0
                          ? `${needsReviewCount} Needs Review`
                          : 'All Verified'}
                      </span>
                    </span>
                  </div>
                </div>

                {/* Form Content Area */}
                <div className="p-6 space-y-6">
                  {/* CRITICAL SAFETY ALERT: PATIENT IDENTITY MISMATCH */}
                  {isPatientMismatch && (
                    <div
                      data-testid="ocr-mismatch-banner"
                      className="bg-rose-50 border-2 border-rose-300 rounded-xl p-4 space-y-3 text-rose-950 shadow-xs animate-in fade-in"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 font-bold text-rose-700 text-sm">
                          <AlertTriangle className="size-5 text-rose-600 shrink-0" />
                          <span>
                            {isUnresolvedIdentity
                              ? 'CRITICAL SAFETY ALERT: UNRESOLVED PATIENT IDENTITY'
                              : isOcrExtractionError
                              ? 'OCR EXTRACTION WARNING: IDENTIFIER CHARACTER SCAN ERROR'
                              : hasManualFormEdits
                              ? 'CRITICAL SAFETY ALERT: MANUAL FORM OVERRIDE REJECTED'
                              : 'CRITICAL SAFETY ALERT: PATIENT IDENTITY MISMATCH DETECTED'}
                          </span>
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-rose-200 text-rose-900 shrink-0">
                          EHR Interlock Active
                        </span>
                      </div>

                      <p className="text-xs text-rose-800 leading-relaxed">
                        {isUnresolvedIdentity ? (
                          <>
                            The scanned document identifies an unrecognized or unregistered patient (<strong>{sourceDoc.rawOcrName}</strong>, <code>{sourceDoc.rawOcrHvId}</code>) not found in the clinic directory. Association with any patient chart is refused under EHR safety governance.
                          </>
                        ) : isOcrExtractionError ? (
                          <>
                            Source document evidence belongs to active patient <strong>{patient.name}</strong>, but optical character recognition flagged a scan error (<code>{extractedHvId}</code>). Please review source evidence and correct the identifier field.
                          </>
                        ) : hasManualFormEdits ? (
                          <>
                            Demographic form fields were edited to match <strong>{extractedName}</strong> (<code>{extractedHvId}</code>), but physical document evidence genuinely belongs to <strong>{sourceDoc.genuinePatientName}</strong> (<code>{sourceDoc.genuineHealthVaultId}</code>). Editing text fields does not establish patient provenance. Saving to {patient.name}&apos;s chart remains strictly blocked.
                          </>
                        ) : (
                          <>
                            The scanned document genuinely identifies <strong>{sourceDoc.genuinePatientName}</strong> (<code>{sourceDoc.genuineHealthVaultId}</code>), which does not correspond to the currently open chart (<strong>{patient.name}</strong>, <code>{patient.healthVaultId}</code>). Attaching this record will be blocked by the clinical safety interlock.
                          </>
                        )}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
                        <div className="bg-white/80 border border-rose-200 rounded-lg p-2.5">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Active Target Chart</span>
                          <span className="font-bold text-slate-900 block">{patient.name}</span>
                          <span className="font-mono text-slate-600 text-[11px]">ID: {patient.healthVaultId}</span>
                        </div>
                        <div className="bg-white/80 border border-rose-300 rounded-lg p-2.5">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 block">Verified Source Document Provenance</span>
                          <span className="font-bold text-rose-950 block">{sourceDoc.genuinePatientName}</span>
                          <span className="font-mono text-rose-700 text-[11px]">ID: {sourceDoc.genuineHealthVaultId}</span>
                        </div>
                      </div>

                      {/* Quick Action Palliative Pointers */}
                      <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-rose-200">
                        {matchingRegisteredPatient && matchingRegisteredPatient.healthVaultId !== patient.healthVaultId && (
                          <button
                            type="button"
                            data-testid="banner-reassign-patient"
                            onClick={handleAssociateWithRegisteredPatient}
                            className="px-3 py-1.5 rounded-lg bg-[#28006d] hover:bg-[#5b14b8] text-white text-xs font-semibold transition-colors cursor-pointer shadow-xs flex items-center gap-1.5"
                          >
                            <FileCheck2 className="w-3.5 h-3.5" />
                            <span>Associate Document with {matchingRegisteredPatient.name} ({matchingRegisteredPatient.healthVaultId})</span>
                          </button>
                        )}

                        <button
                          type="button"
                          data-testid="banner-exit-directory"
                          onClick={() => navigate('/patients')}
                          className="px-3 py-1.5 rounded-lg border border-rose-300 bg-white hover:bg-rose-100 text-rose-900 text-xs font-medium transition-colors cursor-pointer"
                        >
                          Exit to Patient Directory
                        </button>

                        <button
                          type="button"
                          data-testid="banner-view-modal"
                          onClick={() => setShowMismatchModal(true)}
                          className="px-3 py-1.5 rounded-lg border border-rose-300 bg-white hover:bg-rose-100 text-rose-900 text-xs font-medium transition-colors cursor-pointer"
                        >
                          View Reconciliation Details
                        </button>
                      </div>
                    </div>
                  )}

                  {/* SECTION 1: PATIENT DEMOGRAPHICS (Figma node 1:1381) */}
                  <div className="space-y-3">
                    <div className="border-b border-[#cbc4d4] pb-2">
                      <h3 className="text-[13px] font-semibold text-[#494552] uppercase tracking-wider">
                        PATIENT DEMOGRAPHICS
                      </h3>
                    </div>

                    <div className="grid grid-cols-2 gap-3.5">
                      {/* Patient Name */}
                      <div className="space-y-1">
                        <label className="text-xs font-medium text-[#494552] flex items-center gap-1">
                          <span>Patient Name</span>
                          <Check className="w-3 h-3 text-[#006971]" />
                        </label>
                        <input
                          type="text"
                          value={extractedFields.find((f) => f.id === 'patient_name')?.value || ''}
                          onChange={(e) => handleFieldChange('patient_name', e.target.value)}
                          className="w-full h-10 px-3 bg-white border border-[#cbc4d4] rounded-md text-sm text-[#191c1d] focus:outline-none focus:ring-2 focus:ring-[#5b14b8]"
                        />
                      </div>

                      {/* HV ID (Needs Review) */}
                      <div className="space-y-1 relative">
                        <label className="text-xs font-medium text-[#ba1a1a] flex items-center gap-1">
                          <span>HV ID</span>
                          <AlertTriangle className="w-3 h-3 text-[#ba1a1a]" />
                        </label>
                        <input
                          type="text"
                          value={extractedFields.find((f) => f.id === 'hv_id')?.value || ''}
                          onChange={(e) => handleFieldChange('hv_id', e.target.value)}
                          className={cn(
                            'w-full h-10 px-3 rounded-md text-sm font-mono focus:outline-none focus:ring-2',
                            extractedFields.find((f) => f.id === 'hv_id')?.status === 'needs-review'
                              ? 'border-2 border-[#ba1a1a] bg-[rgba(255,218,214,0.25)] text-[#191c1d] focus:ring-red-400'
                              : 'border border-[#cbc4d4] bg-white text-[#191c1d] focus:ring-[#5b14b8]'
                          )}
                        />
                        {extractedFields.find((f) => f.id === 'hv_id')?.warningNote && (
                          <p className="text-[10px] text-[#ba1a1a] font-medium pt-0.5">
                            {extractedFields.find((f) => f.id === 'hv_id')?.warningNote}
                          </p>
                        )}
                      </div>

                      {/* DOB */}
                      <div className="space-y-1">
                        <label className="text-xs font-medium text-[#494552] flex items-center gap-1">
                          <span>DOB</span>
                          <Check className="w-3 h-3 text-[#006971]" />
                        </label>
                        <input
                          type="text"
                          value={extractedFields.find((f) => f.id === 'dob')?.value || ''}
                          onChange={(e) => handleFieldChange('dob', e.target.value)}
                          className="w-full h-10 px-3 bg-white border border-[#cbc4d4] rounded-md text-sm text-[#191c1d] focus:outline-none focus:ring-2 focus:ring-[#5b14b8]"
                        />
                      </div>

                      {/* Gender */}
                      <div className="space-y-1">
                        <label className="text-xs font-medium text-[#494552] flex items-center gap-1">
                          <span>Gender</span>
                          <Check className="w-3 h-3 text-[#006971]" />
                        </label>
                        <select
                          value={extractedFields.find((f) => f.id === 'gender')?.value || 'Female'}
                          onChange={(e) => handleFieldChange('gender', e.target.value)}
                          className="w-full h-10 px-3 bg-white border border-[#cbc4d4] rounded-md text-sm text-[#191c1d] focus:outline-none focus:ring-2 focus:ring-[#5b14b8]"
                        >
                          <option value="Female">Female</option>
                          <option value="Male">Male</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* SECTION 2: REPORT DETAILS (Figma node 1:1430) */}
                  <div className="space-y-3">
                    <div className="border-b border-[#cbc4d4] pb-2">
                      <h3 className="text-[13px] font-semibold text-[#494552] uppercase tracking-wider">
                        REPORT DETAILS
                      </h3>
                    </div>

                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-3.5">
                        {/* Hospital / Facility */}
                        <div className="space-y-1">
                          <label className="text-xs font-medium text-[#b06000] flex items-center gap-1">
                            <span>Hospital / Facility</span>
                            <AlertCircle className="w-3 h-3 text-[#b06000]" />
                          </label>
                          <input
                            type="text"
                            value={extractedFields.find((f) => f.id === 'hospital_facility')?.value || ''}
                            onChange={(e) => handleFieldChange('hospital_facility', e.target.value)}
                            className="w-full h-10 px-3 bg-[#fff8f0] border border-[#b06000] rounded-md text-sm text-[#191c1d] focus:outline-none focus:ring-2 focus:ring-amber-400"
                          />
                        </div>

                        {/* Collection Date */}
                        <div className="space-y-1">
                          <label className="text-xs font-medium text-[#494552] flex items-center gap-1">
                            <span>Collection Date</span>
                            <Check className="w-3 h-3 text-[#006971]" />
                          </label>
                          <input
                            type="text"
                            value={extractedFields.find((f) => f.id === 'collection_date')?.value || ''}
                            onChange={(e) => handleFieldChange('collection_date', e.target.value)}
                            className="w-full h-10 px-3 bg-white border border-[#cbc4d4] rounded-md text-sm text-[#191c1d] focus:outline-none focus:ring-2 focus:ring-[#5b14b8]"
                          />
                        </div>
                      </div>

                      {/* Report Type */}
                      <div className="space-y-1">
                        <label className="text-xs font-medium text-[#494552] flex items-center gap-1">
                          <span>Report Type</span>
                          <Check className="w-3 h-3 text-[#006971]" />
                        </label>
                        <input
                          type="text"
                          value={extractedFields.find((f) => f.id === 'report_type')?.value || ''}
                          onChange={(e) => handleFieldChange('report_type', e.target.value)}
                          className="w-full h-10 px-3 bg-white border border-[#cbc4d4] rounded-md text-sm text-[#191c1d] focus:outline-none focus:ring-2 focus:ring-[#5b14b8]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* SECTION 3: CLINICAL VALUES (Figma node 1:1467) */}
                  <div className="space-y-3">
                    <div className="border-b border-[#cbc4d4] pb-2 flex items-center justify-between">
                      <h3 className="text-[13px] font-semibold text-[#494552] uppercase tracking-wider">
                        CLINICAL VALUES
                      </h3>
                      <button
                        type="button"
                        onClick={handleAddLabRow}
                        className="text-xs font-semibold text-[#28006d] hover:text-[#5b14b8] flex items-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Add Row</span>
                      </button>
                    </div>

                    <div className="border border-[#cbc4d4] rounded-lg overflow-hidden bg-white shadow-xs">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="bg-[#f3f4f5] border-b border-[#cbc4d4] text-[#494552] font-semibold">
                            <th className="px-3 py-2">Test Name</th>
                            <th className="px-3 py-2 w-24">Value</th>
                            <th className="px-3 py-2 w-24">Unit</th>
                            <th className="px-2 py-2 w-8 text-right"></th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {labValues.map((row) => (
                            <tr key={row.id} className="hover:bg-slate-50">
                              <td className="px-3 py-2">
                                <input
                                  type="text"
                                  value={row.testName}
                                  onChange={(e) => handleLabValueChange(row.id, 'testName', e.target.value)}
                                  className="w-full font-medium text-[#191c1d] bg-transparent focus:outline-none"
                                />
                              </td>
                              <td className="px-3 py-2">
                                <input
                                  type="text"
                                  value={row.value}
                                  onChange={(e) => handleLabValueChange(row.id, 'value', e.target.value)}
                                  className="w-full font-semibold text-[#191c1d] bg-transparent focus:outline-none"
                                />
                              </td>
                              <td className="px-3 py-2 text-[#494552]">
                                <input
                                  type="text"
                                  value={row.unit}
                                  onChange={(e) => handleLabValueChange(row.id, 'unit', e.target.value)}
                                  className="w-full text-[#494552] bg-transparent focus:outline-none"
                                />
                              </td>
                              <td className="px-2 py-2 text-right">
                                <button
                                  type="button"
                                  onClick={() => handleDeleteLabRow(row.id)}
                                  className="text-slate-300 hover:text-red-600 transition-colors"
                                  aria-label="Delete lab row"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Sticky Action Bar (Figma node 1:1505) */}
              <div className="h-20 bg-[#f8f9fa] border-t border-[#cbc4d4] px-6 flex items-center justify-between gap-3 shrink-0">
                <div className="flex items-center gap-2">
                  {mismatchError && (
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200 px-3 py-1.5 rounded-full">
                      <AlertTriangle className="size-3.5 text-rose-600 shrink-0" />
                      <span className="truncate max-w-sm sm:max-w-md">{mismatchError}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setCurrentStep('upload')}
                    className="px-6 py-2.5 rounded-full border border-[#7a7583] text-[#191c1d] hover:bg-slate-100 text-sm font-medium transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={handleSaveToRecord}
                    className="px-6 py-2.5 rounded-full bg-gradient-to-b from-[#a44cff] to-[#5b14b8] hover:opacity-95 text-white font-medium text-sm flex items-center gap-2 shadow-sm transition-all cursor-pointer"
                  >
                    <FileCheck2 className="w-4 h-4" />
                    <span>Save to Record</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STATE 4: UPLOAD SUCCESS - RECORD SAVED (Figma node 1:1513)                 */}
      {/* ========================================================================= */}
      {currentStep === 'success' && (
        <div
          className="min-h-screen w-full flex flex-col items-center justify-center p-6 bg-[#f8f9fa]"
          data-node-id="1:1513"
        >
          <div className="max-w-[600px] w-full flex flex-col items-center text-center space-y-6 animate-in fade-in zoom-in-95">
            {/* Success Glowing Double-Ring Illustration (Figma node 1:1529) */}
            <div className="w-32 h-32 rounded-full bg-[rgba(118,241,255,0.2)] flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-[#76f1ff] flex items-center justify-center shadow-sm">
                <Check className="w-10 h-10 text-[#006971] stroke-[3]" />
              </div>
            </div>

            {/* Heading 1 (Figma node 1:1515) */}
            <h1 className="text-[32px] font-semibold text-[#191c1d] leading-tight">
              Health Record Successfully Saved
            </h1>

            {/* Description (Figma node 1:1518) */}
            <p className="text-base text-[#494552] leading-relaxed max-w-[500px]">
              Document has been added to {patient.name}&apos;s medical history. It is now available for review in the patient directory.
            </p>

            {/* Record Summary Card */}
            <div className="bg-white border border-[#e7e8e9] rounded-[12px] p-4 text-left w-full shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-bold text-[#494552]">Ingested File</span>
                <span className="bg-[rgba(0,105,107,0.15)] text-[#00696b] text-[11px] font-semibold px-2 py-0.5 rounded-full">
                  100% Verified
                </span>
              </div>
              <div className="text-sm font-semibold text-[#191c1d]">
                {uploadedFile?.name || 'Lab_Results_041123.pdf'}
              </div>
              <div className="text-xs text-[#494552] flex items-center gap-2">
                <span>Patient: {patient.name} ({patient.healthVaultId})</span>
                <span>•</span>
                <span>Category: Complete Blood Count (CBC)</span>
              </div>
            </div>

            {/* Actions (Figma node 1:1520) */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2 w-full">
              {/* Return Button (Figma node 1:1521) */}
              <button
                type="button"
                onClick={() => navigate('/records')}
                className="w-full sm:w-auto px-6 py-2.5 rounded-full border border-[#7a7583] hover:bg-slate-100 text-[#191c1d] text-sm font-medium transition-colors cursor-pointer"
              >
                Return to Medical Records
              </button>

              {/* Upload Another Button (Figma node 1:1525) */}
              <button
                type="button"
                onClick={() => {
                  setCurrentStep('upload');
                  setUploadedFile(null);
                  setUploadError(null);
                }}
                className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-gradient-to-b from-[#a44cff] to-[#5b14b8] hover:opacity-95 text-white text-sm font-medium shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Upload Another Document</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PATIENT IDENTITY RECONCILIATION HARD STOP MODAL */}
      {showMismatchModal && (
        <div
          data-testid="ocr-mismatch-modal"
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
          role="dialog"
          aria-labelledby="mismatch-modal-title"
          aria-modal="true"
        >
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-5 border border-rose-200 animate-in zoom-in-95">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
                  <AlertTriangle className="size-5" />
                </div>
                <div>
                  <h3 id="mismatch-modal-title" className="text-base font-bold text-slate-900">
                    Patient Identity Reconciliation Hard Stop
                  </h3>
                  <p className="text-xs text-rose-700 font-semibold">
                    EHR Clinical Safety Interlock — Save Prevented
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowMismatchModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                aria-label="Close modal"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Comparison Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Target Active Patient Chart
                </span>
                <div className="font-bold text-slate-900 text-sm">{patient.name}</div>
                <div className="text-slate-600 font-mono text-xs">ID: {patient.healthVaultId}</div>
                <div className="text-slate-500 text-[11px]">{patient.age} • {patient.gender}</div>
                <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                  Verified Active Chart
                </span>
              </div>

              <div className="bg-rose-50 border border-rose-200 rounded-xl p-3.5 space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 block">
                  Verified Source Document Identity
                </span>
                <div className="font-bold text-rose-950 text-sm">{sourceDoc.genuinePatientName}</div>
                <div className="text-rose-700 font-mono text-xs">ID: {sourceDoc.genuineHealthVaultId}</div>
                <div className="text-rose-600 text-[11px]">Source File: {sourceDoc.fileName}</div>
                <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-rose-200 text-rose-900 text-[10px] font-bold">
                  {isUnresolvedIdentity ? 'Unregistered Identity' : 'Mismatch Blocked'}
                </span>
              </div>
            </div>

            {/* Manipulation Warning if form inputs were altered */}
            {hasManualFormEdits && isSourceDocumentMismatch && (
              <div className="bg-rose-100 border border-rose-300 rounded-xl p-3 text-xs text-rose-950 space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-rose-900">
                  <AlertCircle className="size-4 text-rose-700 shrink-0" />
                  <span>Demographic Form Manipulation Rejected</span>
                </div>
                <p>
                  Form inputs were manually altered to <strong>&quot;{extractedName}&quot;</strong> (<code>{extractedHvId}</code>). However, physical document evidence confirms this file genuinely belongs to <strong>&quot;{sourceDoc.genuinePatientName}&quot;</strong> (<code>{sourceDoc.genuineHealthVaultId}</code>). Editing text inputs alone cannot establish document provenance.
                </p>
              </div>
            )}

            {/* Rationale & Safety Policy */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 text-xs text-amber-900 leading-relaxed space-y-1">
              <div className="font-bold flex items-center gap-1.5 text-amber-950">
                <span>Clinical Governance &amp; Data Integrity Rules:</span>
              </div>
              <p>
                Attaching third-party medical documentation to {patient.name}&apos;s chart violates EHR data integrity standards. Cross-patient clinical record attachment risks fatal diagnostic errors and contraindicated treatment plans.
              </p>
              {isUnresolvedIdentity ? (
                <p className="text-[11px] text-amber-800 italic">
                  Unresolved Identity: No matching patient record found in clinic directory for &quot;{sourceDoc.genuinePatientName}&quot; ({sourceDoc.genuineHealthVaultId}). Chart association is refused under clinical governance.
                </p>
              ) : matchingRegisteredPatient && matchingRegisteredPatient.healthVaultId !== patient.healthVaultId ? (
                <p className="text-[11px] text-emerald-800 font-medium">
                  Verified Matching Patient Found: &quot;{matchingRegisteredPatient.name}&quot; ({matchingRegisteredPatient.healthVaultId}) is registered in the clinic directory. You may associate this document directly with their chart.
                </p>
              ) : null}
            </div>

            {/* Available Actions (Strictly Zero Casual Bypass Buttons) */}
            <div className="flex flex-col sm:flex-row items-center justify-end gap-2.5 pt-2 border-t border-slate-100">
              {matchingRegisteredPatient && matchingRegisteredPatient.healthVaultId !== patient.healthVaultId && (
                <button
                  type="button"
                  data-testid="modal-reassign-patient"
                  onClick={handleAssociateWithRegisteredPatient}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#28006d] hover:bg-[#5b14b8] text-white text-xs font-bold transition-colors shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <FileCheck2 className="w-3.5 h-3.5" />
                  <span>Associate with {matchingRegisteredPatient.name}</span>
                </button>
              )}

              <button
                type="button"
                data-testid="modal-exit-directory"
                onClick={() => {
                  setShowMismatchModal(false);
                  navigate('/patients');
                }}
                className="w-full sm:w-auto px-4 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Exit to Patient Directory
              </button>

              <button
                type="button"
                data-testid="modal-return-review"
                onClick={() => setShowMismatchModal(false)}
                className="w-full sm:w-auto px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors shadow-xs cursor-pointer"
              >
                Return to Review &amp; Correct OCR
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicalRecordUploadPage;
