import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/hooks/use-language";

export default function BreathingExercise() {
  const { t } = useLanguage();
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [instruction, setInstruction] = useState("");
  
  // Initialize instruction with translation
  useEffect(() => {
    setInstruction(t('breathingInstruction'));
  }, [t]);
  
  const startSession = () => {
    setIsSessionActive(true);
    
    // Simple breathing cycle
    let secondsElapsed = 0;
    const breathingInterval = setInterval(() => {
      secondsElapsed += 1;
      
      // Cycle of breathing in for 4s, holding for 4s, breathing out for 4s
      if (secondsElapsed % 12 === 0) {
        setInstruction(t('breatheIn'));
      } else if (secondsElapsed % 12 === 4) {
        setInstruction(t('hold'));
      } else if (secondsElapsed % 12 === 8) {
        setInstruction(t('breatheOut'));
      }
      
      // Stop the session after 2 minutes
      if (secondsElapsed >= 120) {
        clearInterval(breathingInterval);
        setIsSessionActive(false);
        setInstruction(t('breathingInstruction'));
      }
    }, 1000);
    
    // Save the interval ID for cleanup
    return () => clearInterval(breathingInterval);
  };

  return (
    <Card className="bg-background-card rounded-xl mb-6">
      <CardContent className="p-6">
        <h3 className="font-medium text-text-primary mb-4 text-center">{t('breathingExercise')}</h3>
        
        <div className="flex justify-center mb-4">
          <div className={`breathing-circle w-32 h-32 rounded-full bg-primary bg-opacity-20 flex items-center justify-center ${isSessionActive ? 'animate-pulse' : ''}`}>
            <div className="w-20 h-20 rounded-full bg-primary bg-opacity-40 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-primary"></div>
            </div>
          </div>
        </div>
        
        <p className="text-sm text-text-secondary text-center mb-4">
          {instruction}
        </p>
        
        <Button 
          onClick={startSession}
          disabled={isSessionActive} 
          className="w-full py-3 bg-primary hover:bg-primary-light rounded-lg font-medium text-white"
        >
          {isSessionActive ? t('sessionInProgress') : t('startGuidedSession')}
        </Button>
      </CardContent>
    </Card>
  );
}
