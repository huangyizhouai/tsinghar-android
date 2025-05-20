import React from 'react';
import { calculateRecoveryPercentage } from '@/lib/utils';
import { useLanguage } from '@/hooks/use-language';

interface RecoveryProgressRingProps {
  days: number;
  className?: string;
}

export default function RecoveryProgressRing({ days, className = '' }: RecoveryProgressRingProps) {
  const { t } = useLanguage();
  const progress = calculateRecoveryPercentage(days);
  const strokeWidth = 8;
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const dash = (progress * circumference) / 100;
  
  return (
    <div className={`${className} relative flex items-center justify-center`}>
      <svg 
        width="160" 
        height="160" 
        viewBox="0 0 160 160" 
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx="80"
          cy="80"
          r={radius}
          fill="transparent"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth={strokeWidth}
        />
        
        {/* Progress circle */}
        <circle
          cx="80"
          cy="80"
          r={radius}
          fill="transparent"
          stroke="url(#progressGradient)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={circumference - dash}
          strokeLinecap="round"
          className="drop-shadow-[0_0_10px_rgba(125,77,255,0.5)]"
        />
        
        {/* Gradient definition */}
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7d4dff" />
            <stop offset="100%" stopColor="#b68aff" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Center text */}
      <div className="absolute flex flex-col items-center justify-center text-center">
        <span className="text-3xl font-bold text-white">{progress}%</span>
        <span className="text-sm text-gray-300 uppercase">{t('recovery')}</span>
        <span className="text-gray-400 text-xs mt-1">
          {days} {t('days')} {t('streak')}
        </span>
      </div>
    </div>
  );
}