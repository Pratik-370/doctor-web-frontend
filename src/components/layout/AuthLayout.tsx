import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { ShieldCheck, Lock } from 'lucide-react';
import { Logo } from '@/components/shared/Logo';
import careidCloudMark from '@/assets/branding/careid-cloud-mark.png';
import { OtpLayout } from './OtpLayout';

export const AuthLayout: React.FC = () => {
  const location = useLocation();

  if (location.pathname === '/auth/verify-otp') {
    return <OtpLayout />;
  }

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#f8f9fa] selection:bg-[#a44cff]/20 selection:text-[#28006d]">
      {/* Top App Bar Header (Figma node 1:3 "Header - TopAppBar Fragmented Structure") */}
      <header className="h-20 border-b border-[rgba(203,196,212,0.3)] px-6 lg:px-12 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-20">
        <Link to="/auth/login" className="focus:outline-none focus:ring-2 focus:ring-[#5b14b8] rounded-md">
          <Logo size="lg" variant="auth" />
        </Link>

        <div className="flex flex-col items-end gap-0.5">
          <span className="text-base font-semibold text-[#191c1d] leading-6">
            Secure Clinical Workspace
          </span>
          <div className="flex items-center gap-1.5 text-sm font-medium text-[#006971] tracking-[0.1px] leading-5">
            <Lock className="size-3.5" aria-hidden="true" />
            <span>Encrypted Access</span>
          </div>
        </div>
      </header>

      {/* Main Content: Two-Column Layout (Figma node 1:13, 1280x793) */}
      <div className="flex-1 flex flex-col lg:flex-row items-stretch justify-center max-w-[1440px] w-full mx-auto">
        {/* Left Column: Auth Card Container (Figma node 1:14, 576x793, 45% ratio) */}
        <div
          className="w-full lg:w-[576px] lg:shrink-0 flex flex-col items-center justify-start pt-12 pb-12 px-6 sm:px-10 lg:px-12 self-stretch"
          style={{
            backgroundImage:
              'linear-gradient(125.99deg, #ffffff 0%, rgba(40, 0, 109, 0.05) 50%, rgba(0, 105, 113, 0.05) 100%)',
          }}
        >
          {/* Floating Auth Card (Figma node 1:15, 480x601 at x=48, y=128) */}
          <div className="w-full max-w-[480px] lg:h-[601px] bg-white/95 backdrop-blur-[5px] rounded-[24px] border border-[rgba(203,196,212,0.2)] shadow-[0px_2px_32px_0px_rgba(40,0,109,0.08)] p-[49px]">
            <Outlet />
          </div>

          {/* Footer Legal & Compliance Links (Figma node 1:50 / 1:51) */}
          <footer className="mt-12 text-center text-xs font-medium text-[#191c1d] tracking-[0.5px] space-y-2">
            <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
              <span>© 2026 Health Vault 360</span>
              <span className="text-slate-300">|</span>
              <a href="#privacy" className="hover:text-[#5b14b8] transition-colors">
                Privacy Policy
              </a>
              <span className="text-slate-300">|</span>
              <a href="#terms" className="hover:text-[#5b14b8] transition-colors">
                Terms of Service
              </a>
            </div>
            <div className="flex items-center justify-center gap-1.5 text-[#006971] font-bold">
              <ShieldCheck className="size-3.5" aria-hidden="true" />
              <span>HIPAA Compliant</span>
            </div>
          </footer>
        </div>

        {/* Right Column: Hero Graphic & Clinical Value Proposition (Figma node 1:65, 704x793, 55% ratio) */}
        <div
          className="hidden lg:flex flex-1 lg:w-[704px] flex-col items-center justify-center p-12 relative overflow-hidden self-stretch bg-[#edeeef]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 50% 50%, rgba(63, 29, 139, 0.1) 0%, rgba(63, 29, 139, 0) 70%), linear-gradient(131.6deg, rgba(40, 0, 109, 0.05) 0%, rgba(40, 0, 109, 0) 50%, rgba(0, 105, 113, 0.05) 100%)',
          }}
        >
          {/* Subtle Ambient Shader Elements (Figma nodes 1:70, 1:71) */}
          <div className="absolute top-10 right-14 size-32 rounded-full bg-[rgba(0,105,113,0.1)] blur-[32px] pointer-events-none" />
          <div className="absolute bottom-16 left-10 size-40 rounded-full bg-[rgba(40,0,109,0.1)] blur-[32px] pointer-events-none" />

          <div className="max-w-[560px] text-center space-y-8 relative z-10">
            {/* Authentic CareID Cloud Graphic (Figma node 1:72) */}
            <div className="flex justify-center">
              <img
                src={careidCloudMark}
                alt="CareID Cloud Workspace"
                className="w-full max-w-[540px] h-auto object-contain select-none"
              />
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl font-semibold tracking-tight text-[#28006d] leading-8">
                Secure Clinical Workspace
              </h2>
              <p className="text-base font-normal text-[#191c1d] leading-6 max-w-[500px] mx-auto">
                Streamline secure patient care and clinical productivity with instant access to protected medical records and intelligent diagnostics.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
