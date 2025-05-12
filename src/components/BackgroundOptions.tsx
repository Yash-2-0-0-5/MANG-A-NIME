
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { BackgroundType } from "@/services/processingService";
import { Textarea } from "@/components/ui/textarea";

interface BackgroundOptionsProps {
  selectedType: BackgroundType;
  onTypeChange: (type: BackgroundType) => void;
  disabled?: boolean;
  prompt?: string;
  onPromptChange?: (prompt: string) => void;
}

const BackgroundOptions = ({
  selectedType,
  onTypeChange,
  disabled = false,
  prompt = "",
  onPromptChange
}: BackgroundOptionsProps) => {
  const [customPrompt, setCustomPrompt] = useState(prompt);

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCustomPrompt(e.target.value);
    if (onPromptChange) {
      onPromptChange(e.target.value);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium mb-2">Background Style</h3>
        <p className="text-sm text-muted-foreground mb-6">
          Choose a style for the AI-generated background
        </p>
      </div>

      <RadioGroup
        value={selectedType}
        onValueChange={(value) => onTypeChange(value as BackgroundType)}
        className="grid grid-cols-2 gap-4 md:grid-cols-3"
        disabled={disabled}
      >
        <div>
          <RadioGroupItem
            value="controlnet"
            id="controlnet"
            className="peer sr-only"
            disabled={disabled}
          />
          <Label
            htmlFor="controlnet"
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer disabled:opacity-50"
          >
            <span className="text-center text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              ControlNet
            </span>
            <span className="text-xs text-muted-foreground mt-2 text-center">
              Creates background based on line art
            </span>
          </Label>
        </div>

        <div>
          <RadioGroupItem
            value="anime-style"
            id="anime-style"
            className="peer sr-only"
            disabled={disabled}
          />
          <Label
            htmlFor="anime-style"
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer disabled:opacity-50"
          >
            <span className="text-center text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Anime Style
            </span>
            <span className="text-xs text-muted-foreground mt-2 text-center">
              Stylized anime background
            </span>
          </Label>
        </div>

        <div>
          <RadioGroupItem
            value="realistic"
            id="realistic"
            className="peer sr-only"
            disabled={disabled}
          />
          <Label
            htmlFor="realistic"
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer disabled:opacity-50"
          >
            <span className="text-center text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Realistic
            </span>
            <span className="text-xs text-muted-foreground mt-2 text-center">
              Photo-realistic background
            </span>
          </Label>
        </div>
      </RadioGroup>

      <div className="mt-6">
        <Label htmlFor="prompt" className="mb-2 block">
          Custom Prompt (optional)
        </Label>
        <Textarea
          id="prompt"
          placeholder="Describe the background you want (e.g. 'Tokyo street at night with neon lights')"
          value={customPrompt}
          onChange={handlePromptChange}
          disabled={disabled}
          className="min-h-20"
        />
        <p className="text-xs text-muted-foreground mt-2">
          Providing a specific prompt helps the AI generate more relevant backgrounds
        </p>
      </div>
    </div>
  );
};

export default BackgroundOptions;
