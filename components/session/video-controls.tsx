"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mic, MicOff, Video, VideoOff, Volume2, VolumeX } from "lucide-react"

export function VideoControls() {
  const [audioEnabled, setAudioEnabled] = useState(true)
  const [videoEnabled, setVideoEnabled] = useState(false)
  const [speakerEnabled, setSpeakerEnabled] = useState(true)

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-semibold mb-3">Video & Audio</h3>

        {/* Tutor Video */}
        <Card className="aspect-video bg-muted flex items-center justify-center mb-3 overflow-hidden">
          {videoEnabled ? (
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <Video className="h-12 w-12 text-muted-foreground" />
            </div>
          ) : (
            <div className="text-center">
              <VideoOff className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Camera off</p>
            </div>
          )}
        </Card>

        {/* Self Video (Picture-in-Picture) */}
        <Card className="aspect-video bg-muted flex items-center justify-center overflow-hidden">
          <div className="text-center">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
              <span className="text-xl font-semibold text-primary">You</span>
            </div>
            <p className="text-xs text-muted-foreground">Your camera is off</p>
          </div>
        </Card>
      </div>

      {/* Controls */}
      <div className="space-y-2">
        <Button
          variant={audioEnabled ? "default" : "destructive"}
          size="sm"
          className="w-full justify-start gap-2"
          onClick={() => setAudioEnabled(!audioEnabled)}
        >
          {audioEnabled ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
          {audioEnabled ? "Mute" : "Unmute"}
        </Button>

        <Button
          variant={videoEnabled ? "default" : "outline"}
          size="sm"
          className="w-full justify-start gap-2"
          onClick={() => setVideoEnabled(!videoEnabled)}
        >
          {videoEnabled ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
          {videoEnabled ? "Stop Video" : "Start Video"}
        </Button>

        <Button
          variant={speakerEnabled ? "default" : "outline"}
          size="sm"
          className="w-full justify-start gap-2"
          onClick={() => setSpeakerEnabled(!speakerEnabled)}
        >
          {speakerEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          {speakerEnabled ? "Mute Speaker" : "Unmute Speaker"}
        </Button>
      </div>

      {/* Connection Status */}
      <Card className="p-3 bg-muted/50">
        <div className="space-y-1.5 text-xs">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Connection:</span>
            <span className="font-medium text-primary">Excellent</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Latency:</span>
            <span className="font-medium">24ms</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Quality:</span>
            <span className="font-medium">HD</span>
          </div>
        </div>
      </Card>
    </div>
  )
}
