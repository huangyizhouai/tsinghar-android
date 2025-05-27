import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";

export default function LanguageSelector() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <Button 
      variant="ghost" 
      size="sm"
      onClick={toggleLanguage}
      className="px-3 h-8 text-text-secondary hover:text-text-primary flex items-center gap-1"
    >
      <Languages className="h-4 w-4" />
      <span className="font-medium">
        {language === 'en' ? '中文' : 'EN'}
      </span>
    </Button>
  );
}