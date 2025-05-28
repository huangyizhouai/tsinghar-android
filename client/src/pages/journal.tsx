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
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white relative overflow-hidden">
      {/* Animated stars background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-70"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `twinkle ${2 + Math.random() * 4}s infinite`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 p-4 pb-20">
        {/* Header */}
        <div className="flex items-center mb-6">
          <BookText className="h-8 w-8 text-primary mr-3" />
          <h1 className="text-2xl font-bold text-text-primary">{t('myJournal')}</h1>
        </div>

        <div className="space-y-6">
          {/* My Reasons Section */}
          <div className="bg-background-card/90 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white/10">
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
                  <div key={reason.id} className="bg-background-primary/50 p-4 rounded-lg border border-white/5">
                    <h3 className="font-medium text-text-primary mb-1">{reason.title}</h3>
                    <p className="text-sm text-text-secondary mb-2">{reason.description}</p>
                    <span className="text-xs text-text-secondary opacity-75">
                      {formatDate(reason.createdAt)}
                    </span>
                  </div>
                ))}
                {reasons.length > 3 && (
                  <div className="text-center">
                    <a 
                      href="/reasons" 
                      className="text-primary hover:text-primary-light text-sm font-medium"
                    >
                      {t('viewAllReasons')} ({reasons.length - 3} {t('more')})
                    </a>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <Heart className="h-12 w-12 text-text-secondary mx-auto mb-3 opacity-50" />
                <p className="text-text-secondary mb-4">{t('noReasonsInJournal')}</p>
                <a 
                  href="/reasons" 
                  className="inline-flex items-center px-4 py-2 bg-primary hover:bg-primary-light text-white rounded-lg text-sm"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  {t('addFirstReason')}
                </a>
              </div>
            )}
          </div>

          {/* My Community Posts Section */}
          <div className="bg-background-card/90 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Users className="h-6 w-6 text-primary mr-3" />
                <h2 className="text-lg font-semibold text-text-primary">{t('myCommunityPosts')}</h2>
              </div>
              <span className="text-sm text-text-secondary">
                {myPosts?.length || 0} {t('postsCount')}
              </span>
            </div>
            
            {myPosts && myPosts.length > 0 ? (
              <div className="space-y-3">
                {myPosts.slice(0, 3).map((post) => (
                  <div key={post.id} className="bg-background-primary/50 p-4 rounded-lg border border-white/5">
                    <h3 className="font-medium text-text-primary mb-1">{post.title}</h3>
                    <p className="text-sm text-text-secondary mb-2 line-clamp-2">
                      {post.content.length > 100 ? `${post.content.substring(0, 100)}...` : post.content}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-text-secondary opacity-75">
                        {formatDate(post.createdAt)}
                      </span>
                      <span className="text-xs text-text-secondary">
                        {post.upvotes} {t('upvotes')}
                      </span>
                    </div>
                  </div>
                ))}
                {myPosts.length > 3 && (
                  <div className="text-center">
                    <a 
                      href="/community" 
                      className="text-primary hover:text-primary-light text-sm font-medium"
                    >
                      {t('viewAllPosts')} ({myPosts.length - 3} {t('more')})
                    </a>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-text-secondary mx-auto mb-3 opacity-50" />
                <p className="text-text-secondary mb-4">{t('noPostsInJournal')}</p>
                <a 
                  href="/community" 
                  className="inline-flex items-center px-4 py-2 bg-primary hover:bg-primary-light text-white rounded-lg text-sm"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  {t('writeFirstPost')}
                </a>
              </div>
            )}
          </div>

          {/* Journal Stats */}
          <div className="bg-background-card/90 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white/10">
            <h2 className="text-lg font-semibold text-text-primary mb-4">{t('journalStats')}</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{reasons?.length || 0}</div>
                <div className="text-sm text-text-secondary">{t('totalReasons')}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{myPosts?.length || 0}</div>
                <div className="text-sm text-text-secondary">{t('totalPosts')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Navigation currentPath="/journal" />
    </div>
  );
}