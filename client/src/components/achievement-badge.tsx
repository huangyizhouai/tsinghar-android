import React from 'react';
import { cn } from '@/lib/utils';
import { Lock } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';

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
  assetUnlocked?: string;
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
  assetUnlocked,
  onClick
}: AchievementBadgeProps) {
  const { t } = useLanguage();
  const isUnlocked = currentDays >= days && !isLocked;
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
            "w-20 h-20 rounded-full flex items-center justify-center transition-all duration-500 relative overflow-hidden",
            isUnlocked ? "bg-gradient-to-br from-white/20 to-transparent" : "bg-gray-800/60 backdrop-blur-sm"
          )}
          style={{ 
            boxShadow: isUnlocked ? `0 0 25px ${glowColor}, 0 0 50px ${glowColor}40` : 'none',
            border: isUnlocked ? `2px solid ${glowColor}60` : '2px solid #374151'
          }}
        >
          {!isUnlocked ? (
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
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Achievement icon */}
              {assetUnlocked && (
                <img 
                  src={assetUnlocked} 
                  alt={name} 
                  className="w-12 h-12 object-contain relative z-10 drop-shadow-lg"
                />
              )}
              
              {/* Animated glow effect */}
              <div 
                className="absolute inset-0 rounded-full opacity-30 animate-pulse"
                style={{
                  background: `radial-gradient(circle, ${glowColor}40 0%, transparent 70%)`
                }}
              />
              
              {/* Sparkle effect for unlocked achievements */}
              <div className="absolute inset-0 rounded-full">
                <div 
                  className="absolute top-2 right-2 w-1 h-1 bg-white rounded-full animate-ping"
                  style={{ animationDelay: '0s' }}
                />
                <div 
                  className="absolute bottom-3 left-3 w-1 h-1 bg-white rounded-full animate-ping"
                  style={{ animationDelay: '1s' }}
                />
                <div 
                  className="absolute top-1/2 left-1 w-0.5 h-0.5 bg-white rounded-full animate-ping"
                  style={{ animationDelay: '2s' }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      
      <h3 className="text-white text-sm font-semibold">{name}</h3>
      <p className="text-gray-400 text-xs">{description}</p>
    </div>
  );
}