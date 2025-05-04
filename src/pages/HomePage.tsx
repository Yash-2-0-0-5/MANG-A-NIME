
import React from "react";
import FileUpload from "@/components/FileUpload";
import Header from "@/components/Header";
import { Separator } from "@/components/ui/separator";

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
            Transform Manga into Animated Anime
          </h1>
          <p className="text-xl text-muted-foreground mt-4">
            Upload your manga panels and convert them to animated scenes with AI
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="grid gap-8">
            <div className="bg-card rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Upload a manga panel</h2>
              <FileUpload onFileUploaded={handleFileUploaded} />
            </div>
          </div>

          <Separator className="my-12" />

          <div className="grid gap-6">
            <h2 className="text-2xl font-semibold text-center">How it works</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-card p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <span className="text-primary font-bold">1</span>
                </div>
                <h3 className="text-lg font-medium">Upload</h3>
                <p className="text-muted-foreground mt-2">
                  Upload your manga panel or page in JPG or PNG format
                </p>
              </div>
              
              <div className="bg-card p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <span className="text-primary font-bold">2</span>
                </div>
                <h3 className="text-lg font-medium">Process</h3>
                <p className="text-muted-foreground mt-2">
                  Our AI colorizes, animates, and adds voice to your manga
                </p>
              </div>
              
              <div className="bg-card p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <span className="text-primary font-bold">3</span>
                </div>
                <h3 className="text-lg font-medium">Download</h3>
                <p className="text-muted-foreground mt-2">
                  Preview and download your animated anime video
                </p>
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
