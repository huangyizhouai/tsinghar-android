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
import TodoCard from "@/components/todo-card";
import ToolCard from "@/components/tool-card";
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
      name: "Brain Rewiring",
      path: "/progress"
    },
    {
      icon: <RotateCcw className="h-6 w-6 text-warning" />,
      name: "Reset",
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
      name: "Meditate",
      path: "/menu" // Link to breathing exercise in menu
    },
    {
      icon: <MoreHorizontal className="h-6 w-6 text-text-secondary" />,
      name: "More",
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
            <h1 className="text-xl font-semibold text-text-primary">NoFap Recovery</h1>
          </div>
          <div className="flex space-x-2">
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

        {/* Streak Timer */}
        <div className="flex flex-col items-center mb-8">
          {streak?.startDate && (
            <LiveStreakTimer 
              startDate={streak.startDate} 
              className="mb-4" 
            />
          )}
          <ProgressRing 
            days={streak?.currentStreak || 0} 
            onClick={() => window.location.href = '/progress'} 
          />
          <p className="text-text-secondary text-center max-w-md mt-4">
            {t('progressMessage')}
          </p>
        </div>
        
        {/* Todo Card */}
        <TodoCard />

        {/* Quick Actions */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {quickActions.map((action, index) => (
            <div key={index} className="flex flex-col items-center">
              {action.path ? (
                <Link to={action.path}>
                  <div className="bg-background-card p-3 rounded-full mb-2">
                    {action.icon}
                  </div>
                </Link>
              ) : (
                <button onClick={action.action} className="bg-background-card p-3 rounded-full mb-2">
                  {action.icon}
                </button>
              )}
              <span className="text-xs text-text-secondary">{action.name}</span>
            </div>
          ))}
        </div>

        {/* Recovery Tools */}
        <h2 className="font-medium text-lg mb-4 text-text-primary">Recovery Tools</h2>
        <div className="grid grid-cols-2 gap-4 mb-8">
          <ToolCard 
            icon={<BookOpen className="h-6 w-6 text-text-primary" />}
            title="Learn"
            description="Knowledge base"
            bgColor="bg-success-dark"
            path="/library"
          />
          <ToolCard 
            icon={<MessageCircle className="h-6 w-6 text-text-primary" />}
            title="Chat"
            description="Get support"
            bgColor="bg-info-dark"
            path="/community"
          />
          <ToolCard 
            icon={<Star className="h-6 w-6 text-text-primary" />}
            title="Milestones"
            description="Track progress"
            bgColor="bg-warning-dark"
            path="/progress"
          />
          <ToolCard 
            icon={<Heart className="h-6 w-6 text-text-primary" />}
            title="Reasons"
            description="Why you started"
            bgColor="bg-primary-dark"
            path="/menu"
          />
        </div>

        {/* Mindfulness Resources */}
        <h2 className="font-medium text-lg mb-4 text-text-primary">Mindfulness Resources</h2>
        <div className="grid grid-cols-2 gap-4 mb-8">
          <ToolCard 
            icon={<Waves className="h-6 w-6 text-text-primary" />}
            title="Breathing"
            description="Calm your mind"
            bgColor="bg-accent-dark"
            path="/menu"
          />
          <ToolCard 
            icon={<ThumbsUp className="h-6 w-6 text-text-primary" />}
            title="Success Stories"
            description="Get inspired"
            bgColor="bg-primary-dark"
            path="/community"
          />
        </div>

        {/* Panic Button */}
        <div className="mt-4 mb-8">
          <PanicButton onClick={() => setShowPanicModal(true)} />
        </div>
      </div>

      {/* Panic Modal */}
      {showPanicModal && <PanicModal onClose={() => setShowPanicModal(false)} />}

      {/* Check-in Flow Modal */}
      {showCheckInFlow && <CheckInFlow onClose={() => setShowCheckInFlow(false)} />}
    </>
  );
}
