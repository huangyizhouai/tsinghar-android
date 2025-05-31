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
  const { t } = useLanguage();
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
        {(progressData || []).map((benefit: any, index: number) => {
          const data = benefitsData.find(b => b.name === benefit.benefit) || benefitsData[0];
          
          return (
            <Card key={index} className="bg-background-card rounded-xl overflow-hidden">
              {data.imageUrl && index === 0 && (
                <img 
                  src={data.imageUrl} 
                  alt={`Visual representation of ${data.name}`} 
                  className="w-full h-40 object-cover" 
                />
              )}
              <CardContent className={data.imageUrl && index === 0 ? "p-4" : "p-4"}>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-text-primary">{data.name}</h3>
                  <span className="text-xs text-primary">{benefit.percentage}%</span>
                </div>
                <p className="text-sm text-text-secondary mb-3">
                  {data.description}
                </p>
                <Progress value={benefit.percentage} className="h-1.5" />
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Milestones */}
      <h2 className="font-medium text-lg mb-4 text-text-primary">{t('milestonesTitle')}</h2>
      <Card className="bg-background-card rounded-xl p-4 mb-8">
        {(milestones || []).map((milestone: any, index: number) => {
          const achieved = milestone.achieved;
          const daysLeft = getDaysLeft(days, milestone.days);
          const data = milestonesData.find(m => m.days === milestone.days) || { days: milestone.days, description: "Milestone" };
          
          return (
            <div key={index} className={`flex justify-between items-center ${index < 3 ? 'mb-4' : ''}`}>
              <div className="flex items-center">
                <div className={`p-2 rounded-full mr-3 ${achieved ? 'bg-primary' : 'bg-background-primary'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${achieved ? 'text-text-primary' : 'text-text-secondary'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-text-primary">{milestone.days} {milestone.days === 1 ? t('daysSingle') : t('days')}</h3>
                  <p className="text-xs text-text-secondary">{data.description}</p>
                </div>
              </div>
              <span className={`text-xs px-2 py-1 rounded ${
                achieved 
                  ? 'bg-primary bg-opacity-20 text-primary' 
                  : 'bg-background-primary text-text-secondary'
              }`}>
                {achieved ? t('achieved') : `${daysLeft} ${t('daysLeft')}`}
              </span>
            </div>
          );
        })}
      </Card>

      {/* Share Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        dashboardData={dashboardData}
      />
    </div>
  );
}
