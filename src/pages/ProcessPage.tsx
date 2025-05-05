
import React from "react";
import Header from "@/components/Header";
import FileUpload from "@/components/FileUpload";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Palette, Image, Wand, Film, Mic } from "lucide-react";

const ProcessPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Transform Manga Into Anime</h1>
          
          <Tabs defaultValue="upload" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="upload">Upload</TabsTrigger>
              <TabsTrigger value="colorize">Colorize</TabsTrigger>
              <TabsTrigger value="background">Background</TabsTrigger>
              <TabsTrigger value="animate">Animate</TabsTrigger>
              <TabsTrigger value="audio">Voice & Audio</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upload" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Image className="h-5 w-5" />
                    Upload Manga Panel
                  </CardTitle>
                  <CardDescription>
                    Upload a manga panel or page to start the conversion process
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FileUpload />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="colorize" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="h-5 w-5" />
                    Colorization
                  </CardTitle>
                  <CardDescription>
                    AI colorizes your black and white manga with vibrant colors
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Upload a manga panel first to access the colorization options.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-muted p-4 rounded-lg flex flex-col items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                        <Palette className="h-4 w-4 text-primary" />
                      </div>
                      <p className="text-center text-sm">PaintsChainer technology</p>
                    </div>
                    <div className="bg-muted p-4 rounded-lg flex flex-col items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                        <Wand className="h-4 w-4 text-primary" />
                      </div>
                      <p className="text-center text-sm">Stable Diffusion with anime models</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="background" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Image className="h-5 w-5" />
                    Background Generation
                  </CardTitle>
                  <CardDescription>
                    Generate detailed backgrounds for your manga panels
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Upload and colorize a manga panel first to access background options.
                  </p>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-muted p-4 rounded-lg flex flex-col items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                        <Wand className="h-4 w-4 text-primary" />
                      </div>
                      <p className="text-center text-sm">ControlNet</p>
                    </div>
                    <div className="bg-muted p-4 rounded-lg flex flex-col items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                        <Image className="h-4 w-4 text-primary" />
                      </div>
                      <p className="text-center text-sm">Anime-Style</p>
                    </div>
                    <div className="bg-muted p-4 rounded-lg flex flex-col items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                        <Image className="h-4 w-4 text-primary" />
                      </div>
                      <p className="text-center text-sm">Realistic</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="animate" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wand className="h-5 w-5" />
                    Animation
                  </CardTitle>
                  <CardDescription>
                    Bring your manga panel to life with animation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Complete the previous steps first to access animation options.
                  </p>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-muted p-4 rounded-lg flex flex-col items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                        <Wand className="h-4 w-4 text-primary" />
                      </div>
                      <p className="text-center text-sm">Pan & Zoom</p>
                    </div>
                    <div className="bg-muted p-4 rounded-lg flex flex-col items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                        <Wand className="h-4 w-4 text-primary" />
                      </div>
                      <p className="text-center text-sm">Motion Simulation</p>
                    </div>
                    <div className="bg-muted p-4 rounded-lg flex flex-col items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                        <Wand className="h-4 w-4 text-primary" />
                      </div>
                      <p className="text-center text-sm">Custom Transitions</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="audio" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mic className="h-5 w-5" />
                    Voice & Audio
                  </CardTitle>
                  <CardDescription>
                    Add voices and sounds to your animated manga
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Complete the previous steps first to access audio options.
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-muted p-4 rounded-lg flex flex-col items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                        <Mic className="h-4 w-4 text-primary" />
                      </div>
                      <p className="text-center text-sm">ElevenLabs Voiceover</p>
                    </div>
                    <div className="bg-muted p-4 rounded-lg flex flex-col items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                        <Film className="h-4 w-4 text-primary" />
                      </div>
                      <p className="text-center text-sm">D-ID Lip Sync</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <footer className="border-t border-border py-6 px-4">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} MangaMotion. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ProcessPage;
