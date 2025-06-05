import { useState } from "react";
import { ScrollText, X } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PrivacyPolicyModalProps {
  trigger: React.ReactNode;
}

export default function PrivacyPolicyModal({ trigger }: PrivacyPolicyModalProps) {
  const { t, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const lastUpdatedDate = "2025-06-05";

  const privacyPolicyContent = {
    en: {
      title: "Privacy Policy & Terms of Service",
      sections: [
        {
          title: "Privacy Policy",
          content: `
            This Privacy Policy describes how TsingHar ("we", "our", or "us") collects, uses, and shares information about you when you use our mobile application and services.

            Information We Collect:
            • Account information (username, email, age, location)
            • Recovery progress and streak data
            • Community posts and interactions
            • App usage analytics and preferences

            How We Use Your Information:
            • To provide and improve our services
            • To track your recovery progress
            • To enable community features
            • To send relevant notifications and updates

            Information Sharing:
            • We do not sell your personal information
            • Community posts are visible to other users
            • Anonymous usage data may be shared for research purposes

            Data Security:
            • We use encryption to protect your data
            • Regular security audits and updates
            • Secure data storage and transmission

            Your Rights:
            • Access and update your information
            • Delete your account and data
            • Opt out of non-essential communications
          `
        },
        {
          title: "Terms of Service",
          content: `
            By using TsingHar, you agree to these Terms of Service.

            Acceptable Use:
            • Use the app for recovery and wellness purposes
            • Respect other users in community interactions
            • Do not share inappropriate or harmful content
            • Maintain accuracy of your personal information

            Content Guidelines:
            • Community posts should be supportive and relevant
            • No harassment, discrimination, or offensive content
            • Respect privacy and confidentiality of others
            • Report inappropriate content when encountered

            Account Responsibility:
            • Keep your login credentials secure
            • You are responsible for all account activity
            • Notify us of any unauthorized access

            Service Availability:
            • We strive for 99% uptime but cannot guarantee continuous availability
            • Features may be updated or modified with notice
            • We reserve the right to suspend accounts for violations

            Contact Information:
            For questions about this policy, contact us at: support@tsinghar.app
          `
        }
      ]
    },
    zh: {
      title: "隐私政策与服务条款",
      sections: [
        {
          title: "隐私政策",
          content: `
            本隐私政策描述了TsingHar（"我们"、"我们的"或"我们"）在您使用我们的移动应用程序和服务时如何收集、使用和共享您的信息。

            我们收集的信息：
            • 账户信息（用户名、邮箱、年龄、地区）
            • 康复进度和连续天数数据
            • 社区帖子和互动
            • 应用使用分析和偏好设置

            我们如何使用您的信息：
            • 提供和改进我们的服务
            • 跟踪您的康复进度
            • 启用社区功能
            • 发送相关通知和更新

            信息共享：
            • 我们不出售您的个人信息
            • 社区帖子对其他用户可见
            • 匿名使用数据可能用于研究目的

            数据安全：
            • 我们使用加密来保护您的数据
            • 定期安全审计和更新
            • 安全的数据存储和传输

            您的权利：
            • 访问和更新您的信息
            • 删除您的账户和数据
            • 选择退出非必要通信
          `
        },
        {
          title: "服务条款",
          content: `
            使用TsingHar即表示您同意这些服务条款。

            可接受使用：
            • 将应用用于康复和健康目的
            • 在社区互动中尊重其他用户
            • 不分享不当或有害内容
            • 保持个人信息的准确性

            内容指南：
            • 社区帖子应该是支持性和相关的
            • 不得骚扰、歧视或发布攻击性内容
            • 尊重他人的隐私和保密性
            • 遇到不当内容时进行举报

            账户责任：
            • 保护您的登录凭据安全
            • 您对所有账户活动负责
            • 如有未经授权的访问请通知我们

            服务可用性：
            • 我们努力保持99%的正常运行时间，但不能保证持续可用性
            • 功能可能会在通知后更新或修改
            • 我们保留因违规而暂停账户的权利

            联系信息：
            有关此政策的问题，请联系我们：support@tsinghar.app
          `
        }
      ]
    }
  };

  const content = privacyPolicyContent[language];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] bg-background-card border-background-primary">
        <DialogHeader className="pb-4 border-b border-background-primary">
          <DialogTitle className="text-text-primary flex items-center">
            <ScrollText className="h-5 w-5 mr-2" />
            {content.title}
          </DialogTitle>
          <p className="text-sm text-text-secondary">
            {t('lastUpdated')}: {lastUpdatedDate}
          </p>
        </DialogHeader>
        
        <ScrollArea className="h-[70vh] pr-4">
          <div className="space-y-6">
            {content.sections.map((section, index) => (
              <div key={index} className="space-y-3">
                <h3 className="text-lg font-semibold text-text-primary">
                  {section.title}
                </h3>
                <div className="text-text-secondary whitespace-pre-line leading-relaxed">
                  {section.content.trim()}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="pt-4 border-t border-background-primary flex justify-end">
          <Button 
            onClick={() => setIsOpen(false)}
            variant="outline"
            className="border-background-primary text-text-secondary"
          >
            <X className="h-4 w-4 mr-2" />
            {t('close')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}