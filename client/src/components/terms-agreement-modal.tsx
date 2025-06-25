import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { useLanguage } from "@/hooks/use-language";

interface TermsAgreementModalProps {
  isOpen: boolean;
  onAccept: () => void;
}

export default function TermsAgreementModal({ isOpen, onAccept }: TermsAgreementModalProps) {
  const { language } = useLanguage();
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false);
  const [hasAcceptedPrivacy, setHasAcceptedPrivacy] = useState(false);

  const canProceed = hasAcceptedTerms && hasAcceptedPrivacy;

  const handleAccept = () => {
    if (canProceed) {
      localStorage.setItem('termsAccepted', 'true');
      onAccept();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="bg-background-primary border-white/20 text-white max-w-lg max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">
            {language === 'zh' ? '使用条款与隐私政策' : 'Terms & Privacy Policy'}
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="max-h-96 pr-4">
          <div className="space-y-4 text-sm">
            {/* UGC Safety Policy */}
            <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
              <h3 className="font-semibold text-red-200 mb-2">
                {language === 'zh' ? '社区内容安全政策' : 'Community Content Safety Policy'}
              </h3>
              <p className="text-red-100 text-xs leading-relaxed">
                {language === 'zh' 
                  ? '我们不容忍令人反感的内容。用户可以举报帖子，屏蔽滥用账户，我们将在24小时内删除违规内容。任何违反社区准则的行为将导致账户被暂停或永久禁止。'
                  : 'We do not tolerate objectionable content. Users can report posts, block abusive accounts, and we remove violating content within 24 hours. Any violation of community guidelines will result in account suspension or permanent ban.'
                }
              </p>
            </div>

            {/* Terms of Service */}
            <div>
              <h3 className="font-semibold mb-2">
                {language === 'zh' ? '使用条款' : 'Terms of Service'}
              </h3>
              <p className="text-white/80 text-xs leading-relaxed">
                {language === 'zh'
                  ? '使用本应用程序即表示您同意遵守我们的社区准则。您负责您发布的所有内容。禁止发布骚扰、仇恨言论、垃圾邮件或非法内容。违反这些条款可能导致账户终止。'
                  : 'By using this application, you agree to abide by our community guidelines. You are responsible for all content you post. Harassment, hate speech, spam, or illegal content is prohibited. Violations may result in account termination.'
                }
              </p>
            </div>

            {/* Privacy Policy */}
            <div>
              <h3 className="font-semibold mb-2">
                {language === 'zh' ? '隐私政策' : 'Privacy Policy'}
              </h3>
              <p className="text-white/80 text-xs leading-relaxed">
                {language === 'zh'
                  ? '我们收集最少必要的信息以提供服务。您的个人数据受到保护，不会与第三方共享。您可以随时请求删除您的账户和数据。我们使用加密来保护您的信息。'
                  : 'We collect minimal necessary information to provide our services. Your personal data is protected and not shared with third parties. You can request account and data deletion at any time. We use encryption to protect your information.'
                }
              </p>
            </div>

            {/* Content Moderation */}
            <div>
              <h3 className="font-semibold mb-2">
                {language === 'zh' ? '内容审核' : 'Content Moderation'}
              </h3>
              <p className="text-white/80 text-xs leading-relaxed">
                {language === 'zh'
                  ? '所有用户生成的内容都会受到审核。我们使用自动化工具和人工审核来检测不当内容。用户可以举报违规内容，我们承诺在24小时内处理所有举报。'
                  : 'All user-generated content is subject to moderation. We use automated tools and human review to detect inappropriate content. Users can report violations, and we commit to addressing all reports within 24 hours.'
                }
              </p>
            </div>
          </div>
        </ScrollArea>

        <div className="space-y-4">
          {/* Agreement Checkboxes */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="terms" 
                checked={hasAcceptedTerms}
                onCheckedChange={(checked) => setHasAcceptedTerms(!!checked)}
              />
              <label htmlFor="terms" className="text-sm">
                {language === 'zh' ? '我同意使用条款和社区准则' : 'I agree to the Terms of Service and Community Guidelines'}
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="privacy" 
                checked={hasAcceptedPrivacy}
                onCheckedChange={(checked) => setHasAcceptedPrivacy(!!checked)}
              />
              <label htmlFor="privacy" className="text-sm">
                {language === 'zh' ? '我同意隐私政策' : 'I agree to the Privacy Policy'}
              </label>
            </div>
          </div>

          <div className="flex gap-3">
            <Button 
              onClick={() => setIsOpen(false)}
              variant="outline"
              className="flex-1 border-red-500/50 text-red-400 hover:bg-red-500/20"
            >
              {language === 'zh' ? '拒绝' : 'Decline'}
            </Button>
            <Button 
              onClick={handleAccept}
              disabled={!canProceed}
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-600"
            >
              {language === 'zh' ? '接受并继续' : 'Accept and Continue'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}