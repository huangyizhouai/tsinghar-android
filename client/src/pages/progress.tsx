import { useQuery } from "@tanstack/react-query";
import { Share } from "lucide-react";
import SectionHeader from "@/components/ui/section-header";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { calculateRecoveryPercentage, getDaysLeft } from "@/lib/utils";
import { benefitsData, milestonesData } from "@/lib/data";

export default function ProgressPage() {
  const { data: streak, isLoading: streakLoading } = useQuery({
    queryKey: ['/api/streak'],
  });
  
  const { data: progressData, isLoading: progressLoading } = useQuery({
    queryKey: ['/api/progress'],
  });
  
  const { data: milestones, isLoading: milestonesLoading } = useQuery({
    queryKey: ['/api/milestones'],
  });
  
  const days = streak?.currentStreak || 0;
  const recoveryPercentage = calculateRecoveryPercentage(days);
  
  const motivationalText = () => {
    if (days === 0) {
      return "Today marks the beginning of a powerful journey. Remember, small steps lead to great changes.";
    } else if (days < 7) {
      return "The first few days are challenging, but you're building momentum. Each day strengthens your resolve.";
    } else if (days < 30) {
      return "You've made it through the toughest part! Your brain is already beginning to heal.";
    } else {
      return "Incredible progress! Your commitment to this journey is creating lasting positive changes.";
    }
  };

  return (
    <div className="p-4 pt-6">
      <SectionHeader title="Progress">
        <button className="p-2 rounded-full bg-background-card">
          <Share className="h-6 w-6 text-text-primary" />
        </button>
      </SectionHeader>

      {/* Recovery Percentage */}
      <Card className="bg-background-card rounded-xl mb-6">
        <CardContent className="p-6">
          <div className="text-center mb-4">
            <h2 className="font-bold text-4xl text-primary">{recoveryPercentage}%</h2>
            <p className="text-text-secondary">Recovery</p>
          </div>
          <Progress value={recoveryPercentage} className="h-2.5 mb-4" />
          <p className="text-sm text-text-secondary text-center">
            {motivationalText()}
          </p>
        </CardContent>
      </Card>

      {/* Recovery Benefits */}
      <h2 className="font-medium text-lg mb-4 text-text-primary">Recovery Benefits</h2>
      
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
      <h2 className="font-medium text-lg mb-4 text-text-primary">Milestones</h2>
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
                  <h3 className="font-medium text-text-primary">{milestone.days} {milestone.days === 1 ? 'Day' : 'Days'}</h3>
                  <p className="text-xs text-text-secondary">{data.description}</p>
                </div>
              </div>
              <span className={`text-xs px-2 py-1 rounded ${
                achieved 
                  ? 'bg-primary bg-opacity-20 text-primary' 
                  : 'bg-background-primary text-text-secondary'
              }`}>
                {achieved ? 'Achieved' : `${daysLeft} days left`}
              </span>
            </div>
          );
        })}
      </Card>
    </div>
  );
}
