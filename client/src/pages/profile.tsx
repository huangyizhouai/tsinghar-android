import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { User, Edit, Save, Calendar, MapPin, Target } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { queryClient } from "@/lib/queryClient";
import Navigation from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface UserProfile {
  id: number;
  username: string;
  age?: number;
  gender?: string;
  location?: string;
  recoveryGoal?: string;
  joinDate: string;
  streakRecord?: number;
}

export default function ProfilePage() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    location: '',
    recoveryGoal: ''
  });

  const { data: profile, isLoading } = useQuery<UserProfile>({
    queryKey: ['/api/profile'],
  });

  const { data: streak } = useQuery<{ currentStreak: number, startDate: string }>({
    queryKey: ['/api/streak'],
  });

  const updateProfileMutation = useMutation({
    mutationFn: async (profileData: any) => {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData),
      });
      if (!response.ok) throw new Error('Failed to update profile');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/profile'] });
      setIsEditing(false);
      toast({
        title: t('profileUpdated'),
        description: t('profileUpdatedDesc'),
      });
    },
    onError: () => {
      toast({
        title: t('updateFailed'),
        description: t('updateFailedDesc'),
        variant: 'destructive',
      });
    },
  });

  const handleEdit = () => {
    if (profile) {
      setFormData({
        age: profile.age?.toString() || '',
        gender: profile.gender || '',
        location: profile.location || '',
        recoveryGoal: profile.recoveryGoal || ''
      });
    }
    setIsEditing(true);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    const updatedData = {
      age: formData.age ? parseInt(formData.age) : null,
      gender: formData.gender || null,
      location: formData.location || null,
      recoveryGoal: formData.recoveryGoal || null
    };
    updateProfileMutation.mutate(updatedData);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      age: '',
      gender: '',
      location: '',
      recoveryGoal: ''
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(t('locale'), {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="p-4 pt-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-text-secondary">{t('loading')}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <User className="h-8 w-8 text-primary mr-3" />
          <h1 className="text-2xl font-bold text-text-primary">{t('personalInformation')}</h1>
        </div>
        {!isEditing ? (
          <Button 
            onClick={handleEdit}
            className="bg-primary hover:bg-primary-light text-white rounded-full p-3"
          >
            <Edit className="h-5 w-5" />
          </Button>
        ) : (
          <div className="flex space-x-2">
            <Button 
              onClick={handleCancel}
              variant="outline"
              className="border-background-primary text-text-secondary"
            >
              {t('cancel')}
            </Button>
            <Button 
              onClick={handleSave}
              disabled={updateProfileMutation.isPending}
              className="bg-primary hover:bg-primary-light text-white"
            >
              <Save className="h-4 w-4 mr-2" />
              {t('save')}
            </Button>
          </div>
        )}
      </div>

      <div className="space-y-6">
        {/* Basic Information */}
        <div className="bg-background-card p-6 rounded-xl shadow-lg">
          <h2 className="text-lg font-semibold text-text-primary mb-4">{t('basicInformation')}</h2>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-text-secondary">{t('username')}</span>
              <span className="text-text-primary font-medium">{profile?.username}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-text-secondary">{t('age')}</span>
              {isEditing ? (
                <Input
                  type="number"
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  className="w-24 bg-background-primary border-background-primary text-text-primary"
                  placeholder="25"
                />
              ) : (
                <span className="text-text-primary">{profile?.age || t('notSet')}</span>
              )}
            </div>

            <div className="flex justify-between items-center">
              <span className="text-text-secondary">{t('gender')}</span>
              {isEditing ? (
                <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                  <SelectTrigger className="w-32 bg-background-primary border-background-primary text-text-primary">
                    <SelectValue placeholder={t('selectGender')} />
                  </SelectTrigger>
                  <SelectContent className="bg-background-primary border-background-primary">
                    <SelectItem value="male" className="text-text-primary hover:bg-background-card">{t('male')}</SelectItem>
                    <SelectItem value="female" className="text-text-primary hover:bg-background-card">{t('female')}</SelectItem>
                    <SelectItem value="other" className="text-text-primary hover:bg-background-card">{t('other')}</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <span className="text-text-primary">{profile?.gender ? t(profile.gender) : t('notSet')}</span>
              )}
            </div>

            <div className="flex justify-between items-center">
              <span className="text-text-secondary flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                {t('location')}
              </span>
              {isEditing ? (
                <Input
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="w-40 bg-background-primary border-background-primary text-text-primary"
                  placeholder={t('city')}
                />
              ) : (
                <span className="text-text-primary">{profile?.location || t('notSet')}</span>
              )}
            </div>
          </div>
        </div>

        {/* Recovery Goals */}
        <div className="bg-background-card p-6 rounded-xl shadow-lg">
          <h2 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
            <Target className="h-5 w-5 mr-2" />
            {t('recoveryGoals')}
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="text-text-secondary text-sm mb-2 block">{t('primaryGoal')}</label>
              {isEditing ? (
                <Select value={formData.recoveryGoal} onValueChange={(value) => handleInputChange('recoveryGoal', value)}>
                  <SelectTrigger className="bg-background-primary border-background-primary text-text-primary">
                    <SelectValue placeholder={t('selectGoal')} />
                  </SelectTrigger>
                  <SelectContent className="bg-background-primary border-background-primary">
                    <SelectItem value="30days" className="text-text-primary hover:bg-background-card">{t('thirtyDays')}</SelectItem>
                    <SelectItem value="90days" className="text-text-primary hover:bg-background-card">{t('ninetyDays')}</SelectItem>
                    <SelectItem value="1year" className="text-text-primary hover:bg-background-card">{t('oneYear')}</SelectItem>
                    <SelectItem value="forever" className="text-text-primary hover:bg-background-card">{t('forever')}</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <span className="text-text-primary">{profile?.recoveryGoal ? t(profile.recoveryGoal) : t('notSet')}</span>
              )}
            </div>
          </div>
        </div>

        {/* Account Statistics */}
        <div className="bg-background-card p-6 rounded-xl shadow-lg">
          <h2 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            {t('accountStatistics')}
          </h2>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-text-secondary">{t('memberSince')}</span>
              <span className="text-text-primary">{profile?.joinDate ? formatDate(profile.joinDate) : t('unknown')}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-text-secondary">{t('currentStreak')}</span>
              <span className="text-primary font-bold">{streak?.currentStreak || 0} {t('days')}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-text-secondary">{t('bestStreak')}</span>
              <span className="text-text-primary">{profile?.streakRecord || 0} {t('days')}</span>
            </div>
          </div>
        </div>
      </div>

      <Navigation currentPath="/profile" />
    </div>
  );
}