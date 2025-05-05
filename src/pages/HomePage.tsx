
import React from "react";
import { Link } from "react-router-dom";
import FileUpload from "@/components/FileUpload";
import Header from "@/components/Header";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Palette, Image, Wand, Filter, Mic, Film, ArrowRight } from "lucide-react";

const HomePage = () => {
  const handleFileUploaded = (file: File) => {
    console.log("File uploaded:", file);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight">
            Transform Manga into Anime
          </h1>
          <p className="text-xl text-muted-foreground mt-4">
            Upload your manga panels and convert them to animated scenes with AI
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link to="/process">
              <Button size="lg" className="gap-2">
                Start Converting <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/gallery">
              <Button variant="outline" size="lg">
                View Gallery
              </Button>
            </Link>
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="grid gap-8">
            <div className="bg-card rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Upload and Process a Manga Panel</h2>
              <FileUpload onFileUploaded={handleFileUploaded} />
            </div>
          </div>

          <Separator className="my-12" />

          <div className="grid gap-6">
            <h2 className="text-2xl font-semibold text-center">How it works</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-card p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Image className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-medium">Upload</h3>
                <p className="text-muted-foreground mt-2">
                  Upload your manga panel or page in JPG or PNG format
                </p>
              </div>
              
              <div className="bg-card p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Palette className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-medium">Colorize</h3>
                <p className="text-muted-foreground mt-2">
                  Our AI colorizes the black and white manga panel with vibrant colors
                </p>
              </div>
              
              <div className="bg-card p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Wand className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-medium">Animate</h3>
                <p className="text-muted-foreground mt-2">
                  The colorized panel is transformed into a dynamic animated scene
                </p>
              </div>
            </div>

            <div className="mt-8 grid md:grid-cols-2 gap-6">
              <div className="bg-card p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Mic className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-medium">Add Voiceover</h3>
                <ul className="mt-2 space-y-2 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="bg-primary/10 text-primary text-xs rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">✓</span>
                    <span>ElevenLabs voices for realistic speech</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-primary/10 text-primary text-xs rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">✓</span>
                    <span>D-ID for lip sync and facial animation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-primary/10 text-primary text-xs rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">✓</span>
                    <span>Multiple voice types and languages</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-card p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Film className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-medium">Create Final Video</h3>
                <ul className="mt-2 space-y-2 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="bg-primary/10 text-primary text-xs rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">✓</span>
                    <span>Combine animated video with voiceover</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-primary/10 text-primary text-xs rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">✓</span>
                    <span>Add subtitles and background music</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-primary/10 text-primary text-xs rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">✓</span>
                    <span>Download and share the final result</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
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

export default HomePage;
