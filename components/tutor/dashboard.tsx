"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DollarSign,
  TrendingUp,
  Star,
  Clock,
  Zap,
  CheckCircle2,
  AlertCircle,
  Download,
  Calendar,
  Users,
} from "lucide-react"

const courseStats = [
  { course: "CS 101", rating: 4.9, sessions: 89, earnings: "$2,225.00", badge: "verified" },
  { course: "CS 102", rating: 4.8, sessions: 56, earnings: "$1,400.00", badge: "verified" },
  { course: "MATH 221", rating: 5.0, sessions: 34, earnings: "$850.00", badge: "pending" },
]

const recentSessions = [
  {
    id: "1",
    student: "Sarah Chen",
    course: "CS 101",
    topic: "Algorithm Complexity",
    date: "2024-01-15",
    duration: "23 min",
    earnings: "$28.75",
    rating: 5,
    tip: "$5.00",
  },
  {
    id: "2",
    student: "Marcus Johnson",
    course: "CS 102",
    topic: "Binary Trees",
    date: "2024-01-15",
    duration: "18 min",
    earnings: "$22.50",
    rating: 5,
    tip: null,
  },
  {
    id: "3",
    student: "Emily Rodriguez",
    course: "MATH 221",
    topic: "Integration Techniques",
    date: "2024-01-14",
    duration: "31 min",
    earnings: "$38.75",
    rating: 4,
    tip: "$3.00",
  },
]

