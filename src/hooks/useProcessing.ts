
import { useState } from 'react';
import { toast } from 'sonner';
import { 
  processMangaPanel, 
  ProcessingResult, 
  BackgroundType, 
  AnimationType,
  VoiceType,
  generateBackground,
  animateImage,
  generateVoiceover,
  composeVideo,
  finalizeProcessing,
  getProcessingStatus
} from '@/services/processingService';
import { uploadFile } from '@/services/uploadService';

export default function useProcessing() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [processingResult, setProcessingResult] = useState<ProcessingResult | null>(null);
  const [jobId, setJobId] = useState<string | null>(null);

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
  };

  const clearFile = () => {
    setFile(null);
    setPreview(null);
    setProcessingResult(null);
    setJobId(null);
  };

  const checkProcessingStatus = async () => {
    if (!jobId) return;
    
    try {
      const result = await getProcessingStatus(jobId);
      setProcessingResult(result);
      setProgress(result.progress);
      
      // If still processing, check again in a few seconds
      if (result.progress < 100) {
        setTimeout(checkProcessingStatus, 3000);
      }
    } catch (error) {
      console.error("Error checking processing status:", error);
    }
  };

  const processImage = async () => {
    if (!file) return;
    
    setProcessing(true);
    setProgress(0);
    
    try {
      // Process the image
      const result = await processMangaPanel(file);
      
      setJobId(result.id);
      setProcessingResult(result);
      setProgress(result.progress);
      
      toast.success("Image processed successfully");
      
      // Start polling for status updates
      setTimeout(checkProcessingStatus, 3000);
    } catch (error) {
      console.error("Error processing image:", error);
      toast.error("Failed to process image");
    } finally {
      setProcessing(false);
    }
  };

  const handleGenerateBackground = async (backgroundType: BackgroundType, prompt?: string) => {
    if (!processingResult || !jobId) return;
    
    setProcessing(true);
    
    try {
      const result = await generateBackground(jobId, backgroundType, prompt);
      setProcessingResult(result);
      setProgress(result.progress);
      toast.success("Background generation started");
      
      // Start polling for status updates
      setTimeout(checkProcessingStatus, 3000);
    } catch (error) {
      console.error("Error generating background:", error);
      toast.error("Failed to generate background");
    } finally {
      setProcessing(false);
    }
  };

  const handleAnimateImage = async (animationType: AnimationType) => {
    if (!processingResult || !jobId) return;
    
    setProcessing(true);
    
    try {
      const result = await animateImage(jobId, animationType);
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
    if (!processingResult || !jobId) return;
    
    setProcessing(true);
    
    try {
      const result = await generateVoiceover(jobId, voiceType, dialogueText);
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

  const handleComposeVideo = async () => {
    if (!processingResult || !jobId) return;
    
    setProcessing(true);
    
    try {
      const result = await composeVideo(jobId);
      setProcessingResult(result);
      setProgress(result.progress);
      
      // Finalize the processing after video composition
      const finalResult = await finalizeProcessing(jobId);
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
    
    // Open the URL in a new tab
    window.open(processingResult.finalVideoUrl, '_blank');
  };

  return {
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
  };
}
