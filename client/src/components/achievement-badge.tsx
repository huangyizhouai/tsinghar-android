import React from 'react';
import { cn } from '@/lib/utils';
import { Lock } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';
import AchievementIcon, { AchievementKey } from './achievement-icon';

export interface AchievementBadgeProps {
  id?: string;
  name: string;
  enName?: string;
  description: string;
  days: number;
  currentDays: number;
  color: string;
  glowColor?: string;
  isLocked?: boolean;
  iconKey?: AchievementKey;
  onClick?: () => void;
}

export default function AchievementBadge({
  name,
  description,
  days,
  currentDays,
  color,
  glowColor = "#7d4dff",
  isLocked = false,
  iconKey,
  onClick
}: AchievementBadgeProps) {
  const { t } = useLanguage();
  const isUnlocked = currentDays >= days;
  const progress = Math.min(currentDays / days, 1);
  
  return (
    <div 
      className="flex flex-col items-center space-y-1.5 cursor-pointer"
      onClick={onClick}
    >
      <div className="relative">
        {/* Main circle with glow effect */}
        <div
          className={cn(
            "w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300",
            isUnlocked ? color : "bg-gray-800/50 backdrop-blur-sm"
          )}
          style={{ 
            boxShadow: isUnlocked ? `0 0 20px ${glowColor}` : 'none',
          }}
        >
          {isLocked || !isUnlocked ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <img 
                src="/assets/achievements/lock.svg" 
                alt="Locked" 
                className="w-7 h-7 opacity-70"
                onError={(e) => {
                  // Fallback to Lucide icon if SVG not found
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <Lock className="w-7 h-7 text-gray-400 hidden" />
            </div>
          ) : (
            // Inner reflective surface for unlocked badges with new icon system
            <div 
              className="w-16 h-16 rounded-full bg-gradient-to-br from-white/30 via-transparent to-gray-800/40 backdrop-blur-lg flex items-center justify-center overflow-hidden"
              style={{
                transform: 'perspective(100px) rotateX(5deg)',
                boxShadow: 'inset 0 2px 6px rgba(255,255,255,0.1)'
              }}
            >
              {iconKey ? (
                <AchievementIcon 
                  name={iconKey} 
                  locked={false} 
                  size="sm"
                  ariaLabel={name}
                />
              ) : (
                <>
                  {/* Central light reflection */}
                  <div className="absolute w-14 h-14 bg-gradient-to-br from-white/15 to-transparent rounded-full"
                    style={{
                      filter: 'blur(2px)',
                      transform: 'translateY(-2px)'
                    }}
                  />
                  
                  {/* Diagonal light streak */}
                  <div className="absolute w-full h-10 bg-white/10" 
                    style={{
                      transform: 'rotate(-45deg) translate(-5px, -5px)'
                    }}
                  />
                </>
              )}
            </div>
          )}
        </div>
      </div>
      
      <h3 className="text-white text-sm font-semibold">{name}</h3>
      <p className="text-gray-400 text-xs">{description}</p>
    </div>
  );
}