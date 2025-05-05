
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { BackgroundType } from "@/services/processingService";

interface BackgroundOptionsProps {
  selectedType: BackgroundType;
  onTypeChange: (type: BackgroundType) => void;
  disabled?: boolean;
}

const BackgroundOptions: React.FC<BackgroundOptionsProps> = ({
  selectedType,
  onTypeChange,
  disabled = false
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Background Generation Options</h3>
      <RadioGroup
        value={selectedType}
        onValueChange={(value) => onTypeChange(value as BackgroundType)}
        disabled={disabled}
        className="grid grid-cols-1 gap-3"
      >
        <div className="flex items-center space-x-2 rounded-md border p-3 cursor-pointer hover:bg-accent">
          <RadioGroupItem value="controlnet" id="controlnet" />
          <Label htmlFor="controlnet" className="flex-1 cursor-pointer">
            <div>
              <h4 className="font-medium">ControlNet Generation</h4>
              <p className="text-sm text-muted-foreground">
                Uses ControlNet to generate detailed anime-style backgrounds
              </p>
            </div>
          </Label>
        </div>
        
        <div className="flex items-center space-x-2 rounded-md border p-3 cursor-pointer hover:bg-accent">
          <RadioGroupItem value="anime-style" id="anime-style" />
          <Label htmlFor="anime-style" className="flex-1 cursor-pointer">
            <div>
              <h4 className="font-medium">Anime-Style Generation</h4>
              <p className="text-sm text-muted-foreground">
                Creates stylized anime backgrounds using Stable Diffusion
              </p>
            </div>
          </Label>
        </div>
        
        <div className="flex items-center space-x-2 rounded-md border p-3 cursor-pointer hover:bg-accent">
          <RadioGroupItem value="realistic" id="realistic" />
          <Label htmlFor="realistic" className="flex-1 cursor-pointer">
            <div>
              <h4 className="font-medium">Realistic Backgrounds</h4>
              <p className="text-sm text-muted-foreground">
                Generates photo-realistic backgrounds with RunwayML
              </p>
            </div>
          </Label>
        </div>
        
        <div className="flex items-center space-x-2 rounded-md border p-3 cursor-pointer hover:bg-accent">
          <RadioGroupItem value="none" id="no-background" />
          <Label htmlFor="no-background" className="flex-1 cursor-pointer">
            <div>
              <h4 className="font-medium">No Background</h4>
              <p className="text-sm text-muted-foreground">
                Skip background generation and keep original background
              </p>
            </div>
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default BackgroundOptions;
