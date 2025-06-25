import { ReactNode } from "react";
import { Link } from "wouter";

interface ToolCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  bgColor?: string;
  path: string;
}

export default function ToolCard({ icon, title, description, bgColor = "bg-background-card", path }: ToolCardProps) {
  return (
    <Link to={path}>
      <div className={`${bgColor} p-4 rounded-xl hover:scale-105 transition-transform cursor-pointer`}>
        <div className="flex flex-col items-center text-center">
          <div className="mb-2">{icon}</div>
          <h3 className="text-text-primary font-medium">{title}</h3>
          <p className="text-text-secondary text-sm">{description}</p>
        </div>
      </div>
    </Link>
  );
}