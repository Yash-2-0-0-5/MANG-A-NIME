
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Image, Loader2, Upload, Palette, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import ProcessingSteps from "./ProcessingSteps";
import ColorizedPreview from "./ColorizedPreview";
import useProcessing from "@/hooks/useProcessing";
import { toast } from "sonner";

interface FileUploadProps {
  onFileUploaded?: (file: File) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUploaded }) => {
  const {
    file,
    preview,
    processing,
    progress,
    processingResult,
    handleFileSelect,
    clearFile,
    processImage,
    handleGenerateBackground,
    handleAnimateImage,
    handleGenerateVoiceover,
    handleComposeVideo,
    handleDownloadVideo
  } = useProcessing();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length) {
      try {
        const selectedFile = acceptedFiles[0];
        
        // Check file size (10MB limit)
        if (selectedFile.size > 10 * 1024 * 1024) {
          toast.error("File size exceeds 10MB limit");
          return;
        }
        
        handleFileSelect(selectedFile);
        
        if (onFileUploaded) {
          onFileUploaded(selectedFile);
        }
      } catch (error) {
        console.error("Error handling file drop:", error);
        toast.error("Failed to process the dropped file");
      }
    }
  }, [onFileUploaded, handleFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': []
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024 // 10MB
  });

  const handleProcessClick = async () => {
    try {
      await processImage();
    } catch (error) {
      console.error("Error processing image:", error);
      toast.error("Failed to process image. Please try again.");
    }
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
                  onClick={clearFile}
                >
                  Clear
                </Button>
                <Button 
                  onClick={handleProcessClick} 
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
          <ProcessingSteps
            currentStage={processingResult.stage}
            progress={processingResult.progress}
          />
          
          <ColorizedPreview 
            result={processingResult} 
            onGenerateBackground={handleGenerateBackground}
            onAnimateImage={handleAnimateImage}
            onGenerateVoiceover={handleGenerateVoiceover}
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
              onClick={clearFile}
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
