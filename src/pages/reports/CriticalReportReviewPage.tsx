import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  ChevronsUp,
  ExternalLink,
  FilePlus2,
  FileText,
  FlaskConical,
  Phone,
  PhoneCall,
  PhoneOff,
  ShieldAlert,
  ShieldCheck,
  Stethoscope,
  X,
} from 'lucide-react';
import { DEFAULT_REPORTS_DATA, ReportRecord } from './types';
import patientAvatarMale from '@/assets/avatars/patient-avatar-male.png';

export const CriticalReportReviewPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Find report by id or default to PT-84920
  const report: ReportRecord | undefined =
    DEFAULT_REPORTS_DATA.find((r) => r.id === id || r.patientId === id) ||
    (id === 'default' || !id ? DEFAULT_REPORTS_DATA[0] : undefined);

  const [isAcknowledged, setIsAcknowledged] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Simulated Telehealth Consultation state
  const [showConsultModal, setShowConsultModal] = useState(false);
  const [simulatedCallStatus, setSimulatedCallStatus] = useState<
    'idle' | 'connecting' | 'connected' | 'ended'
  >('idle');
  const [callDuration, setCallDuration] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (simulatedCallStatus === 'connected') {
      timer = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [simulatedCallStatus]);

  const handleStartConsultation = () => {
    setShowConsultModal(true);
    setSimulatedCallStatus('connecting');
    setCallDuration(0);
    setTimeout(() => {
      setSimulatedCallStatus('connected');
    }, 1200);
  };

  const handleEndConsultation = () => {
    setSimulatedCallStatus('ended');
    setTimeout(() => {
      setShowConsultModal(false);
      triggerToast('Simulated consultation concluded and logged in encounter notes.');
    }, 600);
  };

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3500);
  };

  // If report not found, show appropriate state
  if (!report) {
    return (
      <div className="w-full max-w-xl mx-auto py-16 text-center space-y-4">
        <div className="size-16 rounded-full bg-slate-100 text-slate-500 mx-auto flex items-center justify-center">
          <FileText className="size-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">Diagnostic Report Not Found</h2>
        <p className="text-xs text-slate-500">
          The requested report reference <span className="font-mono font-semibold text-slate-700">{id}</span> could
          not be located in the clinical archival index.
        </p>
        <button
          type="button"
          onClick={() => navigate('/reports')}
          className="px-5 py-2.5 rounded-xl bg-[#20005a] text-white text-xs font-semibold hover:bg-[#320078] transition-colors"
        >
          Return to Reports Dashboard
        </button>
      </div>
    );
  }

  const handleAcknowledge = () => {
    setIsAcknowledged(true);
    triggerToast(
      `Critical alert acknowledged by Dr. Clinical. Simulated audit timestamp recorded at ${new Date().toLocaleTimeString()}.`
    );
  };

  return (
    <div className="w-full space-y-5 pb-20">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-20 right-6 z-50 bg-[#0b1c30] text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 border border-purple-500/30 text-xs animate-in fade-in slide-in-from-top-2">
          <ShieldCheck className="w-4 h-4 text-[#5af8fb] shrink-0" />
          <span className="font-medium">{toastMessage}</span>
          <button
            type="button"
            onClick={() => setShowToast(false)}
            className="text-slate-400 hover:text-white ml-2"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Navigation Breadcrumb Line */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate('/reports')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#5b14b8] transition-colors"
        >
          <ArrowLeft className="size-3.5" />
          <span>Back to Reports Dashboard</span>
        </button>

        {!isAcknowledged ? (
          <button
            type="button"
            onClick={handleAcknowledge}
            className="px-3.5 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-colors"
          >
            <ShieldAlert className="size-3.5" />
            <span>Acknowledge Panic Alert</span>
          </button>
        ) : (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-teal-50 border border-teal-200 text-teal-700 rounded-lg text-xs font-semibold">
            <CheckCircle2 className="size-3.5 text-teal-600" />
            <span>Alert Acknowledged by Dr. Clinical</span>
          </span>
        )}
      </div>

      {/* Top Critical Findings Alert Banner (Figma Node 1:3732) */}
      <div
        data-testid="critical-alert-banner"
        className="bg-[#feecee] border-l-4 border-l-[#d92d20] border-t border-r border-b border-[#fecdd3] rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-[0px_1px_2px_rgba(0,0,0,0.04)]"
      >
        <div className="flex items-start gap-3">
          <div className="size-7 rounded-full bg-red-100 flex items-center justify-center shrink-0 mt-0.5">
            <AlertTriangle className="size-4 text-red-600" />
          </div>
          <div className="space-y-0.5">
            <h2 className="text-sm font-bold text-red-950">
              Critical Findings Alert: Immediate Review Required
            </h2>
            <p className="text-xs text-red-800">
              Abnormal lab results detected in recent panel for Patient ID:{' '}
              <span className="font-mono font-bold text-red-950">{report.patientId}</span>.
            </p>
          </div>
        </div>

        <div className="text-xs font-medium text-red-700 shrink-0 sm:text-right pl-10 sm:pl-0">
          Received: {report.receivedAgo}
        </div>
      </div>

      {/* 2-Column Clinical Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Patient Summary (~35% / 4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div
            data-testid="patient-summary-card"
            className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-[0px_1px_2px_rgba(0,0,0,0.04)] space-y-5"
          >
            <h3 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100">
              Patient Summary
            </h3>

            {/* Patient Identity */}
            <div className="flex items-start gap-3.5">
              <img
                src={patientAvatarMale}
                alt={report.patientName}
                className="w-12 h-12 rounded-full object-cover border-2 border-slate-100 shadow-sm shrink-0"
              />
              <div className="space-y-0.5 min-w-0">
                <div className="text-base font-bold text-slate-900 truncate">
                  {report.patientName}
                </div>
                <div className="text-xs text-slate-500">
                  {report.patientAge} yrs • {report.patientGender} • MRN: {report.patientMrn}
                </div>
              </div>
            </div>

            {/* Info Tiles */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-50/80 p-3 rounded-xl border border-slate-100 space-y-1">
                <div className="text-[11px] font-medium text-slate-400">Primary Dx</div>
                <div className="text-xs font-bold text-slate-900 leading-snug">
                  {report.primaryDx}
                </div>
              </div>

              <div className="bg-slate-50/80 p-3 rounded-xl border border-slate-100 space-y-1">
                <div className="text-[11px] font-medium text-slate-400">Last Visit</div>
                <div className="text-xs font-bold text-slate-900 leading-snug">
                  {report.lastVisit}
                </div>
              </div>
            </div>

            {/* Open Patient Profile Button */}
            <button
              type="button"
              onClick={() => navigate(`/patients/${report.patientId}`)}
              className="w-full py-2.5 px-3 rounded-xl border border-purple-200 bg-purple-50/40 hover:bg-purple-50 text-[#5b14b8] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
            >
              <ExternalLink className="size-3.5 text-[#5b14b8]" />
              <span>Open Patient Profile</span>
            </button>
          </div>
        </div>

        {/* Right Column: Panel Details & Critical Values (~65% / 8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div
            data-testid="cmp-panel-card"
            className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-[0px_1px_2px_rgba(0,0,0,0.04)] space-y-5"
          >
            {/* Panel Title & Priority Badge */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <FlaskConical className="size-5 text-red-600" />
                <h3 className="text-base font-bold text-slate-900">
                  {report.panelName}
                </h3>
              </div>

              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#feecee] text-[#d92d20] border border-[#fecdd3] uppercase tracking-wider w-fit">
                STAT PRIORITY
              </span>
            </div>

            {/* Critical Values Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {report.criticalValues?.map((item) => (
                <div
                  key={item.name}
                  data-testid={item.name.toLowerCase().includes('potassium') ? 'potassium-card' : 'creatinine-card'}
                  className="bg-[#fff1f2] border border-[#fecdd3] rounded-2xl p-5 space-y-2 relative"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                      {item.name}
                    </span>
                    <ChevronsUp className="size-5 text-red-400" />
                  </div>

                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl sm:text-4xl font-extrabold text-red-600 tracking-tight">
                      {item.value}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      {item.unit}
                    </span>
                  </div>

                  <div className="text-xs font-semibold text-red-700">
                    {item.refRange}
                  </div>
                </div>
              ))}
            </div>

            {/* Report Narrative Summary */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <FileText className="size-4 text-slate-500" />
                <span>Report Narrative Summary</span>
              </div>
              <div className="border border-slate-200/90 rounded-xl p-4 text-xs text-slate-600 leading-relaxed bg-slate-50/30">
                {report.narrativeSummary}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Card: Required Follow-up Workflow (Full Width) */}
      <div
        data-testid="followup-workflow-card"
        className="bg-white rounded-2xl border border-slate-200/90 border-t-4 border-t-teal-600 p-6 shadow-[0px_1px_3px_rgba(0,0,0,0.05)] flex flex-col md:flex-row md:items-center justify-between gap-5"
      >
        <div className="space-y-1 max-w-xl">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
            <CheckCircle2 className="size-4.5 text-teal-600" />
            <span>{report.followUpWorkflow.title}</span>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed pl-6.5">
            {report.followUpWorkflow.description}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={handleStartConsultation}
            className="px-5 py-2.5 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition-colors"
          >
            <Phone className="size-3.5" />
            <span>Start Consultation</span>
          </button>

          <button
            type="button"
            onClick={() => {
              triggerToast(`Routing urgent nephrology referral for ${report.patientName}...`);
              navigate('/referrals/new', {
                state: {
                  patient: {
                    name: report.patientName,
                    id: report.patientId,
                    mrn: report.patientMrn,
                    ageGender: `${report.patientAge} Yrs / ${report.patientGender}`,
                    bloodGroup: 'A Positive',
                  },
                  specialty: 'Nephrology',
                  primaryReason: 'Acute Kidney Injury (AKI) & Hyperkalemia (K+ 6.2)',
                  clinicalSummary: report.narrativeSummary,
                  priority: 'urgent',
                },
              });
            }}
            className="px-5 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs transition-colors"
          >
            <FilePlus2 className="size-3.5 text-slate-600" />
            <span>Create Referral (Nephro)</span>
          </button>
        </div>
      </div>

      {/* Simulated Telehealth Consultation Modal */}
      {showConsultModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-teal-800 to-teal-950 p-5 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-xl bg-teal-700/60 flex items-center justify-center">
                  <PhoneCall className="size-5 text-teal-200 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-white">Simulated Clinical Consultation</h3>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-400 text-amber-950 uppercase tracking-wider">
                      Demo Mode
                    </span>
                  </div>
                  <p className="text-xs text-teal-200/90 mt-0.5">
                    Simulated Telehealth &amp; Rapid Clinical Response
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowConsultModal(false)}
                className="text-teal-200 hover:text-white p-1 rounded-lg transition-colors"
                aria-label="Close dialog"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              {/* Truthful Notice Banner */}
              <div className="bg-amber-50 border border-amber-200/80 rounded-xl p-3.5 flex items-start gap-2.5">
                <ShieldAlert className="size-4.5 text-amber-700 shrink-0 mt-0.5" />
                <div className="text-xs text-amber-900 leading-relaxed">
                  <span className="font-bold">Demonstration Environment Notice:</span> No live telephony provider or cellular line is connected. This dialog demonstrates the rapid clinical consultation workflow supported by the Doctor-Web frontend architecture.
                </div>
              </div>

              {/* Call Details Card */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
                  <span className="text-xs font-semibold text-slate-500">Target Patient</span>
                  <span className="text-xs font-bold text-slate-900">{report.patientName} (MRN: {report.patientMrn})</span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
                  <span className="text-xs font-semibold text-slate-500">Contact Line</span>
                  <span className="text-xs font-mono font-bold text-slate-800">+1 (555) 342-8891 (Spouse / Emergency)</span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
                  <span className="text-xs font-semibold text-slate-500">Attending Physician</span>
                  <span className="text-xs font-bold text-slate-800">Dr. Clinical (Enterprise Healthcare)</span>
                </div>
                <div className="flex items-center justify-between pt-0.5">
                  <span className="text-xs font-semibold text-slate-500">Connection Status</span>
                  {simulatedCallStatus === 'connecting' && (
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600">
                      <span className="size-2 rounded-full bg-amber-500 animate-ping" />
                      Establishing simulated line...
                    </span>
                  )}
                  {simulatedCallStatus === 'connected' && (
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700">
                      <span className="size-2 rounded-full bg-teal-500 animate-pulse" />
                      Simulated Call Active ({String(Math.floor(callDuration / 60)).padStart(2, '0')}:{String(callDuration % 60).padStart(2, '0')})
                    </span>
                  )}
                  {simulatedCallStatus === 'ended' && (
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500">
                      <span className="size-2 rounded-full bg-slate-400" />
                      Simulated Call Ended
                    </span>
                  )}
                </div>
              </div>

              {/* Clinical Purpose Guidance */}
              <div className="text-xs text-slate-600 bg-slate-50/60 p-3 rounded-xl border border-slate-100 space-y-1">
                <div className="font-bold text-slate-800">Clinical Triage Objective:</div>
                <p>
                  Urgent verbal notification of hyperkalemia (Potassium {report.criticalValues?.[0]?.value || '6.2'} mEq/L) and acute creatinine rise ({report.criticalValues?.[1]?.value || '2.8'} mg/dL). Immediate order to withhold nephrotoxic agents and schedule emergency evaluation.
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleEndConsultation}
                className="px-4 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <PhoneOff className="size-3.5 text-red-500" />
                <span>End Simulated Call</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowConsultModal(false);
                  triggerToast('Transitioning to Treatment Proposal configuration...');
                  navigate('/treatment-offers/new/step-1');
                }}
                className="px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
              >
                <Stethoscope className="size-3.5" />
                <span>Proceed to Treatment Proposal</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
