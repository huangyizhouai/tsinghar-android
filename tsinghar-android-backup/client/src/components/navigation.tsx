import { Link } from "wouter";
import { cn } from "@/lib/utils";
import { Home, BarChart2, BookOpen, Users, Menu, LogIn } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { useAuth } from "@/hooks/useAuth";

type NavigationProps = {
  currentPath: string;
};

export default function Navigation({ currentPath }: NavigationProps) {
  const { t } = useLanguage();
  const { isAuthenticated } = useAuth();
  
  // Public tabs for unauthenticated users - Login moved to the left
  const publicTabs = [
    {
      path: "/login",
      label: t('login'),
      icon: <LogIn className="h-6 w-6" />,
    },
    {
      path: "/library",
      label: t('library'),
      icon: <BookOpen className="h-6 w-6" />,
    },
    {
      path: "/community",
      label: t('community'),
      icon: <Users className="h-6 w-6" />,
    },
    {
      path: "/help",
      label: t('help'),
      icon: <Menu className="h-6 w-6" />,
    },
  ];

  // Full tabs for authenticated users
  const authenticatedTabs = [
    {
      path: "/TsingHar",
      label: t('dashboard'),
      icon: <Home className="h-6 w-6" />,
    },
    {
      path: "/progress",
      label: t('progress'),
      icon: <BarChart2 className="h-6 w-6" />,
    },
    {
      path: "/library",
      label: t('library'),
      icon: <BookOpen className="h-6 w-6" />,
    },
    {
      path: "/community",
      label: t('community'),
      icon: <Users className="h-6 w-6" />,
    },
    {
      path: "/menu",
      label: t('menu'),
      icon: <Menu className="h-6 w-6" />,
    },
  ];
  
  const tabs = isAuthenticated ? authenticatedTabs : publicTabs;

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 bg-[#101022] rounded-t-2xl flex justify-around py-2 z-40 shadow-[0_-4px_20px_-4px_rgba(0,0,0,0.6)]" style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 8px)' }}>
        {tabs.map(({ path, label, icon }) => {
          const isActive = (currentPath === "/" && path === "/") || 
                          (currentPath !== "/" && path !== "/" && currentPath.startsWith(path));
          
          return (
            <Link key={path} to={path}>
              <button
                className={cn(
                  "flex flex-col items-center py-1 px-3",
                  isActive ? "text-primary" : "text-text-secondary"
                )}
              >
                {icon}
                <span className="text-xs mt-1">{label}</span>
              </button>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
