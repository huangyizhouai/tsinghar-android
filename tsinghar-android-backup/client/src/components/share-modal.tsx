import { useState, useRef } from 'react';
import { X, Download, Share2 } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';
import html2canvas from 'html2canvas';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  dashboardData: {
    days: number;
    recoveryPercentage: number;
    currentDate: string;
    motivationalText: string;
  };
}

export default function ShareModal({ isOpen, onClose, dashboardData }: ShareModalProps) {
  const { t } = useLanguage();
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const snapshotRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const generateSnapshot = async () => {
    if (!snapshotRef.current) return null;
    
    setIsGeneratingImage(true);
    try {
      const canvas = await html2canvas(snapshotRef.current, {
        backgroundColor: '#0F0F23',
        scale: 2,
        width: 400,
        height: 600,
      });
      
      const imageUrl = canvas.toDataURL('image/png');
      setIsGeneratingImage(false);
      return imageUrl;
    } catch (error) {
      console.error('Error generating snapshot:', error);
      setIsGeneratingImage(false);
      return null;
    }
  };

  const saveToAlbum = async () => {
    const imageUrl = await generateSnapshot();
    if (!imageUrl) return;

    // Create a download link for the image
    const link = document.createElement('a');
    link.download = `tsinghar-progress-${new Date().toISOString().split('T')[0]}.png`;
    link.href = imageUrl;
    link.click();
  };

  const shareToSocialMedia = async (platform: string) => {
    const imageUrl = await generateSnapshot();
    if (!imageUrl) return;

    const text = `${t('appName')} - ${dashboardData.days} ${t('days')} ${t('streak')}! 💪`;
    const url = window.location.origin;

    switch (platform) {
      case 'wechat':
        // WeChat sharing typically requires their SDK
        navigator.clipboard.writeText(`${text} ${url}`);
        alert(t('linkCopied'));
        break;
      
      case 'weibo':
        const weiboUrl = `https://service.weibo.com/share/share.php?url=${encodeURIComponent(url)}&title=${encodeURIComponent(text)}`;
        window.open(weiboUrl, '_blank');
        break;
      
      case 'douyin':
        // Douyin/TikTok sharing - copy link for now
        navigator.clipboard.writeText(`${text} ${url}`);
        alert(t('linkCopied'));
        break;
      
      case 'twitter':
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        window.open(twitterUrl, '_blank');
        break;
      
      case 'facebook':
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        window.open(facebookUrl, '_blank');
        break;
      
      default:
        navigator.clipboard.writeText(`${text} ${url}`);
        alert(t('linkCopied'));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-background-primary rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-text-primary">{t('shareProgress')}</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-background-card">
            <X className="h-5 w-5 text-text-secondary" />
          </button>
        </div>

        {/* Snapshot Preview */}
        <div className="p-4">
          <div 
            ref={snapshotRef}
            className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl p-6 text-white relative overflow-hidden"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 right-4 w-20 h-20 border border-white rounded-full"></div>
              <div className="absolute bottom-4 left-4 w-16 h-16 border border-white rounded-full"></div>
            </div>
            
            {/* Content */}
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">{t('appName')}</h3>
                <div className="text-sm opacity-80">{dashboardData.currentDate}</div>
              </div>
              
              <div className="text-center mb-4">
                <div className="text-4xl font-bold mb-2">{dashboardData.days}</div>
                <div className="text-lg">{t('days')} {t('streak')}</div>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">{t('recovery')} {t('progress')}</span>
                  <span className="text-sm font-semibold">{dashboardData.recoveryPercentage}%</span>
                </div>
                <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
                  <div 
                    className="bg-white h-2 rounded-full transition-all duration-500"
                    style={{ width: `${dashboardData.recoveryPercentage}%` }}
                  ></div>
                </div>
              </div>
              
              <p className="text-sm opacity-90 text-center">
                {dashboardData.motivationalText}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-4 space-y-3">
          {/* Save to Album */}
          <button
            onClick={saveToAlbum}
            disabled={isGeneratingImage}
            className="w-full flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            <Download className="h-5 w-5" />
            {isGeneratingImage ? t('generating') : t('saveToAlbum')}
          </button>

          {/* Social Media Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => shareToSocialMedia('wechat')}
              disabled={isGeneratingImage}
              className="flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              <Share2 className="h-4 w-4" />
              {t('wechat')}
            </button>
            
            <button
              onClick={() => shareToSocialMedia('weibo')}
              disabled={isGeneratingImage}
              className="flex items-center justify-center gap-2 bg-red-600 text-white py-3 rounded-xl hover:bg-red-700 transition-colors disabled:opacity-50"
            >
              <Share2 className="h-4 w-4" />
              {t('weibo')}
            </button>
            
            <button
              onClick={() => shareToSocialMedia('douyin')}
              disabled={isGeneratingImage}
              className="flex items-center justify-center gap-2 bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-50"
            >
              <Share2 className="h-4 w-4" />
              {t('douyin')}
            </button>
            
            <button
              onClick={() => shareToSocialMedia('twitter')}
              disabled={isGeneratingImage}
              className="flex items-center justify-center gap-2 bg-blue-500 text-white py-3 rounded-xl hover:bg-blue-600 transition-colors disabled:opacity-50"
            >
              <Share2 className="h-4 w-4" />
              Twitter
            </button>
          </div>

          {/* Additional Options */}
          <button
            onClick={() => shareToSocialMedia('facebook')}
            disabled={isGeneratingImage}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            <Share2 className="h-5 w-5" />
            Facebook
          </button>
        </div>
      </div>
    </div>
  );
}