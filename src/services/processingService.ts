
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { uploadFile } from "@/services/uploadService";

// Define the endpoint for Supabase Edge Functions
const SUPABASE_URL = "https://xnbouliiisjqyttxefir.supabase.co";

export type ProcessingStage = 
  | "uploaded" 
  | "preprocessing" 
  | "colorizing" 
  | "background" 
  | "animating" 
  | "voiceover" 
  | "videoComposition"
  | "completed";

export interface ProcessingResult {
  id: string;
  originalUrl: string;
  preprocessedUrl?: string;
  colorizedUrl?: string;
  backgroundUrl?: string;
  animatedUrl?: string;
  audioUrl?: string;
  finalVideoUrl?: string;
  dialogueText?: string;
  stage: ProcessingStage;
  progress: number;
  backgroundType?: string;
  animationType?: string;
  voiceType?: string;
}

export type BackgroundType = 
  | "controlnet" 
  | "anime-style" 
  | "realistic" 
  | "none";

export type AnimationType = 
  | "pan-zoom" 
  | "motion-simulation" 
  | "custom-transitions" 
  | "none";

export type VoiceType =
  | "male"
  | "female"
  | "child"
  | "robot"
  | "none";

// Function to preprocess the image
export const preprocessImage = async (jobId: string, imageUrl: string): Promise<ProcessingResult> => {
  try {
    // Update job status
    const { data, error } = await supabase
      .from('processing_jobs')
      .update({
        status: 'preprocessing',
        progress: 20
      })
      .eq('id', jobId)
      .select('*')
      .single();
      
    if (error) {
      throw error;
    }
    
    if (!data) {
      throw new Error('Job not found');
    }
    
    return {
      id: jobId,
      originalUrl: imageUrl,
      preprocessedUrl: imageUrl, // In a real app, this would be the preprocessed image
      stage: "preprocessing",
      progress: 20
    };
  } catch (error) {
    console.error("Error preprocessing image:", error);
    toast.error("Failed to preprocess image");
    throw error;
  }
};

// Function to colorize the image using our Supabase Edge Function
export const colorizeImage = async (jobId: string, imageUrl: string): Promise<ProcessingResult> => {
  try {
    // Call the colorize-image Edge Function
    const { data, error } = await supabase.functions.invoke("colorize-image", {
      body: { jobId, imageUrl }
    });
    
    if (error) {
      throw error;
    }
    
    if (!data || !data.colorizedImageUrl) {
      throw new Error('Colorization failed');
    }
    
    return {
      id: jobId,
      originalUrl: imageUrl,
      colorizedUrl: data.colorizedImageUrl,
      stage: "colorizing",
      progress: 50
    };
  } catch (error) {
    console.error("Error colorizing image:", error);
    toast.error("Failed to colorize image");
    throw error;
  }
};

// Function to generate a background
export const generateBackground = async (jobId: string, backgroundType: BackgroundType): Promise<ProcessingResult> => {
  try {
    // Get the job info
    const { data: job, error: jobError } = await supabase
      .from('processing_jobs')
      .select('*')
      .eq('id', jobId)
      .single();
      
    if (jobError || !job) {
      throw jobError || new Error('Job not found');
    }
    
    // Update job status
    const { data, error } = await supabase
      .from('processing_jobs')
      .update({
        status: 'background',
        progress: 60
      })
      .eq('id', jobId)
      .select('*')
      .single();
      
    if (error) {
      throw error;
    }
    
    // In a real implementation, this would call a background generation API
    // For now, we'll just use the colorized image
    return {
      id: jobId,
      originalUrl: job.original_image_url,
      colorizedUrl: job.colorized_image_url,
      backgroundUrl: job.colorized_image_url,
      backgroundType: backgroundType,
      stage: "background",
      progress: 70
    };
  } catch (error) {
    console.error("Error generating background:", error);
    toast.error("Failed to generate background");
    throw error;
  }
};

// Function to animate the image
export const animateImage = async (jobId: string, animationType: AnimationType): Promise<ProcessingResult> => {
  try {
    // Get the job info
    const { data: job, error: jobError } = await supabase
      .from('processing_jobs')
      .select('*')
      .eq('id', jobId)
      .single();
      
    if (jobError || !job) {
      throw jobError || new Error('Job not found');
    }
    
    // Update job status
    const { data, error } = await supabase
      .from('processing_jobs')
      .update({
        status: 'animating',
        progress: 80
      })
      .eq('id', jobId)
      .select('*')
      .single();
      
    if (error) {
      throw error;
    }
    
    // In a real implementation, this would call an animation API
    return {
      id: jobId,
      originalUrl: job.original_image_url,
      colorizedUrl: job.colorized_image_url,
      backgroundUrl: job.background_image_url || job.colorized_image_url,
      animatedUrl: job.colorized_image_url,
      animationType,
      stage: "animating",
      progress: 85
    };
  } catch (error) {
    console.error("Error animating image:", error);
    toast.error("Failed to animate image");
    throw error;
  }
};

