import React from 'react';
import careidLogo from '@/assets/branding/careid-logo.png';
import careidAuthLogo from '@/assets/branding/careid-auth-logo.png';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'portal' | 'auth';
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  variant = 'portal',
}) => {
  // Height mappings matching Figma TopNavBar (h-64px -> logo ~28-32px) and AuthHeader (h-80px -> logo ~48-56px)
  const sizeClasses = {
    sm: 'h-6 w-auto',
    md: 'h-8 w-auto',
    lg: variant === 'auth' ? 'h-[69px] w-auto max-w-[123px]' : 'h-12 w-auto',
  };

  const assetSrc = variant === 'auth' ? careidAuthLogo : careidLogo;

  return (
    <div className={`flex items-center select-none ${className}`}>
      <img
        src={assetSrc}
        alt="CareID Doctor Portal"
        className={`object-contain max-w-none ${sizeClasses[size]}`}
      />
    </div>
  );
};
