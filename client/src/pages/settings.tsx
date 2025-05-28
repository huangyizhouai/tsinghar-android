import { useState } from "react";
import { Settings, Globe, Bell, Moon, Sun, Volume2, VolumeX } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import Navigation from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

export default function SettingsPage() {
  const { t, language, setLanguage } = useLanguage();
  const { toast } = useToast();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);

  const handleLanguageChange = (newLanguage: 'en' | 'zh') => {
    setLanguage(newLanguage);
    toast({
      title: t('languageChanged'),
      description: t('languageChangedDesc'),
    });
  };

  const handleNotificationToggle = (enabled: boolean) => {
    setNotifications(enabled);
    toast({
      title: enabled ? t('notificationsEnabled') : t('notificationsDisabled'),
      description: enabled ? t('notificationsEnabledDesc') : t('notificationsDisabledDesc'),
    });
  };

  const handleSoundToggle = (enabled: boolean) => {
    setSoundEffects(enabled);
    toast({
      title: enabled ? t('soundEnabled') : t('soundDisabled'),
      description: enabled ? t('soundEnabledDesc') : t('soundDisabledDesc'),
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white relative overflow-hidden">
      {/* Animated stars background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-70"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `twinkle ${2 + Math.random() * 4}s infinite`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 p-4 pb-20">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Settings className="h-8 w-8 text-primary mr-3" />
          <h1 className="text-2xl font-bold text-text-primary">{t('settings')}</h1>
        </div>

        <div className="space-y-6">
          {/* Language Settings */}
          <div className="bg-background-card p-6 rounded-xl shadow-lg">
            <div className="flex items-center mb-4">
              <Globe className="h-6 w-6 text-primary mr-3" />
              <h2 className="text-lg font-semibold text-text-primary">{t('languageSettings')}</h2>
            </div>
            
            <div className="space-y-3">
              <label className="block text-sm font-medium text-text-secondary">
                {t('selectLanguage')}
              </label>
              <Select value={language} onValueChange={handleLanguageChange}>
                <SelectTrigger className="bg-background-primary border-background-primary">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="zh">🇨🇳 {t('chinese')}</SelectItem>
                  <SelectItem value="en">🇺🇸 {t('english')}</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-text-secondary">
                {t('languageDescription')}
              </p>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-background-card p-6 rounded-xl shadow-lg">
            <div className="flex items-center mb-4">
              <Bell className="h-6 w-6 text-primary mr-3" />
              <h2 className="text-lg font-semibold text-text-primary">{t('notificationSettings')}</h2>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-primary font-medium">{t('dailyReminders')}</p>
                <p className="text-sm text-text-secondary">{t('dailyRemindersDesc')}</p>
              </div>
              <Switch
                checked={notifications}
                onCheckedChange={handleNotificationToggle}
              />
            </div>
          </div>

          {/* Theme Settings */}
          <div className="bg-background-card p-6 rounded-xl shadow-lg">
            <div className="flex items-center mb-4">
              {darkMode ? (
                <Moon className="h-6 w-6 text-primary mr-3" />
              ) : (
                <Sun className="h-6 w-6 text-primary mr-3" />
              )}
              <h2 className="text-lg font-semibold text-text-primary">{t('themeSettings')}</h2>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-primary font-medium">{t('darkMode')}</p>
                <p className="text-sm text-text-secondary">{t('darkModeDesc')}</p>
              </div>
              <Switch
                checked={darkMode}
                onCheckedChange={setDarkMode}
                disabled
              />
            </div>
            <p className="text-xs text-text-secondary mt-2">
              {t('darkModeNote')}
            </p>
          </div>

          {/* Sound Settings */}
          <div className="bg-background-card p-6 rounded-xl shadow-lg">
            <div className="flex items-center mb-4">
              {soundEffects ? (
                <Volume2 className="h-6 w-6 text-primary mr-3" />
              ) : (
                <VolumeX className="h-6 w-6 text-primary mr-3" />
              )}
              <h2 className="text-lg font-semibold text-text-primary">{t('soundSettings')}</h2>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-primary font-medium">{t('soundEffects')}</p>
                <p className="text-sm text-text-secondary">{t('soundEffectsDesc')}</p>
              </div>
              <Switch
                checked={soundEffects}
                onCheckedChange={handleSoundToggle}
              />
            </div>
          </div>

          {/* App Information */}
          <div className="bg-background-card p-6 rounded-xl shadow-lg">
            <h2 className="text-lg font-semibold text-text-primary mb-4">{t('appInformation')}</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-text-secondary">{t('appName')}</span>
                <span className="text-text-primary">{t('appName')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">{t('version')}</span>
                <span className="text-text-primary">1.0.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">{t('buildDate')}</span>
                <span className="text-text-primary">2025-01-28</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Navigation currentPath="/settings" />
    </div>
  );
}