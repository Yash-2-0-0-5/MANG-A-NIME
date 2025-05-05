
import React from "react";
import { Download, Film, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface VideoPreviewProps {
  videoUrl?: string;
  isCompleted?: boolean;
  onDownload?: () => void;
}

const VideoPreview: React.FC<VideoPreviewProps> = ({
  videoUrl,
  isCompleted = false,
  onDownload
}) => {
  if (!videoUrl) {
    return null;
  }
  
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Film className="h-5 w-5 mr-2" />
          Final Video Preview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative aspect-video bg-muted rounded-md overflow-hidden">
          {/* In a real app, this would be a video element */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Button variant="outline" size="icon" className="rounded-full bg-background/80">
              <Play className="h-4 w-4" />
              <span className="sr-only">Play Video</span>
            </Button>
          </div>
          <img 
            src={videoUrl} 
            alt="Video preview" 
            className="w-full h-full object-cover"
          />
        </div>
      </CardContent>
      {isCompleted && (
        <CardFooter>
          <Button 
            className="w-full" 
            onClick={onDownload}
          >
            <Download className="h-4 w-4 mr-2" />
            Download Video
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default VideoPreview;
