import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, ShieldCheck } from 'lucide-react';

export const ReferralSuccessPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center select-none animate-in fade-in zoom-in-95 duration-300">
      {/* Decorative Radial Background */}
      <div className="relative max-w-xl w-full flex flex-col items-center">
        {/* Subtle blur glow behind rings */}
        <div
          aria-hidden="true"
          className="absolute -top-12 size-72 rounded-full bg-cyan-200/30 blur-3xl pointer-events-none"
        />

        {/* Concentric Pulse Rings with Verified Checkmark */}
        <div className="relative size-36 flex items-center justify-center mb-6">
          {/* Ring 1 (Outer) */}
          <div className="absolute inset-0 rounded-full border border-teal-200/60 animate-pulse" />

          {/* Ring 2 (Middle) */}
          <div className="absolute inset-3 rounded-full border-2 border-teal-300/70" />

          {/* Ring 3 (Inner cyan disc) */}
          <div className="absolute inset-6 rounded-full bg-[#5af8fb] flex items-center justify-center shadow-lg shadow-teal-500/10">
            {/* Center dark teal circle */}
            <div className="size-11 rounded-full bg-[#0a7a8c] flex items-center justify-center text-white shadow-inner">
              <Check className="size-5 stroke-[3]" />
            </div>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Referral Successfully Sent
        </h1>

        {/* Subtitle / Description */}
        <p className="mt-3 text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
          Receiving physician has been notified. The patient's medical records and
          consultation notes have been securely attached.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => navigate('/referrals')}
            className="w-full sm:w-auto px-6 py-2.5 rounded-full border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-xs"
          >
            <ArrowLeft className="size-3.5" />
            <span>Return to Referrals</span>
          </button>

          <button
            type="button"
            onClick={() => navigate('/referrals/REF-2023-8910')}
            className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-gradient-to-r from-[#8b3dff] to-[#6d28d9] hover:opacity-95 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99]"
          >
            <span>View Referral Details</span>
            <ArrowRight className="size-3.5" />
          </button>
        </div>

        {/* Reference ID Footer */}
        <div className="mt-8 flex items-center gap-1.5 text-xs text-slate-400 font-mono">
          <ShieldCheck className="size-3.5 text-slate-400" />
          <span>Ref ID: #R-2023-8894A</span>
        </div>
      </div>
    </div>
  );
};

