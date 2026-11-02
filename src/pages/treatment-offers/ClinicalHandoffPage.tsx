import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  Calendar,
  ExternalLink,
  ShieldCheck,
  Clock,
  Bell,
  User,
  Plus,
  Activity,
  FileSpreadsheet,
  AlertCircle,
  ChevronRight,
} from 'lucide-react';
import { TreatmentOfferState, DEFAULT_OFFER_STATE } from './types';

export const ClinicalHandoffPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Load offer state from navigation payload or default fallback
  const offer = (location.state as TreatmentOfferState) || DEFAULT_OFFER_STATE;

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleAdvanceToScheduling = () => {
    navigate(`/treatment-offers/${offer.offerId}/schedule`, { state: offer });
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

      {/* TOP WORKSPACE HEADER (Figma 1:9573) */}
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
          <Link to={`/patients/${offer.patientId}/financing`} className="hover:text-slate-800 transition-colors">
            Insurance & Financing
          </Link>
          <span>/</span>
          <Link to={`/treatment-offers/${offer.offerId}/status`} className="hover:text-slate-800 transition-colors">
            Offer #{offer.offerId}
          </Link>
          <span>/</span>
          <span className="bg-purple-100 text-[#3f1d8b] font-bold px-2 py-0.5 rounded text-[11px]">
            Clinical Handoff
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

      {/* MAIN WORKSPACE CONTENT */}
      <main className="flex-1 overflow-y-auto px-8 py-6 max-w-[1280px] w-full mx-auto flex flex-col gap-6">
        {/* Navigation Action Strip */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => navigate(`/treatment-offers/${offer.offerId}/accepted`, { state: offer })}
              className="border border-[#e2e8f0] bg-white hover:bg-slate-50 text-[#334155] text-[12px] font-bold px-3.5 py-1.5 rounded-full flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-slate-500" />
              <span>Back to Offer Ratification</span>
            </button>
            <button
              type="button"
              onClick={() => navigate(`/patients/${offer.patientId}`)}
              className="border border-[#e2e8f0] bg-white hover:bg-slate-50 text-[#334155] text-[12px] font-bold px-3.5 py-1.5 rounded-full flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
              <span>View Full Profile</span>
            </button>
          </div>
        </div>

        {/* PATIENT CONTEXT CAPSULE (Physical ID Metaphor - Figma 1:9573) */}
        <div className="bg-white border border-[#e2e8f0] content-stretch flex items-center justify-between p-5 relative rounded-[16px] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] w-full">
          <div className="flex items-center gap-4">
            <div className="w-[52px] h-[52px] rounded-[12px] bg-[#3f1d8b] text-white flex items-center justify-center font-bold text-[18px] tracking-wide shrink-0 shadow-sm">
              RS
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-[18px] font-bold text-[#0f172a] leading-tight tracking-tight">
                  {offer.patientName}
                </h1>
                <span className="text-xs text-slate-400 font-mono">CID {offer.patientCid}</span>
                <span className="bg-cyan-50 text-cyan-800 border border-cyan-200 text-[11px] font-bold px-2 py-0.5 rounded-full">
                  Self-Pay + Prompt Settlement Confirmed
                </span>
              </div>
              <div className="flex items-center gap-2 text-[12px] text-[#64748b] font-medium flex-wrap">
                <span>45 y/o (Male)</span>
                <span>•</span>
                <span>Blood: {offer.patientBlood}</span>
                <span>•</span>
                <span className="bg-rose-50 text-rose-700 border border-rose-200 text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <AlertTriangle className="size-3" />
                  Allergy: Penicillin (Severe)
                </span>
              </div>
            </div>
          </div>

          <div className="bg-[#fafafc] border border-slate-200 p-3 rounded-xl flex flex-col gap-1 text-right min-w-[240px]">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              DESIGNATED CLINICAL TARGET
            </span>
            <span className="text-xs font-extrabold text-[#0f172a] leading-snug">
              Cardiac Catheterization & Angiogram
            </span>
            <span className="text-[11px] text-slate-500 font-mono">
              CPT Code #93458 • Outpatient Tier 1
            </span>
          </div>
        </div>

        {/* HERO STATUS / CLINICAL HANDOFF BANNER (Figma 1:9573 - Deep Indigo) */}
        <div className="relative rounded-[16px] overflow-hidden bg-gradient-to-r from-[#1e1b4b] via-[#312e81] to-[#1e1b4b] text-white p-6 shadow-md border border-indigo-900/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4 max-w-2xl">
            <div className="size-12 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center shrink-0 text-cyan-300">
              <CheckCircle2 className="size-7 stroke-[2.5]" />
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-bold tracking-tight text-white">
                Treatment Cleared to Proceed — Clinical Handoff Complete
              </h2>
              <p className="text-xs text-indigo-100/90 leading-relaxed">
                Financial clearance completed and biometric patient sign-off ratified. {offer.patientName} is fully authorized and released for Cath Lab procedural slot scheduling and pre-op clinical clearance.
              </p>
              <div className="flex items-center gap-2 flex-wrap pt-1">
                <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full">
                  FINANCIALLY CLEARED (100%)
                </span>
                <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full">
                  FINANCING RATIFIED: 0% APR (12-MO)
                </span>
                <span className="bg-purple-500/20 text-purple-300 border border-purple-400/30 text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full">
                  PROCEDURAL CLEARANCE: ACTIVE
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start md:items-end gap-1.5 shrink-0 bg-indigo-950/60 p-4 rounded-xl border border-indigo-800/40">
            <span className="text-[10px] uppercase font-bold tracking-wider text-cyan-300">
              DIGITAL AUTHORIZATION SEAL
            </span>
            <span className="text-xs font-bold text-white">
              Oct 19, 2026 • 2:15 PM EST
            </span>
            <span className="text-[11px] text-indigo-200 font-mono">
              FST #{offer.offerId} | v1.0 Final
            </span>
            <span className="text-[11px] text-indigo-200 font-mono">
              Plan #FIN-TR8921-12M
            </span>
          </div>
        </div>

        {/* CLINICAL HANDOFF & BOOKING PIPELINE STEPPER (Figma 1:9573) */}
        <div className="bg-white border border-[#e2e8f0] rounded-[16px] p-5 shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#3f1d8b]" />
              <h3 className="font-bold text-xs uppercase tracking-wider text-[#0f172a]">
                Clinical Handoff & Booking Pipeline
              </h3>
            </div>
            <span className="bg-cyan-50 text-cyan-800 border border-cyan-200 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
              Gate 4 of 5 Passed
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {/* Stage 1 */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-slate-400">STAGE 1</span>
                <CheckCircle2 className="size-3.5 text-emerald-600" />
              </div>
              <span className="text-xs font-bold text-slate-800">Financial Review</span>
              <span className="text-[10px] text-slate-500">15% Discount Applied (-$780)</span>
            </div>

            {/* Stage 2 */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-slate-400">STAGE 2</span>
                <CheckCircle2 className="size-3.5 text-emerald-600" />
              </div>
              <span className="text-xs font-bold text-slate-800">Patient Authorization</span>
              <span className="text-[10px] text-slate-500">Biometric Digital Consent</span>
            </div>

            {/* Stage 3 */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-slate-400">STAGE 3</span>
                <CheckCircle2 className="size-3.5 text-emerald-600" />
              </div>
              <span className="text-xs font-bold text-slate-800">Plan Confirmed</span>
              <span className="text-[10px] text-slate-500">0% APR • {offer.monthlyInstallment}/mo</span>
            </div>

            {/* Stage 4 (CURRENT) */}
            <div className="bg-purple-50 border-2 border-[#5b14b8] rounded-xl p-3 flex flex-col gap-1 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-[#3f1d8b]">STAGE 4 • ACTIVE</span>
                <span className="size-2 rounded-full bg-[#5b14b8] animate-pulse" />
              </div>
              <span className="text-xs font-extrabold text-[#3f1d8b]">Clinical Handoff</span>
              <span className="text-[10px] text-purple-700 font-semibold">Treatment Cleared</span>
            </div>

            {/* Stage 5 (NEXT) */}
            <div className="bg-slate-50 border border-dashed border-cyan-300 rounded-xl p-3 flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-slate-400">STAGE 5 • NEXT ACTION</span>
                <Calendar className="size-3.5 text-cyan-600" />
              </div>
              <span className="text-xs font-bold text-slate-800">Cath Lab Slot Hold</span>
              <span className="text-[10px] text-cyan-700 font-bold">Ready to Confirm</span>
            </div>
          </div>
        </div>

        {/* 2-COLUMN MAIN CONTENT (Figma 1:9573) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT 2/3 COLUMN */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Card 1: Primary Treatment Summary */}
            <div className="bg-white border border-[#e2e8f0] rounded-[16px] p-6 shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[#3f1d8b]" />
                  <h3 className="font-bold text-sm text-[#0f172a]">
                    Primary Treatment Summary
                  </h3>
                </div>
                <span className="bg-cyan-50 text-cyan-800 border border-cyan-200 text-[11px] font-bold px-2 py-0.5 rounded-full">
                  Underwritten
                </span>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                  PROCEDURE NAME & CODE • CPT #93458
                </span>
                <h4 className="font-bold text-base text-[#0f172a] mt-0.5">
                  Diagnostic Cardiac Catheterization & Coronary Angiogram
                </h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Clinical Indication: Non-emergent hemodynamic angiogram scheduled following abnormal treadmill stress test (Linked Referral #REF-4491 from Dr. Sarah Lin, FACC).
                </p>
              </div>

              {/* 4-Metric Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                <div className="bg-[#fafafc] border border-slate-200 p-3.5 rounded-xl flex flex-col gap-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400">FACILITY & DEPARTMENT</span>
                  <span className="font-bold text-xs text-[#0f172a]">Mount Sinai Hospital</span>
                  <span className="text-[11px] text-slate-500">Outpatient Cardiac Recovery Tier 1 • Cath Lab Suite 3</span>
                </div>

                <div className="bg-[#fafafc] border border-slate-200 p-3.5 rounded-xl flex flex-col gap-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400">SUPERVISING ATTENDING</span>
                  <div className="flex items-center gap-1.5">
                    <User className="size-3.5 text-[#3f1d8b]" />
                    <span className="font-bold text-xs text-[#0f172a]">Dr. Michael Chang, MD</span>
                  </div>
                  <span className="text-[11px] text-slate-500">Cardiology Specialist • Lic #88392</span>
                </div>

                <div className="bg-[#fafafc] border border-slate-200 p-3.5 rounded-xl flex flex-col gap-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400">FINANCIAL TERMS LOCKED</span>
                  <span className="font-bold text-xs text-[#3f1d8b]">Net Responsibility: {offer.totalPayable}</span>
                  <span className="text-[11px] text-slate-500">
                    Baseline ${offer.baselineFee.toLocaleString()} (-${offer.calculatedDiscount} Disc) • {offer.monthlyInstallment}/mo × 12 mos • 0% APR
                  </span>
                </div>

                <div className="bg-cyan-50/50 border border-cyan-200 p-3.5 rounded-xl flex flex-col gap-1">
                  <span className="text-[10px] uppercase font-bold text-cyan-800">PROCEDURAL HOLD WINDOW</span>
                  <span className="font-bold text-xs text-cyan-900">Nov 4, 2026 • 09:30 AM EST</span>
                  <span className="text-[11px] text-cyan-700 font-medium">
                    Hold Slot Active • Suite 3 Requires physician 1-click confirm
                  </span>
                </div>
              </div>
            </div>

            {/* Card 2: Pre-Treatment Requirements & Readiness */}
            <div className="bg-white border border-[#e2e8f0] rounded-[16px] p-6 shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="font-bold text-sm text-[#0f172a]">
                    Pre-Treatment Requirements & Readiness
                  </h3>
                  <p className="text-xs text-slate-500">Gatekeeper checklist before day of catheterization</p>
                </div>
                <span className="bg-purple-100 text-[#3f1d8b] text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                  3 of 7 Complete
                </span>
              </div>

              <div className="flex flex-col gap-2.5">
                {/* 1 */}
                <div className="flex items-start justify-between p-3 rounded-xl bg-emerald-50/40 border border-emerald-100 text-xs">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="size-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-800">1. Financial Authorization & Settlement</span>
                      <p className="text-[11px] text-slate-500">Prompt cash settlement & 0% APR plan underwritten and ratified.</p>
                    </div>
                  </div>
                  <span className="bg-emerald-100 text-emerald-800 text-[9px] font-bold px-2 py-0.5 rounded-full shrink-0">
                    COMPLETED
                  </span>
                </div>

                {/* 2 */}
                <div className="flex items-start justify-between p-3 rounded-xl bg-emerald-50/40 border border-emerald-100 text-xs">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="size-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-800">2. Informed Consent & Digital Authorization</span>
                      <p className="text-[11px] text-slate-500">Signed by {offer.patientName} via Care ID App on Oct 19, 2:15 PM EST.</p>
                    </div>
                  </div>
                  <span className="bg-emerald-100 text-emerald-800 text-[9px] font-bold px-2 py-0.5 rounded-full shrink-0">
                    COMPLETED
                  </span>
                </div>

                {/* 3 */}
                <div className="flex items-start justify-between p-3 rounded-xl bg-purple-50/40 border border-purple-100 text-xs">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="size-4 text-[#3f1d8b] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-800">3. Treatment Offer & Financing Agreement</span>
                      <p className="text-[11px] text-slate-500">Offer #{offer.offerId} v1.0 Final archived into permanent record vault.</p>
                    </div>
                  </div>
                  <span className="bg-purple-100 text-[#3f1d8b] text-[9px] font-bold px-2 py-0.5 rounded-full shrink-0">
                    RATIFIED
                  </span>
                </div>

                {/* 4 */}
                <div className="flex items-start justify-between p-3 rounded-xl bg-amber-50/50 border border-amber-200 text-xs">
                  <div className="flex items-start gap-2.5">
                    <AlertCircle className="size-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-800">4. Pre-Procedure Metabolic & Coagulation Panel</span>
                      <p className="text-[11px] text-amber-800">Lab requisition order pending specimen collection. Fasting 8 hrs required prior.</p>
                    </div>
                  </div>
                  <span className="bg-amber-100 text-amber-900 text-[9px] font-bold px-2 py-0.5 rounded-full shrink-0">
                    REQUIRED
                  </span>
                </div>

                {/* 5 */}
                <div className="flex items-start justify-between p-3 rounded-xl bg-blue-50/50 border border-blue-200 text-xs">
                  <div className="flex items-start gap-2.5">
                    <Clock className="size-4 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-800">5. Pre-Op Anesthesia & Clinical Clearance</span>
                      <p className="text-[11px] text-blue-800">Scheduled clinical review with NP Elena Rostova on Nov 2, 2026 at 11:00 AM.</p>
                    </div>
                  </div>
                  <span className="bg-blue-100 text-blue-900 text-[9px] font-bold px-2 py-0.5 rounded-full shrink-0">
                    PENDING
                  </span>
                </div>

                {/* 6 */}
                <div className="flex items-start justify-between p-3 rounded-xl bg-cyan-50/50 border border-cyan-200 text-xs">
                  <div className="flex items-start gap-2.5">
                    <Calendar className="size-4 text-cyan-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-800">6. Cath Lab Slot Confirmation & Check-In</span>
                      <p className="text-[11px] text-cyan-800">Tentative hold Nov 4, 2026 at 09:30 AM awaiting doctor 1-click confirmation.</p>
                    </div>
                  </div>
                  <span className="bg-cyan-100 text-cyan-900 text-[9px] font-bold px-2 py-0.5 rounded-full shrink-0">
                    READY TO BOOK
                  </span>
                </div>

                {/* 7 */}
                <div className="flex items-start justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="size-4 text-slate-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-800">7. Patient Transportation & Post-Cath Escort</span>
                      <p className="text-[11px] text-slate-500">Patient spouse Mary Sterling designated and confirmed as day-of transport.</p>
                    </div>
                  </div>
                  <span className="bg-slate-200 text-slate-700 text-[9px] font-bold px-2 py-0.5 rounded-full shrink-0">
                    NOTED
                  </span>
                </div>
              </div>
            </div>

            {/* Card 3: Linked Records & Diagnostic Vault */}
            <div className="bg-white border border-[#e2e8f0] rounded-[16px] p-6 shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <FileSpreadsheet className="w-4 h-4 text-[#3f1d8b]" />
                  <h3 className="font-bold text-sm text-[#0f172a]">
                    Linked Records & Diagnostic Vault
                  </h3>
                </div>
                <span className="text-xs text-slate-500">3 Files Packaged</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {/* File 1 */}
                <div className="bg-[#fafafc] border border-slate-200 p-3.5 rounded-xl flex flex-col justify-between gap-2">
                  <div>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-purple-700 block">ECG TRACE</span>
                    <h5 className="font-bold text-xs text-slate-800 mt-0.5">Abnormal Stress ECG Report</h5>
                    <p className="text-[10px] text-slate-400">PDF • Oct 12, 2026 • 2.4 MB</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => triggerToast('Stress ECG Report opened.')}
                    className="text-[#3f1d8b] hover:underline text-[11px] font-bold text-left flex items-center gap-1 cursor-pointer pt-1"
                  >
                    <span>Inspect Findings</span>
                    <ArrowRight className="size-3" />
                  </button>
                </div>

                {/* File 2 */}
                <div className="bg-[#fafafc] border border-slate-200 p-3.5 rounded-xl flex flex-col justify-between gap-2">
                  <div>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-cyan-700 block">ECHO STUDY</span>
                    <h5 className="font-bold text-xs text-slate-800 mt-0.5">Pre-Cath Echocardiogram</h5>
                    <p className="text-[10px] text-slate-400">DICOM Encapsulated • Oct 14</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigate('/records/imaging')}
                    className="text-[#3f1d8b] hover:underline text-[11px] font-bold text-left flex items-center gap-1 cursor-pointer pt-1"
                  >
                    <span>View Imaging</span>
                    <ArrowRight className="size-3" />
                  </button>
                </div>

                {/* File 3 */}
                <div className="bg-[#fafafc] border border-slate-200 p-3.5 rounded-xl flex flex-col justify-between gap-2">
                  <div>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-700 block">FINANCIAL PLAN</span>
                    <h5 className="font-bold text-xs text-slate-800 mt-0.5">Signed Financing Contract</h5>
                    <p className="text-[10px] text-slate-400 font-mono">SHA256: 7f89b...318e</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => triggerToast('Opening signed financing contract ratification...')}
                    className="text-[#3f1d8b] hover:underline text-[11px] font-bold text-left flex items-center gap-1 cursor-pointer pt-1"
                  >
                    <span>View Ratification</span>
                    <ArrowRight className="size-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT 1/3 COLUMN */}
          <div className="flex flex-col gap-6">
            {/* Card 1: Focus Card: Procedural Appointment Scheduling */}
            <div className="bg-white border-2 border-purple-300 rounded-[16px] p-5 shadow-sm flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="bg-purple-100 text-[#3f1d8b] text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase">
                  Next Procedural Step
                </span>
                <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                  Slot Hold Locked
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="font-bold text-base text-[#0f172a]">
                  Procedural Appointment Scheduling
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Financial underwriting is locked. {offer.patientName} has an active tentative hold for Mount Sinai Cath Lab Suite 3 on Wednesday, Nov 4, 2026 at 09:30 AM. Confirm this clinical slot now or select an alternative available time.
                </p>
              </div>

              {/* Detail Box */}
              <div className="bg-purple-50/50 border border-purple-200 rounded-xl p-3.5 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-[#0f172a]">Cath Lab Suite 3 (Interventional)</span>
                  <span className="bg-cyan-100 text-cyan-800 text-[9px] font-bold px-2 py-0.5 rounded-full">
                    HOLDING
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-700 font-semibold">
                  <Calendar className="size-3.5 text-[#3f1d8b]" />
                  <span>Nov 4, 2026 • 09:30 AM EST</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                  <Clock className="size-3 text-slate-400" />
                  <span>Pre-op arrival window: 07:30 AM (2 hours prior)</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleAdvanceToScheduling}
                  className="w-full py-3 bg-gradient-to-b from-[#a44cff] to-[#5b14b8] text-white text-xs font-bold rounded-xl shadow-md hover:opacity-95 transition-opacity flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Schedule / Confirm Cath Lab Slot</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={handleAdvanceToScheduling}
                  className="w-full py-2.5 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl transition-colors shadow-2xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-slate-500" />
                  <span>Select Alternative Available Slot</span>
                </button>
              </div>
            </div>

            {/* Card 2: Clinician Quick Links & Actions */}
            <div className="bg-white border border-[#e2e8f0] rounded-[16px] p-5 shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col gap-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400">
                Clinician Quick Links & Actions
              </h4>
              <div className="flex flex-col gap-1 text-xs">
                <Link
                  to={`/patients/${offer.patientId}`}
                  className="py-2 px-2.5 rounded-lg hover:bg-slate-50 text-slate-700 font-medium flex items-center justify-between"
                >
                  <span>View Patient Clinical Profile</span>
                  <ChevronRight className="size-3.5 text-slate-400" />
                </Link>
                <Link
                  to="/records"
                  className="py-2 px-2.5 rounded-lg hover:bg-slate-50 text-slate-700 font-medium flex items-center justify-between"
                >
                  <span>View Medical Records & ECG Timeline</span>
                  <ChevronRight className="size-3.5 text-slate-400" />
                </Link>
                <Link
                  to={`/treatment-offers/${offer.offerId}/accepted`}
                  className="py-2 px-2.5 rounded-lg hover:bg-slate-50 text-slate-700 font-medium flex items-center justify-between"
                >
                  <span>View Ratified Plan & In-House Terms</span>
                  <ChevronRight className="size-3.5 text-slate-400" />
                </Link>
                <button
                  type="button"
                  onClick={() => triggerToast('Treatment Agreement downloaded (PDF).')}
                  className="py-2 px-2.5 rounded-lg hover:bg-slate-50 text-slate-700 font-medium flex items-center justify-between text-left cursor-pointer"
                >
                  <span>Download Treatment Agreement & Consent (PDF)</span>
                  <ExternalLink className="size-3.5 text-slate-400" />
                </button>
                <Link
                  to={`/patients/${offer.patientId}/financing`}
                  className="py-2 px-2.5 rounded-lg hover:bg-slate-50 text-purple-700 font-semibold flex items-center gap-1.5"
                >
                  <ArrowLeft className="size-3" />
                  <span>Back to Insurance & Financing Hub</span>
                </Link>
              </div>
            </div>

            {/* Card 3: AUDIT & GOVERNANCE TRAIL */}
            <div className="bg-white border border-[#e2e8f0] rounded-[16px] p-5 shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col gap-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400">
                  AUDIT & GOVERNANCE TRAIL
                </h4>
                <span className="bg-cyan-100 text-cyan-900 text-[9px] font-bold px-2 py-0.5 rounded">
                  COMPLIANT
                </span>
              </div>

              <div className="flex flex-col gap-2 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-slate-500">Attending:</span>
                  <span className="font-bold text-slate-800">Dr. Michael Chang, MD</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Clearance Rule:</span>
                  <span className="font-mono text-slate-700">#CR-FIN-15 Approved</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Plan Reference:</span>
                  <span className="font-mono text-purple-700">FIN-TR8921-12M ({offer.totalPayable})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Timestamp:</span>
                  <span className="text-slate-700">Oct 19, 2026 • 2:16:44 PM EST</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Digital Token:</span>
                  <span className="font-mono text-[10px] text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">
                    SHA256: 4a61e9...c712b
                  </span>
                </div>
              </div>
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
          <span className="text-emerald-700 font-semibold">Medical EHR Sync: Active</span>
          <Link to="/settings" className="hover:underline">Support Desk</Link>
          <Link to="/settings" className="hover:underline">Clinical Guidelines</Link>
        </div>
      </footer>
    </div>
  );
};
