import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { useLanguage } from "@/hooks/use-language";

interface EulaModalProps {
  isOpen: boolean;
  onAccept: () => void;
  onDecline: () => void;
  trigger: 'first_launch' | 'first_post';
}

export default function EulaModal({ isOpen, onAccept, onDecline, trigger }: EulaModalProps) {
  const { language } = useLanguage();
  const [hasAccepted, setHasAccepted] = useState(false);

  const title = trigger === 'first_launch' 
    ? (language === 'zh' ? '最终用户许可协议' : 'End User License Agreement')
    : (language === 'zh' ? '社区发布协议' : 'Community Posting Agreement');

  const eulaContent = language === 'zh' ? {
    welcome: "欢迎使用 TsingHar",
    intro: "在开始使用本应用前，请仔细阅读并同意以下条款：",
    terms: [
      "1. 用户行为准则：您同意遵守社区准则，不发布有害、非法或不当内容。",
      "2. 内容审核：我们保留审核和删除违规内容的权利，通常在24小时内处理。",
      "3. 隐私保护：您的个人数据将根据我们的隐私政策进行保护。",
      "4. 服务条款：使用本应用即表示您同意我们的服务条款。",
      "5. 年龄限制：用户必须年满13岁才能使用本应用。",
      "6. 责任限制：本应用仅供参考，不能替代专业医疗建议。",
      "7. 账户安全：您有责任保护您的账户安全。",
      "8. 知识产权：尊重他人的知识产权，不得侵犯版权。"
    ],
    userContent: "用户生成内容政策：",
    contentRules: [
      "• 禁止发布仇恨言论、骚扰或歧视性内容",
      "• 禁止发布色情、暴力或不当内容", 
      "• 禁止发布虚假信息或误导性内容",
      "• 禁止发布个人信息或隐私内容",
      "• 所有内容将通过实时过滤和人工审核"
    ],
    moderation: "内容审核承诺：",
    moderationText: "我们承诺在24小时内审核所有用户生成的内容。违规内容和账户将被立即删除。我们使用实时过滤系统和人工审核来确保社区安全。",
    safety: "安全功能：",
    safetyFeatures: [
      "• 每个帖子都有举报滥用和屏蔽用户按钮",
      "• 实时脏话过滤系统",
      "• 24小时审核队列",
      "• 社区安全准则"
    ],
    agreement: "通过点击我同意，您确认已阅读、理解并同意遵守上述所有条款。",
    checkbox: "我已阅读并同意上述条款",
    accept: "我同意",
    decline: "拒绝"
  } : {
    welcome: "Welcome to TsingHar",
    intro: "Before using this application, please read and agree to the following terms:",
    terms: [
      "1. User Conduct: You agree to follow community guidelines and not post harmful, illegal, or inappropriate content.",
      "2. Content Moderation: We reserve the right to review and remove violating content, typically within 24 hours.",
      "3. Privacy Protection: Your personal data will be protected according to our privacy policy.",
      "4. Terms of Service: Using this app indicates your agreement to our terms of service.",
      "5. Age Restriction: Users must be at least 13 years old to use this application.",
      "6. Limitation of Liability: This app is for reference only and cannot replace professional medical advice.",
      "7. Account Security: You are responsible for protecting your account security.",
      "8. Intellectual Property: Respect others' intellectual property and do not infringe copyrights."
    ],
    userContent: "User-Generated Content Policy:",
    contentRules: [
      "• Prohibited: hate speech, harassment, or discriminatory content",
      "• Prohibited: pornographic, violent, or inappropriate content",
      "• Prohibited: false information or misleading content",
      "• Prohibited: personal information or privacy content",
      "• All content subject to real-time filtering and human moderation"
    ],
    moderation: "Content Moderation Commitment:",
    moderationText: "We commit to reviewing all user-generated content within 24 hours. Violating content and accounts will be immediately removed. We use real-time filtering systems and human moderation to ensure community safety.",
    safety: "Safety Features:",
    safetyFeatures: [
      "• 'Report Abuse' and 'Block User' buttons on every post",
      "• Real-time profanity filtering system",
      "• 24-hour moderation queue",
      "• Community safety guidelines"
    ],
    agreement: "By clicking 'I Agree', you confirm that you have read, understood, and agree to comply with all the above terms.",
    checkbox: "I have read and agree to the above terms",
    accept: "I Agree",
    decline: "Decline"
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">
            {title}
          </DialogTitle>
          <DialogDescription className="text-center">
            {eulaContent.welcome}
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="max-h-[50vh] pr-4">
          <div className="space-y-4">
            <p className="text-sm text-text-secondary">
              {eulaContent.intro}
            </p>
            
            <div className="space-y-2">
              {eulaContent.terms.map((term, index) => (
                <p key={index} className="text-sm text-text-primary leading-relaxed">
                  {term}
                </p>
              ))}
            </div>

            <div className="mt-6">
              <h4 className="font-semibold text-text-primary mb-2">
                {eulaContent.userContent}
              </h4>
              <div className="space-y-1">
                {eulaContent.contentRules.map((rule, index) => (
                  <p key={index} className="text-sm text-text-secondary">
                    {rule}
                  </p>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <h4 className="font-semibold text-text-primary mb-2">
                {eulaContent.moderation}
              </h4>
              <p className="text-sm text-text-secondary leading-relaxed">
                {eulaContent.moderationText}
              </p>
            </div>

            <div className="mt-4">
              <h4 className="font-semibold text-text-primary mb-2">
                {eulaContent.safety}
              </h4>
              <div className="space-y-1">
                {eulaContent.safetyFeatures.map((feature, index) => (
                  <p key={index} className="text-sm text-text-secondary">
                    {feature}
                  </p>
                ))}
              </div>
            </div>

            <div className="mt-6 p-4 bg-background-secondary rounded-lg">
              <p className="text-sm text-text-primary font-medium">
                {eulaContent.agreement}
              </p>
            </div>
          </div>
        </ScrollArea>

        <div className="mt-4">
          <div className="flex items-center space-x-2 mb-4">
            <Checkbox 
              id="eula-accept" 
              checked={hasAccepted}
              onCheckedChange={(checked) => {
                if (typeof checked === 'boolean') {
                  setHasAccepted(checked);
                }
              }}
            />
            <label 
              htmlFor="eula-accept" 
              className="text-sm text-text-primary cursor-pointer"
            >
              {eulaContent.checkbox}
            </label>
          </div>
        </div>

        <DialogFooter className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={onDecline}
            className="flex-1"
          >
            {eulaContent.decline}
          </Button>
          <Button 
            onClick={onAccept}
            disabled={!hasAccepted}
            className="flex-1 bg-primary hover:bg-primary/90"
          >
            {eulaContent.accept}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}