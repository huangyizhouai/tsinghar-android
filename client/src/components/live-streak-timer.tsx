import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/hooks/use-language';

interface LiveStreakTimerProps {
  startDate: string;
  className?: string;
}

export default function LiveStreakTimer({ startDate, className = '' }: LiveStreakTimerProps) {
  const { t } = useLanguage();
  const [timeElapsed, setTimeElapsed] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    if (!startDate) return;

    const calculateTimeElapsed = () => {
      const start = new Date(startDate).getTime();
      const now = new Date().getTime();
      const diff = now - start;

      // Convert to days, hours, minutes, seconds
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeElapsed({ days, hours, minutes, seconds });
    };

    // Calculate immediately
    calculateTimeElapsed();

    // Update every second
    const interval = setInterval(calculateTimeElapsed, 1000);

    return () => clearInterval(interval);
  }, [startDate]);

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="text-4xl font-bold text-white mb-2">
        {timeElapsed.days}
        <span className="text-gray-400 ml-1 text-2xl">{t('days')}</span>
      </div>
      
      <div className="flex space-x-2 text-lg">
        <div className="flex flex-col items-center">
          <span className="font-semibold text-white">{timeElapsed.hours}</span>
          <span className="text-xs text-gray-400">{t('hours')}</span>
        </div>
        <div className="text-white self-start mt-0.5">:</div>
        <div className="flex flex-col items-center">
          <span className="font-semibold text-white">{timeElapsed.minutes}</span>
          <span className="text-xs text-gray-400">{t('minutes')}</span>
        </div>
        <div className="text-white self-start mt-0.5">:</div>
        <div className="flex flex-col items-center">
          <span className="font-semibold text-white">{timeElapsed.seconds}</span>
          <span className="text-xs text-gray-400">{t('seconds')}</span>
        </div>
      </div>
    </div>
  );
}