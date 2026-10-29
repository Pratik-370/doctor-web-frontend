import React from 'react';
import {
  Clock,
  Download,
  Hospital,
  Plus,
} from 'lucide-react';

export const PrescriptionsPage: React.FC = () => {
  const prescriptions = [
    {
      id: 'RX-9402',
      medicine: 'Lisinopril',
      dose: '10 mg',
      frequency: 'Once Daily',
      duration: '90 Days',
      status: 'Active',
      statusType: 'active',
      prescriber: 'Dr. Julian Vance',
    },
    {
      id: 'RX-9120',
      medicine: 'Metformin',
      dose: '500 mg',
      frequency: 'Twice Daily',
      duration: '180 Days',
      status: 'Active',
      statusType: 'active',
      prescriber: 'Dr. Julian Vance',
    },
    {
      id: 'RX-8841',
      medicine: 'Amoxicillin',
      dose: '250 mg',
      frequency: 'Three Times Daily',
      duration: '7 Days',
      status: 'Completed',
      statusType: 'completed',
      prescriber: 'Dr. Sarah Jenkins',
    },
  ];

  return (
    <div className="w-full space-y-6" data-node-id="1:6396">
      {/* 1. Header Bar with Patient Context & Actions (Figma node 1:6418) */}
      <div className="space-y-3 pb-2 border-b border-[#e1e3e4]">
        <div className="text-sm font-medium text-[#191c1d]">
          Patient Medical Record: Eleanor Vance (ID: #84920)
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#191c1d] leading-tight">
              Prescription & Clinical History
            </h1>
            <p className="text-xs text-[#7a7583]">
              Comprehensive chronological timeline and active treatments.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => window.print()}
              className="h-10 px-4 rounded-lg bg-white border border-[#cbc4d4] text-xs font-semibold text-[#191c1d] hover:bg-slate-50 transition-colors flex items-center gap-2 shadow-sm focus:outline-none"
            >
              <Download className="size-4 text-[#494552]" aria-hidden="true" />
              <span>Export Record</span>
            </button>

            {/* Canonical Primary Action Button (Figma node 1:40) */}
            <button
              type="button"
              className="h-10 px-5 rounded-lg bg-gradient-to-b from-[#a44cff] to-[#5b14b8] text-white text-xs font-semibold hover:opacity-95 transition-all shadow-sm flex items-center gap-1.5 focus:outline-none"
            >
              <Plus className="size-4 stroke-[2.5]" aria-hidden="true" />
              <span>New Entry</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main 2-Column Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (Span 8): Prescriptions Table + Clinical SOAP Notes */}
        <div className="lg:col-span-8 space-y-6">
          {/* Section: Prescription History Table Card (Figma node 1:6435) */}
          <section
            aria-label="Prescription History Table"
            className="bg-white border border-[#cbc4d4] rounded-2xl p-5 shadow-sm space-y-4 overflow-hidden"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="size-5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center text-xs font-bold">
                  +
                </span>
                <h2 className="text-base font-bold text-[#191c1d]">Prescription History</h2>
              </div>
              <button
                type="button"
                className="text-xs font-semibold text-[#00838f] hover:underline"
              >
                View All
              </button>
            </div>

            <div className="overflow-x-auto -mx-5 px-5">
              <table className="w-full text-left border-collapse min-w-[620px]">
                <thead>
                  <tr className="border-b border-[#e1e3e4] text-xs font-medium text-[#7a7583]">
                    <th className="py-2.5 px-3">Medicine</th>
                    <th className="py-2.5 px-3">Dose</th>
                    <th className="py-2.5 px-3">Frequency</th>
                    <th className="py-2.5 px-3">Duration</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3">Prescribed By</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {prescriptions.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-3 font-semibold text-[#191c1d]">
                        {item.medicine}
                      </td>
                      <td className="py-3 px-3 text-[#191c1d]">{item.dose}</td>
                      <td className="py-3 px-3 text-[#494552]">{item.frequency}</td>
                      <td className="py-3 px-3 text-[#494552]">{item.duration}</td>
                      <td className="py-3 px-3">
                        {item.statusType === 'active' ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#e0f7fa] text-[#00838f]">
                            <span className="size-1.5 rounded-full bg-[#00838f]" />
                            <span>Active</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600">
                            <span>✓ Completed</span>
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-3 text-[#494552]">{item.prescriber}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Section: Clinical Timeline & SOAP Notes (Figma node 1:6505) */}
          <section
            aria-label="Clinical SOAP Notes"
            className="bg-white border border-[#cbc4d4] rounded-2xl p-5 shadow-sm space-y-5"
          >
            <div className="flex items-center gap-2 pb-2">
              <Clock className="size-4.5 text-[#191c1d]" aria-hidden="true" />
              <h2 className="text-base font-bold text-[#191c1d]">Clinical Timeline & Notes</h2>
            </div>

            <div className="space-y-4">
              {/* Note 1: Routine Checkup */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-[#5b14b8]" />
                    <span className="font-bold text-[#191c1d]">Routine Checkup</span>
                  </div>
                  <span className="text-[#7a7583]">Oct 24, 2023 • Dr. E. Chen</span>
                </div>

                <div className="p-4 rounded-xl border border-[#e1e3e4] bg-[#fbfcfd] space-y-2 text-xs text-[#191c1d] leading-relaxed">
                  <p><strong className="text-[#191c1d]">S:</strong> Patient reports stable energy levels. No major complaints since last visit.</p>
                  <p><strong className="text-[#191c1d]">O:</strong> BP managed at 120/80. Heart rate 72 bpm. Weight stable.</p>
                  <p><strong className="text-[#191c1d]">A:</strong> Hypertension well controlled on current regimen.</p>
                  <p className="text-[#00838f] font-semibold"><strong className="text-[#00838f]">P:</strong> Plan: Continue current medication (Lisinopril 10mg) and follow up in 3 months.</p>
                </div>
              </div>

              {/* Note 2: Telehealth Consultation */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-slate-300" />
                    <span className="font-bold text-[#191c1d]">Telehealth Consultation</span>
                  </div>
                  <span className="text-[#7a7583]">Aug 12, 2023 • Dr. R. Smith</span>
                </div>

                <div className="p-4 rounded-xl border border-[#e1e3e4] bg-[#fbfcfd] space-y-2 text-xs text-[#191c1d] leading-relaxed">
                  <p><strong className="text-[#191c1d]">S:</strong> Patient called regarding mild nausea persisting for 2 days.</p>
                  <p><strong className="text-[#191c1d]">P:</strong> Advised rest, clear fluids. Monitor symptoms and visit clinic if worsening.</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column (Span 4): Hospital Admissions Card (Figma node 1:6558) */}
        <aside className="lg:col-span-4" aria-label="Hospital Admissions">
          <div className="bg-white border border-[#cbc4d4] rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <span className="size-5 rounded bg-rose-50 text-[#ba1a1a] border border-rose-200 flex items-center justify-center text-xs font-bold">
                +
              </span>
              <h2 className="text-base font-bold text-[#191c1d]">Hospital Admissions</h2>
            </div>

            <div className="border border-dashed border-[#cbc4d4] rounded-xl p-8 flex flex-col items-center justify-center text-center space-y-3 min-h-[380px]">
              <div className="size-14 rounded-full bg-slate-100 flex items-center justify-center text-[#7a7583]">
                <Hospital className="size-7 text-[#7a7583]" />
              </div>
              <h3 className="text-sm font-bold text-[#191c1d]">No Recent Admissions</h3>
              <p className="text-xs text-[#7a7583] max-w-[220px] leading-relaxed">
                There are no hospital admissions recorded for this patient in the system.
              </p>
              <button
                type="button"
                className="text-xs font-semibold text-[#00838f] hover:underline pt-2 focus:outline-none"
              >
                + Add Manual Record
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
export default PrescriptionsPage;
