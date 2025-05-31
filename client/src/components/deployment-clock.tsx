import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface DeploymentClockProps {
  className?: string;
  showSeconds?: boolean;
  format24?: boolean;
}

export default function DeploymentClock({ 
  className = '', 
  showSeconds = true, 
  format24 = false 
}: DeploymentClockProps) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: !format24,
    };

    if (showSeconds) {
      options.second = '2-digit';
    }

    return date.toLocaleTimeString([], options);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString([], {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <Clock className="h-4 w-4 text-text-secondary" />
      <div className="flex flex-col text-right">
        <span className="text-sm font-medium text-text-primary">
          {formatTime(currentTime)}
        </span>
        <span className="text-xs text-text-secondary">
          {formatDate(currentTime)}
        </span>
      </div>
    </div>
  );
}