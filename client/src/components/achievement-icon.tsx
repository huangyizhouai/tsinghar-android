import React from 'react';
import { motion } from 'framer-motion';
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

interface AchievementIconProps {
  name: AchievementKey;
  locked: boolean;
  size?: 'sm' | 'md' | 'lg';
  ariaLabel?: string;
}

const icons: Record<AchievementKey, React.FC<any>> = {
  seed: Circle,
  sprout: Plant,
  vanguard: Shield,
  momentum: Rocket,
  silk: Butterfly,
  guardian: HandHeart,
  harmony: Handshake,
  zenith: Trophy
};

const sizeClasses = {
  sm: 'w-12 h-12',
  md: 'w-16 h-16 md:w-20 md:h-20',
  lg: 'w-20 h-20 md:w-24 md:h-24'
};

export default function AchievementIcon({ 
  name, 
  locked, 
  size = 'md',
  ariaLabel 
}: AchievementIconProps) {
  const IconComponent = icons[name];
  
  if (!IconComponent) {
    return (
      <div 
        className={`${sizeClasses[size]} flex items-center justify-center bg-slate-600/20 rounded-full`}
        aria-label={ariaLabel || `${name} achievement`}
      >
        <span className="text-slate-600/60 text-xs">?</span>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ scale: locked ? 1 : 1.25 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`${sizeClasses[size]} flex items-center justify-center`}
      aria-label={ariaLabel || `${name} achievement ${locked ? 'locked' : 'unlocked'}`}
    >
      <IconComponent
        weight="regular"
        className={`w-full h-full ${
          locked 
            ? 'text-slate-600/40' 
            : ''
        }`}
        style={locked ? {} : {
          background: 'radial-gradient(circle, #5EFCE8 0%, #22d3ee 50%, #736EFE 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          color: 'transparent'
        }}
      />
    </motion.div>
  );
}