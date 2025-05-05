
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { AnimationType } from "@/services/processingService";

interface AnimationOptionsProps {
  selectedType: AnimationType;
  onTypeChange: (type: AnimationType) => void;
  disabled?: boolean;
}

const AnimationOptions: React.FC<AnimationOptionsProps> = ({
  selectedType,
  onTypeChange,
  disabled = false
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Animation Options</h3>
      <RadioGroup
        value={selectedType}
        onValueChange={(value) => onTypeChange(value as AnimationType)}
        disabled={disabled}
        className="grid grid-cols-1 gap-3"
      >
        <div className="flex items-center space-x-2 rounded-md border p-3 cursor-pointer hover:bg-accent">
          <RadioGroupItem value="pan-zoom" id="pan-zoom" />
          <Label htmlFor="pan-zoom" className="flex-1 cursor-pointer">
            <div>
              <h4 className="font-medium">Pan & Zoom</h4>
              <p className="text-sm text-muted-foreground">
                Simple panning and zooming effects applied to the image
              </p>
            </div>
          </Label>
        </div>
        
        <div className="flex items-center space-x-2 rounded-md border p-3 cursor-pointer hover:bg-accent">
          <RadioGroupItem value="motion-simulation" id="motion-simulation" />
          <Label htmlFor="motion-simulation" className="flex-1 cursor-pointer">
            <div>
              <h4 className="font-medium">Motion Simulation</h4>
              <p className="text-sm text-muted-foreground">
                Uses Kaiber or RunwayML to simulate natural motion in the image
              </p>
            </div>
          </Label>
        </div>
        
        <div className="flex items-center space-x-2 rounded-md border p-3 cursor-pointer hover:bg-accent">
          <RadioGroupItem value="custom-transitions" id="custom-transitions" />
          <Label htmlFor="custom-transitions" className="flex-1 cursor-pointer">
            <div>
              <h4 className="font-medium">Custom Transitions</h4>
              <p className="text-sm text-muted-foreground">
                Advanced transitions between panels using Remotion
              </p>
            </div>
          </Label>
        </div>
        
        <div className="flex items-center space-x-2 rounded-md border p-3 cursor-pointer hover:bg-accent">
          <RadioGroupItem value="none" id="no-animation" />
          <Label htmlFor="no-animation" className="flex-1 cursor-pointer">
            <div>
              <h4 className="font-medium">No Animation</h4>
              <p className="text-sm text-muted-foreground">
                Skip animation and keep static image
              </p>
            </div>
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default AnimationOptions;
