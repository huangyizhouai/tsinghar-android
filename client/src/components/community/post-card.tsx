import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUp } from "lucide-react";
import { formatDistanceToNow } from "@/lib/utils";

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
  // Select a random author if we don't have a matching one
  const postAuthor = authors[post.id] || authors[1];
  
  // Get relative time (e.g., "2 hours ago")
  const timeAgo = formatDistanceToNow(new Date(post.createdAt));
  
  // Truncate content for preview
  const truncatedContent = post.content.length > 120 
    ? post.content.substring(0, 120) + '...' 
    : post.content;
  
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
          <button 
            onClick={onUpvote}
            className="flex items-center text-text-secondary hover:text-primary transition-colors"
          >
            <ArrowUp className="h-5 w-5 mr-1" />
            <span className="text-xs">{post.upvotes}</span>
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
