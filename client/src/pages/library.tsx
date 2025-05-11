import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import SectionHeader from "@/components/ui/section-header";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { libraryCategories } from "@/lib/data";
import { apiRequest } from "@/lib/queryClient";

export default function Library() {
  const [activeTab, setActiveTab] = useState("articles");
  
  const { data: articleProgress, isLoading } = useQuery({
    queryKey: ['/api/articles/progress'],
  });
  
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
    if (!articleProgress) return false;
    return articleProgress.some((progress: any) => 
      progress.articleId === articleId && progress.completed
    );
  };
  
  const getCategoryCompletionPercentage = (categoryId: string) => {
    if (!articleProgress) return 0;
    
    const category = libraryCategories.find(cat => cat.id === categoryId);
    if (!category) return 0;
    
    const totalArticles = category.articles.length;
    const completedArticles = category.articles.filter(article => 
      isArticleCompleted(article.id)
    ).length;
    
    return Math.round((completedArticles / totalArticles) * 100);
  };

  return (
    <div className="p-4 pt-6">
      <SectionHeader title="Library">
        <button className="p-2 rounded-full bg-background-card">
          <Search className="h-6 w-6 text-text-primary" />
        </button>
      </SectionHeader>

      {/* Content Type Selector */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="w-full">
          <TabsTrigger value="articles" className="flex-1">Articles</TabsTrigger>
          <TabsTrigger value="videos" className="flex-1">Videos</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Content Categories */}
      <div className="space-y-6">
        <TabsContent value="articles" className="m-0 p-0">
          {/* Articles */}
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
        </TabsContent>
        
        <TabsContent value="videos" className="m-0 p-0">
          <div className="flex justify-center items-center py-12">
            <div className="text-center">
              <h3 className="text-xl font-medium text-text-primary mb-2">Coming Soon</h3>
              <p className="text-text-secondary">Our video library is currently being developed.</p>
            </div>
          </div>
        </TabsContent>
      </div>
    </div>
  );
}
