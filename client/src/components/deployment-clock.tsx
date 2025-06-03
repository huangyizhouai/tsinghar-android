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
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    
    if (format24) {
      return showSeconds 
        ? `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
        : `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    } else {
      const period = hours >= 12 ? 'PM' : 'AM';
      const displayHours = hours % 12 || 12;
      return showSeconds 
        ? `${displayHours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${period}`
        : `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
    }
  };

  const formatDate = (date: Date) => {
    const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    const months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
    return `${weekdays[date.getDay()]} ${months[date.getMonth()]}${date.getDate()}日`;
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