import { useState, useEffect } from 'react';

interface ProgressRingProps {
  days: number;
  onClick?: () => void;
}

export default function ProgressRing({ days, onClick }: ProgressRingProps) {
  const [secondsElapsed, setSecondsElapsed] = useState(0);

  // Calculate seconds elapsed based on days
  useEffect(() => {
    const startTime = new Date().getTime() - (days * 24 * 60 * 60 * 1000);
    
    const updateTimer = () => {
      const elapsedSeconds = Math.floor((new Date().getTime() - startTime) / 1000);
      setSecondsElapsed(elapsedSeconds);
    };
    
    // Initial update
    updateTimer();
    
    // Update timer every second
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [days]);

  const hours = Math.floor((secondsElapsed % (24 * 3600)) / 3600);
  const minutes = Math.floor((secondsElapsed % 3600) / 60);
  const seconds = secondsElapsed % 60;

  // Define milestone stages (day targets)
  const milestones = [
    { name: 'Seed', days: 1 },
    { name: 'Sprout', days: 3 },
    { name: 'Pioneer', days: 7 },
    { name: 'Momentum', days: 14 },
    { name: 'Master', days: 30 },
    { name: 'Champion', days: 90 }
  ];

  // Find current milestone
  const currentMilestone = milestones.find(m => days < m.days) || milestones[milestones.length - 1];
  const previousMilestone = milestones.findIndex(m => m.name === currentMilestone.name) > 0 
    ? milestones[milestones.findIndex(m => m.name === currentMilestone.name) - 1] 
    : { name: 'Start', days: 0 };
  
  // Calculate progress towards next milestone
  const progressInCurrentStage = days - previousMilestone.days;
  const totalDaysInCurrentStage = currentMilestone.days - previousMilestone.days;
  const percentage = Math.min((progressInCurrentStage / totalDaysInCurrentStage) * 100, 100);

  // SVG circle calculations
  const size = 160;
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (circumference * percentage) / 100;

  return (
    <button 
      onClick={onClick}
      className="relative flex items-center justify-center w-[160px] h-[160px]
               hover:scale-105 transition-transform duration-300"
      aria-label="View milestones"
    >
      <svg 
        className="w-full h-full -rotate-90" 
        viewBox={`0 0 ${size} ${size}`} 
        role="progressbar"
        aria-valuemin={0} 
        aria-valuemax={100} 
        aria-valuenow={percentage}
      >
        {/* Background circle */}
        <circle
          className="text-background-card"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size/2}
          cy={size/2}
        />
        {/* Animated progress circle */}
        <circle
          className="text-primary transition-all ease-out duration-1000"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size/2}
          cy={size/2}
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
        />
      </svg>
      
      {/* Time text overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-text-primary">
          {days}
        </span>
        <span className="text-sm text-text-secondary">Days</span>
        <span className="text-xs text-primary mt-1 font-semibold">{currentMilestone.name}</span>
        <div className="text-xs text-text-secondary mt-1">
          {hours.toString().padStart(2, '0')}:{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
        </div>
      </div>
    </button>
  );
}