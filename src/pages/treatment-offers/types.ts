export interface FinancingPackageOption {
  id: string;
  name: string;
  partnerTag: string;
  badge: string;
  termMonths: number;
  termMonthsDisplay: string;
  apr: number;
  aprDisplay: string;
  calculateMonthly: (net: number) => number;
  calculateTotal: (net: number) => number;
  enrollmentFee: string;
  penaltyFee: string;
  availableCredit: string;
}

export const FINANCING_PACKAGES_MAP: Record<string, FinancingPackageOption> = {
  'careid-0': {
    id: 'careid-0',
    name: 'Care ID In-House 0% APR',
    partnerTag: 'CARE ID DIRECT',
    badge: '0% APR (Pre-Qualified)',
    termMonths: 12,
    termMonthsDisplay: '12 Months Fixed',
    apr: 0.0,
    aprDisplay: '0.0% APR Fixed Rate',
    calculateMonthly: (net: number) => Number((net / 12).toFixed(2)),
    calculateTotal: (net: number) => net,
    enrollmentFee: '$0 Enrollment Fee',
    penaltyFee: 'No Early Payoff Penalty',
    availableCredit: 'Up to $6,000.00',
  },
  'careid-zero': {
    id: 'careid-0',
    name: 'Care ID In-House 0% APR',
    partnerTag: 'CARE ID DIRECT',
    badge: '0% APR (Pre-Qualified)',
    termMonths: 12,
    termMonthsDisplay: '12 Months Fixed',
    apr: 0.0,
    aprDisplay: '0.0% APR Fixed Rate',
    calculateMonthly: (net: number) => Number((net / 12).toFixed(2)),
    calculateTotal: (net: number) => net,
    enrollmentFee: '$0 Enrollment Fee',
    penaltyFee: 'No Early Payoff Penalty',
    availableCredit: 'Up to $6,000.00',
  },
  'healthpay-bridge': {
    id: 'healthpay-bridge',
    name: 'HealthPay Bridge Credit Line',
    partnerTag: 'HEALTHPAY PARTNER',
    badge: 'Flexible 24-36 Mo',
    termMonths: 24,
    termMonthsDisplay: '24 Months Term',
    apr: 5.9,
    aprDisplay: '5.9% Fixed APR',
    calculateMonthly: (net: number) => Number(((net * 1.077828) / 24).toFixed(2)),
    calculateTotal: (net: number) => Number((net * 1.077828).toFixed(2)),
    enrollmentFee: '$25 Annual Servicing Fee (Waived Year 1)',
    penaltyFee: 'None',
    availableCredit: 'Up to $15,000.00',
  },
  'medpay-flex': {
    id: 'medpay-flex',
    name: 'MedPay Flex Extended Plan',
    partnerTag: 'MEDPAY NETWORK',
    badge: 'Lowest Monthly',
    termMonths: 36,
    termMonthsDisplay: '36 Months Term',
    apr: 9.9,
    aprDisplay: '9.9% APR Fixed Term Loan',
    calculateMonthly: (net: number) => Number(((net * 1.150045) / 36).toFixed(2)),
    calculateTotal: (net: number) => Number((net * 1.150045).toFixed(2)),
    enrollmentFee: '$0 Down Payment at clinical discharge',
    penaltyFee: 'None',
    availableCredit: 'Up to $10,000.00',
  },
  'prompt-cash': {
    id: 'prompt-cash',
    name: 'No Financing / Prompt Full Cash Payment',
    partnerTag: 'SELF-PAY DIRECT',
    badge: 'Full Settlement',
    termMonths: 1,
    termMonthsDisplay: 'Single Settlement Payment at Intake',
    apr: 0.0,
    aprDisplay: '0.0% APR',
    calculateMonthly: (net: number) => net,
    calculateTotal: (net: number) => net,
    enrollmentFee: '$0 Fee',
    penaltyFee: 'None',
    availableCredit: 'N/A',
  },
};

export interface TreatmentOfferState {
  patientId: string;
  patientName: string;
  patientCid: string;
  patientAge: string;
  patientGender: string;
  patientBlood: string;
  patientAllergy: string;
  insuranceStatus: string;
  referralId: string;
  
  // Procedure
  cptCode: string;
  procedureName: string;
  department: string;
  facility: string;
  clinicalNecessity: string;
  baselineFee: number;
  
  // Discount
  discountEnabled: boolean;
  discountMode: 'percentage' | 'fixed';
  discountValue: number;
  calculatedDiscount: number;
  netProcedureCost: number;
  
  // Financing
  financingPackageId: string;
  financingPackageName: string;
  monthlyInstallment: string;
  termMonths: number;
  apr: string;
  totalPayable: string;
  
  // Terms & Remarks
  offerTitle: string;
  expirationDate: string;
  clinicalHoldDays: number;
  doctorNotes: string;
  complianceConfirmed: boolean;
  clinicianAttested: boolean;
  
  // Meta
  offerId: string;
  dispatchedAt?: string;
  attendingDoctor: string;
  doctorSpecialty: string;
  auditHash: string;
}

export const DEFAULT_OFFER_STATE: TreatmentOfferState = {
  patientId: '8472-9901',
  patientName: 'Robert J. Sterling',
  patientCid: '#8472–9901',
  patientAge: '45',
  patientGender: 'M',
  patientBlood: 'O Pos (+)',
  patientAllergy: 'Penicillin',
  insuranceStatus: 'Self-Pay / Non-Insured',
  referralId: '#REF-4491',
  
  cptCode: 'CPT #93458',
  procedureName: 'Left Heart Catheterization with Coronary Angiogram',
  department: 'Cardiology Department',
  facility: 'Mount Sinai Heart Center Outpatient Unit',
  clinicalNecessity: 'Diagnostic assessment following exertional angina and abnormal treadmill ECG stress test. Linked Referral: #REF-4491.',
  baselineFee: 5200,
  
  discountEnabled: true,
  discountMode: 'percentage',
  discountValue: 15,
  calculatedDiscount: 780,
  netProcedureCost: 4420,
  
  financingPackageId: 'careid-0',
  financingPackageName: 'Care ID In-House 0% APR',
  monthlyInstallment: '$368.33',
  termMonths: 12,
  apr: '0.0%',
  totalPayable: '$4,420.00',
  
  offerTitle: 'Cardiac Catheterization Treatment Package',
  expirationDate: 'November 1, 2026',
  clinicalHoldDays: 14,
  doctorNotes: 'Robert, this offer reflects our standard Mount Sinai diagnostic catheterization package with an authorized 15% prompt settlement cash discount paired with our in-house 0% financing option. Reviewing and accepting this in your Care ID app secures your Cath Lab slot. — Dr. Michael Chang, MD • Cardiology Department',
  complianceConfirmed: true,
  clinicianAttested: true,
  
  offerId: 'TR-8921',
  dispatchedAt: 'Oct 18, 2026 • 10:42 AM EST',
  attendingDoctor: 'Dr. Michael Chang',
  doctorSpecialty: 'Cardiology Specialist',
  auditHash: 'SHA256-8921-TR-VERIFIED-7A890D',
};
