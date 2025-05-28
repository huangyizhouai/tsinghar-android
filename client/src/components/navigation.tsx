import { Link } from "wouter";
import { cn } from "@/lib/utils";
import { Home, BarChart2, BookOpen, Users, Menu } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";

type NavigationProps = {
  currentPath: string;
};

export default function Navigation({ currentPath }: NavigationProps) {
  const { t } = useLanguage();
  
  const tabs = [
    {
      path: "/",
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

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 bg-background-secondary border-t border-background-card flex justify-around py-2 z-40">
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
