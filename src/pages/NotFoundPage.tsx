import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AlertCircle,
  ArrowLeft,
  FileQuestion,
  LayoutDashboard,
  Users,
} from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div
      data-testid="clinical-not-found-page"
      className="w-full min-h-[calc(100vh-140px)] flex items-center justify-center p-6 bg-[#f8f9fa]"
    >
      <div className="max-w-xl w-full bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-10 shadow-sm text-center space-y-6 animate-in fade-in zoom-in-95">
        {/* Visual Error Badge */}
        <div className="mx-auto size-20 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center text-[#5b14b8] shadow-inner">
          <FileQuestion className="size-10 stroke-[1.75]" />
        </div>

        {/* Heading & Error Code */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold font-mono">
            <span>HTTP 404 • ROUTE UNRECOGNIZED</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Clinical Resource Not Found
          </h1>
          <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
            The requested clinical workstation, patient route, or diagnostic destination does not exist or has been relocated within the CareID portal.
          </p>
        </div>

        {/* Attempted Path Metadata Box */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-xs text-left space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="font-medium">Attempted Path:</span>
            <span className="font-mono font-bold text-[#5b14b8] bg-purple-50 px-2 py-0.5 rounded border border-purple-100">
              {location.pathname}
            </span>
          </div>
          <div className="flex items-center justify-between text-slate-400 text-[11px]">
            <span>System Timestamp:</span>
            <span className="font-mono">{new Date().toISOString()}</span>
          </div>
          <div className="pt-2 border-t border-slate-200/60 text-[11px] text-slate-500 flex items-start gap-1.5">
            <AlertCircle className="size-3.5 text-amber-600 shrink-0 mt-0.5" />
            <span>
              If you followed a clinical deep link, ensure the patient MRN, referral ID, or offer token is registered in the demonstration database.
            </span>
          </div>
        </div>

        {/* Navigation Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto h-11 px-5 rounded-full border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <ArrowLeft className="size-4" />
            <span>Go Back</span>
          </button>

          <button
            type="button"
            onClick={() => navigate('/patients')}
            className="w-full sm:w-auto h-11 px-5 rounded-full border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Users className="size-4" />
            <span>Patient Directory</span>
          </button>

          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="w-full sm:w-auto h-11 px-6 rounded-full bg-gradient-to-b from-[#a44cff] to-[#5b14b8] hover:opacity-95 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer"
          >
            <LayoutDashboard className="size-4" />
            <span>Return to Dashboard</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
