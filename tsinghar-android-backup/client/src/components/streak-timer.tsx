import React, { useState, useEffect } from "react";
import { formatTimeRemaining } from "@/lib/utils";
import ProgressRing from "@/components/ui/progress-ring";

type StreakTimerProps = {
  days: number;
};

export default function StreakTimer({ days }: StreakTimerProps) {
  const [timeString, setTimeString] = useState("00:00:00");
  const [progress, setProgress] = useState(25); // Value between 0-100
  
  // Calculate streak start date from days
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  
  useEffect(() => {
    // Update time every second
    const intervalId = setInterval(() => {
      setTimeString(formatTimeRemaining(startDate));
      
      // Update progress for visual effect (completes a full circle every day)
      const now = new Date();
      const secondsInDay = 86400;
      const secondsSinceMidnight = 
        now.getHours() * 3600 + 
        now.getMinutes() * 60 + 
        now.getSeconds();
      
      const progress = (secondsSinceMidnight / secondsInDay) * 100;
      setProgress(progress);
    }, 1000);
    
    return () => clearInterval(intervalId);
  }, [startDate]);

  return (
    <div className="circle-progress mb-2">
      <ProgressRing 
        value={progress} 
        size={240} 
        strokeWidth={8}
        strokeColor="#7C4DFF"
        bgStrokeColor="#262626"
      >
        <div className="flex flex-col items-center justify-center">
          <span className="font-bold text-4xl text-text-primary">{days}</span>
          <span className="text-xl text-text-secondary">{days === 1 ? "Day" : "Days"}</span>
          <div className="flex items-center mt-2 text-sm text-text-secondary">
            <span>{timeString}</span>
          </div>
        </div>
      </ProgressRing>
    </div>
  );
}
