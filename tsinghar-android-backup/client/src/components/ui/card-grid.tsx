import React, { ReactNode } from "react";
import { Link } from "wouter";
import { cn } from "@/lib/utils";

type CardItem = {
  icon: ReactNode;
  bgColor?: string;
  title: string;
  description: string;
  path: string;
};

type CardGridProps = {
  items: CardItem[];
  className?: string;
};

export default function CardGrid({ items, className }: CardGridProps) {
  return (
    <div className={cn("grid grid-cols-2 gap-4", className)}>
      {items.map((item, index) => (
        <Link key={index} to={item.path}>
          <div className="bg-background-card rounded-xl p-4 flex items-center cursor-pointer hover:bg-background-card/90 transition-colors">
            <div className={cn("p-2 rounded-lg mr-3", item.bgColor)}>
              {item.icon}
            </div>
            <div>
              <h3 className="font-medium text-text-primary">{item.title}</h3>
              <p className="text-xs text-text-secondary">{item.description}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
