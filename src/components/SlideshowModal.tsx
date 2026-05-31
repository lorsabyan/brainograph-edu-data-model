"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { mockSlideshows } from "@/lib/data";
import { ChevronLeft, ChevronRight, PlaySquare } from "lucide-react";

interface SlideshowModalProps {
  folderId: string | null;
  onClose: () => void;
}

export default function SlideshowModal({ folderId, onClose }: SlideshowModalProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slideshow = folderId ? mockSlideshows[folderId] : null;

  if (!folderId || !slideshow) {
    return (
      <Dialog open={!!folderId} onOpenChange={(open) => !open && onClose()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Տեղեկատվություն</DialogTitle>
          </DialogHeader>
          <div className="py-12 flex flex-col items-center justify-center text-center text-muted-foreground">
            <PlaySquare className="h-12 w-12 mb-4 opacity-50" />
            <p>Այս պանակի համար սահիկաշար դեռ պատրաստ չէ (կամ AI-ն դեռ չի գեներացրել)։</p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  const handleNext = () => {
    if (currentSlide < slideshow.slides.length - 1) {
      setCurrentSlide(s => s + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(s => s - 1);
    }
  };

  const slide = slideshow.slides[currentSlide];

  return (
    <Dialog open={!!folderId} onOpenChange={(open) => {
      if (!open) {
        onClose();
        setTimeout(() => setCurrentSlide(0), 300);
      }
    }}>
      <DialogContent className="max-w-4xl w-full h-[80vh] flex flex-col p-0 gap-0 overflow-hidden bg-background">
        <DialogHeader className="p-4 border-b bg-muted/30">
          <DialogTitle>{slideshow.title}</DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-background to-muted/50 relative">
          <h2 className="text-4xl font-bold mb-8 text-primary animate-in slide-in-from-bottom-4 duration-500">{slide.title}</h2>
          <p className="text-xl max-w-2xl leading-relaxed text-foreground animate-in slide-in-from-bottom-6 duration-700">
            {slide.content}
          </p>
        </div>

        <div className="p-4 border-t bg-muted/30 flex items-center justify-between">
          <Button 
            variant="outline" 
            onClick={handlePrev} 
            disabled={currentSlide === 0}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Նախորդը
          </Button>
          <div className="text-sm text-muted-foreground font-medium">
            {currentSlide + 1} / {slideshow.slides.length}
          </div>
          <Button 
            onClick={handleNext} 
            disabled={currentSlide === slideshow.slides.length - 1}
          >
            Հաջորդը
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
