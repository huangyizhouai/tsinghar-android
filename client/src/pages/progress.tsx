import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Share, Award } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { calculateRecoveryPercentage, getDaysLeft } from "@/lib/utils";
import { benefitsData, milestonesData } from "@/lib/data";
import { useLanguage } from "@/hooks/use-language";
import { Link } from "wouter";
import RecoveryProgressRing from "@/components/recovery-progress-ring";
import ShareModal from "@/components/share-modal";
import AppLogo from "@/components/app-logo";

export default function ProgressPage() {
  const { t, language } = useLanguage();
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  
  const { data: streak, isLoading: streakLoading } = useQuery<{currentStreak: number}>({
    queryKey: ['/api/streak'],
  });
  
  const { data: progressData, isLoading: progressLoading } = useQuery<any[]>({
    queryKey: ['/api/progress'],
  });
  
  const { data: milestones, isLoading: milestonesLoading } = useQuery<any[]>({
    queryKey: ['/api/milestones'],
  });
  
  const days = streak && 'currentStreak' in streak ? streak.currentStreak : 0;
  const recoveryPercentage = calculateRecoveryPercentage(days);
  
  const motivationalText = () => {
    if (days === 0) {
      return t('beginningJourney');
    } else if (days < 7) {
      return t('buildingMomentum');
    } else if (days < 30) {
      return t('toughestPart');
    } else {
      return t('incredibleProgress');
    }
  };

  const getMilestoneDescription = (days: number) => {
    const milestoneMap: Record<number, string> = {
      1: t('firstStepCompleted'),
      3: t('healthImprovementBegins'),
      7: t('mentalClarityImproving'),
      14: t('lifeBalanceRestoring'),
      21: t('productivityEnhancement'),
      30: t('emotionalStabilityGained'),
      60: t('relationshipQualityImproving'),
      90: t('fullBrainRebootAchieved')
    };
    
    return milestoneMap[days] || `${days} days milestone`;
  };

  const handleShareClick = () => {
    setIsShareModalOpen(true);
  };

  const dashboardData = {
    days,
    recoveryPercentage,
    currentDate: new Date().toLocaleDateString(),
    motivationalText: motivationalText(),
  };

  return (
    <div className="p-4 pt-6">
      {/* Custom Header with Logo and Title */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <AppLogo size="md" />
          <h1 className="text-xl font-semibold text-text-primary">{t('progress')}</h1>
        </div>
        <div className="flex space-x-2">
          <Link to="/achievements">
            <button className="p-2 rounded-full bg-background-card">
              <Award className="h-6 w-6 text-text-primary" />
            </button>
          </Link>
          <button 
            onClick={handleShareClick}
            className="p-2 rounded-full bg-background-card hover:bg-background-card/80 transition-colors"
          >
            <Share className="h-6 w-6 text-text-primary" />
          </button>
        </div>
      </div>

      {/* Recovery Percentage */}
      <Card className="bg-background-card rounded-xl mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col items-center">
            <div className="mb-4">
              <RecoveryProgressRing days={days} />
            </div>
            <p className="text-sm text-text-secondary text-center mt-4">
              {motivationalText()}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Recovery Benefits */}
      <h2 className="font-medium text-lg mb-4 text-text-primary">{t('recoveryBenefits')}</h2>
      
      <div className="space-y-4 mb-8">
        {benefitsData.map((benefit: any, index: number) => {
          // Calculate progress based on user's current days
          const baseProgress = Math.min((days / 30) * 100, 100); // Base progress over 30 days
          const variance = index * 10; // Different starting points for variety
          let currentProgress = Math.max(0, baseProgress - variance + (days * 2));
          currentProgress = Math.min(currentProgress, 100); // Cap at 100%
          
          const isUnlocked = days >= (index + 1); // Progressive unlock
          
          return (
            <Card key={index} className={`bg-background-card rounded-xl overflow-hidden transition-all duration-300 ${!isUnlocked ? 'opacity-60' : ''}`}>
              {benefit.imageUrl && index === 0 && (
                <img 
                  src={benefit.imageUrl} 
                  alt={`Visual representation of ${language === 'zh' ? benefit.nameZh : benefit.name}`} 
                  className="w-full h-40 object-cover"
                />
              )}
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-text-primary">
                    {language === 'zh' ? benefit.nameZh : benefit.name}
                  </h3>
                  <span className="text-xs text-primary">
                    {isUnlocked ? Math.round(currentProgress) : 0}%
                  </span>
                </div>
                <p className="text-sm text-text-secondary mb-3">
                  {language === 'zh' ? benefit.descriptionZh : benefit.description}
                </p>
                <Progress value={isUnlocked ? currentProgress : 0} className="h-1.5 mb-3" />
                
                {/* Recovery Resources */}
                {isUnlocked && benefit.resources && (
                  <div className="mt-3 pt-3 border-t border-background-primary">
                    <h4 className="text-xs font-medium text-text-primary mb-2">
                      {language === 'zh' ? '恢复建议：' : 'Recovery Tips:'}
                    </h4>
                    <ul className="space-y-1">
                      {(language === 'zh' ? benefit.resourcesZh : benefit.resources).map((resource: string, resourceIndex: number) => (
                        <li key={resourceIndex} className="text-xs text-text-secondary flex items-start">
                          <span className="text-primary mr-2 mt-0.5">•</span>
                          <span>{resource}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {!isUnlocked && (
                  <div className="mt-2 text-xs text-text-secondary opacity-70">
                    {language === 'zh' 
                      ? `第 ${index + 1} 天解锁` 
                      : `Unlocks on day ${index + 1}`
                    }
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Milestones */}
      <h2 className="font-medium text-lg mb-4 text-text-primary">{t('milestonesTitle')}</h2>
      <div className="space-y-3 mb-8">
        {(milestones || []).map((milestone: any, index: number) => {
          const achieved = milestone.achieved;
          const daysLeft = getDaysLeft(days, milestone.days);
          const isNext = !achieved && (index === 0 || (milestones[index - 1]?.achieved));
          
          return (
            <Card key={index} className={`bg-background-card rounded-xl transition-all duration-300 ${
              achieved ? 'ring-2 ring-primary bg-primary bg-opacity-5' : 
              isNext ? 'ring-1 ring-primary ring-opacity-50' : ''
            }`}>
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className={`p-3 rounded-full mr-4 transition-all duration-300 ${
                      achieved 
                        ? 'bg-primary shadow-lg shadow-primary/30' 
                        : isNext 
                          ? 'bg-primary bg-opacity-20 border-2 border-primary border-opacity-50' 
                          : 'bg-background-primary'
                    }`}>
                      {achieved ? (
                        <Award className="h-6 w-6 text-white" />
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${
                          isNext ? 'text-primary' : 'text-text-secondary'
                        }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-semibold ${achieved ? 'text-primary' : 'text-text-primary'}`}>
                        {milestone.days} {milestone.days === 1 ? t('daysSingle') : t('days')}
                      </h3>
                      <p className="text-sm text-text-secondary mt-1">
                        {getMilestoneDescription(milestone.days)}
                      </p>
                      {achieved && milestone.achievedDate && (
                        <p className="text-xs text-primary mt-1">
                          {language === 'zh' ? '完成于：' : 'Achieved on:'} {new Date(milestone.achievedDate).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                      achieved 
                        ? 'bg-primary bg-opacity-20 text-primary' 
                        : isNext
                          ? 'bg-warning bg-opacity-20 text-warning'
                          : 'bg-background-primary text-text-secondary'
                    }`}>
                      {achieved ? t('achieved') : isNext ? `${daysLeft} ${t('daysLeft')}` : `${daysLeft} ${t('daysLeft')}`}
                    </span>
                    {isNext && (
                      <p className="text-xs text-warning mt-1">
                        {language === 'zh' ? '下一个目标' : 'Next Goal'}
                      </p>
                    )}
                  </div>
                </div>
                
                {/* Progress bar for current milestone */}
                {isNext && (
                  <div className="mt-3 pt-3 border-t border-background-primary">
                    <div className="flex justify-between text-xs text-text-secondary mb-2">
                      <span>{language === 'zh' ? '进度' : 'Progress'}</span>
                      <span>{Math.round((days / milestone.days) * 100)}%</span>
                    </div>
                    <div className="w-full bg-background-primary rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-primary to-warning h-2 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min((days / milestone.days) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Share Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        dashboardData={dashboardData}
      />
    </div>
  );
}
