import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/use-language";
import { useToast } from "@/hooks/use-toast";

interface BlockUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  username: string;
  userId: number;
}

export default function BlockUserModal({ isOpen, onClose, username, userId }: BlockUserModalProps) {
  const { language } = useLanguage();
  const { toast } = useToast();

  const handleBlock = () => {
    // Store blocked users in localStorage for client-side filtering
    const blockedUsers = JSON.parse(localStorage.getItem('blockedUsers') || '[]');
    if (!blockedUsers.includes(userId)) {
      blockedUsers.push(userId);
      localStorage.setItem('blockedUsers', JSON.stringify(blockedUsers));
    }

    toast({
      title: language === 'zh' ? "用户已屏蔽" : "User Blocked",
      description: language === 'zh' 
        ? `已屏蔽用户 ${username}` 
        : `Blocked user ${username}`,
    });
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-background-primary border-white/20 text-white max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">
            {language === 'zh' ? '屏蔽用户' : 'Block User'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <p className="text-sm text-white/80">
            {language === 'zh' 
              ? `确定要屏蔽用户 "${username}" 吗？屏蔽后您将不会看到该用户的帖子和评论。`
              : `Are you sure you want to block user "${username}"? You will no longer see posts and comments from this user.`
            }
          </p>

          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 border-white/20 text-white hover:bg-white/10"
            >
              {language === 'zh' ? '取消' : 'Cancel'}
            </Button>
            <Button
              onClick={handleBlock}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white"
            >
              {language === 'zh' ? '屏蔽' : 'Block'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}