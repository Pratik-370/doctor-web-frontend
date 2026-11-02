import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Video,
  Check,
  AlertTriangle,
  Activity,
  Flag,
  Clock,
  Heart,
  Thermometer,
  Wind,
  Gauge,
  Scale,
  ShieldAlert,
  User,
} from 'lucide-react';
import patientAvatarHero from '@/assets/avatars/patient-avatar-hero.png';
import patientAvatarMale from '@/assets/avatars/patient-avatar-male.png';

interface PatientProfileData {
  name: string;
  healthVaultId: string;
  mrn?: string;
  status: string;
  ageGenderDob: string;
  bloodGroup: string;
  primaryPhysician: string;
  insuranceStatus: string;
  allergies: string;
  chronicConditions: string;
  highRisk: string;
  avatarSrc: string;
  vitals: {
    bp: string;
    bpUnit: string;
    hr: string;
    hrUnit: string;
    temp: string;
    tempUnit: string;
    spo2: string;
    spo2Unit: string;
    resp: string;
    respUnit: string;
    bmi: string;
    lastUpdated: string;
  };
  quickFacts: {
    emergencyContact: string;
    emergencyPhone: string;
    nurse: string;
    hospital: string;
  };
}

const PATIENTS_MAP: Record<string, PatientProfileData> = {
  // Eleanor Vance (Canonical Figma 1:473)
  'HV-884-291': {
    name: 'Eleanor Vance',
    healthVaultId: 'HV-884-291',
    mrn: 'HV-884-291',
    status: 'Stable',
    ageGenderDob: '45 • F • Oct 24, 1978',
    bloodGroup: 'O+',
    primaryPhysician: 'Dr. Julian Vance',
    insuranceStatus: 'Active',
    allergies: 'Penicillin, Peanuts (Severe)',
    chronicConditions: 'Hypertension, Type 2 Diabetes',
    highRisk: 'Elevated cholesterol history',
    avatarSrc: patientAvatarHero,
    vitals: {
      bp: '120/80',
      bpUnit: 'mmHg',
      hr: '72',
      hrUnit: 'bpm',
      temp: '98.6',
      tempUnit: '°F',
      spo2: '98',
      spo2Unit: '%',
      resp: '16',
      respUnit: 'bpm',
      bmi: '22.4',
      lastUpdated: 'Today, 08:30 AM',
    },
    quickFacts: {
      emergencyContact: 'John Vance (Husband)',
      emergencyPhone: '+1 (555) 019-2834',
      nurse: 'Sarah Jenkins, RN',
      hospital: 'St. Jude Medical Center',
    },
  },
  // James Robertson (Authoritative Critical Report 1:3732)
  'PT-84920': {
    name: 'James Robertson',
    healthVaultId: 'PT-84920',
    mrn: '994-32A',
    status: 'Attention Required',
    ageGenderDob: '68 • M • Jul 14, 1955',
    bloodGroup: 'A+',
    primaryPhysician: 'Dr. Clinical',
    insuranceStatus: 'Active',
    allergies: 'Penicillin (Severe), Sulfa Drugs',
    chronicConditions: 'Hypertension, Type 2 Diabetes Mellitus',
    highRisk: 'Hyperkalemia (K+ 6.2 mEq/L), Acute Kidney Injury (Cr 2.8 mg/dL)',
    avatarSrc: patientAvatarMale,
    vitals: {
      bp: '142/88',
      bpUnit: 'mmHg',
      hr: '76',
      hrUnit: 'bpm',
      temp: '98.4',
      tempUnit: '°F',
      spo2: '97',
      spo2Unit: '%',
      resp: '18',
      respUnit: 'bpm',
      bmi: '27.1',
      lastUpdated: '10 mins ago',
    },
    quickFacts: {
      emergencyContact: 'Martha Robertson (Spouse)',
      emergencyPhone: '+1 (555) 342-8891',
      nurse: 'Sarah Jenkins, RN',
      hospital: 'General Hospital - Central Labs',
    },
  },
};

// Aliases for route lookups
PATIENTS_MAP['1'] = PATIENTS_MAP['HV-884-291'];
PATIENTS_MAP['994-32A'] = PATIENTS_MAP['PT-84920'];

