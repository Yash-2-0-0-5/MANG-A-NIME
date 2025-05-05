
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
  generateLipSync,
  composeVideo,
  finalizeProcessing
} from '@/services/processingService';
import { uploadFile } from '@/services/uploadService';

export default function useProcessing() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [processingResult, setProcessingResult] = useState<ProcessingResult | null>(null);

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
  };

  const clearFile = () => {
    setFile(null);
    setPreview(null);
  };

  const processImage = async () => {
    if (!file) return;
    
    setProcessing(true);
    setProgress(0);
    
    try {
      // First upload the file
      await uploadFile(file);
      
      // Then start processing
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
    handleGenerateLipSync,
    handleComposeVideo,
    handleDownloadVideo
  };
}
