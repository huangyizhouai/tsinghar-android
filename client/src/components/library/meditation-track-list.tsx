import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Music } from "lucide-react";
import { meditationTracks } from "@/lib/data";
import { useLanguage } from "@/hooks/use-language";

interface MeditationTrackListProps {
  onSelectTrack: (trackId: string) => void;
}

export default function MeditationTrackList({ onSelectTrack }: MeditationTrackListProps) {
  const { language } = useLanguage();
  
  return (
    <div className="space-y-4">
      {meditationTracks.map((track) => (
        <Card 
          key={track.id}
          className="bg-background-card rounded-xl cursor-pointer hover:bg-background-card/90 transition-colors"
          onClick={() => onSelectTrack(track.id)}
        >
          <CardContent className="p-4 flex items-center">
            <div className="h-12 w-12 rounded-lg flex items-center justify-center mr-4" 
                style={{ backgroundColor: track.color }}>
              <Music className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-text-primary">
                {language === 'en' && track.titleEn ? track.titleEn : track.title}
              </h3>
              <p className="text-xs text-text-secondary">
                {language === 'en' && track.subtitleEn ? track.subtitleEn : track.subtitle}
              </p>
            </div>
            <div className="flex items-center text-text-secondary text-xs">
              <Clock className="h-4 w-4 mr-1" />
              {Math.floor(track.duration / 60)}:{(track.duration % 60).toString().padStart(2, '0')}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}