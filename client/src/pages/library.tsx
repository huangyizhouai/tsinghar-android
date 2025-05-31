import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { ArrowLeft, Info, Search, Shield } from "lucide-react";
import { Link, useLocation } from "wouter";
import SectionHeader from "@/components/ui/section-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Leaderboard from "@/components/library/leaderboard";
import CategoryButtons from "@/components/library/category-buttons";
import MeditationTrackList from "@/components/library/meditation-track-list";
import MeditationPlayer from "@/components/library/meditation-player";
import CustomMeditationPlayer from "@/components/library/custom-meditation-player";
import InfoModal from "@/components/library/info-modal";
import { libraryCategories, meditationTracks } from "@/lib/data";
import { apiRequest } from "@/lib/queryClient";
import AppLogo from "@/components/app-logo";
import { useLanguage } from "@/hooks/use-language";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export default function Library() {
  const { t, language } = useLanguage();
  
  // State
  const [currentView, setCurrentView] = useState("main"); // main, articles, meditate, learn, podcast
  const [currentTrackId, setCurrentTrackId] = useState<string | null>(null);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [infoModalContent, setInfoModalContent] = useState({ 
    title: "", 
    description: "" 
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDailyNotesOpen, setIsDailyNotesOpen] = useState(false);
  const [isGeneratingArticle, setIsGeneratingArticle] = useState(false);
  const [generatedArticle, setGeneratedArticle] = useState<any>(null);
  const [showGeneratedArticle, setShowGeneratedArticle] = useState(false);
  
  // Daily notes data
  const dailyNotes = [
    {
      en: "Recovery is not about perfection, it's about progress. Every day you choose recovery is a victory.",
      zh: "康复不是关于完美，而是关于进步。你选择康复的每一天都是胜利。"
    },
    {
      en: "Your brain is healing with every day of abstinence. Trust the process and be patient with yourself.",
      zh: "你的大脑在每一天的戒断中都在愈合。相信这个过程，对自己要有耐心。"
    },
    {
      en: "Urges are temporary feelings, not permanent states. This too shall pass.",
      zh: "冲动是暂时的感觉，而不是永久的状态。这也会过去的。"
    },
    {
      en: "Focus on building new, healthy habits that align with your values and goals.",
      zh: "专注于建立与你的价值观和目标一致的新的健康习惯。"
    },
    {
      en: "Remember your reasons for recovery. They are stronger than any momentary temptation.",
      zh: "记住你康复的原因。它们比任何瞬间的诱惑都要强大。"
    },
    {
      en: "Each day of recovery strengthens your willpower and builds resilience.",
      zh: "康复的每一天都会增强你的意志力并建立韧性。"
    },
    {
      en: "You are retraining your brain to find joy in real connections and meaningful activities.",
      zh: "你正在重新训练你的大脑，在真实的联系和有意义的活动中找到快乐。"
    },
    {
      en: "Self-compassion is key to recovery. Treat yourself with the kindness you'd show a good friend.",
      zh: "自我同情是康复的关键。用你对待好朋友的善意来对待自己。"
    }
  ];
  
  // Get current daily note (changes based on day of year)
  const getCurrentDailyNote = () => {
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
    return dailyNotes[dayOfYear % dailyNotes.length];
  };
  
  // Get location for navigation
  const [location, setLocation] = useLocation();
  
  // Get article progress data
  const { data: articleProgress, isLoading } = useQuery<any[]>({
    queryKey: ['/api/articles/progress'],
  });
  
  // Check if there's a hash in the URL for navigation
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash && ['articles', 'meditate', 'learn', 'podcast'].includes(hash)) {
      setCurrentView(hash);
    }
  }, []);
  
  // Helper functions
  const markArticleAsCompleted = async (articleId: string) => {
    try {
      await apiRequest('POST', `/api/articles/${articleId}/complete`, {});
      
      // Invalidate the query to refresh the data
      queryClient.invalidateQueries({ queryKey: ['/api/articles/progress'] });
    } catch (error) {
      console.error('Failed to mark article as completed:', error);
    }
  };

  const generateArticleContent = async (article: any) => {
    setIsGeneratingArticle(true);
    try {
      const response = await apiRequest('POST', '/api/articles/generate', {
        topic: language === 'zh' && article.titleZh ? article.titleZh : article.title,
        category: article.category
      });
      
      setGeneratedArticle(response);
      setShowGeneratedArticle(true);
    } catch (error) {
      console.error('Failed to generate article:', error);
    } finally {
      setIsGeneratingArticle(false);
    }
  };
  
  const isArticleCompleted = (articleId: string) => {
    if (!articleProgress || !Array.isArray(articleProgress)) return false;
    return articleProgress.some((progress: any) => 
      progress.articleId === articleId && progress.completed
    );
  };
  
  const getCategoryCompletionPercentage = (categoryId: string) => {
    if (!articleProgress || !Array.isArray(articleProgress)) return 0;
    
    const category = libraryCategories.find(cat => cat.id === categoryId);
    if (!category) return 0;
    
    const totalArticles = category.articles.length;
    const completedArticles = category.articles.filter(article => 
      isArticleCompleted(article.id)
    ).length;
    
    return Math.round((completedArticles / totalArticles) * 100);
  };
  
  const handleCategorySelect = (category: string) => {
    setCurrentView(category);
    window.location.hash = category;
  };
  
  const handleBackToMain = () => {
    setCurrentView("main");
    window.location.hash = "";
  };
  
  const handleSelectTrack = (trackId: string) => {
    setCurrentTrackId(trackId);
  };
  
  const handleBackFromPlayer = () => {
    setCurrentTrackId(null);
  };
  
  const showInfoModal = (title: string, description: string) => {
    setInfoModalContent({ title, description });
    setIsInfoModalOpen(true);
  };

  // Search functionality
  const filterArticlesBySearch = (articles: any[]) => {
    if (!searchQuery.trim()) return articles;
    
    return articles.filter(article => {
      const query = searchQuery.toLowerCase();
      return (
        article.title.toLowerCase().includes(query) ||
        article.description.toLowerCase().includes(query) ||
        (article.titleZh && article.titleZh.includes(searchQuery)) ||
        (article.descriptionZh && article.descriptionZh.includes(searchQuery))
      );
    });
  };

  // Get filtered categories for search
  const getFilteredCategories = () => {
    if (!searchQuery.trim()) return libraryCategories;
    
    return libraryCategories.map(category => ({
      ...category,
      articles: filterArticlesBySearch(category.articles)
    })).filter(category => category.articles.length > 0);
  };
  
  // Get current meditation track if one is selected
  const currentTrack = currentTrackId 
    ? meditationTracks.find(track => track.id === currentTrackId) 
    : null;

  // Render different views based on state
  const renderMainView = () => (
    <>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <AppLogo size="md" />
          <h1 className="text-xl font-semibold text-text-primary">{t('appName')}</h1>
        </div>
        <div className="flex space-x-2">
          <button 
            className="p-2 rounded-full bg-background-card hover:bg-background-card/80 transition-colors"
            onClick={() => setIsDailyNotesOpen(true)}
          >
            <Shield className="h-6 w-6 text-text-primary" />
          </button>
          <button 
            className="p-2 rounded-full bg-background-card hover:bg-background-card/80 transition-colors"
            onClick={() => setIsSearchOpen(true)}
          >
            <Search className="h-6 w-6 text-text-primary" />
          </button>
        </div>
      </div>
      
      {/* Tagline */}
      <p className="text-text-secondary mb-6">{t('quitPornEasily')}</p>
      
      {/* Category Buttons */}
      <CategoryButtons onSelectCategory={handleCategorySelect} />
      
      {/* Leaderboard */}
      <Leaderboard onViewAll={() => handleCategorySelect('leaderboard')} />
    </>
  );
  
  const renderArticlesView = () => (
    <>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <button onClick={handleBackToMain} className="mr-3">
            <ArrowLeft className="h-6 w-6 text-text-primary" />
          </button>
          <h1 className="font-bold text-2xl text-text-primary">{t('articlesTitle')}</h1>
        </div>
        <button 
          onClick={() => showInfoModal(
            t('articlesTitle'), 
            t('articlesDescription')
          )}
        >
          <Info className="h-6 w-6 text-text-primary" />
        </button>
      </div>
      
      {/* Articles Content */}
      {getFilteredCategories().map((category) => (
        <div key={category.id} className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-medium text-text-primary">
              {language === 'zh' && category.nameZh ? category.nameZh : category.name}
            </h2>
            <span className="text-xs text-text-secondary">
              {getCategoryCompletionPercentage(category.id)}% {t('complete')}
            </span>
          </div>
          
          <div className="overflow-x-auto pb-2">
            <div className="flex space-x-4" style={{ minWidth: "min-content" }}>
              {category.articles.map((article) => {
                const completed = isArticleCompleted(article.id);
                
                return (
                  <Card 
                    key={article.id}
                    className="bg-background-card rounded-xl min-w-[220px]"
                  >
                    {article.imageUrl && (
                      <img src={article.imageUrl} alt={article.title} className="w-full h-28 object-cover" />
                    )}
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center mb-3">
                        <button
                          onClick={() => generateArticleContent(article)}
                          disabled={isGeneratingArticle}
                          className="text-xs rounded px-3 py-1 bg-background-primary text-text-secondary hover:bg-background-primary/80 transition-colors disabled:opacity-50"
                        >
                          {isGeneratingArticle ? 
                            (language === 'zh' ? '生成中...' : 'Generating...') : 
                            (language === 'zh' ? '生成文章' : 'Generate Article')
                          }
                        </button>
                        <span className="text-text-secondary text-xs">{article.readTime} min</span>
                      </div>
                      <h3 className="font-medium text-text-primary mb-2">
                        {language === 'zh' && article.titleZh ? article.titleZh : article.title}
                      </h3>
                      <p className="text-xs text-text-secondary">
                        {language === 'zh' && article.descriptionZh ? article.descriptionZh : article.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      ))}
    </>
  );
  
  const renderMeditateView = () => (
    <>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <button onClick={handleBackToMain} className="mr-3">
            <ArrowLeft className="h-6 w-6 text-text-primary" />
          </button>
          <h1 className="font-bold text-2xl text-text-primary">{t('meditateTitle')}</h1>
        </div>
        <button 
          onClick={() => showInfoModal(
            t('meditateTitle'), 
            t('meditateDescription')
          )}
        >
          <Info className="h-6 w-6 text-text-primary" />
        </button>
      </div>
      
      {/* Meditation Tracks */}
      <MeditationTrackList onSelectTrack={handleSelectTrack} />
    </>
  );
  
  const renderComingSoonView = (title: string) => (
    <>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <button onClick={handleBackToMain} className="mr-3">
            <ArrowLeft className="h-6 w-6 text-text-primary" />
          </button>
          <h1 className="font-bold text-2xl text-text-primary">{title}</h1>
        </div>
      </div>
      
      <div className="flex justify-center items-center py-12">
        <div className="text-center">
          <h3 className="text-xl font-medium text-text-primary mb-2">{t('comingSoon')}</h3>
          <p className="text-text-secondary">{t('featureInDevelopment')}</p>
        </div>
      </div>
    </>
  );

  // Main render
  return (
    <div className="p-4 pt-6 pb-20">
      {/* Main Content */}
      {currentView === "main" && renderMainView()}
      {currentView === "articles" && renderArticlesView()}
      {currentView === "meditate" && renderMeditateView()}
      {currentView === "learn" && renderComingSoonView("Learn")}
      {currentView === "podcast" && renderComingSoonView("Podcast")}
      {currentView === "leaderboard" && renderComingSoonView("Leaderboard")}
      
      {/* Meditation Player (overlay) */}
      {currentTrack && (
        currentTrack.audioUrl.startsWith('custom:') ? (
          <CustomMeditationPlayer
            track={currentTrack}
            onBack={handleBackFromPlayer}
            onShowInfo={() => showInfoModal(
              currentTrack.title,
              currentTrack.description || "自定义引导冥想，帮助你保持专注和平静。"
            )}
          />
        ) : (
          <MeditationPlayer 
            track={currentTrack}
            onBack={handleBackFromPlayer}
            onShowInfo={() => showInfoModal(
              currentTrack.title,
              currentTrack.description || "引导冥想，帮助你保持专注和平静。"
            )}
          />
        )
      )}
      
      {/* Info Modal */}
      <InfoModal
        title={infoModalContent.title}
        description={infoModalContent.description}
        open={isInfoModalOpen}
        onClose={() => setIsInfoModalOpen(false)}
      />

      {/* Search Modal */}
      <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <DialogContent className="bg-background-card border-background-card text-text-primary">
          <DialogHeader>
            <DialogTitle>Search Articles</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Search for articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-background-primary border-background-primary"
            />
            {searchQuery && (
              <div className="max-h-60 overflow-y-auto space-y-2">
                {getFilteredCategories().map((category) => (
                  <div key={category.id}>
                    <h3 className="font-medium text-text-primary mb-2">{category.name}</h3>
                    {category.articles.map((article) => (
                      <div
                        key={article.id}
                        className="p-3 bg-background-primary rounded-lg cursor-pointer hover:bg-background-primary/80"
                        onClick={() => {
                          markArticleAsCompleted(article.id);
                          setIsSearchOpen(false);
                          setSearchQuery("");
                        }}
                      >
                        <h4 className="font-medium text-text-primary">{article.title}</h4>
                        <p className="text-sm text-text-secondary">{article.description}</p>
                      </div>
                    ))}
                  </div>
                ))}
                {getFilteredCategories().length === 0 && (
                  <p className="text-text-secondary text-center py-4">No articles found</p>
                )}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Daily Notes Modal */}
      <Dialog open={isDailyNotesOpen} onOpenChange={setIsDailyNotesOpen}>
        <DialogContent className="bg-background-card border-background-card text-text-primary">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              {t('dailyRecoveryNote')}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-background-primary rounded-lg">
              <p className="text-text-primary leading-relaxed mb-3">
                {t('language') === 'zh' ? getCurrentDailyNote().zh : getCurrentDailyNote().en}
              </p>
              <div className="text-xs text-text-secondary">
                Today's motivation • {new Date().toLocaleDateString()}
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setIsDailyNotesOpen(false)}
                className="px-4 py-2 bg-primary hover:bg-primary-light text-white rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Generated Article Modal */}
      <Dialog open={showGeneratedArticle} onOpenChange={setShowGeneratedArticle}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-background-card border-background-card text-text-primary">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-text-primary">
              {generatedArticle ? 
                (language === 'zh' ? generatedArticle.titleZh : generatedArticle.title) : 
                ''
              }
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            {generatedArticle && (
              <div className="prose max-w-none text-text-primary">
                <div className="whitespace-pre-wrap leading-relaxed">
                  {language === 'zh' ? generatedArticle.contentZh : generatedArticle.content}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
