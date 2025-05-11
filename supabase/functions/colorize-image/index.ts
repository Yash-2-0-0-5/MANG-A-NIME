
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

// Function to colorize an image using Replicate API
async function colorizeWithReplicate(imageUrl: string) {
  try {
    console.log("Colorizing image with Replicate:", imageUrl);

    // Call Replicate API to colorize the image
    const response = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        "Authorization": `Token ${Deno.env.get('REPLICATE_API_KEY')}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        version: "fcad2219fcf39182b3e94dc170e139eb423a0f3548b53dc485320c75943e4291",
        input: {
          image: imageUrl
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Replicate API error:", errorData);
      throw new Error(`Replicate API error: ${response.status} ${errorData}`);
    }

    const prediction = await response.json();
    
    // Return the prediction ID for status polling
    return prediction.id;
  } catch (error) {
    console.error("Error in colorization:", error);
    throw error;
  }
}

// Function to check the status of a Replicate prediction
async function checkPredictionStatus(predictionId: string): Promise<string> {
  try {
    console.log("Checking prediction status:", predictionId);

    const response = await fetch(`https://api.replicate.com/v1/predictions/${predictionId}`, {
      headers: {
        "Authorization": `Token ${Deno.env.get('REPLICATE_API_KEY')}`,
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to check prediction status: ${response.status}`);
    }

    const prediction = await response.json();
    console.log("Prediction status:", prediction.status);

    if (prediction.status === "succeeded") {
      // Return the colorized image URL
      return prediction.output;
    } else if (prediction.status === "failed") {
      throw new Error("Colorization failed: " + (prediction.error || "Unknown error"));
    } else {
      // Still processing
      return "";
    }
  } catch (error) {
    console.error("Error checking prediction status:", error);
    throw error;
  }
}

// Main function to handle colorization requests
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
  
  const { jobId, imageUrl, predictionId } = body;
  
  // Initialize Supabase client
  const supabase = supabaseClient(req);
  
  try {
    // If a prediction ID is provided, check its status
    if (predictionId) {
      console.log("Checking existing prediction:", predictionId);
      
      const colorizedImageUrl = await checkPredictionStatus(predictionId);
      
      // If the prediction is complete, update the job
      if (colorizedImageUrl) {
        console.log("Colorization complete:", colorizedImageUrl);
        
        await supabase
          .from('processing_jobs')
          .update({ 
            colorized_image_url: colorizedImageUrl, 
            status: 'colorized', 
            progress: 50
          })
          .eq('id', jobId);
        
        return new Response(
          JSON.stringify({ 
            success: true, 
            jobId: jobId, 
            colorizedImageUrl: colorizedImageUrl,
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
    
    // For new colorization requests
    if (!jobId || !imageUrl) {
      return new Response(JSON.stringify({ error: 'Missing required parameters: jobId and imageUrl' }), { 
        status: 400, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      });
    }
    
    // Update job status to "colorizing"
    await supabase
      .from('processing_jobs')
      .update({ 
        status: 'colorizing', 
        progress: 30
      })
      .eq('id', jobId);
    
    // Start the colorization process
    const newPredictionId = await colorizeWithReplicate(imageUrl);
    
    console.log("Colorization started, prediction ID:", newPredictionId);
    
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
    console.error('Error in colorize-image function:', error);
    
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }), 
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
