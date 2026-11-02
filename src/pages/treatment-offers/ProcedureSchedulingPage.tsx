import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  FileText,
  Calendar,
  Lock,
  ShieldCheck,
  Building,
  Clock,
  Bell,
  User,
  Plus,
  Activity,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Send,
  Smartphone,
  CreditCard,
  QrCode,
  AlertCircle,
} from 'lucide-react';
import { TreatmentOfferState, DEFAULT_OFFER_STATE } from './types';

interface ProcedureSchedulingPageProps {
  initialMode?: 'select' | 'review' | 'confirmed';
}

export const ProcedureSchedulingPage: React.FC<ProcedureSchedulingPageProps> = ({ initialMode }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Load offer state from navigation payload or default fallback
  const offer = (location.state as TreatmentOfferState) || DEFAULT_OFFER_STATE;

  // Determine active view mode: 'select' (1:10206), 'review' (1:10786), 'confirmed' (1:11274)
  const resolveInitialMode = React.useCallback((): 'select' | 'review' | 'confirmed' => {
    if (initialMode) return initialMode;
    if (location.pathname.endsWith('/review')) return 'review';
    if (location.pathname.endsWith('/scheduled')) return 'confirmed';
    return 'select';
  }, [initialMode, location.pathname]);

  const [mode, setMode] = useState<'select' | 'review' | 'confirmed'>(resolveInitialMode);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    setMode(resolveInitialMode());
  }, [resolveInitialMode]);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Step transitions
  const handleProceedToReview = () => {
    setMode('review');
    navigate(`/treatment-offers/${offer.offerId}/schedule/review`, { state: offer });
  };

  const handleBackToSelect = () => {
    setMode('select');
    navigate(`/treatment-offers/${offer.offerId}/schedule`, { state: offer });
  };

  const handleConfirmBooking = () => {
    setMode('confirmed');
    navigate(`/treatment-offers/${offer.offerId}/scheduled`, { state: offer });
    triggerToast('Procedure #PROC-2026-93458 locked into Cath Lab Suite 3.');
  };

  const handleGoToAppointmentDetails = () => {
    navigate(`/treatment-offers/${offer.offerId}/appointment`, { state: offer });
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

      {/* TOP WORKSPACE HEADER (Figma standard top strip) */}
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
          <Link to={`/treatment-offers/${offer.offerId}/clearance`} className="hover:text-slate-800 transition-colors">
            Clearance Handoff
          </Link>
          <span>/</span>
          <span className="bg-purple-100 text-[#3f1d8b] font-bold px-2 py-0.5 rounded text-[11px]">
            {mode === 'select' && 'Cath Lab Slot Selection'}
            {mode === 'review' && 'Slot Confirmation & Final Review'}
            {mode === 'confirmed' && 'Procedure Scheduled Successfully'}
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

      {/* PATIENT CLINICAL CONTEXT RIBBON (Figma node 1:10206 / 1:10786 / 1:11274) */}
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
              </div>
            </div>
          </div>

          <div className="bg-[#fafafc] border border-slate-200 px-3.5 py-1.5 rounded-xl flex items-center gap-3">
            <div className="flex flex-col text-right">
              <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">TARGET PROCEDURE</span>
              <span className="text-xs font-bold text-[#0f172a]">{offer.procedureName}</span>
              <span className="text-[10px] text-slate-500 font-mono">CPT #93458 • Tier 1 Outpatient</span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODE 1: CATH LAB PROCEDURAL SLOT SELECTION (FIGMA NODE 1:10206)           */}
      {/* ========================================================================= */}
      {mode === 'select' && (
        <main className="flex-1 overflow-y-auto px-8 py-6 max-w-[1280px] w-full mx-auto flex flex-col gap-6 animate-in fade-in">
          {/* Header Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl font-bold tracking-tight text-[#0f172a]">
                  Cath Lab Procedural Slot Selection
                </h1>
                <span className="bg-cyan-50 text-cyan-800 border border-cyan-200 text-xs font-bold px-2.5 py-0.5 rounded-full">
                  Financial Clearance Ratified (100%) • Offer #{offer.offerId} v1.0 Final
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Assign designated procedural suite, clinical team, and operating slot for approved diagnostic catheterization.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => triggerToast('Cath Lab filter preferences opened.')}
                className="border border-[#e2e8f0] bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span>Suite Filter</span>
              </button>
              <button
                type="button"
                onClick={() => triggerToast('Slot hold verified: Active for 42 mins.')}
                className="border border-[#e2e8f0] bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span>Recheck Hold Expiry</span>
              </button>
            </div>
          </div>

          {/* Procedure & Facility Quick Spec Card (Horizontal Ribbon - Figma 1:10206) */}
          <div className="bg-white border border-[#e2e8f0] rounded-[16px] p-4 shadow-[0px_1px_1px_rgba(0,0,0,0.05)] grid grid-cols-2 md:grid-cols-5 gap-3 text-xs">
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] uppercase font-bold text-slate-400">MEDICAL SERVICES</span>
              <span className="font-bold text-slate-800">Diagnostic Cath & Coronary Angiogram</span>
              <span className="text-[11px] text-slate-500">CPT #93458 • Tier 1 Outpatient</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] uppercase font-bold text-slate-400">ESTIMATED DURATION</span>
              <span className="font-bold text-[#3f1d8b]">90 Min OR / Slot</span>
              <span className="text-[11px] text-slate-500">Plus 120 Min Monitored Recovery</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] uppercase font-bold text-slate-400">SUPERVISING ATTENDING</span>
              <span className="font-bold text-slate-800">Dr. Michael Chang, MD</span>
              <span className="text-[11px] text-slate-500">Interventional Cardio • Lic #88392</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] uppercase font-bold text-slate-400">FACILITY / UNIT</span>
              <span className="font-bold text-slate-800">Mount Sinai Hospital</span>
              <span className="text-[11px] text-slate-500">Cardiac Interventional Suite, Tier 1</span>
            </div>
            <div className="bg-cyan-50/60 border border-cyan-200 p-2 rounded-xl flex flex-col gap-0.5 col-span-2 md:col-span-1">
              <span className="text-[10px] uppercase font-bold text-cyan-800 flex items-center gap-1">
                <ShieldCheck className="size-3 text-cyan-600" />
                PREP PROTOCOL
              </span>
              <span className="font-bold text-cyan-900 text-[11px]">NPO: Fasting 8 hrs prior</span>
              <span className="text-[10px] text-cyan-700">Pre-op Check-in 2.0h before slot</span>
            </div>
          </div>

          {/* 2-COLUMN SCHEDULING INTERACTION */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* LEFT 2/3: CALENDAR & SLOTS */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              {/* Date Navigator Card */}
              <div className="bg-white border border-[#e2e8f0] rounded-[16px] p-5 shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col gap-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="size-4 text-[#3f1d8b]" />
                    <h3 className="font-bold text-sm text-[#0f172a]">
                      Week of November 2 – 8, 2026
                    </h3>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => triggerToast('Previous week')}
                      className="size-7 rounded-lg border border-slate-200 hover:bg-slate-50 flex items-center justify-center cursor-pointer"
                    >
                      <ChevronLeft className="size-4 text-slate-600" />
                    </button>
                    <button
                      type="button"
                      className="px-2.5 py-1 text-xs font-bold rounded-lg bg-slate-100 text-slate-700"
                    >
                      Today
                    </button>
                    <button
                      type="button"
                      onClick={() => triggerToast('Next week')}
                      className="size-7 rounded-lg border border-slate-200 hover:bg-slate-50 flex items-center justify-center cursor-pointer"
                    >
                      <ChevronRight className="size-4 text-slate-600" />
                    </button>
                  </div>
                </div>

                {/* Day selector pills */}
                <div className="grid grid-cols-5 gap-2">
                  {/* Mon Nov 2 */}
                  <div className="border border-slate-200 rounded-xl p-3 text-center flex flex-col gap-1 bg-slate-50/50 hover:bg-slate-50 cursor-pointer">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Mon</span>
                    <span className="text-base font-extrabold text-slate-800">Nov 2</span>
                    <span className="bg-cyan-50 text-cyan-800 text-[10px] font-bold px-2 py-0.5 rounded-full">2 slots</span>
                  </div>

                  {/* Tue Nov 3 */}
                  <div className="border border-slate-200 rounded-xl p-3 text-center flex flex-col gap-1 bg-slate-50/50 hover:bg-slate-50 cursor-pointer">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Tue</span>
                    <span className="text-base font-extrabold text-slate-800">Nov 3</span>
                    <span className="bg-cyan-50 text-cyan-800 text-[10px] font-bold px-2 py-0.5 rounded-full">1 slot</span>
                  </div>

                  {/* Wed Nov 4 (SELECTED) */}
                  <div className="border-2 border-[#5b14b8] bg-[#1e1b4b] text-white rounded-xl p-3 text-center flex flex-col gap-1 shadow-sm cursor-pointer relative">
                    <span className="text-[10px] uppercase font-bold text-cyan-300">Wed</span>
                    <span className="text-base font-black text-white">Nov 4</span>
                    <span className="bg-purple-500/30 text-purple-200 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                      4 slots
                    </span>
                    <span className="size-2 rounded-full bg-cyan-400 absolute top-2 right-2 animate-pulse" />
                  </div>

                  {/* Thu Nov 5 */}
                  <div className="border border-slate-200 rounded-xl p-3 text-center flex flex-col gap-1 bg-slate-100 opacity-60">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Thu</span>
                    <span className="text-base font-bold text-slate-600">Nov 5</span>
                    <span className="bg-slate-200 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded-full">Full</span>
                  </div>

                  {/* Fri Nov 6 */}
                  <div className="border border-slate-200 rounded-xl p-3 text-center flex flex-col gap-1 bg-slate-50/50 hover:bg-slate-50 cursor-pointer">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Fri</span>
                    <span className="text-base font-extrabold text-slate-800">Nov 6</span>
                    <span className="bg-cyan-50 text-cyan-800 text-[10px] font-bold px-2 py-0.5 rounded-full">3 slots</span>
                  </div>
                </div>

                {/* Legend */}
                <div className="flex items-center gap-4 text-[11px] text-slate-500 pt-1 border-t border-slate-100 flex-wrap">
                  <span className="flex items-center gap-1.5">
                    <span className="size-2.5 rounded-full bg-cyan-500" /> Available
                  </span>
                  <span className="flex items-center gap-1.5 font-bold text-[#3f1d8b]">
                    <span className="size-2.5 rounded-full bg-[#3f1d8b]" /> Selected / Tentative Hold
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="size-2.5 rounded-full bg-amber-400" /> Hold / Pending
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="size-2.5 rounded-full bg-slate-300" /> Booked
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="size-2.5 rounded-full bg-rose-500" /> Clinical Conflict
                  </span>
                </div>
              </div>

              {/* MORNING PROCEDURAL WINDOW (08:00 - 13:00) */}
              <div className="bg-white border border-[#e2e8f0] rounded-[16px] p-5 shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col gap-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <div className="flex items-center gap-2">
                    <Clock className="size-4 text-purple-700" />
                    <h4 className="font-bold text-xs uppercase tracking-wider text-[#0f172a]">
                      MORNING PROCEDURAL WINDOW (08:00 – 13:00)
                    </h4>
                  </div>
                  <span className="text-xs text-slate-400 font-medium">3 Operating Sessions</span>
                </div>

                <div className="flex flex-col gap-3">
                  {/* Slot 1: Booked */}
                  <div className="border border-slate-200 bg-slate-50/60 rounded-xl p-3.5 flex items-center justify-between opacity-70">
                    <div className="flex items-center gap-4">
                      <div className="text-center w-20">
                        <span className="text-xs font-bold text-slate-800 block">08:00 AM</span>
                        <span className="text-[10px] text-slate-400">09:30 AM</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-700">Cath Lab Suite 1</span>
                          <span className="bg-slate-200 text-slate-600 text-[9px] font-bold px-1.5 py-0.2 rounded">
                            Occupied
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500">
                          Dr. Aris Thorne • Elective Angioplasty (CPT #92928)
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-slate-400">Slot Booked</span>
                  </div>

                  {/* Slot 2: ACTIVE SELECTED (Suite 3) */}
                  <div className="border-2 border-[#5b14b8] bg-[#1e1b4b] text-white rounded-xl p-4 flex flex-col gap-3 shadow-md relative">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="bg-purple-900/60 border border-purple-500/40 rounded-lg p-2 text-center w-20">
                          <span className="text-sm font-black text-cyan-300 block">09:30 AM</span>
                          <span className="text-[10px] text-purple-200">11:00 AM</span>
                          <span className="text-[9px] font-bold text-cyan-400 block mt-0.5">(90m)</span>
                        </div>
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-extrabold text-white">Cath Lab Suite 3 (Interventional)</span>
                            <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 text-[9px] font-extrabold px-2 py-0.5 rounded-full">
                              Selected • Handoff Hold
                            </span>
                          </div>
                          <p className="text-xs text-indigo-200">
                            Tentative Hold Matched to Handoff Pipeline • Attending: Dr. Michael Chang, MD • Check-in: 07:30 AM
                          </p>
                          <div className="flex items-center gap-2 text-[11px] text-cyan-200 pt-1 flex-wrap">
                            <span>• C-Arm Fluoroscopy #3 Ready</span>
                            <span>• Dedicated Cardiac RN Assigned</span>
                            <span>• Recovery Bay #104 Held</span>
                          </div>
                        </div>
                      </div>
                      <div className="size-6 rounded-full bg-cyan-400 text-indigo-950 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="size-4 stroke-[3]" />
                      </div>
                    </div>

                    <div className="border-t border-indigo-800/60 pt-2 flex items-center justify-between text-[11px] text-cyan-200/90">
                      <span>Lock expires in 42:15 min</span>
                      <span className="text-white font-semibold">Matched to Patient Care ID #8472–9901</span>
                    </div>
                  </div>

                  {/* Slot 3: Available */}
                  <div className="border border-slate-200 hover:border-purple-300 bg-white rounded-xl p-3.5 flex items-center justify-between transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="text-center w-20">
                        <span className="text-xs font-bold text-slate-800 block">11:15 AM</span>
                        <span className="text-[10px] text-slate-400">12:45 PM</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-800">Cath Lab Suite 2</span>
                          <span className="bg-emerald-50 text-emerald-700 text-[9px] font-bold px-1.5 py-0.2 rounded border border-emerald-200">
                            Available
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500">
                          Standard Fluoroscopic & Hemodynamic Capability
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => triggerToast('Cath Lab Suite 2 selected.')}
                      className="px-3 py-1.5 border border-purple-200 hover:bg-purple-50 text-[#3f1d8b] text-xs font-bold rounded-lg cursor-pointer"
                    >
                      Select Slot
                    </button>
                  </div>
                </div>
              </div>

              {/* AFTERNOON PROCEDURAL WINDOW (13:30 - 18:30) */}
              <div className="bg-white border border-[#e2e8f0] rounded-[16px] p-5 shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col gap-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <div className="flex items-center gap-2">
                    <Clock className="size-4 text-purple-700" />
                    <h4 className="font-bold text-xs uppercase tracking-wider text-[#0f172a]">
                      AFTERNOON PROCEDURAL WINDOW (13:30 – 18:30)
                    </h4>
                  </div>
                  <span className="text-xs text-slate-400 font-medium">3 Operating Sessions</span>
                </div>

                <div className="flex flex-col gap-3">
                  {/* Slot 1: Available */}
                  <div className="border border-slate-200 hover:border-purple-300 bg-white rounded-xl p-3.5 flex items-center justify-between transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="text-center w-20">
                        <span className="text-xs font-bold text-slate-800 block">01:30 PM</span>
                        <span className="text-[10px] text-slate-400">03:00 PM</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-800">Cath Lab Suite 3 (Interventional)</span>
                          <span className="bg-emerald-50 text-emerald-700 text-[9px] font-bold px-1.5 py-0.2 rounded border border-emerald-200">
                            Available
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500">
                          High-Definition IVUS & OCT Ready
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => triggerToast('Afternoon Suite 3 slot selected.')}
                      className="px-3 py-1.5 border border-purple-200 hover:bg-purple-50 text-[#3f1d8b] text-xs font-bold rounded-lg cursor-pointer"
                    >
                      Select Slot
                    </button>
                  </div>

                  {/* Slot 2: Clinical Conflict */}
                  <div className="border border-rose-200 bg-rose-50/40 rounded-xl p-3.5 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-center w-20">
                        <span className="text-xs font-bold text-rose-800 block">03:15 PM</span>
                        <span className="text-[10px] text-rose-500">04:45 PM</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-rose-900">Cath Lab Suite 1</span>
                          <span className="bg-rose-100 text-rose-800 text-[9px] font-bold px-1.5 py-0.2 rounded flex items-center gap-0.5">
                            <AlertTriangle className="size-2.5" />
                            Clinical Conflict
                          </span>
                        </div>
                        <p className="text-[11px] text-rose-700">
                          Anesthesia turnover delay • Staffing realignment pending
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-rose-400">Slot Ineligible</span>
                  </div>

                  {/* Slot 3: Maintenance */}
                  <div className="border border-slate-200 bg-slate-100/60 rounded-xl p-3.5 flex items-center justify-between opacity-60">
                    <div className="flex items-center gap-4">
                      <div className="text-center w-20">
                        <span className="text-xs font-bold text-slate-600 block">05:00 PM</span>
                        <span className="text-[10px] text-slate-400">06:30 PM</span>
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-700">Cath Lab Suite 2</span>
                        <p className="text-[11px] text-slate-500">
                          Bio-hazard deep sanitation & radiation calibration protocol
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-slate-400">Maintenance</span>
                  </div>
                </div>
              </div>

              {/* Equipment Verification Capsule */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex items-center justify-between text-xs text-slate-600 flex-wrap gap-2">
                <span className="font-bold text-slate-800">Suite 3 Verified Resources:</span>
                <span>• Fluoroscopy C-Arm 4K (Online)</span>
                <span>• IABP Standby (Active)</span>
                <span>• Hemodynamic Console Q3 (Calibrated)</span>
              </div>
            </div>

            {/* RIGHT 1/3: SELECTION SUMMARY CARD */}
            <div className="flex flex-col gap-6">
              <div className="bg-white border-2 border-[#5b14b8] rounded-[16px] p-5 shadow-sm flex flex-col gap-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="size-4 text-[#3f1d8b]" />
                    <h3 className="font-bold text-base text-[#0f172a]">
                      Selected Procedure Slot
                    </h3>
                  </div>
                  <span className="bg-[#3f1d8b] text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase">
                    SUITE 3
                  </span>
                </div>

                {/* Date & Window Box */}
                <div className="bg-purple-50/60 border border-purple-200 rounded-xl p-3.5 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold text-[#3f1d8b]">DATE & WINDOW</span>
                    <span className="bg-emerald-100 text-emerald-800 text-[9px] font-bold px-1.5 py-0.2 rounded">
                      Confirmed Hold
                    </span>
                  </div>
                  <h4 className="text-base font-black text-[#0f172a]">
                    Wednesday, Nov 4, 2026
                  </h4>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-[#3f1d8b]">09:30 AM – 11:00 AM EST</span>
                    <span className="text-xs text-slate-500 font-mono">(90 mins)</span>
                  </div>
                  <div className="text-[11px] text-purple-900 bg-purple-100/60 p-2 rounded-lg font-medium">
                    Pre-op Check-in: 07:30 AM EST (Day of Cath)
                  </div>
                </div>

                {/* Details Breakdown */}
                <div className="flex flex-col gap-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Room / Unit:</span>
                    <span className="font-bold text-slate-800 text-right">
                      Mount Sinai Hospital<br />
                      <span className="text-[11px] text-slate-500 font-normal">Cath Lab Suite 3 (Interventional)</span>
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Supervising MD:</span>
                    <span className="font-bold text-slate-800">Dr. Michael Chang, MD</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Clinical Staff:</span>
                    <span className="text-slate-700 text-right">
                      Lead RN K. Vance<br />
                      <span className="text-[11px] text-slate-500">Scrub Tech J. Morales</span>
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Anesthesia Care:</span>
                    <span className="text-right font-medium text-slate-700">
                      Monitored Anesthesia (MAC)<br />
                      <span className="text-[10px] text-emerald-700 font-bold">Tier 1 Standby Cleared</span>
                    </span>
                  </div>
                </div>

                {/* Prerequisite Pipeline Mini */}
                <div className="border-t border-slate-100 pt-3 flex flex-col gap-1.5 text-[11px]">
                  <span className="font-bold text-slate-400 uppercase text-[9px] tracking-wider">
                    PREREQUISITE CLEARANCE PIPELINE
                  </span>
                  <div className="flex items-center justify-between text-slate-700">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="size-3 text-emerald-600" /> Financial Authorization
                    </span>
                    <span className="font-semibold text-emerald-700">Ratified (15% Cash Disc)</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-700">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="size-3 text-emerald-600" /> Informed Consent
                    </span>
                    <span className="font-semibold text-emerald-700">Biometric Signed</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-700">
                    <span className="flex items-center gap-1.5">
                      <Clock className="size-3 text-amber-500" /> Metabolic Panel (PT/INR, BMP)
                    </span>
                    <span className="font-semibold text-amber-700">Pre-op Window</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-700">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="size-3 text-emerald-600" /> Escort / Transportation
                    </span>
                    <span className="font-semibold text-slate-800">Spouse Mary Sterling</span>
                  </div>
                </div>

                <div className="bg-slate-50 p-2.5 rounded-lg text-[10px] text-slate-500 leading-relaxed">
                  Automatic priority SMS Alert & Care ID In-App Notification will be dispatched to {offer.patientName} upon confirmation.
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 pt-1">
                  <button
                    type="button"
                    onClick={handleProceedToReview}
                    className="w-full py-3 bg-gradient-to-b from-[#a44cff] to-[#5b14b8] text-white text-xs font-bold rounded-xl shadow-md hover:opacity-95 transition-opacity flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Continue to Confirm Slot</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => navigate(`/treatment-offers/${offer.offerId}/clearance`, { state: offer })}
                    className="w-full py-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <ArrowLeft className="size-3.5" />
                    <span>Back to Clinical Handoff</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => triggerToast('Scheduling cancelled; hold remains active.')}
                    className="text-[11px] text-slate-400 hover:text-slate-600 py-1 text-center cursor-pointer"
                  >
                    ✕ Cancel Scheduling
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* ========================================================================= */}
      {/* MODE 2: SLOT CONFIRMATION & FINAL REVIEW (FIGMA NODE 1:10786)             */}
      {/* ========================================================================= */}
      {mode === 'review' && (
        <main className="flex-1 overflow-y-auto px-8 py-6 max-w-[1280px] w-full mx-auto flex flex-col gap-6 animate-in fade-in">
          {/* Progress Tracker (Figma 1:10786) */}
          <div className="bg-white border border-[#e2e8f0] rounded-[16px] p-4 shadow-[0px_1px_1px_rgba(0,0,0,0.05)] grid grid-cols-3 gap-3 text-xs">
            {/* Step 1 */}
            <div className="flex items-center gap-3 p-2 rounded-xl bg-emerald-50/50 border border-emerald-100">
              <div className="size-7 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                ✓
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">STEP 1 • COMPLETE</span>
                <span className="font-bold text-slate-800">Slot Selection</span>
              </div>
            </div>

            {/* Step 2 (ACTIVE) */}
            <div className="flex items-center gap-3 p-2 rounded-xl bg-purple-50 border-2 border-[#5b14b8] shadow-xs">
              <div className="size-7 rounded-full bg-[#5b14b8] text-white flex items-center justify-center font-bold text-xs shrink-0">
                2
              </div>
              <div>
                <span className="text-[10px] uppercase font-extrabold text-[#3f1d8b] block">CURRENT STEP</span>
                <span className="font-extrabold text-[#3f1d8b]">Confirmation & Final Review</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-50 border border-slate-200 opacity-60">
              <div className="size-7 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-xs shrink-0">
                3
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">UPCOMING</span>
                <span className="font-medium text-slate-600">Scheduled & Dispatched</span>
              </div>
            </div>
          </div>

          {/* Hero Review Banner */}
          <div className="rounded-[16px] bg-white border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#3f1d8b] tracking-wider block">
                PROCEDURAL SLOT LOCKED
              </span>
              <h1 className="text-2xl font-bold tracking-tight text-[#0f172a] mt-0.5">
                Ready to Schedule Cath Lab Procedure
              </h1>
              <p className="text-xs text-slate-500 mt-1 max-w-xl">
                Review clinical order, confirmed procedural slot, prerequisite lab mandates, and patient notification dispatch before final scheduling commitment.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="bg-purple-50 border border-purple-200 p-3 rounded-xl flex flex-col text-right">
                <span className="text-[9px] uppercase font-bold text-purple-700">RESERVED SLOT</span>
                <span className="font-black text-xs text-[#0f172a]">Nov 4, 2026 @ 09:30 AM EST</span>
              </div>
              <div className="bg-cyan-50 border border-cyan-200 p-3 rounded-xl flex flex-col text-right">
                <span className="text-[9px] uppercase font-bold text-cyan-800">FINANCIAL CLEARANCE</span>
                <span className="font-bold text-xs text-cyan-900">Underwriting Locked (100%)</span>
              </div>
            </div>
          </div>

          {/* 2-COLUMN REVIEW MATRIX */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* LEFT 2/3 COLUMN */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              {/* Card 1: Procedural & Facility Specifications */}
              <div className="bg-white border border-[#e2e8f0] rounded-[16px] p-6 shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col gap-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <Building className="size-4 text-[#3f1d8b]" />
                    <h3 className="font-bold text-sm text-[#0f172a]">
                      Procedural & Facility Specifications
                    </h3>
                  </div>
                  <span className="bg-cyan-100 text-cyan-900 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    Cath Lab Suite 3 Locked
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="bg-[#fafafc] border border-slate-200 p-3.5 rounded-xl flex flex-col gap-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400">PROCEDURE DESCRIPTION</span>
                    <span className="font-bold text-[#0f172a]">Diagnostic Cardiac Catheterization & Coronary Angiogram</span>
                    <span className="text-[11px] text-slate-500 font-mono">CPT Code #93458</span>
                  </div>

                  <div className="bg-[#fafafc] border border-slate-200 p-3.5 rounded-xl flex flex-col gap-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400">CLINICAL INDICATION</span>
                    <span className="font-bold text-[#0f172a]">Non-emergent hemodynamic angiogram</span>
                    <span className="text-[11px] text-slate-500">Post abnormal treadmill stress test • Ref #REF-4491</span>
                  </div>

                  <div className="bg-[#fafafc] border border-slate-200 p-3.5 rounded-xl flex flex-col gap-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400">FACILITY LOCATION</span>
                    <span className="font-bold text-[#0f172a]">Mount Sinai Hospital</span>
                    <span className="text-[11px] text-slate-500">Cath Lab Suite 3 (Interventional Wing, 4th Fl)</span>
                  </div>

                  <div className="bg-[#fafafc] border border-slate-200 p-3.5 rounded-xl flex flex-col gap-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400">SURGICAL SCHEDULE & DURATION</span>
                    <span className="font-bold text-[#3f1d8b]">Wed, Nov 4, 2026 • 09:30 AM – 11:00 AM</span>
                    <span className="text-[11px] text-slate-500">90 Mins OR Block Allocation</span>
                  </div>

                  <div className="bg-[#fafafc] border border-slate-200 p-3.5 rounded-xl flex flex-col gap-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400">PATIENT ARRIVAL & BASELINE</span>
                    <span className="font-bold text-[#0f172a]">07:30 AM EST (2 Hours Prior)</span>
                    <span className="text-[11px] text-slate-500">Vascular access prep & baseline vitals</span>
                  </div>

                  <div className="bg-[#fafafc] border border-slate-200 p-3.5 rounded-xl flex flex-col gap-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400">ATTENDING CARDIOLOGIST</span>
                    <span className="font-bold text-[#0f172a]">Dr. Michael Chang, MD</span>
                    <span className="text-[11px] text-slate-500">Cardiology Specialist • State Lic #88392</span>
                  </div>
                </div>

                <div className="bg-purple-50/60 border border-purple-200 p-3 rounded-xl flex items-center justify-between text-xs">
                  <span className="font-bold text-purple-950">DESIGNATED CATH TEAM:</span>
                  <span className="text-purple-900 font-medium">Lead RN K. Vance + Scrub Tech J. Morales + MAC Tier 1 Standby</span>
                  <span className="bg-purple-200 text-purple-800 text-[9px] font-bold px-2 py-0.5 rounded">Roster Confirmed</span>
                </div>
              </div>

              {/* Card 2: Financial Ratification Snapshot */}
              <div className="bg-white border border-[#e2e8f0] rounded-[16px] p-6 shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col gap-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="font-bold text-sm text-[#0f172a]">Financial Ratification Snapshot</h3>
                    <p className="text-xs text-slate-500">Care ID Guaranteed In-House Clearance</p>
                  </div>
                  <span className="bg-cyan-100 text-cyan-900 text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <Lock className="size-2.5" /> Locked & Underwritten
                  </span>
                </div>

                <div className="flex flex-col gap-2 text-xs">
                  <div className="flex justify-between py-1">
                    <span className="text-slate-600">Standard Cath Lab Hospital Facility Fee</span>
                    <span className="font-bold text-slate-800">${offer.baselineFee.toLocaleString()}.00</span>
                  </div>
                  <div className="flex justify-between py-1 text-emerald-700 bg-emerald-50 px-2.5 rounded-lg border border-emerald-100">
                    <span className="font-medium">Prompt Cash Settlement Privilege (15.0% Direct Waiver)</span>
                    <span className="font-bold">-${offer.calculatedDiscount.toLocaleString()}.00</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-t border-slate-200 mt-1">
                    <div>
                      <span className="font-bold text-sm text-slate-800 block">Net Patient Responsibility</span>
                      <span className="text-[11px] text-slate-500">Underwritten under Care ID Zero-Surprise Covenant</span>
                    </div>
                    <span className="text-xl font-black text-[#3f1d8b]">{offer.totalPayable}</span>
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <CreditCard className="size-4 text-[#3f1d8b]" />
                    <span className="font-bold text-slate-800">Care ID 0% APR Plan Active</span>
                    <span className="text-slate-500">• {offer.monthlyInstallment}/month x 12 installments</span>
                  </div>
                  <span className="text-emerald-700 font-semibold text-[11px]">Signed via Mobile App (Oct 19, 2026)</span>
                </div>
              </div>

              {/* Card 3: Patient Preparation & Clinical Instructions */}
              <div className="bg-white border border-[#e2e8f0] rounded-[16px] p-6 shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col gap-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="font-bold text-sm text-[#0f172a]">
                      Patient Preparation & Clinical Instructions
                    </h3>
                    <p className="text-xs text-slate-500">Pre-catheterization safety orders & discharge logistics</p>
                  </div>
                  <span className="text-xs text-slate-400">3 Directives Set</span>
                </div>

                <div className="flex flex-col gap-2.5 text-xs">
                  <div className="bg-purple-50/50 border border-purple-200 p-3 rounded-xl flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#3f1d8b]">NPO Fasting Protocol</span>
                      <span className="bg-rose-100 text-rose-800 text-[9px] font-bold px-1.5 py-0.2 rounded">Mandatory</span>
                    </div>
                    <p className="text-[11px] text-slate-600">
                      Strict fasting (no solids or liquids except essential medication with small sip of water) beginning at 01:30 AM EST on Nov 4 (exactly 8 hours prior to procedure).
                    </p>
                  </div>

                  <div className="bg-[#fafafc] border border-slate-200 p-3 rounded-xl flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-800">Medication Hold Orders & Allergies</span>
                      <span className="bg-amber-100 text-amber-800 text-[9px] font-bold px-1.5 py-0.2 rounded">Safety Check</span>
                    </div>
                    <p className="text-[11px] text-slate-600">
                      Hold Metformin 48 hours prior to contrast dye injection. Confirm zero oral anticoagulants within 24 hours. Penicillin allergy alert confirmed on sterile prep manifold.
                    </p>
                  </div>

                  <div className="bg-[#fafafc] border border-slate-200 p-3 rounded-xl flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-800">Post-Puncture Monitored Discharge</span>
                      <span className="bg-cyan-100 text-cyan-800 text-[9px] font-bold px-1.5 py-0.2 rounded">Same-Day</span>
                    </div>
                    <p className="text-[11px] text-slate-600">
                      Anticipate 4-hour monitored recovery bed stay following femoral/radial access closure. Designated escort verified: Mary Sterling (Spouse). No public transit or driving permitted.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT 1/3 COLUMN */}
            <div className="flex flex-col gap-6">
              {/* Card 1: Prerequisite Gatekeeper */}
              <div className="bg-white border border-[#e2e8f0] rounded-[16px] p-5 shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col gap-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400">
                    PREREQUISITE GATEKEEPER
                  </h4>
                  <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    3 of 5 Complete
                  </span>
                </div>

                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-600 font-medium">Procedure Readiness Gauge</span>
                    <span className="font-bold text-[#3f1d8b]">60%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div className="w-[60%] h-full bg-gradient-to-r from-amber-400 to-[#5b14b8] rounded-full" />
                  </div>
                  <span className="text-[10px] text-amber-700 font-medium mt-1">
                    1 Action required by Nov 2 to guarantee slot
                  </span>
                </div>

                <div className="flex flex-col gap-2 pt-2 text-xs border-t border-slate-100">
                  <div className="flex items-center gap-2 text-emerald-800">
                    <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                    <span>Financial Clearance (Underwritten & confirmed)</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-800">
                    <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                    <span>Biometric Patient Consent (Signed in App)</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-800">
                    <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                    <span>Cath Lab Resource Lock (Suite 3 Reserved)</span>
                  </div>
                  <div className="flex items-center gap-2 text-amber-800 bg-amber-50 p-2 rounded-lg border border-amber-200">
                    <AlertCircle className="size-4 text-amber-600 shrink-0" />
                    <div>
                      <span className="font-bold">Coagulation Panel Order</span>
                      <p className="text-[10px] text-amber-700">PT/INR & Creatinine req #LAB-8821. Draw by Nov 2.</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Clock className="size-4 text-blue-500 shrink-0" />
                    <div>
                      <span>Anesthesia Handoff Clearance</span>
                      <p className="text-[10px] text-slate-400">Scheduled clinical review Nov 2 (NP Rostova)</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: Automated Dispatches */}
              <div className="bg-white border border-[#e2e8f0] rounded-[16px] p-5 shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col gap-3">
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400">
                  AUTOMATED DISPATCHES
                </h4>
                <div className="flex flex-col gap-2 text-xs">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                    <span className="font-medium text-slate-700">Care ID App Push (Digital prep guide)</span>
                    <span className="bg-purple-100 text-purple-800 text-[9px] font-bold px-1.5 py-0.2 rounded">Queued</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                    <span className="font-medium text-slate-700">SMS Priority Alert (+1 555-***-9182)</span>
                    <span className="bg-purple-100 text-purple-800 text-[9px] font-bold px-1.5 py-0.2 rounded">Queued</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                    <span className="font-medium text-slate-700">Email & Calendar ICS (Pre-op attached)</span>
                    <span className="bg-purple-100 text-purple-800 text-[9px] font-bold px-1.5 py-0.2 rounded">Queued</span>
                  </div>
                </div>
                <p className="text-[10px] text-slate-400 leading-relaxed">
                  Procedural hold release requires 48-hour prior clinician notice to allow emergency triage reallocation.
                </p>
              </div>

              {/* Action Box */}
              <div className="bg-white border border-[#e2e8f0] rounded-[16px] p-5 shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col gap-3">
                <button
                  type="button"
                  onClick={handleConfirmBooking}
                  className="w-full py-3 bg-gradient-to-b from-[#a44cff] to-[#5b14b8] text-white text-xs font-bold rounded-xl shadow-md hover:opacity-95 transition-opacity flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Confirm & Schedule Procedure</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={handleBackToSelect}
                  className="w-full py-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Change Procedural Slot</span>
                </button>

                <button
                  type="button"
                  onClick={handleBackToSelect}
                  className="text-xs text-[#3f1d8b] hover:underline text-center cursor-pointer py-1"
                >
                  ← Back to Slot Selection
                </button>

                <div className="border-t border-slate-100 pt-2 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Doctor E-Signature: Authorized</span>
                  <span className="font-bold text-slate-800">Dr. M. Chang</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* ========================================================================= */}
      {/* MODE 3: PROCEDURE SCHEDULED SUCCESSFULLY (FIGMA NODE 1:11274)            */}
      {/* ========================================================================= */}
      {mode === 'confirmed' && (
        <main className="flex-1 overflow-y-auto px-8 py-6 max-w-[1280px] w-full mx-auto flex flex-col gap-6 animate-in fade-in">
          {/* HERO SUCCESS BANNER (Deep Purple Gradient into Dark Indigo - Figma 1:11274) */}
          <div className="relative rounded-[16px] overflow-hidden bg-gradient-to-r from-[#28006d] via-[#1e1b4b] to-[#28006d] text-white p-6 shadow-md border border-purple-900/50 flex flex-col gap-4">
            <div className="flex items-start gap-4">
              <div className="size-12 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center shrink-0 text-emerald-300">
                <CheckCircle2 className="size-7 stroke-[2.5]" />
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full">
                    SCHEDULE LOCK VERIFIED
                  </span>
                  <span className="text-purple-300 text-xs font-mono">• Care ID Core Engine</span>
                </div>
                <h1 className="text-2xl font-bold tracking-tight text-white">
                  Procedure Scheduled Successfully
                </h1>
                <p className="text-xs text-purple-100/90 leading-relaxed max-w-3xl">
                  Diagnostic Cardiac Catheterization & Coronary Angiogram officially booked and locked into Mount Sinai Cath Lab Suite 3. Automated patient prep instructions, fasting guidelines, and calendar invitations have been securely dispatched.
                </p>
              </div>
            </div>

            {/* 5-Metric Quick Bar */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 pt-3 border-t border-purple-800/60 text-xs">
              <div>
                <span className="text-[10px] uppercase font-bold text-purple-300 block">APPOINTMENT ID</span>
                <span className="font-mono font-bold text-white">#PROC-2026-93458</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-purple-300 block">SCHEDULED SLOT</span>
                <span className="font-bold text-cyan-300">Wed, Nov 4 • 09:30 AM</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-purple-300 block">FACILITY & SUITE</span>
                <span className="font-bold text-white">Mount Sinai • Suite 3</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-purple-300 block">ATTENDING OPERATOR</span>
                <span className="font-bold text-white">Dr. Michael Chang, MD</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-purple-300 block">LOCKED TIMESTAMP</span>
                <span className="font-bold text-slate-300">Oct 19, 2026 • 02:45 PM</span>
              </div>
            </div>
          </div>

          {/* PROCEDURAL BOOKING LIFECYCLE STEPPER */}
          <div className="bg-white border border-[#e2e8f0] rounded-[16px] p-5 shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-xs uppercase tracking-wider text-[#0f172a]">
                PROCEDURAL BOOKING LIFECYCLE
              </h3>
              <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                Phase 5 of 6 Completed
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-6 gap-2.5 text-center">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col items-center gap-1">
                <CheckCircle2 className="size-4 text-emerald-600" />
                <span className="text-xs font-bold text-slate-800">01 Treatment Approved</span>
                <span className="text-[10px] text-slate-400">Cleared Oct 14</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col items-center gap-1">
                <CheckCircle2 className="size-4 text-emerald-600" />
                <span className="text-xs font-bold text-slate-800">02 Financial Clearance</span>
                <span className="text-[10px] text-slate-400">Care ID 0% Plan</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col items-center gap-1">
                <CheckCircle2 className="size-4 text-emerald-600" />
                <span className="text-xs font-bold text-slate-800">03 Clinical Handoff</span>
                <span className="text-[10px] text-slate-400">EHR Dossier Routed</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col items-center gap-1">
                <CheckCircle2 className="size-4 text-emerald-600" />
                <span className="text-xs font-bold text-slate-800">04 Slot Selected</span>
                <span className="text-[10px] text-slate-400">Cath Suite 3 Held</span>
              </div>
              <div className="p-2.5 rounded-xl bg-purple-50 border-2 border-[#5b14b8] flex flex-col items-center gap-1 shadow-xs">
                <div className="size-4 rounded-full bg-[#5b14b8] flex items-center justify-center">
                  <span className="size-1.5 rounded-full bg-white animate-pulse" />
                </div>
                <span className="text-xs font-extrabold text-[#3f1d8b]">05 Procedure Scheduled</span>
                <span className="text-[10px] text-purple-700 font-bold">Confirmed Just Now</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-dashed border-cyan-300 flex flex-col items-center gap-1">
                <Calendar className="size-4 text-cyan-600" />
                <span className="text-xs font-bold text-slate-800">06 Pre-Op Prep</span>
                <span className="text-[10px] text-cyan-700 font-bold">Lab draw due Nov 2</span>
              </div>
            </div>
          </div>

          {/* 2-COLUMN CONFIRMED WORKSPACE */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* LEFT 2/3 COLUMN */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              {/* Card 1: Confirmed Procedural Record */}
              <div className="bg-white border border-[#e2e8f0] rounded-[16px] p-6 shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col gap-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <Activity className="size-4 text-[#3f1d8b]" />
                    <h3 className="font-bold text-sm text-[#0f172a]">
                      Confirmed Procedural Record
                    </h3>
                  </div>
                  <span className="bg-purple-100 text-[#3f1d8b] text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                    Mount Sinai Cath Bay #4
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="bg-[#fafafc] border border-slate-200 p-3.5 rounded-xl flex flex-col gap-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400">PROCEDURAL SCOPE</span>
                    <span className="font-bold text-[#0f172a]">Diagnostic Coronary Angiogram</span>
                    <span className="text-[11px] text-slate-500">Left heart catheterization, ventriculography</span>
                  </div>

                  <div className="bg-[#fafafc] border border-slate-200 p-3.5 rounded-xl flex flex-col gap-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400">PATIENT ARRIVAL WINDOW</span>
                    <span className="font-bold text-[#0f172a]">07:30 AM EST • Nov 4, 2026</span>
                    <span className="text-[11px] text-slate-500">Pre-op prep & IV access bay (2 hrs prior)</span>
                  </div>

                  <div className="bg-[#fafafc] border border-slate-200 p-3.5 rounded-xl flex flex-col gap-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400">ATTENDING CARDIOLOGIST</span>
                    <span className="font-bold text-[#0f172a]">Dr. Michael Chang, MD</span>
                    <span className="text-[11px] text-slate-500">NY State License #88392 • Interventional</span>
                  </div>

                  <div className="bg-[#fafafc] border border-slate-200 p-3.5 rounded-xl flex flex-col gap-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400">ANESTHESIA PROTOCOL</span>
                    <span className="font-bold text-[#0f172a]">MAC Tier 1 Standby</span>
                    <span className="text-[11px] text-slate-500">Mild conscious sedation / Local lidocaine 1%</span>
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <MapPin className="size-5 text-[#3f1d8b] shrink-0" />
                    <div>
                      <span className="font-bold text-slate-800 block">Mount Sinai Hospital • Main Interventional Campus</span>
                      <span className="text-[11px] text-slate-500">1468 Madison Ave, 3rd Floor Cath Lab Pavilion, New York, NY</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => triggerToast('Directions copied to clipboard.')}
                    className="border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold px-3 py-1.5 rounded-lg text-xs cursor-pointer shadow-2xs"
                  >
                    Directions
                  </button>
                </div>

                <div className="bg-emerald-50/60 border border-emerald-200 p-3 rounded-xl flex items-center justify-between text-xs text-emerald-900">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                    <span>Care ID Patient Financial Lock Underwritten: Total Protected Amount: $4,420.00 • Agreement #FIN-TR8921-12M (0% APR)</span>
                  </div>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0">
                    Guaranteed Settled
                  </span>
                </div>
              </div>

              {/* Card 2: Automatic Patient Dispatch Status */}
              <div className="bg-white border border-[#e2e8f0] rounded-[16px] p-6 shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col gap-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <Send className="size-4 text-[#3f1d8b]" />
                    <h3 className="font-bold text-sm text-[#0f172a]">
                      Automatic Patient Dispatch Status
                    </h3>
                  </div>
                  <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                    <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                    Live Dispatch Verification
                  </span>
                </div>

                <div className="flex flex-col gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <Smartphone className="size-4 text-purple-700 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-slate-800">Care ID Patient App Instant Push</span>
                        <p className="text-[11px] text-slate-500">Delivered with interactive Fasting Guidelines & NPO countdown clock.</p>
                        <span className="text-[10px] text-slate-400">Device: iPhone 15 Pro • Token verified • Acknowledged by patient</span>
                      </div>
                    </div>
                    <span className="bg-cyan-100 text-cyan-900 text-[10px] font-bold px-2 py-0.5 rounded">Delivered</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <Send className="size-4 text-purple-700 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-slate-800">SMS Priority Link & GPS Wayfinding</span>
                        <p className="text-[11px] text-slate-500">Direct SMS routed to Robert J. Sterling (+1 555-***-9182).</p>
                        <span className="text-[10px] text-slate-400">Carriers: Verizon Wireless • Delivery Receipt #SMS-884920</span>
                      </div>
                    </div>
                    <span className="bg-cyan-100 text-cyan-900 text-[10px] font-bold px-2 py-0.5 rounded">Delivered</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <QrCode className="size-4 text-purple-700 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-slate-800">Digital Health ID Card Sync</span>
                        <p className="text-[11px] text-slate-500">Cath Lab Fast-Track digital pass added to Apple Wallet & Google Wallet.</p>
                        <span className="text-[10px] text-slate-400">NFC Check-In Beacon enabled for Mount Sinai Pavilion Entrance</span>
                      </div>
                    </div>
                    <span className="bg-cyan-100 text-cyan-900 text-[10px] font-bold px-2 py-0.5 rounded">Synced</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <User className="size-4 text-purple-700 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-slate-800">Designated Escort Notification</span>
                        <p className="text-[11px] text-slate-500">Mary Sterling (Spouse) notified of mandatory discharge pick-up criteria.</p>
                        <span className="text-[10px] text-slate-400">Required for same-day outpatient post-sedation release</span>
                      </div>
                    </div>
                    <span className="bg-emerald-100 text-emerald-900 text-[10px] font-bold px-2 py-0.5 rounded">Confirmed</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT 1/3 COLUMN */}
            <div className="flex flex-col gap-6">
              {/* Card 1: Required Clinical Milestones */}
              <div className="bg-white border border-[#e2e8f0] rounded-[16px] p-5 shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col gap-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400">
                    Required Clinical Milestones
                  </h4>
                </div>

                <div className="flex flex-col gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200 flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-amber-950">Pre-Procedure Lab Draw</span>
                      <span className="bg-amber-100 text-amber-900 text-[9px] font-bold px-1.5 py-0.2 rounded">
                        Due Nov 2 • 12:00 PM
                      </span>
                    </div>
                    <p className="text-[11px] text-amber-800">
                      Panel: PT/INR, BMP, CBC, Serum Creatinine with GFR. Results must populate EHR prior to contrast dye authorization.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-blue-50/60 border border-blue-200 flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-blue-950">Pre-Op Anesthesia Clearance Call</span>
                      <span className="bg-blue-100 text-blue-900 text-[9px] font-bold px-1.5 py-0.2 rounded">
                        Nov 2 • 03:00 PM
                      </span>
                    </div>
                    <p className="text-[11px] text-blue-800">
                      Mount Sinai Pre-Admission Testing (PAT) phone assessment. Penicillin cross-reactivity and airway evaluation.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-800">Suite 3 Sterile Manifold Prep</span>
                      <span className="bg-slate-200 text-slate-700 text-[9px] font-bold px-1.5 py-0.2 rounded">
                        Nov 4 • 08:30 AM
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Sterile radial access sheath kit & pressure transducer calibration locked for Dr. Michael Chang.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 2: Physician Action Console */}
              <div className="bg-white border border-[#e2e8f0] rounded-[16px] p-5 shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col gap-3">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  PHYSICIAN ACTION CONSOLE
                </span>

                <button
                  type="button"
                  onClick={handleGoToAppointmentDetails}
                  className="w-full py-3 bg-gradient-to-b from-[#a44cff] to-[#5b14b8] text-white text-xs font-bold rounded-xl shadow-md hover:opacity-95 transition-opacity flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>View Scheduled Procedure & Appointment Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={handleGoToPreOpChecklist}
                  className="w-full py-2.5 border border-purple-200 bg-purple-50/60 hover:bg-purple-100 text-[#3f1d8b] text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <Activity className="size-4" />
                  <span>Inspect Pre-Procedure Readiness Checklist</span>
                </button>

                <button
                  type="button"
                  onClick={() => navigate(`/patients/${offer.patientId}`)}
                  className="text-xs text-slate-600 hover:text-slate-900 py-1 text-center cursor-pointer"
                >
                  ← Return to {offer.patientName} Clinical Profile
                </button>

                <button
                  type="button"
                  onClick={() => triggerToast('Booking Dossier & Consent PDF exported.')}
                  className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-700 font-semibold hover:text-[#3f1d8b] cursor-pointer"
                >
                  <span className="flex items-center gap-1.5">
                    <FileText className="size-3.5 text-slate-500" />
                    Booking Dossier & Consent PDF
                  </span>
                  <span className="text-purple-700 font-bold">Download</span>
                </button>
              </div>

              {/* Card 3: Cryptographic EHR Verification */}
              <div className="bg-slate-50 border border-slate-200 rounded-[16px] p-4 flex flex-col gap-2 text-xs">
                <div className="flex items-center gap-1.5 text-slate-800 font-bold">
                  <ShieldCheck className="size-4 text-emerald-600" />
                  <span>Cryptographic EHR Verification</span>
                </div>
                <p className="text-[10px] text-slate-500 leading-relaxed">
                  This scheduling transaction has been sealed using Care ID's SHA-256 integrity ledger. All pre-op parameters comply with HIPAA Security Rule 45 CFR Part 164.
                </p>
                <div className="bg-white p-2 rounded border border-slate-200 font-mono text-[9px] text-slate-600 break-all">
                  SHA256: 4b91f638c502e8f118de00184bba74902b7c7a5128106c820a
                </div>
                <div className="flex justify-between items-center text-[10px] text-slate-500 pt-1">
                  <span>Signed: Michael Chang, MD</span>
                  <span className="text-emerald-700 font-bold">Status: Validated & Immutable</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* FOOTER */}
      <footer className="h-12 border-t border-[#e1e3e4] bg-[#f8f9fa] px-8 flex items-center justify-between text-[11px] text-slate-500 mt-auto shrink-0">
        <div className="flex items-center gap-2">
          <span>Care ID Enterprise Health Platform • Hospital Policy Standard 2026</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-emerald-700 font-semibold flex items-center gap-1">
            <ShieldCheck className="size-3.5" />
            Scheduling Ledger Active
          </span>
          <Link to="/settings" className="hover:underline">Privacy & Terms</Link>
          <Link to="/settings" className="hover:underline">Help Center</Link>
        </div>
      </footer>
    </div>
  );
};
