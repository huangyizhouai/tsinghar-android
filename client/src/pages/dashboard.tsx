import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "wouter";
import { queryClient } from "@/lib/queryClient";
import { Heart, RotateCcw, Moon, MoreHorizontal, Settings, Timer, MessageCircle, BookOpen, Star, Waves, ThumbsUp, Award } from "lucide-react";
import PanicButton from "@/components/panic-button";
import PanicModal from "@/components/panic-modal";
import CheckInFlow from "@/components/check-in-flow";
import AppLogo from "@/components/app-logo";
import ProgressRing from "@/components/progress-ring";
import LiveStreakTimer from "@/components/live-streak-timer";
import WeekBar from "@/components/week-bar";
import BrainRewiringBar from "@/components/brain-rewiring-bar";
import StreakSwirlEmblem from "@/components/streak-swirl-emblem";
import TodoCard from "@/components/todo-card";
import ToolCard from "@/components/tool-card";
import MotivationalQuote from "@/components/motivational-quote";
import DeploymentClock from "@/components/deployment-clock";
import { useLanguage } from "@/hooks/use-language";

export default function Dashboard() {
  const [showPanicModal, setShowPanicModal] = useState(false);
  const [showCheckInFlow, setShowCheckInFlow] = useState(false);
  const { t } = useLanguage();
  
  const { data: streak, isLoading } = useQuery<{ currentStreak: number, startDate: string }>({
    queryKey: ['/api/streak'],
  });

  // Quick action buttons
  const quickActions = [
    {
      icon: <Timer className="h-6 w-6 text-primary" />,
      name: t('brainRewiring'),
      path: "/library#articles"
    },
    {
      icon: <RotateCcw className="h-6 w-6 text-warning" />,
      name: t('reset'),
      action: () => {
        fetch('/api/streak/reset', { method: 'POST' })
          .then(res => res.json())
          .then(() => {
            queryClient.invalidateQueries({ queryKey: ['/api/streak'] });
          })
          .catch(err => console.error('Failed to reset streak:', err));
      }
    },
    {
      icon: <Moon className="h-6 w-6 text-info" />,
      name: t('meditate'),
      path: "/menu" // Link to breathing exercise in menu
    },
    {
      icon: <MoreHorizontal className="h-6 w-6 text-text-secondary" />,
      name: t('menu'),
      path: "/menu"
    }
  ];

  // Navigation
  const [location, navigate] = useLocation();

  return (
    <>
      <div className="p-4 pt-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <AppLogo size="md" />
            <h1 className="text-xl font-semibold text-text-primary">{t('appName')}</h1>
          </div>
          <div className="flex items-center space-x-3">
            <DeploymentClock className="mr-2" showSeconds={true} format24={false} />
            <Link to="/achievements">
              <button className="p-2 rounded-full bg-background-card">
                <Award className="h-6 w-6 text-text-primary" />
              </button>
            </Link>
            <Link to="/menu">
              <button className="p-2 rounded-full bg-background-card">
                <Settings className="h-6 w-6 text-text-primary" />
              </button>
            </Link>
          </div>
        </div>

        {/* Time Display */}
        <div className="bg-background-card rounded-lg p-3 mb-2 text-center">
          <DeploymentClock className="justify-center" showSeconds={true} format24={false} />
        </div>

        {/* Week Progress Bar */}
        <div className="bg-background-card rounded-lg p-3 mb-2">
          <WeekBar />
        </div>
        
        {/* Daily Check-in Button */}
        <button 
          onClick={() => setShowCheckInFlow(true)}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg mb-6 flex items-center justify-center font-medium"
        >
          <span className="mr-2">✓</span> {t('dailyCheckIn')}
        </button>

        {/* Motivational Quote */}
        <div className="mb-6">
          <MotivationalQuote />
        </div>
        
        {/* Streak Timer with Swirl Emblem */}
        <div className="flex flex-col items-center mb-8 relative">
          {/* Star background effect for the entire streak area */}
          <div className="absolute inset-0 w-full h-full -z-10">
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full opacity-30"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animation: `twinkle ${2 + Math.random() * 4}s infinite`
                }}
              />
            ))}
          </div>
          
          {/* Swirl emblem from the spec */}
          <StreakSwirlEmblem
            days={streak?.currentStreak || 0}
            className="mb-4"
          />
          
          {/* Live timer display */}
          {streak?.startDate && (
            <LiveStreakTimer 
              startDate={streak.startDate} 
              className="mb-6" 
            />
          )}
          
          {/* Brain Rewiring Progress Bar */}
          <div className="w-full max-w-sm mb-2">
            <BrainRewiringBar days={streak?.currentStreak || 0} />
          </div>
          
          {/* Analytics Button */}
          <Link to="/analytics" className="w-full mt-4">
            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg flex items-center justify-center font-medium">
              <span className="mr-2">📊</span> {t('analytics')}
            </button>
          </Link>
        </div>
        
        {/* Todo Card */}
        <TodoCard />

        {/* Quick Actions - Using the 72dp circles with 48dp white glyphs as specified */}
        <div className="flex justify-between mb-8">
          {quickActions.map((action, index) => (
            <div key={index} className="flex flex-col items-center">
              {action.path ? (
                <Link to={action.path}>
                  <div className="quick-action-button mb-2">
                    {action.icon}
                  </div>
                </Link>
              ) : (
                <button onClick={action.action} className="quick-action-button mb-2">
                  {action.icon}
                </button>
              )}
              <span className="text-xs text-white">{action.name}</span>
            </div>
          ))}
        </div>

        {/* Recovery Tools */}
        <h2 className="font-medium text-lg mb-4 text-text-primary">{t('recoveryTools')}</h2>
        <div className="grid grid-cols-2 gap-4 mb-8">
          <ToolCard 
            icon={<BookOpen className="h-6 w-6 text-text-primary" />}
            title={t('learn')}
            description={t('knowledgeBase')}
            bgColor="bg-success-dark"
            path="/library"
          />
          <ToolCard 
            icon={<MessageCircle className="h-6 w-6 text-text-primary" />}
            title={t('chat')}
            description={t('getSupport')}
            bgColor="bg-info-dark"
            path="/community"
          />
          <ToolCard 
            icon={<Star className="h-6 w-6 text-text-primary" />}
            title={t('milestones')}
            description={t('trackProgress')}
            bgColor="bg-warning-dark"
            path="/progress"
          />
          <ToolCard 
            icon={<Heart className="h-6 w-6 text-text-primary" />}
            title={t('reasons')}
            description={t('whyStarted')}
            bgColor="bg-primary-dark"
            path="/reasons"
          />
        </div>

        {/* Mindfulness Resources */}
        <h2 className="font-medium text-lg mb-4 text-text-primary">{t('mindfulnessResources')}</h2>
        <div className="grid grid-cols-2 gap-4 mb-8">
          <ToolCard 
            icon={<Waves className="h-6 w-6 text-text-primary" />}
            title={t('breathing')}
            description={t('calmMind')}
            bgColor="bg-accent-dark"
            path="/menu"
          />
          <ToolCard 
            icon={<ThumbsUp className="h-6 w-6 text-text-primary" />}
            title={t('successStories')}
            description={t('getInspired')}
            bgColor="bg-primary-dark"
            path="/community"
          />
        </div>

        {/* Panic Button */}
        <div className="mt-4 mb-8">
          <PanicButton onClick={() => setShowPanicModal(true)} />
        </div>

        {/* Success Stories Section */}
        <div className="mb-8">
          <h2 className="font-medium text-lg mb-4 text-text-primary">{t('helpSuccessStories')}</h2>
          <div className="space-y-4">
            {[
              {
                id: 1,
                titleKey: 'successStory1Title',
                contentKey: 'successStory1Content',
                days: 90,
                age: 28
              },
              {
                id: 2,
                titleKey: 'successStory2Title',
                contentKey: 'successStory2Content',
                days: 180,
                age: 35
              },
              {
                id: 3,
                titleKey: 'successStory3Title',
                contentKey: 'successStory3Content',
                days: 60,
                age: 22
              }
            ].map((story) => (
              <div key={story.id} className="bg-background-card p-4 rounded-xl shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center">
                      <Star className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-text-primary mb-2 text-sm">
                      {t(story.titleKey)}
                    </h3>
                    <p className="text-text-secondary text-xs leading-relaxed mb-3">
                      {t(story.contentKey)}
                    </p>
                    <div className="flex gap-3 text-xs text-text-secondary">
                      <span className="bg-background-primary px-2 py-1 rounded">
                        {story.days} {t('days')}
                      </span>
                      <span className="bg-background-primary px-2 py-1 rounded">
                        {t('language') === 'zh' ? `${story.age}岁` : `Age ${story.age}`}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Panic Modal */}
      {showPanicModal && <PanicModal onClose={() => setShowPanicModal(false)} />}

      {/* Check-in Flow Modal */}
      {showCheckInFlow && <CheckInFlow onClose={() => setShowCheckInFlow(false)} />}
    </>
  );
}
