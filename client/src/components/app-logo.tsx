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
        src="/icon_black.PNG"
        alt="清心"
        className={cn("w-full h-full object-contain", sizeMap[size])}
      />
    </div>
  );
}