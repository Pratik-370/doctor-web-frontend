import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Bell,
  Check,
  ChevronRight,
  ArrowRight,
  Printer,
  ChevronLeft,
  User,
  Zap,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Financing package interface
interface FinancingPackage {
  id: 'careid-0' | 'healthpay-bridge' | 'medpay-flex';
  name: string;
  partnerTag: string;
  tagColor: string;
  badge: string;
  badgeBg: string;
  badgeColor: string;
  monthlyAmount: number;
  monthlyAmountDisplay: string;
  termMonths: number;
  termMonthsDisplay: string;
  totalPayable: number;
  totalPayableDisplay: string;
  apr: number;
  aprDisplay: string;
  enrollmentFee: string;
  penaltyFee: string;
  availableCredit: string;
  creditStatus: string;
  creditStatusColor: string;
  isPopular?: boolean;
}

const FINANCING_PACKAGES: FinancingPackage[] = [
  {
    id: 'careid-0',
    name: 'Care ID In-House 0% APR',
    partnerTag: 'CARE ID DIRECT',
    tagColor: 'text-[#3f1d8b]',
    badge: '0% APR',
    badgeBg: 'bg-[#f3e8ff]',
    badgeColor: 'text-[#3f1d8b]',
    monthlyAmount: 368.33,
    monthlyAmountDisplay: '$368.33',
    termMonths: 12,
    termMonthsDisplay: '12 Months Fixed',
    totalPayable: 4420.0,
    totalPayableDisplay: '$4,420.00',
    apr: 0.0,
    aprDisplay: '0.0% APR Fixed Rate',
    enrollmentFee: '$0 Fee: Zero enrollment, zero early payoff penalty',
    penaltyFee: 'None (Pay anytime without fee)',
    availableCredit: 'Up to $6,000.00',
    creditStatus: 'Pre-Qualified Instant Soft Check',
    creditStatusColor: 'text-[#047857]',
    isPopular: true,
  },
  {
    id: 'healthpay-bridge',
    name: 'HealthPay Bridge Credit Line',
    partnerTag: 'HEALTHPAY PARTNER',
    tagColor: 'text-[#64748b]',
    badge: 'Flexible 24-36 Mo',
    badgeBg: 'bg-[#f0fdfa]',
    badgeColor: 'text-[#0f766e]',
    monthlyAmount: 198.5,
    monthlyAmountDisplay: '$198.50',
    termMonths: 24,
    termMonthsDisplay: '24 Months Term',
    totalPayable: 4764.0,
    totalPayableDisplay: '$4,764.00',
    apr: 5.9,
    aprDisplay: '5.9% Fixed APR',
    enrollmentFee: '$25 Annual Servicing Fee (Waived Year 1)',
    penaltyFee: 'None',
    availableCredit: 'Up to $15,000.00',
    creditStatus: 'Pre-Approved Tier A',
    creditStatusColor: 'text-[#0f766e]',
    isPopular: false,
  },
  {
    id: 'medpay-flex',
    name: 'MedPay Flex Split-Tier',
    partnerTag: 'MEDPAY NETWORK',
    tagColor: 'text-[#64748b]',
    badge: 'Lowest Monthly',
    badgeBg: 'bg-[#f1f5f9]',
    badgeColor: 'text-[#334155]',
    monthlyAmount: 141.2,
    monthlyAmountDisplay: '$141.20',
    termMonths: 36,
    termMonthsDisplay: '36 Months Term',
    totalPayable: 5083.2,
    totalPayableDisplay: '$5,083.20',
    apr: 9.9,
    aprDisplay: '9.9% APR Fixed Term Loan',
    enrollmentFee: '$0 Down Payment at clinical discharge',
    penaltyFee: 'None',
    availableCredit: 'Up to $10,000.00',
    creditStatus: 'Instant Check Eligible',
    creditStatusColor: 'text-[#1e293b]',
    isPopular: false,
  },
];

// Known mock patients mapping across the platform
const MOCK_PATIENTS_MAP: Record<
  string,
  {
    name: string;
    cid: string;
    monogram: string;
    demographics: string;
    bloodGroup: string;
    statusBadge: string;
    allergy: string;
    pendingProcedure: string;
    cptCode: string;
  }
