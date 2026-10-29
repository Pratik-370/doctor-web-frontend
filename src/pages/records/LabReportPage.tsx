import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  AlertTriangle,
  Check,
  ChevronLeft,
  ChevronRight,
  Download,
  Edit2,
  FlaskConical,
  FolderOpen,
  Printer,
  RotateCw,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export const LabReportPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [clinicalNotes, setClinicalNotes] = useState('');
  const [zoomLevel, setZoomLevel] = useState(100);

  const labReport = {
    title: 'Comprehensive Metabolic Panel',
    reportId: id || 'MRN-847291',
    status: 'Verified',
    collectedDate: 'Oct 24, 2023, 08:30 AM',
    resultDate: 'Oct 24, 2023, 14:15 PM',
    patient: 'John Doe (DOB: 1980-05-15)',
    accession: 'ACC-891024-C',
    facility: 'Central Clinical Labs Inc.',
    director: 'Dr. Sarah Jenkins, MD',
    specimen: 'Blood, Serum',
    orderProvider: 'Dr. Portal User',
    analytes: [
      { name: 'Sodium', value: '140', unit: 'mEq/L', range: '135 - 145', flag: 'normal' },
      { name: 'Potassium', value: '5.8', unit: 'mEq/L', range: '3.5 - 5.0', flag: 'high' },
      { name: 'Chloride', value: '102', unit: 'mEq/L', range: '96 - 106', flag: 'normal' },
      { name: 'Carbon Dioxide (CO2)', value: '24', unit: 'mEq/L', range: '22 - 29', flag: 'normal' },
      { name: 'Glucose (Fasting)', value: '126', unit: 'mg/dL', range: '70 - 99', flag: 'high' },
      { name: 'Blood Urea Nitrogen (BUN)', value: '18', unit: 'mg/dL', range: '7 - 20', flag: 'normal' },
      { name: 'Creatinine', value: '0.9', unit: 'mg/dL', range: '0.6 - 1.2', flag: 'normal' },
      { name: 'Calcium', value: '9.4', unit: 'mg/dL', range: '8.5 - 10.2', flag: 'normal' },
      { name: 'Total Protein', value: '7.1', unit: 'g/dL', range: '6.0 - 8.3', flag: 'normal' },
      { name: 'Albumin', value: '4.2', unit: 'g/dL', range: '3.5 - 5.5', flag: 'normal' },
      { name: 'Bilirubin (Total)', value: '0.8', unit: 'mg/dL', range: '0.1 - 1.2', flag: 'normal' },
      { name: 'Alkaline Phosphatase (ALP)', value: '68', unit: 'U/L', range: '44 - 147', flag: 'normal' },
      { name: 'Aspartate Aminotransferase (AST)', value: '22', unit: 'U/L', range: '10 - 40', flag: 'normal' },
      { name: 'Alanine Aminotransferase (ALT)', value: '28', unit: 'U/L', range: '7 - 56', flag: 'normal' },
    ],
  };

  return (
    <div className="w-full space-y-4" data-node-id="1:2908">
      {/* 1. Header with Title & Action Controls (Figma node 1:2911) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-[#e1e3e4]">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#191c1d]">
            {labReport.title}
          </h1>
          <p className="text-xs text-[#7a7583]">
            Patient: {labReport.patient} | ID: {labReport.reportId}
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

          <button
            type="button"
            onClick={() => window.print()}
            className="h-10 px-4 rounded-lg bg-white border border-[#cbc4d4] text-xs font-semibold text-[#191c1d] hover:bg-slate-50 transition-colors flex items-center gap-1.5 shadow-sm focus:outline-none"
          >
            <Download className="size-4 text-[#494552]" aria-hidden="true" />
            <span>Download PDF</span>
          </button>

          {/* Canonical Primary Action Button (Figma node 1:40) */}
          <button
            type="button"
            onClick={() => navigate('/patients/HV-884-291')}
            className="h-10 px-5 rounded-lg bg-gradient-to-b from-[#a44cff] to-[#5b14b8] text-white text-xs font-semibold hover:opacity-95 transition-all shadow-sm flex items-center gap-2 focus:outline-none"
          >
            <FolderOpen className="size-4" aria-hidden="true" />
            <span>Open Patient Record</span>
          </button>
        </div>
      </div>

      {/* 2. Main Split View: Left Document Panel (60%) / Right Clinical Bento (40%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (60%, Span 7): PDF Viewer Shell (Figma node 1:2941) */}
        <div className="lg:col-span-7 bg-[#f3f4f5] border border-[#cbc4d4] rounded-2xl p-4 shadow-sm overflow-hidden flex flex-col items-center">
          {/* Viewer Toolbar (Figma node 1:2942) */}
          <div className="w-full bg-white border border-[#cbc4d4] rounded-xl px-4 py-2 flex items-center justify-between text-xs text-[#494552] mb-4 shadow-xs">
            <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-lg px-2 py-0.5">
              <button
                type="button"
                onClick={() => setZoomLevel((prev) => Math.max(75, prev - 15))}
                className="p-1 hover:bg-slate-200/60 rounded"
              >
                <ZoomOut className="size-3.5" />
              </button>
              <span className="px-1.5 font-mono font-medium text-[#191c1d]">{zoomLevel}%</span>
              <button
                type="button"
                onClick={() => setZoomLevel((prev) => Math.min(150, prev + 15))}
                className="p-1 hover:bg-slate-200/60 rounded"
              >
                <ZoomIn className="size-3.5" />
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs font-medium text-[#191c1d]">
              <button type="button" className="p-1 hover:bg-slate-100 rounded">
                <ChevronLeft className="size-3.5" />
              </button>
              <span>Page 1 of 3</span>
              <button type="button" className="p-1 hover:bg-slate-100 rounded">
                <ChevronRight className="size-3.5" />
              </button>
            </div>

            <button
              type="button"
              onClick={() => setZoomLevel(100)}
              className="p-1.5 hover:bg-slate-100 rounded text-[#494552]"
            >
              <RotateCw className="size-3.5" />
            </button>
          </div>

          {/* White Paper Canvas */}
          <div
            className="w-full bg-white border border-slate-200 rounded-xl p-6 shadow-md space-y-4 text-xs text-[#191c1d] transition-transform"
            style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
          >
            {/* Header info bar */}
            <div className="flex items-center justify-between pb-3 border-b border-[#e1e3e4] text-xs">
              <div>
                <span className="font-bold text-[#191c1d] text-sm">CLIA Certified Laboratory Report</span>
                <div className="text-[11px] text-[#7a7583]">Central Clinical Labs Inc. • Lic #94D-2019482</div>
              </div>
              <div className="text-right">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#e0f7fa] text-[#00838f]">
                  <Check className="size-3 stroke-[3]" />
                  <span>Verified</span>
                </span>
                <div className="text-[11px] text-[#7a7583]">ACC: {labReport.accession}</div>
              </div>
            </div>

            {/* Table Data */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#cbc4d4] text-[#7a7583] font-semibold uppercase text-[11px]">
                    <th className="py-2.5 px-2">Analyte / Test</th>
                    <th className="py-2.5 px-2">Result</th>
                    <th className="py-2.5 px-2">Flag</th>
                    <th className="py-2.5 px-2">Reference Range</th>
                    <th className="py-2.5 px-2">Units</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {labReport.analytes.map((item, index) => (
                    <tr
                      key={index}
                      className={cn(
                        'hover:bg-slate-50/70 transition-colors',
                        item.flag === 'high' && 'bg-amber-50/40'
                      )}
                    >
                      <td className="py-2 px-2 font-medium text-[#191c1d]">{item.name}</td>
                      <td className={cn("py-2 px-2 font-bold", item.flag === 'high' ? "text-[#ba1a1a]" : "text-[#191c1d]")}>
                        {item.value}
                      </td>
                      <td className="py-2 px-2">
                        {item.flag === 'high' ? (
                          <span className="px-1.5 py-0.2 rounded font-bold text-[10px] bg-red-100 text-[#ba1a1a] inline-flex items-center gap-1">
                            <AlertTriangle className="size-2.5" />
                            HIGH
                          </span>
                        ) : (
                          <span className="text-slate-300 font-mono">-</span>
                        )}
                      </td>
                      <td className="py-2 px-2 text-[#494552]">{item.range}</td>
                      <td className="py-2 px-2 text-[#7a7583]">{item.unit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer Sign-off */}
            <div className="pt-4 border-t border-slate-200 text-center text-[10px] text-[#7a7583]">
              Electronically verified and signed by Dr. Sarah Jenkins, MD • Central Clinical Labs
            </div>
          </div>
        </div>

        {/* Right Column (40%, Span 5): Bento Info Cards & Interpretation */}
        <div className="lg:col-span-5 space-y-4">
          {/* Card 1: Clinical Summary & Critical Alert (Figma node 1:3038) */}
          <div className="bg-white border border-[#cbc4d4] rounded-2xl p-5 shadow-sm space-y-3.5">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-[#191c1d]">Clinical Summary</h2>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#e0f7fa] text-[#00838f]">
                <Check className="size-3 stroke-[3]" />
                <span>Verified</span>
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs border-y border-slate-100 py-2.5">
              <div>
                <div className="text-[10px] font-semibold text-[#7a7583] uppercase">COLLECTED DATE</div>
                <div className="font-medium text-[#191c1d]">{labReport.collectedDate}</div>
              </div>
              <div>
                <div className="text-[10px] font-semibold text-[#7a7583] uppercase">RESULT DATE</div>
                <div className="font-medium text-[#191c1d]">{labReport.resultDate}</div>
              </div>
            </div>

            {/* Critical Values Bento Alert */}
            <div className="bg-red-50/50 border-l-4 border-l-[#ba1a1a] border border-red-200 rounded-xl p-4 space-y-2.5">
              <div className="flex items-center gap-2 text-[#ba1a1a] font-bold text-xs">
                <AlertTriangle className="size-4" />
                <span>Critical Values Detected</span>
              </div>

              <div className="space-y-2 pt-1">
                <div className="p-2.5 bg-white rounded-lg border border-red-100 flex items-center justify-between">
                  <span className="text-xs font-medium text-[#191c1d]">Potassium</span>
                  <div className="text-right">
                    <span className="text-sm font-bold text-[#ba1a1a]">5.8 mEq/L</span>
                    <div className="text-[10px] text-[#7a7583]">Ref: 3.5 - 5.0</div>
                  </div>
                </div>

                <div className="p-2.5 bg-white rounded-lg border border-red-100 flex items-center justify-between">
                  <span className="text-xs font-medium text-[#191c1d]">Glucose (Fasting)</span>
                  <div className="text-right">
                    <span className="text-sm font-bold text-[#ba1a1a]">126 mg/dL</span>
                    <div className="text-[10px] text-[#7a7583]">Ref: 70 - 99</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Laboratory Info Card (Figma node 1:3063) */}
          <div className="bg-white border border-[#cbc4d4] rounded-2xl p-5 shadow-sm space-y-3 text-xs">
            <div className="flex items-center gap-2">
              <FlaskConical className="size-4 text-[#5b14b8]" aria-hidden="true" />
              <h3 className="text-sm font-bold text-[#191c1d]">Laboratory Info</h3>
            </div>
            <div className="space-y-2 pt-1">
              <div className="flex justify-between">
                <span className="text-[#7a7583]">Facility:</span>
                <span className="font-semibold text-[#191c1d]">{labReport.facility}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7a7583]">Director:</span>
                <span className="font-medium text-[#191c1d]">{labReport.director}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7a7583]">Specimen:</span>
                <span className="font-medium text-[#191c1d]">{labReport.specimen}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7a7583]">Order Provider:</span>
                <span className="font-medium text-[#191c1d]">{labReport.orderProvider}</span>
              </div>
            </div>
          </div>

          {/* Card 3: Clinical Notes Form (Figma node 1:3077) */}
          <div className="bg-white border border-[#cbc4d4] rounded-2xl p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#191c1d]">Clinical Notes</h3>
              <Edit2 className="size-3.5 text-[#7a7583]" />
            </div>

            <textarea
              rows={4}
              value={clinicalNotes}
              onChange={(e) => setClinicalNotes(e.target.value)}
              placeholder="Add interpretation or clinical notes here..."
              className="w-full p-3 rounded-lg bg-[#f8f9fa] border border-[#cbc4d4] text-xs text-[#191c1d] placeholder:text-[#7a7583] focus:outline-none focus:ring-2 focus:ring-[#5b14b8] resize-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default LabReportPage;
