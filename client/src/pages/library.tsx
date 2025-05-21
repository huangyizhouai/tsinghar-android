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
import InfoModal from "@/components/library/info-modal";
import { libraryCategories, meditationTracks } from "@/lib/data";
import { apiRequest } from "@/lib/queryClient";
import AppLogo from "@/components/app-logo";

export default function Library() {
  // State
  const [currentView, setCurrentView] = useState("main"); // main, articles, meditate, learn, podcast
  const [currentTrackId, setCurrentTrackId] = useState<string | null>(null);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [infoModalContent, setInfoModalContent] = useState({ 
    title: "", 
    description: "" 
  });
  
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
          <h1 className="text-xl font-semibold text-text-primary">清者</h1>
        </div>
        <div className="flex space-x-2">
          <button className="p-2 rounded-full bg-background-card">
            <Shield className="h-6 w-6 text-text-primary" />
          </button>
          <button className="p-2 rounded-full bg-background-card">
            <Search className="h-6 w-6 text-text-primary" />
          </button>
        </div>
      </div>
      
      {/* Tagline */}
      <p className="text-text-secondary mb-6">Quit Porn Easily</p>
      
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
          <h1 className="font-bold text-2xl text-text-primary">Articles</h1>
        </div>
        <button 
          onClick={() => showInfoModal(
            "Articles", 
            "Read through these educational articles to learn about addiction, health effects, and recovery strategies."
          )}
        >
          <Info className="h-6 w-6 text-text-primary" />
        </button>
      </div>
      
      {/* Articles Content */}
      {libraryCategories.map((category) => (
        <div key={category.id} className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-medium text-text-primary">{category.name}</h2>
            <span className="text-xs text-text-secondary">
              {getCategoryCompletionPercentage(category.id)}% Complete
            </span>
          </div>
          
          <div className="overflow-x-auto pb-2">
            <div className="flex space-x-4" style={{ minWidth: "min-content" }}>
              {category.articles.map((article) => {
                const completed = isArticleCompleted(article.id);
                
                return (
                  <Card 
                    key={article.id}
                    className="bg-background-card rounded-xl min-w-[220px] cursor-pointer"
                    onClick={() => markArticleAsCompleted(article.id)}
                  >
                    {article.imageUrl && (
                      <img src={article.imageUrl} alt={article.title} className="w-full h-28 object-cover" />
                    )}
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center mb-3">
                        <Badge variant={completed ? "default" : "outline"} className={`
                          text-xs rounded px-2 py-1 
                          ${completed ? 'bg-primary bg-opacity-20 text-primary' : 'bg-background-primary text-text-secondary'}
                        `}>
                          Module {article.moduleId}
                        </Badge>
                        <span className="text-text-secondary text-xs">{article.readTime} min</span>
                      </div>
                      <h3 className="font-medium text-text-primary mb-2">{article.title}</h3>
                      <p className="text-xs text-text-secondary">{article.description}</p>
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
          <h1 className="font-bold text-2xl text-text-primary">Meditate</h1>
        </div>
        <button 
          onClick={() => showInfoModal(
            "Meditate", 
            "Use these guided meditations to overcome urges and calm your mind. Regular practice strengthens your willpower and focus."
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
          <h3 className="text-xl font-medium text-text-primary mb-2">Coming Soon</h3>
          <p className="text-text-secondary">This feature is currently being developed.</p>
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
        <MeditationPlayer 
          track={currentTrack}
          onBack={handleBackFromPlayer}
          onShowInfo={() => showInfoModal(
            currentTrack.title,
            currentTrack.description || "Guided meditation to help you stay focused and calm."
          )}
        />
      )}
      
      {/* Info Modal */}
      <InfoModal
        title={infoModalContent.title}
        description={infoModalContent.description}
        open={isInfoModalOpen}
        onClose={() => setIsInfoModalOpen(false)}
      />
    </div>
  );
}
