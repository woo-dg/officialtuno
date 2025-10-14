"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, DollarSign, Star, FileText, Calendar, AlertCircle, Download, Play, RefreshCw } from "lucide-react"
import Link from "next/link"

const recentSessions = [
  {
    id: "1",
    tutor: "Alex Thompson",
    course: "CS 101",
    topic: "Algorithm Complexity",
    date: "2024-01-15",
    duration: "23 min",
    cost: "$28.75",
    rating: 5,
    hasRecording: true,
    hasNotes: true,
  },
  {
    id: "2",
    tutor: "Jordan Lee",
    course: "MATH 221",
    topic: "Calculus Integration",
    date: "2024-01-12",
    duration: "18 min",
    cost: "$22.50",
    rating: 4,
    hasRecording: true,
    hasNotes: true,
  },
  {
    id: "3",
    tutor: "Sam Rivera",
    course: "PHYS 201",
    topic: "Newton's Laws",
    date: "2024-01-10",
    duration: "31 min",
    cost: "$38.75",
    rating: 5,
    hasRecording: true,
    hasNotes: false,
  },
]

const upcomingSessions = [
  {
    id: "4",
    tutor: "Alex Thompson",
    course: "CS 101",
    topic: "Data Structures Review",
    scheduledFor: "2024-01-20T14:00:00",
  },
]

export function StudentDashboard() {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Student Dashboard</h1>
        <p className="text-muted-foreground">Manage your sessions, view recordings, and track your learning</p>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-4 mb-8">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">Total Sessions</span>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </div>
          <p className="text-3xl font-bold">24</p>
          <p className="text-xs text-muted-foreground mt-1">+3 this week</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">Total Spent</span>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </div>
          <p className="text-3xl font-bold">$342.50</p>
          <p className="text-xs text-muted-foreground mt-1">Avg $14.27/session</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">Avg Rating Given</span>
            <Star className="h-4 w-4 text-muted-foreground" />
          </div>
          <p className="text-3xl font-bold">4.8</p>
          <p className="text-xs text-muted-foreground mt-1">Out of 5.0</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">Credits</span>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </div>
          <p className="text-3xl font-bold">$15.00</p>
          <Button size="sm" variant="outline" className="mt-2 w-full bg-transparent">
            Add Credits
          </Button>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="recent" className="space-y-6">
        <TabsList>
          <TabsTrigger value="recent">Recent Sessions</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="recordings">Recordings</TabsTrigger>
        </TabsList>

        <TabsContent value="recent" className="space-y-4">
          {recentSessions.map((session) => (
            <Card key={session.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {session.tutor
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold mb-1">{session.topic}</h3>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span>{session.tutor}</span>
                      <span>•</span>
                      <span>{session.course}</span>
                      <span>•</span>
                      <span>{new Date(session.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="secondary" className="text-xs">
                        {session.duration}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {session.cost}
                      </Badge>
                      {session.rating && (
                        <div className="flex items-center gap-1">
                          {Array.from({ length: session.rating }).map((_, i) => (
                            <Star key={i} className="h-3 w-3 fill-primary text-primary" />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                  <RefreshCw className="h-4 w-4" />
                  Rebook
                </Button>
              </div>

              <div className="flex items-center gap-2 pt-4 border-t border-border">
                {session.hasRecording && (
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Play className="h-4 w-4" />
                    Watch Recording
                  </Button>
                )}
                {session.hasNotes && (
                  <Button variant="ghost" size="sm" className="gap-2">
                    <FileText className="h-4 w-4" />
                    View Notes
                  </Button>
                )}
                <Button variant="ghost" size="sm" className="gap-2">
                  <Download className="h-4 w-4" />
                  Download
                </Button>
                <Button variant="ghost" size="sm" className="gap-2 text-destructive hover:text-destructive ml-auto">
                  <AlertCircle className="h-4 w-4" />
                  Dispute
                </Button>
              </div>
            </Card>
          ))}

          {recentSessions.length === 0 && (
            <Card className="p-12 text-center">
              <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold mb-2">No sessions yet</h3>
              <p className="text-sm text-muted-foreground mb-4">Get started by finding a tutor for your course</p>
              <Button asChild>
                <Link href="/student/find-tutor">Find a Tutor</Link>
              </Button>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-4">
          {upcomingSessions.map((session) => (
            <Card key={session.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{session.topic}</h3>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground mb-2">
                      <span>{session.tutor}</span>
                      <span>•</span>
                      <span>{session.course}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-primary" />
                      <span className="font-medium">
                        {new Date(session.scheduledFor).toLocaleString("en-US", {
                          month: "short",
                          day: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="bg-transparent">
                    Reschedule
                  </Button>
                  <Button size="sm">Join Session</Button>
                </div>
              </div>
            </Card>
          ))}

          {upcomingSessions.length === 0 && (
            <Card className="p-12 text-center">
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold mb-2">No upcoming sessions</h3>
              <p className="text-sm text-muted-foreground mb-4">Schedule a session or find instant help</p>
              <Button asChild>
                <Link href="/student/find-tutor">Find a Tutor</Link>
              </Button>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="recordings" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {recentSessions
              .filter((s) => s.hasRecording)
              .map((session) => (
                <Card key={session.id} className="overflow-hidden">
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center relative group">
                    <Play className="h-12 w-12 text-white opacity-80 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-2 right-2">
                      <Badge variant="secondary" className="text-xs">
                        {session.duration}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-1 text-sm">{session.topic}</h3>
                    <p className="text-xs text-muted-foreground mb-3">
                      {session.course} • {new Date(session.date).toLocaleDateString()}
                    </p>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                        <Play className="h-3 w-3 mr-1" />
                        Watch
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Download className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Quick Actions */}
      <Card className="p-6 mt-8 bg-primary/5 border-primary/20">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold mb-1">Need help right now?</h3>
            <p className="text-sm text-muted-foreground">Connect with a tutor in ~30 seconds</p>
          </div>
          <Button size="lg" asChild>
            <Link href="/student/find-tutor">Find a Tutor</Link>
          </Button>
        </div>
      </Card>
    </div>
  )
}
