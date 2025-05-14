import { Link } from "wouter";
import { MessageCircle, TrendingUp } from "lucide-react";

export default function TodoCard() {
  return (
    <div className="bg-background-card p-4 rounded-xl shadow-lg space-y-4 mb-6">
      <h2 className="text-text-primary text-lg font-bold">To-do</h2>
      <ul className="space-y-3">
        <li>
          <Link href="/community">
            <button className="w-full flex items-center px-4 py-3 bg-primary hover:bg-primary-light text-white rounded-md transition-colors">
              <MessageCircle className="w-5 h-5 mr-3" />
              Join Community
            </button>
          </Link>
        </li>
        <li>
          <a 
            href="https://tiktok.com/@nofapapp" 
            className="w-full flex items-center px-4 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-md transition-colors"
            target="_blank" 
            rel="noopener noreferrer"
          >
            <TrendingUp className="w-5 h-5 mr-3" />
            Follow on TikTok
          </a>
        </li>
      </ul>
    </div>
  );
}