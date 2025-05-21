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
  
  // Format differently based on whether streak is less than a day or more
  const lessThanOneDay = timeElapsed.days < 1;

  return (
    <div className={`flex flex-col items-center ${className}`}>
      {lessThanOneDay ? (
        // Format for less than one day: "1 hr 18 m" in big type with seconds in pill below
        <>
          <div className="text-4xl font-bold text-white mb-2">
            {timeElapsed.hours} {t('hr')} {timeElapsed.minutes} {t('m')}
          </div>
          
          <div className="bg-white/10 rounded-full px-4 py-1">
            <span className="text-white font-medium">{timeElapsed.seconds} {t('s')}</span>
          </div>
        </>
      ) : (
        // Format for one day or more: "9 days" in big type with H:M:S in pill below
        <>
          <div className="text-4xl font-bold text-white mb-2">
            {timeElapsed.days}
            <span className="text-white ml-2 text-3xl">{t('days')}</span>
          </div>
          
          <div className="bg-white/10 rounded-full px-4 py-1 flex items-center space-x-1">
            <span className="text-white font-medium">{timeElapsed.hours.toString().padStart(2, '0')}</span>
            <span className="text-white">:</span>
            <span className="text-white font-medium">{timeElapsed.minutes.toString().padStart(2, '0')}</span>
            <span className="text-white">:</span>
            <span className="text-white font-medium">{timeElapsed.seconds.toString().padStart(2, '0')}</span>
          </div>
        </>
      )}
    </div>
  );
}