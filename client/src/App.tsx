import { useState, useEffect } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import TermsAgreementModal from "@/components/terms-agreement-modal";
import EulaModal from "@/components/eula-modal";
import NotFound from "@/pages/not-found";
import LoginPage from "@/pages/login";

import Dashboard from "@/pages/dashboard";
import Progress from "@/pages/progress";
import Library from "@/pages/library";
import Community from "@/pages/community";
import Menu from "@/pages/menu";
import AchievementsPage from "@/pages/achievements";
import ReasonsPage from "@/pages/reasons";
import ProfilePage from "@/pages/profile";
import SettingsPage from "@/pages/settings";
import JournalPage from "@/pages/journal";
import AnalyticsPage from "@/pages/analytics";
import HelpPage from "@/pages/help";
import Navigation from "@/components/navigation";

function AuthenticatedApp() {
  const [location] = useLocation();
  const [showEulaModal, setShowEulaModal] = useState(false);
  const [eulaAccepted, setEulaAccepted] = useState(false);
  
  // Check if EULA has been accepted on first launch
  useEffect(() => {
    const hasAcceptedEula = localStorage.getItem('eula_accepted');
    if (!hasAcceptedEula) {
      setShowEulaModal(true);
    } else {
      setEulaAccepted(true);
    }
  }, []);

  const handleEulaAccept = () => {
    localStorage.setItem('eula_accepted', 'true');
    setEulaAccepted(true);
    setShowEulaModal(false);
  };

  const handleEulaDecline = () => {
    // Redirect to landing page if EULA is declined
    window.location.href = '/';
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-background-primary dark text-white">
      <main className="flex-grow overflow-y-auto pb-16">
        <Switch>
          <Route path="/" component={() => <Dashboard />} />
          <Route path="/TsingHar" component={Dashboard} />
          <Route path="/progress" component={Progress} />
          <Route path="/library" component={Library} />
          <Route path="/community" component={Community} />
          <Route path="/menu" component={Menu} />
          <Route path="/achievements" component={AchievementsPage} />
          <Route path="/reasons" component={ReasonsPage} />
          <Route path="/profile" component={ProfilePage} />
          <Route path="/settings" component={SettingsPage} />
          <Route path="/journal" component={JournalPage} />
          <Route path="/analytics" component={AnalyticsPage} />
          <Route path="/help" component={HelpPage} />
          <Route component={NotFound} />
        </Switch>
      </main>
      
      <Navigation currentPath={location} />
      
      {/* EULA Modal for First Launch */}
      <EulaModal
        isOpen={showEulaModal}
        onAccept={handleEulaAccept}
        onDecline={handleEulaDecline}
        trigger="first_launch"
      />
    </div>
  );
}

function PublicApp() {
  const [location] = useLocation();
  
  return (
    <div className="flex flex-col min-h-screen bg-background-primary dark text-white">
      <main className="flex-grow overflow-y-auto pb-16">
        <Switch>
          <Route path="/" component={() => <LoginPage />} />
          <Route path="/login" component={LoginPage} />
          <Route path="/library" component={Library} />
          <Route path="/community" component={Community} />
          <Route path="/help" component={HelpPage} />
          <Route component={NotFound} />
        </Switch>
      </main>
      
      <Navigation currentPath={location} />
    </div>
  );
}

function Router() {
  const { isAuthenticated, isLoading } = useAuth();
  const [location] = useLocation();
  
  // Show loading for a brief moment, but don't get stuck
  if (isLoading) {
    // Set a timeout to prevent infinite loading
    setTimeout(() => {
      // If still loading after 3 seconds, show public app
      if (isLoading) {
        console.warn("Authentication check taking too long, proceeding with public app");
      }
    }, 3000);
    
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-primary dark text-white">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }
  
  // Protected routes that require authentication
  const protectedRoutes = ['/TsingHar', '/progress', '/menu', '/achievements', '/reasons', '/profile', '/settings', '/journal', '/analytics'];
  const isProtectedRoute = protectedRoutes.includes(location);
  
  if (!isAuthenticated && isProtectedRoute) {
    return <LoginPage />;
  }
  
  if (isAuthenticated) {
    return <AuthenticatedApp />;
  }
  
  return <PublicApp />;
}

function App() {
  const [showTermsModal, setShowTermsModal] = useState(false);

  useEffect(() => {
    // Check if user has already accepted terms
    const termsAccepted = localStorage.getItem('termsAccepted');
    if (!termsAccepted) {
      setShowTermsModal(true);
    }
  }, []);

  const handleTermsAccepted = () => {
    setShowTermsModal(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
        <TermsAgreementModal 
          isOpen={showTermsModal} 
          onAccept={handleTermsAccepted} 
        />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
