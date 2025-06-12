import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUp, MoreVertical, Flag, UserX } from "lucide-react";
import { formatDistanceToNow } from "@/lib/utils";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import ReportAbuseModal from "@/components/report-abuse-modal";
import BlockUserModal from "@/components/block-user-modal";
import { useLanguage } from "@/hooks/use-language";

type PostAuthor = {
  name: string;
  initials: string;
  color: string;
  streak: number;
};

type Post = {
  id: number;
  userId: number;
  title: string;
  content: string;
  upvotes: number;
  createdAt: string;
  imageUrl?: string;
};

// Sample authors
const authors: Record<number, PostAuthor> = {
  1: { name: "John D.", initials: "JD", color: "bg-primary", streak: 90 },
  2: { name: "Sean E.", initials: "SE", color: "bg-danger", streak: 0 },
  3: { name: "Alex M.", initials: "AM", color: "bg-success", streak: 45 },
  4: { name: "Tim C.", initials: "TC", color: "bg-info", streak: 21 }
};

type PostCardProps = {
  post: Post;
  onUpvote: () => void;
};

export default function PostCard({ post, onUpvote }: PostCardProps) {
  const { language } = useLanguage();
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);
  
  // Select a random author if we don't have a matching one
  const postAuthor = authors[post.id] || authors[1];
  
  // Get relative time (e.g., "2 hours ago")
  const timeAgo = formatDistanceToNow(new Date(post.createdAt));
  
  // Truncate content for preview
  const truncatedContent = post.content.length > 120 
    ? post.content.substring(0, 120) + '...' 
    : post.content;

  // Check if user is blocked
  const blockedUsers = JSON.parse(localStorage.getItem('blockedUsers') || '[]');
  const isBlocked = blockedUsers.includes(post.userId);
  
  if (isBlocked) {
    return null; // Don't render blocked user's posts
  }
  
  return (
    <Card className="bg-background-card rounded-xl overflow-hidden">
      {post.imageUrl && (
        <img src={post.imageUrl} alt="Featured" className="w-full h-32 object-cover" />
      )}
      <CardContent className="p-4">
        <h2 className="font-medium text-text-primary mb-2">{post.title}</h2>
        <p className="text-sm text-text-secondary mb-3">
          {truncatedContent}
        </p>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className={`${postAuthor.color} text-white text-xs rounded-full w-8 h-8 flex items-center justify-center mr-2`}>
              {postAuthor.initials}
            </div>
            <div>
              <p className="text-xs text-text-primary">{postAuthor.name}</p>
              <p className="text-xs text-text-secondary">{postAuthor.streak} Day Streak · {timeAgo}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={onUpvote}
              className="flex items-center text-text-secondary hover:text-primary transition-colors"
            >
              <ArrowUp className="h-5 w-5 mr-1" />
              <span className="text-xs">{post.upvotes}</span>
            </button>
            
            {/* UGC Safety Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-text-secondary hover:text-text-primary">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-background-card border-white/20">
                <DropdownMenuItem 
                  onClick={() => setIsReportModalOpen(true)}
                  className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                >
                  <Flag className="h-4 w-4 mr-2" />
                  {language === 'zh' ? '举报内容' : 'Report Content'}
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setIsBlockModalOpen(true)}
                  className="text-orange-400 hover:text-orange-300 hover:bg-orange-900/20"
                >
                  <UserX className="h-4 w-4 mr-2" />
                  {language === 'zh' ? '屏蔽用户' : 'Block User'}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
      
      {/* UGC Safety Modals */}
      <ReportAbuseModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        postId={post.id}
        postTitle={post.title}
      />
      
      <BlockUserModal
        isOpen={isBlockModalOpen}
        onClose={() => setIsBlockModalOpen(false)}
        username={postAuthor.name}
        userId={post.userId}
      />
    </Card>
  );
}
