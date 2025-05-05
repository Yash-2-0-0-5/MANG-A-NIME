
import React, { useState } from "react";
import { Mic, Save, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { VoiceType } from "@/services/processingService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface VoiceoverPanelProps {
  onGenerateVoiceover: (voiceType: VoiceType, dialogueText: string) => void;
  disabled?: boolean;
  audioUrl?: string;
}

const VoiceoverPanel: React.FC<VoiceoverPanelProps> = ({
  onGenerateVoiceover,
  disabled = false,
  audioUrl
}) => {
  const [voiceType, setVoiceType] = useState<VoiceType>("female");
  const [dialogueText, setDialogueText] = useState("");
  
  const handleGenerateVoiceover = () => {
    if (dialogueText.trim() === "") {
      return;
    }
    onGenerateVoiceover(voiceType, dialogueText);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Voiceover</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="voice-select" className="text-sm font-medium">
            Voice Type
          </label>
          <Select 
            value={voiceType} 
            onValueChange={(value) => setVoiceType(value as VoiceType)}
            disabled={disabled}
          >
            <SelectTrigger id="voice-select">
              <SelectValue placeholder="Select voice type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male Voice</SelectItem>
              <SelectItem value="female">Female Voice</SelectItem>
              <SelectItem value="child">Child Voice</SelectItem>
              <SelectItem value="robot">Robot Voice</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="dialogue-text" className="text-sm font-medium">
            Dialogue Text
          </label>
          <Textarea
            id="dialogue-text"
            placeholder="Enter dialogue text for voiceover..."
            value={dialogueText}
            onChange={(e) => setDialogueText(e.target.value)}
            rows={4}
            disabled={disabled}
            className="resize-none"
          />
        </div>
        
        {audioUrl && (
          <div className="flex items-center space-x-2 pt-2">
            <Volume2 className="h-4 w-4 text-primary" />
            <span className="text-sm">Audio generated</span>
            <audio controls className="w-full h-8">
              <source src={audioUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        )}
        
        <Button 
          onClick={handleGenerateVoiceover} 
          disabled={disabled || dialogueText.trim() === ""}
          className="w-full"
        >
          <Mic className="h-4 w-4 mr-2" />
          Generate Voice
        </Button>
      </CardContent>
    </Card>
  );
};

export default VoiceoverPanel;
