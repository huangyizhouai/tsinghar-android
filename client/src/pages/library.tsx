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
                          <div className="w-full h-32 rounded-t-xl relative overflow-hidden">
                            {/* Scenic Recovery-Themed Images */}
                            <div className="absolute inset-0">
                              {article.id === 'neuroscience' && (
                                // Mountain sunrise representing mental clarity
                                <svg width="100%" height="100%" viewBox="0 0 220 128" className="w-full h-full">
                                  <defs>
                                    <linearGradient id="skyGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
                                      <stop offset="0%" style={{stopColor:'#fbbf24', stopOpacity:1}} />
                                      <stop offset="50%" style={{stopColor:'#f59e0b', stopOpacity:1}} />
                                      <stop offset="100%" style={{stopColor:'#d97706', stopOpacity:1}} />
                                    </linearGradient>
                                  </defs>
                                  <rect width="220" height="128" fill="url(#skyGrad1)"/>
                                  <path d="M0 90 L40 60 L80 70 L120 50 L160 65 L200 55 L220 60 L220 128 L0 128 Z" fill="#374151"/>
                                  <path d="M60 80 L100 45 L140 55 L180 40 L220 50 L220 128 L60 128 Z" fill="#4b5563"/>
                                  <circle cx="180" cy="25" r="15" fill="#fde047" opacity="0.9"/>
                                  <path d="M165 25 L195 25 M180 10 L180 40 M170 15 L190 35 M190 15 L170 35" stroke="#fde047" strokeWidth="2" opacity="0.7"/>
                                </svg>
                              )}
                              
                              {article.id === 'myths' && (
                                // Clear lake reflection representing truth
                                <svg width="100%" height="100%" viewBox="0 0 220 128" className="w-full h-full">
                                  <defs>
                                    <linearGradient id="waterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                                      <stop offset="0%" style={{stopColor:'#0ea5e9', stopOpacity:1}} />
                                      <stop offset="100%" style={{stopColor:'#0284c7', stopOpacity:1}} />
                                    </linearGradient>
                                  </defs>
                                  <rect width="220" height="128" fill="url(#waterGrad)"/>
                                  <path d="M0 70 L50 50 L100 60 L150 45 L200 55 L220 50 L220 70 L0 70 Z" fill="#1e293b"/>
                                  <ellipse cx="110" cy="85" rx="40" ry="8" fill="#0ea5e9" opacity="0.3"/>
                                  <ellipse cx="110" cy="100" rx="30" ry="6" fill="#0ea5e9" opacity="0.2"/>
                                  <circle cx="60" cy="20" r="8" fill="#fbbf24"/>
                                  <path d="M60 70 L62 85 L58 85 Z" fill="#fbbf24" opacity="0.6"/>
                                </svg>
                              )}
                              
                              {article.id === 'triggers' && (
                                // Forest path representing choice and direction
                                <svg width="100%" height="100%" viewBox="0 0 220 128" className="w-full h-full">
                                  <defs>
                                    <linearGradient id="forestGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                                      <stop offset="0%" style={{stopColor:'#059669', stopOpacity:1}} />
                                      <stop offset="100%" style={{stopColor:'#047857', stopOpacity:1}} />
                                    </linearGradient>
                                  </defs>
                                  <rect width="220" height="128" fill="url(#forestGrad)"/>
                                  <ellipse cx="40" cy="90" rx="15" ry="25" fill="#064e3b"/>
                                  <ellipse cx="80" cy="85" rx="20" ry="30" fill="#064e3b"/>
                                  <ellipse cx="140" cy="80" rx="18" ry="28" fill="#064e3b"/>
                                  <ellipse cx="180" cy="85" rx="16" ry="26" fill="#064e3b"/>
                                  <path d="M90 128 Q110 100, 130 128" fill="#92400e" stroke="none"/>
                                  <path d="M100 128 Q110 110, 120 128" fill="#a3a3a3" stroke="none"/>
                                </svg>
                              )}
                              
                              {article.id === 'physical' && (
                                // Person running at sunrise representing health
                                <svg width="100%" height="100%" viewBox="0 0 220 128" className="w-full h-full">
                                  <defs>
                                    <linearGradient id="healthGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                                      <stop offset="0%" style={{stopColor:'#f97316', stopOpacity:1}} />
                                      <stop offset="100%" style={{stopColor:'#ea580c', stopOpacity:1}} />
                                    </linearGradient>
                                  </defs>
                                  <rect width="220" height="128" fill="url(#healthGrad)"/>
                                  <ellipse cx="190" cy="30" rx="12" ry="12" fill="#fde047"/>
                                  <path d="M0 100 Q110 85, 220 95 L220 128 L0 128 Z" fill="#166534"/>
                                  <circle cx="80" cy="88" r="4" fill="#1f2937"/>
                                  <ellipse cx="80" cy="95" rx="3" ry="8" fill="#1f2937"/>
                                  <path d="M75 90 L72 95" stroke="#1f2937" strokeWidth="2"/>
                                  <path d="M85 90 L88 95" stroke="#1f2937" strokeWidth="2"/>
                                  <path d="M78 100 L75 105" stroke="#1f2937" strokeWidth="2"/>
                                  <path d="M82 100 L85 105" stroke="#1f2937" strokeWidth="2"/>
                                </svg>
                              )}
                              
                              {article.id === 'emotional' && (
                                // Peaceful sunset representing emotional healing
                                <svg width="100%" height="100%" viewBox="0 0 220 128" className="w-full h-full">
                                  <defs>
                                    <linearGradient id="emotionalGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                                      <stop offset="0%" style={{stopColor:'#ec4899', stopOpacity:1}} />
                                      <stop offset="50%" style={{stopColor:'#be185d', stopOpacity:1}} />
                                      <stop offset="100%" style={{stopColor:'#9d174d', stopOpacity:1}} />
                                    </linearGradient>
                                  </defs>
                                  <rect width="220" height="128" fill="url(#emotionalGrad)"/>
                                  <circle cx="50" cy="40" r="18" fill="#fbbf24" opacity="0.8"/>
                                  <path d="M0 90 Q55 85, 110 88 Q165 90, 220 85 L220 128 L0 128 Z" fill="#7c2d12"/>
                                  <ellipse cx="110" cy="95" rx="25" ry="5" fill="#fbbf24" opacity="0.3"/>
                                  <path d="M85 95 Q110 85, 135 95" fill="none" stroke="#fbbf24" strokeWidth="1" opacity="0.5"/>
                                </svg>
                              )}
                              
                              {article.id === 'mindfulness' && (
                                // Meditation by lake representing mindfulness
                                <svg width="100%" height="100%" viewBox="0 0 220 128" className="w-full h-full">
                                  <defs>
                                    <linearGradient id="mindGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                                      <stop offset="0%" style={{stopColor:'#8b5cf6', stopOpacity:1}} />
                                      <stop offset="100%" style={{stopColor:'#7c3aed', stopOpacity:1}} />
                                    </linearGradient>
                                  </defs>
                                  <rect width="220" height="128" fill="url(#mindGrad)"/>
                                  <ellipse cx="110" cy="90" rx="80" ry="20" fill="#1e40af" opacity="0.6"/>
                                  <path d="M30 80 Q55 75, 80 78 Q105 80, 130 78 Q155 76, 180 79 Q200 82, 220 80 L220 128 L0 128 Z" fill="#064e3b"/>
                                  <circle cx="90" cy="75" r="3" fill="#1f2937"/>
                                  <path d="M90 68 L85 72 L95 72 Z" fill="#1f2937"/>
                                  <path d="M85 75 L80 80" stroke="#1f2937" strokeWidth="2"/>
                                  <path d="M95 75 L100 80" stroke="#1f2937" strokeWidth="2"/>
                                  <circle cx="90" cy="85" r="8" fill="#1f2937" opacity="0.3"/>
                                </svg>
                              )}
                              
                              {article.id === 'recovery-plan' && (
                                // Mountain path representing journey and progress
                                <svg width="100%" height="100%" viewBox="0 0 220 128" className="w-full h-full">
                                  <defs>
                                    <linearGradient id="planGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                                      <stop offset="0%" style={{stopColor:'#3b82f6', stopOpacity:1}} />
                                      <stop offset="100%" style={{stopColor:'#1d4ed8', stopOpacity:1}} />
                                    </linearGradient>
                                  </defs>
                                  <rect width="220" height="128" fill="url(#planGrad)"/>
                                  <path d="M0 100 L30 70 L60 80 L90 60 L120 75 L150 55 L180 70 L210 50 L220 55 L220 128 L0 128 Z" fill="#374151"/>
                                  <path d="M20 90 L50 65 L80 70 L110 55 L140 65 L170 50 L200 60 L220 55 L220 128 L20 128 Z" fill="#4b5563"/>
                                  <path d="M0 128 Q30 115, 60 118 Q90 120, 120 115 Q150 110, 180 115 Q200 118, 220 115" fill="none" stroke="#fbbf24" strokeWidth="3" opacity="0.8"/>
                                  <circle cx="40" cy="116" r="2" fill="#fbbf24"/>
                                  <circle cx="100" cy="115" r="2" fill="#fbbf24"/>
                                  <circle cx="160" cy="113" r="2" fill="#fbbf24"/>
                                </svg>
                              )}
                              
                              {article.id === 'community' && (
                                // Group of trees representing community support
                                <svg width="100%" height="100%" viewBox="0 0 220 128" className="w-full h-full">
                                  <defs>
                                    <linearGradient id="communityGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                                      <stop offset="0%" style={{stopColor:'#f59e0b', stopOpacity:1}} />
                                      <stop offset="100%" style={{stopColor:'#d97706', stopOpacity:1}} />
                                    </linearGradient>
                                  </defs>
                                  <rect width="220" height="128" fill="url(#communityGrad)"/>
                                  <path d="M0 110 Q110 105, 220 108 L220 128 L0 128 Z" fill="#166534"/>
                                  <ellipse cx="50" cy="85" rx="12" ry="20" fill="#064e3b"/>
                                  <ellipse cx="110" cy="80" rx="15" ry="25" fill="#064e3b"/>
                                  <ellipse cx="170" cy="85" rx="13" ry="22" fill="#064e3b"/>
                                  <circle cx="50" cy="65" r="12" fill="#059669"/>
                                  <circle cx="110" cy="55" r="15" fill="#059669"/>
                                  <circle cx="170" cy="63" r="13" fill="#059669"/>
                                  <circle cx="75" cy="75" r="8" fill="#047857"/>
                                  <circle cx="135" cy="70" r="10" fill="#047857"/>
                                  <circle cx="145" cy="75" r="7" fill="#047857"/>
                                </svg>
                              )}
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
