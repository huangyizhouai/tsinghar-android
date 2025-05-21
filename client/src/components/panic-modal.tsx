import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Zap, Heart, Play, AlertTriangle, XCircle } from "lucide-react";
import { Link } from "wouter";
import { useLanguage } from "@/hooks/use-language";
import { motivationalQuotes } from "@/lib/data";

type PanicModalProps = {
  onClose: () => void;
};

export default function PanicModal({ onClose }: PanicModalProps) {
  const { t } = useLanguage();
  const [emergencyMode, setEmergencyMode] = useState(true);
  const [holdProgress, setHoldProgress] = useState(0);
  const [flashState, setFlashState] = useState(true);
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);
  const holdTimeout = 3000; // 3 seconds to exit emergency mode
  const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
  
  // Flash effect for emergency mode
  useEffect(() => {
    if (!emergencyMode) return;
    
    const flashInterval = setInterval(() => {
      setFlashState(prev => !prev);
    }, 500);
    
    return () => clearInterval(flashInterval);
  }, [emergencyMode]);
  
  // Handle the long press to exit emergency mode
  const handleHoldStart = () => {
    if (longPressTimer.current) clearTimeout(longPressTimer.current);
    
    let progress = 0;
    const startTime = Date.now();
    
    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      progress = Math.min(100, (elapsed / holdTimeout) * 100);
      setHoldProgress(progress);
      
      if (progress < 100) {
        requestAnimationFrame(updateProgress);
      } else {
        setEmergencyMode(false);
      }
    };
    
    requestAnimationFrame(updateProgress);
  };
  
  const handleHoldEnd = () => {
    if (holdProgress < 100) {
      setHoldProgress(0);
    }
  };
  
  // If in emergency mode, show the flashing screen
  if (emergencyMode) {
    return (
      <div 
        className={`fixed inset-0 z-50 flex flex-col items-center justify-center p-4 transition-colors duration-200 ${
          flashState ? 'bg-red-600' : 'bg-black'
        }`}
        onMouseDown={handleHoldStart}
        onMouseUp={handleHoldEnd}
        onTouchStart={handleHoldStart}
        onTouchEnd={handleHoldEnd}
      >
        <div className="absolute top-4 right-4 text-sm text-white opacity-60">
          {t('holdToExit')}
        </div>
        
        <AlertTriangle 
          className={`w-20 h-20 mb-6 ${flashState ? 'text-white' : 'text-red-500'}`} 
        />
        
        <h1 
          className={`text-4xl font-bold mb-4 text-center ${flashState ? 'text-white' : 'text-red-500'}`}
        >
          {t('emergency')}
        </h1>
        
        <p 
          className={`text-xl font-semibold mb-8 text-center max-w-md ${flashState ? 'text-white' : 'text-red-500'}`}
        >
          {randomQuote}
        </p>
        
        <div 
          className={`text-xl font-medium text-center ${flashState ? 'text-white' : 'text-red-500'}`}
        >
          {t('breatheDeep')}
        </div>
        
        {/* Exit progress indicator */}
        {holdProgress > 0 && (
          <div className="fixed bottom-10 left-0 right-0 flex justify-center">
            <div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-green-500 transition-all duration-100" 
                style={{ width: `${holdProgress}%` }} 
              />
            </div>
          </div>
        )}
      </div>
    );
  }
  
  // Show normal panic modal when not in emergency mode
  return (
    <div className="fixed inset-0 bg-background-primary bg-opacity-90 z-50 flex items-center justify-center p-4">
      <Card className="bg-background-card rounded-xl w-full max-w-md">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-2xl text-text-primary">{t('stayStrong')}</h2>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={onClose}
              className="rounded-full h-8 w-8 p-0"
            >
              <XCircle className="h-5 w-5" />
            </Button>
          </div>
          
          <p className="text-text-secondary mb-6">
            {t('urgeTemporary')}
          </p>
          
          <div className="space-y-3 mb-6">
            <Link to="/menu">
              <Button className="w-full py-6 bg-background-secondary hover:bg-background-secondary/80 rounded-lg font-medium text-text-primary flex items-center justify-center">
                <Zap className="h-5 w-5 mr-2 text-info" />
                {t('startBreathing')}
              </Button>
            </Link>
            
            <Link to="/menu">
              <Button className="w-full py-6 bg-background-secondary hover:bg-background-secondary/80 rounded-lg font-medium text-text-primary flex items-center justify-center">
                <Heart className="h-5 w-5 mr-2 text-warning" />
                {t('viewReasons')}
              </Button>
            </Link>
            
            <Link to="/library">
              <Button className="w-full py-6 bg-background-secondary hover:bg-background-secondary/80 rounded-lg font-medium text-text-primary flex items-center justify-center">
                <Play className="h-5 w-5 mr-2 text-info" />
                {t('watchMotivational')}
              </Button>
            </Link>
          </div>
          
          <Button 
            onClick={onClose}
            className="w-full py-6 bg-primary hover:bg-primary-light rounded-lg font-medium text-white"
          >
            {t('feelingBetter')}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
