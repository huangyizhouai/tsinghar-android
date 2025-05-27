import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/use-language";

export default function LanguageSelector() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <Button 
      variant="ghost" 
      size="sm"
      onClick={toggleLanguage}
      className="px-2 h-8 text-text-secondary hover:text-text-primary"
    >
      {language === 'en' ? '中文' : 'EN'}
    </Button>
  );
}