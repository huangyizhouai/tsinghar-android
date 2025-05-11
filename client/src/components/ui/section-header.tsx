import React, { ReactNode } from "react";

type SectionHeaderProps = {
  title: string;
  children?: ReactNode;
};

export default function SectionHeader({ title, children }: SectionHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="font-bold text-2xl text-text-primary">{title}</h1>
      {children}
    </div>
  );
}
