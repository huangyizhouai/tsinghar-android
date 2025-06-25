import { useState, useEffect } from 'react';
import { motivationalQuotes } from '@/lib/data';

interface MotivationalQuoteProps {
  className?: string;
}

export default function MotivationalQuote({ className = '' }: MotivationalQuoteProps) {
  const [quote, setQuote] = useState<{ quote: string; author: string } | null>(null);
  
  // Get a random quote on component mount
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
    setQuote(motivationalQuotes[randomIndex]);
  }, []);
  
  if (!quote) return null;
  
  return (
    <div className={`p-4 rounded-lg bg-gradient-to-r from-purple-800/30 to-blue-900/20 backdrop-blur-sm ${className}`}>
      <blockquote className="text-lg font-medium text-white">
        "{quote.quote}"
      </blockquote>
      <p className="mt-2 text-sm text-white/80 text-right">
        — {quote.author}
      </p>
    </div>
  );
}