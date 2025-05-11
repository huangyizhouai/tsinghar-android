import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Heart, RotateCcw, Moon, MoreHorizontal, Settings } from "lucide-react";
import SectionHeader from "@/components/ui/section-header";
import StreakTimer from "@/components/streak-timer";
import PanicButton from "@/components/panic-button";
import PanicModal from "@/components/panic-modal";
import CardGrid from "@/components/ui/card-grid";
import { Separator } from "@/components/ui/separator";

export default function Dashboard() {
  const [showPanicModal, setShowPanicModal] = useState(false);
  
  const { data: streak, isLoading } = useQuery({
    queryKey: ['/api/streak'],
  });

  // Quick action buttons
  const quickActions = [
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>,
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
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>,
      bgColor: "bg-info-dark",
      title: "Chat",
      description: "Get support",
      path: "/community"
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>,
      bgColor: "bg-success-dark",
      title: "Learn",
      description: "Knowledge base",
      path: "/library"
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>,
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
        <SectionHeader title="Dashboard">
          <Link to="/menu">
            <button className="p-2 rounded-full bg-background-card">
              <Settings className="h-6 w-6 text-text-primary" />
            </button>
          </Link>
        </SectionHeader>

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