> = {
  // Authoritative Figma 1:5316 patient
  '8472-9901': {
    name: 'Robert J. Sterling',
    cid: '#8472–9901',
    monogram: 'RS',
    demographics: '45 M',
    bloodGroup: 'O Pos (+)',
    statusBadge: 'Self-Pay / Non-Insured',
    allergy: 'Penicillin',
    pendingProcedure: 'Diagnostic Cardiac Catheterization & Angiogram',
    cptCode: '#93458 • Outpatient Cardiac Recovery Tier 1',
  },
  'HV-8472-9901': {
    name: 'Robert J. Sterling',
    cid: '#8472–9901',
    monogram: 'RS',
    demographics: '45 M',
    bloodGroup: 'O Pos (+)',
    statusBadge: 'Self-Pay / Non-Insured',
    allergy: 'Penicillin',
    pendingProcedure: 'Diagnostic Cardiac Catheterization & Angiogram',
    cptCode: '#93458 • Outpatient Cardiac Recovery Tier 1',
  },
  // Eleanor Vance (Figma 1:473 / 1:6023)
  'HV-884-291': {
    name: 'Eleanor Vance',
    cid: '#HV-884-291',
    monogram: 'EV',
    demographics: '45 F',
    bloodGroup: 'O+',
    statusBadge: 'Active Commercial Insured',
    allergy: 'Penicillin, Peanuts (Severe)',
    pendingProcedure: 'Elective Coronary Angiogram & Follow-up',
    cptCode: '#93458 • Outpatient Cardiac Recovery Tier 1',
  },
  '1': {
    name: 'Eleanor Vance',
    cid: '#HV-884-291',
    monogram: 'EV',
    demographics: '45 F',
    bloodGroup: 'O+',
    statusBadge: 'Active Commercial Insured',
    allergy: 'Penicillin, Peanuts (Severe)',
    pendingProcedure: 'Elective Coronary Angiogram & Follow-up',
    cptCode: '#93458 • Outpatient Cardiac Recovery Tier 1',
  },
  // Marcus Chen (Directory patient 2)
  'HV-329-004': {
    name: 'Marcus Chen',
    cid: '#HV-329-004',
    monogram: 'MC',
    demographics: '62 M',
    bloodGroup: 'A Pos (+)',
    statusBadge: 'Self-Pay / Extended Terms',
    allergy: 'Aspirin',
    pendingProcedure: 'Percutaneous Transluminal Angioplasty',
    cptCode: '#92920 • Interventional Cardiac Tier 2',
  },
  // Julian Bashir (Directory patient 3)
  'HV-112-998': {
    name: 'Julian Bashir',
    cid: '#HV-112-998',
    monogram: 'JB',
    demographics: '28 M',
    bloodGroup: 'B Pos (+)',
    statusBadge: 'Self-Pay / Fast Track',
    allergy: 'Latex',
    pendingProcedure: 'Diagnostic Cardiac Catheterization',
    cptCode: '#93458 • Outpatient Cardiac Recovery Tier 1',
  },
};

