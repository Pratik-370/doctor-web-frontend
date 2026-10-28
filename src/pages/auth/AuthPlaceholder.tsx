import React, { useState } from 'react';
import { ArrowRight, ChevronDown, Lock, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface AuthPlaceholderProps {
  title: string;
  subtitle: string;
  buttonText?: string;
  nextRoute?: string;
  nodeId?: string;
}

const COUNTRY_OPTIONS = [
  { name: 'United States', code: '+1' },
  { name: 'United Kingdom', code: '+44' },
  { name: 'Canada', code: '+1' },
  { name: 'Australia', code: '+61' },
  { name: 'India', code: '+91' },
  { name: 'Germany', code: '+49' },
];

export const AuthPlaceholder: React.FC<AuthPlaceholderProps> = ({
  title,
  subtitle,
  buttonText = 'Request OTP',
  nextRoute = '/auth/verify-otp',
  nodeId = '1:2',
}) => {
  const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = useState(COUNTRY_OPTIONS[0]);
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [mobileNumber, setMobileNumber] = useState('');

  const isOtpScreen = nodeId === '1:79';

  return (
    <div className="flex flex-col">
      {/* Title & Context Header (Figma node 1:16, height 68px) */}
      <div className="space-y-3">
        <h1 className="text-2xl font-semibold tracking-tight text-[#191c1d] leading-8">
          {title}
        </h1>
        <p className="text-base text-[#191c1d] leading-6">
          {subtitle}
        </p>
      </div>

      {/* Form Fields Container (Figma node 1:21, height 306px, 40px gap from header) */}
      <div className="mt-10 pt-2 space-y-8">
        {isOtpScreen ? (
          /* OTP 6-Digit Code Input Section (Figma node 1:79) */
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-2 sm:gap-3">
              {[0, 1, 2, 3, 4, 5].map((idx) => (
                <input
                  key={idx}
                  type="text"
                  maxLength={1}
                  placeholder="•"
                  className="w-12 h-14 sm:w-14 sm:h-16 text-center text-xl font-bold rounded-xl border border-[#cbc4d4] bg-white text-[#191c1d] focus:outline-none focus:ring-2 focus:ring-[#5b14b8]/30 focus:border-[#5b14b8] transition-colors"
                />
              ))}
            </div>
            <div className="flex items-center justify-between text-xs text-[#494552] pt-1">
              <span>Resend available in <strong className="text-[#191c1d]">00:28</strong></span>
              <button type="button" className="font-semibold text-[#5b14b8] hover:underline">
                Resend OTP
              </button>
            </div>
          </div>
        ) : (
          /* Standard Login Form Fields (Figma node 1:2) */
          <>
            {/* Country Selector (Figma node 1:22 "Country Selector Simulated", height 88px) */}
            <div className="space-y-3">
              <label
                htmlFor="auth-country-select"
                className="block text-sm font-medium text-[#191c1d] tracking-[0.1px] pl-1 leading-5"
              >
                Country
              </label>
              <div className="relative">
                <button
                  id="auth-country-select"
                  type="button"
                  aria-haspopup="listbox"
                  aria-expanded={isCountryOpen}
                  onClick={() => setIsCountryOpen((prev) => !prev)}
                  className="w-full h-14 px-4 bg-white border border-[#cbc4d4] rounded-xl flex items-center justify-between text-left text-base text-[#191c1d] focus:outline-none focus:ring-2 focus:ring-[#5b14b8]/30 focus:border-[#5b14b8] transition-colors"
                >
                  <span className="font-normal">{selectedCountry.name} ({selectedCountry.code})</span>
                  <ChevronDown
                    className={cn(
                      'size-5 text-[#494552] transition-transform duration-200',
                      isCountryOpen && 'rotate-180'
                    )}
                    aria-hidden="true"
                  />
                </button>

                {isCountryOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-20"
                      onClick={() => setIsCountryOpen(false)}
                      aria-hidden="true"
                    />
                    <ul
                      role="listbox"
                      aria-label="Select Country"
                      className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-[#cbc4d4] rounded-xl shadow-lg z-30 py-1 max-h-56 overflow-y-auto"
                    >
                      {COUNTRY_OPTIONS.map((country) => (
                        <li
                          key={country.name}
                          role="option"
                          aria-selected={selectedCountry.name === country.name}
                          onClick={() => {
                            setSelectedCountry(country);
                            setIsCountryOpen(false);
                          }}
                          className={cn(
                            'px-4 py-2.5 text-sm cursor-pointer transition-colors flex items-center justify-between',
                            selectedCountry.name === country.name
                              ? 'bg-purple-50 text-[#5b14b8] font-medium'
                              : 'text-[#191c1d] hover:bg-slate-50'
                          )}
                        >
                          <span>{country.name}</span>
                          <span className="text-[#494552] text-xs">{country.code}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>

            {/* Registered Mobile Number Input (Figma node 1:31 "Mobile Number Input", height 90px) */}
            <div className="space-y-3">
              <label
                htmlFor="auth-mobile-number"
                className="block text-sm font-medium text-[#191c1d] tracking-[0.1px] pl-1 leading-5"
              >
                Registered Mobile Number
              </label>
              <div className="relative h-[58px] bg-white border border-[#cbc4d4] rounded-xl flex items-center focus-within:ring-2 focus-within:ring-[#5b14b8]/30 focus-within:border-[#5b14b8] transition-colors">
                <div className="absolute left-4 flex items-center pointer-events-none text-[#7a7583]">
                  <Phone className="size-[18px]" aria-hidden="true" />
                </div>
                <input
                  id="auth-mobile-number"
                  type="tel"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  placeholder="000 000 0000"
                  className="w-full h-full pl-12 pr-4 rounded-xl bg-transparent text-base text-[#191c1d] placeholder:text-[#cbc4d4] placeholder:tracking-[1.6px] outline-none"
                />
              </div>
            </div>
          </>
        )}

        {/* Primary Action Button (Figma node 1:40 "Button - Primary Action", height 56px) */}
        <button
          type="button"
          onClick={() => navigate(nextRoute)}
          className={cn(
            'w-full h-14 rounded-full text-white font-semibold text-base',
            'bg-gradient-to-b from-[#a44cff] to-[#5b14b8]',
            'shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]',
            'flex items-center justify-center gap-2 hover:opacity-95 active:scale-[0.99] transition-all',
            'focus:outline-none focus:ring-2 focus:ring-[#5b14b8] focus:ring-offset-2'
          )}
        >
          <span>{buttonText}</span>
          <ArrowRight className="size-4 stroke-[2.5]" aria-hidden="true" />
        </button>
      </div>

      {/* Security Note Footer (Figma node 1:45 "Card Footer", height 49px, 40px gap from form) */}
      <div className="mt-10 pt-[33px] border-t border-[rgba(203,196,212,0.3)] flex items-center justify-center gap-2 text-xs font-medium text-[#191c1d] tracking-[0.5px] leading-4">
        <Lock className="size-3.5 text-[#191c1d] shrink-0" aria-hidden="true" />
        <span>Your login is protected using encrypted authentication.</span>
      </div>
    </div>
  );
};
