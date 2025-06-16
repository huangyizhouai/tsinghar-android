import { useState, useEffect } from 'react';
import { 
  getCurrentLanguage, 
  setLanguage as setAppLanguage,
  toggleLanguage as toggleAppLanguage,
  translate as translateText,
  type Language 
} from '@/lib/i18n';

export function useLanguage() {
  const [language, setLanguageState] = useState<Language>(getCurrentLanguage());
  
  // Update state when language changes
  useEffect(() => {
    const handleLanguageChange = () => {
      setLanguageState(getCurrentLanguage());
    };
    
    window.addEventListener('languagechange', handleLanguageChange);
    return () => {
      window.removeEventListener('languagechange', handleLanguageChange);
    };
  }, []);
  
  // Wrapper for translate
  const t = (key: string, params?: Record<string, string | number>) => {
    return translateText(key, params);
  };
  
  return {
    language,
    t,
    setLanguage: (lang: Language) => {
      setAppLanguage(lang);
      setLanguageState(lang);
      window.dispatchEvent(new Event('languagechange'));
    },
    toggleLanguage: () => {
      toggleAppLanguage();
      setLanguageState(getCurrentLanguage());
    }
  };
}