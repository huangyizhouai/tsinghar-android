import React from 'react';
import { useLanguage } from '@/hooks/use-language';
import { calculateRecoveryPercentage } from '@/lib/utils';

interface RecoveryProgressRingProps {
  days: number;
  className?: string;
}

export default function RecoveryProgressRing({ days, className = '' }: RecoveryProgressRingProps) {
  const { t } = useLanguage();
  const recovery = calculateRecoveryPercentage(days);
  
  // SVG parameters
  const size = 200;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  
  // Calculate stroke-dashoffset based on recovery percentage
  const offset = circumference - (recovery / 100) * circumference;
  
  // Calculate projected date (1 year from start)
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days); // Get the approximate start date
  
  const projectedDate = new Date(startDate);
  projectedDate.setDate(projectedDate.getDate() + 365); // 1 year from start
  
  // Format date as Month DD, YYYY
  const formattedDate = projectedDate.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="relative flex items-center justify-center">
        {/* Background circle */}
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="#1e293b"
            strokeWidth={strokeWidth}
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="#7d4dff"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
        </svg>
        
        {/* Text in the center */}
        <div className="absolute flex flex-col items-center justify-center">
          <div className="text-sm uppercase tracking-wider text-gray-400">{t('recovery')}</div>
          <div className="text-3xl font-bold text-white">{recovery}%</div>
          <div className="text-xs text-gray-400 mt-1">
            <span className="font-semibold">{days}</span> {t('days')} {t('streak').toLowerCase()}
          </div>
        </div>
      </div>
      
      {/* Projected quit date */}
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-400 mb-1">{t('projectedQuitDate')}</p>
        <p className="font-semibold text-white">{formattedDate}</p>
      </div>
    </div>
  );
}