import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { getCurrentLanguage, toggleLanguage, type Language } from "@/lib/i18n";

export default function LanguageSelector() {
  const [language, setLanguage] = useState<Language>(getCurrentLanguage());

  // Listen for language changes
  useEffect(() => {
    const handleLanguageChange = () => {
      setLanguage(getCurrentLanguage());
    };

    window.addEventListener('languagechange', handleLanguageChange);
    return () => {
      window.removeEventListener('languagechange', handleLanguageChange);
    };
  }, []);

  const handleToggleLanguage = () => {
    toggleLanguage();
    setLanguage(getCurrentLanguage());
  };

  return (
    <Button 
      variant="ghost" 
      size="sm"
      onClick={handleToggleLanguage}
      className="px-2 h-8 text-text-secondary hover:text-text-primary"
    >
      {language === 'en' ? '中文' : 'EN'}
    </Button>
  );
}