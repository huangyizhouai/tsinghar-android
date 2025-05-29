import { cn } from "@/lib/utils";

interface AppLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export default function AppLogo({ size = "md", className }: AppLogoProps) {
  // Size mapping
  const sizeMap = {
    sm: "w-8 h-8",
    md: "w-12 h-12", 
    lg: "w-16 h-16",
    xl: "w-24 h-24",
  };

  return (
    <div className={cn("relative", sizeMap[size], className)}>
      <img 
        src="/icon_white.JPG"
        alt="清心"
        className={cn("w-full h-full object-contain", sizeMap[size])}
        style={{ 
          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
          mixBlendMode: 'normal'
        }}
      />
    </div>
  );
}