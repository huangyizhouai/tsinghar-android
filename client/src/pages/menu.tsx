import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { User, BookText, BarChart2, HelpCircle, Settings } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import SectionHeader from "@/components/ui/section-header";
import BreathingExercise from "@/components/breathing-exercise";
import { motivationalQuotes } from "@/lib/data";

export default function Menu() {
  const { data: streak } = useQuery({
    queryKey: ['/api/streak'],
  });
  
  // Get a random quote
  const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
  
  // Menu items
  const menuItems = [
    {
      icon: <User className="h-6 w-6 text-text-secondary" />,
      title: "My Profile",
      path: "/"
    },
    {
      icon: <BookText className="h-6 w-6 text-text-secondary" />,
      title: "My Journal",
      path: "/"
    },
    {
      icon: <BarChart2 className="h-6 w-6 text-text-secondary" />,
      title: "Leaderboard",
      path: "/progress"
    },
    {
      icon: <HelpCircle className="h-6 w-6 text-text-secondary" />,
      title: "Help & Support",
      path: "/"
    },
    {
      icon: <Settings className="h-6 w-6 text-text-secondary" />,
      title: "Settings",
      path: "/"
    }
  ];

  return (
    <div className="p-4 pt-6">
      <SectionHeader title="Menu" />

      {/* User Profile */}
      <Card className="bg-background-card rounded-xl mb-6">
        <CardContent className="p-6 flex items-center">
          <div className="bg-primary text-white text-base rounded-full w-12 h-12 flex items-center justify-center mr-4">
            JD
          </div>
          <div>
            <h2 className="font-medium text-lg text-text-primary">John Doe</h2>
            <p className="text-text-secondary">{streak?.currentStreak || 0} Day Streak</p>
          </div>
        </CardContent>
      </Card>

      {/* Menu Items */}
      <div className="space-y-2 mb-6">
        {menuItems.map((item, index) => (
          <Link key={index} to={item.path}>
            <Card className="bg-background-card rounded-xl">
              <CardContent className="p-4 flex items-center">
                {item.icon}
                <span className="text-text-primary ml-4">{item.title}</span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Inspirational Quote */}
      <Card className="bg-background-card rounded-xl overflow-hidden mb-6">
        <img 
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400" 
          alt="Mountain peak representing achievement and goal setting" 
          className="w-full h-40 object-cover" 
        />
        <CardContent className="p-4">
          <h3 className="font-medium text-text-primary mb-2">Daily Motivation</h3>
          <p className="text-sm text-text-secondary italic">
            "{randomQuote.quote}"
          </p>
          <p className="text-xs text-text-secondary mt-1">― {randomQuote.author}</p>
        </CardContent>
      </Card>

      {/* Breathing Exercise */}
      <BreathingExercise />
    </div>
  );
}
