import { useState } from "react";
import { ArrowLeft, Heart, Brain, Users, Target, CheckCircle, Star } from "lucide-react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import AppLogo from "@/components/app-logo";
import { useLanguage } from "@/hooks/use-language";

export default function Help() {
  const { t } = useLanguage();

  const successStories = [
    {
      id: 1,
      titleKey: 'successStory1Title',
      contentKey: 'successStory1Content',
      days: 90,
      age: 28,
      improvement: 'focus_energy_confidence'
    },
    {
      id: 2,
      titleKey: 'successStory2Title',
      contentKey: 'successStory2Content',
      days: 180,
      age: 35,
      improvement: 'marriage_career'
    },
    {
      id: 3,
      titleKey: 'successStory3Title',
      contentKey: 'successStory3Content',
      days: 60,
      age: 22,
      improvement: 'academic_stress'
    }
  ];

  const appFeatures = [
    {
      icon: <Target className="h-6 w-6 text-primary" />,
      titleKey: 'streakTracking',
      descKey: 'streakTrackingDescription'
    },
    {
      icon: <Brain className="h-6 w-6 text-primary" />,
      titleKey: 'meditationTools',
      descKey: 'meditationToolsDescription'
    },
    {
      icon: <Heart className="h-6 w-6 text-primary" />,
      titleKey: 'personalReasons',
      descKey: 'personalReasonsDescription'
    },
    {
      icon: <Users className="h-6 w-6 text-primary" />,
      titleKey: 'communitySupport',
      descKey: 'communitySupportDescription'
    }
  ];

  const howItWorksSteps = [
    {
      icon: <Brain className="h-8 w-8 text-primary" />,
      titleKey: 'scienceBacked',
      descKey: 'scienceDescription'
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-primary" />,
      titleKey: 'dailyTools',
      descKey: 'dailyToolsDescription'
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      titleKey: 'communitySupport',
      descKey: 'communitySupportDescription'
    }
  ];

  return (
    <div className="p-4 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Link to="/menu">
            <button className="mr-3 p-2 rounded-full bg-background-card hover:bg-background-card/80 transition-colors">
              <ArrowLeft className="h-6 w-6 text-text-primary" />
            </button>
          </Link>
          <div className="flex items-center gap-3">
            <AppLogo size="md" />
            <h1 className="text-xl font-semibold text-text-primary">{t('helpAndSupport')}</h1>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <Tabs defaultValue="success" className="mb-6">
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="success" className="text-xs">{t('helpSuccessStories')}</TabsTrigger>
          <TabsTrigger value="how" className="text-xs">{t('howItWorks')}</TabsTrigger>
          <TabsTrigger value="features" className="text-xs">{t('appFeatures')}</TabsTrigger>
        </TabsList>

        {/* Success Stories Tab */}
        <TabsContent value="success" className="space-y-4 mt-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-text-primary mb-2">{t('helpSuccessStories')}</h2>
            <p className="text-text-secondary">{t('recoveryJourney')}</p>
          </div>

          {successStories.map((story) => (
            <Card key={story.id} className="bg-background-card rounded-xl">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center">
                      <Star className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-text-primary mb-2">
                      {t(story.titleKey)}
                    </h3>
                    <p className="text-text-secondary text-sm leading-relaxed mb-3">
                      {t(story.contentKey)}
                    </p>
                    <div className="flex gap-4 text-xs text-text-secondary">
                      <span className="bg-background-primary px-2 py-1 rounded">
                        {story.days} {t('days')}
                      </span>
                      <span className="bg-background-primary px-2 py-1 rounded">
                        {t('language') === 'zh' ? `${story.age}岁` : `Age ${story.age}`}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Call to Action */}
          <Card className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl">
            <CardContent className="p-6 text-center">
              <h3 className="font-semibold text-text-primary mb-2">
                {t('language') === 'zh' ? '开始您的康复之旅' : 'Start Your Recovery Journey'}
              </h3>
              <p className="text-text-secondary text-sm mb-4">
                {t('language') === 'zh' 
                  ? '加入成千上万已经改变生活的用户。今天就开始您的转变。' 
                  : 'Join thousands of users who have already transformed their lives. Start your transformation today.'}
              </p>
              <Link to="/dashboard">
                <button className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                  {t('getStarted')}
                </button>
              </Link>
            </CardContent>
          </Card>
        </TabsContent>

        {/* How It Works Tab */}
        <TabsContent value="how" className="space-y-4 mt-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-text-primary mb-2">{t('howItWorks')}</h2>
            <p className="text-text-secondary">
              {t('language') === 'zh' 
                ? '了解我们基于科学的康复方法' 
                : 'Understanding our science-based approach to recovery'}
            </p>
          </div>

          {howItWorksSteps.map((step, index) => (
            <Card key={index} className="bg-background-card rounded-xl">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                      {step.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-text-primary mb-2">
                      {t(step.titleKey)}
                    </h3>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      {t(step.descKey)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Scientific Facts */}
          <Card className="bg-background-card rounded-xl">
            <CardContent className="p-6">
              <h3 className="font-semibold text-text-primary mb-4">
                {t('language') === 'zh' ? '科学事实' : 'Scientific Facts'}
              </h3>
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-background-primary p-4 rounded-lg">
                  <div className="text-2xl font-bold text-primary mb-1">90%</div>
                  <div className="text-sm text-text-secondary">
                    {t('language') === 'zh' 
                      ? '使用我们应用90天的用户报告显著改善' 
                      : 'of users report significant improvement after 90 days'}
                  </div>
                </div>
                <div className="bg-background-primary p-4 rounded-lg">
                  <div className="text-2xl font-bold text-primary mb-1">73%</div>
                  <div className="text-sm text-text-secondary">
                    {t('language') === 'zh' 
                      ? '呼吸练习可减少冲动强度' 
                      : 'reduction in urge intensity with breathing exercises'}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* App Features Tab */}
        <TabsContent value="features" className="space-y-4 mt-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-text-primary mb-2">{t('appFeatures')}</h2>
            <p className="text-text-secondary">
              {t('language') === 'zh' 
                ? '探索帮助您成功的强大工具' 
                : 'Explore the powerful tools that help you succeed'}
            </p>
          </div>

          {appFeatures.map((feature, index) => (
            <Card key={index} className="bg-background-card rounded-xl">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      {feature.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-text-primary mb-2">
                      {t(feature.titleKey)}
                    </h3>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      {t(feature.descKey)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Quick Start Guide */}
          <Card className="bg-background-card rounded-xl">
            <CardContent className="p-6">
              <h3 className="font-semibold text-text-primary mb-4">
                {t('language') === 'zh' ? '快速开始指南' : 'Quick Start Guide'}
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center">1</div>
                  <span className="text-text-secondary text-sm">
                    {t('language') === 'zh' ? '设置您的康复理由' : 'Set up your recovery reasons'}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center">2</div>
                  <span className="text-text-secondary text-sm">
                    {t('language') === 'zh' ? '开始追踪您的每日进度' : 'Start tracking your daily progress'}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center">3</div>
                  <span className="text-text-secondary text-sm">
                    {t('language') === 'zh' ? '使用呼吸练习管理冲动' : 'Use breathing exercises to manage urges'}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center">4</div>
                  <span className="text-text-secondary text-sm">
                    {t('language') === 'zh' ? '与社区互动获得支持' : 'Engage with the community for support'}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}