
import React from "react";
import { Link } from "react-router-dom";
import { Code, Image, Menu, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Header = () => {
  return (
    <header className="border-b border-border">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[250px]">
              <nav className="flex flex-col gap-4 mt-8">
                <Link to="/" className="flex items-center gap-2 text-lg font-semibold">
                  <Image className="h-5 w-5" />
                  <span>MangaMotion</span>
                </Link>
                <Link to="/projects" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                  <Code className="h-5 w-5" />
                  <span>My Projects</span>
                </Link>
                <Link to="/upload" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                  <Upload className="h-5 w-5" />
                  <span>Upload</span>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <Link to="/" className="flex items-center gap-2 text-lg font-semibold">
            <Image className="h-5 w-5" />
            <span>MangaMotion</span>
          </Link>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <nav className="flex items-center gap-6">
            <Link to="/projects" className="text-muted-foreground hover:text-foreground">
              My Projects
            </Link>
            <Link to="/upload" className="text-muted-foreground hover:text-foreground">
              Upload
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="default">
            <Upload className="h-4 w-4 mr-2" />
            New Upload
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
