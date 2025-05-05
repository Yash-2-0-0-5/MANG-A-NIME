
import React from "react";
import { Button } from "@/components/ui/button";
import { Download, Palette, Brush } from "lucide-react";
import { ProcessingResult } from "@/services/processingService";
import { Skeleton } from "@/components/ui/skeleton";

interface ColorizedPreviewProps {
  result: ProcessingResult;
}

const ColorizedPreview: React.FC<ColorizedPreviewProps> = ({ result }) => {
  const { originalUrl, colorizedUrl } = result;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Colorization Results</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Original image */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <Brush className="h-4 w-4" />
            <span className="text-sm font-medium">Original</span>
          </div>
          <div className="aspect-square bg-card rounded-md overflow-hidden border">
            {originalUrl ? (
              <img 
                src={originalUrl} 
                alt="Original" 
                className="w-full h-full object-contain"
              />
            ) : (
              <Skeleton className="w-full h-full" />
            )}
          </div>
        </div>
        
        {/* Colorized image */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <Palette className="h-4 w-4" />
            <span className="text-sm font-medium">Colorized</span>
          </div>
          <div className="aspect-square bg-card rounded-md overflow-hidden border">
            {colorizedUrl ? (
              <img 
                src={colorizedUrl} 
                alt="Colorized" 
                className="w-full h-full object-contain"
              />
            ) : (
              <Skeleton className="w-full h-full" />
            )}
          </div>
        </div>
      </div>
      
      {colorizedUrl && (
        <div className="flex justify-end">
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Download Colorized Image
          </Button>
        </div>
      )}
    </div>
  );
};

export default ColorizedPreview;
