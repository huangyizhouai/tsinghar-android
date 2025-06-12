import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { ArrowLeft, Info, Search, Shield, LogIn } from "lucide-react";
import { Link, useLocation } from "wouter";
import SectionHeader from "@/components/ui/section-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { useAuth } from "@/hooks/useAuth";
import { articles, getArticlesByCategory, getAllCategories, getAllCategoriesZh } from "@/data/articles";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function Library() {
  const { t, language } = useLanguage();
  const { isAuthenticated } = useAuth();
  
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
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const [showArticleModal, setShowArticleModal] = useState(false);
  
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

  const showArticleContent = (article: any) => {
    setSelectedArticle(article);
    setShowArticleModal(true);
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
  
  const renderArticlesView = () => {
    const categories = language === 'zh' ? getAllCategoriesZh() : getAllCategories();
    
    return (
      <>
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <button onClick={handleBackToMain} className="mr-3">
              <ArrowLeft className="h-6 w-6 text-text-primary" />
            </button>
            <h1 className="font-bold text-2xl text-text-primary">{language === 'zh' ? '文章' : 'Articles'}</h1>
          </div>
          <button 
            onClick={() => showInfoModal(
              language === 'zh' ? '文章' : 'Articles', 
              language === 'zh' ? '阅读专业康复文章，获得科学的指导和支持。' : 'Read professional recovery articles for scientific guidance and support.'
            )}
          >
            <Info className="h-6 w-6 text-text-primary" />
          </button>
        </div>
        
        {/* Articles Content */}
        {categories.map((categoryName) => {
          const categoryArticles = getArticlesByCategory(categoryName);
          const completedCount = categoryArticles.filter(article => 
            isArticleCompleted(article.id)
          ).length;
          const completionPercentage = categoryArticles.length > 0 
            ? Math.round((completedCount / categoryArticles.length) * 100) 
            : 0;
          
          return (
            <div key={categoryName} className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <h2 className="font-medium text-text-primary">
                  {categoryName}
                </h2>
                <span className="text-xs text-text-secondary">
                  {completionPercentage}% {language === 'zh' ? '完成' : 'complete'}
                </span>
              </div>
              
              <div className="overflow-x-auto pb-2">
                <div className="flex space-x-4" style={{ minWidth: "min-content" }}>
                  {categoryArticles.map((article) => {
                    const completed = isArticleCompleted(article.id);
                    
                    return (
                      <Link key={article.id} to={`/article/${article.id}`}>
                        <Card 
                          className="bg-slate-800/80 rounded-xl min-w-[220px] cursor-pointer hover:bg-slate-700/80 transition-all duration-200 border border-slate-700/50 hover:border-slate-600/50 shadow-lg hover:shadow-xl"
                        >
                          {/* Article Preview Image */}
                          <div className={`w-full h-32 rounded-t-xl flex items-center justify-center relative overflow-hidden ${
                            // Different gradients for different articles
                            article.id === 'neuroscience' ? 'bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-700' :
                            article.id === 'myths' ? 'bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700' :
                            article.id === 'triggers' ? 'bg-gradient-to-br from-orange-600 via-red-600 to-pink-700' :
                            article.id === 'physical' ? 'bg-gradient-to-br from-green-600 via-emerald-600 to-teal-700' :
                            article.id === 'emotional' ? 'bg-gradient-to-br from-rose-600 via-pink-600 to-purple-700' :
                            article.id === 'mindfulness' ? 'bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700' :
                            article.id === 'recovery-plan' ? 'bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700' :
                            article.id === 'community' ? 'bg-gradient-to-br from-amber-600 via-orange-600 to-red-700' :
                            'bg-gradient-to-br from-slate-600 via-gray-600 to-zinc-700'
                          }`}>
                            {/* Background Pattern */}
                            <div className="absolute inset-0 opacity-10">
                              <div className="absolute top-2 left-2 w-8 h-8 rounded-full bg-white/20"></div>
                              <div className="absolute top-8 right-4 w-4 h-4 rounded-full bg-white/15"></div>
                              <div className="absolute bottom-4 left-6 w-6 h-6 rounded-full bg-white/10"></div>
                              <div className="absolute bottom-2 right-2 w-10 h-10 rounded-full bg-white/5"></div>
                            </div>
                            
                            {/* Article Icon/Symbol */}
                            <div className="text-white text-5xl font-bold z-10 drop-shadow-lg">
                              {article.id === 'neuroscience' && '🧠'}
                              {article.id === 'myths' && '💭'}
                              {article.id === 'triggers' && '🎯'}
                              {article.id === 'physical' && '💪'}
                              {article.id === 'emotional' && '❤️'}
                              {article.id === 'mindfulness' && '🧘'}
                              {article.id === 'recovery-plan' && '📋'}
                              {article.id === 'community' && '🤝'}
                              {!['neuroscience', 'myths', 'triggers', 'physical', 'emotional', 'mindfulness', 'recovery-plan', 'community'].includes(article.id) && 
                                <span className="text-white/90 text-3xl">
                                  {(language === 'zh' ? article.titleZh : article.title).charAt(0)}
                                </span>
                              }
                            </div>
                          </div>
                          
                          <CardContent className="p-4 bg-slate-800/50">
                            <div className="flex justify-between items-center mb-3">
                              <span className="text-xs rounded px-3 py-1 bg-blue-600/20 text-blue-300 border border-blue-500/30">
                                {language === 'zh' ? '阅读文章' : 'Read Article'}
                              </span>
                              <span className="text-slate-400 text-xs font-medium">{article.duration} min</span>
                            </div>
                            <h3 className="font-semibold text-white mb-2 text-base leading-tight">
                              {language === 'zh' ? article.titleZh : article.title}
                            </h3>
                            <p className="text-sm text-slate-300 line-clamp-3 leading-relaxed">
                              {language === 'zh' ? article.descriptionZh : article.description}
                            </p>
                            {completed && (
                              <div className="mt-3">
                                <Badge className="text-xs bg-green-600/20 text-green-300 border border-green-500/30 hover:bg-green-600/30">
                                  {language === 'zh' ? '已完成' : 'Completed'}
                                </Badge>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </>
    );
  };
  
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

      {/* Article Modal */}
      <Dialog open={showArticleModal} onOpenChange={setShowArticleModal}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-background-card border-background-card text-text-primary">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-text-primary">
              {selectedArticle ? 
                (language === 'zh' && selectedArticle.titleZh ? selectedArticle.titleZh : selectedArticle.title) : 
                ''
              }
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            {selectedArticle && (
              <div className="prose max-w-none text-text-primary">
                <div className="whitespace-pre-wrap leading-relaxed">
                  {language === 'zh' && selectedArticle.contentZh ? selectedArticle.contentZh : selectedArticle.content}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
