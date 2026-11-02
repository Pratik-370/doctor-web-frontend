import React, { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import {
  Activity,
  ArrowRight,
  Building,
  CheckCircle2,
  FileCheck,
  Heart,
  Lock,
  Pause,
  Play,
  Radio,
  Save,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Video,
  X,
} from 'lucide-react';
import { DEFAULT_ENCOUNTER_DATA, EncounterDocumentationState } from './types';

export const ActiveProcedureDocumentationPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const offerId = id || 'TR-8921';

  const [state] = useState<EncounterDocumentationState>(DEFAULT_ENCOUNTER_DATA);
  const [isPlayingCine, setIsPlayingCine] = useState(true);
  const [activeTab, setActiveTab] = useState<'findings' | 'hemodynamics' | 'closure'>('findings');
  const [customNote, setCustomNote] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleCompleteProcedure = () => {
    triggerToast('Procedure documentation ratified! Advancing to post-op summary.');
    navigate(`/treatment-offers/${offerId}/post-op`, {
      state: { encounterData: state, from: location.pathname },
    });
  };

  const { telemetry, vesselFindings } = state;

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
              <span className="font-semibold text-[#00696b] text-[11px] tracking-wide uppercase">Live Intra-Op Recording</span>
            </div>
            <div className="flex items-center gap-2 text-[#494552] text-[12px] font-medium">
              <Building className="w-4 h-4 text-slate-500" />
              <span>Cath Lab Suite #03 • Fluoroscopy Unit #1</span>
            </div>
          </div>

          {/* Right: Actions, Notifications, & Doctor Profile */}
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2 bg-[#e8ddff] text-[#28006d] px-3 py-1.5 rounded-lg text-xs font-bold">
              <Activity className="w-3.5 h-3.5" />
              <span>Encounter Active • 09:32 AM</span>
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
              PROCEDURE IN PROGRESS
            </span>
            <span className="font-bold text-[#0b1c30] text-[12px]">{telemetry.patientName}</span>
            <span className="text-slate-500 font-medium">({telemetry.patientDob})</span>
            <span className="bg-[#dce9ff] text-[#0b1c30] font-semibold text-[10px] px-2 py-0.2 rounded-full">
              {telemetry.patientCid}
            </span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center gap-1.5 text-slate-600 font-medium">
              <Stethoscope className="w-3.5 h-3.5 text-[#28006d]" />
              {telemetry.cptCode} Diagnostic Left Heart Cath &amp; Coronary Angiogram
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[11px]">
            <span className="text-slate-500 font-medium">Workflow:</span>
            <span className="bg-[#d3e4fe] text-[#0b1c30] px-2 py-0.5 rounded font-medium">Check-in</span>
            <span className="bg-[#d3e4fe] text-[#0b1c30] px-2 py-0.5 rounded font-medium">Time-Out</span>
            <span className="bg-[#d3e4fe] text-[#0b1c30] px-2 py-0.5 rounded font-medium">Induction</span>
            <span className="bg-[rgba(0,105,107,0.15)] text-[#00696b] font-bold px-2.5 py-0.5 rounded ring-1 ring-[#00696b]/30">
              Active Doc (Recording)
            </span>
            <span className="bg-[#d3e4fe] text-slate-500 px-2 py-0.5 rounded">Post-Op</span>
          </div>
        </div>
      </header>

      {/* 2. TOP LIVE VITALS & TELEMETRY RIBBON (Figma 1:15031) */}
      <div className="bg-[#0b1c30] text-white px-[40px] py-3 flex items-center justify-between border-b border-purple-900/40 shadow-inner">
        {/* Patient Pill */}
        <div className="flex items-center gap-3 pr-6 border-r border-slate-700/80">
          <div className="w-8 h-8 rounded-full bg-[#28006d] text-white flex items-center justify-center font-bold text-xs ring-1 ring-purple-400/40">
            RS
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-white">{telemetry.patientName}</span>
              <span className="text-xs text-slate-400">45M • O Pos+</span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px]">
              <span className="bg-[#ba1a1a] text-white text-[9px] font-black px-1.5 py-0.2 rounded uppercase tracking-wider">
                Penicillin Allergy
              </span>
              <span className="text-slate-400 text-[10px]">Vancomycin Pre-med Active</span>
            </div>
          </div>
        </div>

        {/* Live Vitals Ribbon Cells */}
        <div className="flex items-center gap-8 text-xs">
          {/* Arterial BP */}
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-semibold text-slate-400 flex items-center gap-1">
              <Activity className="w-3 h-3 text-[#5af8fb]" /> Arterial BP
            </span>
            <span className="font-mono font-bold text-base text-white mt-0.5">
              124/76 <span className="text-[10px] text-slate-400 font-normal">mmHg</span>
            </span>
          </div>

          {/* Heart Rate */}
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-semibold text-slate-400 flex items-center gap-1">
              <Heart className="w-3 h-3 text-rose-400 animate-pulse" /> Heart Rate
            </span>
            <span className="font-mono font-bold text-base text-emerald-400 mt-0.5">
              72 <span className="text-[10px] text-slate-400 font-normal">bpm sinus</span>
            </span>
          </div>

          {/* SpO2 Pulse */}
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-semibold text-slate-400 flex items-center gap-1">
              <Radio className="w-3 h-3 text-[#5af8fb]" /> SpO2 Pulse
            </span>
            <span className="font-mono font-bold text-base text-[#5af8fb] mt-0.5">
              99% <span className="text-[10px] text-slate-400 font-normal">RA</span>
            </span>
          </div>

          {/* Target ACT */}
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-semibold text-slate-400">Target ACT</span>
            <span className="font-mono font-bold text-base text-purple-300 mt-0.5">
              {telemetry.actSeconds} <span className="text-[10px] text-slate-400 font-normal">sec</span>
            </span>
          </div>

          {/* Fluoro Time */}
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-semibold text-slate-400">Fluoro Time</span>
            <span className="font-mono font-bold text-base text-amber-300 mt-0.5">
              {telemetry.fluoroTimeMinutes.toFixed(1)} <span className="text-[10px] text-slate-400 font-normal">min</span>
            </span>
          </div>

          {/* Total DAP */}
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-semibold text-slate-400">Total DAP</span>
            <span className="font-mono font-bold text-base text-white mt-0.5">
              {telemetry.radiationDap.toFixed(1)} <span className="text-[10px] text-slate-400 font-normal">Gy·cm²</span>
            </span>
          </div>
        </div>

        {/* Live Indicator */}
        <div className="flex items-center gap-2 bg-emerald-950/80 border border-emerald-500/30 px-3 py-1 rounded-full text-emerald-400 text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>Cath Lab Suite 3 Online</span>
        </div>
      </div>

      {/* 3. MAIN WORKSPACE CONTENT: 3-COLUMN WORKSTATION */}
      <main className="max-w-[1440px] mx-auto w-full px-[40px] pt-6 grid grid-cols-12 gap-6 items-start">
        {/* ======================================================== */}
        {/* LEFT COLUMN (4 cols): Indication, Baseline & Cine Feed    */}
        {/* ======================================================== */}
        <div className="col-span-4 flex flex-col gap-6">
          {/* Card 1: Procedure Indication & Baseline Labs */}
          <div className="bg-white border border-[#eff4ff] rounded-[12px] p-5 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-[#eff4ff] pb-3">
              <h3 className="font-bold text-[14px] text-[#0b1c30] flex items-center gap-2">
                <Stethoscope className="w-4 h-4 text-[#28006d]" />
                Indication &amp; Clinical Baseline
              </h3>
              <span className="bg-[#dce9ff] text-[#0b1c30] text-[10px] font-bold px-2 py-0.5 rounded">
                Elective
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-3 bg-[#f8f9ff] rounded-lg border border-slate-200/60">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Stress Test Modality</span>
                <p className="font-medium text-[#0b1c30] mt-0.5">
                  Bruce Treadmill protocol: 1.8mm horizontal ST-depression in leads V4–V6 at 8.4 METs.
                </p>
                <span className="text-[11px] text-purple-700 font-semibold block mt-1">
                  CCS Class II Angina Pectoris
                </span>
              </div>

              {/* Lab Grid */}
              <div className="grid grid-cols-3 gap-2 pt-1">
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-center">
                  <span className="text-[9px] uppercase font-bold text-slate-500 block">Creatinine</span>
                  <span className="font-bold text-xs text-[#0b1c30] mt-0.5 block">0.95 mg/dL</span>
                  <span className="text-[9px] text-emerald-600 font-semibold">eGFR &gt;60</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-center">
                  <span className="text-[9px] uppercase font-bold text-slate-500 block">INR Coag</span>
                  <span className="font-bold text-xs text-[#0b1c30] mt-0.5 block">1.1</span>
                  <span className="text-[9px] text-emerald-600 font-semibold">Therapeutic</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-center">
                  <span className="text-[9px] uppercase font-bold text-slate-500 block">Platelets</span>
                  <span className="font-bold text-xs text-[#0b1c30] mt-0.5 block">240,000</span>
                  <span className="text-[9px] text-slate-400 font-medium">Adequate</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Live Cine Loop Feed & Fluoroscopy Viewer */}
          <div className="bg-white border border-[#eff4ff] rounded-[12px] p-5 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] flex flex-col gap-3">
            <div className="flex items-center justify-between border-b border-[#eff4ff] pb-3">
              <div className="flex items-center gap-2">
                <Video className="w-4 h-4 text-[#28006d]" />
                <h3 className="font-bold text-[14px] text-[#0b1c30]">Live Angiographic Cine</h3>
              </div>
              <span className="bg-[#ba1a1a] text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                REC
              </span>
            </div>

            {/* Cine Loop Screen Simulation */}
            <div className="relative aspect-4/3 w-full bg-slate-950 rounded-xl overflow-hidden border border-slate-800 shadow-inner flex flex-col justify-between p-3 text-white">
              {/* Top Angle & Projection Metadata */}
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-300 z-10">
                <span className="bg-black/60 px-2 py-0.5 rounded border border-white/10">
                  RAO 30° / CAUD 25° (Spider)
                </span>
                <span className="bg-black/60 px-2 py-0.5 rounded border border-white/10 text-emerald-400">
                  15 fps • CINE #04
                </span>
              </div>

              {/* Simulated Fluoroscopic X-Ray Contrast Graphic */}
              <div className="absolute inset-0 flex items-center justify-center opacity-85 pointer-events-none">
                <svg className="w-full h-full max-w-[280px]" viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Catheter Tip */}
                  <path d="M 10 30 Q 70 30 95 65" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
                  <circle cx="95" cy="65" r="3" fill="#cbd5e1" />
                  {/* Left Main */}
                  <path d="M 95 65 Q 110 80 120 90" stroke="#f1f5f9" strokeWidth="5" strokeLinecap="round" />
                  {/* LAD Branch with mid-vessel narrowing */}
                  <path d="M 120 90 Q 140 105 155 140" stroke="#f1f5f9" strokeWidth="4" strokeLinecap="round" />
                  {/* 40% Stenosis notch in mid-LAD */}
                  <circle cx="138" cy="104" r="5" fill="#f43f5e" fillOpacity="0.4" stroke="#f43f5e" strokeWidth="1.5" />
                  {/* Diagonal 1 Branch */}
                  <path d="M 125 95 Q 155 90 180 100" stroke="#e2e8f0" strokeWidth="2.5" strokeLinecap="round" />
                  {/* LCx Branch */}
                  <path d="M 120 90 Q 105 115 110 145" stroke="#cbd5e1" strokeWidth="3.5" strokeLinecap="round" />
                  {/* Marginal OM1 */}
                  <path d="M 112 110 Q 95 125 90 145" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>

              {/* Bottom Cine Controls & Contrast Bolus Info */}
              <div className="flex items-center justify-between text-xs z-10 pt-2 border-t border-white/10 bg-black/40 backdrop-blur-xs px-2 py-1 rounded">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsPlayingCine(!isPlayingCine)}
                    className="p-1 rounded bg-white/20 hover:bg-white/30 text-white cursor-pointer"
                  >
                    {isPlayingCine ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  </button>
                  <span className="font-mono text-[11px] text-slate-300">00:14 / 00:20</span>
                </div>
                <span className="text-[10px] text-purple-200 font-semibold">
                  Isovue-370: 8 mL bolus injected
                </span>
              </div>
            </div>

            {/* Contrast Cumulative Status */}
            <div className="flex items-center justify-between text-xs p-2.5 bg-[#f8f9ff] rounded-lg border border-slate-200/60">
              <span className="text-[#494552]">Cumulative Contrast Volume:</span>
              <span className="font-bold text-[#0b1c30]">
                {telemetry.contrastInjectedMl} mL / 180 mL limit
              </span>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* MIDDLE COLUMN (5 cols): Findings, Hemodynamics & Closure */}
        {/* ======================================================== */}
        <div className="col-span-5 flex flex-col gap-6">
          {/* Sub-Navigation Tabs */}
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
            <button
              type="button"
              onClick={() => setActiveTab('findings')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                activeTab === 'findings'
                  ? 'bg-[#28006d] text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              1. Coronary Findings (4 Vessels)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('hemodynamics')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                activeTab === 'hemodynamics'
                  ? 'bg-[#28006d] text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              2. Access &amp; Hemodynamics
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('closure')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                activeTab === 'closure'
                  ? 'bg-[#28006d] text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              3. TR Band Hemostasis
            </button>
          </div>

          {/* TAB 1: CORONARY ANGIOGRAPHIC FINDINGS */}
          {activeTab === 'findings' && (
            <div className="bg-white border border-[#eff4ff] rounded-[12px] p-5 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-[#eff4ff] pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#e8ddff] text-[#28006d] flex items-center justify-center shrink-0">
                    <Heart className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-[14px] font-bold text-[#0b1c30]">
                      Selective Coronary Angiogram Findings
                    </h2>
                    <p className="text-[11px] text-[#494552]">
                      Calibrated quantitative coronary analysis (QCA)
                    </p>
                  </div>
                </div>
                <span className="bg-[#e7f7e9] text-[#137333] font-bold text-[10px] px-2 py-0.5 rounded-full">
                  All 4 Vessels Imaged
                </span>
              </div>

              {/* Vessel Findings List */}
              <div className="flex flex-col gap-3">
                {vesselFindings.map((finding) => (
                  <div
                    key={finding.vessel}
                    className={`p-3.5 rounded-lg border transition-all ${
                      finding.vessel === 'LAD'
                        ? 'bg-[#fffbfa] border-amber-300 shadow-xs'
                        : 'bg-[#f8f9ff] border-slate-200/60'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-md bg-[#28006d] text-white font-mono font-bold text-xs flex items-center justify-center">
                          {finding.vessel}
                        </span>
                        <div>
                          <span className="font-bold text-[13px] text-[#0b1c30]">
                            {finding.fullName}
                          </span>
                          <span className="text-[10px] text-slate-400 block">{finding.timiFlow} flow</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs font-bold px-2 py-0.5 rounded ${
                            finding.stenosisPercent > 30
                              ? 'bg-amber-100 text-amber-900 border border-amber-200'
                              : 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                          }`}
                        >
                          {finding.stenosisPercent}% Stenosis
                        </span>
                      </div>
                    </div>
                    <p className="text-[12px] text-[#494552] mt-2 leading-relaxed">
                      {finding.description}
                    </p>
                  </div>
                ))}

                {/* Left Ventriculography Box */}
                <div className="p-3.5 rounded-lg bg-[#f0f4ff] border border-blue-200 flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[13px] text-[#0b1c30]">
                        Left Ventriculography (RAO 30°)
                      </span>
                      <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded">
                        LVEF: {state.lvefPercent}%
                      </span>
                    </div>
                    <p className="text-[12px] text-[#494552] mt-1">
                      {state.lvefDescription}
                    </p>
                  </div>
                  <span className="text-emerald-700 font-bold text-xs">PRESERVED</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ACCESS & HEMODYNAMICS */}
          {activeTab === 'hemodynamics' && (
            <div className="bg-white border border-[#eff4ff] rounded-[12px] p-5 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] flex flex-col gap-4">
              <h2 className="text-[14px] font-bold text-[#0b1c30] flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#28006d]" />
                Arterial Sheath &amp; Chamber Hemodynamics
              </h2>

              <div className="p-3.5 bg-[#f8f9ff] rounded-lg border border-slate-200/70 text-xs flex flex-col gap-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Cannulation Site:</span>
                  <span className="font-bold text-[#0b1c30]">Right Radial Artery (6F Slender Sheath)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Radial Antispasm Cocktail:</span>
                  <span className="font-medium text-[#0b1c30]">Verapamil 2.5mg + NTG 200mcg + Heparin 5000U</span>
                </div>
              </div>

              {/* Pressure Measurements */}
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Aortic Root BP</span>
                  <span className="text-base font-bold font-mono text-[#0b1c30] mt-0.5 block">122/74</span>
                  <span className="text-[10px] text-emerald-600 font-semibold">Mean: 90 mmHg</span>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">LVEDP</span>
                  <span className="text-base font-bold font-mono text-[#0b1c30] mt-0.5 block">14 mmHg</span>
                  <span className="text-[10px] text-emerald-600 font-semibold">Normal (&lt;15)</span>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Radial SBP</span>
                  <span className="text-base font-bold font-mono text-[#0b1c30] mt-0.5 block">124 mmHg</span>
                  <span className="text-[10px] text-slate-500 font-medium">Patent Transducer</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: TR BAND HEMOSTASIS */}
          {activeTab === 'closure' && (
            <div className="bg-white border border-[#eff4ff] rounded-[12px] p-5 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] flex flex-col gap-4">
              <h2 className="text-[14px] font-bold text-[#0b1c30] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Radial Sheath Removal &amp; TR Band Protocol
              </h2>

              <div className="p-3.5 bg-[#f8f9ff] rounded-lg border border-slate-200/70 text-xs flex flex-col gap-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Hemostatic Device:</span>
                  <span className="font-bold text-[#0b1c30]">{state.hemostasisMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Air Volume Instilled:</span>
                  <span className="font-bold text-purple-700">{state.trBandAirMl} mL Air</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Barbeau Test After Band:</span>
                  <span className="font-bold text-emerald-700">Class A (Patent Hemostasis Verified)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Distal Radial Pulse:</span>
                  <span className="font-bold text-[#0b1c30]">2+ Palpable • Warm • No Paresthesia</span>
                </div>
              </div>

              {/* Deflation Weaning Schedule Preview */}
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs">
                <span className="font-bold text-slate-700 block mb-2">Weaning Schedule:</span>
                <ul className="space-y-1.5 text-slate-600">
                  <li className="flex justify-between">
                    <span>10:45 AM (T+60 min):</span>
                    <strong className="text-[#0b1c30]">Remove 3 mL (10 mL remaining)</strong>
                  </li>
                  <li className="flex justify-between">
                    <span>11:00 AM (T+75 min):</span>
                    <strong className="text-[#0b1c30]">Remove 3 mL (7 mL remaining)</strong>
                  </li>
                  <li className="flex justify-between">
                    <span>11:15 AM (T+90 min):</span>
                    <strong className="text-[#0b1c30]">Remove 4 mL (3 mL remaining)</strong>
                  </li>
                  <li className="flex justify-between">
                    <span>11:30 AM (T+105 min):</span>
                    <strong className="text-emerald-700">Complete Band Removal</strong>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* Doctor Intra-Op Observation Box */}
          <div className="bg-white border border-[#eff4ff] rounded-[12px] p-4 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] flex flex-col gap-2">
            <label htmlFor="intra-op-note" className="text-xs font-bold text-[#0b1c30] flex items-center justify-between">
              <span>Intra-Operative Physician Note:</span>
              <span className="text-[10px] text-slate-400 font-normal">Optional live annotations</span>
            </label>
            <textarea
              id="intra-op-note"
              value={customNote}
              onChange={(e) => setCustomNote(e.target.value)}
              placeholder="e.g. Patient tolerated radial cannulation well. No vasospasm encountered. Hemostasis achieved without complication..."
              className="w-full p-2.5 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-[#28006d] focus:outline-none min-h-[60px]"
            />
          </div>
        </div>

        {/* ======================================================== */}
        {/* RIGHT COLUMN (3 cols): Impression, ICD-10 & Sign-Off      */}
        {/* ======================================================== */}
        <div className="col-span-3 flex flex-col gap-6">
          {/* Card 1: Impression & ICD-10 Diagnoses */}
          <div className="bg-white border border-[#eff4ff] rounded-[12px] p-5 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] flex flex-col gap-3">
            <div className="flex items-center justify-between border-b border-[#eff4ff] pb-3">
              <h3 className="font-bold text-[14px] text-[#0b1c30] flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-[#28006d]" />
                Final Impression &amp; ICD-10
              </h3>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-3 bg-[#f8f9ff] rounded-lg border border-slate-200/60">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-[#28006d]">
                    ICD-10 {state.primaryDiagnosisIcd}
                  </span>
                  <span className="bg-[#e8ddff] text-[#28006d] text-[9px] font-bold px-1.5 py-0.2 rounded">
                    Primary
                  </span>
                </div>
                <p className="text-[11px] text-[#0b1c30] mt-1 font-medium leading-snug">
                  {state.primaryDiagnosisDesc}
                </p>
              </div>

              <div className="p-3 bg-[#f8f9ff] rounded-lg border border-slate-200/60">
                <span className="font-mono font-bold text-slate-700">
                  ICD-10 {state.secondaryDiagnosisIcd}
                </span>
                <p className="text-[11px] text-slate-600 mt-1 leading-snug">
                  {state.secondaryDiagnosisDesc}
                </p>
              </div>

              <div className="p-2.5 bg-emerald-50 rounded-lg border border-emerald-200 text-[11px] text-emerald-900 leading-snug">
                <strong>Clinical Conclusion:</strong> Non-obstructive coronary disease (40% mid-LAD). No revascularization/stenting indicated. Preserved LVEF 58%.
              </div>
            </div>
          </div>

          {/* Card 2: Rx Optimization & Post-Care Orders */}
          <div className="bg-white border border-[#eff4ff] rounded-[12px] p-5 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] flex flex-col gap-3">
            <h3 className="font-bold text-[14px] text-[#0b1c30] flex items-center gap-2 border-b border-[#eff4ff] pb-2">
              <Sparkles className="w-4 h-4 text-[#28006d]" />
              Medical Therapy Plan
            </h3>

            <div className="space-y-2 text-xs">
              {state.prescriptions.map((rx) => (
                <div key={rx.medication} className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                  <span className="font-bold text-[#0b1c30] block">{rx.medication} {rx.dosage}</span>
                  <span className="text-[10px] text-slate-500 block">{rx.sig}</span>
                </div>
              ))}

              <div className="p-2.5 bg-purple-50 border border-purple-200 rounded-lg text-[11px] text-[#28006d]">
                <strong>Disposition:</strong> {state.recoveryBay} • 4h monitoring • Escort: {state.dischargeEscort}
              </div>
            </div>
          </div>

          {/* Card 3: Operator Sign-off Pill */}
          <div className="bg-[#28006d] text-white rounded-[12px] p-4 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-white text-xs">
                MC
              </div>
              <div>
                <span className="font-bold block text-white">Dr. Michael Chang, MD</span>
                <span className="text-[10px] text-purple-200 block">Lead Operator • Cath Suite 3</span>
              </div>
            </div>
            <Lock className="w-4 h-4 text-[#5af8fb]" />
          </div>
        </div>
      </main>

      {/* 4. STICKY BOTTOM ACTION BAR (Figma 1:15031) */}
      <footer className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-2xl px-[40px] py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-4 text-xs text-[#494552]">
          <span className="flex items-center gap-1.5 text-emerald-700 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Auto-saved 14 seconds ago
          </span>
          <span className="text-slate-300">|</span>
          <span className="font-mono text-slate-500">Procedure Clock: 26 min elapsed</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => triggerToast('Draft procedural findings saved to local clinical cache.')}
            className="px-4 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold rounded-lg text-xs transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Draft</span>
          </button>

          <button
            type="button"
            onClick={handleCompleteProcedure}
            className="px-6 py-2.5 bg-gradient-to-b from-[#a44cff] to-[#5b14b8] hover:opacity-95 text-white font-bold rounded-xl shadow-md transition-all flex items-center gap-2 text-xs cursor-pointer"
          >
            <span>Complete Procedure Documentation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </footer>
    </div>
  );
};
