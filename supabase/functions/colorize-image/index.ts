
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
  
  const { jobId, imageUrl } = body;
  
  if (!jobId || !imageUrl) {
    return new Response(JSON.stringify({ error: 'Missing required parameters: jobId and imageUrl' }), { 
      status: 400, 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
    });
  }
  
  try {
    // Initialize Supabase client
    const supabase = supabaseClient(req);
    
    // Update job status to "colorizing"
    await supabase
      .from('processing_jobs')
      .update({ 
        status: 'colorizing', 
        progress: 30
      })
      .eq('id', jobId);
    
    // In a real implementation, this would call an AI colorization API
    // For demonstration, we'll simulate colorization with a delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // For demo purposes, we'll just use the original image as the "colorized" version
    // In a real implementation, this would be the URL of the colorized image from the AI service
    const colorizedImageUrl = imageUrl;
    
    // Update job with the colorized image URL and status
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
        colorizedImageUrl: colorizedImageUrl 
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
