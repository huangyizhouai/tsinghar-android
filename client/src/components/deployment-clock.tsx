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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    try {
      const options: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: !format24,
        timeZone: 'Asia/Shanghai', // Ensure consistent timezone
      };

      if (showSeconds) {
        options.second = '2-digit';
      }

      return date.toLocaleTimeString('zh-CN', options);
    } catch (error) {
      // Fallback formatting
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
    }
  };

  const formatDate = (date: Date) => {
    try {
      return date.toLocaleDateString('zh-CN', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        timeZone: 'Asia/Shanghai',
      });
    } catch (error) {
      // Fallback formatting
      const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
      const months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
      return `${weekdays[date.getDay()]} ${months[date.getMonth()]}${date.getDate()}日`;
    }
  };

  // Don't render until mounted to avoid hydration issues
  if (!mounted) {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <Clock className="h-4 w-4 text-text-secondary" />
        <div className="flex flex-col text-right">
          <span className="text-sm font-medium text-text-primary">--:--</span>
          <span className="text-xs text-text-secondary">加载中...</span>
        </div>
      </div>
    );
  }

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