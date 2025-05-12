
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
    console.log("Starting file upload:", file.name);
    
    // Generate a unique file path for storage
    const fileExt = file.name.split('.').pop();
    const filePath = `${uuidv4()}.${fileExt}`;
    
    console.log("Generated file path:", filePath);
    
    // Upload to Supabase storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('manga')
      .upload(filePath, file);
      
    if (uploadError) {
      console.error("Upload error:", uploadError);
      throw uploadError;
    }
    
    if (!uploadData?.path) {
      console.error("Upload failed: No file path returned");
      throw new Error('Upload failed: No file path returned');
    }
    
    console.log("Upload successful. Path:", uploadData.path);
    
    // Get the public URL for the uploaded file
    const { data: { publicUrl } } = supabase.storage
      .from('manga')
      .getPublicUrl(uploadData.path);
    
    console.log("Public URL generated:", publicUrl);
      
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
      console.error("Job creation error:", jobError);
      throw jobError;
    }
    
    if (!jobData) {
      console.error("Failed to create processing job");
      throw new Error('Failed to create processing job');
    }
    
    console.log("Processing job created:", jobData.id);
    
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
