import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { TrendingUp, Calendar, Target, Award, Brain, Clock } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import AppLogo from "@/components/app-logo";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function Analytics() {
  const { t } = useLanguage();
  
  const { data: streak } = useQuery<{ currentStreak: number; bestStreak: number; startDate: string }>({
    queryKey: ['/api/streak'],
  });

  const { data: milestones } = useQuery<Array<{ days: number; achieved: boolean }>>({
    queryKey: ['/api/milestones'],
  });

  const { data: progress } = useQuery<Array<{ benefit: string; percentage: number }>>({
    queryKey: ['/api/progress'],
  });

  // Generate progress data for the last 7 days
  const generateProgressData = () => {
    const data = [];
    const currentStreak = streak?.currentStreak || 0;
    
    for (let i = 6; i >= 0; i--) {
      const day = currentStreak - i;
      data.push({
        day: day > 0 ? day : 0,
        date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' }),
        progress: Math.min((day > 0 ? day : 0) * 2.2, 100) // Progress calculation
      });
    }
    return data;
  };

  // Brain rewiring progress data
  const brainRewiringData = [
    { stage: t('day1to7'), days: 7, completed: (streak?.currentStreak || 0) >= 7 },
    { stage: t('day8to15'), days: 15, completed: (streak?.currentStreak || 0) >= 15 },
    { stage: t('day16to30'), days: 30, completed: (streak?.currentStreak || 0) >= 30 },
    { stage: t('day31to45'), days: 45, completed: (streak?.currentStreak || 0) >= 45 },
  ];

  // Recovery benefits progress
  const benefitsData = progress?.map(item => ({
    name: item.benefit,
    value: item.percentage,
    color: item.percentage > 75 ? '#22c55e' : item.percentage > 50 ? '#3b82f6' : '#f59e0b'
  })) || [];

  const progressData = generateProgressData();

  // Achievement stats
  const achievedMilestones = milestones?.filter(m => m.achieved).length || 0;
  const totalMilestones = milestones?.length || 0;
  const achievementRate = totalMilestones > 0 ? Math.round((achievedMilestones / totalMilestones) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated background stars */}
      <div className="absolute inset-0 z-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full opacity-20 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 3 + 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 p-4 pb-20">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Link to="/">
              <button className="p-2 rounded-full bg-white/10 backdrop-blur-sm">
                <ArrowLeft className="h-5 w-5 text-white" />
              </button>
            </Link>
            <AppLogo size="sm" />
            <h1 className="text-xl font-semibold text-white">{t('analytics')}</h1>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="h-6 w-6 text-green-400" />
              </div>
              <div className="text-2xl font-bold text-white">{streak?.currentStreak || 0}</div>
              <div className="text-sm text-gray-300">{t('currentStreak')}</div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Award className="h-6 w-6 text-yellow-400" />
              </div>
              <div className="text-2xl font-bold text-white">{streak?.bestStreak || 0}</div>
              <div className="text-sm text-gray-300">{t('bestStreak')}</div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Target className="h-6 w-6 text-blue-400" />
              </div>
              <div className="text-2xl font-bold text-white">{achievementRate}%</div>
              <div className="text-sm text-gray-300">{t('achievementRate')}</div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Brain className="h-6 w-6 text-purple-400" />
              </div>
              <div className="text-2xl font-bold text-white">
                {Math.min(Math.round(((streak?.currentStreak || 0) / 45) * 100), 100)}%
              </div>
              <div className="text-sm text-gray-300">{t('brainRewiring')}</div>
            </CardContent>
          </Card>
        </div>

        {/* Progress Overview */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 mb-6">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              {t('weeklyProgress')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {progressData.map((data, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-white text-sm">{data.date}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-gray-700 rounded-full">
                      <div 
                        className="h-2 bg-blue-500 rounded-full transition-all duration-500"
                        style={{ width: `${data.progress}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-300">{Math.round(data.progress)}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Brain Rewiring Stages */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 mb-6">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Brain className="h-5 w-5" />
              {t('brainRewiringStages')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {brainRewiringData.map((stage, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full ${stage.completed ? 'bg-green-500' : 'bg-gray-500'}`} />
                    <span className="text-white">{stage.stage}</span>
                  </div>
                  <span className="text-sm text-gray-300">{stage.days} {t('days')}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recovery Benefits */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Clock className="h-5 w-5" />
              {t('recoveryBenefits')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {benefitsData.map((benefit, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-white">{benefit.name}</span>
                    <span className="text-gray-300">{benefit.value}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full transition-all duration-500"
                      style={{ 
                        width: `${benefit.value}%`,
                        backgroundColor: benefit.color 
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}