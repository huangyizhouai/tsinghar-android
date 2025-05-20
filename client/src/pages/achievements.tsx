import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLanguage } from '@/hooks/use-language';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'wouter';
import AchievementBadge from '@/components/achievement-badge';

// Define achievements with their requirements and colors
const achievementsList = [
  {
    name: 'Seed',
    description: '1 day',
    days: 1,
    color: 'bg-pink-400'
  },
  {
    name: 'Sprout',
    description: '3 days',
    days: 3,
    color: 'bg-blue-300'
  },
  {
    name: 'Pioneer',
    description: '5 days',
    days: 5,
    color: 'bg-cyan-400'
  },
  {
    name: 'Momentum',
    description: '7 days',
    days: 7,
    color: 'bg-purple-400'
  },
  {
    name: 'Fortress',
    description: '10 days',
    days: 10,
    color: 'bg-purple-500'
  },
  {
    name: 'Guardian',
    description: '14 days',
    days: 14,
    color: 'bg-blue-400'
  },
  {
    name: 'Trailblazer',
    description: '30 days',
    days: 30,
    color: 'bg-indigo-400',
    isLocked: true
  },
  {
    name: 'Ascendant',
    description: '45 days',
    days: 45,
    color: 'bg-indigo-500',
    isLocked: true
  }
];

export default function AchievementsPage() {
  const { t } = useLanguage();
  const [collected, setCollected] = useState(0);
  
  // Fetch streak data
  const { data: streak } = useQuery({
    queryKey: ['/api/streak'],
    staleTime: 1000 * 60 * 5 // 5 minutes
  });
  
  const currentDays = streak?.currentStreak || 0;
  
  // Calculate number of collected achievements
  useEffect(() => {
    if (currentDays) {
      const unlocked = achievementsList.filter(a => currentDays >= a.days && !a.isLocked);
      setCollected(unlocked.length);
    }
  }, [currentDays]);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 to-indigo-950 p-4 pb-20">
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
        <div className="relative w-full h-2 bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
            style={{ width: `${(collected / achievementsList.length) * 100}%` }}
          ></div>
        </div>
        <div className="text-gray-400 text-xs text-center mt-1">
          {collected}/{achievementsList.length} {t('collected')}
        </div>
      </div>
      
      {/* Achievements Grid */}
      <div className="grid grid-cols-2 gap-6 mt-4">
        {achievementsList.map((achievement) => (
          <AchievementBadge
            key={achievement.name}
            name={achievement.name}
            description={achievement.description}
            days={achievement.days}
            currentDays={currentDays}
            color={achievement.color}
            isLocked={achievement.isLocked}
          />
        ))}
      </div>
    </div>
  );
}