export const PatientProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  // Resolve matching patient record
  const patient = id ? PATIENTS_MAP[id] : PATIENTS_MAP['HV-884-291'];

  // If patient ID requested is invalid, render truthful not-found state
  if (!patient) {
    return (
      <div className="w-full max-w-xl mx-auto py-16 text-center space-y-4">
        <div className="size-16 rounded-full bg-slate-100 text-slate-500 mx-auto flex items-center justify-center">
          <User className="size-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">Patient Profile Not Found</h2>
        <p className="text-xs text-slate-500">
          No patient record found matching identifier <span className="font-mono font-semibold text-slate-700">{id}</span> in the clinical registry.
        </p>
        <button
          type="button"
          onClick={() => navigate('/patients')}
          className="px-5 py-2.5 rounded-xl bg-[#28006d] text-white text-xs font-semibold hover:bg-[#3f1d8b] transition-colors"
        >
          Return to Patient Details
        </button>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6" data-node-id="1:473">
      {/* 12-Column Main Workspace Grid (Figma node 1:509) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Left / Main Content Column (Span 9) (Figma node 1:510) */}
        <div className="lg:col-span-9 flex flex-col gap-4">
          {/* 1. Patient Header Card (Figma node 1:511) */}
          <div className="bg-white border border-[#cbc4d4] rounded-xl p-[21px] shadow-sm relative overflow-hidden flex flex-col sm:flex-row gap-6 items-start">
            {/* Decorative Corner Overlay (Figma node 1:512) */}
            <div
              className="absolute -top-16 -right-16 size-32 rounded-bl-full bg-[#28006d]/5 pointer-events-none"
              aria-hidden="true"
            />

            {/* Patient Avatar with Verified Badge (Figma node 1:513) */}
            <div className="relative shrink-0">
              <div className="size-24 rounded-full border-4 border-[#f8f9fa] shadow-sm overflow-hidden bg-slate-100">
                <img
                  src={patient.avatarSrc}
                  alt={patient.name}
                  className="size-full object-cover"
                />
              </div>
              <div
                className="absolute -bottom-1 -right-1 size-7 rounded-full bg-[#dcfce7] border-2 border-[#f8f9fa] shadow-sm flex items-center justify-center text-[#15803d]"
                title="Verified Identity"
              >
                <Check className="size-4 stroke-[2.5]" aria-hidden="true" />
              </div>
            </div>

            {/* Patient Header Details & Actions (Figma node 1:518) */}
            <div className="flex-1 min-w-0 w-full">
              {/* Top Row: Name + Badges + Buttons */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-2">
                <div className="space-y-1">
                  <h1 className="text-2xl sm:text-[32px] font-semibold text-[#191c1d] leading-tight">
                    {patient.name}
                  </h1>
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="bg-[#3f1d8b]/20 text-[#28006d] text-sm font-medium tracking-[0.1px] rounded px-2 py-0.5">
                      {patient.healthVaultId}
                    </span>
                    {patient.mrn && patient.mrn !== patient.healthVaultId && (
                      <span className="bg-slate-100 text-slate-700 text-xs font-semibold rounded px-2 py-0.5">
                        MRN: {patient.mrn}
                      </span>
                    )}
                    <span className="bg-[#76f1ff]/30 text-[#006971] text-xs font-medium tracking-[0.5px] rounded-full px-2 py-0.5 flex items-center gap-1">
                      <span className="size-1.5 rounded-full bg-[#006971]" />
                      <span>{patient.status}</span>
                    </span>
                  </div>
                </div>

                {/* Header Action Buttons (Figma node 1:530) */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    className="border border-[#28006d] hover:bg-purple-50 text-[#28006d] text-sm font-medium rounded-lg px-[17px] py-[9px] transition-colors focus:outline-none focus:ring-2 focus:ring-[#28006d]"
                  >
                    Share Profile
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate('/treatment-offers/new/step-1')}
                    className="bg-[#28006d] hover:bg-[#3f1d8b] text-white text-sm font-medium rounded-lg px-4 py-[9px] flex items-center gap-2 shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#28006d]"
                  >
                    <Video className="size-4" aria-hidden="true" />
                    <span>Start Consult</span>
                  </button>
                </div>
              </div>

              {/* Horizontal Demographics Row (Figma node 1:538) */}
              <div className="border-t border-[#cbc4d4]/50 pt-4 mt-2 grid grid-cols-2 sm:grid-cols-4 gap-4">
                {/* Age / Gender / DOB */}
                <div>
                  <p className="text-xs font-medium text-[#494552] tracking-[0.5px]">
                    Age / Gender / DOB
                  </p>
                  <p className="text-sm font-medium text-[#191c1d] mt-0.5 leading-snug">
                    {patient.ageGenderDob}
                  </p>
                </div>

                {/* Blood Group */}
                <div>
                  <p className="text-xs font-medium text-[#494552] tracking-[0.5px]">
                    Blood Group
                  </p>
                  <p className="text-sm font-medium text-[#4c0010] mt-0.5 flex items-center gap-1">
                    <span className="size-2 rounded-full bg-[#ba1a1a]" />
                    <span>{patient.bloodGroup}</span>
                  </p>
                </div>

                {/* Primary Physician */}
                <div>
                  <p className="text-xs font-medium text-[#494552] tracking-[0.5px]">
                    Primary Physician
                  </p>
                  <p className="text-sm font-medium text-[#191c1d] mt-0.5">
                    {patient.primaryPhysician}
                  </p>
                </div>

                {/* Insurance Status */}
                <div>
                  <p className="text-xs font-medium text-[#494552] tracking-[0.5px]">
                    Insurance Status
                  </p>
                  <p className="text-sm font-medium text-[#15803d] mt-0.5 flex items-center gap-1">
                    <Check className="size-3.5 stroke-[2.5]" aria-hidden="true" />
                    <span>{patient.insuranceStatus}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Medical Alerts Row (Figma node 1:561) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Known Allergies (Figma node 1:562) */}
            <div className="bg-[#ffdad6]/30 border border-[#ffdad6] rounded-lg p-[17px] flex items-start gap-3">
              <div className="text-[#ba1a1a] shrink-0 mt-0.5">
                <AlertTriangle className="size-5" aria-hidden="true" />
              </div>
              <div className="space-y-1">
                <h2 className="text-base font-semibold text-[#191c1d]">
                  Known Allergies
                </h2>
                <p className="text-base text-[#494552] leading-snug">
                  {patient.allergies}
                </p>
              </div>
            </div>

            {/* Chronic Conditions (Figma node 1:569) */}
            <div className="bg-[#fff7ed] border border-[#fed7aa] rounded-lg p-[17px] flex items-start gap-3">
              <div className="text-[#ea580c] shrink-0 mt-0.5">
                <Activity className="size-5" aria-hidden="true" />
              </div>
              <div className="space-y-1">
                <h2 className="text-base font-semibold text-[#191c1d]">
                  Chronic Conditions
                </h2>
                <p className="text-base text-[#494552] leading-snug">
                  {patient.chronicConditions}
                </p>
              </div>
            </div>

            {/* High Risk Indicators (Figma node 1:576) */}
            <div className="bg-[#f3f4f5] border border-[#cbc4d4] rounded-lg p-[17px] flex items-start gap-3">
              <div className="text-[#006971] shrink-0 mt-0.5">
                <Flag className="size-5" aria-hidden="true" />
              </div>
              <div className="space-y-1">
                <h2 className="text-base font-semibold text-[#191c1d]">
                  High Risk Indicators
                </h2>
                <p className="text-base text-[#494552] leading-snug">
                  {patient.highRisk}
                </p>
              </div>
            </div>
          </div>

          {/* 3. Current Vitals Card (Figma node 1:583) */}
          <div className="bg-white border border-[#cbc4d4] rounded-xl p-[21px] shadow-sm space-y-4">
            {/* Vitals Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="size-5 text-[#28006d]" aria-hidden="true" />
                <h2 className="text-xl font-semibold text-[#191c1d]">
                  Current Vitals
                </h2>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-medium text-[#494552] tracking-[0.5px]">
                <Clock className="size-3.5" aria-hidden="true" />
                <span>Last Updated: {patient.vitals.lastUpdated}</span>
              </div>
            </div>

            {/* 6 Physiological Telemetry Tiles (Figma node 1:593) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {/* BP */}
              <div className="bg-[#f3f4f5] border border-[#e1e3e4] rounded-lg p-3 space-y-1">
                <div className="flex items-center gap-1 text-xs font-medium text-[#494552] tracking-[0.5px]">
                  <Gauge className="size-3.5" aria-hidden="true" />
                  <span>BP</span>
                </div>
                <div>
                  <span className="text-xl font-semibold text-[#191c1d]">
                    {patient.vitals.bp}
                  </span>
                  <span className="text-xs text-[#494552] ml-1 font-normal">
                    {patient.vitals.bpUnit}
                  </span>
                </div>
              </div>

              {/* HR */}
              <div className="bg-[#f3f4f5] border border-[#e1e3e4] rounded-lg p-3 space-y-1">
                <div className="flex items-center gap-1 text-xs font-medium text-[#494552] tracking-[0.5px]">
                  <Heart className="size-3.5 text-[#ba1a1a]" aria-hidden="true" />
                  <span>HR</span>
                </div>
                <div>
                  <span className="text-xl font-semibold text-[#191c1d]">
                    {patient.vitals.hr}
                  </span>
                  <span className="text-xs text-[#494552] ml-1 font-normal">
                    {patient.vitals.hrUnit}
                  </span>
                </div>
              </div>

              {/* Temp */}
              <div className="bg-[#f3f4f5] border border-[#e1e3e4] rounded-lg p-3 space-y-1">
                <div className="flex items-center gap-1 text-xs font-medium text-[#494552] tracking-[0.5px]">
                  <Thermometer className="size-3.5 text-[#ea580c]" aria-hidden="true" />
                  <span>Temp</span>
                </div>
                <div>
                  <span className="text-xl font-semibold text-[#191c1d]">
                    {patient.vitals.temp}
                  </span>
                  <span className="text-xs text-[#494552] ml-1 font-normal">
                    {patient.vitals.tempUnit}
                  </span>
                </div>
              </div>

              {/* SpO2 */}
              <div className="bg-[#f3f4f5] border border-[#e1e3e4] rounded-lg p-3 space-y-1">
                <div className="flex items-center gap-1 text-xs font-medium text-[#494552] tracking-[0.5px]">
                  <Wind className="size-3.5 text-[#006971]" aria-hidden="true" />
                  <span>SpO2</span>
                </div>
                <div>
                  <span className="text-xl font-semibold text-[#191c1d]">
                    {patient.vitals.spo2}
                  </span>
                  <span className="text-xs text-[#494552] ml-1 font-normal">
                    {patient.vitals.spo2Unit}
                  </span>
                </div>
              </div>

              {/* Resp */}
              <div className="bg-[#f3f4f5] border border-[#e1e3e4] rounded-lg p-3 space-y-1">
                <div className="flex items-center gap-1 text-xs font-medium text-[#494552] tracking-[0.5px]">
                  <Activity className="size-3.5" aria-hidden="true" />
                  <span>Resp</span>
                </div>
                <div>
                  <span className="text-xl font-semibold text-[#191c1d]">
                    {patient.vitals.resp}
                  </span>
                  <span className="text-xs text-[#494552] ml-1 font-normal">
                    {patient.vitals.respUnit}
                  </span>
                </div>
              </div>

              {/* BMI */}
              <div className="bg-[#f3f4f5] border border-[#e1e3e4] rounded-lg p-3 space-y-1">
                <div className="flex items-center gap-1 text-xs font-medium text-[#494552] tracking-[0.5px]">
                  <Scale className="size-3.5" aria-hidden="true" />
                  <span>BMI</span>
                </div>
                <div>
                  <span className="text-xl font-semibold text-[#191c1d]">
                    {patient.vitals.bmi}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar Panel (Span 3) (Figma node 1:636) */}
        <div className="lg:col-span-3">
          {/* Quick Facts Card (Figma node 1:637) */}
          <div className="bg-white border border-[#cbc4d4] rounded-xl p-[21px] shadow-sm space-y-4">
            <h2 className="text-base font-semibold text-[#191c1d] pb-[9px] border-b border-[#cbc4d4]">
              Quick Facts
            </h2>

            <div className="space-y-4">
              {/* Emergency Contact */}
              <div className="space-y-1">
                <p className="text-xs font-medium text-[#494552] tracking-[0.5px]">
                  Emergency Contact
                </p>
                <p className="text-sm text-[#191c1d]">
                  {patient.quickFacts.emergencyContact}
                </p>
                <a
                  href={`tel:${patient.quickFacts.emergencyPhone}`}
                  className="text-base text-[#28006d] font-normal hover:underline block"
                >
                  {patient.quickFacts.emergencyPhone}
                </a>
              </div>

              {/* Assigned Nurse */}
              <div className="space-y-1">
                <p className="text-xs font-medium text-[#494552] tracking-[0.5px]">
                  Assigned Nurse
                </p>
                <div className="flex items-center gap-2 pt-0.5">
                  <div className="size-6 rounded-full bg-[#e1e3e4] flex items-center justify-center text-[#494552] shrink-0">
                    <User className="size-3.5" aria-hidden="true" />
                  </div>
                  <span className="text-sm text-[#191c1d]">
                    {patient.quickFacts.nurse}
                  </span>
                </div>
              </div>

              {/* Primary Hospital */}
              <div className="space-y-1">
                <p className="text-xs font-medium text-[#494552] tracking-[0.5px]">
                  Primary Hospital
                </p>
                <p className="text-sm text-[#191c1d]">
                  {patient.quickFacts.hospital}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Primary Action CTA Button (Figma node 1:662) */}
      <button
        type="button"
        onClick={() => navigate(`/patients/${patient.healthVaultId}/financing`)}
        className="w-full h-12 rounded-full bg-gradient-to-b from-[#a44cff] to-[#5b14b8] hover:opacity-95 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-[0px_4px_6px_-1px_rgba(63,29,139,0.3),0px_2px_4px_-2px_rgba(63,29,139,0.3)] transition-all focus:outline-none focus:ring-2 focus:ring-[#5b14b8]"
      >
        <ShieldAlert className="size-4" aria-hidden="true" />
        <span>Insurance &amp; Financing Hub</span>
      </button>
    </div>
  );
};
