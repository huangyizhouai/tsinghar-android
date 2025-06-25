import React from 'react';
import { useLanguage } from '@/hooks/use-language';
import { Check, X } from 'lucide-react';

interface WeekBarProps {
  className?: string;
}

export default function WeekBar({ className = '' }: WeekBarProps) {
  const { t } = useLanguage();
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  // Get current day index (0-6, where 0 is Monday)
  const now = new Date();
  const currentDayIndex = (now.getDay() + 6) % 7; // Convert Sunday (0) to Monday (0)
  
  // For demo purposes, we'll simulate check-ins for previous days
  // In a real app, this would come from the API
  const getStatusForDay = (dayIndex: number) => {
    if (dayIndex > currentDayIndex) {
      return 'future'; // Future day
    } else if (dayIndex === currentDayIndex) {
      return 'today'; // Today
    } else if (dayIndex % 3 === 0) {
      return 'relapsed'; // Simulating a relapse day
    } else {
      return 'completed'; // Completed successfully
    }
  };
  
  return (
    <div className={`flex justify-between w-full my-2 ${className}`}>
      {days.map((day, index) => {
        const status = getStatusForDay(index);
        
        return (
          <div key={day} className="flex flex-col items-center">
            <div className="text-xs text-gray-400 mb-1">{t(day.toLowerCase())}</div>
            <div 
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                status === 'future' 
                  ? 'bg-gray-800/50' 
                  : status === 'today' 
                    ? 'bg-purple-600/20 border border-purple-600' 
                    : status === 'relapsed' 
                      ? 'bg-red-600/20' 
                      : 'bg-purple-600/20'
              }`}
            >
              {status === 'future' ? (
                <span className="text-gray-500">–</span>
              ) : status === 'today' ? (
                <span className="text-purple-400">?</span>
              ) : status === 'relapsed' ? (
                <X className="w-4 h-4 text-red-500" />
              ) : (
                <Check className="w-4 h-4 text-purple-500" />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}