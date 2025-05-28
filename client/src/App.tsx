import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import Dashboard from "@/pages/dashboard";
import Progress from "@/pages/progress";
import Library from "@/pages/library";
import Community from "@/pages/community";
import Menu from "@/pages/menu";
import AchievementsPage from "@/pages/achievements";
import ReasonsPage from "@/pages/reasons";
import ProfilePage from "@/pages/profile";
import Navigation from "@/components/navigation";

function Router() {
  const [location] = useLocation();
  
  return (
    <div className="flex flex-col min-h-screen bg-background-primary dark text-white">
      <main className="flex-grow overflow-y-auto pb-16">
        <Switch>
          <Route path="/" component={Dashboard} />
          <Route path="/progress" component={Progress} />
          <Route path="/library" component={Library} />
          <Route path="/community" component={Community} />
          <Route path="/menu" component={Menu} />
          <Route path="/achievements" component={AchievementsPage} />
          <Route path="/reasons" component={ReasonsPage} />
          <Route path="/profile" component={ProfilePage} />
          <Route component={NotFound} />
        </Switch>
      </main>
      
      <Navigation currentPath={location} />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
