import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { queryClient } from "@/lib/queryClient";
import { Heart, RotateCcw, Moon, MoreHorizontal, Settings, Timer, MessageCircle, BookOpen, Star, Waves, ThumbsUp } from "lucide-react";
import SectionHeader from "@/components/ui/section-header";
import StreakTimer from "@/components/streak-timer";
import PanicButton from "@/components/panic-button";
import PanicModal from "@/components/panic-modal";
import CardGrid from "@/components/ui/card-grid";
import { Separator } from "@/components/ui/separator";
import AppLogo from "@/components/app-logo";

export default function Dashboard() {
  const [showPanicModal, setShowPanicModal] = useState(false);
  
  const { data: streak, isLoading } = useQuery<{ currentStreak: number }>({
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

  // Recovery tools
  const recoveryTools = [
    {
      icon: <Heart className="h-6 w-6 text-text-primary" />,
      bgColor: "bg-primary-dark",
      title: "Reasons",
      description: "Why you started",
      path: "/menu" // Could be a dedicated page in the future
    },
    {
      icon: <MessageCircle className="h-6 w-6 text-text-primary" />,
      bgColor: "bg-info-dark",
      title: "Chat",
      description: "Get support",
      path: "/community"
    },
    {
      icon: <BookOpen className="h-6 w-6 text-text-primary" />,
      bgColor: "bg-success-dark",
      title: "Learn",
      description: "Knowledge base",
      path: "/library"
    },
    {
      icon: <Star className="h-6 w-6 text-text-primary" />,
      bgColor: "bg-warning-dark",
      title: "Milestones",
      description: "Track progress",
      path: "/progress"
    }
  ];

  // Mindfulness resources
  const mindfulnessResources = [
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.465a5 5 0 007.072 0m-9.9 2.829a9 9 0 0012.728 0" />
            </svg>,
      bgColor: "bg-accent-dark",
      title: "Breathing",
      description: "Calm your mind",
      path: "/menu" // Link to breathing exercise in menu
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
            </svg>,
      bgColor: "bg-primary-dark",
      title: "Success Stories",
      description: "Get inspired",
      path: "/community"
    }
  ];

  return (
    <>
      <div className="p-4 pt-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <AppLogo size="md" />
            <h1 className="text-xl font-semibold text-text-primary">NoFap Recovery</h1>
          </div>
          <Link to="/menu">
            <button className="p-2 rounded-full bg-background-card">
              <Settings className="h-6 w-6 text-text-primary" />
            </button>
          </Link>
        </div>

        {/* Streak Timer */}
        <div className="flex flex-col items-center mb-8">
          <StreakTimer days={streak?.currentStreak || 0} />
          <p className="text-text-secondary text-center max-w-md">
            You're making great progress! Stay strong and remember why you started.
          </p>
        </div>

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
        <CardGrid items={recoveryTools} className="mb-8" />

        {/* Mindfulness Resources */}
        <h2 className="font-medium text-lg mb-4 text-text-primary">Mindfulness Resources</h2>
        <CardGrid items={mindfulnessResources} className="mb-8" />

        {/* Panic Button */}
        <div className="mt-4 mb-8">
          <PanicButton onClick={() => setShowPanicModal(true)} />
        </div>
      </div>

      {/* Panic Modal */}
      {showPanicModal && <PanicModal onClose={() => setShowPanicModal(false)} />}
    </>
  );
}
