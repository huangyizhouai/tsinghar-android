import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { leaderboardUsers } from "@/lib/data";
import { useLanguage } from "@/hooks/use-language";

interface LeaderboardProps {
  onViewAll: () => void;
}

export default function Leaderboard({ onViewAll }: LeaderboardProps) {
  const { t } = useLanguage();
  
  // Sort users by rank
  const sortedUsers = [...leaderboardUsers].sort((a, b) => a.rank - b.rank);
  
  // Get top users and current user
  const topUsers = sortedUsers.filter(user => user.rank <= 3);
  const currentUser = sortedUsers.find(user => user.isCurrentUser);

  return (
    <Card className="bg-background-card rounded-xl mb-6">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium text-lg text-text-primary">{t('leaderboardTitle')}</h3>
          <button 
            onClick={onViewAll} 
            className="flex items-center text-text-secondary text-sm"
          >
            {t('viewAll')} <ChevronRight className="h-4 w-4 ml-1" />
          </button>
        </div>

        <div className="space-y-3">
          {/* Top 3 users */}
          {topUsers.map((user) => (
            <div key={user.id} className="flex justify-between items-center">
              <div className="flex items-center">
                <div className={`flex items-center justify-center h-8 w-8 rounded-full mr-3 ${
                  user.rank === 1 ? 'bg-yellow-500' : 
                  user.rank === 2 ? 'bg-gray-300' : 
                  'bg-amber-700'
                }`}>
                  {user.rank === 1 && '🥇'}
                  {user.rank === 2 && '🥈'}
                  {user.rank === 3 && '🥉'}
                </div>
                <div>
                  <span className="text-text-primary">{user.name}</span>
                  <span className="text-text-secondary text-xs ml-2">#{user.rank}</span>
                </div>
              </div>
              <span className="text-primary font-medium">{user.streak}d</span>
            </div>
          ))}

          {/* Separator */}
          {currentUser && currentUser.rank > 3 && (
            <div className="py-1 flex justify-center">
              <div className="w-8 text-center text-text-secondary">•••</div>
            </div>
          )}

          {/* Current user (if not in top 3) */}
          {currentUser && currentUser.rank > 3 && (
            <div className="flex justify-between items-center bg-background-primary/30 p-2 rounded-lg">
              <div className="flex items-center">
                <div className="bg-primary text-white h-8 w-8 rounded-full flex items-center justify-center mr-3">
                  {currentUser.initials}
                </div>
                <div>
                  <span className="text-text-primary">{currentUser.name}</span>
                  <span className="text-text-secondary text-xs ml-2">#{currentUser.rank}</span>
                </div>
              </div>
              <span className="text-primary font-medium">{currentUser.streak}d</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}