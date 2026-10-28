import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Activity,
  Calendar,
  CheckCircle2,
  Clock,
  FlaskConical,
  MapPin,
  RotateCw,
  SlidersHorizontal,
  TrendingDown,
  TriangleAlert,
  UserPlus,
  Users,
} from 'lucide-react';

interface SchedulePatient {
  id: string;
  time: string;
  isUpcoming?: boolean;
  initials: string;
  initialsBg: string;
  initialsColor: string;
  name: string;
  reason: string;
  status: 'In-Session' | 'Arrived' | 'Scheduled';
  statusBg: string;
  statusColor: string;
  dotColor: string;
  actionType: 'end-consult' | 'start-consult' | 'wait';
}

const SCHEDULE_DATA: SchedulePatient[] = [
  {
    id: 'p1',
    time: '09:30 AM',
    isUpcoming: true,
    initials: 'ER',
    initialsBg: '#28006d',
    initialsColor: '#ffffff',
    name: 'Eleanor Rigby',
    reason: 'Echocardiogram Follow-up',
    status: 'In-Session',
    statusBg: '#e0f7f6',
    statusColor: '#006971',
    dotColor: '#006971',
    actionType: 'end-consult',
  },
  {
    id: 'p2',
    time: '10:00 AM',
    initials: 'JD',
    initialsBg: '#e1e3e4',
    initialsColor: '#494552',
    name: 'John Doe',
    reason: 'Routine Checkup',
    status: 'Arrived',
    statusBg: '#ede7f6',
    statusColor: '#5b14b8',
    dotColor: '#5b14b8',
    actionType: 'start-consult',
  },
  {
    id: 'p3',
    time: '10:30 AM',
    initials: 'AS',
    initialsBg: '#e1e3e4',
    initialsColor: '#494552',
    name: 'Alice Smith',
    reason: 'Hypertension Review',
    status: 'Arrived',
    statusBg: '#ede7f6',
    statusColor: '#5b14b8',
    dotColor: '#5b14b8',
    actionType: 'start-consult',
  },
  {
    id: 'p4',
    time: '11:00 AM',
    initials: 'BW',
    initialsBg: '#e1e3e4',
    initialsColor: '#494552',
    name: 'Bruce Wayne',
    reason: 'Stress Test Consult',
    status: 'Scheduled',
    statusBg: '#f3f4f5',
    statusColor: '#494552',
    dotColor: '#7a7583',
    actionType: 'wait',
  },
  {
    id: 'p5',
    time: '11:30 AM',
    initials: 'CK',
    initialsBg: '#e1e3e4',
    initialsColor: '#494552',
    name: 'Clark Kent',
    reason: 'Post-Op Check',
    status: 'Scheduled',
    statusBg: '#f3f4f5',
    statusColor: '#494552',
    dotColor: '#7a7583',
    actionType: 'wait',
  },
];

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full">
      {/* 1. Header - Welcome Section & Quick Actions (Figma node 1:158) */}
      <section
        aria-label="Welcome and Quick Actions"
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 h-auto md:h-[67.5px]"
      >
        <div>
          <h1 className="text-2xl sm:text-[32px] font-bold text-[#191c1d] leading-10 tracking-[-0.8px]">
            Good Morning, Dr. Julian Vance
          </h1>
          <div className="flex items-center gap-2 text-sm text-[#494552] mt-1 font-medium">
            <span className="flex items-center gap-1.5">
              <Calendar className="size-4 text-[#494552]" aria-hidden="true" />
              <span>Thursday, Oct 26</span>
            </span>
            <span aria-hidden="true" className="text-[#cbc4d4]">•</span>
            <span className="flex items-center gap-1.5">
              <MapPin className="size-4 text-[#494552]" aria-hidden="true" />
              <span>Main Cardiology Wing</span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => navigate('/patients')}
            className="h-[38px] px-4 rounded-lg bg-white border border-[#cbc4d4] text-sm font-semibold text-[#191c1d] hover:bg-slate-50 transition-colors flex items-center gap-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#5b14b8]"
          >
            <UserPlus className="size-4 text-[#494552]" aria-hidden="true" />
            <span>Add New Patient</span>
          </button>

          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="h-[38px] px-4 rounded-lg bg-white border border-[#5b14b8] text-sm font-semibold text-[#5b14b8] hover:bg-purple-50 transition-colors flex items-center gap-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#5b14b8]"
          >
            <Calendar className="size-4 text-[#5b14b8]" aria-hidden="true" />
            <span>Schedule Appointment</span>
          </button>
        </div>
      </section>

      {/* 2. Key Performance Metrics - Bento Grid Style (Figma node 1:180) */}
      <section
        aria-label="Key Performance Metrics"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6"
      >
        {/* Metric 1: Today's Appointments */}
        <div className="relative bg-white rounded-2xl border border-[#e1e3e4] p-5 shadow-sm overflow-hidden flex flex-col justify-between h-[140px]">
          <div
            className="absolute -top-3 -right-3 size-24 rounded-full bg-[#5b14b8]/10 blur-xl pointer-events-none"
            aria-hidden="true"
          />
          <div className="flex items-start justify-between">
            <h2 className="text-sm font-medium text-[#494552] leading-snug max-w-[120px]">
              Today's Appointments
            </h2>
            <div className="size-8 rounded-full bg-[#28006d]/10 flex items-center justify-center shrink-0">
              <Users className="size-4 text-[#28006d]" aria-hidden="true" />
            </div>
          </div>
          <div className="flex items-end justify-between">
            <span className="text-3xl sm:text-[40px] font-bold text-[#191c1d] leading-none tracking-[-0.8px]">
              18
            </span>
            <span className="bg-[#76f1ff]/40 text-[#006971] text-xs font-semibold px-2.5 py-1 rounded">
              4 remaining
            </span>
          </div>
        </div>

        {/* Metric 2: Pending Lab Reviews */}
        <div className="relative bg-white rounded-2xl border border-[#e1e3e4] p-5 shadow-sm overflow-hidden flex flex-col justify-between h-[140px]">
          <div
            className="absolute -top-3 -right-3 size-24 rounded-full bg-[#006971]/10 blur-xl pointer-events-none"
            aria-hidden="true"
          />
          <div className="flex items-start justify-between">
            <h2 className="text-sm font-medium text-[#494552] leading-snug max-w-[120px]">
              Pending Lab Reviews
            </h2>
            <div className="size-8 rounded-full bg-[#006971]/10 flex items-center justify-center shrink-0">
              <FlaskConical className="size-4 text-[#006971]" aria-hidden="true" />
            </div>
          </div>
          <div className="flex items-end justify-between">
            <span className="text-3xl sm:text-[40px] font-bold text-[#191c1d] leading-none tracking-[-0.8px]">
              5
            </span>
            <span className="text-xs font-medium text-[#494552] pb-0.5">
              2 high priority
            </span>
          </div>
        </div>

        {/* Metric 3: Critical Alerts */}
        <div className="relative bg-white rounded-2xl border border-[#e1e3e4] p-5 shadow-sm overflow-hidden flex flex-col justify-between h-[140px]">
          <div
            className="absolute -top-3 -right-3 size-24 rounded-full bg-[#ba1a1a]/10 blur-xl pointer-events-none"
            aria-hidden="true"
          />
          <div className="flex items-start justify-between">
            <h2 className="text-sm font-medium text-[#ba1a1a] leading-snug">
              Critical Alerts
            </h2>
            <div className="size-8 rounded-full bg-[#ba1a1a]/10 flex items-center justify-center shrink-0">
              <TriangleAlert className="size-4 text-[#ba1a1a]" aria-hidden="true" />
            </div>
          </div>
          <div className="flex items-end justify-between">
            <span className="text-3xl sm:text-[40px] font-bold text-[#ba1a1a] leading-none tracking-[-0.8px]">
              2
            </span>
            <span className="bg-[#ba1a1a] text-white text-xs font-semibold px-2.5 py-1 rounded">
              Requires Action
            </span>
          </div>
        </div>

        {/* Metric 4: Avg. Consult Time */}
        <div className="relative bg-white rounded-2xl border border-[#e1e3e4] p-5 shadow-sm overflow-hidden flex flex-col justify-between h-[140px]">
          <div
            className="absolute -top-3 -right-3 size-24 rounded-full bg-slate-200/50 blur-xl pointer-events-none"
            aria-hidden="true"
          />
          <div className="flex items-start justify-between">
            <h2 className="text-sm font-medium text-[#494552] leading-snug">
              Avg. Consult Time
            </h2>
            <div className="size-8 rounded-full bg-[#f3f4f5] flex items-center justify-center shrink-0">
              <Clock className="size-4 text-[#494552]" aria-hidden="true" />
            </div>
          </div>
          <div className="flex items-end justify-between">
            <div className="flex items-baseline gap-1">
              <span className="text-3xl sm:text-[40px] font-bold text-[#191c1d] leading-none tracking-[-0.8px]">
                14
              </span>
              <span className="text-sm font-medium text-[#494552]">min</span>
            </div>
            <span className="flex items-center gap-1 text-xs font-semibold text-[#5b14b8] pb-0.5">
              <TrendingDown className="size-3.5" aria-hidden="true" />
              <span>-2m vs yesterday</span>
            </span>
          </div>
        </div>
      </section>

      {/* 3. Main Content Grid (Figma node 1:234) */}
      <section
        aria-label="Clinical Operations"
        className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4 items-start"
      >
        {/* Left: Today's Clinical Schedule (Figma node 1:235) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-[#e1e3e4] shadow-sm flex flex-col h-[500px]">
          {/* Schedule Header */}
          <div className="px-5 py-4 border-b border-[#e1e3e4] flex items-center justify-between">
            <h3 className="text-lg font-bold text-[#191c1d]">
              Today's Schedule
            </h3>
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="text-xs font-semibold text-[#5b14b8] hover:underline cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#5b14b8] rounded"
            >
              View Full Calendar
            </button>
          </div>

          {/* Schedule Table */}
          <div className="p-5 flex-1 overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[560px]">
              <thead>
                <tr className="border-b border-[#e1e3e4]/60 text-xs font-semibold text-[#7a7583]">
                  <th scope="col" className="py-2.5 font-medium w-[96px]">Time</th>
                  <th scope="col" className="py-2.5 font-medium w-[130px]">Patient</th>
                  <th scope="col" className="py-2.5 font-medium">Reason</th>
                  <th scope="col" className="py-2.5 font-medium w-[100px]">Status</th>
                  <th scope="col" className="py-2.5 font-medium text-right w-[110px]">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {SCHEDULE_DATA.map((row) => (
                  <tr key={row.id} className="h-[49px] hover:bg-slate-50/60 transition-colors">
                    {/* Time */}
                    <td className="py-1">
                      <span
                        className={
                          row.isUpcoming
                            ? 'font-semibold text-[#5b14b8]'
                            : 'text-[#494552]'
                        }
                      >
                        {row.time}
                      </span>
                    </td>

                    {/* Patient */}
                    <td className="py-1">
                      <div className="flex items-center gap-2.5">
                        <div
                          style={{ backgroundColor: row.initialsBg, color: row.initialsColor }}
                          className="size-6 rounded-full text-[11px] font-bold flex items-center justify-center shrink-0"
                          aria-hidden="true"
                        >
                          {row.initials}
                        </div>
                        <span className="font-semibold text-[#191c1d] whitespace-nowrap">
                          {row.name}
                        </span>
                      </div>
                    </td>

                    {/* Reason (multi-line wrapping allowed per Figma geometry) */}
                    <td className="py-1 text-[#494552] text-xs sm:text-sm leading-tight pr-2">
                      {row.reason}
                    </td>

                    {/* Status */}
                    <td className="py-1">
                      <span
                        style={{ backgroundColor: row.statusBg, color: row.statusColor }}
                        className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap"
                      >
                        <span
                          style={{ backgroundColor: row.dotColor }}
                          className="size-1.5 rounded-full"
                          aria-hidden="true"
                        />
                        {row.status}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="py-1 text-right">
                      <div className="flex justify-end">
                        {row.actionType === 'end-consult' && (
                          <button
                            type="button"
                            className="w-[100px] h-[26px] rounded border border-[#ba1a1a] text-[#ba1a1a] hover:bg-red-50 text-xs font-semibold flex items-center justify-center transition-colors focus:outline-none focus:ring-1 focus:ring-[#ba1a1a]"
                          >
                            End Consult
                          </button>
                        )}
                        {row.actionType === 'start-consult' && (
                          <button
                            type="button"
                            className="w-[104px] h-[36px] rounded bg-[#28006d] hover:bg-[#3f1d8b] text-white text-xs font-semibold leading-tight flex flex-col items-center justify-center transition-colors focus:outline-none focus:ring-1 focus:ring-[#28006d]"
                          >
                            <span>Start</span>
                            <span>Consult</span>
                          </button>
                        )}
                        {row.actionType === 'wait' && (
                          <button
                            type="button"
                            className="w-[54px] h-[26px] rounded border border-[#cbc4d4] text-[#494552] hover:bg-slate-50 text-xs font-semibold flex items-center justify-center transition-colors focus:outline-none focus:ring-1 focus:ring-[#cbc4d4]"
                          >
                            Wait
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Recent Labs (Figma node 1:341) */}
        <div className="relative">
          {/* 500px Card Shell with Header, Items 1-3, and Pinned Footer */}
          <div className="bg-white rounded-2xl border border-[#e1e3e4] shadow-sm flex flex-col h-[500px] relative">
            {/* Labs Header */}
            <div className="px-5 py-4 border-b border-[#e1e3e4] flex items-center justify-between bg-white rounded-t-2xl z-10">
              <h3 className="text-lg font-bold text-[#191c1d]">
                Recent Labs
              </h3>
              <button
                type="button"
                aria-label="Filter lab results"
                className="p-1 rounded text-[#494552] hover:bg-slate-100 transition-colors focus:outline-none focus:ring-1 focus:ring-[#5b14b8]"
              >
                <SlidersHorizontal className="size-4" aria-hidden="true" />
              </button>
            </div>

            {/* Labs Feed Items 1 to 3 */}
            <div className="p-2 space-y-2 relative flex-1">
              {/* Lab 1: Lipid Panel */}
              <div className="rounded-xl p-3 border border-[#ffdad6] bg-[#fff8f7] space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-sm font-bold text-[#191c1d]">
                    <svg className="size-3.5 text-[#ba1a1a] fill-current shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 2a1 1 0 0 1 1 1v5.586l3.95-3.95a1 1 0 1 1 1.414 1.414L14.414 10H20a1 1 0 1 1 0 2h-5.586l3.95 3.95a1 1 0 0 1-1.414 1.414L13 13.414V19a1 1 0 1 1-2 0v-5.586l-3.95 3.95a1 1 0 0 1-1.414-1.414L9.586 12H4a1 1 0 1 1 0-2h5.586L5.636 6.05a1 1 0 0 1 1.414-1.414L11 8.586V3a1 1 0 0 1 1-1z" />
                    </svg>
                    <span>Lipid Panel</span>
                  </div>
                  <span className="text-xs text-[#7a7583]">10 mins ago</span>
                </div>
                <p className="text-xs text-[#494552] leading-relaxed">
                  Patient: Marcus Johnson • Abnormal LDL levels detected.
                </p>
                <div className="flex justify-end pt-1">
                  <button
                    type="button"
                    className="px-3 py-1 rounded text-xs font-semibold border border-[#ba1a1a] text-[#ba1a1a] hover:bg-red-50 transition-colors focus:outline-none focus:ring-1 focus:ring-[#ba1a1a]"
                  >
                    Review Critical
                  </button>
                </div>
              </div>

              {/* Lab 2: Holter Monitor */}
              <div className="rounded-xl p-3 border border-[#e1e3e4] bg-white space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-sm font-bold text-[#191c1d]">
                    <CheckCircle2 className="size-4 text-[#006971]" aria-hidden="true" />
                    <span>Holter Monitor</span>
                  </div>
                  <span className="text-xs text-[#7a7583]">1 hr ago</span>
                </div>
                <p className="text-xs text-[#494552] leading-relaxed">
                  Patient: Sarah Connor • 24hr recording normal.
                </p>
                <div className="flex justify-end pt-1">
                  <button
                    type="button"
                    className="px-3 py-1 rounded text-xs font-semibold border border-[#5b14b8] text-[#5b14b8] hover:bg-purple-50 transition-colors focus:outline-none focus:ring-1 focus:ring-[#5b14b8]"
                  >
                    View Report
                  </button>
                </div>
              </div>

              {/* Lab 3: ECG Standard (partially covered by pinned footer per Figma 1:369/1:395) */}
              <div className="rounded-xl p-3 border border-[#e1e3e4] bg-white space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-sm font-bold text-[#191c1d]">
                    <Activity className="size-4 text-[#5b14b8]" aria-hidden="true" />
                    <span>ECG Standard</span>
                  </div>
                  <span className="text-xs text-[#7a7583]">2 hrs ago</span>
                </div>
                <p className="text-xs text-[#494552] leading-relaxed">
                  Patient: Tom Hanks • Processed by tech, awaits sign-off.
                </p>
              </div>
            </div>

            {/* Labs Footer - pinned at bottom of 500px card */}
            <div className="absolute bottom-0 inset-x-0 h-[65px] px-4 border-t border-[#e1e3e4] bg-white rounded-b-2xl flex items-center justify-center z-10">
              <button
                type="button"
                onClick={() => navigate('/records/labs')}
                className="text-xs font-semibold text-[#5b14b8] hover:underline flex items-center justify-center gap-2 focus:outline-none focus:ring-1 focus:ring-[#5b14b8] rounded py-1 px-2"
              >
                <RotateCw className="size-3.5 text-[#5b14b8]" aria-hidden="true" />
                <span>View All Processed Labs</span>
              </button>
            </div>
          </div>

          {/* Fourth Lab Item: Blood Panel (Basic) - Extending beyond card boundary per Figma node 1:382 */}
          <div className="mt-1 px-2">
            <div className="rounded-xl p-3 border border-[#e1e3e4] bg-white shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-sm font-bold text-[#191c1d]">
                  <Activity className="size-4 text-[#5b14b8]" aria-hidden="true" />
                  <span>Blood Panel (Basic)</span>
                </div>
                <span className="text-xs text-[#7a7583]">3 hrs ago</span>
              </div>
              <p className="text-xs text-[#494552] leading-relaxed">
                Patient: Emma Stone • Processed by lab, awaits sign-off.
              </p>
              <div className="flex justify-end pt-1">
                <button
                  type="button"
                  className="px-3 py-1 rounded text-xs font-semibold border border-[#5b14b8] text-[#5b14b8] hover:bg-purple-50 transition-colors focus:outline-none focus:ring-1 focus:ring-[#5b14b8]"
                >
                  Review
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
