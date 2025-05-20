import React from 'react';
import { cn } from '@/lib/utils';
import { Lock } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';

export interface AchievementBadgeProps {
  name: string;
  description: string;
  days: number;
  currentDays: number;
  color: string;
  isLocked?: boolean;
  onClick?: () => void;
}

export default function AchievementBadge({
  name,
  description,
  days,
  currentDays,
  color,
  isLocked = false,
  onClick
}: AchievementBadgeProps) {
  const { t } = useLanguage();
  const isUnlocked = currentDays >= days;
  const progress = Math.min(currentDays / days, 1);
  
  return (
    <div 
      className="flex flex-col items-center space-y-1 cursor-pointer"
      onClick={onClick}
    >
      <div className="relative">
        <div
          className={cn(
            "w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300",
            isUnlocked ? color : "bg-gray-700/50 backdrop-blur-sm"
          )}
          style={{ 
            boxShadow: isUnlocked ? `0 0 15px ${color.replace('bg-', '')}` : 'none',
          }}
        >
          {isLocked ? (
            <Lock className="w-6 h-6 text-gray-400" />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-white/20 to-gray-700/30 backdrop-blur-lg flex items-center justify-center">
              <div className="text-white text-xs font-medium">
                {isUnlocked ? "✓" : Math.floor(progress * 100) + "%"}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <h3 className="text-white text-sm font-medium">{name}</h3>
      <p className="text-gray-400 text-xs">{description}</p>
    </div>
  );
}