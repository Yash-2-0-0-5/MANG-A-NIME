
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

export interface UploadResult {
  id: string;
  url: string;
  filename: string;
  jobId: string;
}

// Function to upload a file to Supabase storage
export const uploadFile = async (file: File): Promise<UploadResult> => {
  try {
    // Generate a unique file path for storage
    const fileExt = file.name.split('.').pop();
    const filePath = `${uuidv4()}.${fileExt}`;
    
    // Upload to Supabase storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('manga')
      .upload(filePath, file);
      
    if (uploadError) {
      throw uploadError;
    }
    
    if (!uploadData?.path) {
      throw new Error('Upload failed: No file path returned');
    }
    
    // Get the public URL for the uploaded file
    const { data: { publicUrl } } = supabase.storage
      .from('manga')
      .getPublicUrl(uploadData.path);
      
    // Create a processing job record in the database
    const { data: jobData, error: jobError } = await supabase
      .from('processing_jobs')
      .insert({
        original_image_url: publicUrl,
        status: 'uploaded',
        progress: 10
      })
      .select('id')
      .single();
      
    if (jobError) {
      throw jobError;
    }
    
    if (!jobData) {
      throw new Error('Failed to create processing job');
    }
    
    return {
      id: uploadData.path,
      url: publicUrl,
      filename: file.name,
      jobId: jobData.id
    };
  } catch (error) {
    console.error("Error uploading file:", error);
    toast.error("Failed to upload file");
    throw error;
  }
};
