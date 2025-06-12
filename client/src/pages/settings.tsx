import { useState } from "react";
import { Settings, Globe, Bell, Moon, Sun, Volume2, VolumeX, ChevronLeft } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";

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
    <div className="p-4 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Link to="/menu">
          <button className="text-white p-2">
            <ChevronLeft className="w-6 h-6" />
          </button>
        </Link>
        <div className="flex items-center">
          <Settings className="h-8 w-8 text-primary mr-3" />
          <h1 className="text-2xl font-bold text-text-primary">{t('settings')}</h1>
        </div>
        <div className="w-8"></div> {/* Placeholder for balance */}
      </div>

      <div className="space-y-6">
        {/* Language Settings */}
        <div className="bg-background-card p-6 rounded-xl shadow-lg">
          <div className="flex items-center mb-4">
            <Globe className="h-6 w-6 text-primary mr-3" />
            <h2 className="text-lg font-semibold text-text-primary">{t('languageSettings')}</h2>
          </div>
          <p className="text-text-secondary mb-4">{t('languageDescription')}</p>
          <Select value={language} onValueChange={handleLanguageChange}>
            <SelectTrigger className="bg-background-primary border-background-primary text-text-primary">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-background-primary border-background-primary">
              <SelectItem value="en" className="text-text-primary hover:bg-background-card">{t('english')}</SelectItem>
              <SelectItem value="zh" className="text-text-primary hover:bg-background-card">{t('chinese')}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Notification Settings */}
        <div className="bg-background-card p-6 rounded-xl shadow-lg">
          <div className="flex items-center mb-4">
            <Bell className="h-6 w-6 text-primary mr-3" />
            <h2 className="text-lg font-semibold text-text-primary">{t('notificationSettings')}</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-text-primary font-medium">{t('dailyReminders')}</h3>
                <p className="text-text-secondary text-sm">{t('dailyRemindersDesc')}</p>
              </div>
              <Switch
                checked={notifications}
                onCheckedChange={handleNotificationToggle}
              />
            </div>
          </div>
        </div>

        {/* Audio Settings */}
        <div className="bg-background-card p-6 rounded-xl shadow-lg">
          <div className="flex items-center mb-4">
            {soundEffects ? (
              <Volume2 className="h-6 w-6 text-primary mr-3" />
            ) : (
              <VolumeX className="h-6 w-6 text-primary mr-3" />
            )}
            <h2 className="text-lg font-semibold text-text-primary">{t('audioSettings')}</h2>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-text-primary font-medium">{t('soundEffects')}</h3>
              <p className="text-text-secondary text-sm">{t('soundEffectsDesc')}</p>
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
  );
}