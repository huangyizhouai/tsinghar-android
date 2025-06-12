import { useParams, Link } from "wouter";
import { ArrowLeft, Clock } from "lucide-react";
import { getArticleById } from "@/data/articles";
import { useLanguage } from "@/hooks/use-language";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function ArticleDetail() {
  const { id } = useParams<{ id: string }>();
  const { language } = useLanguage();
  const { toast } = useToast();
  
  const article = getArticleById(id || '');
  
  const markCompletedMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/articles/progress', {
        method: 'POST',
        body: JSON.stringify({ articleId: id }),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Failed to mark article as completed');
      }
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: language === 'zh' ? '文章已完成' : 'Article Completed',
        description: language === 'zh' ? '恭喜你完成了这篇文章！' : 'Congratulations on completing this article!',
      });
    },
    onError: (error) => {
      console.error('Failed to mark article as completed:', error);
    },
  });

  if (!article) {
    return (
      <div className="p-4 pt-6">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-text-primary mb-4">
              {language === 'zh' ? '文章未找到' : 'Article Not Found'}
            </h1>
            <Link to="/library#articles">
              <Button variant="outline">
                {language === 'zh' ? '返回文章列表' : 'Back to Articles'}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleMarkCompleted = () => {
    markCompletedMutation.mutate();
  };

  const content = language === 'zh' ? article.contentZh : article.content;
  const title = language === 'zh' ? article.titleZh : article.title;

  return (
    <div className="min-h-screen bg-background-primary">
      {/* Header */}
      <div className="sticky top-0 bg-background-primary border-b border-border z-10">
        <div className="flex items-center justify-between p-4">
          <Link to="/library#articles">
            <Button variant="ghost" size="sm" className="p-2">
              <ArrowLeft className="h-5 w-5 text-text-primary" />
            </Button>
          </Link>
          <div className="flex items-center gap-2 text-text-secondary">
            <Clock className="h-4 w-4" />
            <span className="text-sm">{article.duration} min</span>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto p-4 pb-20">
        {/* Article Header */}
        <div className="mb-8">
          <div className="mb-4">
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
              {language === 'zh' ? article.categoryZh : article.category}
            </span>
          </div>
          <h1 className="text-3xl font-bold text-text-primary mb-4">
            {title}
          </h1>
          <p className="text-text-secondary text-lg">
            {language === 'zh' ? article.descriptionZh : article.description}
          </p>
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          <div 
            className="text-white leading-relaxed"
            style={{
              lineHeight: '1.7',
              fontSize: '17px',
            }}
          >
            {content.split('\n\n').map((section, index) => {
              if (section.startsWith('# ')) {
                return (
                  <h1 key={index} className="text-3xl font-bold text-white mt-8 mb-6 first:mt-0">
                    {section.replace('# ', '')}
                  </h1>
                );
              } else if (section.startsWith('## ')) {
                return (
                  <h2 key={index} className="text-2xl font-semibold text-white mt-8 mb-4">
                    {section.replace('## ', '')}
                  </h2>
                );
              } else if (section.startsWith('### ')) {
                return (
                  <h3 key={index} className="text-xl font-medium text-white mt-6 mb-3">
                    {section.replace('### ', '')}
                  </h3>
                );
              } else if (section.includes('\n- ') || section.startsWith('- ')) {
                // Handle bullet lists
                const lines = section.split('\n');
                const listItems = lines.filter(line => line.startsWith('- '));
                const beforeList = lines.find(line => !line.startsWith('- ') && line.trim());
                
                return (
                  <div key={index} className="mb-6">
                    {beforeList && (
                      <p className="text-white mb-3">{beforeList}</p>
                    )}
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      {listItems.map((item, itemIndex) => (
                        <li key={itemIndex} className="text-white">
                          {item.replace('- ', '')}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              } else if (section.includes('**') && section.includes(':**')) {
                // Handle sections with bold titles and descriptions
                const lines = section.split('\n').filter(line => line.trim());
                return (
                  <div key={index} className="mb-6">
                    {lines.map((line, lineIndex) => {
                      if (line.includes('**') && line.includes(':**')) {
                        const [boldPart, ...rest] = line.split(':**');
                        const boldText = boldPart.replace(/\*\*/g, '');
                        return (
                          <div key={lineIndex} className="mb-3">
                            <h4 className="font-semibold text-white inline">
                              {boldText}:
                            </h4>
                            <span className="text-white ml-2">
                              {rest.join(':**')}
                            </span>
                          </div>
                        );
                      } else if (line.startsWith('- **')) {
                        const cleanText = line.replace(/- \*\*(.*?)\*\*: ?/g, '• $1: ');
                        return (
                          <p key={lineIndex} className="text-white ml-4 mb-2">
                            {cleanText}
                          </p>
                        );
                      }
                      return (
                        <p key={lineIndex} className="text-white mb-2">
                          {line}
                        </p>
                      );
                    })}
                  </div>
                );
              } else if (section.trim()) {
                // Regular paragraphs
                return (
                  <p key={index} className="text-white mb-6 leading-relaxed">
                    {section.trim()}
                  </p>
                );
              }
              return null;
            })}
          </div>
        </div>

        {/* Complete Article Button */}
        <div className="mt-12 text-center">
          <Button 
            onClick={handleMarkCompleted}
            disabled={markCompletedMutation.isPending}
            className="bg-primary hover:bg-primary/90 text-white px-8 py-3 text-lg"
          >
            {markCompletedMutation.isPending 
              ? (language === 'zh' ? '标记中...' : 'Marking...') 
              : (language === 'zh' ? '完成阅读' : 'Mark as Completed')
            }
          </Button>
        </div>
      </div>
    </div>
  );
}