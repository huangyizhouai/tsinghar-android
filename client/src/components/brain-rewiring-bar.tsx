import React from 'react';
import { useLanguage } from '@/hooks/use-language';
import { calculateRecoveryPercentage } from '@/lib/utils';

interface BrainRewiringBarProps {
  days: number;
  className?: string;
}

export default function BrainRewiringBar({ days, className = '' }: BrainRewiringBarProps) {
  const { t } = useLanguage();
  const progressPercentage = calculateRecoveryPercentage(days);
  
  return (
    <div className={`w-full ${className}`}>
      <div className="flex justify-between items-center mb-1">
        <h3 className="text-sm font-medium text-text-primary">{t('brainRewiring')}</h3>
        <span className="text-xs text-primary">{progressPercentage}%</span>
      </div>
      
      <div className="h-3 w-full bg-gray-800 rounded-full overflow-hidden">
        <div 
          className="h-full bg-purple-600 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      
      <div className="flex justify-between mt-1 text-xs text-gray-400">
        <span>0</span>
        <span>{t('days')}: {days}/45</span>
      </div>
    </div>
  );
}