import React, { useState } from 'react';
import { useLanguage } from '@/hooks/use-language';
import { queryClient } from '@/lib/queryClient';
import { Smile, Meh, Frown } from 'lucide-react';

interface CheckInFlowProps {
  onClose: () => void;
}

// Mood types
type Mood = 'happy' | 'neutral' | 'sad' | null;

// Screen states for the check-in flow
type ScreenState = 'relapse-question' | 'mood-question' | 'encouragement';

export default function CheckInFlow({ onClose }: CheckInFlowProps) {
  const { t } = useLanguage();
  
  // State to track the current screen
  const [screen, setScreen] = useState<ScreenState>('relapse-question');
  
  // State for user's relapse answer and mood
  const [relapsed, setRelapsed] = useState<boolean | null>(null);
  const [mood, setMood] = useState<Mood>(null);
  
  // Stats for the encouragement screen (these would come from API in a real app)
  const stats = {
    happy: 45,
    neutral: 30,
    sad: 25
  };
  
  // Handle the relapse question response
  const handleRelapseResponse = (value: boolean) => {
    setRelapsed(value);
    
    if (value) {
      // If relapsed, reset streak via API
      fetch('/api/streak/reset', { method: 'POST' })
        .then(res => res.json())
        .then(() => {
          queryClient.invalidateQueries({ queryKey: ['/api/streak'] });
        })
        .catch(err => console.error('Failed to reset streak:', err));
    }
    
    // Move to mood question
    setScreen('mood-question');
  };
  
  // Handle the mood selection
  const handleMoodSelection = (selectedMood: Mood) => {
    setMood(selectedMood);
    
    // In a real app, save the mood to the API
    // For now, just move to the encouragement screen
    setScreen('encouragement');
  };
  
  // Render the appropriate screen based on state
  const renderScreen = () => {
    switch (screen) {
      case 'relapse-question':
        return (
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-bold mb-8 text-center">{t('didYouRelapse')}</h2>
            
            <div className="flex flex-col w-full gap-4">
              <button 
                className="py-4 px-6 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium transition"
                onClick={() => handleRelapseResponse(false)}
              >
                {t('noStillStrong')} 💪
              </button>
              
              <button 
                className="py-4 px-6 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium transition"
                onClick={() => handleRelapseResponse(true)}
              >
                {t('yesRelapsed')}
              </button>
            </div>
          </div>
        );
        
      case 'mood-question':
        return (
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-bold mb-8 text-center">{t('howAreYouFeeling')}</h2>
            
            <div className="flex justify-between w-full">
              <button 
                className="flex flex-col items-center p-4 rounded-lg bg-green-500/20 hover:bg-green-500/30 transition"
                onClick={() => handleMoodSelection('happy')}
              >
                <Smile className="w-16 h-16 text-green-500 mb-2" />
                <span className="text-sm font-medium">{t('happy')}</span>
              </button>
              
              <button 
                className="flex flex-col items-center p-4 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 transition"
                onClick={() => handleMoodSelection('neutral')}
              >
                <Meh className="w-16 h-16 text-blue-500 mb-2" />
                <span className="text-sm font-medium">{t('neutral')}</span>
              </button>
              
              <button 
                className="flex flex-col items-center p-4 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition"
                onClick={() => handleMoodSelection('sad')}
              >
                <Frown className="w-16 h-16 text-red-500 mb-2" />
                <span className="text-sm font-medium">{t('sad')}</span>
              </button>
            </div>
          </div>
        );
        
      case 'encouragement':
        return (
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-bold mb-4 text-center">
              {relapsed ? t('resetMessage') : t('keepGoingMessage')}
            </h2>
            
            <p className="text-text-secondary text-center mb-6">
              {relapsed 
                ? t('tomorrowNewDay')
                : t('strengthGrows')}
            </p>
            
            <div className="bg-background-card rounded-lg p-4 w-full">
              <h3 className="font-medium mb-3">{t('communityMoodToday')}</h3>
              
              <div className="flex items-center mb-2">
                <Smile className="w-5 h-5 text-green-500 mr-2" />
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-500 rounded-full" 
                    style={{ width: `${stats.happy}%` }}
                  ></div>
                </div>
                <span className="ml-2 text-sm">{stats.happy}%</span>
              </div>
              
              <div className="flex items-center mb-2">
                <Meh className="w-5 h-5 text-blue-500 mr-2" />
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 rounded-full" 
                    style={{ width: `${stats.neutral}%` }}
                  ></div>
                </div>
                <span className="ml-2 text-sm">{stats.neutral}%</span>
              </div>
              
              <div className="flex items-center">
                <Frown className="w-5 h-5 text-red-500 mr-2" />
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-red-500 rounded-full" 
                    style={{ width: `${stats.sad}%` }}
                  ></div>
                </div>
                <span className="ml-2 text-sm">{stats.sad}%</span>
              </div>
            </div>
            
            <button 
              className="mt-8 py-3 px-6 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-medium transition"
              onClick={onClose}
            >
              {t('continue')}
            </button>
          </div>
        );
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-background p-6 rounded-xl w-full max-w-md">
        {renderScreen()}
      </div>
    </div>
  );
}