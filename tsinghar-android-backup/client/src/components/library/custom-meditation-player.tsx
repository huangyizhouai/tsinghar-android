import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, Play, Pause, Info } from 'lucide-react';
import { MeditationTrack } from '@/lib/data';
import { useLanguage } from '@/hooks/use-language';

interface CustomMeditationPlayerProps {
  track: MeditationTrack;
  onBack: () => void;
  onShowInfo: () => void;
}

export default function CustomMeditationPlayer({ track, onBack, onShowInfo }: CustomMeditationPlayerProps) {
  const { t, language } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    return () => {
      cleanup();
    };
  }, []);

  const updateTime = () => {
    if (startTimeRef.current) {
      const elapsed = (Date.now() - startTimeRef.current) / 1000;
      if (elapsed >= track.duration) {
        stopAudio();
        setCurrentTime(track.duration);
      } else {
        setCurrentTime(elapsed);
      }
    }
  };

  const cleanup = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    stopAudio();
  };
  
  // Mindfulness & Focus Category
  const createMindfulAwarenessMeditation = (audioContext: AudioContext, startTime: number, duration: number) => {
    // Natural breathing pattern: 5-3-5-2
    const breathPattern = [5, 3, 5, 2];
    const cycleTime = breathPattern.reduce((a, b) => a + b, 0);
    const cycles = Math.floor(duration / cycleTime);
    
    // Clear, focused tone
    const fundamental = audioContext.createOscillator();
    const fundamentalGain = audioContext.createGain();
    
    fundamental.type = 'sine';
    fundamental.frequency.value = 528; // Love frequency - healing and awareness
    fundamentalGain.gain.setValueAtTime(0.06, startTime);
    
    fundamental.connect(fundamentalGain);
    fundamentalGain.connect(audioContext.destination);
    
    fundamental.start(startTime);
    fundamental.stop(startTime + duration);
    
    // Mindfulness bell sounds every 30 seconds
    for (let i = 0; i < duration / 30; i++) {
      addBellSound(audioContext, startTime + (i * 30), 2);
    }
    
    // Add mindful breath cues
    for (let i = 0; i < cycles; i++) {
      let currentTime = startTime + (i * cycleTime);
      
      addBreathCue(audioContext, currentTime, breathPattern[0], 'inhale', 0.08);
      currentTime += breathPattern[0] + breathPattern[1];
      addBreathCue(audioContext, currentTime, breathPattern[2], 'exhale', 0.08);
    }
  };

  // Stress Relief & Relaxation Category
  const createStressReliefMeditation = (audioContext: AudioContext, startTime: number, duration: number) => {
    // Progressive relaxation breathing: 6-2-8-2
    const breathPattern = [6, 2, 8, 2];
    const cycleTime = breathPattern.reduce((a, b) => a + b, 0);
    const cycles = Math.floor(duration / cycleTime);
    
    // Warm, soothing base frequency
    const base = audioContext.createOscillator();
    const baseGain = audioContext.createGain();
    
    base.type = 'sine';
    base.frequency.value = 174; // Pain relief frequency
    baseGain.gain.setValueAtTime(0.08, startTime);
    
    base.connect(baseGain);
    baseGain.connect(audioContext.destination);
    
    base.start(startTime);
    base.stop(startTime + duration);
    
    // Harmonious overtone
    const overtone = audioContext.createOscillator();
    const overtoneGain = audioContext.createGain();
    
    overtone.type = 'sine';
    overtone.frequency.value = 285; // Natural healing frequency
    overtoneGain.gain.setValueAtTime(0.04, startTime);
    
    overtone.connect(overtoneGain);
    overtoneGain.connect(audioContext.destination);
    
    overtone.start(startTime);
    overtone.stop(startTime + duration);
    
    // Add relaxing breath cues
    for (let i = 0; i < cycles; i++) {
      let currentTime = startTime + (i * cycleTime);
      
      addBreathCue(audioContext, currentTime, breathPattern[0], 'inhale', 0.06);
      currentTime += breathPattern[0] + breathPattern[1];
      addBreathCue(audioContext, currentTime, breathPattern[2], 'exhale', 0.06);
    }
  };

  const createInnerPeaceMeditation = (audioContext: AudioContext, startTime: number, duration: number) => {
    // Peaceful breathing: 7-3-7-3
    const breathPattern = [7, 3, 7, 3];
    const cycleTime = breathPattern.reduce((a, b) => a + b, 0);
    const cycles = Math.floor(duration / cycleTime);
    
    // Peaceful drone
    const peace = audioContext.createOscillator();
    const peaceGain = audioContext.createGain();
    
    peace.type = 'sine';
    peace.frequency.value = 432; // Natural tuning - peace and harmony
    peaceGain.gain.setValueAtTime(0.07, startTime);
    
    peace.connect(peaceGain);
    peaceGain.connect(audioContext.destination);
    
    peace.start(startTime);
    peace.stop(startTime + duration);
    
    // Gentle harmonic
    const harmonic = audioContext.createOscillator();
    const harmonicGain = audioContext.createGain();
    
    harmonic.type = 'sine';
    harmonic.frequency.value = 864; // Harmonic of 432Hz
    harmonicGain.gain.setValueAtTime(0.03, startTime);
    
    harmonic.connect(harmonicGain);
    harmonicGain.connect(audioContext.destination);
    
    harmonic.start(startTime);
    harmonic.stop(startTime + duration);
    
    // Peace bells every minute
    for (let i = 0; i < duration / 60; i++) {
      addBellSound(audioContext, startTime + (i * 60), 3);
    }
  };

  // Recovery & Motivation Category
  const createMotivationBoostMeditation = (audioContext: AudioContext, startTime: number, duration: number) => {
    // Energizing breathing: 4-2-4-2 (faster tempo)
    const breathPattern = [4, 2, 4, 2];
    const cycleTime = breathPattern.reduce((a, b) => a + b, 0);
    const cycles = Math.floor(duration / cycleTime);
    
    // Energizing frequency
    const energy = audioContext.createOscillator();
    const energyGain = audioContext.createGain();
    
    energy.type = 'sine';
    energy.frequency.value = 741; // Awakening intuition and expression
    energyGain.gain.setValueAtTime(0.08, startTime);
    
    energy.connect(energyGain);
    energyGain.connect(audioContext.destination);
    
    energy.start(startTime);
    energy.stop(startTime + duration);
    
    // Motivational harmonic
    const motivation = audioContext.createOscillator();
    const motivationGain = audioContext.createGain();
    
    motivation.type = 'sine';
    motivation.frequency.value = 852; // Return to spiritual order
    motivationGain.gain.setValueAtTime(0.04, startTime);
    
    motivation.connect(motivationGain);
    motivationGain.connect(audioContext.destination);
    
    motivation.start(startTime);
    motivation.stop(startTime + duration);
    
    // Uplifting bell progression
    for (let i = 0; i < cycles; i++) {
      if (i % 10 === 0) { // Every 10th cycle
        addBellSound(audioContext, startTime + (i * cycleTime), 1.5);
      }
    }
  };

  // Sleep & Recovery Category
  const createBodyScanMeditation = (audioContext: AudioContext, startTime: number, duration: number) => {
    // Slow body scan breathing: 8-4-8-4
    const breathPattern = [8, 4, 8, 4];
    const cycleTime = breathPattern.reduce((a, b) => a + b, 0);
    const cycles = Math.floor(duration / cycleTime);
    
    // Deep relaxation frequency
    const relaxation = audioContext.createOscillator();
    const relaxationGain = audioContext.createGain();
    
    relaxation.type = 'sine';
    relaxation.frequency.value = 110; // Deep body awareness frequency
    relaxationGain.gain.setValueAtTime(0.1, startTime);
    
    relaxation.connect(relaxationGain);
    relaxationGain.connect(audioContext.destination);
    
    relaxation.start(startTime);
    relaxation.stop(startTime + duration);
    
    // Body awareness harmonic
    const awareness = audioContext.createOscillator();
    const awarenessGain = audioContext.createGain();
    
    awareness.type = 'sine';
    awareness.frequency.value = 220; // Harmonic for body scanning
    awarenessGain.gain.setValueAtTime(0.05, startTime);
    
    awareness.connect(awarenessGain);
    awarenessGain.connect(audioContext.destination);
    
    awareness.start(startTime);
    awareness.stop(startTime + duration);
  };

  const createBreathingMeditation = (audioContext: AudioContext, duration: number) => {
    const startTime = audioContext.currentTime;
    
    // Create meditation sounds based on track ID/type
    switch (track.id) {
      // Mindfulness & Focus Category
      case 'mindful-awareness':
        createMindfulAwarenessMeditation(audioContext, startTime, duration);
        break;
      case 'focused-breathing':
        createCalmnessBreathing(audioContext, startTime, duration);
        break;
      
      // Stress Relief & Relaxation Category  
      case 'stress-relief':
        createStressReliefMeditation(audioContext, startTime, duration);
        break;
      case 'inner-peace':
        createInnerPeaceMeditation(audioContext, startTime, duration);
        break;
      
      // Recovery & Motivation Category
      case 'urge-control':
        createUrgeControlMeditation(audioContext, startTime, duration);
        break;
      case 'motivation-boost':
        createMotivationBoostMeditation(audioContext, startTime, duration);
        break;
      
      // Sleep & Recovery Category
      case 'deep-sleep':
        createDeepSleepMeditation(audioContext, startTime, duration);
        break;
      case 'body-scan':
        createBodyScanMeditation(audioContext, startTime, duration);
        break;
      
      default:
        createCalmnessBreathing(audioContext, startTime, duration);
        break;
    }
  };
  
  const createCalmnessBreathing = (audioContext: AudioContext, startTime: number, duration: number) => {
    // Box breathing pattern: 4-4-4-4
    const breathPattern = [4, 4, 4, 4];
    const cycleTime = breathPattern.reduce((a, b) => a + b, 0);
    const cycles = Math.floor(duration / cycleTime);
    
    // Background drone
    const drone = audioContext.createOscillator();
    const droneGain = audioContext.createGain();
    
    drone.type = 'sine';
    drone.frequency.value = 396; // Earth frequency (grounding)
    droneGain.gain.setValueAtTime(0.07, startTime);
    
    drone.connect(droneGain);
    droneGain.connect(audioContext.destination);
    
    drone.start(startTime);
    drone.stop(startTime + duration);
    
    // Add breath cues
    for (let i = 0; i < cycles; i++) {
      let currentTime = startTime + (i * cycleTime);
      
      // Inhale cue (rising tone)
      addBreathCue(audioContext, currentTime, breathPattern[0], 'inhale');
      currentTime += breathPattern[0];
      
      // Hold (pause tone)
      addHoldTone(audioContext, currentTime, breathPattern[1]);
      currentTime += breathPattern[1];
      
      // Exhale cue (falling tone)
      addBreathCue(audioContext, currentTime, breathPattern[2], 'exhale');
      currentTime += breathPattern[2];
      
      // Hold (pause tone)
      addHoldTone(audioContext, currentTime, breathPattern[3]);
    }
  };
  
  const createUrgeControlMeditation = (audioContext: AudioContext, startTime: number, duration: number) => {
    // 4-7-8 breathing pattern for urge control
    const breathPattern = [4, 7, 8];
    const cycleTime = breathPattern.reduce((a, b) => a + b, 0);
    const cycles = Math.floor(duration / cycleTime);
    
    // Grounding base frequency
    const ground = audioContext.createOscillator();
    const groundGain = audioContext.createGain();
    
    ground.type = 'sine';
    ground.frequency.value = 256; // Stable, grounding frequency
    groundGain.gain.setValueAtTime(0.08, startTime);
    
    ground.connect(groundGain);
    groundGain.connect(audioContext.destination);
    
    ground.start(startTime);
    ground.stop(startTime + duration);
    
    // Strengthening harmonic
    const strength = audioContext.createOscillator();
    const strengthGain = audioContext.createGain();
    
    strength.type = 'sine';
    strength.frequency.value = 512; // Harmonic for mental strength
    strengthGain.gain.setValueAtTime(0.04, startTime);
    
    strength.connect(strengthGain);
    strengthGain.connect(audioContext.destination);
    
    strength.start(startTime);
    strength.stop(startTime + duration);
    
    // Add control-focused breath cues
    for (let i = 0; i < cycles; i++) {
      let currentTime = startTime + (i * cycleTime);
      
      // Inhale for 4
      addBreathCue(audioContext, currentTime, breathPattern[0], 'inhale', 0.1);
      currentTime += breathPattern[0];
      
      // Hold for 7
      addHoldTone(audioContext, currentTime, breathPattern[1], 0.08);
      currentTime += breathPattern[1];
      
      // Exhale for 8
      addBreathCue(audioContext, currentTime, breathPattern[2], 'exhale', 0.1);
    }
  };

  const createGratitudeMeditation = (audioContext: AudioContext, startTime: number, duration: number) => {
    // Gentle, heart-opening breathing: 6-2-6-2
    const breathPattern = [6, 2, 6, 2];
    const cycleTime = breathPattern.reduce((a, b) => a + b, 0);
    const cycles = Math.floor(duration / cycleTime);
    
    // Heart frequency
    const heart = audioContext.createOscillator();
    const heartGain = audioContext.createGain();
    
    heart.type = 'sine';
    heart.frequency.value = 341.3; // Heart chakra frequency
    heartGain.gain.setValueAtTime(0.07, startTime);
    
    heart.connect(heartGain);
    heartGain.connect(audioContext.destination);
    
    heart.start(startTime);
    heart.stop(startTime + duration);
    
    // Gratitude bells
    for (let i = 0; i < cycles; i++) {
      if (i % 5 === 0) {
        addBellSound(audioContext, startTime + (i * cycleTime), 1.5);
      }
    }
  };

  const createDeepSleepMeditation = (audioContext: AudioContext, startTime: number, duration: number) => {
    // Slow, deep breathing pattern: 4-8
    const breathPattern = [4, 0, 8, 0];
    const cycleTime = breathPattern.reduce((a, b) => a + b, 0);
    const cycles = Math.floor(duration / cycleTime);
    
    // Very low, calming drone
    const drone = audioContext.createOscillator();
    const droneGain = audioContext.createGain();
    
    drone.type = 'sine';
    drone.frequency.value = 256; // Very calming frequency
    droneGain.gain.setValueAtTime(0.1, startTime);
    
    drone.connect(droneGain);
    droneGain.connect(audioContext.destination);
    
    drone.start(startTime);
    drone.stop(startTime + duration);
    
    // Soft harmonics
    const soft = audioContext.createOscillator();
    const softGain = audioContext.createGain();
    
    soft.type = 'sine';
    soft.frequency.value = 128; // Even lower frequency
    softGain.gain.setValueAtTime(0.04, startTime);
    
    soft.connect(softGain);
    softGain.connect(audioContext.destination);
    
    soft.start(startTime);
    soft.stop(startTime + duration);
    
    // Add very gentle breath cues
    for (let i = 0; i < cycles; i++) {
      let currentTime = startTime + (i * cycleTime);
      
      // Gentle inhale
      addBreathCue(audioContext, currentTime, breathPattern[0], 'inhale', 0.05);
      currentTime += breathPattern[0];
      
      // Long, gentle exhale
      addBreathCue(audioContext, currentTime, breathPattern[2], 'exhale', 0.05);
    }
    
    // Very soft fade out
    droneGain.gain.setValueAtTime(0.1, startTime + duration - 10);
    droneGain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
    
    softGain.gain.setValueAtTime(0.04, startTime + duration - 10);
    softGain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
  };
  
  // Helper functions for creating sounds
  const addBreathCue = (ctx: AudioContext, startTime: number, duration: number, type: 'inhale' | 'exhale', volume = 0.1) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    if (type === 'inhale') {
      osc.frequency.setValueAtTime(200, startTime);
      osc.frequency.linearRampToValueAtTime(400, startTime + duration);
    } else {
      osc.frequency.setValueAtTime(400, startTime);
      osc.frequency.linearRampToValueAtTime(200, startTime + duration);
    }
    
    osc.type = 'sine';
    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(volume, startTime + 0.5);
    gain.gain.linearRampToValueAtTime(0, startTime + duration);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start(startTime);
    osc.stop(startTime + duration);
  };
  
  const addHoldTone = (ctx: AudioContext, time: number, duration: number, volume = 0.1) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.frequency.value = 300;
    osc.type = 'sine';
    gain.gain.setValueAtTime(volume * 0.3, time);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start(time);
    osc.stop(time + duration);
  };
  
  const addBellSound = (ctx: AudioContext, time: number, duration: number, volume = 0.2) => {
    const bell = ctx.createOscillator();
    const bellGain = ctx.createGain();
    
    bell.frequency.value = 528;
    bellGain.gain.setValueAtTime(0, time);
    bellGain.gain.linearRampToValueAtTime(volume, time + 0.1);
    bellGain.gain.exponentialRampToValueAtTime(0.001, time + duration);
    
    bell.connect(bellGain);
    bellGain.connect(ctx.destination);
    
    bell.start(time);
    bell.stop(time + duration);
  };
  
  const handlePlay = () => {
    if (isPlaying) {
      stopAudio();
      return;
    }
    
    try {
      // Create audio context if it doesn't exist
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContext();
        
        // Generate meditation audio
        createBreathingMeditation(
          audioContextRef.current, 
          track.duration
        );
      }
      
      // Start time tracking
      startTimeRef.current = Date.now() - (currentTime * 1000);
      timerRef.current = window.setInterval(updateTime, 100);
      
      setIsPlaying(true);
    } catch (error) {
      console.error('Error creating audio:', error);
    }
  };
  
  const stopAudio = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    
    setIsPlaying(false);
  };
  
  const togglePlayPause = () => {
    handlePlay();
  };
  
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex flex-col" 
      style={{ backgroundColor: track.color }}
    >
      {/* Header */}
      <div className="flex justify-between items-center p-4">
        <button onClick={() => {
          stopAudio();
          onBack();
        }} className="text-white">
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button onClick={onShowInfo} className="text-white">
          <Info className="h-6 w-6" />
        </button>
      </div>
      
      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <h1 className="text-2xl font-bold text-white mb-2">
          {language === 'en' && track.titleEn ? track.titleEn : track.title}
        </h1>
        <p className="text-white text-opacity-80 mb-6">
          {language === 'en' && track.subtitleEn ? track.subtitleEn : track.subtitle}
        </p>
        
        <div className="text-xl text-white mb-8">{formatTime(currentTime)}</div>
        
        {/* Play/Pause Button */}
        <button 
          onClick={togglePlayPause}
          className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-colors"
        >
          {isPlaying ? (
            <Pause className="h-10 w-10 text-white" />
          ) : (
            <Play className="h-10 w-10 text-white ml-1" />
          )}
        </button>
      </div>
      
      {/* Progress bar */}
      <div className="w-full h-1 bg-white bg-opacity-20">
        <div 
          className="h-full bg-white"
          style={{
            width: `${(currentTime / track.duration) * 100}%`
          }}
        ></div>
      </div>
    </div>
  );
};