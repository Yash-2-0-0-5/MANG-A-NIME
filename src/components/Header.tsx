
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Wand } from "lucide-react";

const Header = () => {
  const location = useLocation();
  
  return (
    <header className="border-b border-border">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <Wand className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">MangaMotion</span>
        </Link>
        <nav className="flex items-center gap-4">
          <Link to="/">
            <Button variant={location.pathname === "/" ? "default" : "ghost"}>
              Home
            </Button>
          </Link>
          <Link to="/process">
            <Button variant={location.pathname === "/process" ? "default" : "ghost"}>
              Process
            </Button>
          </Link>
          <Link to="/gallery">
            <Button variant={location.pathname === "/gallery" ? "default" : "ghost"}>
              Gallery
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
