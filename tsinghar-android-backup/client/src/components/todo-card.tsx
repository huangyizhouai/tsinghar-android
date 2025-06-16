import { Link } from "wouter";
import { MessageCircle, TrendingUp } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";

export default function TodoCard() {
  const { t } = useLanguage();
  
  return (
    <div className="bg-background-card p-4 rounded-xl shadow-lg space-y-4 mb-6">
      <h2 className="text-text-primary text-lg font-bold">{t('toDo')}</h2>
      <ul className="space-y-3">
        <li>
          <Link href="/community">
            <button className="w-full flex items-center px-4 py-3 bg-primary hover:bg-primary-light text-white rounded-md transition-colors">
              <MessageCircle className="w-5 h-5 mr-3" />
              {t('joinCommunity')}
            </button>
          </Link>
        </li>
        <li>
          <a 
            href={t('tiktokUrl')} 
            className="w-full flex items-center px-4 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-md transition-colors"
            target="_blank" 
            rel="noopener noreferrer"
          >
            <TrendingUp className="w-5 h-5 mr-3" />
            {t('followOnTiktok')}
          </a>
        </li>
      </ul>
    </div>
  );
}