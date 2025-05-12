import { Timer } from "lucide-react";
import { cn } from "@/lib/utils";

interface AppLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export default function AppLogo({ size = "md", className }: AppLogoProps) {
  // Size mapping
  const sizeMap = {
    sm: { container: "w-8 h-8", icon: "w-4 h-4" },
    md: { container: "w-12 h-12", icon: "w-6 h-6" },
    lg: { container: "w-16 h-16", icon: "w-8 h-8" },
    xl: { container: "w-24 h-24", icon: "w-12 h-12" },
  };

  return (
    <div className={cn("relative rounded-full", sizeMap[size].container, className)}>
      {/* Gradient background */}
      <div 
        className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-500 to-indigo-600"
        aria-hidden="true"
      />
      
      {/* Timer icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <Timer 
          className={cn("text-white", sizeMap[size].icon)} 
          strokeWidth={2.5}
        />
      </div>
    </div>
  );
}