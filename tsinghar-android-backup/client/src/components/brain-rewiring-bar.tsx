import React from 'react';
import { useLanguage } from '@/hooks/use-language';
import { calculateRecoveryPercentage } from '@/lib/utils';

interface BrainRewiringBarProps {
  days: number;
  className?: string;
}

export default function BrainRewiringBar({ days, className = '' }: BrainRewiringBarProps) {
  const { t } = useLanguage();
  const maxDays = 45;
  const currentDays = Math.min(days, maxDays);
  const progressPercentage = Math.round((currentDays / maxDays) * 100);
  
  // Calculate remaining days
  const remainingDays = Math.max(0, maxDays - days);
  
  return (
    <div className={`w-full ${className}`}>
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium text-text-primary">{t('brainRewiring')}</h3>
        <span className="text-xs text-primary font-semibold">{progressPercentage}%</span>
      </div>
      
      <div className="h-4 w-full bg-gray-800 rounded-full overflow-hidden mb-2">
        <div 
          className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-700 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      
      <div className="flex justify-between items-center text-xs">
        <span className="text-gray-400">
          {t('days')}: {currentDays}/{maxDays}
        </span>
        {remainingDays > 0 ? (
          <span className="text-gray-400">
            {remainingDays} {t('daysRemaining')}
          </span>
        ) : (
          <span className="text-green-400 font-semibold">
            {t('complete')}!
          </span>
        )}
      </div>
    </div>
  );
}