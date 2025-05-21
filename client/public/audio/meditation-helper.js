// This file helps generate meditation sounds on demand

// Ambient background sound (for playing directly)
const createAmbientSound = (duration = 60) => {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(196, audioContext.currentTime); // G3 note
  
  // Lower volume
  gainNode.gain.setValueAtTime(0.08, audioContext.currentTime);
  
  // Connect nodes
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  // Start and schedule stop
  oscillator.start();
  oscillator.stop(audioContext.currentTime + duration);
  
  return audioContext;
};

// Play a meditation bell sound
const playBell = (audioContext, time = 0) => {
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.type = 'sine';
  oscillator.frequency.value = 440; // A4 note
  
  gainNode.gain.setValueAtTime(0.5, audioContext.currentTime + time);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + time + 2);
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.start(audioContext.currentTime + time);
  oscillator.stop(audioContext.currentTime + time + 2);
};

// Create a guided breathing track
// breathPattern: Array of [inhale, hold, exhale, hold] durations in seconds
const createGuidedBreathing = (duration = 300, breathPattern = [4, 4, 4, 4]) => {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  
  // Background ambient drone
  const drone = audioContext.createOscillator();
  const droneGain = audioContext.createGain();
  
  drone.type = 'sine';
  drone.frequency.value = 196; // G3
  droneGain.gain.setValueAtTime(0.04, audioContext.currentTime);
  
  drone.connect(droneGain);
  droneGain.connect(audioContext.destination);
  
  drone.start();
  drone.stop(audioContext.currentTime + duration);
  
  // Schedule breath markers
  let currentTime = 0;
  while (currentTime < duration) {
    // Inhale sound (rising tone)
    const inhaleOsc = audioContext.createOscillator();
    const inhaleGain = audioContext.createGain();
    
    inhaleOsc.frequency.setValueAtTime(330, audioContext.currentTime + currentTime);
    inhaleOsc.frequency.linearRampToValueAtTime(440, audioContext.currentTime + currentTime + breathPattern[0]);
    
    inhaleGain.gain.setValueAtTime(0.1, audioContext.currentTime + currentTime);
    inhaleGain.gain.linearRampToValueAtTime(0.15, audioContext.currentTime + currentTime + breathPattern[0]);
    inhaleGain.gain.setValueAtTime(0.15, audioContext.currentTime + currentTime + breathPattern[0]);
    inhaleGain.gain.linearRampToValueAtTime(0.01, audioContext.currentTime + currentTime + breathPattern[0] + 0.2);
    
    inhaleOsc.connect(inhaleGain);
    inhaleGain.connect(audioContext.destination);
    
    inhaleOsc.start(audioContext.currentTime + currentTime);
    inhaleOsc.stop(audioContext.currentTime + currentTime + breathPattern[0] + 0.2);
    
    currentTime += breathPattern[0]; // Inhale duration
    
    // First hold
    if (breathPattern[1] > 0) {
      playBell(audioContext, currentTime);
      currentTime += breathPattern[1];
    }
    
    // Exhale sound (falling tone)
    const exhaleOsc = audioContext.createOscillator();
    const exhaleGain = audioContext.createGain();
    
    exhaleOsc.frequency.setValueAtTime(440, audioContext.currentTime + currentTime);
    exhaleOsc.frequency.linearRampToValueAtTime(330, audioContext.currentTime + currentTime + breathPattern[2]);
    
    exhaleGain.gain.setValueAtTime(0.15, audioContext.currentTime + currentTime);
    exhaleGain.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + currentTime + breathPattern[2]);
    exhaleGain.gain.setValueAtTime(0.1, audioContext.currentTime + currentTime + breathPattern[2]);
    exhaleGain.gain.linearRampToValueAtTime(0.01, audioContext.currentTime + currentTime + breathPattern[2] + 0.2);
    
    exhaleOsc.connect(exhaleGain);
    exhaleGain.connect(audioContext.destination);
    
    exhaleOsc.start(audioContext.currentTime + currentTime);
    exhaleOsc.stop(audioContext.currentTime + currentTime + breathPattern[2] + 0.2);
    
    currentTime += breathPattern[2]; // Exhale duration
    
    // Second hold
    if (breathPattern[3] > 0) {
      currentTime += breathPattern[3];
    }
  }
  
  return audioContext;
};

window.MeditationHelper = {
  createAmbientSound,
  playBell,
  createGuidedBreathing
};