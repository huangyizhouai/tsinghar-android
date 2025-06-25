import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLanguage } from "@/hooks/use-language";
import { Shield, UserCheck, Eye, Heart } from "lucide-react";

interface InitialConsentModalProps {
  isOpen: boolean;
  onAccept: () => void;
  onDecline: () => void;
}

export default function InitialConsentModal({ isOpen, onAccept, onDecline }: InitialConsentModalProps) {
  const { language } = useLanguage();

  const content = {
    en: {
      title: "Welcome to 清花",
      subtitle: "Your Privacy & Recovery Journey",
      notice: "Before you begin your recovery journey, please review our privacy practices and terms.",
      
      sections: [
        {
          icon: Eye,
          title: "What We Collect",
          content: [
            "• Your recovery progress and streak data",
            "• Community posts and interactions you choose to share", 
            "• Account information (username, email, preferences)",
            "• Anonymous usage analytics to improve the app"
          ]
        },
        {
          icon: Shield,
          title: "How We Protect You",
          content: [
            "• We never sell your personal information",
            "• All data is encrypted and securely stored",
            "• 24-hour content moderation for community safety",
            "• You can delete your account and data anytime"
          ]
        },
        {
          icon: Heart,
          title: "Community Guidelines",
          content: [
            "• Be respectful and supportive to others",
            "• No harassment, discrimination, or harmful content", 
            "• Report inappropriate content when you see it",
            "• Maintain confidentiality of others' journeys"
          ]
        },
        {
          icon: UserCheck,
          title: "Your Rights",
          content: [
            "• Access and update your information anytime",
            "• Opt out of non-essential communications",
            "• Block users and report abuse",
            "• Request account deletion with full data removal"
          ]
        }
      ],
      
      important: "Important: You can decline and exit the app if you don't agree with these terms.",
      effectiveDate: "Published/Effective Date: December 18, 2024",
      decline: "Decline & Exit",
      accept: "I Accept & Continue",
      fullPolicy: "View Full Privacy Policy"
    },
    
    zh: {
      title: "欢迎使用清花",
      subtitle: "您的隐私与康复之旅",
      notice: "在开始您的康复之旅之前，请查看我们的隐私做法和条款。",
      
      sections: [
        {
          icon: Eye,
          title: "我们收集什么",
          content: [
            "• 您的康复进度和连续天数数据",
            "• 您选择分享的社区帖子和互动",
            "• 账户信息（用户名、邮箱、偏好设置）",
            "• 匿名使用分析以改进应用"
          ]
        },
        {
          icon: Shield,
          title: "我们如何保护您",
          content: [
            "• 我们绝不出售您的个人信息",
            "• 所有数据都经过加密和安全存储",
            "• 24小时内容审核确保社区安全",
            "• 您可以随时删除账户和数据"
          ]
        },
        {
          icon: Heart,
          title: "社区准则",
          content: [
            "• 对他人保持尊重和支持",
            "• 禁止骚扰、歧视或有害内容",
            "• 发现不当内容时请举报",
            "• 维护他人康复之旅的保密性"
          ]
        },
        {
          icon: UserCheck,
          title: "您的权利",
          content: [
            "• 随时访问和更新您的信息",
            "• 选择退出非必要通信",
            "• 屏蔽用户和举报滥用",
            "• 请求删除账户并完全移除数据"
          ]
        }
      ],
      
      important: "重要提示：如果您不同意这些条款，可以拒绝并退出应用。",
      effectiveDate: "发布/生效日期：2024年12月18日",
      decline: "拒绝并退出",
      accept: "我接受并继续",
      fullPolicy: "查看完整隐私政策"
    }
  };

  const currentContent = content[language];

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="bg-gradient-to-br from-purple-900/95 to-blue-900/95 border-white/20 text-white max-w-2xl max-h-[90vh] backdrop-blur-sm">
        <DialogHeader className="text-center pb-4">
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">
            {currentContent.title}
          </DialogTitle>
          <p className="text-lg text-blue-200 font-medium">
            {currentContent.subtitle}
          </p>
          <p className="text-sm text-white/80 mt-2">
            {currentContent.notice}
          </p>
        </DialogHeader>
        
        <ScrollArea className="max-h-[50vh] pr-4">
          <div className="space-y-6">
            {currentContent.sections.map((section, index) => (
              <div key={index} className="bg-white/10 rounded-lg p-4 backdrop-blur-sm border border-white/20">
                <div className="flex items-center mb-3">
                  <section.icon className="h-5 w-5 text-blue-300 mr-2" />
                  <h3 className="font-semibold text-blue-200">
                    {section.title}
                  </h3>
                </div>
                <div className="space-y-1">
                  {section.content.map((item, itemIndex) => (
                    <p key={itemIndex} className="text-sm text-white/90 leading-relaxed">
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            ))}
            
            <div className="bg-yellow-900/30 border border-yellow-500/50 rounded-lg p-4">
              <p className="text-yellow-200 text-sm font-medium">
                {currentContent.important}
              </p>
            </div>
            
            <div className="text-center">
              <p className="text-xs text-white/60">
                {currentContent.effectiveDate}
              </p>
            </div>
          </div>
        </ScrollArea>

        <div className="flex flex-col gap-3 pt-4 border-t border-white/20">
          <div className="flex gap-3">
            <Button
              onClick={onDecline}
              variant="outline"
              className="flex-1 border-red-500/50 text-red-300 hover:bg-red-500/20 hover:border-red-400"
              size="lg"
            >
              {currentContent.decline}
            </Button>
            <Button
              onClick={onAccept}
              className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white"
              size="lg"
            >
              {currentContent.accept}
            </Button>
          </div>
          
          <Button
            variant="ghost"
            className="text-white/70 hover:text-white text-sm"
            onClick={() => {
              // Could open full privacy policy modal here
            }}
          >
            {currentContent.fullPolicy}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}