export const InsuranceFinancingHubPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  // Resolve patient from mock database or default gracefully to Robert J. Sterling
  const patientData = (id && MOCK_PATIENTS_MAP[id]) || MOCK_PATIENTS_MAP['8472-9901'];
  const patient = {
    id: id || '8472-9901',
    ...patientData,
  };

  // State: selected financing package (defaults to Care ID Direct 0%)
  const [selectedPackageId, setSelectedPackageId] = useState<'careid-0' | 'healthpay-bridge' | 'medpay-flex'>(
    'careid-0'
  );

  const selectedPkg =
    FINANCING_PACKAGES.find((pkg) => pkg.id === selectedPackageId) || FINANCING_PACKAGES[0];

  // Continue to Treatment Offer: navigates to /treatment-offers/new/step-1 passing state
  const handleContinueToTreatmentOffer = () => {
    navigate('/treatment-offers/new/step-1', {
      state: {
        patientId: patient.id,
        patientName: patient.name,
        financingPackageId: selectedPkg.id,
        financingPackageName: selectedPkg.name,
        monthlyInstallment: selectedPkg.monthlyAmountDisplay,
        termMonths: selectedPkg.termMonths,
        apr: selectedPkg.apr,
        totalPayable: selectedPkg.totalPayableDisplay,
      },
    });
  };

  // Print patient disclosure action
  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="w-full min-h-screen bg-[#f8f9fa] pb-28 text-[#191c1d]"
      data-node-id="1:5316"
      data-name="Care ID Doctor - Financing Options & Comparison"
    >
      {/* 1. Global Header & Patient-Contextual Breadcrumb Bar (Figma node 1:5358) */}
      <div className="bg-white border-b border-[#e2e8f0] h-16 sticky top-0 z-30 shadow-xs">
        <div className="max-w-[1024px] mx-auto h-full px-8 flex items-center justify-between">
          {/* Breadcrumb Navigation (Figma node 1:5359) */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm">
            <button
              type="button"
              onClick={() => navigate('/patients')}
              className="text-[#64748b] hover:text-[#191c1d] transition-colors font-normal focus:outline-none focus:ring-1 focus:ring-[#5b14b8] rounded px-1 -mx-1"
            >
              Patients
            </button>
            <ChevronRight className="size-4 text-[#94a3b8] shrink-0" aria-hidden="true" />
            <button
              type="button"
              onClick={() => navigate(`/patients/${patient.id}`)}
              className="text-[#64748b] hover:text-[#191c1d] transition-colors font-normal focus:outline-none focus:ring-1 focus:ring-[#5b14b8] rounded px-1 -mx-1"
            >
              {patient.name} ({patient.cid})
            </button>
            <ChevronRight className="size-4 text-[#94a3b8] shrink-0" aria-hidden="true" />
            <span className="font-bold text-[#494552]" aria-current="page">
              Insurance &amp; Financing Hub
            </span>
          </nav>

          {/* Right Header Controls (Figma node 1:5374) */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              aria-label="Notifications"
              className="size-9 rounded-full border border-[#e2e8f0] hover:bg-slate-50 transition-colors flex items-center justify-center text-[#64748b] focus:outline-none focus:ring-2 focus:ring-[#5b14b8]"
            >
              <Bell className="size-4" aria-hidden="true" />
            </button>

            {/* EHR Live Sync Status Pill (Figma node 1:5378) */}
            <div className="bg-[#ecfdf5] border border-[#a7f3d0] rounded-full px-3 py-1 flex items-center gap-2 shadow-xs">
              <span className="size-2 rounded-full bg-[#10b981] animate-pulse" aria-hidden="true" />
              <span className="text-xs font-semibold text-[#047857]">EHR Live Sync</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Workspace Body (Figma node 1:5382) */}
      <div className="max-w-[1024px] mx-auto pt-8 px-8 space-y-6">
        {/* 2. Patient Demographics & Context Card (Figma node 1:5383) */}
        <div className="bg-white border border-[#e2e8f0] rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Patient Details & Monogram */}
          <div className="flex items-start gap-4">
            {/* Monogram Box (Figma node 1:5386) */}
            <div className="size-14 rounded-2xl bg-[#3f1d8b] text-white flex items-center justify-center font-extrabold text-xl shadow-md shrink-0">
              {patient.monogram}
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-bold text-[#0f172a] tracking-tight">{patient.name}</h1>
                <span className="bg-[#fff1f2] border border-[#fecdd3] text-[#be123c] text-xs font-semibold px-2.5 py-0.5 rounded-full">
                  {patient.statusBadge}
                </span>
              </div>

              {/* Sub-demographics lines (Figma node 1:5395) */}
              <div className="space-y-1 text-xs">
                {/* Row 1: Demographics */}
                <div className="flex items-center gap-2 text-[#475569]">
                  <span>CID: {patient.cid}</span>
                  <span className="text-[#94a3b8]">•</span>
                  <span>Age: {patient.demographics}</span>
                  <span className="text-[#94a3b8]">•</span>
                  <span>Blood Group: {patient.bloodGroup}</span>
                  <span className="text-[#94a3b8]">•</span>
                </div>

                {/* Row 2: Allergies */}
                <div className="flex items-center gap-1.5">
                  <span className="text-[#64748b]">Allergies:</span>
                  <span className="font-semibold text-[#dc2626]">{patient.allergy}</span>
                </div>

                {/* Row 3: Pending Procedure */}
                <div className="flex items-center gap-1.5 pt-0.5">
                  <span className="text-[#94a3b8]">Pending Procedure:</span>
                  <span className="font-semibold text-[#1e293b]">{patient.pendingProcedure}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Context Actions (Figma node 1:5415) */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => navigate(`/patients/${patient.id}`)}
              className="h-14 px-4 rounded-xl border border-[#e2e8f0] hover:bg-slate-50 transition-colors flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-[#5b14b8] group"
              aria-label="Back to Insurance & Financing"
            >
              <ChevronLeft className="size-4 text-[#64748b] group-hover:text-[#191c1d] shrink-0" aria-hidden="true" />
              <div className="text-left text-xs font-semibold text-[#334155] leading-tight">
                Back to Insurance &amp;<br />Financing
              </div>
            </button>
            <button
              type="button"
              onClick={() => navigate(`/patients/${patient.id}`)}
              className="h-14 px-4 rounded-xl border border-[#e2e8f0] hover:bg-slate-50 transition-colors flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-[#5b14b8] group"
              aria-label="View Full Profile"
            >
              <User className="size-4 text-[#64748b] group-hover:text-[#191c1d] shrink-0" aria-hidden="true" />
              <div className="text-left text-xs font-semibold text-[#334155] leading-tight">
                View Full<br />Profile
              </div>
            </button>
          </div>
        </div>

        {/* 3. Active Procedure and Baseline Cost Summary (Figma node 1:5426) */}
        <div className="bg-gradient-to-r from-[#0b0c1e] via-[#1a0f3c] to-[#3f1d8b] rounded-2xl p-6 shadow-md text-white flex flex-col lg:flex-row lg:items-center justify-between gap-6 overflow-hidden relative">
          <div className="space-y-1.5 max-w-[440px]">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-[#10b981] shrink-0" aria-hidden="true" />
              <span className="text-[11px] font-bold text-[#34d399] tracking-wider uppercase">
                ACTIVE CLINICAL FINANCING TARGET
              </span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight leading-snug">
              {patient.pendingProcedure}
            </h2>
            <p className="text-xs text-[#cbd5e1]">CPT Code: {patient.cptCode}</p>
          </div>

          {/* Price Breakdown Pill Cards (Figma node 1:5437) */}
          <div className="bg-[#0b0c1e]/60 backdrop-blur-md border border-white/15 rounded-xl p-3 flex items-center divide-x divide-white/15 shrink-0">
            {/* Hospital Standard Baseline */}
            <div className="px-4 text-left">
              <p className="text-[11px] font-medium text-[#cbd5e1] leading-tight">
                Hospital Standard<br />Baseline
              </p>
              <p className="text-base font-bold text-white line-through decoration-white/70 mt-1">
                $5,200.00
              </p>
            </div>

            {/* 15% Prompt Cash Settlement */}
            <div className="px-4 text-left">
              <p className="text-[11px] font-medium text-[#34d399] leading-tight">
                15% Prompt Cash<br />Settlement
              </p>
              <p className="text-base font-bold text-[#34d399] mt-1">-$780.00</p>
            </div>

            {/* Net Financing Base */}
            <div className="px-5 text-left">
              <p className="text-[11px] font-bold text-[#2dd4bf] tracking-wider uppercase leading-tight">
                NET FINANCING BASE
              </p>
              <p className="text-2xl font-extrabold text-white mt-0.5">$4,420.00</p>
            </div>
          </div>
        </div>

        {/* 4. Financing Package Comparison Section (Figma node 1:5449) */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-lg font-bold text-[#0f172a] tracking-tight">
                Compare Available Financing Packages
              </h2>
              <p className="text-xs text-[#64748b]">
                Structured patient installment plans calibrated to the $4,420.00 procedure balance.
              </p>
            </div>
            <span className="bg-[#f0fdfa] border border-[#99f6e4] text-[#0d9488] text-xs font-semibold px-3 py-1 rounded-full self-start sm:self-auto">
              Soft-Inquiry Pre-Approved
            </span>
          </div>

          {/* Cards Grid (Figma node 1:5458) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {FINANCING_PACKAGES.map((pkg) => {
              const isSelected = selectedPackageId === pkg.id;

              return (
                <div
                  key={pkg.id}
                  onClick={() => setSelectedPackageId(pkg.id)}
                  className={cn(
                    'bg-white rounded-2xl p-6 flex flex-col justify-between transition-all cursor-pointer relative shadow-xs h-full',
                    isSelected
                      ? 'border-2 border-[#3f1d8b] shadow-md ring-2 ring-[#3f1d8b]/10'
                      : 'border border-[#e2e8f0] hover:border-slate-300 hover:shadow-sm'
                  )}
                >
                  {/* Top Popular Highlight Badge (Figma node 1:5504) */}
                  {pkg.isPopular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#3f1d8b] text-white text-[10px] font-bold tracking-wider uppercase px-3.5 py-1 rounded-full flex items-center gap-1.5 shadow-sm whitespace-nowrap z-10">
                      <Zap className="size-3 text-[#ffc107] fill-[#ffc107]" aria-hidden="true" />
                      <span>MOST POPULAR • RECOMMENDED</span>
                    </div>
                  )}

                  <div className="space-y-4 flex-1 flex flex-col">
                    {/* Header line with Partner Tag & APR pill */}
                    <div className="flex items-center justify-between pt-1 h-6">
                      <span className={cn('text-xs font-bold tracking-wider uppercase', pkg.tagColor)}>
                        {pkg.partnerTag}
                      </span>
                      <span
                        className={cn(
                          'text-xs font-bold px-2.5 py-0.5 rounded-full',
                          pkg.badgeBg,
                          pkg.badgeColor
                        )}
                      >
                        {pkg.badge}
                      </span>
                    </div>

                    {/* Card Title */}
                    <div>
                      <h3 className="text-lg font-bold text-[#0f172a] h-7 flex items-center">{pkg.name}</h3>
                      <p className="text-xs text-[#64748b] mt-1 leading-relaxed min-h-[36px]">
                        {pkg.id === 'careid-0' &&
                          'Instant digital approval with zero interest hospital-sponsored financing.'}
                        {pkg.id === 'healthpay-bridge' &&
                          'Lower monthly installment spread across extended 24-month horizon.'}
                        {pkg.id === 'medpay-flex' &&
                          'Maximum installment affordability with extended 36-month payment cycle.'}
                      </p>
                    </div>

                    {/* Key Cost Display Box (Figma node 1:5471) */}
                    <div
                      className={cn(
                        'border rounded-xl p-3.5 h-[90px] flex flex-col justify-between',
                        isSelected ? 'bg-[#f4f1fb] border-[#f3e8ff]' : 'bg-[#f8fafc] border-[#e2e8f0]'
                      )}
                    >
                      <div className="flex items-baseline gap-1">
                        <span
                          className={cn(
                            'text-3xl font-extrabold tracking-tight',
                            isSelected ? 'text-[#3f1d8b]' : 'text-[#0f172a]'
                          )}
                        >
                          {pkg.monthlyAmountDisplay}
                        </span>
                        <span className="text-xs font-semibold text-[#64748b]">/ mo</span>
                      </div>
                      <div className="flex items-center justify-between text-xs pt-1">
                        <span
                          className={cn('font-medium', isSelected ? 'text-[#581c87]' : 'text-[#475569]')}
                        >
                          {pkg.termMonthsDisplay}
                        </span>
                        <span
                          className={cn('font-bold', isSelected ? 'text-[#581c87]' : 'text-[#0f172a]')}
                        >
                          Total: {pkg.totalPayableDisplay}
                        </span>
                      </div>
                    </div>

                    {/* Feature Bullet Points (Figma node 1:5480) */}
                    <ul className="space-y-2.5 pt-2 text-xs text-[#475569] flex-1">
                      <li className="flex items-start gap-2">
                        <Check className="size-4 text-[#006971] stroke-[2.5] shrink-0 mt-0.5" aria-hidden="true" />
                        <div>
                          <strong className="font-bold text-[#1e293b]">{pkg.aprDisplay}</strong>
                          {pkg.id === 'careid-0' && ' across full term'}
                          {pkg.id === 'healthpay-bridge' && ' (Prime Medical Tier)'}
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="size-4 text-[#006971] stroke-[2.5] shrink-0 mt-0.5" aria-hidden="true" />
                        <div>{pkg.enrollmentFee}</div>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="size-4 text-[#006971] stroke-[2.5] shrink-0 mt-0.5" aria-hidden="true" />
                        <div>
                          Available Credit: <strong className="font-bold text-[#1e293b]">{pkg.availableCredit}</strong>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="size-4 text-[#006971] stroke-[2.5] shrink-0 mt-0.5" aria-hidden="true" />
                        <div>
                          Status: <strong className={cn('font-bold', pkg.creditStatusColor)}>{pkg.creditStatus}</strong>
                        </div>
                      </li>
                    </ul>
                  </div>

                  {/* Action Button (Figma node 1:5511) */}
                  <div className="pt-4 mt-auto border-t border-[#f1f5f9]">
                    {isSelected ? (
                      <button
                        type="button"
                        className="w-full h-11 bg-[#3f1d8b] hover:bg-[#351877] text-white font-semibold text-sm rounded-xl flex items-center justify-center gap-2 shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#3f1d8b]"
                      >
                        <Check className="size-4 stroke-[2.5]" aria-hidden="true" />
                        <span>Selected Package</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedPackageId(pkg.id);
                        }}
                        className="w-full h-11 border border-[#3f1d8b] text-[#3f1d8b] hover:bg-[#3f1d8b]/5 font-semibold text-sm rounded-xl flex items-center justify-center gap-2 transition-colors focus:outline-none focus:ring-2 focus:ring-[#3f1d8b]"
                      >
                        <span>Select Package</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 5. Detailed Side-by-Side Specifications Table (Figma node 1:5610) */}
        <div className="bg-white border border-[#e2e8f0] rounded-2xl overflow-hidden shadow-xs">
          {/* Table Header Strip (Figma node 1:5611) */}
          <div className="bg-[#f8fafc] border-b border-[#e2e8f0] px-6 py-4 flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#1e293b] tracking-wider uppercase">
              SIDE-BY-SIDE FINANCING SPECIFICATION BREAKDOWN
            </h3>
            <span className="text-xs text-[#64748b]">Calculated on Net Principal: $4,420.00</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#e2e8f0] bg-white">
                  <th className="py-3.5 px-6 font-bold text-[#475569] w-1/4">Metric / Term Feature</th>
                  <th
                    className={cn(
                      'py-3.5 px-6 font-bold w-1/4 transition-colors',
                      selectedPackageId === 'careid-0'
                        ? 'bg-[#faf5ff] text-[#3f1d8b]'
                        : 'text-[#1e293b]'
                    )}
                  >
                    Care ID In-House 0% {selectedPackageId === 'careid-0' && '(Selected)'}
                  </th>
                  <th
                    className={cn(
                      'py-3.5 px-6 font-bold w-1/4 transition-colors',
                      selectedPackageId === 'healthpay-bridge'
                        ? 'bg-[#faf5ff] text-[#3f1d8b]'
                        : 'text-[#1e293b]'
                    )}
                  >
                    HealthPay Bridge Line {selectedPackageId === 'healthpay-bridge' && '(Selected)'}
                  </th>
                  <th
                    className={cn(
                      'py-3.5 px-6 font-bold w-1/4 transition-colors',
                      selectedPackageId === 'medpay-flex'
                        ? 'bg-[#faf5ff] text-[#3f1d8b]'
                        : 'text-[#1e293b]'
                    )}
                  >
                    MedPay Flex Split {selectedPackageId === 'medpay-flex' && '(Selected)'}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f1f5f9]">
                {/* Row 1: Monthly Installment */}
                <tr>
                  <td className="py-4 px-6 font-semibold text-[#334155]">Monthly Installment</td>
                  <td
                    className={cn(
                      'py-4 px-6 font-bold text-sm',
                      selectedPackageId === 'careid-0'
                        ? 'bg-[#faf5ff]/60 text-[#3f1d8b]'
                        : 'text-[#3f1d8b]'
                    )}
                  >
                    $368.33 / mo
                  </td>
                  <td
                    className={cn(
                      'py-4 px-6 font-semibold',
                      selectedPackageId === 'healthpay-bridge'
                        ? 'bg-[#faf5ff]/60 text-[#3f1d8b] font-bold'
                        : 'text-[#1e293b]'
                    )}
                  >
                    $198.50 / mo
                  </td>
                  <td
                    className={cn(
                      'py-4 px-6 font-semibold',
                      selectedPackageId === 'medpay-flex'
                        ? 'bg-[#faf5ff]/60 text-[#3f1d8b] font-bold'
                        : 'text-[#1e293b]'
                    )}
                  >
                    $141.20 / mo
                  </td>
                </tr>

                {/* Row 2: Duration / Term Length */}
                <tr>
                  <td className="py-4 px-6 font-semibold text-[#334155]">Duration / Term Length</td>
                  <td
                    className={cn(
                      'py-4 px-6 font-medium text-[#0f172a]',
                      selectedPackageId === 'careid-0' && 'bg-[#faf5ff]/60 font-semibold'
                    )}
                  >
                    12 Months (1 Year)
                  </td>
                  <td
                    className={cn(
                      'py-4 px-6 text-[#334155]',
                      selectedPackageId === 'healthpay-bridge' && 'bg-[#faf5ff]/60 font-semibold'
                    )}
                  >
                    24 Months (2 Years)
                  </td>
                  <td
                    className={cn(
                      'py-4 px-6 text-[#334155]',
                      selectedPackageId === 'medpay-flex' && 'bg-[#faf5ff]/60 font-semibold'
                    )}
                  >
                    36 Months (3 Years)
                  </td>
                </tr>

                {/* Row 3: Interest Rate (APR) */}
                <tr>
                  <td className="py-4 px-6 font-semibold text-[#334155]">Interest Rate (APR)</td>
                  <td
                    className={cn(
                      'py-4 px-6 font-bold text-[#059669]',
                      selectedPackageId === 'careid-0' && 'bg-[#faf5ff]/60'
                    )}
                  >
                    0.0% Fixed APR
                  </td>
                  <td
                    className={cn(
                      'py-4 px-6 font-medium text-[#1e293b]',
                      selectedPackageId === 'healthpay-bridge' && 'bg-[#faf5ff]/60 font-bold'
                    )}
                  >
                    5.9% Fixed APR
                  </td>
                  <td
                    className={cn(
                      'py-4 px-6 font-medium text-[#1e293b]',
                      selectedPackageId === 'medpay-flex' && 'bg-[#faf5ff]/60 font-bold'
                    )}
                  >
                    9.9% Fixed APR
                  </td>
                </tr>

                {/* Row 4: Total Out-of-Pocket Payable */}
                <tr>
                  <td className="py-4 px-6 font-semibold text-[#334155]">Total Out-of-Pocket Payable</td>
                  <td
                    className={cn(
                      'py-4 px-6',
                      selectedPackageId === 'careid-0' && 'bg-[#faf5ff]/60'
                    )}
                  >
                    <span className="font-extrabold text-[#0f172a] text-sm">$4,420.00 </span>
                    <span className="text-[11px] text-[#059669] font-normal">(Save $0 in interest)</span>
                  </td>
                  <td
                    className={cn(
                      'py-4 px-6',
                      selectedPackageId === 'healthpay-bridge' && 'bg-[#faf5ff]/60'
                    )}
                  >
                    <span className="font-semibold text-[#1e293b]">$4,764.00 </span>
                    <span className="text-[11px] text-[#64748b]">(+$344.00 total fee)</span>
                  </td>
                  <td
                    className={cn(
                      'py-4 px-6',
                      selectedPackageId === 'medpay-flex' && 'bg-[#faf5ff]/60'
                    )}
                  >
                    <span className="font-semibold text-[#1e293b]">$5,083.20 </span>
                    <span className="text-[11px] text-[#64748b]">(+$663.20 total fee)</span>
                  </td>
                </tr>

                {/* Row 5: Credit Impact */}
                <tr>
                  <td className="py-4 px-6 font-semibold text-[#334155]">Credit Impact</td>
                  <td
                    className={cn(
                      'py-4 px-6 text-[#1e293b]',
                      selectedPackageId === 'careid-0' && 'bg-[#faf5ff]/60 font-medium'
                    )}
                  >
                    Soft Inquiry Only (No Score Drop)
                  </td>
                  <td
                    className={cn(
                      'py-4 px-6 text-[#334155]',
                      selectedPackageId === 'healthpay-bridge' && 'bg-[#faf5ff]/60 font-medium'
                    )}
                  >
                    Soft Check to Pre-Qualify
                  </td>
                  <td
                    className={cn(
                      'py-4 px-6 text-[#334155]',
                      selectedPackageId === 'medpay-flex' && 'bg-[#faf5ff]/60 font-medium'
                    )}
                  >
                    Soft Check to Pre-Qualify
                  </td>
                </tr>

                {/* Row 6: Enrollment & Signature Speed */}
                <tr>
                  <td className="py-4 px-6 font-semibold text-[#334155]">Enrollment &amp; Signature Speed</td>
                  <td
                    className={cn(
                      'py-4 px-6 font-semibold text-[#0d9488]',
                      selectedPackageId === 'careid-0' && 'bg-[#faf5ff]/60'
                    )}
                  >
                    Instant (In-App Care ID Pass)
                  </td>
                  <td
                    className={cn(
                      'py-4 px-6 text-[#334155]',
                      selectedPackageId === 'healthpay-bridge' && 'bg-[#faf5ff]/60'
                    )}
                  >
                    &lt; 3 Minutes (SMS Link Flow)
                  </td>
                  <td
                    className={cn(
                      'py-4 px-6 text-[#334155]',
                      selectedPackageId === 'medpay-flex' && 'bg-[#faf5ff]/60'
                    )}
                  >
                    &lt; 5 Minutes (Digital Portal)
                  </td>
                </tr>

                {/* Row 7: Prepayment Penalties */}
                <tr>
                  <td className="py-4 px-6 font-semibold text-[#334155]">Prepayment Penalties</td>
                  <td
                    className={cn(
                      'py-4 px-6 font-medium text-[#047857]',
                      selectedPackageId === 'careid-0' && 'bg-[#faf5ff]/60'
                    )}
                  >
                    None (Pay anytime without fee)
                  </td>
                  <td
                    className={cn(
                      'py-4 px-6 text-[#047857]',
                      selectedPackageId === 'healthpay-bridge' && 'bg-[#faf5ff]/60'
                    )}
                  >
                    None
                  </td>
                  <td
                    className={cn(
                      'py-4 px-6 text-[#047857]',
                      selectedPackageId === 'medpay-flex' && 'bg-[#faf5ff]/60'
                    )}
                  >
                    None
                  </td>
                </tr>

                {/* Row 8: Hospital Scheduling Integration */}
                <tr>
                  <td className="py-4 px-6 font-semibold text-[#334155]">Hospital Scheduling Integration</td>
                  <td
                    className={cn(
                      'py-4 px-6 font-semibold text-[#3f1d8b]',
                      selectedPackageId === 'careid-0' && 'bg-[#faf5ff]/60'
                    )}
                  >
                    Instant Cath Lab Clearance Hold
                  </td>
                  <td
                    className={cn(
                      'py-4 px-6 text-[#334155]',
                      selectedPackageId === 'healthpay-bridge' && 'bg-[#faf5ff]/60'
                    )}
                  >
                    Released upon borrower e-sign
                  </td>
                  <td
                    className={cn(
                      'py-4 px-6 text-[#334155]',
                      selectedPackageId === 'medpay-flex' && 'bg-[#faf5ff]/60'
                    )}
                  >
                    Released upon borrower e-sign
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 6. Sticky Bottom Action Bar (Figma node 1:5702) */}
      <footer
        className="fixed bottom-0 left-64 right-0 bg-white/95 backdrop-blur-md border-t border-[#e2e8f0] py-3.5 z-40 shadow-lg"
        data-node-id="1:5702"
        data-name="Footer - StickyBottomActionBar"
      >
        <div className="max-w-[1024px] mx-auto px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Left Status Indicator (Figma node 1:5705) */}
          <div className="flex items-center gap-3">
            <div className="size-3 rounded-full bg-[#0d9488] ring-4 ring-[#ccfbf1] shrink-0" aria-hidden="true" />
            <div className="text-xs">
              <span className="font-bold text-[#0f172a]">Selected: {selectedPkg.name}</span>
              <span className="text-[#64748b]">
                {' '}
                — {selectedPkg.monthlyAmountDisplay} / mo for {selectedPkg.termMonths} months • Total{' '}
                {selectedPkg.totalPayableDisplay}{' '}
                {selectedPkg.apr === 0 ? '(Zero Interest)' : `(${selectedPkg.apr}% APR)`}
              </span>
            </div>
          </div>

          {/* Right Action Buttons (Figma node 1:5710) */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Print Patient Disclosure */}
            <button
              type="button"
              onClick={handlePrint}
              className="h-10 px-5 rounded-full border border-[#cbd5e1] hover:bg-slate-50 transition-colors text-[#334155] text-xs font-bold flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#5b14b8]"
            >
              <Printer className="size-3.5" aria-hidden="true" />
              <span>Print Patient Disclosure</span>
            </button>

            {/* Canonical Primary Action Button: Continue to Treatment Offer */}
            <button
              type="button"
              onClick={handleContinueToTreatmentOffer}
              className={cn(
                'h-10 px-6 rounded-full text-white text-sm font-bold',
                'bg-gradient-to-b from-[#a44cff] to-[#5b14b8]',
                'flex items-center justify-center gap-2 shadow-sm',
                'hover:opacity-95 active:scale-[0.99] transition-all focus:outline-none focus:ring-2 focus:ring-[#5b14b8]'
              )}
            >
              <span>Continue to Treatment Offer</span>
              <ArrowRight className="size-4 stroke-[2.5]" aria-hidden="true" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
