import React, { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  Award,
  Building,
  CheckCircle2,
  Clock,
  Lock,
  Radio,
  RotateCcw,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Wifi,
  X,
} from 'lucide-react';
import { DEFAULT_ENCOUNTER_DATA, EncounterDocumentationState } from './types';

export const StartClinicalEncounterPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const offerId = id || 'TR-8921';

  const [encounterData] = useState<EncounterDocumentationState>(DEFAULT_ENCOUNTER_DATA);
  const [showHoldModal, setShowHoldModal] = useState(false);
  const [holdReason, setHoldReason] = useState('');
  const [isHoldActive, setIsHoldActive] = useState(false);

  const { telemetry } = encounterData;

  const handleStartEncounter = () => {
    navigate(`/treatment-offers/${offerId}/encounter/active`, {
      state: { encounterData, from: location.pathname },
    });
  };

  const handleBackToSafety = () => {
    navigate(`/treatment-offers/${offerId}/cath-lab-safety`);
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] flex flex-col w-full pb-28">
      {/* 1. TOP HEADER (Cath Lab Workstation Shell) */}
      <header className="backdrop-blur-[6px] bg-white/95 border-b border-slate-200/80 shadow-[0px_1px_12px_0px_rgba(11,28,48,0.04)] sticky top-0 z-30 w-full">
        <div className="h-[64px] px-[40px] flex items-center justify-between w-full">
          {/* Left: EHR Status & Cath Suite Station */}
          <div className="flex items-center gap-6">
            <div className="bg-[rgba(86,245,248,0.3)] flex items-center gap-2 px-3 py-1.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-[#00696b] animate-pulse" />
              <span className="font-semibold text-[#00696b] text-[12px]">Live Telemetry Feed</span>
            </div>
            <div className="flex items-center gap-2 text-[#494552] text-[12px] font-medium">
              <Building className="w-4 h-4 text-slate-500" />
              <span>Cath Lab Suite #03 • Artis Q Fluoroscopy</span>
            </div>
          </div>

          {/* Right: Actions, Notifications, & Doctor Profile */}
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2 bg-[#dce9ff] text-[#0b1c30] px-3 py-1.5 rounded-lg text-xs font-semibold">
              <Lock className="w-3.5 h-3.5 text-[#28006d]" />
              <span>Time-Out Ratified</span>
            </div>

            <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
              <div className="w-9 h-9 rounded-full bg-[#28006d] text-white flex items-center justify-center font-bold text-xs ring-2 ring-[#dce9ff]">
                MC
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-[13px] font-semibold text-[#0b1c30]">Dr. Michael Chang, MD</span>
                <span className="text-[11px] text-[#494552]">Attending Interventionalist</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sub-Header Context & Stepper Strip */}
        <div className="bg-[#eff4ff] px-[40px] py-2 flex items-center justify-between border-t border-slate-200/60 text-xs">
          <div className="flex items-center gap-2.5">
            <span className="bg-[#28006d] text-white text-[10px] font-bold px-2 py-0.5 rounded tracking-wide uppercase">
              ACTIVE ENCOUNTER INDUCTION
            </span>
            <span className="font-bold text-[#0b1c30] text-[13px]">{telemetry.patientName}</span>
            <span className="text-slate-500 font-medium">({telemetry.patientDob})</span>
            <span className="bg-[#dce9ff] text-[#0b1c30] font-semibold text-[11px] px-2 py-0.5 rounded-full">
              ID: {telemetry.patientCid}
            </span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center gap-1.5 text-slate-600 font-medium">
              <Stethoscope className="w-3.5 h-3.5 text-[#28006d]" />
              {telemetry.cptCode} {telemetry.procedureName}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-500 font-medium">Workflow:</span>
            <span className="bg-[#d3e4fe] text-[#0b1c30] text-[11px] px-2 py-0.5 rounded font-medium">
              Check-in
            </span>
            <span className="bg-[#d3e4fe] text-[#0b1c30] text-[11px] px-2 py-0.5 rounded font-medium">
              Time-Out (Ratified)
            </span>
            <span className="bg-[rgba(0,105,107,0.15)] text-[#00696b] text-[11px] font-bold px-2.5 py-0.5 rounded ring-1 ring-[#00696b]/30">
              Start Encounter (Active)
            </span>
            <span className="bg-[#e8ddff] text-[#21005d] text-[11px] font-semibold px-2 py-0.5 rounded">
              Active Doc
            </span>
            <span className="bg-[#d3e4fe] text-slate-500 text-[11px] px-2 py-0.5 rounded">
              Post-Op
            </span>
          </div>
        </div>
      </header>

      {/* 2. BREADCRUMB NAVIGATION BAR */}
      <div className="bg-[#eff4ff] drop-shadow-[0px_1px_0px_rgba(11,28,48,0.04)] px-[40px] py-3 flex items-center justify-between border-b border-slate-200/80 w-full">
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
            {telemetry.patientName} ({telemetry.patientCid})
          </button>
          <span className="text-[#cbc4d4]">/</span>
          <span className="bg-[#d3e4fe] text-[#0b1c30] text-[11px] px-2 py-0.5 rounded font-mono font-medium">
            Proc #PROC-2026-93458
          </span>
          <span className="text-[#cbc4d4]">/</span>
          <span className="text-[#28006d] font-bold">Start Clinical Encounter</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-[#00696b] animate-ping" />
          <span className="text-[#00696b] text-[12px] font-bold tracking-[0.6px] uppercase">
            WHO CATH-LAB PROTOCOL ACTIVE
          </span>
          <span className="text-[#cbc4d4]">|</span>
          <span className="font-mono text-[#494552] text-[12px] font-medium flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            10:45:00 EST
          </span>
        </div>
      </div>

      {/* Safety Hold Warning Banner */}
      {isHoldActive && (
        <div className="bg-[#ba1a1a] text-white px-6 py-2.5 flex items-center justify-between text-xs font-semibold shadow-md sticky top-0 z-40">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-[#ffdad6]" />
            <span>
              SURGICAL ENCOUNTER STANDBY HOLD ACTIVE: Reason — &ldquo;{holdReason}&rdquo;. Procedural logging halted.
            </span>
          </div>
          <button
            type="button"
            onClick={() => setIsHoldActive(false)}
            className="bg-white text-[#93000a] px-3 py-1 rounded text-xs font-bold hover:bg-slate-100 transition-colors cursor-pointer"
          >
            Resume Induction
          </button>
        </div>
      )}

      {/* 3. MAIN WORKSPACE CONTENT */}
      <main className="max-w-[1440px] mx-auto w-full px-[40px] pt-6 flex flex-col gap-6">
        {/* Top Protocol Banner / Hero Card (Figma 1:14597) */}
        <div className="bg-gradient-to-r from-[#28006d] via-[#3f1d8b] to-[#28006d] p-6 rounded-[12px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] text-white relative overflow-hidden flex flex-col gap-4">
          <div className="flex items-start justify-between z-10">
            <div className="flex flex-col gap-1.5 max-w-[760px]">
              <div className="flex items-center gap-2">
                <span className="bg-[#5af8fb] text-[#002020] text-[10px] font-black px-2.5 py-0.5 rounded-full tracking-wider uppercase">
                  CATH LAB SUITE 3 PROTOCOL
                </span>
                <span className="text-slate-300 text-xs">Siemens Artis Q Telemetry Online</span>
              </div>
              <h1 className="text-[24px] font-black tracking-tight leading-tight">
                Initiate Active Clinical Encounter
              </h1>
              <p className="text-[13px] text-purple-100/90 leading-relaxed">
                Formal induction of procedural logging, real-time hemodynamic monitoring, and fluoroscopic time tracking for Cath Lab Suite 3.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-xl border border-white/20 flex flex-col items-end text-right">
              <span className="text-[10px] uppercase tracking-wider text-purple-200 font-semibold">
                Induction Status
              </span>
              <span className="text-sm font-bold text-white flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#5af8fb] animate-ping" />
                Ready to Open Field
              </span>
            </div>
          </div>

          {/* 6-Tile Metadata Grid */}
          <div className="grid grid-cols-6 gap-3 pt-3 border-t border-white/15 text-xs z-10">
            <div className="bg-white/5 backdrop-blur-xs p-3 rounded-lg border border-white/10">
              <span className="text-[10px] uppercase font-semibold text-purple-200 block">Encounter ID</span>
              <span className="font-bold text-white text-[13px] font-mono mt-0.5 block">{telemetry.encounterId}</span>
            </div>
            <div className="bg-white/5 backdrop-blur-xs p-3 rounded-lg border border-white/10">
              <span className="text-[10px] uppercase font-semibold text-purple-200 block">Scheduled Slot</span>
              <span className="font-semibold text-white mt-0.5 block">{telemetry.scheduledSlot}</span>
            </div>
            <div className="bg-white/5 backdrop-blur-xs p-3 rounded-lg border border-white/10">
              <span className="text-[10px] uppercase font-semibold text-purple-200 block">Actual Induction</span>
              <span className="font-semibold text-emerald-300 mt-0.5 block">{telemetry.actualInduction}</span>
            </div>
            <div className="bg-white/5 backdrop-blur-xs p-3 rounded-lg border border-white/10">
              <span className="text-[10px] uppercase font-semibold text-purple-200 block">Target Patient</span>
              <span className="font-semibold text-white mt-0.5 block truncate">{telemetry.patientName}</span>
            </div>
            <div className="bg-white/5 backdrop-blur-xs p-3 rounded-lg border border-white/10">
              <span className="text-[10px] uppercase font-semibold text-purple-200 block">Facility</span>
              <span className="font-semibold text-white mt-0.5 block truncate">Mount Sinai Cath #03</span>
            </div>
            <div className="bg-white/5 backdrop-blur-xs p-3 rounded-lg border border-white/10">
              <span className="text-[10px] uppercase font-semibold text-purple-200 block">Attending Physician</span>
              <span className="font-semibold text-purple-200 mt-0.5 block truncate">{telemetry.attendingPhysician}</span>
            </div>
          </div>
        </div>

        {/* Clinical Indication Strip */}
        <div className="bg-white border border-[#eff4ff] rounded-[12px] p-4 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#e8ddff] text-[#28006d] flex items-center justify-center shrink-0">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-[#28006d] text-white text-[11px] font-bold px-2 py-0.5 rounded">
                  {telemetry.cptCode}
                </span>
                <h3 className="font-bold text-[14px] text-[#0b1c30]">
                  {telemetry.procedureName}
                </h3>
              </div>
              <p className="text-[12px] text-[#494552] mt-0.5">
                Primary Access: <strong className="text-[#0b1c30]">{telemetry.accessApproach}</strong> • Sedation: Tier-1 Conscious Sedation
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="bg-[rgba(0,105,107,0.1)] text-[#00696b] text-[11px] font-bold px-3 py-1 rounded-full border border-[#00696b]/20">
              All 6 Time-Out Gates Cleared
            </span>
          </div>
        </div>

        {/* 2-Column Split Layout */}
        <div className="grid grid-cols-12 gap-6 items-start">
          {/* Left Column (8 cols): Verified Pre-Conditions & Cath Suite Telemetry */}
          <div className="col-span-8 flex flex-col gap-6">
            {/* Card 1: Verified Pre-Conditions & Checklist (5/5 Ratified) */}
            <div className="bg-white border border-[#eff4ff] rounded-[12px] p-5 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-[#eff4ff] pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#dce9ff] text-[#28006d] flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-[14px] font-bold text-[#0b1c30]">
                      Verified Pre-Conditions &amp; Checklist (5/5 Ratified)
                    </h2>
                    <p className="text-[11px] text-[#494552]">
                      Electronic confirmation of surgical readiness prior to sheath introduction
                    </p>
                  </div>
                </div>
                <span className="bg-[#e7f7e9] text-[#137333] font-bold text-[11px] px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-[#137333]/20">
                  <CheckCircle2 className="w-3 h-3" />
                  100% Cleared
                </span>
              </div>

              {/* Checklist Items */}
              <div className="flex flex-col gap-3">
                {/* 1. Identity */}
                <div className="p-3.5 rounded-lg bg-[#f8f9ff] border border-slate-200/60 flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[13px] text-[#0b1c30]">
                          1. Patient Identity Verified via Care ID Dual-Auth
                        </span>
                        <span className="bg-[#dce9ff] text-[#0b1c30] text-[10px] font-bold px-2 py-0.2 rounded font-mono">
                          NFC: 0x9B41...E8C2
                        </span>
                      </div>
                      <p className="text-[12px] text-[#494552] mt-0.5">
                        Wristband scan cross-matched to Bedside Monitor #04. Verbal affirmation confirmed in morning huddle.
                      </p>
                    </div>
                  </div>
                  <span className="text-emerald-700 font-bold text-[11px] uppercase tracking-wide">CONFIRMED</span>
                </div>

                {/* 2. Surgical Time-Out */}
                <div className="p-3.5 rounded-lg bg-[#f8f9ff] border border-slate-200/60 flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-[13px] text-[#0b1c30]">
                          2. Surgical Time-Out Ratified by Multidisciplinary Team
                        </span>
                        <span className="bg-[#28006d] text-white text-[10px] font-bold px-2 py-0.5 rounded shrink-0">
                          4 Scrubbed Personnel
                        </span>
                      </div>
                      <p className="text-[12px] text-[#494552] mt-0.5">
                        Attending Interventionalist Dr. Michael Chang, Lead RN Keith Vance, CST Morales, Sedation Monitoring.
                      </p>
                    </div>
                  </div>
                  <span className="text-emerald-700 font-bold text-[11px] uppercase tracking-wide shrink-0">RATIFIED</span>
                </div>

                {/* 3. Penicillin Allergy Safeguard */}
                <div className="p-3.5 rounded-lg bg-[#fff8f8] border border-rose-200 flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[13px] text-[#ba1a1a]">
                          3. Penicillin Anaphylaxis Protocol Active
                        </span>
                        <span className="bg-[#ba1a1a] text-white text-[10px] font-bold px-2 py-0.2 rounded">
                          SEVERE ALLERGY
                        </span>
                      </div>
                      <p className="text-[12px] text-[#494552] mt-0.5">
                        Cefazolin strictly avoided. Vancomycin 1g IVPB premedication completed @ 08:45 AM. Emergency epinephrine at bedside.
                      </p>
                    </div>
                  </div>
                  <span className="text-rose-700 font-bold text-[11px] uppercase tracking-wide">ACTIVE PROTOCOL</span>
                </div>

                {/* 4. Fasting & Patency */}
                <div className="p-3.5 rounded-lg bg-[#f8f9ff] border border-slate-200/60 flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[13px] text-[#0b1c30]">
                          4. Fasting (NPO 8h) &amp; Radial Collateral Patency Confirmed
                        </span>
                        <span className="bg-[#e7f7e9] text-[#137333] text-[10px] font-bold px-2 py-0.2 rounded">
                          Barbeau Class A
                        </span>
                      </div>
                      <p className="text-[12px] text-[#494552] mt-0.5">
                        Last oral intake 10:00 PM previous evening. Right radial artery patent with excellent ulnar collateralization.
                      </p>
                    </div>
                  </div>
                  <span className="text-emerald-700 font-bold text-[11px] uppercase tracking-wide">CLEARED</span>
                </div>

                {/* 5. Financial Clearance */}
                <div className="p-3.5 rounded-lg bg-[#f8f9ff] border border-slate-200/60 flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-[13px] text-[#0b1c30]">
                          5. Financial Clearance &amp; Ratified Agreement #FIN-TR8921
                        </span>
                        <span className="bg-[#dce9ff] text-[#0b1c30] text-[10px] font-bold px-2 py-0.5 rounded font-mono shrink-0">
                          $4,420 Settled
                        </span>
                      </div>
                      <p className="text-[12px] text-[#494552] mt-0.5">
                        Care ID 0% APR 12-Month Financing Plan pre-authorized and underwritten. No outstanding co-pay obligation.
                      </p>
                    </div>
                  </div>
                  <span className="text-emerald-700 font-bold text-[11px] uppercase tracking-wide shrink-0">AUTHORIZED</span>
                </div>
              </div>
            </div>

            {/* Card 2: Cath Suite Fluoroscopy & Dose Telemetry Sync */}
            <div className="bg-white border border-[#eff4ff] rounded-[12px] p-5 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-[#eff4ff] pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[rgba(0,105,107,0.1)] text-[#00696b] flex items-center justify-center shrink-0">
                    <Radio className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-[14px] font-bold text-[#0b1c30]">
                      Cath Suite Fluoroscopy &amp; Dose Telemetry Sync
                    </h2>
                    <p className="text-[11px] text-[#494552]">
                      Live telemetry link: Siemens Artis Q X-Ray Generator &amp; Hemodynamic Cart
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                  <Wifi className="w-3.5 h-3.5 text-emerald-600" />
                  <span>PACS Connected</span>
                </div>
              </div>

              {/* 4 Telemetry Counters */}
              <div className="grid grid-cols-4 gap-3">
                <div className="bg-[#f8f9ff] border border-slate-200/70 p-3 rounded-lg text-center">
                  <span className="text-[10px] uppercase font-semibold text-[#494552] block">Fluoro Clock</span>
                  <span className="text-[20px] font-bold font-mono text-[#0b1c30] block mt-0.5">
                    {telemetry.fluoroTimeMinutes.toFixed(1)} <span className="text-xs font-normal text-slate-500">min</span>
                  </span>
                  <span className="text-[10px] text-slate-400">Timer reset at induction</span>
                </div>

                <div className="bg-[#f8f9ff] border border-slate-200/70 p-3 rounded-lg text-center">
                  <span className="text-[10px] uppercase font-semibold text-[#494552] block">Radiation DAP</span>
                  <span className="text-[20px] font-bold font-mono text-[#0b1c30] block mt-0.5">
                    {telemetry.radiationDap.toFixed(1)} <span className="text-xs font-normal text-slate-500">Gy·cm²</span>
                  </span>
                  <span className="text-[10px] text-emerald-600 font-medium">Within ALARA limits</span>
                </div>

                <div className="bg-[#f8f9ff] border border-slate-200/70 p-3 rounded-lg text-center">
                  <span className="text-[10px] uppercase font-semibold text-[#494552] block">Isovue-370 Contrast</span>
                  <span className="text-[20px] font-bold font-mono text-[#0b1c30] block mt-0.5">
                    {telemetry.contrastInjectedMl} <span className="text-xs font-normal text-slate-500">mL</span>
                  </span>
                  <span className="text-[10px] text-slate-400">Max limit: 180 mL</span>
                </div>

                <div className="bg-[#f8f9ff] border border-slate-200/70 p-3 rounded-lg text-center">
                  <span className="text-[10px] uppercase font-semibold text-[#494552] block">Target ACT</span>
                  <span className="text-[20px] font-bold font-mono text-[#0b1c30] block mt-0.5">
                    {telemetry.actSeconds} <span className="text-xs font-normal text-slate-500">sec</span>
                  </span>
                  <span className="text-[10px] text-purple-700 font-medium">Post-Heparin Goal: &gt;250s</span>
                </div>
              </div>

              {/* Simulation Transparency Banner */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 flex items-center justify-between text-[11px] text-[#494552]">
                <div className="flex items-center gap-2">
                  <Award className="w-3.5 h-3.5 text-[#28006d]" />
                  <span>
                    <strong>Simulation Mode:</strong> Cath Lab radiation telemetry and hemodynamic monitors operate in live hospital demonstration mode.
                  </span>
                </div>
                <span className="text-slate-400 font-mono">Demo Build v2.8</span>
              </div>
            </div>
          </div>

          {/* Right Column (4 cols): Care ID Token, Audit Stamp & Procedural Authorization */}
          <div className="col-span-4 flex flex-col gap-6">
            {/* Card 1: Care ID Patient Token Card (Figma 1:14597) */}
            <div className="bg-gradient-to-br from-[#28006d] via-[#1b004c] to-[#0d0028] text-white rounded-[14px] p-5 shadow-lg border border-purple-900/40 flex flex-col gap-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#a44cff] to-[#5af8fb] p-0.5 flex items-center justify-center">
                    <div className="w-full h-full bg-[#1b004c] rounded-[10px] flex items-center justify-center font-black text-white text-base">
                      RS
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-[16px] leading-tight text-white">{telemetry.patientName}</h3>
                    <p className="text-[11px] text-purple-200">DOB: {telemetry.patientDob} ({telemetry.patientAgeGender})</p>
                    <span className="inline-block mt-1 bg-white/10 text-purple-200 px-2 py-0.5 rounded text-[10px] font-mono">
                      {telemetry.patientCid}
                    </span>
                  </div>
                </div>

                <div className="bg-[#5af8fb]/20 border border-[#5af8fb]/40 px-2.5 py-1 rounded-full text-[10px] font-bold text-[#5af8fb] uppercase tracking-wider">
                  Care ID Verified
                </div>
              </div>

              {/* Patient Vitals Quick Peek */}
              <div className="bg-white/5 border border-white/10 rounded-lg p-3 grid grid-cols-3 gap-2 text-center text-xs">
                <div>
                  <span className="text-[10px] text-purple-200 uppercase block">Arterial BP</span>
                  <span className="font-bold text-white text-xs mt-0.5 block">{telemetry.bp}</span>
                </div>
                <div>
                  <span className="text-[10px] text-purple-200 uppercase block">Heart Rate</span>
                  <span className="font-bold text-emerald-300 text-xs mt-0.5 block">{telemetry.hr}</span>
                </div>
                <div>
                  <span className="text-[10px] text-purple-200 uppercase block">SpO2 Pulse</span>
                  <span className="font-bold text-[#5af8fb] text-xs mt-0.5 block">{telemetry.spo2}</span>
                </div>
              </div>

              {/* Barcode graphic & NFC Badge */}
              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-purple-200">
                <span className="font-mono">CID-8472-9901-X8</span>
                <span className="flex items-center gap-1 text-[10px] text-emerald-400">
                  <Radio className="w-3 h-3" /> NFC Wristband Locked
                </span>
              </div>
            </div>

            {/* Card 2: Cryptographic Audit Stamp */}
            <div className="bg-white border border-[#eff4ff] rounded-[12px] p-4 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#494552] flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-[#28006d]" /> Live EHR Audit Stamp
                </span>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                  100% Synced
                </span>
              </div>
              <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-lg font-mono text-[10px] text-slate-600 break-all leading-tight">
                SHA-256: 8f3b2049e218c50e41f71a93bb4c9a12e8731b992f80164e2d3
              </div>
              <div className="flex justify-between text-[11px] text-[#494552]">
                <span>Server Node: <strong className="text-[#0b1c30]">sinai-east-core-04</strong></span>
                <span>Latency: <strong className="text-emerald-700">12ms</strong></span>
              </div>
            </div>

            {/* Card 3: Procedural Authorization & Dispatch Card */}
            <div className="bg-white border border-purple-200 rounded-[12px] p-5 shadow-[0px_4px_12px_0px_rgba(40,0,109,0.08)] flex flex-col gap-4">
              <div>
                <h3 className="font-bold text-[15px] text-[#0b1c30] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#28006d]" />
                  Procedural Authorization
                </h3>
                <p className="text-[12px] text-[#494552] mt-1 leading-relaxed">
                  All 5 pre-conditions and WHO time-out criteria are ratified. Team is cleared to begin radial sheath cannulation and live fluoroscopy.
                </p>
              </div>

              {/* Primary Action Button */}
              <button
                type="button"
                onClick={handleStartEncounter}
                className="w-full py-3.5 px-4 bg-gradient-to-b from-[#a44cff] to-[#5b14b8] hover:opacity-95 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
              >
                <span>Start Encounter &amp; Open Workspace</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Secondary Buttons */}
              <div className="flex flex-col gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleBackToSafety}
                  className="w-full py-2 px-3 border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold rounded-lg text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Back to Safety Verification</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowHoldModal(true)}
                  className="w-full py-2 px-3 bg-[#ffdad6] hover:bg-[#ffb4ab] text-[#ba1a1a] font-bold rounded-lg text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Emergency Standby Hold</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Emergency Standby Hold Modal */}
      {showHoldModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-[16px] max-w-[500px] w-full p-6 shadow-2xl flex flex-col gap-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5 text-[#ba1a1a]">
                <AlertTriangle className="w-5 h-5 text-[#ba1a1a]" />
                <h3 className="font-bold text-base text-[#0f172a]">Declare Emergency Standby Hold</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowHoldModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600">
              Declaring a standby hold halts procedural timers and alerts all multidisciplinary personnel in Cath Lab Suite 3.
            </p>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="hold-reason" className="text-xs font-semibold text-slate-700">Reason for Standby Hold:</label>
              <textarea
                id="hold-reason"
                value={holdReason}
                onChange={(e) => setHoldReason(e.target.value)}
                placeholder="e.g. Hemodynamic instability, contrast allergy breakthrough, sterile drape breach..."
                className="w-full p-3 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-[#ba1a1a] focus:outline-none min-h-[90px]"
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
                onClick={() => {
                  setIsHoldActive(true);
                  setShowHoldModal(false);
                }}
                className="px-4 py-2 bg-[#ba1a1a] hover:bg-[#93000a] text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
              >
                Confirm Standby Hold
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
