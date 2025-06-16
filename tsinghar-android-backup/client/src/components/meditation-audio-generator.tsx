import React, { useEffect, useRef } from 'react';

interface AudioGeneratorProps {
  type: 'breathing' | 'ambient' | 'urge-control' | 'gratitude';
  duration?: number; // seconds
  volumeLevel?: number; // 0-1
  autoPlay?: boolean;
}

const MeditationAudioGenerator: React.FC<AudioGeneratorProps> = ({
  type,
  duration = 300, // 5 minutes default
  volumeLevel = 0.4,
  autoPlay = false
}) => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const isPlayingRef = useRef(false);
  
  // Create different breathing patterns based on meditation type
  const getBreathPattern = () => {
    switch (type) {
      case 'breathing':
        return [4, 4, 4, 4]; // Standard box breathing
      case 'urge-control':
        return [4, 7, 8, 0]; // 4-7-8 breathing technique
      case 'gratitude':
        return [6, 2, 6, 0]; // Deeper breathing
      default:
        return [4, 0, 4, 0]; // Simple breath
    }
  };
  
  const playTone = (frequency: number, startTime: number, duration: number, volume: number) => {
    if (!audioContextRef.current) return;
    
    const osc = audioContextRef.current.createOscillator();
    const gain = audioContextRef.current.createGain();
    
    osc.frequency.value = frequency;
    gain.gain.value = volume;
    
    osc.connect(gain);
    gain.connect(audioContextRef.current.destination);
    
    osc.start(startTime);
    osc.stop(startTime + duration);
    
    // Fade out at the end
    gain.gain.setValueAtTime(volume, startTime + duration - 0.5);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
  };
  
  const createGuidedMeditation = () => {
    if (!audioContextRef.current) return;
    
    const ctx = audioContextRef.current;
    const startTime = ctx.currentTime;
    const breathPattern = getBreathPattern();
    const totalCycleTime = breathPattern.reduce((sum, val) => sum + val, 0);
    const cycles = Math.floor(duration / totalCycleTime);
    
    // Background ambient drone
    const drone = ctx.createOscillator();
    const droneGain = ctx.createGain();
    
    drone.type = 'sine';
    drone.frequency.value = type === 'gratitude' ? 432 : 396; // Frequencies associated with different states
    droneGain.gain.setValueAtTime(volumeLevel * 0.2, startTime);
    
    drone.connect(droneGain);
    droneGain.connect(ctx.destination);
    
    drone.start(startTime);
    drone.stop(startTime + duration);
    
    // Add voice guidance tones
    for (let i = 0; i < cycles; i++) {
      const cycleStartTime = startTime + i * totalCycleTime;
      let currentTime = cycleStartTime;
      
      // Inhale cue
      playTone(330, currentTime, 0.2, volumeLevel * 0.4);
      currentTime += breathPattern[0];
      
      // Hold cue (if needed)
      if (breathPattern[1] > 0) {
        playTone(440, currentTime, 0.2, volumeLevel * 0.3);
        currentTime += breathPattern[1];
      }
      
      // Exhale cue
      playTone(262, currentTime, 0.2, volumeLevel * 0.4);
      currentTime += breathPattern[2];
      
      // Second hold (if needed)
      if (breathPattern[3] > 0) {
        playTone(330, currentTime, 0.2, volumeLevel * 0.3);
      }
    }
    
    // Add completion bell at the end
    const bellTime = startTime + duration - 3;
    const bell = ctx.createOscillator();
    const bellGain = ctx.createGain();
    
    bell.frequency.value = 528; // C note (healing frequency)
    bellGain.gain.setValueAtTime(0, bellTime);
    bellGain.gain.linearRampToValueAtTime(volumeLevel * 0.6, bellTime + 0.1);
    bellGain.gain.exponentialRampToValueAtTime(0.001, bellTime + 3);
    
    bell.connect(bellGain);
    bellGain.connect(ctx.destination);
    
    bell.start(bellTime);
    bell.stop(bellTime + 3);
  };
  
  const createAmbientSound = () => {
    if (!audioContextRef.current) return;
    
    const ctx = audioContextRef.current;
    const startTime = ctx.currentTime;
    
    // Base frequency depending on meditation type
    const baseFreq = type === 'breathing' ? 396 : 
                   type === 'urge-control' ? 528 : 
                   type === 'gratitude' ? 432 : 417;
    
    // Main drone
    const drone = ctx.createOscillator();
    const droneGain = ctx.createGain();
    
    drone.type = 'sine';
    drone.frequency.value = baseFreq;
    droneGain.gain.setValueAtTime(volumeLevel * 0.3, startTime);
    
    drone.connect(droneGain);
    droneGain.connect(ctx.destination);
    
    drone.start(startTime);
    drone.stop(startTime + duration);
    
    // Secondary harmonic
    const harmonic = ctx.createOscillator();
    const harmonicGain = ctx.createGain();
    
    harmonic.type = 'sine';
    harmonic.frequency.value = baseFreq * 1.5; // Perfect fifth
    harmonicGain.gain.setValueAtTime(volumeLevel * 0.15, startTime);
    
    harmonic.connect(harmonicGain);
    harmonicGain.connect(ctx.destination);
    
    harmonic.start(startTime);
    harmonic.stop(startTime + duration);
    
    // Add gentle pulses every few seconds
    for (let i = 10; i < duration; i += 15) {
      const pulseTime = startTime + i;
      const pulse = ctx.createOscillator();
      const pulseGain = ctx.createGain();
      
      pulse.frequency.value = baseFreq * 2;
      pulseGain.gain.setValueAtTime(0, pulseTime);
      pulseGain.gain.linearRampToValueAtTime(volumeLevel * 0.2, pulseTime + 1);
      pulseGain.gain.exponentialRampToValueAtTime(0.001, pulseTime + 4);
      
      pulse.connect(pulseGain);
      pulseGain.connect(ctx.destination);
      
      pulse.start(pulseTime);
      pulse.stop(pulseTime + 4);
    }
  };
  
  const startAudio = () => {
    if (isPlayingRef.current) return;
    
    try {
      // Create audio context
      audioContextRef.current = new AudioContext();
      
      if (type === 'ambient') {
        createAmbientSound();
      } else {
        createGuidedMeditation();
      }
      
      isPlayingRef.current = true;
    } catch (error) {
      console.error('Error creating audio:', error);
    }
  };
  
  const stopAudio = () => {
    if (audioContextRef.current && isPlayingRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
      isPlayingRef.current = false;
    }
  };
  
  useEffect(() => {
    if (autoPlay) {
      startAudio();
    }
    
    return () => {
      stopAudio();
    };
  }, [type, duration, volumeLevel, autoPlay]);
  
  return (
    <div className="hidden">
      {/* This component doesn't render anything visible */}
    </div>
  );
};

export default MeditationAudioGenerator;