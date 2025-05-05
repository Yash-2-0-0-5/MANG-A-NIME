
import React from "react";
import { Check, Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { ProcessingStage } from "@/services/processingService";

interface ProcessingPanelProps {
  stage: ProcessingStage;
  progress: number;
}

const ProcessingPanel: React.FC<ProcessingPanelProps> = ({ stage, progress }) => {
  // Define the stages in order
  const stages: ProcessingStage[] = [
    "uploaded",
    "preprocessing",
    "colorizing",
    "background",
    "animating",
    "voiceover",
    "lipSync",
    "videoComposition",
    "completed"
  ];

  // Get the current stage index
  const currentStageIndex = stages.indexOf(stage);

  return (
    <div className="space-y-4">
      <Progress value={progress} className="h-2" />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stages.map((s, index) => {
          const isPending = index > currentStageIndex;
          const isActive = index === currentStageIndex;
          const isCompleted = index < currentStageIndex;
          
          return (
            <div 
              key={s}
              className={`flex items-center p-3 rounded-md border ${
                isActive ? "border-primary bg-primary/10" : 
                isCompleted ? "border-green-500 bg-green-500/10" : 
                "border-border bg-card"
              }`}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                isActive ? "bg-primary text-primary-foreground" : 
                isCompleted ? "bg-green-500 text-white" : 
                "bg-muted text-muted-foreground"
              }`}>
                {isCompleted ? (
                  <Check className="h-4 w-4" />
                ) : isActive ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <span className="text-xs">{index + 1}</span>
                )}
              </div>
              <span className={`text-sm font-medium ${
                isActive ? "text-primary" : 
                isCompleted ? "text-green-500" : 
                "text-muted-foreground"
              }`}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProcessingPanel;
