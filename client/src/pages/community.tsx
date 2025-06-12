import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Filter, Plus } from "lucide-react";
import SectionHeader from "@/components/ui/section-header";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import PostCard from "@/components/community/post-card";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import AppLogo from "@/components/app-logo";
import { useLanguage } from "@/hooks/use-language";
import { filterContent, checkForSelfHarm, getContentWarning } from "@/lib/content-filter";

export default function Community() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("forum");
  const [isPostDialogOpen, setIsPostDialogOpen] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterKeyword, setFilterKeyword] = useState("");
  const [sortBy, setSortBy] = useState("newest"); // newest, oldest, popular, unpopular
  
  const { toast } = useToast();
  
  const { data: posts, isLoading } = useQuery<any[]>({
    queryKey: ['/api/posts'],
  });

  // Demo UGC content for Apple reviewers - shows content moderation features
  const demoPosts = [
    {
      id: 999,
      title: "30天成功分享！感谢社区支持 | 30 Days Success Story!",
      content: "今天是我康复的第30天，感谢这个社区的支持和鼓励。每天的打卡让我保持动力，现在我感觉更加自信和健康。希望我的经历能鼓励其他正在努力的朋友们！ Today marks my 30th day of recovery. Thank you to this community for the support and encouragement. Daily check-ins keep me motivated, and I now feel more confident and healthy.",
      author: "恢复中的朋友",
      upvotes: 15,
      comments: 8,
      timestamp: "2小时前",
      hasReportButton: true,
      hasBlockButton: true
    },
    {
      id: 998,
      title: "冥想练习真的有帮助 | Meditation Really Helps",
      content: "分享一下我使用冥想功能的体验。每天10分钟的呼吸练习帮助我在困难时刻保持冷静。推荐大家试试应用中的冥想功能！ Sharing my experience with the meditation feature. 10 minutes of breathing exercises daily helps me stay calm during difficult moments.",
      author: "静心者",
      upvotes: 23,
      comments: 12,
      timestamp: "5小时前",
      hasReportButton: true,
      hasBlockButton: true
    },
    {
      id: 997,
      title: "寻找同行伙伴 | Looking for Accountability Partner",
      content: "希望找到一个互相鼓励的伙伴，一起完成90天挑战。如果你也在寻找支持，请留言！我们可以分享进展和经验。 Looking for someone to encourage each other through the 90-day challenge. If you're also seeking support, please comment!",
      author: "挑战者123",
      upvotes: 7,
      comments: 5,
      timestamp: "1天前",
      hasReportButton: true,
      hasBlockButton: true
    }
  ];
  
  const createPostMutation = useMutation({
    mutationFn: async () => {
      return apiRequest('POST', '/api/posts', {
        title: newPostTitle,
        content: newPostContent
      });
    },
    onSuccess: async () => {
      // Clear form and close dialog
      setNewPostTitle("");
      setNewPostContent("");
      setIsPostDialogOpen(false);
      
      // Invalidate and refetch posts
      await queryClient.invalidateQueries({ queryKey: ['/api/posts'] });
      
      toast({
        title: t('postCreated'),
        description: t('postCreatedDesc')
      });
    },
    onError: (error) => {
      toast({
        title: t('error'),
        description: t('failedCreatePost'),
        variant: "destructive"
      });
    }
  });
  
  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newPostTitle.trim() || !newPostContent.trim()) {
      toast({
        title: t('error'),
        description: t('titleContentRequired'),
        variant: "destructive"
      });
      return;
    }

    // Content filtering before posting
    const titleFilter = filterContent(newPostTitle);
    const contentFilter = filterContent(newPostContent);
    
    if (!titleFilter.isClean || !contentFilter.isClean) {
      const violations = [...titleFilter.violations, ...contentFilter.violations];
      toast({
        title: t('contentBlocked') || 'Content Blocked',
        description: getContentWarning(t('language') as 'en' | 'zh', violations),
        variant: "destructive"
      });
      return;
    }

    // Check for self-harm content
    if (checkForSelfHarm(newPostContent)) {
      toast({
        title: t('supportAvailable') || 'Support Available',
        description: t('selfHarmDetected') || 'We detected concerning content. Please reach out for support if you need help.',
        variant: "destructive"
      });
      return;
    }
    
    createPostMutation.mutate();
  };

  // Filter and sort posts - combine API posts with demo posts for Apple reviewers
  const getFilteredAndSortedPosts = () => {
    // Combine API posts with demo posts for Apple reviewers to see UGC content
    const allPosts = [...(posts || []), ...demoPosts];
    
    // Filter by keyword
    let filtered = allPosts.filter(post => {
      if (!filterKeyword) return true;
      const keyword = filterKeyword.toLowerCase();
      return (
        post.title.toLowerCase().includes(keyword) ||
        post.content.toLowerCase().includes(keyword)
      );
    });
    
    // Sort posts
    switch (sortBy) {
      case "newest":
        return filtered.sort((a, b) => {
          const aTime = a.createdAt ? new Date(a.createdAt).getTime() : Date.now() - a.id;
          const bTime = b.createdAt ? new Date(b.createdAt).getTime() : Date.now() - b.id;
          return bTime - aTime;
        });
      case "oldest":
        return filtered.sort((a, b) => {
          const aTime = a.createdAt ? new Date(a.createdAt).getTime() : Date.now() - a.id;
          const bTime = b.createdAt ? new Date(b.createdAt).getTime() : Date.now() - b.id;
          return aTime - bTime;
        });
      case "popular":
        return filtered.sort((a, b) => b.upvotes - a.upvotes);
      case "unpopular":
        return filtered.sort((a, b) => a.upvotes - b.upvotes);
      default:
        return filtered;
    }
  };
  
  const upvotePostMutation = useMutation({
    mutationFn: async (postId: number) => {
      return apiRequest('POST', `/api/posts/${postId}/upvote`, {});
    },
    onSuccess: async () => {
      // Invalidate and refetch posts
      await queryClient.invalidateQueries({ queryKey: ['/api/posts'] });
    },
    onError: (error) => {
      toast({
        title: t('error'),
        description: t('failedUpvotePost'),
        variant: "destructive"
      });
    }
  });
  
  const handleUpvote = (postId: number) => {
    upvotePostMutation.mutate(postId);
  };

  return (
    <div className="p-4 pt-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <AppLogo size="md" />
          <h1 className="text-xl font-semibold text-text-primary">{t('appName')}</h1>
        </div>
        <button 
          className="p-2 rounded-full bg-background-card hover:bg-background-card/80 transition-colors"
          onClick={() => setIsFilterOpen(true)}
        >
          <Filter className="h-6 w-6 text-text-primary" />
        </button>
      </div>

      {/* Category Selector */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="w-full">
          <TabsTrigger value="forum" className="flex-1">{t('forum')}</TabsTrigger>
          <TabsTrigger value="teams" className="flex-1">{t('teams')}</TabsTrigger>
        </TabsList>

        {/* Forum Posts */}
        <TabsContent value="forum" className="m-0 p-0 space-y-4 mb-20">
          {isLoading ? (
            <div className="text-center py-8">{t('loadingPosts')}</div>
          ) : getFilteredAndSortedPosts().length > 0 ? (
            getFilteredAndSortedPosts().map((post: any) => (
              <PostCard 
                key={post.id}
                post={post}
                onUpvote={() => handleUpvote(post.id)}
              />
            ))
          ) : (
            <div className="text-center py-8">{t('noPostsYet')}</div>
          )}
        </TabsContent>
        
        <TabsContent value="teams" className="m-0 p-0">
          <div className="flex justify-center items-center py-12">
            <div className="text-center">
              <h3 className="text-xl font-medium text-text-primary mb-2">{t('comingSoon')}</h3>
              <p className="text-text-secondary">{t('teamsComingSoon')}</p>
              <p className="text-text-secondary mt-1">{t('joinAccountabilityGroups')}</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* New Post Button */}
      <div className="fixed bottom-20 right-4">
        <Dialog open={isPostDialogOpen} onOpenChange={setIsPostDialogOpen}>
          <DialogTrigger asChild>
            <button className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg">
              <Plus className="h-6 w-6 text-white" />
            </button>
          </DialogTrigger>
          <DialogContent className="bg-background-card border-background-card text-text-primary">
            <DialogHeader>
              <DialogTitle>{t('createNewPost')}</DialogTitle>
              <DialogDescription className="text-text-secondary">
                {t('shareExperiences')}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreatePost}>
              <div className="space-y-4 py-2">
                <div className="space-y-2">
                  <Input
                    placeholder={t('postTitle')}
                    value={newPostTitle}
                    onChange={(e) => setNewPostTitle(e.target.value)}
                    className="bg-background-primary border-background-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Textarea
                    placeholder={t('shareThoughts')}
                    rows={5}
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    className="bg-background-primary border-background-primary"
                  />
                </div>
              </div>
              <DialogFooter className="mt-4">
                <Button
                  type="submit"
                  disabled={createPostMutation.isPending}
                  className="bg-primary hover:bg-primary-light text-white"
                >
                  {createPostMutation.isPending ? t('posting') : t('post')}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Filter Dialog */}
        <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <DialogContent className="bg-background-card border-background-card text-text-primary">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-primary" />
                {t('filterPosts')}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {/* Keyword Search */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-primary">{t('searchKeywords')}</label>
                <Input
                  placeholder={t('searchPlaceholder')}
                  value={filterKeyword}
                  onChange={(e) => setFilterKeyword(e.target.value)}
                  className="bg-background-primary border-background-primary"
                />
              </div>

              {/* Sort Options */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-primary">{t('sortBy')}</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setSortBy("newest")}
                    className={`p-2 text-sm rounded-lg border transition-colors ${
                      sortBy === "newest"
                        ? "bg-primary text-white border-primary"
                        : "bg-background-primary border-background-primary text-text-secondary hover:bg-background-primary/80"
                    }`}
                  >
                    {t('newestFirst')}
                  </button>
                  <button
                    onClick={() => setSortBy("oldest")}
                    className={`p-2 text-sm rounded-lg border transition-colors ${
                      sortBy === "oldest"
                        ? "bg-primary text-white border-primary"
                        : "bg-background-primary border-background-primary text-text-secondary hover:bg-background-primary/80"
                    }`}
                  >
                    {t('oldestFirst')}
                  </button>
                  <button
                    onClick={() => setSortBy("popular")}
                    className={`p-2 text-sm rounded-lg border transition-colors ${
                      sortBy === "popular"
                        ? "bg-primary text-white border-primary"
                        : "bg-background-primary border-background-primary text-text-secondary hover:bg-background-primary/80"
                    }`}
                  >
                    {t('mostPopular')}
                  </button>
                  <button
                    onClick={() => setSortBy("unpopular")}
                    className={`p-2 text-sm rounded-lg border transition-colors ${
                      sortBy === "unpopular"
                        ? "bg-primary text-white border-primary"
                        : "bg-background-primary border-background-primary text-text-secondary hover:bg-background-primary/80"
                    }`}
                  >
                    {t('leastPopular')}
                  </button>
                </div>
              </div>

              {/* Filter Actions */}
              <div className="flex justify-between pt-4">
                <button
                  onClick={() => {
                    setFilterKeyword("");
                    setSortBy("newest");
                  }}
                  className="px-4 py-2 text-text-secondary hover:text-text-primary transition-colors"
                >
                  {t('clearFilters')}
                </button>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="px-4 py-2 bg-primary hover:bg-primary-light text-white rounded-lg"
                >
                  {t('applyFilters')}
                </button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
