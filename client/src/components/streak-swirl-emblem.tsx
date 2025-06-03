import React from 'react';
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

interface StreakSwirlEmblemProps {
  days: number;
  className?: string;
}

export default function StreakSwirlEmblem({ days, className = '' }: StreakSwirlEmblemProps) {
  const { t } = useLanguage();
  
  // Define colors that change based on streak length
  const getEmblemColor = (days: number) => {
    if (days < 1) return "#A7AEF9"; // Light purple for less than 1 day
    if (days < 3) return "#7D4DFF"; // Standard purple for 1-2 days
    if (days < 7) return "#4DBAFF"; // Blue for 3-6 days
    if (days < 14) return "#4DFFCF"; // Teal for 7-13 days
    if (days < 30) return "#4DFF7D"; // Green for 14-29 days
    if (days < 90) return "#FFD74D"; // Gold for 30-89 days
    return "#FF4D4D"; // Red for 90+ days
  };
  
  // Get achievement icon based on days
  const getAchievementIcon = (days: number) => {
    if (days >= 30) return { icon: Trophy, color: '#FF4D4D', name: 'zenith' };
    if (days >= 21) return { icon: Handshake, color: '#818cf8', name: 'harmony' };
    if (days >= 14) return { icon: HandHeart, color: '#60a5fa', name: 'guardian' };
    if (days >= 10) return { icon: Butterfly, color: '#a855f7', name: 'silk' };
    if (days >= 7) return { icon: Rocket, color: '#c084fc', name: 'momentum' };
    if (days >= 5) return { icon: Shield, color: '#22d3ee', name: 'vanguard' };
    if (days >= 3) return { icon: Plant, color: '#4ade80', name: 'sprout' };
    if (days >= 1) return { icon: Circle, color: '#f472b6', name: 'seed' };
    return { icon: Circle, color: '#A7AEF9', name: 'locked' };
  };
  
  const emblemColor = getEmblemColor(days);
  const achievement = getAchievementIcon(days);
  const AchievementIcon = achievement.icon;
  
  return (
    <div className={`relative ${className}`}>
      {/* SVG Swirl emblem */}
      <svg
        width="160"
        height="160"
        viewBox="0 0 160 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="animate-pulse"
        style={{animationDuration: '3s'}}
      >
        {/* Outer swirl */}
        <path
          d="M80 10C121.421 10 155 43.5786 155 85C155 126.421 121.421 160 80 160C38.5786 160 5 126.421 5 85C5 43.5786 38.5786 10 80 10Z"
          stroke={emblemColor}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="15 10"
        />
        
        {/* Middle swirl */}
        <circle
          cx="80"
          cy="80"
          r="55"
          stroke={emblemColor}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray="12 8"
        />
        
        {/* Inner swirl */}
        <circle
          cx="80"
          cy="80"
          r="35"
          stroke={emblemColor}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray="8 5"
        />
        
        {/* Center achievement icon background */}
        <circle
          cx="80"
          cy="80"
          r="18"
          fill={achievement.color}
          fillOpacity="0.2"
        />
        <circle
          cx="80"
          cy="80"
          r="15"
          fill={achievement.color}
          fillOpacity="0.1"
        />
      </svg>
      
      {/* Center Achievement Icon */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="animate-pulse" style={{animationDuration: '3s'}}>
          <AchievementIcon
            weight="fill"
            className="w-8 h-8"
            style={{
              color: achievement.color,
              filter: `drop-shadow(0 0 8px ${achievement.color})`,
            }}
          />
        </div>
      </div>
      
      {/* Small stars scattered around (as mentioned in the spec) */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-30"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `twinkle ${3 + Math.random() * 5}s infinite`
            }}
          />
        ))}
      </div>
    </div>
  );
}