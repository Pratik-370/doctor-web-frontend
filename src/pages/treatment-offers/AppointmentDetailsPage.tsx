import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  FileText,
  Lock,
  ExternalLink,
  ShieldCheck,
  Building,
  Clock,
  Bell,
  User,
  Plus,
  Activity,
  Download,
  Printer,
  ChevronRight,
  RefreshCw,
  XCircle,
  FileSpreadsheet,
} from 'lucide-react';
import { TreatmentOfferState, DEFAULT_OFFER_STATE, DEFAULT_APPOINTMENT_RECORD } from './types';

export const AppointmentDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Load offer state from navigation payload or default fallback
  const offer = (location.state as TreatmentOfferState) || DEFAULT_OFFER_STATE;
  const appointment = DEFAULT_APPOINTMENT_RECORD;

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleGoToPreOpChecklist = () => {
    navigate(`/treatment-offers/${offer.offerId}/pre-op`, { state: offer });
  };

  return (
    <div className="w-full bg-[#f8f9fa] min-h-screen text-[#0f172a] font-['Plus_Jakarta_Sans',sans-serif] flex flex-col">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0f172a] text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 border border-slate-700 animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* TOP WORKSPACE HEADER (Figma 1:11774) */}
      <header className="h-14 border-b border-[#e1e3e4] bg-[#f8f9fa] px-8 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <span className="font-semibold text-slate-700">Clinical Workspace</span>
          <span>&gt;</span>
          <span className="text-[#3f1d8b] font-bold">Enterprise View</span>
          <span>•</span>
          <Link to="/patients" className="hover:text-slate-800 transition-colors">Patients</Link>
          <span>/</span>
          <Link to={`/patients/${offer.patientId}`} className="hover:text-slate-800 transition-colors">
            {offer.patientName} ({offer.patientCid})
          </Link>
          <span>/</span>
          <Link to={`/treatment-offers/${offer.offerId}/status`} className="hover:text-slate-800 transition-colors">
            Offer #{offer.offerId}
          </Link>
          <span>/</span>
          <span className="bg-purple-100 text-[#3f1d8b] font-bold px-2 py-0.5 rounded text-[11px]">
            Appointment Details
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Live EHR Sync</span>
          </div>

          <button
            type="button"
            className="p-1.5 rounded-full hover:bg-slate-200/60 text-slate-600 transition-colors relative"
            aria-label="Notifications"
          >
            <Bell className="size-4" />
          </button>

          <button
            type="button"
            onClick={() => navigate('/treatment-offers/new/step-1')}
            className="h-8 px-3 rounded-full text-white font-medium text-xs bg-gradient-to-b from-[#a44cff] to-[#5b14b8] flex items-center gap-1.5 shadow-xs hover:opacity-95 cursor-pointer"
          >
            <Plus className="size-3.5" />
            <span>New Encounter</span>
          </button>

          <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
            <div className="size-7 rounded-full bg-[#3f1d8b] text-white flex items-center justify-center font-bold text-xs">
              MC
            </div>
            <div className="text-left hidden md:block">
              <span className="text-xs font-bold block text-slate-800 leading-tight">Dr. Michael Chang</span>
              <span className="text-[10px] text-slate-500 block leading-tight">Attending Physician</span>
            </div>
          </div>
        </div>
      </header>

      {/* PATIENT CONTEXT RIBBON */}
      <div className="border-b border-[#e1e3e4] bg-white px-8 py-3 shrink-0">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-[#3f1d8b] text-white flex items-center justify-center font-bold text-sm shrink-0">
              RS
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-[#0f172a]">{offer.patientName}</span>
                <span className="text-xs text-slate-400 font-mono">CID {offer.patientCid}</span>
                <span className="bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-bold px-1.5 py-0.2 rounded">
                  Allergy: Penicillin (Severe)
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                <span>45 yrs • Male</span>
                <span>•</span>
                <span>Blood: O Pos (+)</span>
                <span>•</span>
                <span className="text-emerald-700 font-semibold">Self-Pay • Prompt Settlement Confirmed</span>
                <span>•</span>
                <span className="font-mono text-purple-700">CPT #93458</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold px-2.5 py-1 rounded-full">
              Active Care Plan: Cardiac Interventional Protocol v4
            </span>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT WORKSPACE */}
      <main className="flex-1 overflow-y-auto px-8 py-6 max-w-[1280px] w-full mx-auto flex flex-col gap-6">
        {/* Title Header with Case ID and Action Buttons */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5 mb-1.5 flex-wrap">
              <span className="bg-cyan-100 text-cyan-900 text-xs font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                CONFIRMED
              </span>
              <span className="bg-purple-100 text-[#3f1d8b] text-xs font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                UPCOMING • IN 16 DAYS
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Case ID: {appointment.appointmentId}
              </span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-[#0f172a]">
              {appointment.procedureName}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => triggerToast('Reschedule modal opened.')}
              className="border border-[#e2e8f0] bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <RefreshCw className="size-3.5 text-slate-500" />
              <span>Reschedule</span>
            </button>
            <button
              type="button"
              onClick={() => triggerToast('Cancellation protocol initiated.')}
              className="border border-rose-200 bg-white hover:bg-rose-50 text-rose-700 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <XCircle className="size-3.5 text-rose-500" />
              <span>Cancel</span>
            </button>
            <button
              type="button"
              onClick={() => triggerToast('Printing appointment order sheet...')}
              className="size-8 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center cursor-pointer text-slate-600 shadow-2xs"
              aria-label="Print Sheet"
            >
              <Printer className="size-4" />
            </button>
          </div>
        </div>

        {/* SUMMARY RIBBON (4 Key Metric Cards - Figma 1:11774) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Card 1: Time & Timing */}
          <div className="bg-white border border-[#e2e8f0] rounded-[16px] p-4 shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col justify-between gap-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                SCHEDULED PROCEDURE TIME
              </span>
              <Clock className="size-4 text-purple-700" />
            </div>
            <div>
              <span className="text-2xl font-black text-[#0f172a] block">
                09:30 AM <span className="text-xs font-bold text-slate-400">EST</span>
              </span>
              <span className="text-xs font-bold text-[#3f1d8b]">{appointment.scheduledDate}</span>
            </div>
            <div className="bg-purple-50 p-2 rounded-lg text-[10px] text-purple-900 font-medium">
              {appointment.arrivalWindow}
            </div>
          </div>

          {/* Card 2: Operating Location */}
          <div className="bg-white border border-[#e2e8f0] rounded-[16px] p-4 shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col justify-between gap-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                SURGICAL LOCATION
              </span>
              <Building className="size-4 text-purple-700" />
            </div>
            <div>
              <span className="text-lg font-black text-[#0f172a] block">
                Cath Lab Suite 3
              </span>
              <span className="text-xs font-bold text-slate-700">Mount Sinai Hospital</span>
            </div>
            <div className="text-[10px] text-slate-500">
              Interventional Wing • 3rd Fl (Tower B)
            </div>
          </div>

          {/* Card 3: Supervising Specialist */}
          <div className="bg-white border border-[#e2e8f0] rounded-[16px] p-4 shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col justify-between gap-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                ATTENDING SPECIALIST
              </span>
              <User className="size-4 text-purple-700" />
            </div>
            <div>
              <span className="text-lg font-black text-[#0f172a] block">
                {appointment.attendingDoctor}
              </span>
              <span className="text-xs font-semibold text-slate-700">Interventional Cardiology</span>
            </div>
            <div className="text-[10px] text-slate-500 font-mono">
              NPI #19820491 • Lic #88392-NY
            </div>
          </div>

          {/* Card 4: Underwritten Payment Status */}
          <div className="bg-white border border-[#e2e8f0] rounded-[16px] p-4 shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col justify-between gap-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                UNDERWRITTEN SETTLEMENT
              </span>
              <CheckCircle2 className="size-4 text-emerald-600" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-black text-[#3f1d8b]">{appointment.underwrittenAmount}</span>
                <span className="bg-emerald-100 text-emerald-800 text-[9px] font-bold px-1.5 py-0.2 rounded uppercase">
                  LOCKED
                </span>
              </div>
              <span className="text-xs font-bold text-slate-700">{appointment.financingPlan}</span>
            </div>
            <div className="text-[10px] text-slate-400 font-mono">
              Ref #FIN-TR8921-12M
            </div>
          </div>
        </div>

        {/* 2-COLUMN MAIN CONTENT (Figma 1:11774) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT 2/3 COLUMN */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Card 1: Clinical Indication & Surgical Scope */}
            <div className="bg-white border border-[#e2e8f0] rounded-[16px] p-6 shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Activity className="size-4 text-[#3f1d8b]" />
                  <h3 className="font-bold text-sm text-[#0f172a]">
                    Clinical Indication & Surgical Scope
                  </h3>
                </div>
                <span className="bg-purple-100 text-[#3f1d8b] text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase">
                  AHA/ACC CLASS I
                </span>
              </div>

              <div className="flex flex-col gap-3 text-xs leading-relaxed">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                    PRIMARY INDICATION
                  </span>
                  <p className="text-slate-700 mt-1">
                    Non-emergent hemodynamic angiogram indicated by reproducible ischemic ST-segment depressions during Bruce protocol treadmill stress test. Linked to referral #REF-4491 initiated by Dr. Sarah Lin (Primary Care) following recurrent exertional chest tightness (CCS Class II angina).
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                  <div className="bg-[#fafafc] border border-slate-200 p-3.5 rounded-xl flex flex-col gap-1.5">
                    <span className="text-[10px] uppercase font-bold text-slate-400">OPERATIVE SCOPE & TECHNIQUE</span>
                    <p className="text-slate-700 text-[11px]">
                      Left heart catheterization, selective coronary arteriography of LAD, LCx, and RCA, along with left ventriculography using non-ionic low-osmolar contrast media with real-time fluoroscopic digital subtraction imaging.
                    </p>
                    <div className="flex items-center gap-2 pt-1">
                      <span className="bg-slate-200 text-slate-700 text-[9px] font-bold px-1.5 py-0.2 rounded">Fluoroscopy 15fps</span>
                      <span className="bg-slate-200 text-slate-700 text-[9px] font-bold px-1.5 py-0.2 rounded">Isovue-370</span>
                    </div>
                  </div>

                  <div className="bg-[#fafafc] border border-slate-200 p-3.5 rounded-xl flex flex-col gap-1.5">
                    <span className="text-[10px] uppercase font-bold text-slate-400">POST-PROCEDURAL RECOVERY PLAN</span>
                    <p className="text-slate-700 text-[11px]">
                      4-hour monitored post-anesthesia bed rest in Level 2 Step-Down. Deployment of Angio-Seal™ VIP vascular closure device for right femoral artery access (or radial compression band if transradial access preferred).
                    </p>
                    <div className="flex items-center gap-2 pt-1">
                      <span className="bg-emerald-100 text-emerald-800 text-[9px] font-bold px-1.5 py-0.2 rounded">Outpatient Same-Day</span>
                      <span className="bg-cyan-100 text-cyan-800 text-[9px] font-bold px-1.5 py-0.2 rounded">Vascular Seal Ready</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Clinical Orders & Preparation Mandates */}
            <div className="bg-white border border-[#e2e8f0] rounded-[16px] p-6 shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <FileText className="size-4 text-[#3f1d8b]" />
                  <h3 className="font-bold text-sm text-[#0f172a]">
                    Clinical Orders & Preparation Mandates
                  </h3>
                </div>
                <span className="text-xs text-slate-500 font-semibold">Active EHR Protocol</span>
              </div>

              <div className="flex flex-col gap-3 text-xs">
                {/* Order 1: NPO */}
                <div className="p-3.5 rounded-xl bg-purple-50/50 border border-purple-200 flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#3f1d8b]">Strict NPO (Fasting Order)</span>
                      <span className="bg-purple-100 text-purple-800 text-[9px] font-bold px-1.5 py-0.2 rounded">8 Hours</span>
                    </div>
                    <span className="bg-emerald-100 text-emerald-800 text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="size-3" />
                      Patient App Acknowledged
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600">
                    Nothing by mouth after 01:30 AM EST on Nov 4, 2026. Clear water permitted until 05:30 AM.
                  </p>
                </div>

                {/* Order 2: Med Hold */}
                <div className="p-3.5 rounded-xl bg-rose-50/40 border border-rose-200 flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-rose-900">Medication Hold Protocol</span>
                      <span className="bg-rose-100 text-rose-800 text-[9px] font-bold px-1.5 py-0.2 rounded">CRITICAL</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => triggerToast('Medication hold directives opened.')}
                      className="text-[#3f1d8b] hover:underline text-[11px] font-bold cursor-pointer"
                    >
                      View Hold Directives
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-700">
                    Hold Metformin 48 hrs prior (Lactic Acidosis risk). Confirm zero DOAC/Warfarin within 24 hours. Strict penicillin-derivative avoidance on tray preparation.
                  </p>
                </div>

                {/* Order 3: Lab Workup */}
                <div className="p-3.5 rounded-xl bg-amber-50/50 border border-amber-200 flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-amber-950">Mandatory Pre-Op Laboratory Workup</span>
                      <span className="bg-amber-100 text-amber-900 text-[9px] font-bold px-1.5 py-0.2 rounded">Order #LAB-8821 DISPATCHED</span>
                    </div>
                    <span className="bg-amber-100 text-amber-900 text-[9px] font-bold px-2 py-0.5 rounded-full">
                      Pending Draw
                    </span>
                  </div>
                  <p className="text-[11px] text-amber-900">
                    Basic Metabolic Panel (BMP), Serum Creatinine / eGFR (Contrast clearance assessment), Coagulation (PT/INR, PTT).
                  </p>
                  <div className="flex items-center justify-between text-[10px] text-amber-800 pt-1 border-t border-amber-200/60 mt-1">
                    <span>Specimen Submission Deadline:</span>
                    <span className="font-bold">Monday, Nov 2, 2026 • 12:00 PM EST</span>
                  </div>
                </div>

                {/* Order 4: Anesthesia Clearance */}
                <div className="p-3.5 rounded-xl bg-blue-50/50 border border-blue-200 flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-blue-950">Anesthesia Sedation Clearance (Telehealth)</span>
                      <span className="bg-blue-100 text-blue-900 text-[9px] font-bold px-1.5 py-0.2 rounded">MAC Protocol</span>
                    </div>
                    <span className="bg-blue-100 text-blue-900 text-[9px] font-bold px-2 py-0.5 rounded-full">
                      Calendar Linked
                    </span>
                  </div>
                  <p className="text-[11px] text-blue-900">
                    Virtual evaluation with CRNA/NP Elena Rostova scheduled for Nov 2, 2026 at 03:00 PM EST.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3: Linked Clinical Documentation Vault */}
            <div className="bg-white border border-[#e2e8f0] rounded-[16px] p-6 shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <FileSpreadsheet className="size-4 text-[#3f1d8b]" />
                  <h3 className="font-bold text-sm text-[#0f172a]">
                    Linked Clinical Documentation Vault
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => navigate('/records/upload')}
                  className="border border-purple-200 hover:bg-purple-50 text-[#3f1d8b] text-xs font-bold px-3 py-1 rounded-lg transition-colors cursor-pointer"
                >
                  Upload Record
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-[#fafafc] border border-slate-200 flex flex-col justify-between gap-2">
                  <div>
                    <span className="font-bold text-slate-800 block">Stress ECG Full Report</span>
                    <span className="text-[10px] text-slate-400">Oct 12, 2026 • 2.4 MB • PDF</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => triggerToast('Downloading ECG Report...')}
                    className="text-[#3f1d8b] font-bold text-[11px] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Download className="size-3" /> Download
                  </button>
                </div>

                <div className="p-3 rounded-xl bg-[#fafafc] border border-slate-200 flex flex-col justify-between gap-2">
                  <div>
                    <span className="font-bold text-slate-800 block">Pre-Cath Echocardiogram</span>
                    <span className="text-[10px] text-slate-400">Oct 14, 2026 • 182 MB • DICOM Study</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigate('/records/imaging')}
                    className="text-[#3f1d8b] font-bold text-[11px] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <ExternalLink className="size-3" /> View Study
                  </button>
                </div>

                <div className="p-3 rounded-xl bg-[#fafafc] border border-slate-200 flex flex-col justify-between gap-2">
                  <div>
                    <span className="font-bold text-slate-800 block">Treatment & Financing Plan</span>
                    <span className="text-[10px] text-slate-400">Oct 19, 2026 • Signed & Ratified</span>
                  </div>
                  <span className="text-emerald-700 font-bold text-[11px] flex items-center gap-1">
                    <CheckCircle2 className="size-3" /> Verified
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-[#fafafc] border border-slate-200 flex flex-col justify-between gap-2">
                  <div>
                    <span className="font-bold text-slate-800 block">Biometric Consent Stamp</span>
                    <span className="text-[10px] text-slate-400 font-mono">SHA-256 Verified • Validated</span>
                  </div>
                  <span className="text-purple-700 font-bold text-[11px] flex items-center gap-1">
                    <Lock className="size-3" /> Validated
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT 1/3 COLUMN */}
          <div className="flex flex-col gap-6">
            {/* Card 1: Procedure Readiness */}
            <div className="bg-white border-2 border-purple-300 rounded-[16px] p-5 shadow-sm flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Activity className="size-4 text-[#3f1d8b]" />
                  <h4 className="font-bold text-sm text-[#0f172a]">
                    Procedure Readiness
                  </h4>
                </div>
                <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Action Req
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-600 font-medium">Protocol Readiness</span>
                  <span className="font-black text-base text-[#3f1d8b]">60%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div className="w-[60%] h-full bg-gradient-to-r from-amber-400 to-[#5b14b8] rounded-full" />
                </div>
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>3 of 5 Gates Cleared</span>
                  <span className="text-amber-700 font-semibold">2 Clinical Gates Pending</span>
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-2 border-t border-slate-100 text-xs">
                <div className="flex items-center gap-2 text-emerald-800">
                  <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                  <span>Financial & APR Agreement (Confirmed & locked)</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-800">
                  <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                  <span>Biometric Digital Consent (Signed via Care ID App)</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-800">
                  <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                  <span>Cath Lab 3 Resource Reservation (Team Confirmed)</span>
                </div>
                <div className="flex items-center gap-2 text-amber-800">
                  <AlertTriangle className="size-4 text-amber-600 shrink-0" />
                  <span>Coagulation & Renal Labs (PT/INR Specimen Pending)</span>
                </div>
                <div className="flex items-center gap-2 text-blue-800">
                  <Clock className="size-4 text-blue-600 shrink-0" />
                  <span>Anesthesia Pre-Op Clearance (Nov 2 • 03:00 PM)</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleGoToPreOpChecklist}
                className="w-full py-3 bg-gradient-to-b from-[#a44cff] to-[#5b14b8] text-white text-xs font-bold rounded-xl shadow-md hover:opacity-95 transition-opacity flex items-center justify-center gap-2 cursor-pointer mt-1"
              >
                <span>Detailed Readiness View</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Card 2: Patient Dispatch Audit */}
            <div className="bg-white border border-[#e2e8f0] rounded-[16px] p-5 shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col gap-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400">
                Patient Dispatch Audit
              </h4>
              <div className="flex flex-col gap-2.5 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex justify-between font-bold text-slate-800">
                    <span>Push Dispatch</span>
                    <span className="text-[10px] text-slate-400 font-normal">Today, 10:14 AM</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    NPO fasting instructions acknowledged in Care ID mobile app.
                  </p>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex justify-between font-bold text-slate-800">
                    <span>SMS Delivery</span>
                    <span className="text-[10px] text-slate-400 font-normal">Oct 19, 04:30 PM</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Hospital wayfinding guide & check-in QR code transmitted to +1 (555) •••-9182.
                  </p>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex justify-between font-bold text-slate-800">
                    <span>Discharge Escort</span>
                    <span className="text-emerald-700 font-semibold text-[10px]">Verified</span>
                  </div>
                  <p className="text-[11px] text-slate-700 mt-0.5">
                    Mary Sterling (Spouse) • Post-sedation pickup confirmed
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3: Navigation Shortcuts */}
            <div className="bg-white border border-[#e2e8f0] rounded-[16px] p-5 shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col gap-2">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                NAVIGATION SHORTCUTS
              </span>
              <div className="flex flex-col gap-1 text-xs">
                <Link
                  to={`/patients/${offer.patientId}`}
                  className="py-2 px-2.5 rounded-lg hover:bg-slate-50 text-slate-700 font-medium flex items-center justify-between"
                >
                  <span>View Patient Clinical Profile</span>
                  <ChevronRight className="size-3.5 text-slate-400" />
                </Link>
                <Link
                  to={`/treatment-offers/${offer.offerId}/accepted`}
                  className="py-2 px-2.5 rounded-lg hover:bg-slate-50 text-slate-700 font-medium flex items-center justify-between"
                >
                  <span>View Treatment & Financial Plan</span>
                  <ChevronRight className="size-3.5 text-slate-400" />
                </Link>
                <Link
                  to="/patients"
                  className="py-2 px-2.5 rounded-lg hover:bg-slate-50 text-purple-700 font-semibold flex items-center gap-1.5"
                >
                  <ArrowLeft className="size-3" />
                  <span>Back to Patients Directory</span>
                </Link>
              </div>
            </div>

            {/* Card 4: Compliance */}
            <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl text-[10px] text-slate-500 leading-relaxed">
              <strong>HIPAA & HL7 FHIR Compliant Record:</strong> Encounter ledger locked by Dr. Michael Chang on Oct 19, 2026 at 02:45 PM EDT. All orders synchronized with Mount Sinai EHR endpoint <code>epicx-hls-cath3</code>.
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="h-12 border-t border-[#e1e3e4] bg-[#f8f9fa] px-8 flex items-center justify-between text-[11px] text-slate-500 mt-auto shrink-0">
        <div className="flex items-center gap-2">
          <span>Care ID Enterprise Health Platform • Cardiology Procedural Protocol 2026</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-emerald-700 font-semibold flex items-center gap-1">
            <ShieldCheck className="size-3.5" />
            EHR Verified Order
          </span>
          <Link to="/settings" className="hover:underline">Support Desk</Link>
          <Link to="/settings" className="hover:underline">Clinical Guidelines</Link>
        </div>
      </footer>
    </div>
  );
};
