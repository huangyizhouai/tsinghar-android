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

export default function Community() {
  const [activeTab, setActiveTab] = useState("forum");
  const [isPostDialogOpen, setIsPostDialogOpen] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  
  const { toast } = useToast();
  
  const { data: posts, isLoading } = useQuery<any[]>({
    queryKey: ['/api/posts'],
  });
  
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
        title: "Post created",
        description: "Your post has been published successfully!"
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create post. Please try again.",
        variant: "destructive"
      });
    }
  });
  
  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newPostTitle.trim() || !newPostContent.trim()) {
      toast({
        title: "Error",
        description: "Title and content are required",
        variant: "destructive"
      });
      return;
    }
    
    createPostMutation.mutate();
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
        title: "Error",
        description: "Failed to upvote post",
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
          <h1 className="text-xl font-semibold text-text-primary">NoFap Recovery</h1>
        </div>
        <button className="p-2 rounded-full bg-background-card">
          <Filter className="h-6 w-6 text-text-primary" />
        </button>
      </div>

      {/* Category Selector */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="w-full">
          <TabsTrigger value="forum" className="flex-1">Forum</TabsTrigger>
          <TabsTrigger value="teams" className="flex-1">Teams</TabsTrigger>
        </TabsList>

        {/* Forum Posts */}
        <TabsContent value="forum" className="m-0 p-0 space-y-4 mb-20">
          {isLoading ? (
            <div className="text-center py-8">Loading posts...</div>
          ) : posts && posts.length > 0 ? (
            posts.map((post: any) => (
              <PostCard 
                key={post.id}
                post={post}
                onUpvote={() => handleUpvote(post.id)}
              />
            ))
          ) : (
            <div className="text-center py-8">No posts yet. Be the first to share!</div>
          )}
        </TabsContent>
        
        <TabsContent value="teams" className="m-0 p-0">
          <div className="flex justify-center items-center py-12">
            <div className="text-center">
              <h3 className="text-xl font-medium text-text-primary mb-2">Coming Soon</h3>
              <p className="text-text-secondary">Team support features are currently in development.</p>
              <p className="text-text-secondary mt-1">Join accountability groups in the near future!</p>
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
              <DialogTitle>Create New Post</DialogTitle>
              <DialogDescription className="text-text-secondary">
                Share your experiences, ask questions, or offer support to the community.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreatePost}>
              <div className="space-y-4 py-2">
                <div className="space-y-2">
                  <Input
                    placeholder="Post title"
                    value={newPostTitle}
                    onChange={(e) => setNewPostTitle(e.target.value)}
                    className="bg-background-primary border-background-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Textarea
                    placeholder="Share your thoughts..."
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
                  {createPostMutation.isPending ? "Posting..." : "Post"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
