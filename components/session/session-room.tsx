"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { VideoControls } from "./video-controls"
import { Whiteboard } from "./whiteboard"
import { SessionInfo } from "./session-info"
import { EndSessionModal } from "./end-session-modal"
import { Timer, Plus, PhoneOff } from "lucide-react"

interface SessionRoomProps {
  sessionId: string
}

export function SessionRoom({ sessionId }: SessionRoomProps) {
  const [elapsedTime, setElapsedTime] = useState(0)
  const [showEndModal, setShowEndModal] = useState(false)
  const [isStudent] = useState(true) // In production, this would come from auth

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const calculateCost = (seconds: number) => {
    const minutes = seconds / 60
    return (minutes * 1.25).toFixed(2)
  }

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Badge variant="default" className="gap-1.5">
              <div className="h-2 w-2 rounded-full bg-primary-foreground animate-pulse" />
              Live Session
            </Badge>
            <div className="flex items-center gap-2 text-sm">
              <Timer className="h-4 w-4 text-muted-foreground" />
              <span className="font-mono font-semibold">{formatTime(elapsedTime)}</span>
              <span className="text-muted-foreground">• ${calculateCost(elapsedTime)}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isStudent && (
              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                <Plus className="h-4 w-4" />
                Add 5 Minutes
              </Button>
            )}
            <Button variant="destructive" size="sm" className="gap-2" onClick={() => setShowEndModal(true)}>
              <PhoneOff className="h-4 w-4" />
              End Session
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Session Info */}
        <aside className="w-80 border-r border-border bg-card overflow-y-auto">
          <SessionInfo isStudent={isStudent} />
        </aside>

        {/* Center - Whiteboard */}
        <main className="flex-1 flex flex-col overflow-hidden">
          <Whiteboard />
        </main>

        {/* Right Sidebar - Video */}
        <aside className="w-80 border-l border-border bg-card p-4 space-y-4">
          <VideoControls />
        </aside>
      </div>

      {showEndModal && (
        <EndSessionModal
          elapsedTime={elapsedTime}
          totalCost={calculateCost(elapsedTime)}
          onClose={() => setShowEndModal(false)}
          isStudent={isStudent}
        />
      )}
    </div>
  )
}
