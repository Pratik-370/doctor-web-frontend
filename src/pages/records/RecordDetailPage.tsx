import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowUp,
  Check,
  CheckCircle2,
  Download,
  FlaskConical,
  Printer,
  RotateCw,
  Stethoscope,
  Video,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';

export const RecordDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [zoomLevel, setZoomLevel] = useState(100);

  const labData = {
    documentName: 'LabReport_LipidPanel_Oct23.pdf',
    accession: id || '938475-A',
    testName: 'Lipid Panel',
    date: 'Oct 24, 2023',
    patient: 'Doe, John',
    dob: '05/12/1980',
    provider: 'Dr. Julian Vance',
    hospital: 'St. Jude Medical Center Laboratory',
    lab: 'Quest Diagnostics',
    overallStatus: 'Normal Overall Status',
    statusNote: 'Minor elevation in LDL noted.',
    results: [
      { test: 'Total Cholesterol', result: '185', flag: '', refRange: '< 200 mg/dL', target: '< 200' },
      { test: 'HDL Cholesterol', result: '55', flag: '', refRange: '> 40 mg/dL', target: '> 40' },
      { test: 'LDL Cholesterol', result: '110', flag: 'H', refRange: '< 100 mg/dL', target: '< 100' },
      { test: 'Triglycerides', result: '150', flag: '', refRange: '< 150 mg/dL', target: '< 150' },
    ],
  };

  return (
    <div className="w-full space-y-4" data-node-id="1:5719">
      {/* 1. Document Viewer Top Bar (Figma node 1:5721) */}
      <div className="bg-white border border-[#cbc4d4] rounded-xl px-4 py-2.5 flex items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="size-7 rounded bg-purple-100 text-[#5b14b8] flex items-center justify-center font-bold text-xs">
            PDF
          </div>
          <span className="text-sm font-semibold text-[#191c1d]">
            {labData.documentName}
          </span>
        </div>

        {/* Action Controls on Document Bar */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs">
            <button
              type="button"
              onClick={() => setZoomLevel((prev) => Math.max(75, prev - 15))}
              className="p-1 hover:bg-slate-200/60 rounded text-[#494552] transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="size-3.5" />
            </button>
            <span className="px-1.5 font-mono text-[#191c1d]">{zoomLevel}%</span>
            <button
              type="button"
              onClick={() => setZoomLevel((prev) => Math.min(150, prev + 15))}
              className="p-1 hover:bg-slate-200/60 rounded text-[#494552] transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="size-3.5" />
            </button>
          </div>

          <button
            type="button"
            onClick={() => setZoomLevel(100)}
            className="p-2 rounded-lg bg-white border border-slate-200 text-[#494552] hover:bg-slate-50 transition-colors"
            title="Reset Rotation"
          >
            <RotateCw className="size-3.5" />
          </button>

          <button
            type="button"
            onClick={() => window.print()}
            className="p-2 rounded-lg bg-white border border-slate-200 text-[#494552] hover:bg-slate-50 transition-colors"
            title="Download PDF"
          >
            <Download className="size-3.5" />
          </button>
        </div>
      </div>

      {/* 2. Main 60% / 40% Split View (Figma node 1:5743 & 1:5842) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (60%, Span 7): Document Paper Canvas */}
        <div
          aria-label="Document Viewer Canvas"
          className="lg:col-span-7 bg-[#f3f4f5] border border-[#cbc4d4] rounded-2xl p-6 shadow-sm overflow-hidden flex flex-col items-center justify-center min-h-[680px]"
        >
          {/* White Paper Canvas */}
          <div
            className="w-full bg-white border border-slate-200 rounded-xl p-8 shadow-md space-y-6 text-xs text-[#191c1d] transition-transform"
            style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
          >
            {/* Header: Quest Diagnostics */}
            <div className="flex items-start justify-between pb-3">
              <div>
                <h2 className="text-xl font-bold text-[#191c1d]">Quest Diagnostics</h2>
                <div className="text-xs text-[#7a7583]">St. Jude Medical Center Laboratory</div>
              </div>
              <div className="text-right text-xs">
                <div className="font-bold uppercase tracking-wider text-[#191c1d]">CONFIDENTIAL</div>
                <div className="text-[#7a7583]">Date: {labData.date}</div>
              </div>
            </div>

            {/* Purple Divider */}
            <div className="h-0.5 w-full bg-[#5b14b8]" />

            {/* Patient Information Section */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-[#5b14b8]">Patient Information</h3>
              <div className="grid grid-cols-2 gap-y-2 text-xs">
                <div>
                  <span className="text-[#7a7583]">Name:</span>{' '}
                  <strong className="text-[#191c1d]">{labData.patient}</strong>
                </div>
                <div>
                  <span className="text-[#7a7583]">DOB:</span>{' '}
                  <strong className="text-[#191c1d]">{labData.dob}</strong>
                </div>
                <div>
                  <span className="text-[#7a7583]">Provider:</span>{' '}
                  <strong className="text-[#191c1d]">{labData.provider}</strong>
                </div>
                <div>
                  <span className="text-[#7a7583]">Accession:</span>{' '}
                  <strong className="text-[#191c1d]">{labData.accession}</strong>
                </div>
              </div>
            </div>

            {/* Test Results: Lipid Panel */}
            <div className="space-y-3 pt-2">
              <h3 className="text-sm font-bold text-[#5b14b8]">Test Results: Lipid Panel</h3>
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-[#cbc4d4] text-[#7a7583] font-medium">
                    <th className="py-2">Test</th>
                    <th className="py-2">Result</th>
                    <th className="py-2">Flag</th>
                    <th className="py-2">Reference Range</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {labData.results.map((row, index) => (
                    <tr key={index} className="hover:bg-slate-50/50">
                      <td className="py-2.5 font-medium text-[#191c1d]">{row.test}</td>
                      <td className="py-2.5 font-bold text-[#191c1d]">{row.result}</td>
                      <td className="py-2.5">
                        {row.flag ? (
                          <span className="font-bold text-[#ba1a1a]">{row.flag}</span>
                        ) : null}
                      </td>
                      <td className="py-2.5 text-[#7a7583]">{row.refRange}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer Certification */}
            <div className="pt-8 border-t border-slate-200 text-center text-[11px] text-[#7a7583]">
              End of Report. Electronically signed by Quest Diagnostics automated system.
            </div>
          </div>
        </div>

        {/* Right Column (40%, Span 5): Clinical Findings & Actions (Figma node 1:5842) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Card 1: Lipid Panel Summary (Figma node 1:5843) */}
          <div className="bg-white border border-[#cbc4d4] rounded-2xl p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-[#191c1d]">Lipid Panel</h2>
                <div className="text-xs text-[#7a7583]">Oct 24, 2023</div>
              </div>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#e0f7fa] text-[#00838f]">
                <Check className="size-3 stroke-[3]" />
                <span>Verified</span>
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5 text-xs text-[#191c1d]">
              <CheckCircle2 className="size-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold">{labData.overallStatus}</div>
                <div className="text-[#7a7583]">{labData.statusNote}</div>
              </div>
            </div>
          </div>

          {/* Card 2: Extracted Results (Figma node 1:5862) */}
          <div className="bg-white border border-[#cbc4d4] rounded-2xl p-5 shadow-sm space-y-3">
            <h3 className="text-sm font-bold text-[#191c1d]">Extracted Results</h3>
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#e1e3e4] text-[#7a7583] font-medium">
                  <th className="py-2">Test Name</th>
                  <th className="py-2 text-center">Result</th>
                  <th className="py-2 text-right">Range</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/50">
                  <td className="py-2.5 text-[#494552]">Total Cholesterol</td>
                  <td className="py-2.5 font-bold text-center text-[#191c1d]">185</td>
                  <td className="py-2.5 text-[#7a7583] text-right">&lt; 200</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-2.5 text-[#494552]">HDL</td>
                  <td className="py-2.5 font-bold text-center text-[#191c1d]">55</td>
                  <td className="py-2.5 text-[#7a7583] text-right">&gt; 40</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-2.5 text-[#494552] flex items-center gap-1">
                    <span>LDL</span>
                    <ArrowUp className="size-3 text-[#ba1a1a]" />
                  </td>
                  <td className="py-2.5 font-bold text-center text-[#ba1a1a]">110</td>
                  <td className="py-2.5 text-[#7a7583] text-right">&lt; 100</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-2.5 text-[#494552]">Triglycerides</td>
                  <td className="py-2.5 font-bold text-center text-[#191c1d]">150</td>
                  <td className="py-2.5 text-[#7a7583] text-right">&lt; 150</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Card 3: Metadata (Figma node 1:5908) */}
          <div className="bg-white border border-[#cbc4d4] rounded-2xl p-5 shadow-sm space-y-3 text-xs">
            <h3 className="text-sm font-bold text-[#191c1d]">Metadata</h3>
            <div className="space-y-2.5">
              <div className="flex items-center gap-2">
                <span className="size-4 rounded bg-emerald-50 text-emerald-700 flex items-center justify-center text-[10px] font-bold">
                  +
                </span>
                <span className="text-[#7a7583]">Hospital / Clinic:</span>
                <span className="font-semibold text-[#191c1d] ml-auto">St. Jude Medical Center</span>
              </div>
              <div className="flex items-center gap-2">
                <FlaskConical className="size-3.5 text-[#7a7583]" />
                <span className="text-[#7a7583]">Laboratory:</span>
                <span className="font-semibold text-[#191c1d] ml-auto">Quest Diagnostics</span>
              </div>
              <div className="flex items-center gap-2">
                <Stethoscope className="size-3.5 text-[#7a7583]" />
                <span className="text-[#7a7583]">Ordered By:</span>
                <span className="font-semibold text-[#191c1d] ml-auto">Dr. Julian Vance</span>
              </div>
            </div>
          </div>

          {/* Action Buttons: Canonical Primary Action (Figma node 1:40) & Secondary Buttons */}
          <div className="space-y-2.5 pt-1">
            <button
              type="button"
              onClick={() => navigate('/treatment-offers/new/step-1')}
              className="w-full h-11 rounded-xl bg-gradient-to-b from-[#a44cff] to-[#5b14b8] text-white text-sm font-semibold hover:opacity-95 transition-all shadow-sm flex items-center justify-center gap-2 focus:outline-none"
            >
              <Video className="size-4" />
              <span>Start Consultation</span>
            </button>

            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => window.print()}
                className="h-10 px-3 rounded-lg bg-white border border-[#cbc4d4] text-xs font-semibold text-[#191c1d] hover:bg-slate-50 transition-colors flex items-center justify-center gap-1.5 shadow-sm focus:outline-none"
              >
                <Download className="size-3.5 text-[#494552]" />
                <span>Download PDF</span>
              </button>

              <button
                type="button"
                onClick={() => window.print()}
                className="h-10 px-3 rounded-lg bg-white border border-[#cbc4d4] text-xs font-semibold text-[#191c1d] hover:bg-slate-50 transition-colors flex items-center justify-center gap-1.5 shadow-sm focus:outline-none"
              >
                <Printer className="size-3.5 text-[#494552]" />
                <span>Print Summary</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RecordDetailPage;
