import React, { useState } from "react";
import { ArrowRight, Play, Download, Mic, Film } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ProcessingResult, 
  BackgroundType, 
  AnimationType,
  VoiceType 
} from "@/services/processingService";
import BackgroundOptions from "./BackgroundOptions";
import AnimationOptions from "./AnimationOptions";
import VoiceoverPanel from "./VoiceoverPanel";
import VideoPreview from "./VideoPreview";

interface ColorizedPreviewProps {
  result: ProcessingResult;
  onGenerateBackground?: (type: BackgroundType, prompt?: string) => void;
  onAnimateImage?: (type: AnimationType) => void;
  onGenerateVoiceover?: (type: VoiceType, dialogueText: string) => void;
  onComposeVideo?: () => void;
  onDownloadVideo?: () => void;
}

const ColorizedPreview: React.FC<ColorizedPreviewProps> = ({ 
  result,
  onGenerateBackground,
  onAnimateImage,
  onGenerateVoiceover,
  onComposeVideo,
  onDownloadVideo
}) => {
  const [selectedBackgroundType, setSelectedBackgroundType] = useState<BackgroundType>(
    result.backgroundType as BackgroundType || "anime-style"
  );
  
  const [selectedAnimationType, setSelectedAnimationType] = useState<AnimationType>(
    result.animationType as AnimationType || "pan-zoom"
  );
  
  const [backgroundPrompt, setBackgroundPrompt] = useState("");

  const isProcessingBackground = result.stage === "background" && !result.backgroundUrl;
  const isProcessingAnimation = result.stage === "animating" && !result.animatedUrl;
  const isProcessingVoiceover = result.stage === "voiceover" && !result.audioUrl;
  const isProcessingVideoComposition = result.stage === "videoComposition" && !result.finalVideoUrl;
  
  const canGenerateBackground = result.colorizedUrl && result.stage !== "background" && result.stage !== "animating" && result.stage !== "voiceover" && result.stage !== "videoComposition" && result.stage !== "completed";
  const canAnimateImage = result.backgroundUrl && result.stage !== "animating" && result.stage !== "voiceover" && result.stage !== "videoComposition" && result.stage !== "completed";
  const canGenerateVoiceover = result.animatedUrl && result.stage !== "voiceover" && result.stage !== "videoComposition" && result.stage !== "completed";
  const canComposeVideo = result.animatedUrl && result.audioUrl && result.stage !== "videoComposition" && result.stage !== "completed";
  const canDownloadVideo = result.finalVideoUrl && result.stage === "completed";

  const handleBackgroundGeneration = () => {
    if (onGenerateBackground) {
      onGenerateBackground(selectedBackgroundType, backgroundPrompt);
    }
  };

  const handleAnimateImage = () => {
    if (onAnimateImage) {
      onAnimateImage(selectedAnimationType);
    }
  };

  const handleVoiceoverGeneration = (voiceType: VoiceType, dialogueText: string) => {
    if (onGenerateVoiceover) {
      onGenerateVoiceover(voiceType, dialogueText);
    }
  };

  const handleVideoComposition = () => {
    if (onComposeVideo) {
      onComposeVideo();
    }
  };

  const handleDownloadVideo = () => {
    if (onDownloadVideo) {
      onDownloadVideo();
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="preview" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="background">Background</TabsTrigger>
          <TabsTrigger value="animation">Animation</TabsTrigger>
          <TabsTrigger value="voiceover">Voiceover</TabsTrigger>
          <TabsTrigger value="video">Video</TabsTrigger>
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
              
              {result.finalVideoUrl && (
                <CarouselItem>
                  <Card>
                    <CardContent className="p-2">
                      <div className="flex flex-col items-center p-2">
                        <div className="relative w-full aspect-square flex items-center justify-center">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Button variant="outline" size="icon" className="rounded-full bg-background/80">
                              <Play className="h-4 w-4" />
                              <span className="sr-only">Play Video</span>
                            </Button>
                          </div>
                          <img 
                            src={result.finalVideoUrl} 
                            alt="Final Video" 
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <h4 className="text-sm font-medium mt-2">Final Video</h4>
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
            prompt={backgroundPrompt}
            onPromptChange={setBackgroundPrompt}
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
        
        <TabsContent value="voiceover" className="space-y-4">
          <VoiceoverPanel 
            onGenerateVoiceover={handleVoiceoverGeneration}
            disabled={!canGenerateVoiceover || isProcessingVoiceover}
            audioUrl={result.audioUrl}
          />
          
          {canComposeVideo && !isProcessingVideoComposition && (
            <Button 
              onClick={handleVideoComposition} 
              disabled={isProcessingVideoComposition}
              className="w-full mt-4"
            >
              <Film className="h-4 w-4 mr-2" />
              Compose Final Video
            </Button>
          )}
          
          {isProcessingVideoComposition && (
            <div className="text-center p-4 bg-primary/10 rounded-md mt-4">
              <p>Composing final video...</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="video" className="space-y-4">
          <VideoPreview 
            videoUrl={result.finalVideoUrl}
            isCompleted={result.stage === "completed"}
            onDownload={handleDownloadVideo}
          />
          
          {canComposeVideo && !isProcessingVideoComposition && (
            <Button 
              onClick={handleVideoComposition} 
              disabled={isProcessingVideoComposition}
              className="w-full"
            >
              <Film className="h-4 w-4 mr-2" />
              Compose Final Video
            </Button>
          )}
          
          {isProcessingVideoComposition && (
            <div className="text-center p-4 bg-primary/10 rounded-md">
              <p>Composing final video...</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ColorizedPreview;
