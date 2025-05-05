
import React from "react";
import { Palette, Image, Wand, Filter, Brush, Download } from "lucide-react";

export type IconName = 
  | "palette" 
  | "image" 
  | "wand" 
  | "filter" 
  | "brush" 
  | "download";

interface IconProps {
  name: IconName;
  className?: string;
  size?: number;
}

export const Icon: React.FC<IconProps> = ({ 
  name, 
  className = "", 
  size = 24 
}) => {
  const iconMap = {
    palette: Palette,
    image: Image,
    wand: Wand,
    filter: Filter,
    brush: Brush,
    download: Download
  };

  const IconComponent = iconMap[name];
  
  return <IconComponent className={className} size={size} />;
};
