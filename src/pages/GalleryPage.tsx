
import React from "react";
import Header from "@/components/Header";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Play } from "lucide-react";

const GalleryPage = () => {
  // In a real app, this would be fetched from an API
  const mockProjects = [
    {
      id: "1",
      title: "Manga Panel 1",
      thumbnail: "/placeholder.svg",
      videoUrl: "/placeholder.svg",
      date: "2 days ago"
    },
    {
      id: "2",
      title: "Manga Panel 2",
      thumbnail: "/placeholder.svg",
      videoUrl: "/placeholder.svg",
      date: "3 days ago"
    },
    {
      id: "3",
      title: "Manga Panel 3",
      thumbnail: "/placeholder.svg",
      videoUrl: "/placeholder.svg",
      date: "1 week ago"
    },
    {
      id: "4",
      title: "Manga Panel 4",
      thumbnail: "/placeholder.svg",
      videoUrl: "/placeholder.svg",
      date: "2 weeks ago"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Your Gallery</h1>
          <p className="text-muted-foreground mb-6">View your processed manga panels and animations</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockProjects.map((project) => (
              <Card key={project.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-all">
                      <Button variant="outline" size="icon" className="rounded-full bg-background/80">
                        <Play className="h-4 w-4" />
                        <span className="sr-only">Play</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between p-4">
                  <div>
                    <h3 className="font-medium">{project.title}</h3>
                    <p className="text-xs text-muted-foreground">{project.date}</p>
                  </div>
                  <Button variant="outline" size="icon">
                    <Download className="h-4 w-4" />
                    <span className="sr-only">Download</span>
                  </Button>
                </CardFooter>
              </Card>
            ))}
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

export default GalleryPage;
