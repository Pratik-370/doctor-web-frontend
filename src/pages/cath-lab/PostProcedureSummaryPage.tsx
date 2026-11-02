import React, { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import {
  Activity,
  ArrowRight,
  Award,
  Building,
  CheckCircle2,
  Clock,
  FileCheck,
  FileText,
  Heart,
  Lock,
  Pill,
  Save,
  ShieldCheck,
  Stethoscope,
  X,
} from 'lucide-react';
import { DEFAULT_ENCOUNTER_DATA, EncounterDocumentationState } from './types';

export const PostProcedureSummaryPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const offerId = id || 'TR-8921';

  const [state] = useState<EncounterDocumentationState>(DEFAULT_ENCOUNTER_DATA);
  const [attested, setAttested] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showAuditModal, setShowAuditModal] = useState(false);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleSignAndComplete = () => {
    if (!attested) {
      triggerToast('Please confirm the physician attestation checkbox prior to signing.');
      return;
    }
    triggerToast('Attestation ratified! Finalizing encounter and sealing health vault.');
    setTimeout(() => {
      navigate(`/treatment-offers/${offerId}/completed`, {
        state: { encounterData: { ...state, physicianAttested: true }, from: location.pathname },
      });
    }, 1200);
  };

  const { telemetry, vesselFindings, prescriptions, trBandWeaningSchedule } = state;

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] flex flex-col w-full pb-32">
      {/* Toast Notification */}
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

      {/* 1. TOP HEADER (Cath Lab Workstation Shell) */}
      <header className="backdrop-blur-[6px] bg-white/95 border-b border-slate-200/80 shadow-[0px_1px_12px_0px_rgba(11,28,48,0.04)] sticky top-0 z-30 w-full">
        <div className="h-[60px] px-[40px] flex items-center justify-between w-full">
          {/* Left: EHR Status & Cath Suite Station */}
          <div className="flex items-center gap-6">
            <div className="bg-[rgba(86,245,248,0.3)] flex items-center gap-2 px-3 py-1 rounded-full">
              <span className="w-2 h-2 rounded-full bg-[#00696b] animate-pulse" />
              <span className="font-semibold text-[#00696b] text-[11px] tracking-wide uppercase">Procedure Concluded</span>
            </div>
            <div className="flex items-center gap-2 text-[#494552] text-[12px] font-medium">
              <Building className="w-4 h-4 text-slate-500" />
              <span>Cath Lab Suite #03 • Attestation Pending</span>
            </div>
          </div>

          {/* Right: Actions, Notifications, & Doctor Profile */}
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2 bg-[#dce9ff] text-[#0b1c30] px-3 py-1.5 rounded-lg text-xs font-bold">
              <FileCheck className="w-3.5 h-3.5 text-[#28006d]" />
              <span>Final Report Generation</span>
            </div>

            <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
              <div className="w-8 h-8 rounded-full bg-[#28006d] text-white flex items-center justify-center font-bold text-xs ring-2 ring-[#dce9ff]">
                MC
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-[12px] font-bold text-[#0b1c30]">Dr. Michael Chang, MD</span>
                <span className="text-[10px] text-[#494552]">Attending Interventionalist</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sub-Header Context & Stepper Strip */}
        <div className="bg-[#eff4ff] px-[40px] py-1.5 flex items-center justify-between border-t border-slate-200/60 text-xs">
          <div className="flex items-center gap-2.5">
            <span className="bg-[#28006d] text-white text-[10px] font-bold px-2 py-0.5 rounded tracking-wide uppercase">
              POST-PROCEDURE SUMMARY
            </span>
            <span className="font-bold text-[#0b1c30] text-[12px]">{telemetry.patientName}</span>
            <span className="text-slate-500 font-medium">({telemetry.patientDob})</span>
            <span className="bg-[#dce9ff] text-[#0b1c30] font-semibold text-[10px] px-2 py-0.2 rounded-full">
              {telemetry.patientCid}
            </span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center gap-1.5 text-slate-600 font-medium">
              <Stethoscope className="w-3.5 h-3.5 text-[#28006d]" />
              {telemetry.cptCode} Diagnostic Coronary Catheterization Summary
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[11px]">
            <span className="text-slate-500 font-medium">Workflow:</span>
            <span className="bg-[#d3e4fe] text-[#0b1c30] px-2 py-0.5 rounded font-medium">Check-in</span>
            <span className="bg-[#d3e4fe] text-[#0b1c30] px-2 py-0.5 rounded font-medium">Time-Out</span>
            <span className="bg-[#d3e4fe] text-[#0b1c30] px-2 py-0.5 rounded font-medium">Start</span>
            <span className="bg-[#d3e4fe] text-[#0b1c30] px-2 py-0.5 rounded font-medium">Active Doc</span>
            <span className="bg-[rgba(0,105,107,0.15)] text-[#00696b] font-bold px-2.5 py-0.5 rounded ring-1 ring-[#00696b]/30">
              Post-Op (Pending Sign)
            </span>
            <span className="bg-[#d3e4fe] text-slate-500 px-2 py-0.5 rounded">Completed</span>
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
          <span className="text-[#28006d] font-bold">Post-Procedure Summary &amp; Attestation</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="bg-amber-100 text-amber-900 border border-amber-300 text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            PENDING PHYSICIAN ATTESTATION
          </span>
          <span className="text-[#cbc4d4]">|</span>
          <span className="font-mono text-[#494552] text-[12px] font-medium flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            10:45 AM EST
          </span>
        </div>
      </div>

      {/* 3. MAIN WORKSPACE CONTENT */}
      <main className="max-w-[1440px] mx-auto w-full px-[40px] pt-6 flex flex-col gap-6">
        {/* Top Protocol Banner / Hero Card (Figma 1:15586) */}
        <div className="bg-gradient-to-r from-[#28006d] via-[#3f1d8b] to-[#28006d] p-6 rounded-[12px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] text-white relative overflow-hidden flex flex-col gap-4">
          <div className="flex items-start justify-between z-10">
            <div className="flex flex-col gap-1.5 max-w-[760px]">
              <div className="flex items-center gap-2">
                <span className="bg-[#ffdad6] text-[#ba1a1a] text-[10px] font-black px-2.5 py-0.5 rounded-full tracking-wider uppercase">
                  PENDING PHYSICIAN SIGNATURE
                </span>
                <span className="bg-white/10 text-purple-200 text-xs px-2 py-0.5 rounded font-mono">
                  {telemetry.cptCode}
                </span>
              </div>
              <h1 className="text-[24px] font-black tracking-tight leading-tight">
                Cath Lab Procedure Summary &amp; Physician Attestation
              </h1>
              <p className="text-[13px] text-purple-100/90 leading-relaxed">
                Review verified angiographic findings, procedural hemodynamics, and post-care orders prior to electronic signature and Care ID health vault dispatch.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-xl border border-white/20 flex flex-col items-end text-right">
              <span className="text-[10px] uppercase tracking-wider text-purple-200 font-semibold">
                Procedure Timing
              </span>
              <span className="text-sm font-bold text-white mt-0.5">
                09:15 - 09:58 EST (43 min)
              </span>
              <span className="text-[11px] text-emerald-300 font-medium">Mount Sinai Cath Suite #03</span>
            </div>
          </div>
        </div>

        {/* 2-Column Split Layout */}
        <div className="grid grid-cols-12 gap-6 items-start">
          {/* ======================================================== */}
          {/* LEFT COLUMN (8 cols): Metrics, Findings, Diagnoses & Rx  */}
          {/* ======================================================== */}
          <div className="col-span-8 flex flex-col gap-6">
            {/* 1. Procedural Metrics & Hemodynamics Strip */}
            <div className="bg-white border border-[#eff4ff] rounded-[12px] p-5 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-[#eff4ff] pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#dce9ff] text-[#28006d] flex items-center justify-center shrink-0">
                    <Activity className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-[14px] font-bold text-[#0b1c30]">
                      1. Procedural Metrics &amp; Hemodynamics
                    </h2>
                    <p className="text-[11px] text-[#494552]">
                      Radiation dose, contrast utilization, access site and closure verification
                    </p>
                  </div>
                </div>
                <span className="bg-[#e7f7e9] text-[#137333] font-bold text-[10px] px-2.5 py-0.5 rounded-full">
                  Hemostasis Complete
                </span>
              </div>

              {/* 5-Metrics Grid */}
              <div className="grid grid-cols-5 gap-3 text-center text-xs">
                <div className="p-3 bg-[#f8f9ff] border border-slate-200/70 rounded-lg">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Access Site</span>
                  <span className="font-bold text-[#0b1c30] text-xs mt-1 block">Right Radial</span>
                  <span className="text-[10px] text-slate-400">6F Slender</span>
                </div>
                <div className="p-3 bg-[#f8f9ff] border border-slate-200/70 rounded-lg">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Fluoro Time</span>
                  <span className="font-bold font-mono text-[#0b1c30] text-sm mt-1 block">
                    {telemetry.fluoroTimeMinutes.toFixed(1)} <span className="text-[10px] font-normal text-slate-500">min</span>
                  </span>
                  <span className="text-[10px] text-emerald-600 font-semibold">Low exposure</span>
                </div>
                <div className="p-3 bg-[#f8f9ff] border border-slate-200/70 rounded-lg">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Total DAP</span>
                  <span className="font-bold font-mono text-[#0b1c30] text-sm mt-1 block">
                    {telemetry.radiationDap.toFixed(1)} <span className="text-[10px] font-normal text-slate-500">Gy·cm²</span>
                  </span>
                  <span className="text-[10px] text-slate-400">Safe threshold</span>
                </div>
                <div className="p-3 bg-[#f8f9ff] border border-slate-200/70 rounded-lg">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Isovue-370</span>
                  <span className="font-bold font-mono text-[#0b1c30] text-sm mt-1 block">
                    {telemetry.contrastInjectedMl} <span className="text-[10px] font-normal text-slate-500">mL</span>
                  </span>
                  <span className="text-[10px] text-slate-400">Renal-sparing</span>
                </div>
                <div className="p-3 bg-[#f8f9ff] border border-slate-200/70 rounded-lg">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Aortic Root BP</span>
                  <span className="font-bold font-mono text-[#0b1c30] text-sm mt-1 block">
                    {telemetry.aorticRootBp}
                  </span>
                  <span className="text-[10px] text-emerald-600 font-semibold">LVEDP: 14 mmHg</span>
                </div>
              </div>

              {/* Hemostasis Callout */}
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center justify-between text-xs text-emerald-900">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    <strong>TR Band Applied:</strong> 13 mL air instilled. Patent hemostasis verified via Barbeau test (Class A). Palpable radial pulse 2+. No hematoma.
                  </span>
                </div>
                <span className="font-mono text-[10px] text-emerald-700 font-bold">10:45 AM INSTILLED</span>
              </div>
            </div>

            {/* 2. Verified Angiographic Findings Table */}
            <div className="bg-white border border-[#eff4ff] rounded-[12px] p-5 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-[#eff4ff] pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#e8ddff] text-[#28006d] flex items-center justify-center shrink-0">
                    <Heart className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-[14px] font-bold text-[#0b1c30]">
                      2. Verified Coronary Angiographic Findings
                    </h2>
                    <p className="text-[11px] text-[#494552]">
                      Definitive diagnostic findings from selective coronary injections
                    </p>
                  </div>
                </div>
                <span className="bg-[#dce9ff] text-[#0b1c30] font-bold text-[10px] px-2 py-0.5 rounded">
                  QCA Ratified
                </span>
              </div>

              {/* Vessels List */}
              <div className="space-y-3">
                {vesselFindings.map((finding) => (
                  <div
                    key={finding.vessel}
                    className="p-3 rounded-lg border border-slate-200/70 bg-[#f8f9ff] flex items-start justify-between text-xs"
                  >
                    <div className="flex items-start gap-3">
                      <span className="w-7 h-7 rounded bg-[#28006d] text-white font-mono font-bold text-xs flex items-center justify-center shrink-0">
                        {finding.vessel}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <strong className="text-[13px] text-[#0b1c30]">{finding.fullName}</strong>
                          <span className="text-[10px] text-slate-500 font-mono">({finding.timiFlow})</span>
                        </div>
                        <p className="text-[#494552] text-[12px] mt-0.5">{finding.description}</p>
                      </div>
                    </div>

                    <div className="flex flex-col items-end shrink-0 pl-4">
                      <span
                        className={`font-bold text-xs px-2 py-0.5 rounded ${
                          finding.stenosisPercent > 30
                            ? 'bg-amber-100 text-amber-900 border border-amber-200'
                            : 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                        }`}
                      >
                        {finding.stenosisPercent}% Stenosis
                      </span>
                      <span className="text-[10px] text-slate-400 mt-0.5">
                        {finding.stenosisPercent === 0 ? 'Normal' : 'Mild CAD'}
                      </span>
                    </div>
                  </div>
                ))}

                {/* Left Ventriculography Summary */}
                <div className="p-3 bg-[#f0f4ff] border border-blue-200 rounded-lg flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-[#0b1c30] block">
                      Left Ventricular Function (RAO 30° Ventriculogram):
                    </span>
                    <span className="text-slate-600 text-[11px]">
                      Normal chamber size, no regional wall motion abnormality. Preserved systolic ejection fraction (LVEF {state.lvefPercent}%).
                    </span>
                  </div>
                  <span className="bg-blue-100 text-blue-900 font-bold px-2 py-1 rounded text-xs shrink-0">
                    LVEF: {state.lvefPercent}%
                  </span>
                </div>
              </div>
            </div>

            {/* 3. Final Diagnoses & Pharmacological Plan */}
            <div className="bg-white border border-[#eff4ff] rounded-[12px] p-5 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-[#eff4ff] pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[rgba(0,105,107,0.1)] text-[#00696b] flex items-center justify-center shrink-0">
                    <Pill className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-[14px] font-bold text-[#0b1c30]">
                      3. Final Diagnoses &amp; Pharmacological Plan
                    </h2>
                    <p className="text-[11px] text-[#494552]">
                      Guideline-directed medical therapy (GDMT) and electronic prescriptions
                    </p>
                  </div>
                </div>
                <span className="bg-[#e7f7e9] text-[#137333] font-bold text-[10px] px-2 py-0.5 rounded-full">
                  No Stent Required
                </span>
              </div>

              {/* Diagnoses List */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-[#f8f9ff] border border-slate-200/60 rounded-lg">
                  <span className="font-mono font-bold text-[#28006d]">Primary: ICD-10 {state.primaryDiagnosisIcd}</span>
                  <p className="text-[#0b1c30] font-medium text-[11px] mt-1">{state.primaryDiagnosisDesc}</p>
                </div>
                <div className="p-3 bg-[#f8f9ff] border border-slate-200/60 rounded-lg">
                  <span className="font-mono font-bold text-slate-700">Secondary: ICD-10 {state.secondaryDiagnosisIcd}</span>
                  <p className="text-slate-600 text-[11px] mt-1">{state.secondaryDiagnosisDesc}</p>
                </div>
              </div>

              {/* Prescriptions List */}
              <div className="space-y-2 text-xs">
                <span className="font-bold text-slate-700 block text-[11px] uppercase tracking-wider">
                  Outpatient Prescriptions Routed to Care ID Vault:
                </span>
                <div className="grid grid-cols-2 gap-3">
                  {prescriptions.map((rx) => (
                    <div key={rx.medication} className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                      <div className="flex items-center justify-between">
                        <strong className="text-[#0b1c30] text-xs">{rx.medication}</strong>
                        <span className="text-[10px] text-slate-400 font-mono">{rx.dosage}</span>
                      </div>
                      <p className="text-slate-600 text-[11px] mt-1">{rx.sig}</p>
                      <span className="text-[10px] text-purple-700 font-semibold block mt-1">
                        Dispense: {rx.quantity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* RIGHT COLUMN (4 cols): Post-Care, Attestation & Action   */}
          {/* ======================================================== */}
          <div className="col-span-4 flex flex-col gap-6">
            {/* Card 1: 4. Post-Care & Disposition Protocol */}
            <div className="bg-white border border-[#eff4ff] rounded-[12px] p-5 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] flex flex-col gap-4">
              <h3 className="font-bold text-[14px] text-[#0b1c30] flex items-center gap-2 border-b border-[#eff4ff] pb-3">
                <Clock className="w-4 h-4 text-[#28006d]" />
                4. Post-Care &amp; Disposition
              </h3>

              <div className="space-y-3 text-xs">
                {/* TR Band Weaning Schedule */}
                <div>
                  <span className="font-bold text-slate-700 block mb-2">TR Band Weaning Protocol:</span>
                  <div className="space-y-2">
                    {trBandWeaningSchedule.map((step, idx) => (
                      <div
                        key={idx}
                        className={`p-2.5 rounded-lg border text-[11px] flex items-start justify-between ${
                          step.completed
                            ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                            : 'bg-slate-50 border-slate-200 text-slate-700'
                        }`}
                      >
                        <div>
                          <span className="font-bold block">{step.time}</span>
                          <span className="text-[10px] leading-tight block mt-0.5">{step.action}</span>
                        </div>
                        <span className="font-mono font-bold text-[10px] shrink-0 pl-2">
                          {step.volumeRemaining}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Disposition details */}
                <div className="p-3 bg-[#f8f9ff] border border-slate-200/70 rounded-lg space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Recovery Bay:</span>
                    <strong className="text-[#0b1c30]">{state.recoveryBay}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Monitored Bedrest:</span>
                    <strong className="text-[#0b1c30]">{state.bedrestHours} Hours</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Discharge Escort:</span>
                    <strong className="text-[#0b1c30]">{state.dischargeEscort}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Cardiology Follow-Up:</span>
                    <strong className="text-purple-700">{state.followUpWeeks} Weeks</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Physician Attestation & Legal Electronic Signature */}
            <div className="bg-white border-2 border-purple-300 rounded-[12px] p-5 shadow-[0px_4px_16px_0px_rgba(40,0,109,0.1)] flex flex-col gap-4">
              <div>
                <span className="bg-[#28006d] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                  LEGAL PHYSICIAN ATTESTATION
                </span>
                <h3 className="font-bold text-[15px] text-[#0b1c30] mt-1.5 flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#28006d]" />
                  Attending Operator Attestation
                </h3>
              </div>

              {/* Checklist */}
              <div className="space-y-2 text-xs bg-slate-50 p-3 rounded-lg border border-slate-200">
                <label className="flex items-center gap-2 text-slate-700 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Structured Cath Note Completed</span>
                </label>
                <label className="flex items-center gap-2 text-slate-700 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Informed Consent &amp; Time-Out On File</span>
                </label>
                <label className="flex items-center gap-2 text-slate-700 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>DICOM Cines Synchronized to PACS</span>
                </label>
              </div>

              {/* Legal text */}
              <div className="p-3 bg-purple-50/60 border border-purple-200 rounded-lg text-[11px] text-[#28006d] leading-relaxed">
                &ldquo;I, <strong>Dr. Michael Chang, MD</strong>, personally performed and supervised this diagnostic catheterization procedure in its entirety. The findings, measurements, and post-procedure orders documented herein accurately reflect the clinical encounter.&rdquo;
              </div>

              {/* Interactive Attestation Checkbox */}
              <div className="flex items-start gap-2.5 pt-1">
                <input
                  type="checkbox"
                  id="physician-attestation"
                  checked={attested}
                  onChange={(e) => setAttested(e.target.checked)}
                  className="mt-0.5 w-4 h-4 text-[#28006d] rounded border-slate-300 focus:ring-[#28006d] cursor-pointer"
                />
                <label htmlFor="physician-attestation" className="text-xs font-bold text-[#0b1c30] cursor-pointer">
                  I ratify, sign, and seal this clinical encounter report with my cryptographic operator credentials.
                </label>
              </div>

              {/* Primary CTA */}
              <button
                type="button"
                onClick={handleSignAndComplete}
                className="w-full py-3.5 px-4 bg-gradient-to-b from-[#a44cff] to-[#5b14b8] hover:opacity-95 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-xs cursor-pointer"
              >
                <Lock className="w-4 h-4" />
                <span>Sign &amp; Complete Encounter</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Secondary Buttons */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                <button
                  type="button"
                  onClick={() => triggerToast('Draft attestation saved.')}
                  className="text-slate-600 hover:text-slate-900 font-medium flex items-center gap-1 cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Draft &amp; Exit</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowAuditModal(true)}
                  className="text-[#28006d] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Audit Log (9 entries)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Audit Log Modal */}
      {showAuditModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-[16px] max-w-[560px] w-full p-6 shadow-2xl flex flex-col gap-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-[#28006d]">
                <FileText className="w-5 h-5 text-[#28006d]" />
                <h3 className="font-bold text-base text-[#0f172a]">Encounter Cryptographic Audit Trail</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowAuditModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600">
              Immutable ledger trail tracking every stage of patient encounter #ENC-2026-88419:
            </p>

            <div className="space-y-2 text-xs max-h-[300px] overflow-y-auto pr-1">
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg flex justify-between">
                <div>
                  <span className="font-bold text-[#0b1c30] block">1. Day-of-Procedure Check-in</span>
                  <span className="text-slate-400 text-[10px]">Robert Sterling biometric NFC scan</span>
                </div>
                <span className="font-mono text-[10px] text-slate-500">08:30 AM EST</span>
              </div>
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg flex justify-between">
                <div>
                  <span className="font-bold text-[#0b1c30] block">2. Surgical Safety Time-Out</span>
                  <span className="text-slate-400 text-[10px]">All 6 checkpoints ratified by team</span>
                </div>
                <span className="font-mono text-[10px] text-slate-500">09:12 AM EST</span>
              </div>
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg flex justify-between">
                <div>
                  <span className="font-bold text-[#0b1c30] block">3. Arterial Sheath Cannulation</span>
                  <span className="text-slate-400 text-[10px]">Right radial artery accessed</span>
                </div>
                <span className="font-mono text-[10px] text-slate-500">09:18 AM EST</span>
              </div>
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg flex justify-between">
                <div>
                  <span className="font-bold text-[#0b1c30] block">4. Coronary Cines &amp; QCA Recorded</span>
                  <span className="text-slate-400 text-[10px]">LM, LAD, LCx, RCA selective injections</span>
                </div>
                <span className="font-mono text-[10px] text-slate-500">09:35 AM EST</span>
              </div>
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg flex justify-between">
                <div>
                  <span className="font-bold text-[#0b1c30] block">5. TR Band Hemostasis Applied</span>
                  <span className="text-slate-400 text-[10px]">13 mL air instilled, patent pulse verified</span>
                </div>
                <span className="font-mono text-[10px] text-slate-500">09:58 AM EST</span>
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowAuditModal(false)}
                className="px-4 py-2 bg-[#28006d] text-white rounded-lg text-xs font-bold hover:bg-[#3f1d8b] cursor-pointer"
              >
                Close Audit Trail
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
