
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

// Configure CORS headers for browser requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Create a Supabase client with the Deno runtime
const supabaseClient = (req: Request) => {
  const authHeader = req.headers.get('Authorization');
  const apiKey = req.headers.get('apikey');
  
  return createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    {
      global: { headers: { Authorization: authHeader ?? `Bearer ${apiKey}` } },
    }
  );
};

// Function to generate background using Replicate's ControlNet API
async function generateWithControlNet(imageUrl: string, backgroundType: string, prompt: string) {
  try {
    console.log("Generating background with ControlNet:", { imageUrl, backgroundType, prompt });

    // Default prompt based on background type if not provided
    const effectivePrompt = prompt || getDefaultPrompt(backgroundType);
    
    // Call Replicate API to generate background
    const response = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        "Authorization": `Token ${Deno.env.get('REPLICATE_API_KEY')}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // Using ControlNet model for background generation
        version: "435061a1b5a4c1e26740464bf786efdfa9cb3a3ac488595a2de23e143fdb0117",
        input: {
          image: imageUrl,
          prompt: effectivePrompt,
          structure: "scribble", // Use scribble mode for manga lines
          num_inference_steps: 30,
          guidance_scale: 9,
          seed: Math.floor(Math.random() * 1000000)
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Replicate API error:", errorData);
      throw new Error(`Replicate API error: ${response.status} ${errorData}`);
    }

    const prediction = await response.json();
    console.log("Background generation started, prediction:", prediction);
    
    // Return the prediction ID for status polling
    return prediction.id;
  } catch (error) {
    console.error("Error in background generation:", error);
    throw error;
  }
}

// Helper function to get default prompts based on background type
function getDefaultPrompt(backgroundType: string): string {
  switch (backgroundType) {
    case "anime-style":
      return "anime style background, detailed scenery, vibrant colors, studio ghibli inspired";
    case "realistic":
      return "photorealistic background, highly detailed, 8k resolution, cinematic lighting";
    case "controlnet":
      return "detailed background scene, professional illustration, sharp focus";
    default:
      return "anime background, professional quality, detailed";
  }
}

// Function to check the status of a Replicate prediction
async function checkPredictionStatus(predictionId: string): Promise<string> {
  try {
    console.log("Checking background prediction status:", predictionId);

    const response = await fetch(`https://api.replicate.com/v1/predictions/${predictionId}`, {
      headers: {
        "Authorization": `Token ${Deno.env.get('REPLICATE_API_KEY')}`,
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to check prediction status: ${response.status}`);
    }

    const prediction = await response.json();
    console.log("Background prediction status:", prediction.status);

    if (prediction.status === "succeeded") {
      // Return the generated image URL
      return prediction.output[0];
    } else if (prediction.status === "failed") {
      throw new Error("Background generation failed: " + (prediction.error || "Unknown error"));
    } else {
      // Still processing
      return "";
    }
  } catch (error) {
    console.error("Error checking background prediction status:", error);
    throw error;
  }
}

// Main function to handle background generation requests
serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  // Parse request body
  let body;
  try {
    body = await req.json();
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error parsing request body' }), { 
      status: 400, 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
    });
  }
  
  const { jobId, imageUrl, backgroundType, prompt, predictionId } = body;
  
  // Initialize Supabase client
  const supabase = supabaseClient(req);
  
  try {
    // If a prediction ID is provided, check its status
    if (predictionId) {
      console.log("Checking existing background prediction:", predictionId);
      
      const backgroundImageUrl = await checkPredictionStatus(predictionId);
      
      // If the prediction is complete, update the job
      if (backgroundImageUrl) {
        console.log("Background generation complete:", backgroundImageUrl);
        
        await supabase
          .from('processing_jobs')
          .update({ 
            background_image_url: backgroundImageUrl, 
            status: 'background', 
            progress: 70
          })
          .eq('id', jobId);
        
        return new Response(
          JSON.stringify({ 
            success: true, 
            jobId: jobId, 
            backgroundImageUrl: backgroundImageUrl,
            complete: true
          }), 
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      } else {
        // Still processing
        return new Response(
          JSON.stringify({ 
            success: true, 
            jobId: jobId,
            predictionId: predictionId,
            complete: false
          }), 
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }
    
    // For new background generation requests
    if (!jobId || !imageUrl || !backgroundType) {
      return new Response(JSON.stringify({ error: 'Missing required parameters: jobId, imageUrl, and backgroundType' }), { 
        status: 400, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      });
    }
    
    // Update job status to "background generation in progress"
    await supabase
      .from('processing_jobs')
      .update({ 
        status: 'background', 
        progress: 60
      })
      .eq('id', jobId);
    
    // Start the background generation process
    const newPredictionId = await generateWithControlNet(imageUrl, backgroundType, prompt);
    
    console.log("Background generation started, prediction ID:", newPredictionId);
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        jobId: jobId,
        predictionId: newPredictionId,
        complete: false
      }), 
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in generate-background function:', error);
    
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }), 
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