// Function to generate voiceover
export const generateVoiceover = async (jobId: string, voiceType: VoiceType, dialogueText: string): Promise<ProcessingResult> => {
  try {
    // Get the job info
    const { data: job, error: jobError } = await supabase
      .from('processing_jobs')
      .select('*')
      .eq('id', jobId)
      .single();
      
    if (jobError || !job) {
      throw jobError || new Error('Job not found');
    }
    
    // Update job status
    const { data, error } = await supabase
      .from('processing_jobs')
      .update({
        status: 'voiceover',
        progress: 90
      })
      .eq('id', jobId)
      .select('*')
      .single();
      
    if (error) {
      throw error;
    }
    
    return {
      id: jobId,
      originalUrl: job.original_image_url,
      colorizedUrl: job.colorized_image_url,
      backgroundUrl: job.background_image_url,
      animatedUrl: job.animated_url,
      audioUrl: '/placeholder.svg', // In a real app, this would be the generated audio
      dialogueText,
      voiceType,
      stage: "voiceover",
      progress: 90
    };
  } catch (error) {
    console.error("Error generating voiceover:", error);
    toast.error("Failed to generate voiceover");
    throw error;
  }
};

// Function to compose the final video
export const composeVideo = async (jobId: string): Promise<ProcessingResult> => {
  try {
    // Get the job info
    const { data: job, error: jobError } = await supabase
      .from('processing_jobs')
      .select('*')
      .eq('id', jobId)
      .single();
      
    if (jobError || !job) {
      throw jobError || new Error('Job not found');
    }
    
    // Update job status
    const { data, error } = await supabase
      .from('processing_jobs')
      .update({
        status: 'videoComposition',
        progress: 98
      })
      .eq('id', jobId)
      .select('*')
      .single();
      
    if (error) {
      throw error;
    }
    
    return {
      id: jobId,
      originalUrl: job.original_image_url,
      colorizedUrl: job.colorized_image_url,
      backgroundUrl: job.background_image_url,
      animatedUrl: job.animated_url,
      audioUrl: job.audio_url,
      finalVideoUrl: '/placeholder.svg', // In a real app, this would be the final video
      stage: "videoComposition",
      progress: 98
    };
  } catch (error) {
    console.error("Error composing video:", error);
    toast.error("Failed to compose video");
    throw error;
  }
};

// Function to finalize processing
export const finalizeProcessing = async (jobId: string): Promise<ProcessingResult> => {
  try {
    // Get the job info
    const { data: job, error: jobError } = await supabase
      .from('processing_jobs')
      .select('*')
      .eq('id', jobId)
      .single();
      
    if (jobError || !job) {
      throw jobError || new Error('Job not found');
    }
    
    // Update job status
    const { data, error } = await supabase
      .from('processing_jobs')
      .update({
        status: 'completed',
        progress: 100
      })
      .eq('id', jobId)
      .select('*')
      .single();
      
    if (error) {
      throw error;
    }
    
    return {
      id: jobId,
      originalUrl: job.original_image_url,
      colorizedUrl: job.colorized_image_url,
      backgroundUrl: job.background_image_url,
      animatedUrl: job.animated_url,
      audioUrl: job.audio_url,
      finalVideoUrl: job.final_video_url || job.colorized_image_url,
      stage: "completed",
      progress: 100
    };
  } catch (error) {
    console.error("Error finalizing processing:", error);
    toast.error("Failed to finalize processing");
    throw error;
  }
};

// Process the uploaded manga panel (handles the full processing pipeline)
export const processMangaPanel = async (file: File): Promise<ProcessingResult> => {
  try {
    // Step 1: Upload the file and create a job
    const uploadResult = await uploadFile(file);
    
    // Step 2: Preprocess the image
    const preprocessResult = await preprocessImage(uploadResult.jobId, uploadResult.url);
    
    // Step 3: Colorize the image
    const colorizeResult = await colorizeImage(uploadResult.jobId, preprocessResult.originalUrl);
    
    // Step 4: Generate background (optional in the real flow, added here for demo)
    const backgroundResult = await generateBackground(colorizeResult.id, "anime-style");
    
    // Step 5: Finalize processing for now
    const finalResult = await finalizeProcessing(backgroundResult.id);
    
    return finalResult;
  } catch (error) {
    console.error("Error processing manga panel:", error);
    toast.error("Failed to process manga panel");
    throw error;
  }
};

// Get the current processing status
export const getProcessingStatus = async (jobId: string): Promise<ProcessingResult> => {
  try {
    const { data, error } = await supabase
      .from('processing_jobs')
      .select('*')
      .eq('id', jobId)
      .single();
      
    if (error) {
      throw error;
    }
    
    if (!data) {
      throw new Error('Job not found');
    }
    
    return {
      id: data.id,
      originalUrl: data.original_image_url,
      colorizedUrl: data.colorized_image_url,
      backgroundUrl: data.background_image_url,
      animatedUrl: data.animated_url,
      audioUrl: data.audio_url,
      finalVideoUrl: data.final_video_url,
      stage: data.status as ProcessingStage,
      progress: data.progress
    };
  } catch (error) {
    console.error("Error getting processing status:", error);
    toast.error("Failed to get processing status");
    throw error;
  }
};
