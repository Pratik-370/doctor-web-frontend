import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  ShieldCheck,
  AlertTriangle,
  AlertOctagon,
  CheckCircle2,
  Activity,
  FileText,
  CreditCard,
  Users,
  Stethoscope,
  Heart,
  FileCheck2,
  Lock,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Radio,
  Clock,
  X,
  Building,
  Bell,
  Check,
  Flag,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  DEFAULT_CATH_LAB_DATA,
  CathLabContext,
  SafetyChecklistState,
} from './types';
import ecgSparkline from '@/assets/medical/ecg-sparkline.svg';
import surgicalSafetySeal from '@/assets/medical/surgical-safety-seal.svg';
import patientAvatarHero from '@/assets/avatars/patient-avatar-hero.png';

export const CathLabSafetyCheckinPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Receive optional location.state passed from Offer Status
  const incomingOffer = location.state as {
    patientName?: string;
    patientCid?: string;
    procedureName?: string;
  } | null;

  // Initialize data with incoming context if provided
  const [data] = useState<CathLabContext>(() => {
    return {
      ...DEFAULT_CATH_LAB_DATA,
      patientName: incomingOffer?.patientName || DEFAULT_CATH_LAB_DATA.patientName,
      patientCid: incomingOffer?.patientCid ? `CID ${incomingOffer.patientCid}` : DEFAULT_CATH_LAB_DATA.patientCid,
      procedureName: incomingOffer?.procedureName || DEFAULT_CATH_LAB_DATA.procedureName,
    };
  });

  // 6 Checklist Safeguards (default all true matching Figma 1:14096)
  const [checklist, setChecklist] = useState<SafetyChecklistState>({
    patientIdentity: true,
    clinicalSafety: true,
    diagnosticImaging: true,
    plannedProcedure: true,
    signedConsents: true,
    teamRoster: true,
  });

  const verifiedCount = Object.values(checklist).filter(Boolean).length;
  const allVerified = verifiedCount === 6;

  // Modals & Interactivity
  const [showHoldModal, setShowHoldModal] = useState(false);
  const [holdReason, setHoldReason] = useState('Vitals Discrepancy / Hemodynamic Instability');
  const [holdNotes, setHoldNotes] = useState('');
  const [isHoldActive, setIsHoldActive] = useState(false);

  const [showRatifyModal, setShowRatifyModal] = useState(false);
  const [, setIsRatified] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4500);
  };

  const toggleChecklist = (key: keyof SafetyChecklistState) => {
    setChecklist((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      return next;
    });
  };

  const handleConfirmHold = () => {
    setIsHoldActive(true);
    setShowHoldModal(false);
    triggerToast(`Safety hold flagged: "${holdReason}". Cath Lab suite notified.`);
  };

  const handleClearHold = () => {
    setIsHoldActive(false);
    triggerToast('Safety hold cleared. Clinical protocol resumed.');
  };

  const handleStartEncounter = () => {
    if (!allVerified) {
      triggerToast('All 6 safeguards must be ratified prior to access induction.');
      return;
    }
    setShowRatifyModal(true);
  };

  const handleFinalRatification = () => {
    setIsRatified(true);
    setShowRatifyModal(false);
    triggerToast('Cryptographic handshake signed! Proceeding to active procedure encounter.');
    setTimeout(() => {
      navigate('/treatment-offers/TR-8921/encounter/start', { state: { ...data, ...incomingOffer } });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] flex flex-col w-full pb-28">
      {/* Toast Notification Strip */}
      {showToast && (
        <div className="fixed top-20 right-6 z-50 bg-[#0b1c30] text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 border border-purple-500/30 text-xs animate-in fade-in slide-in-from-top-2">
          <ShieldCheck className="w-4 h-4 text-[#5af8fb] shrink-0" />
          <span className="font-medium">{toastMessage}</span>
          <button
            type="button"
            onClick={() => setShowToast(false)}
            className="text-slate-400 hover:text-white ml-2"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Safety Hold Active Global Warning Banner */}
      {isHoldActive && (
        <div className="bg-[#ba1a1a] text-white px-6 py-2.5 flex items-center justify-between text-xs font-semibold shadow-md sticky top-0 z-40">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-[#ffdad6]" />
            <span>
              SURGICAL TIME-OUT SAFETY HOLD ACTIVE: Reason — &ldquo;{holdReason}&rdquo;. Procedural access halted.
            </span>
          </div>
          <button
            type="button"
            onClick={handleClearHold}
            className="bg-white text-[#93000a] px-3 py-1 rounded text-xs font-bold hover:bg-slate-100 transition-colors cursor-pointer"
          >
            Clear Safety Hold
          </button>
        </div>
      )}

      {/* 1. TOP HEADER (Figma 1:14508) */}
      <header className="backdrop-blur-[6px] bg-white/95 border-b border-slate-200/80 shadow-[0px_1px_12px_0px_rgba(11,28,48,0.04)] sticky top-0 z-30 w-full">
        <div className="h-[64px] px-[40px] flex items-center justify-between w-full">
          {/* Left: EHR Status & Cath Suite Station */}
          <div className="flex items-center gap-6">
            <div className="bg-[rgba(86,245,248,0.3)] flex items-center gap-2 px-3 py-1.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-[#00696b] animate-pulse" />
              <span className="font-semibold text-[#00696b] text-[12px]">Live EHR Sync</span>
            </div>
            <div className="flex items-center gap-2 text-[#494552] text-[12px] font-medium">
              <Building className="w-4 h-4 text-slate-500" />
              <span>Cath Lab Station #04</span>
            </div>
          </div>

          {/* Right: Actions, Notifications, & Doctor Profile */}
          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={() => navigate('/treatment-offers/new/step-1')}
              className="bg-[#28006d] hover:bg-[#3f1d8b] text-white text-[13px] font-semibold px-4 py-2 rounded-lg flex items-center gap-2 drop-shadow-[0px_2px_4px_rgba(40,0,109,0.2)] transition-all cursor-pointer"
            >
              <Activity className="w-3.5 h-3.5" />
              <span>New Encounter</span>
            </button>

            <button
              type="button"
              onClick={() => navigate('/notifications')}
              className="w-9 h-9 rounded-full hover:bg-slate-100 flex items-center justify-center relative text-slate-600 cursor-pointer"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#ba1a1a] rounded-full ring-2 ring-white" />
            </button>

            <div className="flex items-center gap-3 pl-2 border-l border-slate-200">
              <div className="w-9 h-9 rounded-full bg-[#3f1d8b] text-white flex items-center justify-center font-bold text-xs ring-2 ring-[#dce9ff]">
                MC
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-[13px] font-semibold text-[#0b1c30]">Dr. Michael Chang</span>
                <span className="text-[11px] text-[#494552]">Attending Physician</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sub-Header Context & Stepper Strip (Figma 1:14540) */}
        <div className="bg-[#eff4ff] px-[40px] py-2 flex items-center justify-between border-t border-slate-200/60 text-xs">
          {/* Active Context */}
          <div className="flex items-center gap-2.5">
            <span className="bg-[#28006d] text-white text-[10px] font-bold px-2 py-0.5 rounded tracking-wide uppercase">
              ACTIVE CONTEXT
            </span>
            <span className="font-bold text-[#0b1c30] text-[13px]">{data.patientName}</span>
            <span className="text-slate-500 font-medium">({data.patientDob})</span>
            <span className="bg-[#dce9ff] text-[#0b1c30] font-semibold text-[11px] px-2 py-0.5 rounded-full">
              ID: {data.patientCid}
            </span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center gap-1.5 text-slate-600 font-medium">
              <Stethoscope className="w-3.5 h-3.5 text-[#28006d]" />
              Coronary Angiogram & Possible PCI
            </span>
          </div>

          {/* Workflow Stepper */}
          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-medium">Workflow:</span>
            <span className="bg-[#d3e4fe] text-[#0b1c30] text-[11px] px-2 py-0.5 rounded font-medium">
              Cath Lab Day-of-Procedure
            </span>
            <span className="bg-[rgba(0,105,107,0.15)] text-[#00696b] text-[11px] font-bold px-2.5 py-0.5 rounded ring-1 ring-[#00696b]/30">
              Verification (Active)
            </span>
            <span className="bg-[#e8ddff] text-[#21005d] text-[11px] font-semibold px-2 py-0.5 rounded">
              Active Encounter
            </span>
            <span className="bg-[#d3e4fe] text-slate-500 text-[11px] px-2 py-0.5 rounded">
              Post-Procedure
            </span>
          </div>
        </div>
      </header>

      {/* 2. BREADCRUMB NAVIGATION BAR (Figma 1:14099) */}
      <div className="bg-[#eff4ff] drop-shadow-[0px_1px_0px_rgba(11,28,48,0.04)] px-[40px] py-3 flex items-center justify-between border-b border-slate-200/80 w-full">
        {/* Left Breadcrumb Sequence */}
        <div className="flex items-center gap-2 text-[12px]">
          <span className="text-[#494552]">Clinical Workspace</span>
          <span className="text-[#cbc4d4]">/</span>
          <button
            type="button"
            onClick={() => navigate('/patients')}
            className="text-[#494552] hover:text-[#0b1c30] transition-colors cursor-pointer"
          >
            Patients
          </button>
          <span className="text-[#cbc4d4]">/</span>
          <button
            type="button"
            onClick={() => navigate('/patients/8472-9901')}
            className="text-[#0b1c30] font-semibold hover:underline cursor-pointer"
          >
            {data.patientName} ({data.patientCid})
          </button>
          <span className="text-[#cbc4d4]">/</span>
          <span className="bg-[#d3e4fe] text-[#0b1c30] text-[11px] px-2 py-0.5 rounded font-mono font-medium">
            Proc #PROC-2026-93458
          </span>
          <span className="text-[#cbc4d4]">/</span>
          <span className="text-[#28006d] font-bold">
            Pre-Procedure Clinical Verification
          </span>
        </div>

        {/* Right Active Protocol Status & Clock */}
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-[#00696b] animate-ping" />
          <span className="text-[#00696b] text-[12px] font-bold tracking-[0.6px] uppercase">
            WHO CATH-LAB PROTOCOL ACTIVE
          </span>
          <span className="text-[#cbc4d4]">|</span>
          <span className="font-mono text-[#494552] text-[12px] font-medium flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            10:42:18 EST
          </span>
        </div>
      </div>

      {/* 3. MAIN PROTOCOL CONTENT AREA (Figma 1:14129) */}
      <main className="max-w-[1440px] mx-auto w-full px-[40px] pt-6 flex flex-col gap-6">
        {/* Top Time-Out Banner / Hero Card (Figma 1:14130) */}
        <div className="bg-gradient-to-r from-[#28006d] via-[#3f1d8b] to-[#28006d] p-6 rounded-[12px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] text-white relative overflow-hidden flex items-center justify-between">
          {/* Subtle Watermark Decorative Graphic */}
          <div className="absolute right-[-20px] top-[-30px] opacity-10 pointer-events-none select-none">
            <ShieldCheck className="w-64 h-64 text-white" />
          </div>

          {/* Left Info */}
          <div className="flex flex-col gap-1.5 max-w-[680px] z-10">
            <div className="flex items-center gap-2">
              <span className="bg-[#5af8fb] text-[#002020] text-[11px] font-bold tracking-[0.3px] uppercase px-2.5 py-0.5 rounded-full">
                MANDATORY PAUSE
              </span>
              <span className="backdrop-blur-[6px] bg-white/20 text-white text-[11px] font-medium px-2.5 py-0.5 rounded-full">
                Section 4.1 Surgical Checklist
              </span>
            </div>
            <h1 className="text-[28px] lg:text-[32px] font-bold tracking-[-0.8px] leading-tight text-white mt-1">
              Cath Lab Clinical Time-Out & Safety Verification
            </h1>
            <p className="text-[#cfbdff] text-[14px] leading-relaxed">
              Attending Operator Protocol Verification prior to vascular access induction. All multidisciplinary checkpoints must be ratified.
            </p>
          </div>

          {/* Right Safeguards Meter Card (Figma 1:14144) */}
          <div className="backdrop-blur-[6px] bg-white/10 p-4 rounded-[12px] flex items-center gap-4 z-10 shrink-0 border border-white/10">
            <div className="flex flex-col leading-tight">
              <span className="text-[#cfbdff] text-[10px] font-bold tracking-[0.55px] uppercase">
                SAFEGUARDS RATIFIED
              </span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-[32px] font-bold text-white tracking-tight">
                  {verifiedCount}
                </span>
                <span className="text-[14px] font-medium text-[#cfbdff]">
                  / 6 Verified
                </span>
              </div>
            </div>
            <div className="w-14 h-14 relative flex items-center justify-center shrink-0">
              <img
                src={surgicalSafetySeal}
                alt="Safety Verification Seal"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>

        {/* 4. SAFETY VERIFICATION TWO-COLUMN HIGH-DENSITY GRID (Figma 1:14156) */}
        <div className="grid grid-cols-12 gap-6 items-start w-full">
          {/* ============================================================ */}
          {/* LEFT COLUMN: Patient ID, Allergies & Diagnostics (6 Cols)    */}
          {/* ============================================================ */}
          <div className="col-span-12 lg:col-span-6 flex flex-col gap-6">
            {/* Card 1: 1. Patient Identity & Biometrics (Figma 1:14158) */}
            <div className="bg-white border border-[#eff4ff] rounded-[12px] p-5 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] flex flex-col gap-4">
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-[#eff4ff] pb-3.5">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#e5eeff] text-[#28006d] flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-[15px] font-bold text-[#0b1c30] leading-tight">
                      1. Patient Identity & Biometrics
                    </h2>
                    <p className="text-[12px] text-[#494552]">
                      Dual credential authentication & biometric matching
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => toggleChecklist('patientIdentity')}
                  className={cn(
                    'px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer',
                    checklist.patientIdentity
                      ? 'bg-[rgba(0,105,107,0.15)] text-[#00696b]'
                      : 'bg-amber-100 text-amber-800'
                  )}
                >
                  <Check className="w-3 h-3 stroke-[3]" />
                  <span>{checklist.patientIdentity ? 'VERIFIED' : 'PENDING'}</span>
                </button>
              </div>

              {/* Patient Detail 3-Column Bento Grid */}
              <div className="grid grid-cols-3 gap-3">
                {/* Photo & Identity Tile */}
                <div className="col-span-1 bg-[#eff4ff] rounded-lg p-3 flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 rounded-full overflow-hidden shadow-sm ring-2 ring-[#00696b] shrink-0">
                    <img
                      src={patientAvatarHero}
                      alt={data.patientName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="font-bold text-[12px] text-[#0b1c30] mt-2 leading-tight">
                    {data.patientName}
                  </span>
                  <span className="font-mono text-[11px] text-[#494552] mt-0.5">
                    {data.patientCid}
                  </span>
                </div>

                {/* Demographics & Token Tiles */}
                <div className="col-span-2 grid grid-cols-2 gap-2.5">
                  <div className="bg-[#eff4ff] rounded-lg p-2.5 flex flex-col justify-between">
                    <span className="text-[10px] text-[#494552] uppercase font-medium">
                      DATE OF BIRTH
                    </span>
                    <span className="text-[13px] font-semibold text-[#0b1c30]">
                      {data.patientDob}
                    </span>
                    <span className="text-[11px] text-[#494552]">
                      {data.patientAgeGender}
                    </span>
                  </div>

                  <div className="bg-[#eff4ff] rounded-lg p-2.5 flex flex-col justify-between">
                    <span className="text-[10px] text-[#494552] uppercase font-medium">
                      CARE ID NFC TOKEN
                    </span>
                    <span className="font-mono font-bold text-[12px] text-[#00696b] truncate">
                      {data.nfcToken}
                    </span>
                    <span className="text-[11px] text-[#494552]">
                      Cryptographic Hash Valid
                    </span>
                  </div>

                  {/* Wristband Protocol (spanning full width) */}
                  <div className="col-span-2 bg-[#eff4ff] rounded-lg p-2.5 flex flex-col gap-0.5">
                    <span className="text-[10px] text-[#494552] uppercase font-medium">
                      WRISTBAND PROTOCOL
                    </span>
                    <div className="flex items-center gap-1.5 text-[12px] font-semibold text-[#0b1c30]">
                      <Radio className="w-3.5 h-3.5 text-[#00696b] shrink-0" />
                      <span>{data.wristbandStatus}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Patient Verbal Confirmation Callout */}
              <div className="bg-[rgba(220,233,255,0.6)] p-3 rounded-lg flex items-start gap-2.5 text-xs text-[#0b1c30]">
                <ShieldCheck className="w-4 h-4 text-[#28006d] shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong className="font-semibold">Patient Verbal Confirmation:</strong>{' '}
                  {data.verbalConfirmation}
                </p>
              </div>
            </div>

            {/* Card 2: 2. Clinical Safety & Allergy Safeguards (Figma 1:14209) */}
            <div className="bg-white border border-[#eff4ff] rounded-[12px] p-5 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] flex flex-col gap-4">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-[#eff4ff] pb-3.5">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center shrink-0">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-[15px] font-bold text-[#0b1c30] leading-tight">
                      2. Clinical Safety &amp; Allergy Safeguards
                    </h2>
                    <p className="text-[12px] text-[#494552]">
                      Medication holds, hypersensitivity alerts, and pre-induction vitals
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {/* Figma 1:14221: ALLERGY FLAGGED Badge with Flag Icon & Two-Line Stacked Text */}
                  <div
                    className="bg-[#ba1a1a] content-stretch flex gap-1 items-center px-2.5 py-1 rounded-full shrink-0 shadow-xs"
                    data-node-id="1:14221"
                    data-name="Background"
                    role="status"
                    aria-label="Allergy flagged alert"
                  >
                    <div className="h-[9.2px] w-[8.2px] relative shrink-0 flex items-center justify-center">
                      <Flag className="w-[8.2px] h-[9.2px] text-white fill-white stroke-[2]" />
                    </div>
                    <div className="flex flex-col font-bold text-[11px] text-white leading-[13px] tracking-wide whitespace-nowrap">
                      <span className="leading-[13px]">ALLERGY</span>
                      <span className="leading-[13px]">FLAGGED</span>
                    </div>
                  </div>

                  {/* Sibling Checklist Button (Figma 1:14225): VERIFIED */}
                  <button
                    type="button"
                    onClick={() => toggleChecklist('clinicalSafety')}
                    className={cn(
                      'px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer',
                      checklist.clinicalSafety
                        ? 'bg-[rgba(0,105,107,0.15)] text-[#00696b]'
                        : 'bg-amber-100 text-amber-800'
                    )}
                  >
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                    <span>{checklist.clinicalSafety ? 'VERIFIED' : 'PENDING'}</span>
                  </button>
                </div>
              </div>

              {/* Severe Allergy Alert Banner (Figma 1:14229) */}
              <div
                className="bg-[rgba(255,218,214,0.4)] border border-[#ba1a1a]/20 p-3.5 rounded-lg flex items-start gap-3"
                data-node-id="1:14229"
              >
                <AlertOctagon className="w-4 h-4 text-[#ba1a1a] shrink-0 mt-0.5" />
                <div className="flex flex-col gap-1 text-xs w-full">
                  <div className="flex items-center gap-2">
                    <span className="text-[#93000a] font-bold tracking-wider uppercase text-[11px]">
                      {data.allergyName}
                    </span>
                    <span className="bg-[#ba1a1a] text-white text-[10px] font-semibold px-2 py-0.5 rounded">
                      Red Wristband Attached
                    </span>
                  </div>
                  <p className="text-[#0b1c30] leading-relaxed">
                    <strong>{data.contraindicatedDrug}</strong> strictly contraindicated. Prophylactic substitute:{' '}
                    <span className="font-semibold text-[#28006d]">{data.substituteDrug}</span>
                  </p>
                </div>
              </div>

              {/* Med Holds & Coagulation Metrics */}
              <div className="grid grid-cols-3 gap-2.5">
                <div className="bg-[#eff4ff] p-2.5 rounded-lg flex flex-col justify-between">
                  <span className="text-[10px] text-[#494552] uppercase font-medium">
                    METFORMIN PROTOCOL
                  </span>
                  <span className="text-[12px] font-bold text-[#00696b] flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    Withheld 52 hrs
                  </span>
                  <span className="text-[10px] text-[#494552]">
                    Renal baseline eGFR 74
                  </span>
                </div>

                <div className="bg-[#eff4ff] p-2.5 rounded-lg flex flex-col justify-between">
                  <span className="text-[10px] text-[#494552] uppercase font-medium">
                    COAGULATION INR
                  </span>
                  <span className="text-[12px] font-bold text-[#0b1c30]">
                    1.1 (Therapeutic)
                  </span>
                  <span className="text-[10px] text-[#494552]">
                    Normal homeostatic range
                  </span>
                </div>

                <div className="bg-[#eff4ff] p-2.5 rounded-lg flex flex-col justify-between">
                  <span className="text-[10px] text-[#494552] uppercase font-medium">
                    PLATELET COUNT
                  </span>
                  <span className="text-[12px] font-bold text-[#0b1c30]">
                    240,000 / µL
                  </span>
                  <span className="text-[10px] text-[#494552]">
                    Adequate for hemostasis
                  </span>
                </div>
              </div>

              {/* Real-Time Baseline Vitals Strip */}
              <div className="bg-[#dce9ff] p-3 rounded-lg flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 font-semibold text-[#494552] uppercase text-[11px]">
                  <Heart className="w-4 h-4 text-[#ba1a1a]" />
                  <span>VITALS BASELINE:</span>
                </div>
                <div className="flex items-center gap-4 text-[#0b1c30] font-medium">
                  <span>
                    BP: <strong className="font-bold">{data.vitals.bp}</strong>
                  </span>
                  <span>
                    HR: <strong className="font-bold">{data.vitals.hr}</strong>
                  </span>
                  <span>
                    SpO2: <strong className="font-bold">{data.vitals.spo2}</strong>
                  </span>
                  <span>
                    Temp: <strong className="font-bold">{data.vitals.temp}</strong>
                  </span>
                </div>
              </div>
            </div>

            {/* Card 3: 3. Diagnostic & Imaging Correlation (Figma 1:14285) */}
            <div className="bg-white border border-[#eff4ff] rounded-[12px] p-5 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] flex flex-col gap-4">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-[#eff4ff] pb-3.5">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#e5eeff] text-[#28006d] flex items-center justify-center shrink-0">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-[15px] font-bold text-[#0b1c30] leading-tight">
                      3. Diagnostic &amp; Imaging Correlation
                    </h2>
                    <p className="text-[12px] text-[#494552]">
                      Prior workup, stress cardiology findings, and baseline echocardiogram
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => toggleChecklist('diagnosticImaging')}
                  className={cn(
                    'px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer',
                    checklist.diagnosticImaging
                      ? 'bg-[rgba(0,105,107,0.15)] text-[#00696b]'
                      : 'bg-amber-100 text-amber-800'
                  )}
                >
                  <Check className="w-3 h-3 stroke-[3]" />
                  <span>{checklist.diagnosticImaging ? 'RATIFIED' : 'PENDING'}</span>
                </button>
              </div>

              {/* Side-by-side Diagnostic Cards */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                {/* Stress Test */}
                <div className="bg-[#eff4ff] p-3 rounded-lg flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#0b1c30]">Treadmill Stress Test</span>
                    <span className="bg-[#ffdbc9] text-[#331200] text-[10px] font-semibold px-2 py-0.5 rounded">
                      Positive Result
                    </span>
                  </div>
                  <p className="text-[#494552] leading-relaxed">
                    Demonstrated 1.8mm horizontal ST-depression in anterolateral leads{' '}
                    <strong className="font-mono text-[#0b1c30]">V4-V6</strong> at 8.4 METs. Correlates with suspected mid-to-distal LAD or diagonal lesion.
                  </p>
                  {/* Mini ECG Sparkline Chart */}
                  <div className="bg-white border border-slate-200/80 rounded p-1.5 flex items-center justify-center h-10 mt-auto">
                    <img
                      src={ecgSparkline}
                      alt="Mini ECG Telemetry Sparkline"
                      className="w-full h-7 object-contain"
                    />
                  </div>
                </div>

                {/* Echocardiogram */}
                <div className="bg-[#eff4ff] p-3 rounded-lg flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#0b1c30]">Transthoracic Echo (TTE)</span>
                    <span className="bg-[#dce9ff] text-[#0b1c30] text-[10px] font-semibold px-2 py-0.5 rounded">
                      14 Days Prior
                    </span>
                  </div>
                  <div className="bg-white rounded p-2 flex items-center justify-between">
                    <span className="text-[#494552] font-medium">Estimated LVEF</span>
                    <span className="font-bold text-[#00696b] text-[13px]">
                      {data.tteLvef}
                    </span>
                  </div>
                  <p className="text-[#494552] leading-relaxed mt-auto">
                    {data.tteDetail}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ============================================================ */}
          {/* RIGHT COLUMN: Procedure Site, Consents, & Roster (6 Cols)    */}
          {/* ============================================================ */}
          <div className="col-span-12 lg:col-span-6 flex flex-col gap-6">
            {/* Card 4: 4. Planned Procedure & Access Site (Figma 1:14328) */}
            <div className="bg-white border border-[#eff4ff] rounded-[12px] p-5 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] flex flex-col gap-4">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-[#eff4ff] pb-3.5">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#e5eeff] text-[#28006d] flex items-center justify-center shrink-0">
                    <Stethoscope className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-[15px] font-bold text-[#0b1c30] leading-tight">
                      4. Planned Procedure &amp; Access Site
                    </h2>
                    <p className="text-[12px] text-[#494552]">
                      Procedural scope, arterial conduit, equipment &amp; contrast load
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => toggleChecklist('plannedProcedure')}
                  className={cn(
                    'px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer',
                    checklist.plannedProcedure
                      ? 'bg-[rgba(0,105,107,0.15)] text-[#00696b]'
                      : 'bg-amber-100 text-amber-800'
                  )}
                >
                  <Check className="w-3 h-3 stroke-[3]" />
                  <span>{checklist.plannedProcedure ? 'VERIFIED' : 'PENDING'}</span>
                </button>
              </div>

              {/* Procedure Title Card */}
              <div className="bg-[rgba(232,221,255,0.5)] border border-[#e8ddff] p-3.5 rounded-lg flex items-start justify-between">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-semibold text-[#4f319c] uppercase tracking-wider">
                    PRIMARY TARGET INTERVENTIONS
                  </span>
                  <h3 className="font-bold text-[#21005d] text-[13px] leading-snug">
                    {data.procedureName}
                  </h3>
                  <span className="text-[11px] text-[#4f319c]">
                    {data.cptCode}
                  </span>
                </div>
                <span className="bg-[#28006d] text-white text-[11px] font-semibold px-2 py-0.5 rounded shrink-0">
                  {data.tierAccess}
                </span>
              </div>

              {/* Anatomical Site Verification Callout */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-[#eff4ff] p-3 rounded-lg flex flex-col gap-1">
                  <span className="text-[10px] text-[#494552] uppercase font-medium">
                    PRIMARY VASCULAR ACCESS
                  </span>
                  <span className="font-bold text-[#0b1c30] text-[12px]">
                    {data.primaryAccessSite}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-[#00696b] mt-1">
                    <Check className="w-3.5 h-3.5" />
                    <span>{data.primaryAccessDetail}</span>
                  </div>
                </div>

                <div className="bg-[#eff4ff] p-3 rounded-lg flex flex-col gap-1">
                  <span className="text-[10px] text-[#494552] uppercase font-medium">
                    SECONDARY RESCUE ACCESS
                  </span>
                  <span className="font-bold text-[#0b1c30] text-[12px]">
                    {data.secondaryAccessSite}
                  </span>
                  <span className="text-[11px] text-[#494552] mt-1">
                    {data.secondaryAccessDetail}
                  </span>
                </div>
              </div>

              {/* Facility & Equipment Details Strip */}
              <div className="bg-[#eff4ff] p-3 rounded-lg grid grid-cols-3 gap-2 text-xs">
                <div className="flex flex-col">
                  <span className="text-[10px] text-[#494552] uppercase font-medium">
                    CATH SUITE
                  </span>
                  <span className="font-semibold text-[#0b1c30] mt-0.5">
                    {data.cathSuite}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-[#494552] uppercase font-medium">
                    FLUOROSCOPY
                  </span>
                  <span className="font-semibold text-[#0b1c30] mt-0.5">
                    {data.fluoroscopyUnit}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-[#494552] uppercase font-medium">
                    CONTRAST MEDIA
                  </span>
                  <span className="font-semibold text-[#0b1c30] mt-0.5">
                    {data.contrastMedia}
                  </span>
                </div>
              </div>
            </div>

            {/* Card 5: 5. Signed Consents & Clearance (Figma 1:14395) */}
            <div className="bg-white border border-[#eff4ff] rounded-[12px] p-5 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] flex flex-col gap-4">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-[#eff4ff] pb-3.5">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#e5eeff] text-[#28006d] flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-[15px] font-bold text-[#0b1c30] leading-tight">
                      5. Signed Consents &amp; Clearance
                    </h2>
                    <p className="text-[12px] text-[#494552]">
                      Informed procedural consent and underwriting authorization
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => toggleChecklist('signedConsents')}
                  className={cn(
                    'px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer',
                    checklist.signedConsents
                      ? 'bg-[rgba(0,105,107,0.15)] text-[#00696b]'
                      : 'bg-amber-100 text-amber-800'
                  )}
                >
                  <Check className="w-3 h-3 stroke-[3]" />
                  <span>{checklist.signedConsents ? 'VERIFIED' : 'PENDING'}</span>
                </button>
              </div>

              {/* Items List */}
              <div className="flex flex-col gap-2.5 text-xs">
                {/* Item 1: Surgical Consent */}
                <div className="bg-[#eff4ff] p-3 rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <FileCheck2 className="w-4 h-4 text-[#28006d] shrink-0" />
                    <div className="flex flex-col">
                      <span className="font-bold text-[#0b1c30]">
                        {data.consentFormName}
                      </span>
                      <span className="text-[11px] text-[#494552]">
                        Signed by {data.consentSignedBy} • Witnessed by {data.consentWitness}
                      </span>
                    </div>
                  </div>
                  <span className="bg-[rgba(86,245,248,0.4)] text-[#006e70] font-semibold text-[11px] px-2.5 py-0.5 rounded shrink-0">
                    e-Signed
                  </span>
                </div>

                {/* Item 2: Financial Settlement */}
                <div className="bg-[#eff4ff] p-3 rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <CreditCard className="w-4 h-4 text-[#28006d] shrink-0" />
                    <div className="flex flex-col">
                      <span className="font-bold text-[#0b1c30]">
                        {data.financialSettlementId}
                      </span>
                      <span className="text-[11px] text-[#494552]">
                        {data.financialPlanDetail}
                      </span>
                    </div>
                  </div>
                  <span className="bg-[#d3e4fe] text-[#0b1c30] font-semibold text-[11px] px-2.5 py-0.5 rounded shrink-0">
                    Cleared
                  </span>
                </div>
              </div>
            </div>

            {/* Card 6: 6. Team Time-Out Roster Verification (Figma 1:14432) */}
            <div className="bg-white border border-[#eff4ff] rounded-[12px] p-5 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] flex flex-col gap-4">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-[#eff4ff] pb-3.5">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#e5eeff] text-[#28006d] flex items-center justify-center shrink-0">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-[15px] font-bold text-[#0b1c30] leading-tight">
                      6. Team Time-Out Roster
                    </h2>
                    <p className="text-[12px] text-[#494552]">
                      Multidisciplinary personnel in Cath Lab Suite 3
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => toggleChecklist('teamRoster')}
                  className={cn(
                    'px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer',
                    checklist.teamRoster
                      ? 'bg-[rgba(0,105,107,0.15)] text-[#00696b]'
                      : 'bg-amber-100 text-amber-800'
                  )}
                >
                  <Check className="w-3 h-3 stroke-[3]" />
                  <span>{checklist.teamRoster ? 'VERIFIED' : 'PENDING'}</span>
                </button>
              </div>

              {/* Personnel 2x2 Grid */}
              <div className="grid grid-cols-2 gap-2.5">
                {data.roster.map((person) => (
                  <div
                    key={person.role}
                    className="bg-[#eff4ff] p-2.5 rounded-lg flex items-center gap-2.5"
                  >
                    <div
                      className={cn(
                        'w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0',
                        person.avatarBg,
                        person.avatarText
                      )}
                    >
                      {person.initials}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="font-bold text-[12px] text-[#0b1c30] truncate">
                        {person.name}
                      </span>
                      <span className="text-[11px] text-[#494552] truncate">
                        {person.role}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 5. PERSISTENT BOTTOM ACTION BAR & ELECTRONIC SIGNATURE STAMPING (Figma 1:14479) */}
        <div className="sticky bottom-4 z-30 w-full mt-2">
          <div className="backdrop-blur-[8px] bg-white/95 border border-slate-200/90 rounded-[12px] p-4 shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)] flex items-center justify-between">
            {/* Left Ratification Summary */}
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center shrink-0',
                  allVerified
                    ? 'bg-[rgba(0,105,107,0.15)] text-[#00696b]'
                    : 'bg-amber-100 text-amber-800'
                )}
              >
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-[13px] font-bold text-[#0b1c30]">
                  Safety Verification Complete: {verifiedCount} of 6 Verified
                </span>
                <span className="text-[11px] text-[#494552] mt-0.5">
                  Ratified by Dr. Michael Chang via Care ID Cryptographic Handshake
                </span>
              </div>
            </div>

            {/* Right Action Buttons */}
            <div className="flex items-center gap-3">
              {/* Return Button */}
              <button
                type="button"
                onClick={() => navigate('/treatment-offers/TR-8921/status', { state: data })}
                className="bg-[#eff4ff] hover:bg-slate-200 text-[#0b1c30] text-[12px] font-semibold px-4 py-2.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Return to Check-In</span>
              </button>

              {/* Safety Hold Button */}
              {!isHoldActive ? (
                <button
                  type="button"
                  onClick={() => setShowHoldModal(true)}
                  className="bg-[#ffdad6] hover:bg-red-200 text-[#93000a] text-[12px] font-semibold px-4 py-2.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Flag Safety Hold</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleClearHold}
                  className="bg-emerald-100 hover:bg-emerald-200 text-emerald-800 text-[12px] font-semibold px-4 py-2.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Clear Safety Hold</span>
                </button>
              )}

              {/* Primary CTA: Confirm & Start Encounter */}
              <button
                type="button"
                onClick={handleStartEncounter}
                disabled={isHoldActive}
                className={cn(
                  'h-[52px] px-6 rounded-lg font-semibold text-[14px] text-white flex items-center gap-2.5 shadow-md transition-all cursor-pointer',
                  isHoldActive
                    ? 'bg-slate-300 cursor-not-allowed opacity-60'
                    : 'bg-gradient-to-b from-[#a44cff] to-[#5b14b8] hover:opacity-95 active:scale-[0.99]'
                )}
              >
                <span>Confirm &amp; Start Encounter</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* ============================================================ */}
      {/* MODAL 1: FLAG SAFETY HOLD MODAL                               */}
      {/* ============================================================ */}
      {showHoldModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-[16px] max-w-[500px] w-full p-6 shadow-2xl flex flex-col gap-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5 text-[#93000a]">
                <AlertTriangle className="w-5 h-5" />
                <h3 className="font-bold text-base">Flag Clinical Safety Hold</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowHoldModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Flagging a safety hold immediately pauses arterial puncture and vascular induction in Cath Suite #03. Bedside telemetry and the multidisciplinary team will be alerted.
            </p>

            <div className="flex flex-col gap-1.5 text-xs">
              <label className="font-bold text-slate-700">Primary Safety Hold Reason</label>
              <select
                value={holdReason}
                onChange={(e) => setHoldReason(e.target.value)}
                className="border border-slate-300 rounded-lg p-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500/20"
              >
                <option value="Vitals Discrepancy / Hemodynamic Instability">
                  Vitals Discrepancy / Hemodynamic Instability
                </option>
                <option value="Penicillin / Cephalosporin Acute Allergy Flag">
                  Penicillin / Cephalosporin Acute Allergy Flag
                </option>
                <option value="Coagulation INR Out of Safe Range">
                  Coagulation INR Out of Safe Range
                </option>
                <option value="Incomplete Informed Consent or Legal Proxy Issue">
                  Incomplete Informed Consent or Legal Proxy Issue
                </option>
                <option value="Fluoroscopy Unit Artis Q Recalibration Required">
                  Fluoroscopy Unit Artis Q Recalibration Required
                </option>
                <option value="Key Personnel Absent (CST / Circulator / Attending)">
                  Key Personnel Absent (CST / Circulator / Attending)
                </option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5 text-xs">
              <label className="font-bold text-slate-700">Clinical Remarks (Optional)</label>
              <textarea
                rows={3}
                value={holdNotes}
                onChange={(e) => setHoldNotes(e.target.value)}
                placeholder="Specify clinical observations or required corrective actions before hold clearance..."
                className="border border-slate-300 rounded-lg p-2.5 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500/20"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowHoldModal(false)}
                className="px-4 py-2 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmHold}
                className="px-4 py-2 bg-[#ba1a1a] hover:bg-[#93000a] text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
              >
                Confirm &amp; Flag Hold
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL 2: TIME-OUT RATIFICATION & CRYPTOGRAPHIC STAMP MODAL    */}
      {/* ============================================================ */}
      {showRatifyModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-[16px] max-w-[540px] w-full p-6 shadow-2xl flex flex-col gap-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5 text-[#28006d]">
                <ShieldCheck className="w-5 h-5 text-[#3f1d8b]" />
                <h3 className="font-bold text-base text-[#0f172a]">
                  Ratify Cath Lab Safety Time-Out
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowRatifyModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-[#f8fafc] border border-slate-200 rounded-xl p-3.5 flex flex-col gap-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Patient:</span>
                <span className="font-bold text-slate-800">
                  {data.patientName} ({data.patientCid})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Procedure:</span>
                <span className="font-semibold text-slate-800">
                  CPT #93458 Diagnostic Left Heart Cath
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Primary Access Site:</span>
                <span className="font-semibold text-emerald-700">
                  {data.primaryAccessSite} (Allen&apos;s Patent)
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Allergy Precaution:</span>
                <span className="font-semibold text-rose-700">
                  Penicillin Contradicted • Vancomycin Running
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Multidisciplinary Roster:</span>
                <span className="font-semibold text-slate-800">
                  4 Cath Personnel Present &amp; Scrubbed
                </span>
              </div>
              <div className="flex justify-between pt-1 border-t border-slate-200">
                <span className="text-slate-500">Attending Operator:</span>
                <span className="font-bold text-[#28006d]">
                  Dr. Michael Chang, MD (Lic #88392)
                </span>
              </div>
            </div>

            {/* Cryptographic Hash Stamp Strip */}
            <div className="bg-[#eff4ff] border border-purple-200 rounded-lg p-3 flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-[#28006d]" />
                <span className="font-mono text-slate-700">
                  SHA256-CATH-TIMEOUT-93458-VERIFIED-9B41E8C2
                </span>
              </div>
              <span className="bg-[#28006d] text-white font-semibold px-2 py-0.5 rounded text-[10px]">
                Valid
              </span>
            </div>

            <p className="text-[11px] text-slate-500 italic">
              By authorizing, you confirm under clinical penalty of perjury that all multidisciplinary team members performed verbal time-out verification prior to sheath insertion.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowRatifyModal(false)}
                className="px-4 py-2 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                Review Checkpoints
              </button>
              <button
                type="button"
                onClick={handleFinalRatification}
                className="px-5 py-2.5 bg-gradient-to-r from-[#a44cff] to-[#5b14b8] text-white rounded-lg text-xs font-bold shadow-md hover:opacity-95 transition-opacity flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Authorize &amp; Proceed to Encounter</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
