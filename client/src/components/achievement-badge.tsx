import React from 'react';
import { cn } from '@/lib/utils';
import { Lock } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';
import { 
  Circle, 
  Plant, 
  Shield, 
  Rocket, 
  Butterfly, 
  HandHeart, 
  Handshake, 
  Trophy 
} from '@phosphor-icons/react';

export type AchievementKey = 'seed' | 'sprout' | 'vanguard' | 'momentum' | 'silk' | 'guardian' | 'harmony' | 'zenith';

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
  id,
  name,
  enName,
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
          {/* Achievement Icon Display */}
          <div className="relative flex items-center justify-center">
            {iconKey === 'seed' && (
              <Circle 
                weight="fill" 
                className="w-12 h-12 text-pink-400"
                style={{
                  filter: 'drop-shadow(0 0 8px #f472b6)'
                }}
              />
            )}
            {iconKey === 'sprout' && (
              <Plant 
                weight="fill" 
                className="w-12 h-12 text-green-400"
                style={{
                  filter: 'drop-shadow(0 0 8px #4ade80)'
                }}
              />
            )}
            {iconKey === 'vanguard' && (
              <Shield 
                weight="fill" 
                className="w-12 h-12 text-blue-400"
                style={{
                  filter: 'drop-shadow(0 0 8px #60a5fa)'
                }}
              />
            )}
            {iconKey === 'momentum' && (
              <Rocket 
                weight="fill" 
                className="w-12 h-12 text-purple-400"
                style={{
                  filter: 'drop-shadow(0 0 8px #c084fc)'
                }}
              />
            )}
            {iconKey === 'silk' && (
              <Butterfly 
                weight="fill" 
                className="w-12 h-12 text-orange-400"
                style={{
                  filter: 'drop-shadow(0 0 8px #fb923c)'
                }}
              />
            )}
            {iconKey === 'guardian' && (
              <HandHeart 
                weight="fill" 
                className="w-12 h-12 text-red-400"
                style={{
                  filter: 'drop-shadow(0 0 8px #f87171)'
                }}
              />
            )}
            {iconKey === 'harmony' && (
              <Handshake 
                weight="fill" 
                className="w-12 h-12 text-cyan-400"
                style={{
                  filter: 'drop-shadow(0 0 8px #22d3ee)'
                }}
              />
            )}
            {iconKey === 'zenith' && (
              <Trophy 
                weight="fill" 
                className="w-12 h-12 text-yellow-400"
                style={{
                  filter: 'drop-shadow(0 0 8px #facc15)'
                }}
              />
            )}
            
            {!isUnlocked && (
              <div className="absolute top-0 right-0 w-4 h-4 bg-gray-800/80 rounded-full flex items-center justify-center">
                <Lock className="w-3 h-3 text-gray-300" />
              </div>
            )}
          </div>
        </div>
      </div>
      
      <h3 className="text-white text-sm font-semibold">{name}</h3>
      <p className="text-gray-400 text-xs">{description}</p>
    </div>
  );
}