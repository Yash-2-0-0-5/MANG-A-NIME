
import React from 'react';
import { CheckCircle, Circle, Loader2 } from 'lucide-react';
import { ProcessingStage } from '@/services/processingService';

interface ProcessingStepsProps {
  currentStage: ProcessingStage;
  progress: number;
}

const ProcessingSteps: React.FC<ProcessingStepsProps> = ({ currentStage, progress }) => {
  const steps: { stage: ProcessingStage; label: string }[] = [
    { stage: 'uploaded', label: 'Upload' },
    { stage: 'preprocessing', label: 'Preprocess' },
    { stage: 'colorizing', label: 'Colorize' },
    { stage: 'background', label: 'Background' },
    { stage: 'animating', label: 'Animate' },
    { stage: 'voiceover', label: 'Voiceover' },
    { stage: 'videoComposition', label: 'Compose Video' },
    { stage: 'completed', label: 'Complete' },
  ];

  const getStepStatus = (step: { stage: ProcessingStage }) => {
    const stages = steps.map(s => s.stage);
    const currentIndex = stages.indexOf(currentStage);
    const stepIndex = stages.indexOf(step.stage);

    if (stepIndex < currentIndex) {
      return 'complete';
    } else if (stepIndex === currentIndex) {
      return 'current';
    } else {
      return 'upcoming';
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row justify-between mb-2">
        {steps.map((step, index) => {
          const status = getStepStatus(step);
          
          return (
            <div key={step.stage} className="flex flex-col items-center mb-2 md:mb-0">
              <div className="flex items-center">
                {status === 'complete' ? (
                  <CheckCircle className="h-5 w-5 text-primary" />
                ) : status === 'current' ? (
                  <Loader2 className="h-5 w-5 text-primary animate-spin" />
                ) : (
                  <Circle className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
              <p className={`text-xs mt-1 ${
                status === 'complete' 
                  ? 'text-primary'
                  : status === 'current'
                  ? 'text-primary font-medium'
                  : 'text-muted-foreground'
              }`}>
                {step.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProcessingSteps;
