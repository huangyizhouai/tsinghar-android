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
        <TabsList className="w-full grid grid-cols-4">
          <TabsTrigger value="success" className="text-xs">{t('helpSuccessStories')}</TabsTrigger>
          <TabsTrigger value="how" className="text-xs">{t('howItWorks')}</TabsTrigger>
          <TabsTrigger value="features" className="text-xs">{t('appFeatures')}</TabsTrigger>
          <TabsTrigger value="safety" className="text-xs">{t('language') === 'zh' ? '安全政策' : 'Safety'}</TabsTrigger>
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
                {t('startRecoveryJourney')}
              </h3>
              <p className="text-text-secondary text-sm mb-4">
                {t('joinThousands')}
              </p>
              <Link to="/">
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
                {t('scientificFacts')}
              </h3>
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-background-primary p-4 rounded-lg">
                  <div className="text-2xl font-bold text-primary mb-1">90%</div>
                  <div className="text-sm text-text-secondary">
                    {t('usersReportImprovement')}
                  </div>
                </div>
                <div className="bg-background-primary p-4 rounded-lg">
                  <div className="text-2xl font-bold text-primary mb-1">73%</div>
                  <div className="text-sm text-text-secondary">
                    {t('reductionUrgeIntensity')}
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
                {t('quickStartGuide')}
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center">1</div>
                  <span className="text-text-secondary text-sm">
                    {t('setupReasons')}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center">2</div>
                  <span className="text-text-secondary text-sm">
                    {t('trackDailyProgress')}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center">3</div>
                  <span className="text-text-secondary text-sm">
                    {t('useBreathing')}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center">4</div>
                  <span className="text-text-secondary text-sm">
                    {t('engageCommunity')}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* UGC Safety Policy Tab - Required for Apple Store Compliance */}
        <TabsContent value="safety" className="space-y-4 mt-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-text-primary mb-2">
              {t('language') === 'zh' ? '社区安全政策' : 'Community Safety Policy'}
            </h2>
            <p className="text-text-secondary">
              {t('language') === 'zh' 
                ? '我们致力于为所有用户创造安全的环境' 
                : 'We are committed to creating a safe environment for all users'}
            </p>
          </div>

          <Card className="bg-red-900/20 border-red-500/30 rounded-xl">
            <CardContent className="p-6">
              <h3 className="font-semibold text-red-200 mb-3">
                {t('language') === 'zh' ? '内容审核承诺' : 'Content Moderation Commitment'}
              </h3>
              <p className="text-red-100 text-sm leading-relaxed mb-4">
                {t('language') === 'zh' 
                  ? '我们不容忍令人反感的内容。用户可以举报帖子，屏蔽滥用账户，我们将在24小时内删除违规内容。任何违反社区准则的行为将导致账户被暂停或永久禁止。'
                  : 'We do not tolerate objectionable content. Users can report posts, block abusive accounts, and we remove violating content within 24 hours. Any violation of community guidelines will result in account suspension or permanent ban.'
                }
              </p>
            </CardContent>
          </Card>

          <div className="grid gap-4">
            <Card className="bg-background-card rounded-xl">
              <CardContent className="p-6">
                <h3 className="font-semibold text-text-primary mb-3">
                  {t('language') === 'zh' ? '用户安全工具' : 'User Safety Tools'}
                </h3>
                <div className="space-y-3 text-sm text-text-secondary">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>
                      {t('language') === 'zh' 
                        ? '举报滥用内容 - 长按任何帖子可举报不当内容'
                        : 'Report Abuse - Long press any post to report inappropriate content'}
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>
                      {t('language') === 'zh' 
                        ? '屏蔽用户 - 从用户资料页面屏蔽不当行为的用户'
                        : 'Block Users - Block users with inappropriate behavior from their profile page'}
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>
                      {t('language') === 'zh' 
                        ? '自动内容过滤 - 系统自动检测和过滤不当语言'
                        : 'Automatic Content Filtering - System automatically detects and filters inappropriate language'}
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>
                      {t('language') === 'zh' 
                        ? '24小时审核 - 我们在24小时内处理所有举报'
                        : '24-Hour Moderation - We review all reports within 24 hours'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-background-card rounded-xl">
              <CardContent className="p-6">
                <h3 className="font-semibold text-text-primary mb-3">
                  {t('language') === 'zh' ? '社区准则' : 'Community Guidelines'}
                </h3>
                <div className="space-y-2 text-sm text-text-secondary">
                  <p>• {t('language') === 'zh' ? '禁止骚扰、仇恨言论或威胁行为' : 'No harassment, hate speech, or threatening behavior'}</p>
                  <p>• {t('language') === 'zh' ? '禁止垃圾信息或重复发布' : 'No spam or repetitive posting'}</p>
                  <p>• {t('language') === 'zh' ? '禁止非法或有害内容' : 'No illegal or harmful content'}</p>
                  <p>• {t('language') === 'zh' ? '尊重他人隐私和观点' : 'Respect others\' privacy and viewpoints'}</p>
                  <p>• {t('language') === 'zh' ? '保持积极支持的环境' : 'Maintain a positive and supportive environment'}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-background-card rounded-xl">
              <CardContent className="p-6">
                <h3 className="font-semibold text-text-primary mb-3">
                  {t('language') === 'zh' ? '联系支持' : 'Contact Support'}
                </h3>
                <p className="text-sm text-text-secondary">
                  {t('language') === 'zh' 
                    ? '如果您遇到任何安全问题或需要帮助，请联系我们的支持团队。我们承诺在24小时内回复所有支持请求。'
                    : 'If you encounter any safety issues or need assistance, please contact our support team. We commit to responding to all support requests within 24 hours.'
                  }
                </p>
                <div className="mt-3 text-sm">
                  <span className="text-text-secondary">
                    {t('language') === 'zh' ? '邮箱: ' : 'Email: '}
                  </span>
                  <span className="text-primary">contact@huangyizhouai.cn</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}