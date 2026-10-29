import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  Clock,
  Contrast,
  Download,
  FileText,
  Maximize2,
  Printer,
  RotateCcw,
  Sparkles,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import fluoroscopyImage from '@/assets/medical/cath-lab-fluoroscopy.png';

export const RadiologyViewerPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [zoomLevel, setZoomLevel] = useState(100);
  const [contrastInverted, setContrastInverted] = useState(false);
  const [activePreset, setActivePreset] = useState<'brain' | 'bone' | 'lung' | 'soft'>('brain');
  const [isReviewed, setIsReviewed] = useState(false);

  const isChest = id?.includes('chest');

  const study = {
    title: isChest ? 'Chest X-Ray (PA & Lateral)' : 'MRI Brain W/WO Contrast',
    studyId: id || 'RAD-891024-X',
    patient: isChest ? 'Eleanor Vance' : 'Doe, Jane',
    dob: isChest ? '10/24/1978' : '1985-04-12',
    mrn: '987654321',
    status: 'ABNORMAL',
    studyDate: 'Oct 24, 2023 14:30',
    referringDoctor: 'Dr. H. Chen',
    radiologist: 'Dr. Sarah Jenkins',
    facility: 'Enterprise Health',
  };

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 25, 250));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 25, 50));
  const handleReset = () => {
    setZoomLevel(100);
    setContrastInverted(false);
    setActivePreset('brain');
  };

  return (
    <div className="w-full space-y-4" data-node-id="1:3203">
      {/* 1. Header with Study Information & Action Controls (Figma node 1:3219) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-[#e1e3e4]">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="text-[#5b14b8] font-bold text-lg">❖</span>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#191c1d]">
              {study.title}
            </h1>
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-red-100 text-[#ba1a1a]">
              {study.status}
            </span>
          </div>
          <p className="text-xs text-[#7a7583]">
            Pt: {study.patient} (DOB: {study.dob}) • Date: {study.studyDate} • Ref: {study.referringDoctor}
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => window.print()}
            className="h-10 px-4 rounded-lg bg-white border border-[#cbc4d4] text-xs font-semibold text-[#191c1d] hover:bg-slate-50 transition-colors flex items-center gap-1.5 shadow-sm focus:outline-none"
          >
            <Printer className="size-4 text-[#494552]" aria-hidden="true" />
            <span>Print</span>
          </button>

          {/* Canonical Primary Action Button (Figma node 1:40) */}
          <button
            type="button"
            className="h-10 px-5 rounded-lg bg-gradient-to-b from-[#a44cff] to-[#5b14b8] text-white text-xs font-semibold hover:opacity-95 transition-all shadow-sm flex items-center gap-1.5 focus:outline-none"
          >
            <Sparkles className="size-3.5" aria-hidden="true" />
            <span>Add Addendum</span>
          </button>
        </div>
      </div>

      {/* 2. Main Two-Column Viewport: Left DICOM Canvas / Right Diagnostic Findings */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: High-Contrast Medical Image Viewer (Figma node 1:3244) */}
        <div className="lg:col-span-7 bg-[#0b0f19] rounded-2xl border border-slate-800 p-4 shadow-xl flex flex-col gap-3 overflow-hidden text-slate-300">
          {/* Workstation Toolbar (Figma node 1:3274) */}
          <div className="flex items-center justify-between gap-2 p-2 bg-slate-900/90 rounded-xl border border-slate-800 text-xs">
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleZoomIn}
                title="Zoom In"
                className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
              >
                <ZoomIn className="size-4" />
              </button>
              <button
                type="button"
                onClick={handleZoomOut}
                title="Zoom Out"
                className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
              >
                <ZoomOut className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => setContrastInverted(!contrastInverted)}
                title="Invert Contrast"
                className={cn(
                  "p-1.5 rounded-lg transition-colors",
                  contrastInverted ? "bg-purple-900/60 text-purple-300" : "hover:bg-slate-800 text-slate-300"
                )}
              >
                <Contrast className="size-4" />
              </button>
              <button
                type="button"
                onClick={handleReset}
                title="Reset View"
                className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
              >
                <RotateCcw className="size-4" />
              </button>
            </div>

            <div className="h-4 w-[1px] bg-slate-700 hidden sm:block" />

            {/* Presets */}
            <div className="hidden sm:flex items-center gap-1">
              <span className="text-[10px] text-slate-400 uppercase font-mono px-1">Presets:</span>
              {(['brain', 'bone', 'lung', 'soft'] as const).map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setActivePreset(preset)}
                  className={cn(
                    "px-2.5 py-1 rounded text-[11px] font-medium capitalize transition-colors",
                    activePreset === preset
                      ? "bg-[#a44cff] text-white"
                      : "hover:bg-slate-800 text-slate-400 hover:text-slate-200"
                  )}
                >
                  {preset}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => window.print()}
                title="Download Scan"
                className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
              >
                <Download className="size-4" />
              </button>
              <button
                type="button"
                onClick={handleZoomIn}
                title="Full Screen"
                className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
              >
                <Maximize2 className="size-4" />
              </button>
            </div>
          </div>

          {/* Interactive DICOM Viewport (Figma node 1:3245) */}
          <div className="relative w-full h-[520px] bg-black rounded-xl overflow-hidden flex items-center justify-center border border-slate-900 select-none">
            {/* Corner DICOM Telemetry (Figma nodes 1:3250 - 1:3273) */}
            <div className="absolute top-3 left-3 z-10 font-mono text-[10px] leading-tight text-slate-300 pointer-events-none drop-shadow">
              <p className="font-semibold text-white">{study.patient}</p>
              <p>ID: {study.mrn}</p>
              <p>DOB: {study.dob}</p>
            </div>

            <div className="absolute top-3 right-3 z-10 font-mono text-[10px] leading-tight text-slate-300 text-right pointer-events-none drop-shadow">
              <p className="font-semibold text-white">Inst: {study.facility}</p>
              <p>{study.studyDate}</p>
              <p>Ser: 4 Img: 22/140</p>
            </div>

            <div className="absolute bottom-3 left-3 z-10 font-mono text-[10px] leading-tight text-slate-400 pointer-events-none drop-shadow">
              <p>T1_FLAIR_AX</p>
              <p>TR: 2000 TE: 9</p>
              <p>Thk: 5.0mm Sp: 1.5mm</p>
            </div>

            <div className="absolute bottom-3 right-3 z-10 font-mono text-[10px] leading-tight text-slate-400 text-right pointer-events-none drop-shadow">
              <p>WL: 500 WW: 1000</p>
              <p>Zoom: {(zoomLevel / 100).toFixed(1)}x</p>
            </div>

            {/* Medical Fluoroscopy/Radiology Image */}
            <div
              className="transition-transform duration-200 ease-out max-w-full max-h-full flex items-center justify-center"
              style={{
                transform: `scale(${zoomLevel / 100})`,
                filter: contrastInverted
                  ? 'invert(1) contrast(140%)'
                  : activePreset === 'bone'
                  ? 'contrast(160%) brightness(110%)'
                  : activePreset === 'lung'
                  ? 'contrast(120%) brightness(90%)'
                  : 'contrast(125%) brightness(105%)',
              }}
            >
              <img
                src={fluoroscopyImage}
                alt="Radiology Study Scan"
                className="max-h-[480px] object-contain rounded drop-shadow-2xl"
              />
            </div>
          </div>

          {/* Footer Telemetry Banner (Figma node 1:1021) */}
          <div className="flex items-center justify-between text-[11px] text-slate-400 px-2 py-1 font-mono">
            <span>DICOM 3.0 Verified</span>
            <span>W: 4096 L: 2048</span>
          </div>
        </div>

        {/* Right Column: Structured Findings & Clinical Notes (Figma node 1:3322) */}
        <div className="lg:col-span-5 space-y-4">
          {/* 1. Impression Alert Card (Figma node 1:3322) */}
          <div className="bg-red-50/40 border-l-4 border-l-[#ba1a1a] border border-red-200 rounded-2xl p-5 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-[#ba1a1a] font-bold text-sm tracking-wide">
              <AlertTriangle className="size-4.5 text-[#ba1a1a] shrink-0" />
              <span>Impression</span>
            </div>
            <div className="text-xs text-[#191c1d] space-y-2.5 leading-relaxed font-normal">
              <p>
                <strong>1. Enhancing lesion in the right frontal lobe</strong> measuring approximately 2.1 x 1.8 x 1.5 cm, suggestive of a high-grade glioma or solitary metastasis. Urgent neurosurgical consultation recommended.
              </p>
              <p>
                <strong>2. Mild adjacent vasogenic edema</strong> causing mild mass effect on the right lateral ventricle, without midline shift.
              </p>
              <p>
                <strong>3. Otherwise unremarkable</strong> MRI of the brain.
              </p>
            </div>
          </div>

          {/* 2. Radiologist Report Header Card (Figma node 1:3335) */}
          <div className="bg-white border border-[#cbc4d4] rounded-2xl p-5 shadow-sm space-y-3 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2 font-bold text-sm text-[#191c1d]">
                <FileText className="size-4 text-[#5b14b8]" />
                <span>Radiologist Report</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px] font-semibold">
                Status: Final
              </span>
            </div>

            <div className="space-y-1">
              <div className="text-[11px] font-bold text-[#7a7583] uppercase tracking-wider">
                CLINICAL INDICATION
              </div>
              <p className="text-[#303030] leading-relaxed">
                45-year-old female presenting with new-onset headaches and mild left-sided weakness. Evaluate for mass lesion.
              </p>
            </div>
          </div>

          {/* 3. Previous Imaging Comparison Card (Figma node 1:3375) */}
          <div className="bg-white border border-[#cbc4d4] rounded-2xl p-5 shadow-sm space-y-3 text-xs">
            <div className="flex items-center gap-2 font-bold text-sm text-[#191c1d]">
              <Clock className="size-4 text-[#5b14b8]" />
              <span>Previous Imaging Comparison</span>
            </div>

            <div className="p-3 rounded-xl border border-[#e1e3e4] bg-[#f8f9fa] flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="font-bold text-[#191c1d] flex items-center gap-1.5">
                  <span className="text-[#5b14b8]">❖</span>
                  <span>MRI Brain W/O Contrast</span>
                </div>
                <div className="text-[11px] text-[#7a7583]">Aug 12, 2021 • Normal</div>
              </div>
              <ChevronRight className="size-4 text-[#7a7583]" />
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="font-bold text-[11px] text-[#191c1d]">Comparison Note:</div>
              <p className="text-[11px] text-[#494552] leading-relaxed">
                The currently described right frontal lesion is new since the prior examination dated Aug 12, 2021.
              </p>
            </div>
          </div>

          {/* 4. Action Buttons (Figma node 1:1084 & 1:1086) */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <button
              type="button"
              className="h-11 px-4 rounded-xl bg-white border border-[#cbc4d4] text-xs font-semibold text-[#191c1d] hover:bg-slate-50 transition-colors shadow-sm focus:outline-none"
            >
              Request Addendum
            </button>

            <button
              type="button"
              onClick={() => setIsReviewed(true)}
              disabled={isReviewed}
              className={cn(
                "h-11 px-4 rounded-xl text-xs font-semibold text-white shadow-sm transition-all flex items-center justify-center gap-2 focus:outline-none",
                isReviewed
                  ? "bg-emerald-600 cursor-default"
                  : "bg-gradient-to-b from-[#a44cff] to-[#5b14b8] hover:opacity-95"
              )}
            >
              <CheckCircle2 className="size-4" aria-hidden="true" />
              <span>{isReviewed ? 'Report Signed Off' : 'Mark Reviewed'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RadiologyViewerPage;
