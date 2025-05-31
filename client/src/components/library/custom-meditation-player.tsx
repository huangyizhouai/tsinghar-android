import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, Info, Pause, Play } from "lucide-react";
import { MeditationTrack } from "@/lib/data";
import { useLanguage } from "@/hooks/use-language";

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
    // Setup time tracking
    startTimeRef.current = Date.now();
    
    // Start automatically
    handlePlay();
    
    // Cleanup function
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      stopAudio();
    };
  }, [track]);
  
  const updateTime = () => {
    if (!isPlaying) return;
    
    const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
    setCurrentTime(elapsed > track.duration ? track.duration : elapsed);
    
    if (elapsed >= track.duration) {
      handleEnd();
    }
  };
  
  const handleEnd = () => {
    setIsPlaying(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    stopAudio();
  };
  
  const createBreathingMeditation = (audioContext: AudioContext, duration: number) => {
    const startTime = audioContext.currentTime;
    
    // Create meditation sounds based on track ID/type
    switch (track.id) {
      case 'urge-control':
        createUrgeControlMeditation(audioContext, startTime, duration);
        break;
      case 'gratitude':
        createGratitudeMeditation(audioContext, startTime, duration);
        break;
      case 'deep-sleep':
        createDeepSleepMeditation(audioContext, startTime, duration);
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
      
      // Hold cue
      addHoldTone(audioContext, currentTime, 0.2, 0.1);
      currentTime += breathPattern[1];
      
      // Exhale cue (falling tone)
      addBreathCue(audioContext, currentTime, breathPattern[2], 'exhale');
      currentTime += breathPattern[2];
      
      // Second hold cue
      addHoldTone(audioContext, currentTime, 0.2, 0.1);
    }
    
    // Final bell
    addBellSound(audioContext, startTime + duration - 3, 3);
  };
  
  const createUrgeControlMeditation = (audioContext: AudioContext, startTime: number, duration: number) => {
    // 4-7-8 breathing pattern (anti-anxiety)
    const breathPattern = [4, 7, 8, 0];
    const cycleTime = breathPattern.reduce((a, b) => a + b, 0);
    const cycles = Math.floor(duration / cycleTime);
    
    // More intense background for urge control
    const drone = audioContext.createOscillator();
    const droneGain = audioContext.createGain();
    
    drone.type = 'sine';
    drone.frequency.value = 528; // Transformation frequency
    droneGain.gain.setValueAtTime(0.06, startTime);
    
    drone.connect(droneGain);
    droneGain.connect(audioContext.destination);
    
    drone.start(startTime);
    drone.stop(startTime + duration);
    
    // Secondary harmonic
    const harmonic = audioContext.createOscillator();
    const harmonicGain = audioContext.createGain();
    
    harmonic.type = 'sine';
    harmonic.frequency.value = 396; // Root chakra
    harmonicGain.gain.setValueAtTime(0.04, startTime);
    
    harmonic.connect(harmonicGain);
    harmonicGain.connect(audioContext.destination);
    
    harmonic.start(startTime);
    harmonic.stop(startTime + duration);
    
    // Add breath cues with longer holds
    for (let i = 0; i < cycles; i++) {
      let currentTime = startTime + (i * cycleTime);
      
      // Inhale cue (shorter)
      addBreathCue(audioContext, currentTime, breathPattern[0], 'inhale');
      currentTime += breathPattern[0];
      
      // Hold cue (longer)
      addHoldTone(audioContext, currentTime, 0.3, 0.15);
      currentTime += breathPattern[1];
      
      // Exhale cue (longest)
      addBreathCue(audioContext, currentTime, breathPattern[2], 'exhale');
    }
    
    // Final bell
    addBellSound(audioContext, startTime + duration - 3, 3);
  };
  
  const createGratitudeMeditation = (audioContext: AudioContext, startTime: number, duration: number) => {
    // 6-2-6 breathing pattern (balanced)
    const breathPattern = [6, 2, 6, 0];
    const cycleTime = breathPattern.reduce((a, b) => a + b, 0);
    const cycles = Math.floor(duration / cycleTime);
    
    // Warm, nurturing background
    const drone = audioContext.createOscillator();
    const droneGain = audioContext.createGain();
    
    drone.type = 'sine';
    drone.frequency.value = 432; // Natural tuning frequency
    droneGain.gain.setValueAtTime(0.06, startTime);
    
    drone.connect(droneGain);
    droneGain.connect(audioContext.destination);
    
    drone.start(startTime);
    drone.stop(startTime + duration);
    
    // Harmonic layer
    const harmonic = audioContext.createOscillator();
    const harmonicGain = audioContext.createGain();
    
    harmonic.type = 'sine';
    harmonic.frequency.value = 639; // Heart chakra frequency
    harmonicGain.gain.setValueAtTime(0.03, startTime);
    
    harmonic.connect(harmonicGain);
    harmonicGain.connect(audioContext.destination);
    
    harmonic.start(startTime);
    harmonic.stop(startTime + duration);
    
    // Add gentler breath cues
    for (let i = 0; i < cycles; i++) {
      let currentTime = startTime + (i * cycleTime);
      
      // Deep inhale
      addBreathCue(audioContext, currentTime, breathPattern[0], 'inhale', 0.08);
      currentTime += breathPattern[0];
      
      // Brief hold 
      addHoldTone(audioContext, currentTime, 0.2, 0.05);
      currentTime += breathPattern[1];
      
      // Long exhale
      addBreathCue(audioContext, currentTime, breathPattern[2], 'exhale', 0.08);
    }
    
    // Gentle completion bell
    addBellSound(audioContext, startTime + duration - 4, 4, 0.15);
  };
  
  const createDeepSleepMeditation = (audioContext: AudioContext, startTime: number, duration: number) => {
    // 4-0-8-0 breathing pattern (relaxation)
    const breathPattern = [4, 0, 8, 0];
    const cycleTime = breathPattern.reduce((a, b) => a + b, 0);
    const cycles = Math.floor(duration / cycleTime);
    
    // Deep, relaxing background
    const drone = audioContext.createOscillator();
    const droneGain = audioContext.createGain();
    const filter = audioContext.createBiquadFilter();
    
    filter.type = 'lowpass';
    filter.frequency.value = 600;
    
    drone.type = 'sine';
    drone.frequency.value = 174; // Low relaxing frequency
    droneGain.gain.setValueAtTime(0.1, startTime);
    
    drone.connect(droneGain);
    droneGain.connect(filter);
    filter.connect(audioContext.destination);
    
    drone.start(startTime);
    drone.stop(startTime + duration);
    
    // Additional soft layer
    const soft = audioContext.createOscillator();
    const softGain = audioContext.createGain();
    
    soft.type = 'sine';
    soft.frequency.value = 396;
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
      osc.frequency.setValueAtTime(330, startTime);
      osc.frequency.linearRampToValueAtTime(440, startTime + duration);
    } else {
      osc.frequency.setValueAtTime(440, startTime);
      osc.frequency.linearRampToValueAtTime(330, startTime + duration);
    }
    
    gain.gain.setValueAtTime(volume, startTime);
    gain.gain.setValueAtTime(volume, startTime + duration - 0.2);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start(startTime);
    osc.stop(startTime + duration);
  };
  
  const addHoldTone = (ctx: AudioContext, time: number, duration: number, volume = 0.1) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.frequency.value = 440;
    gain.gain.setValueAtTime(volume, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + duration);
    
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
    if (isPlaying) {
      stopAudio();
    } else {
      handlePlay();
    }
  };
  
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
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