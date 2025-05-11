import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Zap, Heart, Play } from "lucide-react";
import { Link } from "wouter";

type PanicModalProps = {
  onClose: () => void;
};

export default function PanicModal({ onClose }: PanicModalProps) {
  return (
    <div className="fixed inset-0 bg-background-primary bg-opacity-90 z-50 flex items-center justify-center p-4">
      <Card className="bg-background-card rounded-xl w-full max-w-md">
        <CardContent className="p-6">
          <h2 className="font-bold text-2xl text-text-primary text-center mb-4">Stay Strong!</h2>
          
          <img 
            src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400" 
            alt="Calming landscape with mountains and water" 
            className="w-full h-40 object-cover rounded-xl mb-4" 
          />
          
          <p className="text-text-secondary text-center mb-6">
            This urge is temporary and will pass. Take a deep breath and remember why you started this journey.
          </p>
          
          <div className="space-y-3 mb-6">
            <Link to="/menu">
              <Button className="w-full py-6 bg-background-secondary hover:bg-background-secondary/80 rounded-lg font-medium text-text-primary flex items-center justify-center">
                <Zap className="h-5 w-5 mr-2 text-info" />
                Start Breathing Exercise
              </Button>
            </Link>
            
            <Link to="/menu">
              <Button className="w-full py-6 bg-background-secondary hover:bg-background-secondary/80 rounded-lg font-medium text-text-primary flex items-center justify-center">
                <Heart className="h-5 w-5 mr-2 text-warning" />
                View Your Reasons to Quit
              </Button>
            </Link>
            
            <Link to="/library">
              <Button className="w-full py-6 bg-background-secondary hover:bg-background-secondary/80 rounded-lg font-medium text-text-primary flex items-center justify-center">
                <Play className="h-5 w-5 mr-2 text-info" />
                Watch Motivational Video
              </Button>
            </Link>
          </div>
          
          <Button 
            onClick={onClose}
            className="w-full py-6 bg-primary hover:bg-primary-light rounded-lg font-medium text-white"
          >
            I'm Feeling Better Now
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
