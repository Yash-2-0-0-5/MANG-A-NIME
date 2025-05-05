
import React, { useState } from "react";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { ProcessingResult, BackgroundType, AnimationType } from "@/services/processingService";
import BackgroundOptions from "./BackgroundOptions";
import AnimationOptions from "./AnimationOptions";

interface ColorizedPreviewProps {
  result: ProcessingResult;
  onGenerateBackground?: (type: BackgroundType) => void;
  onAnimateImage?: (type: AnimationType) => void;
}

const ColorizedPreview: React.FC<ColorizedPreviewProps> = ({ 
  result,
  onGenerateBackground,
  onAnimateImage 
}) => {
  const [selectedBackgroundType, setSelectedBackgroundType] = useState<BackgroundType>(
    result.backgroundType as BackgroundType || "anime-style"
  );
  
  const [selectedAnimationType, setSelectedAnimationType] = useState<AnimationType>(
    result.animationType as AnimationType || "pan-zoom"
  );

  const isProcessingBackground = result.stage === "background" && !result.backgroundUrl;
  const isProcessingAnimation = result.stage === "animating" && !result.animatedUrl;
  const canGenerateBackground = result.colorizedUrl && result.stage !== "background" && result.stage !== "animating" && result.stage !== "completed";
  const canAnimateImage = result.backgroundUrl && result.stage !== "animating" && result.stage !== "completed";

  const handleBackgroundGeneration = () => {
    if (onGenerateBackground) {
      onGenerateBackground(selectedBackgroundType);
    }
  };

  const handleAnimateImage = () => {
    if (onAnimateImage) {
      onAnimateImage(selectedAnimationType);
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="preview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="background">Background</TabsTrigger>
          <TabsTrigger value="animation">Animation</TabsTrigger>
        </TabsList>
        
        <TabsContent value="preview" className="space-y-4">
          <h3 className="text-lg font-medium">Processing Preview</h3>
          
          <Carousel className="w-full max-w-md mx-auto">
            <CarouselContent>
              {result.originalUrl && (
                <CarouselItem>
                  <Card>
                    <CardContent className="p-2">
                      <div className="flex flex-col items-center p-2">
                        <div className="relative w-full aspect-square">
                          <img 
                            src={result.originalUrl} 
                            alt="Original" 
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <h4 className="text-sm font-medium mt-2">Original Image</h4>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              )}
              
              {result.colorizedUrl && (
                <CarouselItem>
                  <Card>
                    <CardContent className="p-2">
                      <div className="flex flex-col items-center p-2">
                        <div className="relative w-full aspect-square">
                          <img 
                            src={result.colorizedUrl} 
                            alt="Colorized" 
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <h4 className="text-sm font-medium mt-2">Colorized Image</h4>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              )}
              
              {result.backgroundUrl && (
                <CarouselItem>
                  <Card>
                    <CardContent className="p-2">
                      <div className="flex flex-col items-center p-2">
                        <div className="relative w-full aspect-square">
                          <img 
                            src={result.backgroundUrl} 
                            alt="Background" 
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <h4 className="text-sm font-medium mt-2">With Background</h4>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              )}
              
              {result.animatedUrl && (
                <CarouselItem>
                  <Card>
                    <CardContent className="p-2">
                      <div className="flex flex-col items-center p-2">
                        <div className="relative w-full aspect-square flex items-center justify-center">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Button variant="outline" size="icon" className="rounded-full bg-background/80">
                              <Play className="h-4 w-4" />
                              <span className="sr-only">Play Animation</span>
                            </Button>
                          </div>
                          <img 
                            src={result.animatedUrl} 
                            alt="Animated" 
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <h4 className="text-sm font-medium mt-2">Animated Result</h4>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              )}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          
          <div className="w-full max-w-md mx-auto flex items-center justify-center">
            <div className="text-center text-sm text-muted-foreground">
              <p>Progress: {result.progress}% complete</p>
              <p>Current stage: {result.stage}</p>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="background" className="space-y-4">
          <BackgroundOptions 
            selectedType={selectedBackgroundType}
            onTypeChange={setSelectedBackgroundType}
            disabled={!canGenerateBackground || isProcessingBackground}
          />
          
          {canGenerateBackground && (
            <Button 
              onClick={handleBackgroundGeneration} 
              disabled={isProcessingBackground}
              className="w-full"
            >
              {isProcessingBackground ? (
                <>Generating Background...</>
              ) : (
                <>Generate Background <ArrowRight className="ml-2 h-4 w-4" /></>
              )}
            </Button>
          )}
        </TabsContent>
        
        <TabsContent value="animation" className="space-y-4">
          <AnimationOptions 
            selectedType={selectedAnimationType}
            onTypeChange={setSelectedAnimationType}
            disabled={!canAnimateImage || isProcessingAnimation}
          />
          
          {canAnimateImage && (
            <Button 
              onClick={handleAnimateImage} 
              disabled={isProcessingAnimation}
              className="w-full"
            >
              {isProcessingAnimation ? (
                <>Creating Animation...</>
              ) : (
                <>Animate Image <ArrowRight className="ml-2 h-4 w-4" /></>
              )}
            </Button>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ColorizedPreview;
