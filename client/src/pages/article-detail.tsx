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
        <ScrollArea className="max-h-none">
          <div className="prose prose-lg max-w-none">
            <div 
              className="text-text-primary leading-relaxed space-y-6"
              style={{
                lineHeight: '1.8',
                fontSize: '16px',
              }}
            >
              {content.split('\n\n').map((paragraph, index) => {
                if (paragraph.startsWith('# ')) {
                  return (
                    <h1 key={index} className="text-3xl font-bold text-text-primary mt-8 mb-6">
                      {paragraph.replace('# ', '')}
                    </h1>
                  );
                } else if (paragraph.startsWith('## ')) {
                  return (
                    <h2 key={index} className="text-2xl font-semibold text-text-primary mt-6 mb-4">
                      {paragraph.replace('## ', '')}
                    </h2>
                  );
                } else if (paragraph.startsWith('### ')) {
                  return (
                    <h3 key={index} className="text-xl font-medium text-text-primary mt-5 mb-3">
                      {paragraph.replace('### ', '')}
                    </h3>
                  );
                } else if (paragraph.startsWith('- ')) {
                  const items = paragraph.split('\n').filter(line => line.startsWith('- '));
                  return (
                    <ul key={index} className="list-disc list-inside space-y-2 ml-4">
                      {items.map((item, itemIndex) => (
                        <li key={itemIndex} className="text-text-primary">
                          {item.replace('- ', '')}
                        </li>
                      ))}
                    </ul>
                  );
                } else if (paragraph.includes('**') && paragraph.includes(':**')) {
                  // Handle bold headings with descriptions
                  const parts = paragraph.split('\n');
                  return (
                    <div key={index} className="mb-4">
                      {parts.map((part, partIndex) => {
                        if (part.includes('**') && part.includes(':**')) {
                          const [boldPart, ...rest] = part.split(':**');
                          const boldText = boldPart.replace(/\*\*/g, '');
                          return (
                            <div key={partIndex} className="mb-2">
                              <span className="font-semibold text-text-primary">
                                {boldText}:
                              </span>
                              <span className="text-text-primary ml-2">
                                {rest.join(':**')}
                              </span>
                            </div>
                          );
                        } else if (part.startsWith('- **')) {
                          const cleanText = part.replace(/- \*\*(.*?)\*\*: ?/g, '• $1: ');
                          return (
                            <p key={partIndex} className="text-text-primary ml-4 mb-1">
                              {cleanText}
                            </p>
                          );
                        }
                        return (
                          <p key={partIndex} className="text-text-primary">
                            {part}
                          </p>
                        );
                      })}
                    </div>
                  );
                } else if (paragraph.trim()) {
                  return (
                    <p key={index} className="text-text-primary mb-4">
                      {paragraph}
                    </p>
                  );
                }
                return null;
              })}
            </div>
          </div>
        </ScrollArea>

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