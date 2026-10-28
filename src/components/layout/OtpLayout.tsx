import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import careidCardLogo from '@/assets/branding/careid-card-logo.png';
import careidOtpHero from '@/assets/illustrations/careid-otp-hero.png';

/**
 * OtpLayout - Authentic CareID Two-Factor Verification Screen
 * 
 * Source of Truth: Figma Canvas 0:1, Frame 1:79 ("Otp")
 * Frame Dimensions: 1280 × 1024 px
 * 
 * Distinctive Architecture:
 * - No top application header bar (unlike Login 1:2)
 * - Authentic CareID logo embedded directly inside the auth card (nodes 1:83 & 1:153)
 * - Left column: 576px width (45% ratio) with vertically centered card (node 1:80/1:81)
 * - Right column: 704px width (55% ratio) with deep navy/purple theme (node 1:141)
 * - 3D Clinical Security Shield illustration with DNA helix and telemetry (node 1:147)
 * - Left-aligned value proposition copy (node 1:148)
 */
export const OtpLayout: React.FC = () => {
  const navigate = useNavigate();
  const [otpValues, setOtpValues] = useState<string[]>(['', '', '', '', '', '']);

  const handleInputChange = (idx: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(-1);
    }
    const newOtp = [...otpValues];
    newOtp[idx] = value;
    setOtpValues(newOtp);

    // Auto-advance focus to next input
    if (value && idx < 5) {
      const nextInput = document.getElementById(`otp-input-${idx + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (idx: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpValues[idx] && idx > 0) {
      const prevInput = document.getElementById(`otp-input-${idx - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#f8f9fa] selection:bg-[#a44cff]/20 selection:text-[#28006d]">
      {/* Main Two-Column Layout (Figma Frame 1:79, 1280x1024) */}
      <div className="flex-1 flex flex-col lg:flex-row items-stretch justify-center max-w-[1440px] w-full mx-auto">
        {/* Left Column: Authentication Area (Figma node 1:80, 576x1024) */}
        <div
          className="w-full lg:w-[576px] lg:shrink-0 flex flex-col items-center justify-center p-6 sm:p-10 lg:p-12 relative self-stretch"
          style={{
            backgroundImage:
              'linear-gradient(125.99deg, #ffffff 0%, rgba(40, 0, 109, 0.05) 50%, rgba(0, 105, 113, 0.05) 100%)',
          }}
        >
          {/* Floating Verification Card (Figma node 1:81 "Background+Border", 480x526.5, at y=248.75) */}
          <div className="w-full max-w-[480px] lg:h-[526.5px] bg-white/95 backdrop-blur-[5px] rounded-[24px] border border-[rgba(203,196,212,0.2)] shadow-[0px_2px_32px_0px_rgba(40,0,109,0.08)] p-[41px]">
            {/* Embedded Logo inside Card (Figma node 1:83 / 1:153 "CareIDlogo 1", 398x40, gap=32px) */}
            <div className="flex justify-center h-10 mb-8">
              <img
                src={careidCardLogo}
                alt="CareID"
                className="h-10 w-auto max-w-[263px] object-contain select-none"
              />
            </div>

            {/* Title & Description (Figma node 1:84, height 120.5px, gap=32px) */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-semibold tracking-tight text-[#191c1d] leading-8">
                Verify Your Identity
              </h1>
              <p className="mt-3 text-base text-[#494552] leading-6 max-w-[340px] mx-auto">
                Enter the 6-digit verification code sent to your registered mobile number:
              </p>
              <p className="mt-1 text-base font-bold text-[#191c1d] tracking-wide leading-6">
                +1 ••••••4528
              </p>
            </div>

            {/* OTP Input Form (Figma node 1:91, height 220px) */}
            <form onSubmit={handleVerify} className="flex flex-col">
              {/* 6 Digit Inputs Container (Figma node 1:92, height 64px) */}
              <div className="flex items-center justify-between gap-2 sm:gap-2.5 h-16">
                {[0, 1, 2, 3, 4, 5].map((idx) => (
                  <input
                    key={idx}
                    id={`otp-input-${idx}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={otpValues[idx]}
                    onChange={(e) => handleInputChange(idx, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(idx, e)}
                    className="w-11 h-14 sm:w-14 sm:h-16 text-center text-2xl font-bold rounded-xl border border-[#cbc4d4] bg-white text-[#191c1d] focus:outline-none focus:ring-2 focus:ring-[#5b14b8]/30 focus:border-[#5b14b8] transition-colors"
                    aria-label={`Digit ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Action Container: Button + Resend (Figma node 1:111, height 124px, 32px gap from inputs) */}
              <div className="mt-8 flex flex-col">
                {/* Action Button (Figma node 1:112, height 56px) */}
                <button
                  type="submit"
                  className="w-full h-14 rounded-full text-white font-semibold text-base bg-gradient-to-b from-[#a44cff] to-[#5b14b8] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] flex items-center justify-center gap-2 hover:opacity-95 active:scale-[0.99] transition-all focus:outline-none focus:ring-2 focus:ring-[#5b14b8] focus:ring-offset-2"
                >
                  <span>Verify & Continue</span>
                  <ArrowRight className="size-4 stroke-[2.5]" aria-hidden="true" />
                </button>

                {/* Resend Link Container (Figma node 1:117, height 52px, 16px gap from button) */}
                <div className="mt-4 pt-2 text-center flex flex-col items-center">
                  <p className="text-sm text-[#494552] leading-5">
                    Resend available in <strong className="text-[#191c1d]">00:28</strong>
                  </p>
                  <button
                    type="button"
                    className="mt-1 text-sm font-semibold text-[#5b14b8] hover:underline transition-colors leading-5"
                  >
                    Resend OTP
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Footer (Figma node 1:123 "Footer Footer", height 40px, at y=960) */}
          <footer className="mt-8 lg:mt-0 lg:absolute lg:bottom-6 lg:left-0 lg:right-0 text-center text-xs font-medium text-[#494552] tracking-[0.3px] space-y-2">
            <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
              <span>© 2026 MedVault AI</span>
              <span className="text-slate-300">•</span>
              <a href="#privacy" className="hover:text-[#5b14b8] transition-colors">
                Privacy Policy
              </a>
              <span className="text-slate-300">•</span>
              <a href="#terms" className="hover:text-[#5b14b8] transition-colors">
                Terms of Service
              </a>
              <span className="text-slate-300">•</span>
              <span className="inline-flex items-center gap-1 text-[#006971] font-bold">
                <ShieldCheck className="size-3.5" aria-hidden="true" />
                <span>HIPAA Compliant</span>
              </span>
            </div>
          </footer>
        </div>

        {/* Right Column: Visual Brand Area with Deep Navy Theme (Figma node 1:141, 704x1024) */}
        <div
          className="hidden lg:flex flex-1 lg:w-[704px] flex-col justify-end p-12 lg:p-16 relative overflow-hidden self-stretch bg-[#0e0240] bg-cover bg-center"
          style={{
            backgroundImage: `url(${careidOtpHero})`,
          }}
        >
          {/* Value Prop Text Overlay - Left-Aligned matching Figma node 1:148 */}
          <div className="w-full max-w-[576px] space-y-4 px-2 pb-6 relative z-10">
            <h2 className="text-[32px] sm:text-[36px] font-bold tracking-tight text-white leading-[1.15] text-left">
              Enterprise–Grade<br />Clinical Security
            </h2>
            <p className="text-base font-normal text-white/80 leading-relaxed text-left max-w-[496px]">
              Your credentials are secured with state-of-the-art encryption, ensuring patient data integrity across the MedVault AI ecosystem.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};


