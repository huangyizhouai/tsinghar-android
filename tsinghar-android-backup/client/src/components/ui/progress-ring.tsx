import React, { ReactNode } from "react";

type ProgressRingProps = {
  value: number; // 0 to 100
  size: number;
  strokeWidth: number;
  strokeColor: string;
  bgStrokeColor: string;
  children?: ReactNode;
};

export default function ProgressRing({
  value,
  size,
  strokeWidth,
  strokeColor,
  bgStrokeColor,
  children
}: ProgressRingProps) {
  // Calculate dimensions
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="progress-ring" width={size} height={size}>
        {/* Background circle */}
        <circle
          className="progress-ring-circle"
          stroke={bgStrokeColor}
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        
        {/* Progress circle */}
        <circle
          className="progress-ring-circle"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          style={{ transition: "stroke-dashoffset 0.5s" }}
        />
      </svg>
      
      {/* Content inside the ring */}
      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}
