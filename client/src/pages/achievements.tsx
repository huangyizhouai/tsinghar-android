import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLanguage } from '@/hooks/use-language';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'wouter';
import { useToast } from '@/hooks/use-toast';
import AchievementBadge from '@/components/achievement-badge';



export default function AchievementsPage() {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [collected, setCollected] = useState(0);
  
  // Fetch streak data
  const { data: streak } = useQuery<{currentStreak: number}>({
    queryKey: ['/api/streak'],
    staleTime: 1000 * 60 * 5 // 5 minutes
  });
  
  // Fetch milestones data from API
  const { data: milestones, isLoading: milestonesLoading } = useQuery<Array<{
    id: number;
    userId: number;
    days: number;
    achieved: boolean;
    achievedDate?: string;
  }>>({
    queryKey: ['/api/milestones'],
    staleTime: 1000 * 60 * 5 // 5 minutes
  });
  
  const currentDays = streak && 'currentStreak' in streak 
    ? streak.currentStreak 
    : 0;

  // Achievement configs for display styling
  const achievementConfigs: Record<number, { name: string; enName: string; color: string; glowColor: string; iconKey: 'seed' | 'sprout' | 'vanguard' | 'momentum' | 'silk' | 'guardian' | 'harmony' | 'zenith' }> = {
    1: { name: '种子', enName: 'Seed', color: 'bg-pink-400', glowColor: '#f472b6', iconKey: 'seed' },
    3: { name: '幼芽', enName: 'Sprout', color: 'bg-green-400', glowColor: '#4ade80', iconKey: 'sprout' },
    7: { name: '势头', enName: 'Momentum', color: 'bg-purple-400', glowColor: '#c084fc', iconKey: 'momentum' },
    14: { name: '守护者', enName: 'Guardian', color: 'bg-blue-400', glowColor: '#60a5fa', iconKey: 'guardian' },
    21: { name: '和谐', enName: 'Harmony', color: 'bg-indigo-400', glowColor: '#818cf8', iconKey: 'harmony' },
    30: { name: '巅峰', enName: 'Zenith', color: 'bg-amber-400', glowColor: '#fbbf24', iconKey: 'zenith' },
    60: { name: '坚持', enName: 'Persistence', color: 'bg-orange-400', glowColor: '#fb923c', iconKey: 'silk' },
    90: { name: '完美', enName: 'Perfect', color: 'bg-emerald-400', glowColor: '#34d399', iconKey: 'zenith' }
  };

  // Process API milestones data for display
  const achievementsList = milestones ? milestones.map((milestone) => {
    const config = achievementConfigs[milestone.days as keyof typeof achievementConfigs] || {
      name: `${milestone.days}天`, 
      enName: `${milestone.days} Days`, 
      color: 'bg-gray-400', 
      glowColor: '#9ca3af', 
      iconKey: 'seed' as const
    };
    
    return {
      id: milestone.id.toString(),
      name: config.name,
      enName: config.enName,
      description: `${milestone.days}/${milestone.days} ${language === 'zh' ? '天' : 'days'}`,
      days: milestone.days,
      color: config.color,
      glowColor: config.glowColor,
      iconKey: config.iconKey,
      achieved: milestone.achieved
    };
  }) : [];
  
  // Calculate number of collected achievements
  useEffect(() => {
    if (milestones) {
      const unlocked = milestones.filter((m) => m.achieved);
      setCollected(unlocked.length);
    }
  }, [milestones]);
  
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
            iconKey={achievement.iconKey}
            achieved={achievement.achieved}
            onClick={() => {
              if (achievement.achieved) {
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