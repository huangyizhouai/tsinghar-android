import { useState } from "react";
import { Settings, Globe, Bell, Moon, Sun, Volume2, VolumeX, ChevronLeft, Trash2 } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Link, useLocation } from "wouter";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

export default function SettingsPage() {
  const { t, language, setLanguage } = useLanguage();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteStep, setDeleteStep] = useState(1);
  const [confirmationText, setConfirmationText] = useState("");

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

  const deleteAccountMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/user/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Failed to delete account');
      }
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: language === 'zh' ? '账户已删除' : 'Account Deleted',
        description: language === 'zh' 
          ? '您的账户和所有数据已被永久删除。'
          : 'Your account and all data have been permanently deleted.',
      });
      setTimeout(() => {
        setLocation('/');
      }, 2000);
    },
    onError: (error) => {
      toast({
        title: language === 'zh' ? '删除失败' : 'Deletion Failed',
        description: language === 'zh' 
          ? '无法删除账户，请稍后重试。'
          : 'Unable to delete account. Please try again later.',
        variant: 'destructive',
      });
    },
  });

  const handleDeleteAccount = () => {
    if (deleteStep === 1) {
      setDeleteStep(2);
    } else if (deleteStep === 2) {
      const expectedText = 'DELETE';
      if (confirmationText === expectedText) {
        deleteAccountMutation.mutate();
        setShowDeleteDialog(false);
      } else {
        toast({
          title: language === 'zh' ? '确认文本错误' : 'Incorrect Confirmation',
          description: language === 'zh' 
            ? '请输入"DELETE"以确认删除。'
            : 'Please type "DELETE" to confirm deletion.',
          variant: 'destructive',
        });
      }
    }
  };

  const handleCloseDeleteDialog = () => {
    setShowDeleteDialog(false);
    setDeleteStep(1);
    setConfirmationText('');
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

        {/* Account Management */}
        <div className="bg-background-card p-6 rounded-xl shadow-lg">
          <h2 className="text-lg font-semibold text-text-primary mb-4">{language === 'zh' ? '账户管理' : 'Account Management'}</h2>
          <div className="space-y-4">
            <Button 
              variant="destructive" 
              className="w-full bg-red-600 hover:bg-red-700"
              onClick={() => setShowDeleteDialog(true)}
            >
              {language === 'zh' ? '删除账户' : 'Delete Account'}
            </Button>
            <p className="text-xs text-text-secondary text-center">
              {language === 'zh' 
                ? '删除账户将永久移除您的所有数据，此操作无法撤销。'
                : 'Deleting your account will permanently remove all your data. This action cannot be undone.'}
            </p>
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

      {/* Delete Account Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={handleCloseDeleteDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-red-600 flex items-center gap-2">
              <Trash2 className="h-5 w-5" />
              {language === 'zh' ? '删除账户' : 'Delete Account'}
            </DialogTitle>
            <DialogDescription>
              {deleteStep === 1 ? (
                language === 'zh' 
                  ? '您确定要删除您的账户吗？此操作将永久删除您的所有数据，包括进度、成就和社区帖子。此操作无法撤销。'
                  : 'Are you sure you want to delete your account? This will permanently remove all your data, including progress, achievements, and community posts. This action cannot be undone.'
              ) : (
                language === 'zh'
                  ? '为确认删除，请在下方输入框中输入"DELETE"。'
                  : 'To confirm deletion, please type "DELETE" in the input field below.'
              )}
            </DialogDescription>
          </DialogHeader>
          
          {deleteStep === 2 && (
            <div className="py-4">
              <Input
                placeholder={language === 'zh' ? '输入 DELETE 以确认' : 'Type DELETE to confirm'}
                value={confirmationText}
                onChange={(e) => setConfirmationText(e.target.value)}
                className="text-center"
              />
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={handleCloseDeleteDialog}>
              {language === 'zh' ? '取消' : 'Cancel'}
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteAccount}
              disabled={deleteAccountMutation.isPending || (deleteStep === 2 && confirmationText !== 'DELETE')}
            >
              {deleteAccountMutation.isPending ? (
                language === 'zh' ? '删除中...' : 'Deleting...'
              ) : deleteStep === 1 ? (
                language === 'zh' ? '继续' : 'Continue'
              ) : (
                language === 'zh' ? '永久删除' : 'Delete Permanently'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}