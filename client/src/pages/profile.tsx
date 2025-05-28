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
        title: t('error'),
        description: t('failedUpdateProfile'),
        variant: "destructive",
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
                {updateProfileMutation.isPending ? t('saving') : t('save')}
              </Button>
            </div>
          )}
        </div>

        {isLoading ? (
          <div className="text-center py-8">
            <div className="text-text-secondary">{t('loadingProfile')}</div>
          </div>
        ) : profile ? (
          <div className="space-y-4">
            {/* Basic Info Card */}
            <div className="bg-background-card p-6 rounded-xl shadow-lg">
              <h2 className="text-lg font-semibold text-text-primary mb-4">{t('basicInformation')}</h2>
              
              {/* Username */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  {t('username')}
                </label>
                <div className="text-text-primary font-medium">{profile.username}</div>
              </div>

              {/* Age */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  {t('age')}
                </label>
                {isEditing ? (
                  <Input
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    placeholder={t('enterAge')}
                    className="bg-background-primary border-background-primary"
                  />
                ) : (
                  <div className="text-text-primary">
                    {profile.age ? `${profile.age} ${t('yearsOld')}` : t('notSet')}
                  </div>
                )}
              </div>

              {/* Gender */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  {t('gender')}
                </label>
                {isEditing ? (
                  <Select value={formData.gender} onValueChange={(value) => setFormData({ ...formData, gender: value })}>
                    <SelectTrigger className="bg-background-primary border-background-primary">
                      <SelectValue placeholder={t('selectGender')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">{t('male')}</SelectItem>
                      <SelectItem value="female">{t('female')}</SelectItem>
                      <SelectItem value="other">{t('other')}</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="text-text-primary">
                    {profile.gender ? t(profile.gender) : t('notSet')}
                  </div>
                )}
              </div>

              {/* Location */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  <MapPin className="h-4 w-4 inline mr-1" />
                  {t('location')}
                </label>
                {isEditing ? (
                  <Input
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder={t('enterLocation')}
                    className="bg-background-primary border-background-primary"
                  />
                ) : (
                  <div className="text-text-primary">
                    {profile.location || t('notSet')}
                  </div>
                )}
              </div>

              {/* Recovery Goal */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  <Target className="h-4 w-4 inline mr-1" />
                  {t('recoveryGoal')}
                </label>
                {isEditing ? (
                  <Input
                    value={formData.recoveryGoal}
                    onChange={(e) => setFormData({ ...formData, recoveryGoal: e.target.value })}
                    placeholder={t('enterRecoveryGoal')}
                    className="bg-background-primary border-background-primary"
                  />
                ) : (
                  <div className="text-text-primary">
                    {profile.recoveryGoal || t('notSet')}
                  </div>
                )}
              </div>
            </div>

            {/* Journey Stats Card */}
            <div className="bg-background-card p-6 rounded-xl shadow-lg">
              <h2 className="text-lg font-semibold text-text-primary mb-4">{t('journeyStats')}</h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">
                    <Calendar className="h-4 w-4 inline mr-1" />
                    {t('joinDate')}
                  </label>
                  <div className="text-text-primary font-medium">
                    {formatDate(profile.joinDate)}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">
                    {t('currentStreak')}
                  </label>
                  <div className="text-text-primary font-medium">
                    {streak?.currentStreak || 0} {t('days')}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">
                    {t('bestStreak')}
                  </label>
                  <div className="text-text-primary font-medium">
                    {profile.streakRecord || 0} {t('days')}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">
                    {t('totalDays')}
                  </label>
                  <div className="text-text-primary font-medium">
                    {Math.floor((new Date().getTime() - new Date(profile.joinDate).getTime()) / (1000 * 60 * 60 * 24))} {t('days')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <User className="h-16 w-16 text-text-secondary mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-medium text-text-primary mb-2">
              {t('profileNotFound')}
            </h3>
            <p className="text-text-secondary">
              {t('unableToLoadProfile')}
            </p>
          </div>
        )}
      </div>

      <Navigation currentPath="/profile" />
    </div>
  );
}