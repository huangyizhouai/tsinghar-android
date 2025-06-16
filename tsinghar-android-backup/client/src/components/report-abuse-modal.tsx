import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/hooks/use-language";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface ReportAbuseModalProps {
  isOpen: boolean;
  onClose: () => void;
  postId: number;
  postTitle: string;
}

export default function ReportAbuseModal({ isOpen, onClose, postId, postTitle }: ReportAbuseModalProps) {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [reason, setReason] = useState("");
  const [details, setDetails] = useState("");

  const reportMutation = useMutation({
    mutationFn: async (data: { postId: number; reason: string; details: string }) => {
      const response = await apiRequest("POST", "/api/reports", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: language === 'zh' ? "举报已提交" : "Report Submitted",
        description: language === 'zh' 
          ? "我们将在24小时内处理您的举报" 
          : "We will review your report within 24 hours",
      });
      onClose();
      setReason("");
      setDetails("");
    },
    onError: () => {
      toast({
        title: language === 'zh' ? "提交失败" : "Submission Failed",
        description: language === 'zh' 
          ? "请稍后再试" 
          : "Please try again later",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = () => {
    if (!reason) {
      toast({
        title: language === 'zh' ? "请选择举报原因" : "Please select a reason",
        variant: "destructive",
      });
      return;
    }

    reportMutation.mutate({
      postId,
      reason,
      details,
    });
  };

  const reportReasons = language === 'zh' 
    ? [
        { value: "spam", label: "垃圾信息" },
        { value: "harassment", label: "骚扰行为" },
        { value: "hate_speech", label: "仇恨言论" },
        { value: "inappropriate", label: "不当内容" },
        { value: "self_harm", label: "自我伤害" },
        { value: "other", label: "其他" },
      ]
    : [
        { value: "spam", label: "Spam" },
        { value: "harassment", label: "Harassment" },
        { value: "hate_speech", label: "Hate Speech" },
        { value: "inappropriate", label: "Inappropriate Content" },
        { value: "self_harm", label: "Self-harm" },
        { value: "other", label: "Other" },
      ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-background-primary border-white/20 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">
            {language === 'zh' ? '举报滥用内容' : 'Report Abuse'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <p className="text-sm text-white/70 mb-2">
              {language === 'zh' ? '举报帖子：' : 'Reporting post:'} "{postTitle}"
            </p>
          </div>

          <div>
            <Label className="text-sm font-medium mb-3 block">
              {language === 'zh' ? '举报原因：' : 'Reason for report:'}
            </Label>
            <RadioGroup value={reason} onValueChange={setReason}>
              {reportReasons.map((reasonOption) => (
                <div key={reasonOption.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={reasonOption.value} id={reasonOption.value} />
                  <Label htmlFor={reasonOption.value} className="text-sm">
                    {reasonOption.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div>
            <Label htmlFor="details" className="text-sm font-medium mb-2 block">
              {language === 'zh' ? '详细说明（可选）：' : 'Additional details (optional):'}
            </Label>
            <Textarea
              id="details"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder={language === 'zh' 
                ? "请提供更多信息..." 
                : "Please provide more information..."
              }
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              rows={3}
            />
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 border-white/20 text-white hover:bg-white/10"
            >
              {language === 'zh' ? '取消' : 'Cancel'}
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={reportMutation.isPending || !reason}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white"
            >
              {reportMutation.isPending 
                ? (language === 'zh' ? '提交中...' : 'Submitting...') 
                : (language === 'zh' ? '提交举报' : 'Submit Report')
              }
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}