import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  ShieldCheck,
  Send,
  Calendar,
  Clock,
  Phone,
  FileText,
  RotateCcw,
  Smartphone,
  Globe,
  X,
  Stethoscope,
  Percent,
  CreditCard,
  Building,
  Hash,
  ArrowRight,
} from 'lucide-react';
import { TreatmentOfferState, DEFAULT_OFFER_STATE } from './types';

export const TreatmentOfferStatusPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Load offer state from navigation payload or fallback
  const offer = (location.state as TreatmentOfferState) || DEFAULT_OFFER_STATE;

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showPdfModal, setShowPdfModal] = useState<boolean>(false);
  const [showWithdrawConfirm, setShowWithdrawConfirm] = useState<boolean>(false);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleResendSms = () => {
    triggerToast('Priority SMS notification link resent to +1 (555) •••-9182.');
  };

  const handleWithdrawOffer = () => {
    setShowWithdrawConfirm(false);
    triggerToast('Offer #TR-8921 has been marked as Withdrawn.');
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1280px] mx-auto pb-16 font-['Plus_Jakarta_Sans',sans-serif] text-[#0f172a] relative">
      {/* Toast Notification (Figma 1:7988) */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-[#0f172a] text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 border border-slate-700 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-semibold">{toastMessage}</span>
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
                  Clinical Offer & Financial Agreement — #TR-8921
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
                  <span className="font-bold text-[#3f1d8b]">Offer Ref: #TR-8921</span>
                  <p className="text-slate-400 text-[11px]">Dispatched: Oct 18, 2026</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-slate-400 font-bold uppercase text-[10px] block">Patient</span>
                  <span className="font-bold text-[#0f172a]">Robert J. Sterling (#8472–9901)</span>
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
                  <span className="font-bold text-emerald-700">Cath Lab Room 2 • Nov 4, 2026</span>
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
                  <span>Financing Structure:</span>
                  <span>{offer.termMonths > 1 ? `${offer.termMonths} Equal Monthly Installments of ${offer.monthlyInstallment} (${offer.apr})` : `Full Cash Settlement (${offer.totalPayable})`}</span>
                </div>
              </div>

              <div className="text-[11px] text-slate-500 leading-relaxed">
                <strong>HIPAA & Clinical Consent Notice:</strong> This clinical offer has been digitally transmitted via TLS 1.3 encrypted Care ID healthcare protocol. Digital patient execution triggers Cath Lab preparation.
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  window.print();
                }}
                className="px-4 py-2 bg-[#3f1d8b] text-white text-xs font-bold rounded-xl hover:opacity-90 cursor-pointer"
              >
                Print / Save PDF
              </button>
              <button
                type="button"
                onClick={() => setShowPdfModal(false)}
                className="px-4 py-2 border border-slate-200 text-xs font-bold text-slate-700 rounded-xl hover:bg-slate-50 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Withdraw Modal */}
      {showWithdrawConfirm && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-[400px] w-full p-6 shadow-2xl relative flex flex-col gap-4 border border-slate-200 animate-in fade-in zoom-in-95">
            <h3 className="font-bold text-base text-[#0f172a]">Withdraw Treatment Offer?</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Withdrawing this offer will immediately revoke Robert's access to this 15% prompt settlement package and release the temporary Cath Lab slot reservation for Nov 4.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowWithdrawConfirm(false)}
                className="px-4 py-2 border border-slate-200 text-xs font-bold text-slate-700 rounded-xl hover:bg-slate-50 cursor-pointer"
              >
                Keep Offer Active
              </button>
              <button
                type="button"
                onClick={handleWithdrawOffer}
                className="px-4 py-2 bg-rose-600 text-white text-xs font-bold rounded-xl hover:bg-rose-700 cursor-pointer"
              >
                Confirm Withdraw
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 1. PATIENT CONTEXT CAPSULE (Figma 1:7987) */}
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

        <button
          type="button"
          onClick={() => navigate('/patients/8472-9901')}
          className="border border-[#e2e8f0] bg-white hover:bg-slate-50 text-[#334155] text-[12px] font-bold px-4 py-2 rounded-full flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>View Full Profile</span>
        </button>
      </div>

      {/* 2. SUCCESS & STATUS HERO BANNER (Figma 1:7990) */}
      <div className="bg-gradient-to-r from-[rgba(236,253,245,0.95)] via-[rgba(240,253,250,0.8)] to-white border border-[rgba(167,243,208,0.9)] content-stretch flex flex-col items-start p-[25px] relative rounded-[16px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] w-full gap-4">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-sm">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="text-[20px] font-bold text-[#065f46] leading-tight">
                  Treatment Offer Sent Successfully
                </h2>
                <span className="bg-emerald-100 text-[#065f46] border border-emerald-300 text-xs font-bold px-3 py-0.5 rounded-full">
                  Pending Patient Review (#{offer.offerId})
                </span>
              </div>
              <p className="text-xs text-[#047857] font-medium mt-0.5">
                The structured care plan and 0% financing terms have been delivered via encrypted multi-channel dispatch. Robert can now review, authorize digital financing, or decline this structured clinical care plan.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Metadata Strip */}
        <div className="flex items-center gap-6 pt-3 border-t border-emerald-200/60 w-full text-xs text-slate-600 font-medium">
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">Offer Ref:</span>
            <strong className="text-slate-900">#{offer.offerId}</strong>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>Dispatched: Oct 18, 2026 • 10:42 AM EST</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>Expiration: Nov 1, 2026 (14 Days Remaining)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-slate-400" />
            <span>Dispatch Channel: SMS (+1 555-***-9182)</span>
          </div>
        </div>
      </div>

      {/* 3. VISUAL OFFER LIFECYCLE TRAJECTORY (HORIZONTAL STEPPER - 5 PHASES) (Figma 1:8000) */}
      <div className="bg-white border border-[#e2e8f0] content-stretch flex flex-col gap-4 items-start p-[21px] relative rounded-[16px] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] w-full">
        <div className="flex items-center justify-between w-full border-b border-slate-100 pb-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Offer Lifecycle Trajectory
          </span>
          <span className="text-xs font-bold text-[#3f1d8b]">Step 3 of 5 In Progress</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 w-full">
          {/* Phase 1: Draft Created */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex flex-col gap-1">
            <div className="flex items-center gap-1.5 text-emerald-600 text-xs font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>1. Draft Created</span>
            </div>
            <span className="text-[11px] text-slate-500 font-medium">Oct 18, 10:30 AM</span>
            <span className="text-[10px] text-slate-400">Dr. M. Chang</span>
          </div>

          {/* Phase 2: Dispatched */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex flex-col gap-1">
            <div className="flex items-center gap-1.5 text-emerald-600 text-xs font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>2. Dispatched</span>
            </div>
            <span className="text-[11px] text-slate-500 font-medium">Oct 18, 10:42 AM</span>
            <span className="text-[10px] text-slate-400">Care ID Gateway</span>
          </div>

          {/* Phase 3: Patient Review (Current Active) */}
          <div className="bg-[rgba(63,29,139,0.04)] border-2 border-[#3f1d8b] rounded-xl p-3 flex flex-col gap-1 shadow-[0px_0px_0px_3px_rgba(63,29,139,0.1)]">
            <div className="flex items-center gap-1.5 text-[#3f1d8b] text-xs font-bold">
              <div className="w-2 h-2 rounded-full bg-[#3f1d8b] animate-pulse" />
              <span>3. Patient Review</span>
            </div>
            <span className="text-[11px] font-bold text-[#0f172a]">Awaiting Patient Decision</span>
            <span className="text-[10px] text-purple-700 font-semibold">14 Days Remaining</span>
          </div>

          {/* Phase 4: Digital Sign-Off */}
          <div className="bg-slate-50/60 border border-slate-200 rounded-xl p-3 flex flex-col gap-1 opacity-60">
            <span className="text-slate-500 text-xs font-bold">4. Digital Sign-Off</span>
            <span className="text-[11px] text-slate-400 font-medium">Pending Execution</span>
            <span className="text-[10px] text-slate-400">0% APR Contract</span>
          </div>

          {/* Phase 5: Clinical Handoff & Cath Lab */}
          <button
            type="button"
            onClick={() => navigate(`/treatment-offers/${offer.offerId}/accepted`, { state: offer })}
            className="bg-purple-50/50 hover:bg-purple-50 border border-purple-200 hover:border-purple-300 rounded-xl p-3 flex flex-col gap-1 transition-all text-left cursor-pointer group"
          >
            <div className="flex items-center justify-between w-full">
              <span className="text-[#3f1d8b] text-xs font-bold group-hover:underline">5. Clinical Handoff</span>
              <span className="bg-[#3f1d8b] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                Proceed
              </span>
            </div>
            <span className="text-[11px] text-[#3f1d8b] font-medium">Offer Accepted</span>
            <span className="text-[10px] text-slate-500">Begin Scheduling Flow →</span>
          </button>
        </div>
      </div>

      {/* 4. MAIN REVIEW & STATUS GRID (Figma 1:8020) */}
      <div className="grid grid-cols-12 gap-6 items-start w-full">
        {/* LEFT COLUMN: TREATMENT & FINANCIAL BREAKDOWN (7 COLS) */}
        <div className="col-span-12 lg:col-span-7 flex flex-col gap-6">
          {/* Card 1: Target Procedure Specifications */}
          <div className="bg-white border border-[#e2e8f0] rounded-[16px] p-[25px] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-50 text-[#3f1d8b] flex items-center justify-center shrink-0">
                  <Stethoscope className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-[16px] font-bold text-[#0f172a] leading-tight">
                    Target Procedure Specifications
                  </h3>
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

            <div className="bg-[#f8fafc] border border-slate-200/80 rounded-xl p-3.5 text-xs text-slate-600 flex flex-col gap-1">
              <span className="font-bold text-[#0f172a]">{offer.procedureName}</span>
              <p className="text-slate-500 leading-relaxed">
                <strong>Clinical Indication:</strong> {offer.clinicalNecessity}
              </p>
            </div>
          </div>

          {/* Card 2: Financial Breakdown Matrix */}
          <div className="bg-white border border-[#e2e8f0] rounded-[16px] p-[25px] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Percent className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-[16px] font-bold text-[#0f172a] leading-tight">
                    Financial Breakdown Matrix
                  </h3>
                  <p className="text-[12px] text-slate-500 font-medium">
                    Hospital Policy Governed • Standard 2026 Chargemaster
                  </p>
                </div>
              </div>
            </div>

            <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
              <div className="flex items-center justify-between p-3 border-b border-slate-100 bg-[#f8fafc]">
                <span className="text-slate-600 font-medium">Standard Hospital Chargemaster Baseline</span>
                <span className="font-bold text-slate-800">
                  ${offer.baselineFee.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 border-b border-slate-100 bg-emerald-50/40">
                <div className="flex flex-col">
                  <span className="text-emerald-800 font-bold">
                    Authorized Prompt Cash Settlement Discount ({offer.discountValue}.0%)
                  </span>
                  <span className="text-[11px] text-emerald-600">
                    Authorized clinician prompt-payment incentive (Under 20% cap)
                  </span>
                </div>
                <span className="font-extrabold text-emerald-700 text-sm">
                  -${offer.calculatedDiscount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 border-b border-slate-100 bg-[#f8fafc]">
                <span className="text-slate-600 font-medium">Net Discounted Procedure Baseline</span>
                <span className="font-bold text-slate-800">
                  ${offer.netProcedureCost.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 border-b border-slate-100 bg-white">
                <span className="text-slate-600 font-medium">Insurance Contribution (Self-Pay Patient)</span>
                <span className="font-bold text-slate-500">Self-Pay ($0.00)</span>
              </div>
              <div className="flex items-center justify-between p-3.5 bg-purple-50/60 font-bold">
                <div className="flex items-center gap-2">
                  <span className="text-[#0f172a] text-xs uppercase tracking-wide">
                    Total Patient Payment Responsibility
                  </span>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    ${offer.calculatedDiscount.toLocaleString()} USD • 15% Prompt Reduction
                  </span>
                </div>
                <span className="text-base text-[#3f1d8b] font-extrabold">
                  ${offer.netProcedureCost.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </div>

          {/* Card 3: Active Financing Integration */}
          <div className="bg-white border border-[#e2e8f0] rounded-[16px] p-[25px] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                  <CreditCard className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-[16px] font-bold text-[#0f172a] leading-tight">
                    Active Financing Integration
                  </h3>
                  <p className="text-[12px] text-slate-500 font-medium">
                    Pre-Approved Terms • {offer.financingPackageName}
                  </p>
                </div>
              </div>
              <span className="bg-[#3f1d8b] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                {offer.termMonths > 1 ? `${offer.termMonths} Equal Monthly Payments` : 'Single Settlement'}
              </span>
            </div>

            <div className="bg-[#fbf9fe] border border-purple-200 rounded-xl p-4 flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <h4 className="font-bold text-sm text-[#0f172a]">{offer.financingPackageName}</h4>
                <p className="text-xs text-slate-600">
                  Hospital-sponsored structured installment plan with automated servicing.
                </p>
                <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-1">
                  <span>APR: {offer.apr}</span>
                  <span>•</span>
                  <span>Total: {offer.totalPayable}</span>
                  <span>•</span>
                  <span className="text-emerald-700 font-semibold">No prepayment penalty</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                  Monthly Installment
                </span>
                <span className="text-xl font-extrabold text-[#3f1d8b]">
                  {offer.monthlyInstallment} <span className="text-xs font-normal">/ mo</span>
                </span>
              </div>
            </div>
          </div>

          {/* Card 4: Clinical Protocol & Next Steps */}
          <div className="bg-white border border-[#e2e8f0] rounded-[16px] p-[25px] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col gap-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Calendar className="w-4 h-4 text-[#3f1d8b]" />
              <h3 className="text-[16px] font-bold text-[#0f172a] leading-tight">
                Automated Dispatch Sequence & Next Steps
              </h3>
            </div>

            <div className="flex flex-col gap-3 text-xs text-slate-600">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-[#f8fafc] border border-slate-200">
                <div className="w-6 h-6 rounded-full bg-[#3f1d8b] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <strong className="text-slate-900 block">Patient Digital Acceptance</strong>
                  Patient reviews procedure breakdown, confirms 0% APR schedule, and signs digitally in the Care ID app.
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-[#f8fafc] border border-slate-200">
                <div className="w-6 h-6 rounded-full bg-[#3f1d8b] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <strong className="text-slate-900 block">Automatic Cath Lab Slot Clearance</strong>
                  Upon digital execution, Cath Lab slot for Nov 4 is automatically booked and registered across department calendars.
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-500">
                <Clock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span>
                  Automated SMS reminder triggers on Day 3, Day 7, and Day 12 if offer remains in pending review.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: DISPATCH MONITOR & CLINICIAN ACTIONS (5 COLS) */}
        <div className="col-span-12 lg:col-span-5 flex flex-col gap-6 sticky top-6">
          {/* Card 1: Live Dispatch Monitor */}
          <div className="bg-white border border-[#e2e8f0] rounded-[16px] p-[25px] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Send className="w-4 h-4 text-[#3f1d8b]" />
                <h3 className="font-bold text-sm text-[#0f172a]">Live Dispatch Monitor</h3>
              </div>
              <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                Active Channels
              </span>
            </div>

            {/* Delivery Channel List */}
            <div className="flex flex-col gap-2.5 text-xs">
              <div className="bg-[#f8fafc] border border-[#f1f5f9] rounded-xl p-3 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Smartphone className="w-4 h-4 text-[#3f1d8b]" />
                  <div>
                    <span className="font-bold text-slate-900 block">Care ID Patient App</span>
                    <span className="text-[11px] text-slate-500">Push notification delivered, read pending</span>
                  </div>
                </div>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Delivered
                </span>
              </div>

              <div className="bg-[#f8fafc] border border-[#f1f5f9] rounded-xl p-3 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#3f1d8b]" />
                  <div>
                    <span className="font-bold text-slate-900 block">SMS Priority Link</span>
                    <span className="text-[11px] text-slate-500">Delivered to +1 (555) •••-9182</span>
                  </div>
                </div>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Delivered
                </span>
              </div>

              <div className="bg-[#f8fafc] border border-[#f1f5f9] rounded-xl p-3 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Globe className="w-4 h-4 text-[#3f1d8b]" />
                  <div>
                    <span className="font-bold text-slate-900 block">Patient Portal Web</span>
                    <span className="text-[11px] text-slate-500">Active session 12 mins ago</span>
                  </div>
                </div>
                <span className="bg-purple-100 text-[#3f1d8b] text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Synced
                </span>
              </div>
            </div>

            {/* Resend Button */}
            <button
              type="button"
              onClick={handleResendSms}
              className="w-full py-2.5 border border-[#e2e8f0] rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
              <span>Resend Patient SMS Link</span>
            </button>
          </div>

          {/* Card 2: Clinician Actions */}
          <div className="bg-white border border-[#e2e8f0] rounded-[16px] p-[25px] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col gap-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Building className="w-4 h-4 text-[#3f1d8b]" />
              <h3 className="font-bold text-sm text-[#0f172a]">Clinician Actions & Controls</h3>
            </div>

            <div className="flex flex-col gap-2.5">
              <button
                type="button"
                onClick={() => navigate(`/treatment-offers/${offer.offerId}/accepted`, { state: offer })}
                className="w-full py-3 bg-[#24005A] hover:bg-[#34007a] text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Clinical Handoff & Scheduling</span>
                <ArrowRight className="w-4 h-4 text-emerald-400" />
              </button>

              <button
                type="button"
                onClick={() => setShowPdfModal(true)}
                className="w-full py-2.5 border border-[#e2e8f0] bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <FileText className="w-4 h-4 text-slate-500" />
                <span>View Full Offer Agreement (PDF)</span>
              </button>

              <button
                type="button"
                onClick={() => navigate('/treatment-offers/new/step-1', { state: offer })}
                className="w-full py-2.5 border border-[#e2e8f0] bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                Modify Offer Terms
              </button>

              <button
                type="button"
                onClick={() => setShowWithdrawConfirm(true)}
                className="w-full py-2 text-rose-600 hover:text-rose-700 hover:bg-rose-50 text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                Withdraw / Cancel Offer
              </button>

              <div className="pt-2 border-t border-slate-100 flex flex-col gap-1">
                <button
                  type="button"
                  onClick={() => navigate(`/treatment-offers/${offer.offerId}/cath-lab-safety`, { state: offer })}
                  className="text-[11px] text-slate-400 hover:text-slate-600 flex items-center justify-center gap-1.5 py-1 text-center transition-colors cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                  <span>Developer Testing: Direct Cath Lab Time-Out Bypass</span>
                </button>
              </div>
            </div>
          </div>

          {/* Card 3: Audit & Governance Trail */}
          <div className="bg-white border border-[#e2e8f0] rounded-[16px] p-[21px] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col gap-3 text-xs text-slate-600">
            <div className="flex items-center gap-2 font-bold text-[#0f172a] border-b border-slate-100 pb-2">
              <ShieldCheck className="w-4 h-4 text-[#3f1d8b]" />
              <span>Audit & Governance Trail</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Attending Physician:</span>
              <span className="font-semibold text-slate-800">Dr. Michael Chang (Lic #88392)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Department:</span>
              <span className="font-semibold text-slate-800">Cardiology Department</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Hospital Rulebook:</span>
              <span className="font-semibold text-emerald-600">Prompt-Pay Standard 2026</span>
            </div>
            <div className="flex flex-col gap-1 pt-1 border-t border-slate-100">
              <span className="text-[10px] text-slate-400 uppercase tracking-wide">
                Immutable Cryptographic Hash:
              </span>
              <div className="flex items-center gap-1.5 font-mono text-[11px] text-slate-500 bg-slate-50 p-1.5 rounded border border-slate-200 break-all">
                <Hash className="w-3.5 h-3.5 shrink-0 text-purple-600" />
                <span>SHA256-8921-TR-VERIFIED-7A890D</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

