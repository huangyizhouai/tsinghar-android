import React from "react";
import { useLanguage } from "@/hooks/use-language";

interface CategoryButtonProps {
  title: string;
  color: string;
  icon: React.ReactNode;
  onClick: () => void;
}

function CategoryButton({ title, color, icon, onClick }: CategoryButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex-1 flex flex-col items-center p-3 rounded-xl transition-transform hover:scale-105"
      style={{ backgroundColor: color }}
    >
      <div className="mb-2">{icon}</div>
      <span className="text-white font-medium">{title}</span>
    </button>
  );
}

interface CategoryButtonsProps {
  onSelectCategory: (category: string) => void;
}

export default function CategoryButtons({ onSelectCategory }: CategoryButtonsProps) {
  const { t } = useLanguage();
  
  const categories = [
    {
      id: "articles",
      title: t('articlesTitle'),
      color: "#FF7043", // Orange
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1M19 20a2 2 0 002-2V8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2h8z" />
            </svg>
    },
    {
      id: "meditate",
      title: t('meditateTitle'),
      color: "#7C4DFF", // Purple
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
    },
    {
      id: "learn",
      title: t('learnTitle'),
      color: "#E91E63", // Pink
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M12 14l9-5-9-5-9 5 9 5z" />
              <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
            </svg>
    },
    {
      id: "podcast",
      title: t('podcastTitle'),
      color: "#039BE5", // Blue
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
    }
  ];

  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      {categories.map(category => (
        <CategoryButton
          key={category.id}
          title={category.title}
          color={category.color}
          icon={category.icon}
          onClick={() => onSelectCategory(category.id)}
        />
      ))}
    </div>
  );
}