export function TutorDashboard() {
  const [isOnline, setIsOnline] = useState(false)

  return (
    <div className="container py-8">
      {/* Header with Online Toggle */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Tutor Dashboard</h1>
          <p className="text-muted-foreground">Manage your availability, earnings, and sessions</p>
        </div>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-medium">{isOnline ? "You're Online" : "You're Offline"}</p>
              <p className="text-xs text-muted-foreground">
                {isOnline ? "Available for sessions" : "Not accepting sessions"}
              </p>
            </div>
            <Switch checked={isOnline} onCheckedChange={setIsOnline} />
          </div>
        </Card>
      </div>

      {/* Surge Banner */}
      {isOnline && (
        <Card className="p-4 mb-6 bg-accent/10 border-accent">
          <div className="flex items-center gap-3">
            <Zap className="h-5 w-5 text-accent flex-shrink-0" />
            <div className="flex-1">
              <p className="font-semibold text-sm">Surge Pricing Active - 1.5x Earnings!</p>
              <p className="text-xs text-muted-foreground">High demand for CS 101 right now. Earn $1.88/minute.</p>
            </div>
            <Badge variant="default" className="bg-accent text-accent-foreground">
              Peak Hours
            </Badge>
          </div>
        </Card>
      )}

      {/* Earnings Overview */}
      <div className="grid gap-4 md:grid-cols-4 mb-8">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">Available Balance</span>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </div>
          <p className="text-3xl font-bold mb-3">$342.50</p>
          <Button size="sm" className="w-full">
            Cash Out Now
          </Button>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">This Week</span>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </div>
          <p className="text-3xl font-bold">$156.25</p>
          <p className="text-xs text-muted-foreground mt-1">+23% from last week</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">Total Sessions</span>
            <Users className="h-4 w-4 text-muted-foreground" />
          </div>
          <p className="text-3xl font-bold">179</p>
          <p className="text-xs text-muted-foreground mt-1">12 this week</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">Avg Rating</span>
            <Star className="h-4 w-4 text-muted-foreground" />
          </div>
          <p className="text-3xl font-bold">4.9</p>
          <p className="text-xs text-muted-foreground mt-1">Out of 5.0</p>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="sessions" className="space-y-6">
        <TabsList>
          <TabsTrigger value="sessions">Recent Sessions</TabsTrigger>
          <TabsTrigger value="courses">Course Performance</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
        </TabsList>

        <TabsContent value="sessions" className="space-y-4">
          {recentSessions.map((session) => (
            <Card key={session.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold mb-1">{session.topic}</h3>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span>{session.student}</span>
                    <span>•</span>
                    <span>{session.course}</span>
                    <span>•</span>
                    <span>{new Date(session.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="secondary" className="text-xs">
                      {session.duration}
                    </Badge>
                    <Badge variant="default" className="text-xs">
                      {session.earnings}
                    </Badge>
                    {session.tip && (
                      <Badge variant="outline" className="text-xs border-accent text-accent">
                        +{session.tip} tip
                      </Badge>
                    )}
                    {session.rating && (
                      <div className="flex items-center gap-1">
                        {Array.from({ length: session.rating }).map((_, i) => (
                          <Star key={i} className="h-3 w-3 fill-primary text-primary" />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                  <Download className="h-4 w-4" />
                  Transcript
                </Button>
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="courses" className="space-y-4">
          {courseStats.map((course) => (
            <Card key={course.course} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-lg">{course.course}</h3>
                    {course.badge === "verified" ? (
                      <Badge variant="default" className="gap-1">
                        <CheckCircle2 className="h-3 w-3" />
                        Verified
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="gap-1">
                        <AlertCircle className="h-3 w-3" />
                        Pending Review
                      </Badge>
                    )}
                  </div>
                  <div className="grid grid-cols-3 gap-6 mt-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Rating</p>
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 fill-primary text-primary" />
                        <span className="text-2xl font-bold">{course.rating}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Sessions</p>
                      <p className="text-2xl font-bold">{course.sessions}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Total Earnings</p>
                      <p className="text-2xl font-bold">{course.earnings}</p>
                    </div>
                  </div>
                </div>
              </div>
              {course.badge === "pending" && (
                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    Complete your assessment to start accepting sessions for this course
                  </p>
                  <Button size="sm" variant="outline" className="mt-2 bg-transparent">
                    Take Assessment
                  </Button>
                </div>
              )}
            </Card>
          ))}

          <Card className="p-6 bg-secondary/30">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold mb-1">Add More Courses</h3>
                <p className="text-sm text-muted-foreground">Expand your tutoring opportunities</p>
              </div>
              <Button variant="outline" className="bg-transparent">
                Browse Courses
              </Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-semibold mb-1">Availability Blocks</h3>
                <p className="text-sm text-muted-foreground">Set when you're available to tutor</p>
              </div>
              <Button variant="outline" className="bg-transparent">
                <Calendar className="h-4 w-4 mr-2" />
                Add Block
              </Button>
            </div>

            <div className="space-y-3">
              <Card className="p-4 bg-secondary/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Monday - Friday</p>
                    <p className="text-sm text-muted-foreground">2:00 PM - 8:00 PM</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="default">Active</Badge>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </div>
                </div>
              </Card>

              <Card className="p-4 bg-secondary/30">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Saturday - Sunday</p>
                    <p className="text-sm text-muted-foreground">10:00 AM - 6:00 PM</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="default">Active</Badge>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </Card>

          <Card className="p-6 bg-primary/5 border-primary/20">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Peak Hours This Week</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Monday 6-8 PM: High demand for CS courses</li>
                  <li>• Wednesday 4-7 PM: Math tutoring surge expected</li>
                  <li>• Sunday 2-6 PM: Exam prep sessions peak</li>
                </ul>
                <p className="text-xs text-muted-foreground mt-3">
                  Be online during peak hours to maximize earnings with surge pricing
                </p>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3 mt-8">
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Clock className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Avg Response Time</p>
              <p className="text-xl font-bold">42s</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">Below 60s target</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Session Completion</p>
              <p className="text-xl font-bold">98%</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">Excellent reliability</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Star className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Student Satisfaction</p>
              <p className="text-xl font-bold">96%</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">4.9+ avg rating</p>
        </Card>
      </div>
    </div>
  )
}
