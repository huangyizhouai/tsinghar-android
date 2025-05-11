import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, Info, Pause, Play } from "lucide-react";
import { MeditationTrack } from "@/lib/data";

interface MeditationPlayerProps {
  track: MeditationTrack;
  onBack: () => void;
  onShowInfo: () => void;
}

export default function MeditationPlayer({ track, onBack, onShowInfo }: MeditationPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    // Create audio element
    const audio = new Audio(track.audioUrl);
    audioRef.current = audio;
    
    // Set up event listeners
    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('ended', handleEnded);
    
    // Start playing
    audio.play().catch(err => {
      console.error("Could not play audio:", err);
      setIsPlaying(false);
    });
    
    // Cleanup
    return () => {
      if (audio) {
        audio.pause();
        audio.removeEventListener('timeupdate', updateTime);
        audio.removeEventListener('ended', handleEnded);
      }
    };
  }, [track]);
  
  const updateTime = () => {
    if (audioRef.current) {
      setCurrentTime(Math.floor(audioRef.current.currentTime));
    }
  };
  
  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };
  
  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(console.error);
      }
      setIsPlaying(!isPlaying);
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
        <button onClick={onBack} className="text-white">
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button onClick={onShowInfo} className="text-white">
          <Info className="h-6 w-6" />
        </button>
      </div>
      
      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <h1 className="text-2xl font-bold text-white mb-2">{track.title}</h1>
        <p className="text-white text-opacity-80 mb-6">{track.subtitle}</p>
        
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
}