import { useQuery } from "@tanstack/react-query";
import { BookText, Heart, Users, Plus } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import Navigation from "@/components/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Reason {
  id: number;
  userId: number;
  title: string;
  description: string;
  createdAt: string;
}

interface ForumPost {
  id: number;
  userId: number;
  title: string;
  content: string;
  createdAt: string;
  upvotes: number;
}

export default function JournalPage() {
  const { t } = useLanguage();

  const { data: reasons } = useQuery<Reason[]>({
    queryKey: ['/api/reasons'],
  });

  const { data: myPosts } = useQuery<ForumPost[]>({
    queryKey: ['/api/posts/my'],
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(t('locale'), {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="p-4 pt-6">
      {/* Header */}
      <div className="flex items-center mb-6">
        <BookText className="h-8 w-8 text-primary mr-3" />
        <h1 className="text-2xl font-bold text-text-primary">{t('myJournal')}</h1>
      </div>

      <div className="space-y-6">
        {/* My Reasons Section */}
        <div className="bg-background-card p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Heart className="h-6 w-6 text-primary mr-3" />
              <h2 className="text-lg font-semibold text-text-primary">{t('myReasons')}</h2>
            </div>
            <span className="text-sm text-text-secondary">
              {reasons?.length || 0} {t('reasonsCount')}
            </span>
          </div>
          
          {reasons && reasons.length > 0 ? (
            <div className="space-y-3">
              {reasons.slice(0, 3).map((reason) => (
                <div key={reason.id} className="bg-background-primary p-4 rounded-lg">
                  <h3 className="font-medium text-text-primary mb-1">{reason.title}</h3>
                  <p className="text-sm text-text-secondary mb-2">{reason.description}</p>
                  <span className="text-xs text-text-secondary opacity-75">
                    {formatDate(reason.createdAt)}
                  </span>
                </div>
              ))}
              {reasons.length > 3 && (
                <div className="text-center pt-2">
                  <span className="text-sm text-text-secondary">
                    {t('andMore', { count: reasons.length - 3 })}
                  </span>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-text-secondary mb-4">{t('noReasonsYet')}</p>
              <div className="text-center">
                <Plus className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-sm text-text-secondary">{t('addFirstReason')}</p>
              </div>
            </div>
          )}
        </div>

        {/* My Posts Section */}
        <div className="bg-background-card p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Users className="h-6 w-6 text-primary mr-3" />
              <h2 className="text-lg font-semibold text-text-primary">{t('myPosts')}</h2>
            </div>
            <span className="text-sm text-text-secondary">
              {myPosts?.length || 0} {t('postsCount')}
            </span>
          </div>
          
          {myPosts && myPosts.length > 0 ? (
            <div className="space-y-3">
              {myPosts.slice(0, 3).map((post) => (
                <div key={post.id} className="bg-background-primary p-4 rounded-lg">
                  <h3 className="font-medium text-text-primary mb-1">{post.title}</h3>
                  <p className="text-sm text-text-secondary mb-2 line-clamp-2">
                    {post.content}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-text-secondary opacity-75">
                      {formatDate(post.createdAt)}
                    </span>
                    <span className="text-xs text-primary">
                      {post.upvotes} {t('upvotes')}
                    </span>
                  </div>
                </div>
              ))}
              {myPosts.length > 3 && (
                <div className="text-center pt-2">
                  <span className="text-sm text-text-secondary">
                    {t('andMore', { count: myPosts.length - 3 })}
                  </span>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-text-secondary mb-4">{t('noPostsYet')}</p>
              <div className="text-center">
                <Plus className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="text-sm text-text-secondary">{t('shareFirstPost')}</p>
              </div>
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-background-card border-none">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary mb-1">
                {reasons?.length || 0}
              </div>
              <div className="text-sm text-text-secondary">
                {t('totalReasons')}
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-background-card border-none">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary mb-1">
                {myPosts?.reduce((total, post) => total + post.upvotes, 0) || 0}
              </div>
              <div className="text-sm text-text-secondary">
                {t('totalUpvotes')}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Navigation currentPath="/journal" />
    </div>
  );
}