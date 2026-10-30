import React, { useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  ShieldCheck,
  Lock,
  Stethoscope,
  Percent,
  CreditCard,
  FileText,
  Calendar,
  Save,
  XCircle,
} from 'lucide-react';
import {
  TreatmentOfferState,
  DEFAULT_OFFER_STATE,
  FINANCING_PACKAGES_MAP,
} from './types';

export const TreatmentOfferCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Extract initial financing parameters passed from Insurance & Financing Hub
  const hubPayload = location.state as Partial<TreatmentOfferState> | undefined;

  // Resolve initial financing package ID with robust fallback to 'careid-0'
  const initialPackageId = useMemo(() => {
    const rawId = hubPayload?.financingPackageId;
    if (rawId && FINANCING_PACKAGES_MAP[rawId]) {
      return rawId === 'careid-zero' ? 'careid-0' : rawId;
    }
    return 'careid-0';
  }, [hubPayload?.financingPackageId]);

  // Form State initialized with defaults or incoming hub payload
  const [procedureCode, setProcedureCode] = useState<string>(
    hubPayload?.cptCode || DEFAULT_OFFER_STATE.cptCode
  );
  const [procedureName, setProcedureName] = useState<string>(
    hubPayload?.procedureName || DEFAULT_OFFER_STATE.procedureName
  );
  const [clinicalNecessity, setClinicalNecessity] = useState<string>(
    DEFAULT_OFFER_STATE.clinicalNecessity
  );
  const [baselineFee, setBaselineFee] = useState<number>(
    hubPayload?.baselineFee || DEFAULT_OFFER_STATE.baselineFee
  );

  const [discountEnabled, setDiscountEnabled] = useState<boolean>(true);
  const [discountMode, setDiscountMode] = useState<'percentage' | 'fixed'>('percentage');
  const [discountPercent, setDiscountPercent] = useState<number>(15);
  const [discountFixed, setDiscountFixed] = useState<number>(780);

  const [selectedFinancingPkg, setSelectedFinancingPkg] = useState<string>(initialPackageId);

  const [offerTitle, setOfferTitle] = useState<string>(DEFAULT_OFFER_STATE.offerTitle);
  const [expirationDate] = useState<string>('11 / 01 / 2026');
  const [doctorNotes, setDoctorNotes] = useState<string>(DEFAULT_OFFER_STATE.doctorNotes);
  const [complianceConfirmed, setComplianceConfirmed] = useState<boolean>(true);
  const [showSavedToast, setShowSavedToast] = useState<boolean>(false);

  // Dynamic calculations based on discount settings and active financing package
  const {
    discountAmount,
    netProcedureCost,
    activePackage,
    monthlyPayment,
    totalPayableDisplay,
  } = useMemo(() => {
    let disc = 0;
    if (discountEnabled) {
      if (discountMode === 'percentage') {
        disc = Math.round((baselineFee * discountPercent) / 100);
      } else {
        disc = Math.min(discountFixed, baselineFee);
      }
    }
    const net = Math.max(baselineFee - disc, 0);

    const pkg = FINANCING_PACKAGES_MAP[selectedFinancingPkg] || FINANCING_PACKAGES_MAP['careid-0'];
    const monthlyNum = pkg.calculateMonthly(net);
    const totalNum = pkg.calculateTotal(net);

    const monthlyStr = monthlyNum.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    const totalStr = totalNum.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    return {
      discountAmount: disc,
      netProcedureCost: net,
      activePackage: pkg,
      monthlyPayment: monthlyStr,
      monthlyPaymentNum: monthlyNum,
      totalPayableNum: totalNum,
      totalPayableDisplay: totalStr,
    };
  }, [baselineFee, discountEnabled, discountMode, discountPercent, discountFixed, selectedFinancingPkg]);

  // Handle proceed to Review
  const handleProceedToReview = () => {
    const payload: TreatmentOfferState = {
      ...DEFAULT_OFFER_STATE,
      cptCode: procedureCode,
      procedureName,
      clinicalNecessity,
      baselineFee,
      discountEnabled,
      discountMode,
      discountValue: discountMode === 'percentage' ? discountPercent : discountFixed,
      calculatedDiscount: discountAmount,
      netProcedureCost,
      financingPackageId: activePackage.id,
      financingPackageName: activePackage.name,
      monthlyInstallment: `$${monthlyPayment}`,
      termMonths: activePackage.termMonths,
      apr: activePackage.aprDisplay,
      totalPayable: `$${totalPayableDisplay}`,
      offerTitle,
      expirationDate: 'November 1, 2026',
      doctorNotes,
      complianceConfirmed,
    };

    navigate('/treatment-offers/TR-8921/review', { state: payload });
  };

  const handleSaveDraft = () => {
    setShowSavedToast(true);
    setTimeout(() => setShowSavedToast(false), 3000);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1280px] mx-auto pb-16 font-['Plus_Jakarta_Sans',sans-serif] text-[#0f172a]">
      {/* Toast Notification */}
      {showSavedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0f172a] text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 border border-slate-700 animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="text-sm font-medium">Treatment Offer draft saved successfully.</span>
        </div>
      )}

      {/* 1. PATIENT CONTEXT HEADER BANNER (Figma 1:7041) */}
      <div className="bg-white border border-[#e2e8f0]/90 content-stretch flex items-center justify-between p-[25px] relative rounded-[16px] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] w-full">
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
            onClick={() => navigate('/patients/8472-9901/financing')}
            className="border border-[#e2e8f0] bg-white hover:bg-slate-50 text-[#334155] text-[12px] font-bold px-4 py-2.5 rounded-full flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Financing Options</span>
          </button>
          <button
            type="button"
            onClick={() => navigate('/patients/8472-9901')}
            className="border border-[#e2e8f0] bg-white hover:bg-slate-50 text-[#334155] text-[12px] font-bold px-4 py-2.5 rounded-full flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Full Profile</span>
          </button>
        </div>
      </div>

      {/* 2. WORKFLOW STEP INDICATOR (Figma 1:7079) */}
      <div className="bg-white border border-[#e2e8f0]/90 rounded-[12px] px-6 py-3.5 flex items-center justify-between shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
        <div className="flex items-center gap-3 w-full justify-between">
          {/* Step 1: Completed */}
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
                Step 1: Completed
              </span>
              <span className="text-[13px] font-semibold text-slate-700 group-hover:text-[#3f1d8b]">
                Select Financing Options
              </span>
            </div>
          </button>

          <div className="h-px bg-slate-200 flex-1 mx-4 max-w-[80px]" />

          {/* Step 2: Active */}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-[#3f1d8b] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-md ring-4 ring-purple-100">
              2
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-bold text-[#3f1d8b] uppercase tracking-wider">
                Step 2: Active
              </span>
              <span className="text-[13px] font-bold text-[#0f172a]">
                Configure Treatment Offer
              </span>
            </div>
          </div>

          <div className="h-px bg-slate-200 flex-1 mx-4 max-w-[80px]" />

          {/* Step 3: Upcoming */}
          <div className="flex items-center gap-2.5 opacity-60">
            <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-500 border border-slate-300 flex items-center justify-center font-bold text-xs shrink-0">
              3
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Step 3
              </span>
              <span className="text-[13px] font-medium text-slate-500">
                Review & Send to Patient
              </span>
            </div>
          </div>

          <div className="h-px bg-slate-200 flex-1 mx-4 max-w-[80px]" />

          {/* Step 4: Upcoming */}
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

      {/* 3. TWO-COLUMN WORKFLOW GRID: FORM (LEFT) vs LIVE PRICING SUMMARY (RIGHT) (Figma 1:7104) */}
      <div className="grid grid-cols-12 gap-6 items-start w-full">
        {/* LEFT COLUMN: FORM SECTIONS (COL 1-7) */}
        <div className="col-span-12 lg:col-span-7 flex flex-col gap-6">
          {/* SECTION A: TREATMENT PROCEDURE & CLINICAL CONTEXT */}
          <div className="bg-white border border-[#e2e8f0]/90 rounded-[16px] p-[25px] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col gap-5">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
              <div className="w-8 h-8 rounded-lg bg-purple-50 text-[#3f1d8b] flex items-center justify-center shrink-0">
                <Stethoscope className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-[16px] font-bold text-[#0f172a] leading-tight">
                  1. Treatment Procedure & Clinical Context
                </h2>
                <p className="text-[12px] text-slate-500 font-medium">
                  Procedure Selection & Clinical Indications (#REF-4491 Verified)
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {/* Target Procedure */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-bold text-[#334155] tracking-wide uppercase">
                  Target Procedure / CPT Code *
                </label>
                <div className="relative">
                  <select
                    value={procedureCode}
                    onChange={(e) => {
                      setProcedureCode(e.target.value);
                      if (e.target.value === 'CPT #93458') {
                        setProcedureName('Left Heart Catheterization with Coronary Angiogram');
                        setBaselineFee(5200);
                      } else if (e.target.value === 'CPT #92928') {
                        setProcedureName('Percutaneous Coronary Intervention (PCI) with Single Stent');
                        setBaselineFee(8400);
                      }
                    }}
                    className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-[#0f172a] focus:outline-none focus:ring-2 focus:ring-[#3f1d8b] focus:bg-white transition-all cursor-pointer"
                  >
                    <option value="CPT #93458">
                      CPT #93458 - Left Heart Catheterization with Coronary Angiogram
                    </option>
                    <option value="CPT #92928">
                      CPT #92928 - Percutaneous Coronary Intervention (PCI) with Single Stent
                    </option>
                  </select>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="bg-purple-50 text-[#3f1d8b] border border-purple-200 text-[11px] font-bold px-2 py-0.5 rounded-md">
                    CPT #93458 Verified
                  </span>
                  <span className="bg-slate-100 text-slate-600 text-[11px] font-medium px-2 py-0.5 rounded-md">
                    Tier 1 Cath Lab Procedure
                  </span>
                </div>
              </div>

              {/* Clinical Necessity Summary */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-bold text-[#334155] tracking-wide uppercase">
                  Clinical Necessity Summary
                </label>
                <textarea
                  rows={2}
                  value={clinicalNecessity}
                  onChange={(e) => setClinicalNecessity(e.target.value)}
                  className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl p-3 text-xs font-medium text-[#334155] focus:outline-none focus:ring-2 focus:ring-[#3f1d8b] focus:bg-white resize-none"
                />
              </div>

              {/* Standard Chargemaster Baseline Fee */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-bold text-[#334155] tracking-wide uppercase">
                  Standard Hospital Baseline Fee (Chargemaster)
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3.5 text-sm font-bold text-slate-400">$</span>
                  <input
                    type="number"
                    value={baselineFee}
                    onChange={(e) => setBaselineFee(Number(e.target.value) || 0)}
                    className="w-full pl-8 pr-3.5 py-2.5 bg-[#f8fafc] border border-slate-200 rounded-xl text-sm font-bold text-[#0f172a] focus:outline-none focus:ring-2 focus:ring-[#3f1d8b] focus:bg-white"
                  />
                </div>
                <p className="text-[11px] text-slate-400 font-medium">
                  Hospital master chargemaster fee calibrated for Mount Sinai Heart Center Outpatient Unit.
                </p>
              </div>
            </div>
          </div>

          {/* SECTION B: TREATMENT DISCOUNT & CASH SETTLEMENT */}
          <div className="bg-white border border-[#e2e8f0]/90 rounded-[16px] p-[25px] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col gap-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Percent className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-[16px] font-bold text-[#0f172a] leading-tight">
                    2. Configure Treatment Discount
                  </h2>
                  <p className="text-[12px] text-slate-500 font-medium">
                    Apply hospital-permitted uninsured prompt settlement discount
                  </p>
                </div>
              </div>

              {/* Toggle */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-600">
                  {discountEnabled ? 'Discount Enabled' : 'Disabled'}
                </span>
                <button
                  type="button"
                  onClick={() => setDiscountEnabled(!discountEnabled)}
                  className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                    discountEnabled ? 'bg-[#3f1d8b]' : 'bg-slate-300'
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                      discountEnabled ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>

            {discountEnabled && (
              <div className="flex flex-col gap-4">
                {/* Discount Mode */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] font-bold text-[#334155] tracking-wide uppercase">
                    Discount Calculation Mode
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setDiscountMode('percentage')}
                      className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                        discountMode === 'percentage'
                          ? 'border-[#3f1d8b] bg-purple-50 text-[#3f1d8b] shadow-xs'
                          : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      Percentage (%)
                    </button>
                    <button
                      type="button"
                      onClick={() => setDiscountMode('fixed')}
                      className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                        discountMode === 'fixed'
                          ? 'border-[#3f1d8b] bg-purple-50 text-[#3f1d8b] shadow-xs'
                          : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      Fixed Amount ($)
                    </button>
                  </div>
                </div>

                {/* Rate Input & Slider */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <label className="text-[12px] font-bold text-[#334155] tracking-wide uppercase">
                      Discount Rate ({discountMode === 'percentage' ? '%' : '$'})
                    </label>
                    <span className="text-[11px] font-semibold text-slate-400">
                      Max Permitted: 20.0%
                    </span>
                  </div>

                  {discountMode === 'percentage' ? (
                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        min="0"
                        max="20"
                        step="1"
                        value={discountPercent}
                        onChange={(e) => setDiscountPercent(Number(e.target.value))}
                        className="flex-1 accent-[#3f1d8b] cursor-pointer"
                      />
                      <div className="w-20 relative flex items-center">
                        <input
                          type="number"
                          min="0"
                          max="20"
                          value={discountPercent}
                          onChange={(e) =>
                            setDiscountPercent(Math.min(Math.max(Number(e.target.value) || 0, 0), 20))
                          }
                          className="w-full text-right pr-6 py-1.5 bg-[#f8fafc] border border-slate-200 rounded-lg text-sm font-bold text-[#0f172a]"
                        />
                        <span className="absolute right-2 text-xs font-bold text-slate-400">%</span>
                      </div>
                    </div>
                  ) : (
                    <div className="relative flex items-center">
                      <span className="absolute left-3.5 text-sm font-bold text-slate-400">$</span>
                      <input
                        type="number"
                        min="0"
                        max={baselineFee * 0.2}
                        value={discountFixed}
                        onChange={(e) => setDiscountFixed(Number(e.target.value) || 0)}
                        className="w-full pl-8 pr-3.5 py-2 bg-[#f8fafc] border border-slate-200 rounded-lg text-sm font-bold text-[#0f172a]"
                      />
                    </div>
                  )}
                </div>

                {/* Live Mathematical Calculation Banner (Figma 1:7220) */}
                <div className="bg-[#f0fdf4] border border-[#bbf7d0] rounded-[12px] p-3.5 flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-emerald-800">
                      Calculated Savings for Robert: {discountMode === 'percentage' ? `${discountPercent}.0%` : `$${discountFixed}`} prompt settlement reduction from baseline (${baselineFee.toLocaleString()})
                    </span>
                    <span className="text-sm font-extrabold text-emerald-700">
                      -${discountAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 pt-1 border-t border-emerald-200/60">
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      Automatic validation: Within 20% cap
                    </span>
                    <span className="text-[11px] text-emerald-700 font-medium">
                      Discount valid: Does not exceed procedure baseline cost. No supervisor pre-clearance required (≤ 15%).
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* SECTION C: FINANCING INTEGRATION (PREVIOUS SELECTION INTEGRATION) */}
          <div className="bg-white border border-[#e2e8f0]/90 rounded-[16px] p-[25px] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col gap-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                  <CreditCard className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-[16px] font-bold text-[#0f172a] leading-tight">
                    3. Financing Option Integration
                  </h2>
                  <p className="text-[12px] text-slate-500 font-medium">
                    Active selection linked from Financing Hub comparison
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => navigate('/patients/8472-9901/financing')}
                className="text-[12px] font-bold text-[#3f1d8b] hover:underline cursor-pointer"
              >
                Change Package in Hub
              </button>
            </div>

            <div className="flex flex-col gap-3">
              {/* Option 1: Care ID In-House 0% APR */}
              <div
                onClick={() => setSelectedFinancingPkg('careid-0')}
                className={`p-4 rounded-[14px] border-2 transition-all cursor-pointer flex flex-col gap-2 relative ${
                  selectedFinancingPkg === 'careid-0' || selectedFinancingPkg === 'careid-zero'
                    ? 'border-[#3f1d8b] bg-[#fbf9fe] shadow-sm'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-[#0f172a]">
                      Care ID In-House 0% APR (Pre-Qualified)
                    </h3>
                    {(selectedFinancingPkg === 'careid-0' || selectedFinancingPkg === 'careid-zero') && (
                      <span className="bg-[#3f1d8b] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        SELECTED
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-bold text-[#3f1d8b]">0% Interest</span>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-600 font-medium">
                  <span className="text-base font-extrabold text-[#3f1d8b]">
                    ${(netProcedureCost / 12).toFixed(2)} / mo
                  </span>
                  <span>(${netProcedureCost.toLocaleString('en-US', { minimumFractionDigits: 2 })} Total)</span>
                  <span>•</span>
                  <span>12 Months Fixed</span>
                </div>

                <div className="flex items-center gap-2 pt-1 border-t border-purple-100 text-[11px] text-slate-500">
                  <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-700 font-semibold">
                    $0 Enrollment Fee
                  </span>
                  <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-700 font-semibold">
                    No Early Payoff Penalty
                  </span>
                  <span className="text-slate-400">Soft inquiry check approved for up to $6,000.00</span>
                </div>
              </div>

              {/* Option 2: HealthPay Bridge Credit Line */}
              <div
                onClick={() => setSelectedFinancingPkg('healthpay-bridge')}
                className={`p-4 rounded-[14px] border-2 transition-all cursor-pointer flex flex-col gap-2 relative ${
                  selectedFinancingPkg === 'healthpay-bridge'
                    ? 'border-[#3f1d8b] bg-[#fbf9fe] shadow-sm'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-[#0f172a]">
                      HealthPay Bridge Credit Line
                    </h3>
                    {selectedFinancingPkg === 'healthpay-bridge' && (
                      <span className="bg-[#3f1d8b] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        SELECTED
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-bold text-teal-700">5.9% Fixed APR</span>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-600 font-medium">
                  <span className="text-base font-extrabold text-teal-700">
                    ${((netProcedureCost * 1.077828) / 24).toFixed(2)} / mo
                  </span>
                  <span>(${Number((netProcedureCost * 1.077828).toFixed(2)).toLocaleString('en-US', { minimumFractionDigits: 2 })} Total)</span>
                  <span>•</span>
                  <span>24 Months Term</span>
                </div>

                <div className="flex items-center gap-2 pt-1 border-t border-slate-100 text-[11px] text-slate-500">
                  <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-700 font-semibold">
                    Pre-Approved Tier A
                  </span>
                  <span className="text-slate-400">Available credit up to $15,000.00</span>
                </div>
              </div>

              {/* Option 3: MedPay Flex Extended Plan */}
              <div
                onClick={() => setSelectedFinancingPkg('medpay-flex')}
                className={`p-4 rounded-[14px] border-2 transition-all cursor-pointer flex flex-col gap-2 relative ${
                  selectedFinancingPkg === 'medpay-flex'
                    ? 'border-[#3f1d8b] bg-[#fbf9fe] shadow-sm'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-[#0f172a]">
                      MedPay Flex Extended Plan
                    </h3>
                    {selectedFinancingPkg === 'medpay-flex' && (
                      <span className="bg-[#3f1d8b] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        SELECTED
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-bold text-slate-700">9.9% APR Loan</span>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-600 font-medium">
                  <span className="text-base font-extrabold text-slate-800">
                    ${((netProcedureCost * 1.150045) / 36).toFixed(2)} / mo
                  </span>
                  <span>(${Number((netProcedureCost * 1.150045).toFixed(2)).toLocaleString('en-US', { minimumFractionDigits: 2 })} Total)</span>
                  <span>•</span>
                  <span>36 Months Term</span>
                </div>

                <div className="flex items-center gap-2 pt-1 border-t border-slate-100 text-[11px] text-slate-500">
                  <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-700 font-semibold">
                    Lowest Monthly
                  </span>
                  <span className="text-slate-400">$0 Down Payment at discharge</span>
                </div>
              </div>

              {/* Option 4: Full Cash Payment */}
              <div
                onClick={() => setSelectedFinancingPkg('prompt-cash')}
                className={`p-4 rounded-[14px] border-2 transition-all cursor-pointer flex flex-col gap-1.5 ${
                  selectedFinancingPkg === 'prompt-cash'
                    ? 'border-[#3f1d8b] bg-[#fbf9fe] shadow-sm'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-[#0f172a]">
                      No Financing / Prompt Full Cash Payment
                    </h3>
                    {selectedFinancingPkg === 'prompt-cash' && (
                      <span className="bg-[#3f1d8b] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        SELECTED
                      </span>
                    )}
                  </div>
                  <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    Full Settlement
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium">
                  Patient will pay the full discounted balance (${netProcedureCost.toLocaleString('en-US', { minimumFractionDigits: 2 })}) at time of hospital intake.
                </p>
              </div>
            </div>
          </div>

          {/* SECTION D: OFFER VALIDITY, NOTES & ACKNOWLEDGMENT */}
          <div className="bg-white border border-[#e2e8f0]/90 rounded-[16px] p-[25px] shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col gap-5">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-[16px] font-bold text-[#0f172a] leading-tight">
                  4. Offer Validity & Clinical Remarks
                </h2>
                <p className="text-[12px] text-slate-500 font-medium">
                  Define the validity period and customized clinical remarks for Robert
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {/* Offer Title */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-bold text-[#334155] tracking-wide uppercase">
                  Offer Title / Care Plan Identifier *
                </label>
                <input
                  type="text"
                  value={offerTitle}
                  onChange={(e) => setOfferTitle(e.target.value)}
                  className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-[#0f172a] focus:outline-none focus:ring-2 focus:ring-[#3f1d8b] focus:bg-white"
                />
              </div>

              {/* Expiration Date */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-bold text-[#334155] tracking-wide uppercase">
                  Offer Expiration Date (Standard 14-Day Clinical Hold)
                </label>
                <div className="relative flex items-center">
                  <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5" />
                  <input
                    type="text"
                    readOnly
                    value={expirationDate}
                    className="w-full pl-10 pr-3.5 py-2.5 bg-[#f8fafc] border border-slate-200 rounded-xl text-xs font-semibold text-slate-700"
                  />
                </div>
                <p className="text-[11px] text-slate-400 font-medium">
                  Standard 14-day clinical hold window
                </p>
              </div>

              {/* Personalized Instructions */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-bold text-[#334155] tracking-wide uppercase">
                  Personalized Instructions for Robert J. Sterling
                </label>
                <textarea
                  rows={3}
                  value={doctorNotes}
                  onChange={(e) => setDoctorNotes(e.target.value)}
                  className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl p-3 text-xs font-medium text-[#334155] focus:outline-none focus:ring-2 focus:ring-[#3f1d8b] focus:bg-white resize-none"
                />
              </div>

              {/* Compliance Confirmation Checkbox */}
              <label className="flex items-start gap-2.5 pt-2 border-t border-slate-100 cursor-pointer">
                <input
                  type="checkbox"
                  checked={complianceConfirmed}
                  onChange={(e) => setComplianceConfirmed(e.target.checked)}
                  className="mt-0.5 rounded border-slate-300 text-[#3f1d8b] focus:ring-[#3f1d8b] cursor-pointer"
                />
                <span className="text-[12px] text-slate-600 font-medium leading-relaxed">
                  I confirm that this prompt cash settlement discount complies with Mount Sinai Cardiology Department financial governance and does not exceed the clinical threshold of 20%.
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: LIVE PRICING PANEL (COL 8-12) (Figma 1:7104) */}
        <div className="col-span-12 lg:col-span-5 flex flex-col gap-6 sticky top-6">
          {/* MASTER LIVE OFFER BREAKDOWN CARD */}
          <div className="bg-gradient-to-b from-white to-[#f8fafc]/90 border-2 border-[#e2e8f0]/90 rounded-[16px] p-[26px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] flex flex-col gap-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-[17px] font-bold text-[#0f172a] leading-tight">
                  Treatment Offer Summary
                </h3>
                <p className="text-[12px] text-slate-500 font-medium">
                  Live calculating patient responsibility
                </p>
              </div>
              <span className="bg-purple-100 text-[#3f1d8b] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                Draft Preview
              </span>
            </div>

            {/* Context Rows */}
            <div className="flex flex-col gap-2 text-xs font-medium">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Patient:</span>
                <span className="font-bold text-[#0f172a]">Robert J. Sterling (CID #8472–9901)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Procedure:</span>
                <span className="font-bold text-[#0f172a]">Diagnostic Angiogram (#93458)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Insurance Status:</span>
                <span className="font-bold text-[#991b1b]">Uninsured / Self-Pay</span>
              </div>
            </div>

            <div className="h-px bg-slate-200" />

            {/* Price Breakdown */}
            <div className="flex flex-col gap-2.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-600 font-medium">Standard Hospital Baseline Fee:</span>
                <span className="font-bold text-slate-800">
                  ${baselineFee.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-emerald-700 font-medium">
                  {discountPercent}% Prompt Cash Discount:
                </span>
                <span className="font-bold text-emerald-700">
                  -${discountAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-slate-100 font-bold">
                <span className="text-[#0f172a] text-xs uppercase tracking-wide">
                  Net Discounted Procedure Cost:
                </span>
                <span className="text-sm text-[#0f172a]">
                  ${netProcedureCost.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            <div className="h-px bg-slate-200" />

            {/* Financing Section */}
            {activePackage.id !== 'prompt-cash' ? (
              <div className="flex flex-col gap-2 text-xs bg-purple-50/50 p-3.5 rounded-xl border border-purple-100">
                <span className="font-bold text-[#3f1d8b]">{activePackage.name}:</span>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Estimated Monthly Installment:</span>
                  <span className="text-lg font-extrabold text-[#3f1d8b]">
                    ${monthlyPayment} <span className="text-xs font-medium text-slate-500">/ month</span>
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span>Term: {activePackage.termMonthsDisplay}</span>
                  <span>APR: {activePackage.aprDisplay}</span>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-1 text-xs bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <span className="font-bold text-slate-700">Prompt Full Cash Payment:</span>
                <span className="text-slate-500">
                  Single settlement payment of ${netProcedureCost.toLocaleString('en-US', { minimumFractionDigits: 2 })} due at intake.
                </span>
              </div>
            )}

            {/* Total Patient Payable Box */}
            <div className="bg-[#f8fafc] border border-slate-200 rounded-[12px] p-4 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  Total Net Patient Payable
                </span>
                <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2 py-0.5 rounded-full w-fit mt-1">
                  Saved ${discountAmount.toLocaleString()} total
                </span>
              </div>
              <div className="text-[24px] font-extrabold text-[#0f172a] tracking-tight">
                ${totalPayableDisplay}
              </div>
            </div>

            {/* Pre-approval Reassurance Box */}
            <div className="flex items-start gap-2.5 bg-slate-50 border border-slate-200/80 rounded-xl p-3 text-[11px] text-slate-600 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong>Pre-Approved Hospital Installment:</strong> Generating this offer commits zero hard credit pull for Robert J. Sterling. Offer valid through Nov 1, 2026.
              </span>
            </div>
          </div>

          {/* PRIMARY WORKFLOW ACTION BUTTONS (Figma 1:7453 & 1:7454) */}
          <div className="flex flex-col gap-3 w-full pt-2">
            <button
              type="button"
              onClick={handleProceedToReview}
              className="w-full h-[48px] bg-gradient-to-b from-[#a44cff] to-[#5b14b8] text-white text-[14px] font-bold rounded-[9999px] shadow-[0px_10px_15px_-3px_rgba(88,28,135,0.2),0px_4px_6px_-4px_rgba(88,28,135,0.2)] hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus:ring-4 focus:ring-purple-200"
            >
              <span>Review & Generate Offer</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>

            {/* Secondary Actions (Figma 1:7461) */}
            <div className="flex items-center gap-[12px] w-full">
              <button
                type="button"
                onClick={handleSaveDraft}
                className="flex-1 h-[38px] bg-white border border-[#e2e8f0] text-[#334155] text-[12px] font-semibold rounded-[12px] px-[17px] hover:bg-slate-50 transition-colors shadow-xs flex items-center justify-center gap-[6px] cursor-pointer"
              >
                <Save className="w-3.5 h-3.5 text-slate-500" />
                <span>Save Draft</span>
              </button>
              <button
                type="button"
                onClick={() => navigate('/patients/8472-9901/financing')}
                className="flex-1 h-[38px] bg-white border border-[#e2e8f0] text-[#e11d48] text-[12px] font-semibold rounded-[12px] px-[17px] hover:bg-rose-50 transition-colors shadow-xs flex items-center justify-center gap-[6px] cursor-pointer"
              >
                <XCircle className="w-3.5 h-3.5 text-rose-500" />
                <span>Cancel Offer</span>
              </button>
            </div>
          </div>

          {/* AUDIT & CLINICAL COMPLIANCE FOOTER CARD (Figma 1:7473) */}
          <div className="bg-white border border-[#e2e8f0]/80 rounded-[14px] p-3.5 flex items-center gap-3 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
            <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
              <Lock className="w-3.5 h-3.5" />
            </div>
            <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
              <strong>Secure Transmission via Care ID Network:</strong> Offer will be encrypted and dispatched directly to Robert's Care ID iOS/Android app with an encrypted SMS alert.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
