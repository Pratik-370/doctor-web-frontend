import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Building,
  Check,
  CheckCircle2,
  Clock,
  FileDown,
  Heart,
  Lock,
  Printer,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  X,
} from 'lucide-react';

export const EncounterCompletedPage: React.FC = () => {
  const navigate = useNavigate();

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleViewRecords = () => {
    triggerToast('Accessing synchronized Care ID patient records...');
    setTimeout(() => {
      navigate('/records');
    }, 600);
  };

  const handlePrintDischarge = () => {
    triggerToast('Generating official discharge summary PDF...');
    window.print();
  };

  const handleDownloadDossier = () => {
    triggerToast('Downloading complete encounter dossier (PDF)...');
  };

  const stages = [
    { num: 1, title: 'Treatment Approved', meta: 'Oct 24 • Pre-Auth OK', status: 'completed' },
    { num: 2, title: 'Financially Cleared', meta: 'Oct 26 • 0% APR Plan', status: 'completed' },
    { num: 3, title: 'Clinical Handoff', meta: 'Nov 01 • Cardiology', status: 'completed' },
    { num: 4, title: 'Procedure Scheduled', meta: 'Nov 04 • 08:30 AM', status: 'completed' },
    { num: 5, title: 'Pre-Procedure Ready', meta: 'NPO Confirmed • Labs', status: 'completed' },
    { num: 6, title: 'Patient Verified', meta: 'NFC & Biometric Match', status: 'completed' },
    { num: 7, title: 'Encounter Started', meta: 'Cath Lab #03 • 09:15 AM', status: 'completed' },
    { num: 8, title: 'Procedure Completed', meta: 'Hemostasis Achieved', status: 'completed' },
    { num: 9, title: 'Record Finalized', meta: 'Sealed & Synced', status: 'sealed' },
  ];

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] flex flex-col w-full pb-28">
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
              <span className="w-2 h-2 rounded-full bg-[#00696b]" />
              <span className="font-semibold text-[#00696b] text-[11px] tracking-wide uppercase">Vault Synced</span>
            </div>
            <div className="flex items-center gap-2 text-[#494552] text-[12px] font-medium">
              <Building className="w-4 h-4 text-slate-500" />
              <span>Cath Lab Suite #03 • Encounter Concluded</span>
            </div>
          </div>

          {/* Right: Actions, Notifications, & Doctor Profile */}
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2 bg-emerald-100 text-emerald-900 px-3 py-1.5 rounded-lg text-xs font-bold border border-emerald-300">
              <Lock className="w-3.5 h-3.5 text-emerald-700" />
              <span>Cryptographically Sealed</span>
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
            <span className="bg-[#1b004c] text-white text-[10px] font-bold px-2 py-0.5 rounded tracking-wide uppercase">
              ENCOUNTER COMPLETED &amp; RATIFIED
            </span>
            <span className="font-bold text-[#0b1c30] text-[12px]">Robert J. Sterling</span>
            <span className="text-slate-500 font-medium">(Mar 14, 1981)</span>
            <span className="bg-[#dce9ff] text-[#0b1c30] font-semibold text-[10px] px-2 py-0.2 rounded-full">
              CID #8472-9901
            </span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center gap-1.5 text-slate-600 font-medium">
              <Stethoscope className="w-3.5 h-3.5 text-[#28006d]" />
              CPT #93458 Diagnostic Left Heart Cath &amp; Coronary Angiogram
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[11px]">
            <span className="text-slate-500 font-medium">Workflow:</span>
            <span className="bg-[#d3e4fe] text-[#0b1c30] px-2 py-0.5 rounded font-medium">Check-in</span>
            <span className="bg-[#d3e4fe] text-[#0b1c30] px-2 py-0.5 rounded font-medium">Time-Out</span>
            <span className="bg-[#d3e4fe] text-[#0b1c30] px-2 py-0.5 rounded font-medium">Start</span>
            <span className="bg-[#d3e4fe] text-[#0b1c30] px-2 py-0.5 rounded font-medium">Active Doc</span>
            <span className="bg-[#d3e4fe] text-[#0b1c30] px-2 py-0.5 rounded font-medium">Post-Op</span>
            <span className="bg-emerald-600 text-white font-bold px-2.5 py-0.5 rounded shadow-xs">
              Encounter Sealed
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
            Robert J. Sterling (CID #8472-9901)
          </button>
          <span className="text-[#cbc4d4]">/</span>
          <span className="bg-[#d3e4fe] text-[#0b1c30] text-[11px] px-2 py-0.5 rounded font-mono font-medium">
            Proc #PROC-2026-93458
          </span>
          <span className="text-[#cbc4d4]">/</span>
          <span className="text-emerald-700 font-bold">Encounter Completed &amp; Sealed</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="bg-emerald-100 text-emerald-900 border border-emerald-300 text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            LIFECYCLE COMPLETE
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
        {/* Hero Success Banner (Figma Node 1:16079) */}
        <div className="bg-gradient-to-r from-[#28006d] via-[#3f1d8b] to-[#1b004c] p-8 rounded-[16px] shadow-[0px_8px_24px_rgba(40,0,109,0.15)] text-white relative overflow-hidden flex flex-col gap-6">
          <div className="flex items-start justify-between z-10">
            <div className="flex items-start gap-5">
              {/* Double-Ring Verified Checkmark Badge */}
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#5af8fb] to-[#a44cff] p-1 shadow-lg shrink-0 flex items-center justify-center">
                <div className="w-full h-full bg-[#1b004c] rounded-[12px] flex items-center justify-center text-white">
                  <Check className="w-8 h-8 text-[#5af8fb] stroke-[3]" />
                </div>
              </div>

              <div className="flex flex-col gap-1.5 max-w-[760px]">
                <div className="flex items-center gap-2">
                  <span className="bg-[#5af8fb] text-[#002020] text-[10px] font-black px-2.5 py-0.5 rounded-full tracking-wider uppercase">
                    ARCHIVED &amp; SEALED
                  </span>
                  <span className="bg-white/10 text-purple-200 text-xs px-2.5 py-0.5 rounded-full font-mono">
                    IMMUTABLE VAULT RECEIPT
                  </span>
                </div>
                <h1 className="text-[26px] font-black tracking-tight leading-tight text-white">
                  Clinical Encounter Successfully Completed
                </h1>
                <p className="text-[13px] text-purple-100/90 leading-relaxed">
                  Diagnostic Cardiac Catheterization &amp; Coronary Angiogram documentation officially ratified, signed, and synchronized to the patient&apos;s permanent Care ID health vault.
                </p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md px-5 py-3.5 rounded-xl border border-white/20 flex flex-col items-end text-right">
              <span className="text-[10px] uppercase tracking-wider text-purple-200 font-semibold">
                Permanent Vault Status
              </span>
              <span className="text-base font-bold text-[#5af8fb] mt-0.5 flex items-center gap-1.5">
                <Lock className="w-4 h-4" />
                Ledger Sealed
              </span>
              <span className="text-[11px] text-purple-200 font-mono mt-0.5">SHA-256 Validated</span>
            </div>
          </div>

          {/* Session Meta Pill Strip */}
          <div className="grid grid-cols-4 gap-3 pt-4 border-t border-white/15 text-xs z-10">
            <div className="bg-white/5 backdrop-blur-xs p-3 rounded-lg border border-white/10">
              <span className="text-[10px] uppercase font-semibold text-purple-200 block">Encounter ID</span>
              <span className="font-bold text-white text-[13px] font-mono mt-0.5 block">#ENC-2026-88419</span>
            </div>
            <div className="bg-white/5 backdrop-blur-xs p-3 rounded-lg border border-white/10">
              <span className="text-[10px] uppercase font-semibold text-purple-200 block">Completed At</span>
              <span className="font-semibold text-white mt-0.5 block">Nov 4, 2026 @ 10:45 AM EST</span>
            </div>
            <div className="bg-white/5 backdrop-blur-xs p-3 rounded-lg border border-white/10">
              <span className="text-[10px] uppercase font-semibold text-purple-200 block">Attending Physician</span>
              <span className="font-semibold text-purple-200 mt-0.5 block">Dr. Michael Chang, MD</span>
            </div>
            <div className="bg-white/5 backdrop-blur-xs p-3 rounded-lg border border-white/10">
              <span className="text-[10px] uppercase font-semibold text-purple-200 block">Integrity Proof</span>
              <span className="font-semibold text-emerald-300 mt-0.5 block">Tamper-Proof Log (Active)</span>
            </div>
          </div>
        </div>

        {/* 9-Stage Clinical Lifecycle Tracker */}
        <div className="bg-white border border-[#eff4ff] rounded-[14px] p-5 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] flex flex-col gap-3">
          <div className="flex items-center justify-between border-b border-[#eff4ff] pb-3">
            <h2 className="text-[14px] font-bold text-[#0b1c30] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#28006d]" />
              End-to-End Clinical Lifecycle Tracker (9 Stages Ratified)
            </h2>
            <span className="bg-[#e7f7e9] text-[#137333] font-bold text-[10px] px-2.5 py-0.5 rounded-full">
              Full Traversal Completed
            </span>
          </div>

          {/* 9-Stage Horizontal Stepper */}
          <div className="grid grid-cols-9 gap-2 pt-2">
            {stages.map((stage) => (
              <div
                key={stage.num}
                className={`p-2.5 rounded-lg border flex flex-col justify-between text-center relative ${
                  stage.status === 'sealed'
                    ? 'bg-[#28006d] border-purple-800 text-white shadow-xs'
                    : 'bg-[#f8f9ff] border-emerald-200 text-[#0b1c30]'
                }`}
              >
                <div className="flex items-center justify-center mb-1">
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      stage.status === 'sealed'
                        ? 'bg-[#5af8fb] text-[#002020]'
                        : 'bg-emerald-600 text-white'
                    }`}
                  >
                    {stage.status === 'sealed' ? <Lock className="w-2.5 h-2.5" /> : <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </div>
                <span className={`text-[11px] font-bold leading-tight ${stage.status === 'sealed' ? 'text-white' : 'text-[#0b1c30]'}`}>
                  {stage.title}
                </span>
                <span className={`text-[9px] mt-1 ${stage.status === 'sealed' ? 'text-purple-200' : 'text-slate-500'}`}>
                  {stage.meta}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Summary Snapshot Cards Grid */}
        <div className="grid grid-cols-12 gap-6 items-start">
          {/* Card 1 (7 cols): Patient Clinical Outcome Card */}
          <div className="col-span-7 bg-white border border-[#eff4ff] rounded-[14px] p-5 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-[#eff4ff] pb-3">
              <h3 className="font-bold text-[14px] text-[#0b1c30] flex items-center gap-2">
                <Heart className="w-4 h-4 text-[#28006d]" />
                Patient Clinical Outcome &amp; Findings
              </h3>
              <span className="bg-[#dce9ff] text-[#0b1c30] text-[10px] font-bold px-2 py-0.5 rounded">
                Stable Recovery
              </span>
            </div>

            {/* 3 Outcome Metrics */}
            <div className="grid grid-cols-3 gap-3 text-xs text-center">
              <div className="p-3 bg-[#f8f9ff] border border-slate-200/70 rounded-lg">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Discharge Bed</span>
                <span className="font-bold text-[#0b1c30] text-xs mt-1 block">Step-Down #04</span>
                <span className="text-[10px] text-slate-400">Planned 02:30 PM EST</span>
              </div>
              <div className="p-3 bg-[#f8f9ff] border border-slate-200/70 rounded-lg">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Hemodynamic Vitals</span>
                <span className="font-bold font-mono text-[#0b1c30] text-xs mt-1 block">122/76</span>
                <span className="text-[10px] text-emerald-600 font-semibold">HR: 68 • SpO2: 98%</span>
              </div>
              <div className="p-3 bg-[#f8f9ff] border border-slate-200/70 rounded-lg">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Access Site</span>
                <span className="font-bold text-[#0b1c30] text-xs mt-1 block">Right Radial</span>
                <span className="text-[10px] text-emerald-700 font-medium">TR Band patent • Dry</span>
              </div>
            </div>

            {/* Findings Box */}
            <div className="p-3.5 bg-[#f8f9ff] border border-slate-200/70 rounded-lg text-xs">
              <span className="font-bold text-[#0b1c30] block mb-1">Definitive Angiographic Findings:</span>
              <p className="text-slate-600 text-[12px] leading-relaxed">
                Coronary angiogram revealed mild non-obstructive coronary artery disease with maximal stenosis of 40% in the mid-left anterior descending (LAD) artery. Normal left ventricular systolic function preserved (LVEF 60%). Guideline-directed medical therapy (GDMT) initiated with statin escalation and antiplatelet maintenance.
              </p>
            </div>

            {/* Care Team & Nursing Signatures */}
            <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                <div>
                  <span className="font-bold text-[#0b1c30] block">Dr. Michael Chang, MD</span>
                  <span className="text-[10px] text-slate-500">Attending Interventionalist</span>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                  Signed
                </span>
              </div>
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                <div>
                  <span className="font-bold text-[#0b1c30] block">Keith Vance, RN</span>
                  <span className="text-[10px] text-slate-500">Cath Lab Lead Circulator</span>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                  Witnessed
                </span>
              </div>
            </div>
          </div>

          {/* Card 2 (5 cols): Financial & Governance Sealing */}
          <div className="col-span-5 bg-white border border-[#eff4ff] rounded-[14px] p-5 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-[#eff4ff] pb-3">
              <h3 className="font-bold text-[14px] text-[#0b1c30] flex items-center gap-2">
                <Lock className="w-4 h-4 text-[#28006d]" />
                Financial &amp; Governance Sealing
              </h3>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                Ratified
              </span>
            </div>

            {/* Financial Clearance Detail */}
            <div className="p-3 bg-[#f8f9ff] border border-slate-200/70 rounded-lg text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-500">Settlement Agreement:</span>
                <span className="font-mono font-bold text-[#0b1c30]">#FIN-TR8921-12M</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Total Settled Amount:</span>
                <span className="font-bold text-emerald-700 text-sm">$4,420.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Financing Structure:</span>
                <span className="font-medium text-[#0b1c30]">Care ID 0% APR 12-Month Plan</span>
              </div>
            </div>

            {/* Cryptographic Hash Box */}
            <div className="p-3 bg-slate-900 text-white rounded-lg text-xs space-y-1.5">
              <div className="flex items-center justify-between text-[11px] text-purple-300">
                <span className="font-mono font-bold flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-[#5af8fb]" />
                  BLOCK RECEIPT #BLK-88419-ST09
                </span>
                <span className="text-[10px] text-emerald-400">IMMUTABLE</span>
              </div>
              <p className="font-mono text-[10px] text-slate-300 break-all leading-tight">
                SHA256: 7f89b02a9e14c5d883b271e892cfa318e4b91f638c03e8714ba329b871c890a2
              </p>
            </div>

            {/* Synchronized Systems */}
            <div className="space-y-1.5 text-xs">
              <span className="font-bold text-slate-700 block text-[11px] uppercase tracking-wider">
                Synchronized Systems (3/3 Live):
              </span>
              <div className="space-y-1 text-[11px]">
                <div className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-200">
                  <span className="text-slate-700 font-medium">1. Care ID Core Ledger</span>
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Synced
                  </span>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-200">
                  <span className="text-slate-700 font-medium">2. Mount Sinai Epic EHR</span>
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Synced
                  </span>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-200">
                  <span className="text-slate-700 font-medium">3. Cath Lab Hemodynamic PACS</span>
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Synced
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Post-Encounter Actions Panel */}
        <div className="bg-white border border-[#eff4ff] rounded-[14px] p-6 shadow-[0px_4px_16px_rgba(0,0,0,0.05)] flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-[15px] text-[#0b1c30]">
                Post-Encounter Record Navigation &amp; Document Dispatch
              </h3>
              <p className="text-xs text-[#494552] mt-0.5">
                Navigate to updated patient dossier or distribute physical discharge documentation
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handlePrintDischarge}
                className="px-4 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold rounded-lg text-xs transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Printer className="w-4 h-4 text-slate-500" />
                <span>Print Discharge Summary</span>
              </button>

              <button
                type="button"
                onClick={handleDownloadDossier}
                className="px-4 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold rounded-lg text-xs transition-colors flex items-center gap-2 cursor-pointer"
              >
                <FileDown className="w-4 h-4 text-slate-500" />
                <span>Download Dossier PDF</span>
              </button>

              <button
                type="button"
                onClick={handleViewRecords}
                className="px-6 py-2.5 bg-gradient-to-b from-[#a44cff] to-[#5b14b8] hover:opacity-95 text-white font-bold rounded-xl shadow-md transition-all flex items-center gap-2 text-xs cursor-pointer"
              >
                <span>View Updated Medical Record</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 italic pt-2 border-t border-slate-100">
            This cryptographic receipt confirms that clinical encounter #ENC-2026-88419 has met all hospital safety standards, clinical quality gates, and financial authorization requirements.
          </p>
        </div>
      </main>
    </div>
  );
};
