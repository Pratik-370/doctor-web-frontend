import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  FileText,
  Calendar,
  Lock,
  ExternalLink,
  ShieldCheck,
  Building,
  CreditCard,
  Percent,
  Fingerprint,
  Download,
  Bell,
  User,
  X,
} from 'lucide-react';
import { TreatmentOfferState, DEFAULT_OFFER_STATE } from './types';

export const TreatmentOfferAcceptedPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Load offer state from navigation payload or default fallback
  const offer = (location.state as TreatmentOfferState) || DEFAULT_OFFER_STATE;

  const [showPdfModal, setShowPdfModal] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleContinueToTreatment = () => {
    navigate(`/treatment-offers/${offer.offerId}/clearance`, { state: offer });
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

      {/* PDF Offer Agreement Modal */}
      {showPdfModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-[640px] w-full p-6 shadow-2xl relative flex flex-col gap-4 border border-slate-200 animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#3f1d8b]" />
                <h3 className="font-bold text-base text-[#0f172a]">
                  Ratified Treatment Agreement — #{offer.offerId}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowPdfModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="border border-slate-200 rounded-xl p-5 bg-[#fafafc] flex flex-col gap-4 text-xs">
              <div className="flex justify-between items-start border-b border-slate-200 pb-3">
                <div>
                  <h4 className="font-extrabold text-sm text-[#0f172a]">Care ID Clinical Agreement</h4>
                  <p className="text-slate-500">Mount Sinai Hospital Heart Center</p>
                </div>
                <div className="text-right">
                  <span className="font-bold text-emerald-600">Status: RATIFIED</span>
                  <p className="text-slate-400 text-[11px]">Accepted: Oct 19, 2026 • 2:15 PM EST</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-slate-400 font-bold uppercase text-[10px] block">Patient</span>
                  <span className="font-bold text-[#0f172a]">{offer.patientName} ({offer.patientCid})</span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold uppercase text-[10px] block">Procedure</span>
                  <span className="font-bold text-[#0f172a]">{offer.procedureName}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold uppercase text-[10px] block">Attending</span>
                  <span className="font-bold text-[#0f172a]">Dr. Michael Chang, MD</span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold uppercase text-[10px] block">Hold Slot</span>
                  <span className="font-bold text-emerald-700">Cath Lab Room 3 • Nov 4, 2026</span>
                </div>
              </div>

              <div className="bg-white p-3.5 rounded-lg border border-slate-200 flex flex-col gap-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Standard Chargemaster Baseline:</span>
                  <span className="font-bold">${offer.baselineFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Prompt Cash Settlement Discount (15%):</span>
                  <span>-${offer.calculatedDiscount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-t border-slate-100 pt-1 font-bold text-slate-800">
                  <span>Net Patient Responsibility:</span>
                  <span className="text-[#3f1d8b]">{offer.totalPayable}</span>
                </div>
                <div className="flex justify-between text-purple-700 text-[11px] pt-1">
                  <span>Financing Terms:</span>
                  <span>12 Equal Monthly Installments of {offer.monthlyInstallment} (0% APR)</span>
                </div>
              </div>

              <div className="text-[11px] text-slate-500 leading-relaxed">
                <strong>Biometric Execution Stamp:</strong> Signed via Care ID Patient Mobile App. Cryptographic SHA-256 token: <code className="text-slate-700 font-mono">7f89b4c09a823...318e</code>.
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowPdfModal(false)}
                className="px-4 py-2 border border-slate-200 text-xs font-bold text-slate-700 rounded-xl hover:bg-slate-50 cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  triggerToast('Ratified agreement downloaded (PDF).');
                  setShowPdfModal(false);
                }}
                className="px-4 py-2 bg-gradient-to-r from-[#a44cff] to-[#5b14b8] text-white text-xs font-bold rounded-xl shadow-sm hover:opacity-95 cursor-pointer flex items-center gap-1.5"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOP HEADER BAR (Figma 1:9001 standard top strip) */}
      <header className="h-14 border-b border-[#e1e3e4] bg-[#f8f9fa] px-8 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
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
            Treatment Offer #{offer.offerId}
          </Link>
          <span>/</span>
          <span className="bg-purple-100 text-[#3f1d8b] font-bold px-2 py-0.5 rounded text-[11px]">
            Accepted & Confirmed
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>EHR Live Sync: Active</span>
          </div>
          <button
            type="button"
            className="p-1.5 rounded-full hover:bg-slate-200/60 text-slate-600 transition-colors relative"
            aria-label="Notifications"
          >
            <Bell className="size-4" />
            <span className="absolute top-1 right-1 size-1.5 bg-rose-600 rounded-full" />
          </button>
        </div>
      </header>

      {/* MAIN SCROLLABLE CONTENT */}
      <main className="flex-1 overflow-y-auto px-8 py-6 max-w-[1280px] w-full mx-auto flex flex-col gap-6">
        {/* PATIENT CLINICAL IDENTITY CAPSULE (Figma 1:9005) */}
        <div className="bg-white border border-[#e2e8f0] content-stretch flex items-center justify-between p-[21px] relative rounded-[16px] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] w-full">
          <div className="flex items-center gap-4">
            <div className="w-[52px] h-[52px] rounded-[12px] bg-[#3f1d8b] text-white flex items-center justify-center font-bold text-[18px] tracking-wide shrink-0 shadow-sm">
              RS
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-3">
                <h1 className="text-[18px] font-bold text-[#0f172a] leading-tight tracking-tight">
                  {offer.patientName}
                </h1>
                <span className="bg-[#fef2f2] text-[#991b1b] border border-[#fecaca] text-[12px] font-semibold px-2.5 py-0.5 rounded-full">
                  {offer.insuranceStatus}
                </span>
                <span className="text-xs text-slate-400 font-mono">CID: {offer.patientCid}</span>
              </div>
              <div className="flex items-center gap-2 text-[13px] text-[#64748b] font-medium flex-wrap">
                <span>Age: {offer.patientAge} {offer.patientGender}</span>
                <span>•</span>
                <span>Blood: {offer.patientBlood}</span>
                <span>•</span>
                <span className="flex items-center gap-1 text-[#e11d48] font-semibold">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Allergies: {offer.patientAllergy} (Severe)
                </span>
                <span>•</span>
                <span className="text-slate-700 font-semibold">Clinical Target: {offer.procedureName}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => navigate(`/patients/${offer.patientId}/financing`)}
              className="border border-[#e2e8f0] bg-white hover:bg-slate-50 text-[#334155] text-[12px] font-bold px-4 py-2 rounded-full flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-slate-500" />
              <span>Back to Insurance & Financing</span>
            </button>
            <button
              type="button"
              onClick={() => navigate(`/patients/${offer.patientId}`)}
              className="border border-[#e2e8f0] bg-white hover:bg-slate-50 text-[#334155] text-[12px] font-bold px-4 py-2 rounded-full flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
              <span>View Full Profile</span>
            </button>
          </div>
        </div>

        {/* HERO ACCEPTANCE BANNER (Figma 1:9001 - Dark Green Gradient) */}
        <div className="relative rounded-[16px] overflow-hidden bg-gradient-to-r from-[#064e3b] via-[#022c22] to-[#064e3b] text-white p-6 shadow-md border border-emerald-900/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4 max-w-2xl">
            <div className="size-12 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center shrink-0 text-emerald-300">
              <CheckCircle2 className="size-7 stroke-[2.5]" />
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full tracking-wider">
                  ACCEPTED BY PATIENT
                </span>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full tracking-wider">
                  FINANCING CONFIRMED
                </span>
                <span className="text-emerald-200/70 text-xs font-mono">
                  Offer #{offer.offerId}
                </span>
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-white">
                Treatment Offer Accepted & Financial Plan Ratified
              </h2>
              <p className="text-xs text-emerald-100/90 leading-relaxed">
                {offer.patientName} signed and accepted the structured clinical offer on the Care ID Patient App. The 12-Month In-House 0% APR Plan has been confirmed. Patient payment responsibility is locked at {offer.totalPayable} ({offer.monthlyInstallment}/mo). Clinical care may proceed directly to Cath Lab procedural scheduling.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-start md:items-end gap-1.5 shrink-0 bg-emerald-950/40 p-4 rounded-xl border border-emerald-800/40">
            <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400">
              ACCEPTANCE TIMESTAMP
            </span>
            <span className="text-xs font-bold text-white">
              Oct 19, 2026 • 2:15 PM EST
            </span>
            <div className="mt-2 flex items-center gap-1.5 text-[11px] text-emerald-300 font-medium">
              <Fingerprint className="size-4 text-emerald-400" />
              <span>Biometric e-Signature Confirmed</span>
            </div>
          </div>
        </div>

        {/* OFFER LIFECYCLE TRAJECTORY (Figma 1:9001 - 8-Step Verification) */}
        <div className="bg-white border border-[#e2e8f0] rounded-[16px] p-5 shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#3f1d8b]" />
              <h3 className="font-bold text-xs uppercase tracking-wider text-[#0f172a]">
                Offer Lifecycle Trajectory
              </h3>
            </div>
            <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
              Milestone 6 of 8 Completed • Clinical Handover Ready
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2.5">
            {/* Step 1 */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 flex flex-col gap-1 text-center items-center">
              <div className="size-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <CheckCircle2 className="size-3.5 stroke-[2.5]" />
              </div>
              <span className="text-[11px] font-bold text-slate-800">1. Draft Created</span>
              <span className="text-[10px] text-slate-400">Oct 18 • 10:30 AM</span>
              <span className="text-[9px] text-emerald-700 font-bold uppercase">COMPLETED</span>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 flex flex-col gap-1 text-center items-center">
              <div className="size-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <CheckCircle2 className="size-3.5 stroke-[2.5]" />
              </div>
              <span className="text-[11px] font-bold text-slate-800">2. Eligibility Check</span>
              <span className="text-[10px] text-slate-400">Self-Pay Verified</span>
              <span className="text-[9px] text-emerald-700 font-bold uppercase">COMPLETED</span>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 flex flex-col gap-1 text-center items-center">
              <div className="size-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <CheckCircle2 className="size-3.5 stroke-[2.5]" />
              </div>
              <span className="text-[11px] font-bold text-slate-800">3. Offer Prepared</span>
              <span className="text-[10px] text-slate-400">15% Discount Set</span>
              <span className="text-[9px] text-emerald-700 font-bold uppercase">COMPLETED</span>
            </div>

            {/* Step 4 */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 flex flex-col gap-1 text-center items-center">
              <div className="size-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <CheckCircle2 className="size-3.5 stroke-[2.5]" />
              </div>
              <span className="text-[11px] font-bold text-slate-800">4. Offer Sent</span>
              <span className="text-[10px] text-slate-400">Oct 18 • 10:42 AM</span>
              <span className="text-[9px] text-emerald-700 font-bold uppercase">DISPATCHED</span>
            </div>

            {/* Step 5 */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 flex flex-col gap-1 text-center items-center">
              <div className="size-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <CheckCircle2 className="size-3.5 stroke-[2.5]" />
              </div>
              <span className="text-[11px] font-bold text-slate-800">5. Patient Viewed</span>
              <span className="text-[10px] text-slate-400">Oct 18 • 11:15 AM</span>
              <span className="text-[9px] text-emerald-700 font-bold uppercase">IN APP</span>
            </div>

            {/* Step 6 (ACTIVE) */}
            <div className="bg-purple-50 border-2 border-[#5b14b8] rounded-xl p-2.5 flex flex-col gap-1 text-center items-center shadow-xs">
              <div className="size-5 rounded-full bg-[#5b14b8] text-white flex items-center justify-center">
                <span className="size-2 rounded-full bg-white animate-pulse" />
              </div>
              <span className="text-[11px] font-extrabold text-[#3f1d8b]">6. Patient Accepted</span>
              <span className="text-[10px] text-purple-700 font-medium">Oct 19 • 2:15 PM</span>
              <span className="bg-[#3f1d8b] text-white text-[8px] font-extrabold px-1.5 py-0.2 rounded-full uppercase">
                CURRENT STATE
              </span>
            </div>

            {/* Step 7 */}
            <div className="bg-emerald-50/60 border border-emerald-200 rounded-xl p-2.5 flex flex-col gap-1 text-center items-center">
              <div className="size-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <CheckCircle2 className="size-3.5 stroke-[2.5]" />
              </div>
              <span className="text-[11px] font-bold text-slate-800">7. Plan Confirmed</span>
              <span className="text-[10px] text-slate-400">0% APR Activated</span>
              <span className="text-[9px] text-emerald-700 font-bold uppercase">RATIFIED</span>
            </div>

            {/* Step 8 (NEXT) */}
            <div className="bg-slate-50 border border-dashed border-purple-300 rounded-xl p-2.5 flex flex-col gap-1 text-center items-center">
              <div className="size-5 rounded-full bg-purple-100 text-[#3f1d8b] flex items-center justify-center">
                <Calendar className="size-3.5 stroke-[2]" />
              </div>
              <span className="text-[11px] font-bold text-[#3f1d8b]">8. Treatment Step</span>
              <span className="text-[10px] text-slate-400">Cath Lab Schedule</span>
              <span className="text-[9px] text-purple-700 font-bold uppercase">NEXT ACTION +</span>
            </div>
          </div>
        </div>

        {/* 2-COLUMN MAIN CONTENT (Figma 1:9001) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT 2/3 COLUMN */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Card 1: Confirmed Financial Structure */}
            <div className="bg-white border border-[#e2e8f0] rounded-[16px] p-6 shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-[#3f1d8b]" />
                  <h3 className="font-bold text-sm text-[#0f172a]">
                    Confirmed Financial Structure
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="size-3" />
                    <span>Confirmed & Locked</span>
                  </span>
                  <span className="text-xs text-slate-400 font-mono">CPT #93458</span>
                </div>
              </div>

              {/* Procedure Specification Box */}
              <div className="bg-[#fafafc] border border-slate-200 rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                    TARGET CLINICAL PROCEDURE
                  </span>
                  <h4 className="font-bold text-base text-[#0f172a] mt-0.5">
                    {offer.procedureName}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Outpatient Cardiac Recovery Tier 1 • Mount Sinai Health System • Linked Referral #REF-4491
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                    HOSPITAL BASELINE FEE
                  </span>
                  <span className="text-xl font-extrabold text-[#0f172a]">
                    ${offer.baselineFee.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Breakdown Rows */}
              <div className="flex flex-col gap-2.5 pt-2 text-xs">
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-600">Standard Hospital Chargemaster Baseline</span>
                  <span className="font-bold text-slate-800">${offer.baselineFee.toLocaleString()}.00</span>
                </div>

                <div className="flex justify-between items-center py-1 bg-emerald-50/50 px-3 rounded-lg border border-emerald-100">
                  <div className="flex items-center gap-2 text-emerald-800">
                    <Percent className="size-3.5 text-emerald-600" />
                    <span className="font-medium">Authorized Prompt Cash Settlement Discount (15.0%)</span>
                    <span className="bg-emerald-100 text-emerald-800 text-[9px] font-bold px-1.5 py-0.2 rounded">
                      Hospital Policy Applied
                    </span>
                  </div>
                  <span className="font-bold text-emerald-700">-${offer.calculatedDiscount.toLocaleString()}.00</span>
                </div>

                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-600">Net Discounted Procedure Baseline</span>
                  <span className="font-bold text-slate-800">${offer.netProcedureCost.toLocaleString()}.00</span>
                </div>

                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-600">Insurance Contribution (Self-Pay Patient)</span>
                  <span className="font-bold text-slate-800">$0.00</span>
                </div>

                <div className="border-t border-slate-200 pt-3 flex justify-between items-center bg-slate-50 p-4 rounded-xl">
                  <div>
                    <span className="font-extrabold text-sm text-[#0f172a] block">
                      TOTAL CONFIRMED PATIENT PAYMENT RESPONSIBILITY
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Prompt settlement savings: ${offer.calculatedDiscount.toLocaleString()}.00 (15.0%)
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-[#3f1d8b] block">
                      {offer.totalPayable}
                    </span>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                      <Lock className="size-2.5" />
                      <span>Locked & Underwritten</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sub-cards Grid: Patient Acceptance & Financing Confirmation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Card A: Patient Acceptance */}
              <div className="bg-white border border-[#e2e8f0] rounded-[16px] p-5 shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col gap-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <div className="flex items-center gap-1.5">
                    <User className="size-4 text-[#3f1d8b]" />
                    <h4 className="font-bold text-xs uppercase tracking-wider text-[#0f172a]">
                      Patient Acceptance
                    </h4>
                  </div>
                  <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                    Verified
                  </span>
                </div>

                <div className="flex flex-col gap-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Patient Signer:</span>
                    <span className="font-bold text-slate-800">{offer.patientName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Acceptance Timestamp:</span>
                    <span className="font-semibold text-slate-700">Oct 19, 2026 • 2:15 PM EST</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Delivery Channel:</span>
                    <span className="font-medium text-slate-700">Care ID Patient Mobile App</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Digital Authorization:</span>
                    <span className="text-emerald-700 font-bold flex items-center gap-1 text-[11px]">
                      <Fingerprint className="size-3.5" />
                      Biometric e-Sign Ratified
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Accepted Responsibility:</span>
                    <span className="font-bold text-[#3f1d8b]">{offer.totalPayable}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Offer Version:</span>
                    <span className="font-mono text-slate-600">v1.0 (Final Approved)</span>
                  </div>
                </div>

                <div className="bg-[#fafafc] border border-slate-200 p-3 rounded-lg text-[11px] text-slate-600 italic leading-relaxed mt-1">
                  &ldquo;Patient Acknowledgment: I authorize the prompt cash settlement discount of 15% and agree to the 12-month installment schedule of {offer.monthlyInstallment}/mo through the Care ID in-house plan.&rdquo;
                </div>
              </div>

              {/* Card B: Financing Confirmation */}
              <div className="bg-white border border-[#e2e8f0] rounded-[16px] p-5 shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col gap-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <div className="flex items-center gap-1.5">
                    <Building className="size-4 text-[#3f1d8b]" />
                    <h4 className="font-bold text-xs uppercase tracking-wider text-[#0f172a]">
                      Financing Confirmation
                    </h4>
                  </div>
                  <span className="bg-cyan-50 text-cyan-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-cyan-200">
                    Active Contract
                  </span>
                </div>

                <div className="flex flex-col gap-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Financing Package:</span>
                    <span className="font-bold text-slate-800">{offer.financingPackageName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Confirmed Loan Amount:</span>
                    <span className="font-bold text-slate-800">${offer.netProcedureCost.toLocaleString()}.00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Monthly Installment:</span>
                    <span className="font-bold text-base text-[#3f1d8b]">
                      {offer.monthlyInstallment} <span className="text-xs font-normal text-slate-500">/ month</span>
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Duration & Term:</span>
                    <span className="font-medium text-slate-700">12 Equal Monthly Payments</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Annual Percentage Rate:</span>
                    <span className="font-bold text-emerald-700">0.00% APR (Zero-Interest)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Administrative Fees:</span>
                    <span className="font-medium text-slate-700">$0.00 (Waived)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Financing Reference ID:</span>
                    <span className="font-mono text-slate-600">FIN-TR8921-12M</span>
                  </div>
                </div>

                <div className="bg-emerald-50/60 border border-emerald-200 p-2.5 rounded-lg text-[11px] text-emerald-800 flex items-center gap-1.5 mt-1">
                  <CheckCircle2 className="size-3.5 text-emerald-600 shrink-0" />
                  <span>First draft scheduled Nov 15, 2026. No prepayment penalties.</span>
                </div>
              </div>
            </div>

            {/* Bottom Action Box: Clinical & Treatment Next Steps */}
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50/50 border border-purple-200 rounded-[16px] p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex flex-col gap-1">
                <span className="bg-[#3f1d8b] text-white text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full w-fit">
                  ACTION REQUIRED
                </span>
                <h4 className="font-bold text-sm text-[#0f172a]">
                  Clinical & Treatment Next Steps
                </h4>
                <p className="text-xs text-slate-600 max-w-lg leading-relaxed">
                  Financial approval is complete. The patient's Cath Lab slot hold (Nov 4, 2026) is eligible for final clinical confirmation. Click below to advance {offer.patientName} to the active surgical appointment preparation queue.
                </p>
              </div>

              <button
                type="button"
                onClick={handleContinueToTreatment}
                className="px-6 py-3 rounded-full text-white font-semibold text-xs bg-gradient-to-b from-[#a44cff] to-[#5b14b8] hover:opacity-95 shadow-md flex items-center gap-2 shrink-0 cursor-pointer transition-transform active:scale-98"
              >
                <span>Continue to Treatment</span>
                <ArrowRight className="size-4" />
              </button>
            </div>
          </div>

          {/* RIGHT 1/3 COLUMN */}
          <div className="flex flex-col gap-6">
            {/* Card 1: Clinician Actions */}
            <div className="bg-white border border-[#e2e8f0] rounded-[16px] p-5 shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#3f1d8b]" />
                  <h3 className="font-bold text-sm text-[#0f172a]">Clinician Actions</h3>
                </div>
                <span className="bg-purple-100 text-[#3f1d8b] text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Accepted State
                </span>
              </div>

              <div className="flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={handleContinueToTreatment}
                  className="w-full py-3 bg-gradient-to-b from-[#a44cff] to-[#5b14b8] text-white text-xs font-bold rounded-xl shadow-md hover:opacity-95 transition-opacity flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ArrowRight className="w-4 h-4" />
                  <span>Continue to Treatment</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowPdfModal(true)}
                  className="w-full py-2.5 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl transition-colors shadow-2xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-slate-500" />
                  <span>View Full Offer Agreement (PDF)</span>
                </button>

                <button
                  type="button"
                  onClick={() => navigate(`/patients/${offer.patientId}`)}
                  className="w-full py-2.5 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl transition-colors shadow-2xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4 text-slate-500" />
                  <span>View Patient Profile</span>
                </button>

                <button
                  type="button"
                  onClick={() => navigate(`/patients/${offer.patientId}/financing`)}
                  className="w-full py-2.5 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl transition-colors shadow-2xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4 text-slate-500" />
                  <span>Back to Insurance & Financing</span>
                </button>
              </div>

              <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl flex items-start gap-2 text-[11px] text-slate-500">
                <Lock className="size-3.5 text-slate-400 shrink-0 mt-0.5" />
                <span>
                  Financial terms are locked following patient sign-off. Modifications require an administrative contract amendment.
                </span>
              </div>
            </div>

            {/* Card 2: Linked Procedural Hold */}
            <div className="bg-white border border-[#e2e8f0] rounded-[16px] p-5 shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col gap-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#3f1d8b]" />
                  <h3 className="font-bold text-xs uppercase tracking-wider text-[#0f172a]">
                    Linked Procedural Hold
                  </h3>
                </div>
                <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                  Ready to Book
                </span>
              </div>

              <div className="flex flex-col gap-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Facility:</span>
                  <span className="font-bold text-slate-800">Mount Sinai Cath Lab 3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Reserved Window:</span>
                  <span className="font-bold text-[#3f1d8b]">Nov 4, 2026 • 09:30 AM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Supervising Clinician:</span>
                  <span className="font-semibold text-slate-800">Dr. Michael Chang</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Referral Context:</span>
                  <span className="font-mono text-purple-700">#REF-4491</span>
                </div>
                <div className="flex justify-between items-center pt-1 border-t border-slate-100">
                  <span className="text-slate-500">Pre-Op Lab Package:</span>
                  <span className="text-emerald-700 font-bold flex items-center gap-1 text-[11px]">
                    <CheckCircle2 className="size-3.5" />
                    Complete
                  </span>
                </div>
              </div>
            </div>

            {/* Card 3: Audit & Governance Log */}
            <div className="bg-white border border-[#e2e8f0] rounded-[16px] p-5 shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col gap-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <h3 className="font-bold text-xs uppercase tracking-wider text-[#0f172a]">
                    Audit & Governance Log
                  </h3>
                </div>
                <span className="bg-slate-100 text-slate-600 text-[9px] font-mono font-bold px-2 py-0.5 rounded">
                  HIPAA Compliant
                </span>
              </div>

              <div className="flex flex-col gap-2 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-slate-500">Offer Reference:</span>
                  <span className="font-mono text-slate-800 font-bold">#{offer.offerId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Created By:</span>
                  <span className="text-slate-700 font-medium">Dr. Michael Chang (Lic #88392)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Created Timestamp:</span>
                  <span className="text-slate-700">Oct 18, 2026 • 10:30 AM EST</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Dispatched Timestamp:</span>
                  <span className="text-slate-700">Oct 18, 2026 • 10:42 AM EST</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Accepted Timestamp:</span>
                  <span className="font-bold text-emerald-700">Oct 19, 2026 • 2:15 PM EST</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Financing Confirmed:</span>
                  <span className="font-mono text-slate-700">FIN-TR8921 (Oct 19, 2:16 PM)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Digital Consent Token:</span>
                  <span className="font-mono text-[10px] text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">
                    SHA256: 7f89b...c438
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => triggerToast('Immutable audit trail verification token exported.')}
                className="mt-2 text-[#3f1d8b] hover:underline text-xs font-semibold flex items-center gap-1.5 justify-center pt-2 border-t border-slate-100 cursor-pointer"
              >
                <span>Download Immutable Audit Trail</span>
                <ExternalLink className="size-3" />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="h-12 border-t border-[#e1e3e4] bg-[#f8f9fa] px-8 flex items-center justify-between text-[11px] text-slate-500 mt-auto shrink-0">
        <div className="flex items-center gap-2">
          <span>Care ID Enterprise Health Platform • Hospital Policy Standard 2026</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 text-emerald-700 font-semibold">
            <ShieldCheck className="size-3.5" />
            Financial Protocol Validated
          </span>
          <Link to="/settings" className="hover:underline">Privacy & Terms</Link>
          <Link to="/settings" className="hover:underline">Help Center</Link>
        </div>
      </footer>
    </div>
  );
};
