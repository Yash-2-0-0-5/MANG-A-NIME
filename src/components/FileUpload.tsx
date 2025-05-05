
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Image, Loader2, Upload, Palette, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { 
  processMangaPanel, 
  ProcessingResult, 
  BackgroundType, 
  AnimationType,
  VoiceType,
  generateBackground,
  animateImage,
  generateVoiceover,
  generateLipSync,
  composeVideo,
  finalizeProcessing
} from "@/services/processingService";
import ProcessingPanel from "./ProcessingPanel";
import ColorizedPreview from "./ColorizedPreview";

interface FileUploadProps {
  onFileUploaded?: (file: File) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUploaded }) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [processingResult, setProcessingResult] = useState<ProcessingResult | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length) {
      const selectedFile = acceptedFiles[0];
      setFile(selectedFile);
      
      // Create a preview
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);
      
      if (onFileUploaded) {
        onFileUploaded(selectedFile);
      }
    }
  }, [onFileUploaded]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': []
    },
    maxFiles: 1
  });

  const handleProcessImage = async () => {
    if (!file) return;
    
    setProcessing(true);
    setProgress(0);
    
    try {
      // Start processing
      const result = await processMangaPanel(file);
      setProcessingResult(result);
      setProgress(result.progress);
      toast.success("Image processed successfully");
    } catch (error) {
      console.error("Error processing image:", error);
      toast.error("Failed to process image");
    } finally {
      setProcessing(false);
    }
  };

  const handleGenerateBackground = async (backgroundType: BackgroundType) => {
    if (!processingResult) return;
    
    setProcessing(true);
    
    try {
      const result = await generateBackground(processingResult.id, backgroundType);
      setProcessingResult(result);
      setProgress(result.progress);
      toast.success("Background generated successfully");
    } catch (error) {
      console.error("Error generating background:", error);
      toast.error("Failed to generate background");
    } finally {
      setProcessing(false);
    }
  };

  const handleAnimateImage = async (animationType: AnimationType) => {
    if (!processingResult) return;
    
    setProcessing(true);
    
    try {
      const result = await animateImage(processingResult.id, animationType);
      setProcessingResult(result);
      setProgress(result.progress);
      toast.success("Animation created successfully");
    } catch (error) {
      console.error("Error animating image:", error);
      toast.error("Failed to animate image");
    } finally {
      setProcessing(false);
    }
  };

  const handleGenerateVoiceover = async (voiceType: VoiceType, dialogueText: string) => {
    if (!processingResult) return;
    
    setProcessing(true);
    
    try {
      const result = await generateVoiceover(processingResult.id, voiceType, dialogueText);
      setProcessingResult(result);
      setProgress(result.progress);
      toast.success("Voiceover generated successfully");
    } catch (error) {
      console.error("Error generating voiceover:", error);
      toast.error("Failed to generate voiceover");
    } finally {
      setProcessing(false);
    }
  };

  const handleGenerateLipSync = async () => {
    if (!processingResult) return;
    
    setProcessing(true);
    
    try {
      const result = await generateLipSync(processingResult.id);
      setProcessingResult(result);
      setProgress(result.progress);
      toast.success("Lip sync animation created successfully");
    } catch (error) {
      console.error("Error generating lip sync:", error);
      toast.error("Failed to generate lip sync");
    } finally {
      setProcessing(false);
    }
  };

  const handleComposeVideo = async () => {
    if (!processingResult) return;
    
    setProcessing(true);
    
    try {
      const result = await composeVideo(processingResult.id);
      setProcessingResult(result);
      setProgress(result.progress);
      
      // Finalize the processing after video composition
      const finalResult = await finalizeProcessing(result.id);
      setProcessingResult(finalResult);
      setProgress(finalResult.progress);
      
      toast.success("Video composed successfully");
    } catch (error) {
      console.error("Error composing video:", error);
      toast.error("Failed to compose video");
    } finally {
      setProcessing(false);
    }
  };

  const handleDownloadVideo = () => {
    if (!processingResult?.finalVideoUrl) return;
    
    // In a real app, this would trigger the download of the video
    toast.success("Video download started");
    
    // Simulate download by opening the URL in a new tab
    window.open(processingResult.finalVideoUrl, '_blank');
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {!processingResult ? (
        <>
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer transition-colors ${
              isDragActive ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"
            }`}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center justify-center gap-4">
              {preview ? (
                <div className="relative w-full max-w-xs">
                  <img 
                    src={preview} 
                    alt="Preview" 
                    className="w-full h-auto rounded-md object-contain"
                  />
                </div>
              ) : (
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Image className="h-8 w-8 text-primary" />
                </div>
              )}
              <div className="text-center">
                <h3 className="font-medium text-lg">
                  {preview ? "File selected" : "Drop manga panel here"}
                </h3>
                <p className="text-muted-foreground text-sm mt-1">
                  {preview ? file?.name : "Supports JPG, PNG up to 10MB"}
                </p>
              </div>
              {!preview && (
                <Button variant="outline" className="mt-2">
                  <Upload className="h-4 w-4 mr-2" />
                  Select File
                </Button>
              )}
            </div>
          </div>

          {file && (
            <div className="mt-6 flex flex-col gap-4">
              {processing && (
                <Progress value={progress} className="h-2" />
              )}
              <div className="flex justify-end gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setFile(null);
                    setPreview(null);
                  }}
                >
                  Clear
                </Button>
                <Button 
                  onClick={handleProcessImage} 
                  disabled={processing}
                >
                  {processing ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Palette className="h-4 w-4 mr-2" />
                      Process Image
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="space-y-8">
          <ProcessingPanel 
            stage={processingResult.stage} 
            progress={processingResult.progress} 
          />
          
          <ColorizedPreview 
            result={processingResult} 
            onGenerateBackground={handleGenerateBackground}
            onAnimateImage={handleAnimateImage}
            onGenerateVoiceover={handleGenerateVoiceover}
            onGenerateLipSync={handleGenerateLipSync}
            onComposeVideo={handleComposeVideo}
            onDownloadVideo={handleDownloadVideo}
          />
          
          <div className="flex justify-end gap-2">
            {processingResult.finalVideoUrl && (
              <Button 
                onClick={handleDownloadVideo}
                className="gap-2"
              >
                <Download className="h-4 w-4" />
                Download Video
              </Button>
            )}
            <Button 
              variant="outline" 
              onClick={() => {
                setFile(null);
                setPreview(null);
                setProcessingResult(null);
              }}
            >
              Process New Image
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
