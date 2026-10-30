import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  ArrowLeft,
  Send,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  ShieldCheck,
  Smartphone,
  Calendar,
  Lock,
  X,
  Stethoscope,
  Percent,
  CreditCard,
  FileCheck,
} from 'lucide-react';
import { TreatmentOfferState, DEFAULT_OFFER_STATE } from './types';

export const TreatmentOfferReviewPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Load offer state from navigation payload or fallback
  const offer = (location.state as TreatmentOfferState) || DEFAULT_OFFER_STATE;

  const [attestationChecked, setAttestationChecked] = useState<boolean>(true);
  const [showModalPreview, setShowModalPreview] = useState<boolean>(false);
  const [isSending, setIsSending] = useState<boolean>(false);
  const [simulatedError, setSimulatedError] = useState<string | null>(null);

  const handleSendOffer = () => {
    if (!attestationChecked) {
      alert('Please certify clinician attestation before dispatching the treatment offer.');
      return;
    }

    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      navigate('/treatment-offers/TR-8921/status', { state: offer });
    }, 600);
  };

  const handleSimulateError = () => {
    setSimulatedError(
      'Simulated Verification Warning: Patient insurance re-check detected potential secondary medicaid filing. Continue with prompt self-pay settlement?'
    );
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1280px] mx-auto pb-16 font-['Plus_Jakarta_Sans',sans-serif] text-[#0f172a]">
      {/* Simulated Error Alert */}
      {simulatedError && (
        <div className="bg-amber-50 border border-amber-200 text-amber-900 px-4 py-3 rounded-xl flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2 text-xs font-medium">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{simulatedError}</span>
          </div>
          <button
            type="button"
            onClick={() => setSimulatedError(null)}
            className="text-amber-700 hover:text-amber-900 font-bold text-xs p-1 cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Expanded Modal Preview */}
      {showModalPreview && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-[420px] w-full p-6 shadow-2xl relative flex flex-col gap-4 border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-[#3f1d8b]" />
                <h3 className="font-bold text-sm text-[#0f172a]">Care ID Mobile App Simulation</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowModalPreview(false)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-[#f8fafc] border border-slate-200 rounded-xl p-4 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-[#3f1d8b] uppercase">Treatment Offer</span>
                <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Pending Review
                </span>
              </div>
              <h4 className="font-bold text-base text-[#0f172a]">{offer.procedureName}</h4>
              <p className="text-xs text-slate-500">Mount Sinai Hospital • Dr. Michael Chang</p>

              <div className="bg-white p-3 rounded-lg border border-slate-200 flex flex-col gap-1.5 text-xs">
                <div className="flex justify-between text-slate-500">
                  <span>Standard Baseline:</span>
                  <span>${offer.baselineFee.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>Prompt Cash Discount ({offer.discountValue}%):</span>
                  <span>-${offer.calculatedDiscount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between font-bold text-slate-800 pt-1 border-t border-slate-100">
                  <span>Total Patient Responsibility:</span>
                  <span className="text-[#3f1d8b]">{offer.totalPayable}</span>
                </div>
              </div>

              <div className="bg-purple-50 border border-purple-200 p-3 rounded-lg text-xs flex flex-col gap-1">
                <span className="font-bold text-[#3f1d8b]">{offer.financingPackageName}</span>
                <span className="text-base font-extrabold text-[#3f1d8b]">
                  {offer.monthlyInstallment}{' '}
                  <span className="text-xs font-normal">
                    {offer.termMonths > 1 ? `/ month (${offer.termMonths} Mos)` : 'Single Settlement'}
                  </span>
                </span>
              </div>

              <p className="text-[11px] text-slate-500 italic border-l-2 border-[#3f1d8b] pl-2 py-1">
                "{offer.doctorNotes}"
              </p>

              <div className="text-[10px] text-slate-400 text-center">
                Offer Expires: {offer.expirationDate} (14 Days)
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowModalPreview(false)}
                className="w-full py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                Close Simulator
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 1. PATIENT CONTEXT CAPSULE (Figma 1:7548) */}
      <div className="bg-white border border-[#e2e8f0] content-stretch flex items-center justify-between p-[21px] relative rounded-[16px] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] w-full">
        <div className="flex items-center gap-4">
          <div className="w-[52px] h-[52px] rounded-[12px] bg-[#3f1d8b] text-white flex items-center justify-center font-bold text-[18px] tracking-wide shrink-0 shadow-sm">
            RS
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3">
              <h1 className="text-[18px] font-bold text-[#0f172a] leading-tight tracking-tight">
                Robert J. Sterling
              </h1>
              <span className="bg-[#fef2f2] text-[#991b1b] border border-[#fecaca] text-[12px] font-semibold px-2.5 py-0.5 rounded-full">
                Self-Pay / Non-Insured
              </span>
            </div>
            <div className="flex items-center gap-2 text-[13px] text-[#64748b] font-medium">
              <span>CID: #8472–9901</span>
              <span>•</span>
              <span>45 M</span>
              <span>•</span>
              <span>O Pos (+)</span>
              <span>•</span>
              <span className="flex items-center gap-1 text-[#e11d48] font-semibold">
                <AlertTriangle className="w-3.5 h-3.5" />
                Penicillin Allergy
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate('/treatment-offers/new/step-1', { state: offer })}
            className="border border-[#e2e8f0] bg-white hover:bg-slate-50 text-[#334155] text-[12px] font-bold px-4 py-2 rounded-full flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Edit Offer</span>
          </button>
          <button
            type="button"
            onClick={() => navigate('/patients/8472-9901')}
            className="border border-[#e2e8f0] bg-white hover:bg-slate-50 text-[#334155] text-[12px] font-bold px-4 py-2 rounded-full flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Full Profile</span>
          </button>
        </div>
      </div>

      {/* 2. STEPPER (STEP 3 ACTIVE) (Figma 1:7563) */}
      <div className="bg-white border border-[#e2e8f0] rounded-[12px] px-8 py-4 flex items-center justify-between shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
        <div className="flex items-center gap-3 w-full justify-between">
          {/* Step 1 Complete */}
          <button
            type="button"
            onClick={() => navigate('/patients/8472-9901/financing')}
            className="flex items-center gap-2.5 text-left group cursor-pointer"
          >
            <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider">
                Step 1: Complete
              </span>
              <span className="text-[13px] font-semibold text-slate-700 group-hover:text-[#3f1d8b]">
                Financing Options
              </span>
            </div>
          </button>

          <div className="h-px bg-slate-200 flex-1 mx-4 max-w-[80px]" />

          {/* Step 2 Complete */}
          <button
            type="button"
            onClick={() => navigate('/treatment-offers/new/step-1', { state: offer })}
            className="flex items-center gap-2.5 text-left group cursor-pointer"
          >
            <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider">
                Step 2: Complete
              </span>
              <span className="text-[13px] font-semibold text-slate-700 group-hover:text-[#3f1d8b]">
                Configure Offer
              </span>
            </div>
          </button>

          <div className="h-px bg-slate-200 flex-1 mx-4 max-w-[80px]" />

          {/* Step 3 Active */}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-[#3f1d8b] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-md ring-4 ring-purple-100">
              3
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-bold text-[#3f1d8b] uppercase tracking-wider">
                Step 3: Active
              </span>
              <span className="text-[13px] font-bold text-[#0f172a]">
                Review & Send to Patient
              </span>
            </div>
          </div>

          <div className="h-px bg-slate-200 flex-1 mx-4 max-w-[80px]" />

          {/* Step 4 Upcoming */}
          <div className="flex items-center gap-2.5 opacity-60">
            <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-500 border border-slate-300 flex items-center justify-center font-bold text-xs shrink-0">
              4
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Step 4
              </span>
              <span className="text-[13px] font-medium text-slate-500">
                Patient Acceptance
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. MAIN REVIEW GRID (LEFT MASTER REVIEW + RIGHT LIVE PREVIEW & DISPATCH) (Figma 1:7588) */}
      <div className="grid grid-cols-12 gap-6 items-start w-full">
        {/* LEFT COLUMN: READ-ONLY DETAILED OFFER REVIEW (7 COLS) */}
        <div className="col-span-12 lg:col-span-7 flex flex-col gap-6">
          {/* Section 1: Target Procedure & Baseline Verification */}
          <div className="bg-white border border-[#e2e8f0] rounded-[16px] p-[25px] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-50 text-[#3f1d8b] flex items-center justify-center shrink-0">
                  <Stethoscope className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-[16px] font-bold text-[#0f172a] leading-tight">
                    1. Target Procedure & Baseline Verification
                  </h2>
                  <p className="text-[12px] text-slate-500 font-medium">
                    {offer.cptCode} Verified • Diagnostic Angiogram
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Baseline Fee
                </span>
                <span className="text-base font-extrabold text-[#0f172a]">
                  ${offer.baselineFee.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            <div className="bg-[#f8fafc] border border-slate-200/80 rounded-xl p-3.5 text-xs text-slate-600 flex flex-col gap-1.5">
              <span className="font-bold text-[#0f172a]">{offer.procedureName}</span>
              <p className="text-slate-500 leading-relaxed">
                <strong>Clinical Indication:</strong> {offer.clinicalNecessity}
              </p>
            </div>
          </div>

          {/* Section 2: Financial Breakdown & Discount Matrix */}
          <div className="bg-white border border-[#e2e8f0] rounded-[16px] p-[25px] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Percent className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-[16px] font-bold text-[#0f172a] leading-tight">
                    2. Financial Breakdown & Discount Matrix
                  </h2>
                  <p className="text-[12px] text-slate-500 font-medium">
                    Hospital Policy Governed • Uninsured Prompt Settlement
                  </p>
                </div>
              </div>
            </div>

            {/* Matrix Table */}
            <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
              <div className="flex items-center justify-between p-3 border-b border-slate-100 bg-[#f8fafc]">
                <span className="text-slate-600 font-medium">Standard Hospital Baseline Fee</span>
                <span className="font-bold text-slate-800">
                  ${offer.baselineFee.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 border-b border-slate-100 bg-emerald-50/40">
                <div className="flex flex-col">
                  <span className="text-emerald-800 font-bold">
                    Prompt Cash Settlement Discount ({offer.discountValue}.0%) Applied
                  </span>
                  <span className="text-[11px] text-emerald-600">
                    Authorized doctor prompt-payment incentive (Under 20% cap)
                  </span>
                </div>
                <span className="font-extrabold text-emerald-700 text-sm">
                  -${offer.calculatedDiscount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 border-b border-slate-100 bg-[#f8fafc]">
                <span className="text-slate-600 font-medium">Net Discounted Procedure Cost</span>
                <span className="font-bold text-slate-800">
                  ${offer.netProcedureCost.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 border-b border-slate-100 bg-white">
                <span className="text-slate-600 font-medium">Insurance Contribution (Robert J. Sterling)</span>
                <span className="font-bold text-slate-500">Self-Pay ($0.00)</span>
              </div>
              <div className="flex items-center justify-between p-3.5 bg-purple-50/60 font-bold">
                <div className="flex items-center gap-2">
                  <span className="text-[#0f172a] text-xs uppercase tracking-wide">
                    Total Patient Payment Responsibility
                  </span>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    ${offer.calculatedDiscount.toLocaleString()} USD ({offer.discountValue}% Reduction)
                  </span>
                </div>
                <span className="text-base text-[#3f1d8b] font-extrabold">
                  {offer.totalPayable}
                </span>
              </div>
            </div>
          </div>

          {/* Section 3: Attached Financing Structure */}
          <div className="bg-white border border-[#e2e8f0] rounded-[16px] p-[25px] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                  <CreditCard className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-[16px] font-bold text-[#0f172a] leading-tight">
                    3. Integrated Financing Structure
                  </h2>
                  <p className="text-[12px] text-slate-500 font-medium">
                    Pre-Approved Soft Check • {offer.financingPackageName}
                  </p>
                </div>
              </div>
              <span className="bg-[#3f1d8b] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                {offer.termMonths > 1 ? `${offer.termMonths} Months Fixed` : 'Single Intake Settlement'}
              </span>
            </div>

            <div className="bg-[#fbf9fe] border border-purple-200 rounded-xl p-4 flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <h3 className="font-bold text-sm text-[#0f172a]">{offer.financingPackageName}</h3>
                <p className="text-xs text-slate-600">
                  Hospital-sponsored structured financing with automated servicing.
                </p>
                <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-1">
                  <span>Total Payable: {offer.totalPayable}</span>
                  <span>•</span>
                  <span>APR: {offer.apr}</span>
                  <span>•</span>
                  <span className="text-emerald-700 font-semibold">No prepayment penalty</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                  Patient Monthly
                </span>
                <span className="text-xl font-extrabold text-[#3f1d8b]">
                  {offer.monthlyInstallment} <span className="text-xs font-normal">/ mo</span>
                </span>
              </div>
            </div>
          </div>

          {/* Section 4: Clinical Message, Validity & Doctor Attestation */}
          <div className="bg-white border border-[#e2e8f0] rounded-[16px] p-[25px] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  <FileCheck className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-[16px] font-bold text-[#0f172a] leading-tight">
                    4. Clinical Message, Validity & Doctor Attestation
                  </h2>
                  <p className="text-[12px] text-slate-500 font-medium">
                    Standard 14-day clinical hold • Offer Title: {offer.offerTitle}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>Expires: Nov 1, 2026 (14 Days)</span>
              </div>
            </div>

            {/* Notes to Patient */}
            <div className="bg-[#f8fafc] border border-slate-200/80 rounded-xl p-3.5 text-xs text-slate-700 flex flex-col gap-1.5">
              <span className="font-bold text-slate-900 uppercase text-[11px] tracking-wide">
                Notes to Robert J. Sterling:
              </span>
              <p className="italic text-slate-600 leading-relaxed">
                "{offer.doctorNotes}"
              </p>
            </div>

            {/* Required Clinician Attestation Checkbox */}
            <label className="flex items-start gap-3 p-3.5 bg-purple-50/40 border border-purple-100 rounded-xl cursor-pointer">
              <input
                type="checkbox"
                checked={attestationChecked}
                onChange={(e) => setAttestationChecked(e.target.checked)}
                className="mt-1 rounded border-slate-300 text-[#3f1d8b] focus:ring-[#3f1d8b] cursor-pointer"
              />
              <span className="text-xs text-slate-700 leading-relaxed font-medium">
                <strong>Clinician Acknowledgment:</strong> I certify that I have reviewed the patient clinical history, confirmed hospital baseline pricing (${offer.baselineFee.toLocaleString('en-US', { minimumFractionDigits: 2 })}), approved {offer.discountValue}% settlement discount (-${offer.calculatedDiscount.toLocaleString('en-US', { minimumFractionDigits: 2 })}), and attached financing terms ({offer.financingPackageName}, {offer.monthlyInstallment}/mo). This offer will be encrypted and transmitted to Robert's Care ID mobile application.
              </span>
            </label>
          </div>

          {/* Bottom Action Buttons (Figma 1:7862) */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => navigate('/treatment-offers/new/step-1', { state: offer })}
                className="border border-[#e2e8f0] bg-white hover:bg-slate-50 text-[#334155] text-xs font-bold px-5 py-2.5 rounded-full shadow-xs cursor-pointer"
              >
                Back to Edit Offer
              </button>
              <button
                type="button"
                onClick={() => alert('Draft saved successfully.')}
                className="border border-[#e2e8f0] bg-white hover:bg-slate-50 text-[#334155] text-xs font-bold px-5 py-2.5 rounded-full shadow-xs cursor-pointer"
              >
                Save Draft
              </button>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleSimulateError}
                className="text-rose-600 hover:text-rose-700 hover:bg-rose-50 text-xs font-semibold px-4 py-2 rounded-full cursor-pointer"
              >
                Simulate Error
              </button>
              <button
                type="button"
                disabled={isSending}
                onClick={handleSendOffer}
                className="bg-gradient-to-b from-[#a44cff] to-[#5b14b8] text-white font-bold h-[48px] px-8 rounded-[9999px] shadow-[0px_10px_15px_-3px_rgba(88,28,135,0.2),0px_4px_6px_-4px_rgba(88,28,135,0.2)] hover:opacity-95 transition-all flex items-center justify-center gap-2 text-sm cursor-pointer disabled:opacity-50"
              >
                <Send className="w-4 h-4 text-white" />
                <span>{isSending ? 'Sending Offer...' : 'Send Treatment Offer to Patient'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: PATIENT-FACING MOBILE VIEW PREVIEW (5 COLS) (Figma 1:7877) */}
        <div className="col-span-12 lg:col-span-5 flex flex-col gap-6 sticky top-6">
          {/* Patient-Facing Device Preview Card */}
          <div className="bg-white border border-[#e2e8f0] rounded-[16px] p-[25px] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-[#3f1d8b]" />
                <h3 className="font-bold text-sm text-[#0f172a]">Patient-Facing Preview</h3>
              </div>
              <span className="text-[11px] font-bold text-slate-400">Care ID iOS / Android</span>
            </div>

            <p className="text-[12px] text-slate-500 leading-relaxed">
              This interactive ticket represents exactly how Robert J. Sterling will view and review this offer inside his Care ID mobile application.
            </p>

            {/* Mock Mobile Screen Component */}
            <div className="border border-slate-200 rounded-[20px] bg-slate-900 p-2 shadow-md">
              <div className="bg-white rounded-[16px] p-4 flex flex-col gap-3 text-xs">
                {/* Mobile Header */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="text-[11px] font-bold text-[#3f1d8b]">Care ID Treatment Offer</span>
                  <span className="bg-amber-100 text-amber-800 text-[9px] font-bold px-2 py-0.5 rounded-full">
                    Pending Your Review
                  </span>
                </div>

                {/* Procedure & Clinic */}
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                    Procedure
                  </span>
                  <span className="font-bold text-sm text-[#0f172a]">{offer.procedureName}</span>
                  <span className="text-[11px] text-slate-500">
                    Mount Sinai Hospital • Dr. Michael Chang
                  </span>
                </div>

                {/* Price Strip */}
                <div className="bg-[#f8fafc] border border-slate-200 rounded-lg p-2.5 flex flex-col gap-1">
                  <div className="flex justify-between text-slate-500 text-[11px]">
                    <span>Hospital Baseline:</span>
                    <span>${offer.baselineFee.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between text-emerald-600 font-medium text-[11px]">
                    <span>Prompt Cash Discount ({offer.discountValue}%):</span>
                    <span>-${offer.calculatedDiscount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between font-bold text-slate-900 pt-1 border-t border-slate-200 text-xs">
                    <span>Total You Pay:</span>
                    <span className="text-[#3f1d8b] font-extrabold">
                      {offer.totalPayable}
                    </span>
                  </div>
                </div>

                {/* Attached Installment Chip */}
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-2.5 flex items-center justify-between text-xs">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-purple-700 uppercase">
                      {offer.financingPackageName}
                    </span>
                    <span className="text-[11px] text-slate-600">
                      {offer.termMonths > 1 ? `${offer.termMonths} Equal Monthly Payments` : 'Single Intake Settlement'}
                    </span>
                  </div>
                  <span className="font-extrabold text-sm text-[#3f1d8b]">
                    {offer.monthlyInstallment} <span className="text-[10px] font-normal">/ mo</span>
                  </span>
                </div>

                {/* Doctor Note Preview */}
                <p className="text-[11px] text-slate-500 italic line-clamp-2">
                  "{offer.doctorNotes}"
                </p>

                {/* Expiry Stamp */}
                <span className="text-[10px] text-slate-400 text-center">
                  Offer Expires: Nov 1, 2026 (14 Days)
                </span>

                {/* Patient Primary Actions */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div className="py-2 text-center rounded-lg border border-slate-200 text-slate-500 font-bold text-[11px] bg-slate-50">
                    Decline
                  </div>
                  <div className="py-2 text-center rounded-lg bg-[#3f1d8b] text-white font-bold text-[11px] shadow-xs">
                    Accept Offer
                  </div>
                </div>
              </div>
            </div>

            {/* Encrypted Notification Preview */}
            <div className="flex items-center gap-2 text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
              <Lock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Sent instantly to +1 (555) •••-9182 upon doctor send.</span>
            </div>

            <button
              type="button"
              onClick={() => setShowModalPreview(true)}
              className="w-full py-2.5 border border-[#e2e8f0] rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Open Expanded Patient Preview Modal
            </button>
          </div>

          {/* Quick Dispatch Audit Check */}
          <div className="bg-white border border-[#e2e8f0] rounded-[16px] p-4 flex flex-col gap-2.5 text-xs text-slate-600 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
            <div className="flex items-center gap-2 font-bold text-[#0f172a] border-b border-slate-100 pb-2">
              <ShieldCheck className="w-4 h-4 text-[#3f1d8b]" />
              <span>Governance & Audit Verification</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Authorized Clinician:</span>
              <span className="font-semibold text-slate-800">Dr. Michael Chang (NPI #19820491)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Departmental Sign-off:</span>
              <span className="font-semibold text-emerald-600">Pre-Approved (≤ 15%)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Audit Log ID:</span>
              <span className="font-mono text-[11px] text-slate-500">AUD-2026-TR8921-INIT</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
