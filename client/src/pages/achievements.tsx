import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLanguage } from '@/hooks/use-language';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'wouter';
import { useToast } from '@/hooks/use-toast';
import AchievementBadge from '@/components/achievement-badge';

// Define achievements with their requirements and colors exactly as in the spec
const achievementsList = [
  {
    id: 'seed',
    name: '种子',
    enName: 'Seed',
    description: '1/1 天',
    days: 1,
    color: 'bg-pink-400',
    glowColor: '#f472b6',
    isLocked: false,
    assetUnlocked: '/assets/achievements/seed.svg'
  },
  {
    id: 'sprout',
    name: '幼芽',
    enName: 'Sprout',
    description: '3/3 天',
    days: 3,
    color: 'bg-blue-300',
    glowColor: '#7dd3fc',
    isLocked: false,
    assetUnlocked: '/assets/achievements/sprout.svg'
  },
  {
    id: 'pioneer',
    name: '先锋',
    enName: 'Pioneer',
    description: '5/5 天',
    days: 5,
    color: 'bg-cyan-400',
    glowColor: '#22d3ee',
    isLocked: false,
    assetUnlocked: '/assets/achievements/pioneer.svg'
  },
  {
    id: 'momentum',
    name: '势头',
    enName: 'Momentum',
    description: '7/7 天',
    days: 7,
    color: 'bg-purple-400',
    glowColor: '#c084fc',
    isLocked: false,
    assetUnlocked: '/assets/achievements/momentum.svg'
  },
  {
    id: 'fortress',
    name: '堡垒',
    enName: 'Fortress',
    description: '10/10 天',
    days: 10,
    color: 'bg-purple-500',
    glowColor: '#a855f7',
    isLocked: false,
    assetUnlocked: '/assets/achievements/fortress.svg'
  },
  {
    id: 'guardian',
    name: '守护者',
    enName: 'Guardian',
    description: '14/14 天',
    days: 14,
    color: 'bg-blue-400',
    glowColor: '#60a5fa',
    isLocked: false,
    assetUnlocked: '/assets/achievements/guardian.svg'
  },
  {
    id: 'trailblazer',
    name: '开拓者',
    enName: 'Trailblazer',
    description: '30/30 天',
    days: 30,
    color: 'bg-indigo-400',
    glowColor: '#818cf8',
    isLocked: false,
    assetUnlocked: '/assets/achievements/trailblazer.svg'
  },
  {
    id: 'ascendant',
    name: '飞升者',
    enName: 'Ascendant',
    description: '45/45 天',
    days: 45,
    color: 'bg-indigo-500',
    glowColor: '#6366f1',
    isLocked: false,
    assetUnlocked: '/assets/achievements/ascendant.svg'
  }
];

export default function AchievementsPage() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [collected, setCollected] = useState(0);
  
  // Fetch streak data
  const { data: streak } = useQuery<{currentStreak: number}>({
    queryKey: ['/api/streak'],
    staleTime: 1000 * 60 * 5 // 5 minutes
  });
  
  const currentDays = streak && 'currentStreak' in streak 
    ? streak.currentStreak 
    : 0;
  
  // Calculate number of collected achievements
  useEffect(() => {
    if (currentDays) {
      const unlocked = achievementsList.filter(a => currentDays >= a.days && !a.isLocked);
      setCollected(unlocked.length);
    }
  }, [currentDays]);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b0e3f] to-[#020225] p-4 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <Link to="/progress">
          <button className="text-white p-2">
            <ChevronLeft className="w-6 h-6" />
          </button>
        </Link>
        <h1 className="text-xl font-bold text-white">{t('achievements')}</h1>
        <div className="w-8"></div> {/* Placeholder for balance */}
      </div>
      
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="relative w-full h-2 bg-gray-700/30 rounded-full overflow-hidden">
          <div 
            className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-[#24F0C6] to-[#8A56FF] rounded-full"
            style={{ width: `${(collected / achievementsList.length) * 100}%` }}
          ></div>
        </div>
        <div className="text-gray-400 text-xs text-center mt-1">
          {collected}/{achievementsList.length} {t('collected')}
        </div>
      </div>
      
      {/* Achievements Grid */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-8 mt-6">
        {achievementsList.map((achievement) => (
          <AchievementBadge
            key={achievement.id}
            name={achievement.name}
            description={achievement.description}
            days={achievement.days}
            currentDays={currentDays}
            color={achievement.color}
            glowColor={achievement.glowColor}
            isLocked={achievement.isLocked}
            assetUnlocked={achievement.assetUnlocked}
            onClick={() => {
              if (currentDays >= achievement.days && !achievement.isLocked) {
                // Show achievement unlocked toast with Chinese text
                toast({
                  title: "🎉 恭喜！",
                  description: `你已解锁「${achievement.name}」徽章！`,
                  variant: "default",
                });
              }
            }}
          />
        ))}
      </div>
    </div>
  );
}