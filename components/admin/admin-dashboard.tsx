"use client"

import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Users,
  Video,
  DollarSign,
  AlertTriangle,
  TrendingUp,
  Clock,
  Search,
  MoreVertical,
  CheckCircle2,
  XCircle,
  Eye,
  Ban,
} from "lucide-react"

const liveSessionsData = [
  {
    id: "sess_001",
    student: "Alice Chen",
    tutor: "Dr. Smith",
    course: "CS 101",
    duration: "12:34",
    status: "active",
    flagged: false,
  },
  {
    id: "sess_002",
    student: "Bob Wilson",
    tutor: "Prof. Johnson",
    course: "MATH 221",
    duration: "08:15",
    status: "active",
    flagged: true,
  },
  {
    id: "sess_003",
    student: "Carol Davis",
    tutor: "Dr. Lee",
    course: "PHYS 201",
    duration: "23:47",
    status: "active",
    flagged: false,
  },
  {
    id: "sess_004",
    student: "David Kim",
    tutor: "Prof. Martinez",
    course: "CHEM 142",
    duration: "05:22",
    status: "active",
    flagged: false,
  },
]

const recentDisputesData = [
  {
    id: "disp_001",
    student: "Emma Brown",
    tutor: "Dr. Taylor",
    amount: "$18.75",
    reason: "Poor quality",
    status: "pending",
    date: "2h ago",
  },
  {
    id: "disp_002",
    student: "Frank Miller",
    tutor: "Prof. Anderson",
    amount: "$31.25",
    reason: "Connection issues",
    status: "resolved",
    date: "5h ago",
  },
  {
    id: "disp_003",
    student: "Grace Lee",
    tutor: "Dr. White",
    amount: "$12.50",
    reason: "Tutor no-show",
    status: "pending",
    date: "1d ago",
  },
]

const tutorVerificationData = [
  { id: "tutor_001", name: "Sarah Johnson", school: "MIT", courses: 3, status: "pending", submitted: "2h ago" },
  { id: "tutor_002", name: "Michael Chen", school: "Stanford", courses: 5, status: "pending", submitted: "4h ago" },
  { id: "tutor_003", name: "Emily Davis", school: "Harvard", courses: 2, status: "pending", submitted: "1d ago" },
]

export function AdminDashboard() {
  return (
    <div className="container py-8 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">Monitor platform activity and manage operations</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <div className="flex items-center justify-between mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20">
              <Video className="h-6 w-6 text-primary" />
            </div>
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
              Live
            </Badge>
          </div>
          <div className="text-3xl font-bold mb-1">47</div>
          <div className="text-sm text-muted-foreground">Active Sessions</div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
          <div className="flex items-center justify-between mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/20">
              <Users className="h-6 w-6 text-accent" />
            </div>
            <TrendingUp className="h-5 w-5 text-accent" />
          </div>
          <div className="text-3xl font-bold mb-1">1,247</div>
          <div className="text-sm text-muted-foreground">Active Users (24h)</div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <div className="flex items-center justify-between mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20">
              <DollarSign className="h-6 w-6 text-primary" />
            </div>
            <TrendingUp className="h-5 w-5 text-primary" />
          </div>
          <div className="text-3xl font-bold mb-1">$12.4K</div>
          <div className="text-sm text-muted-foreground">Revenue (24h)</div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-destructive/10 to-destructive/5 border-destructive/20">
          <div className="flex items-center justify-between mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-destructive/20">
              <AlertTriangle className="h-6 w-6 text-destructive" />
            </div>
            <Badge variant="destructive" className="bg-destructive/10 text-destructive border-destructive/20">
              Urgent
            </Badge>
          </div>
          <div className="text-3xl font-bold mb-1">3</div>
          <div className="text-sm text-muted-foreground">Pending Disputes</div>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="sessions" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-auto">
          <TabsTrigger value="sessions" className="py-3">
            Live Sessions
          </TabsTrigger>
          <TabsTrigger value="disputes" className="py-3">
            Disputes
          </TabsTrigger>
          <TabsTrigger value="tutors" className="py-3">
            Tutor Verification
          </TabsTrigger>
          <TabsTrigger value="analytics" className="py-3">
            Analytics
          </TabsTrigger>
        </TabsList>

        {/* Live Sessions Tab */}
        <TabsContent value="sessions" className="space-y-4">
          <Card className="p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl font-semibold mb-1">Live Sessions</h2>
                <p className="text-sm text-muted-foreground">Monitor active tutoring sessions in real-time</p>
              </div>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search sessions..." className="pl-9" />
              </div>
            </div>

            <div className="space-y-3">
              {liveSessionsData.map((session) => (
                <Card
                  key={session.id}
                  className={`p-4 ${session.flagged ? "border-destructive/50 bg-destructive/5" : ""}`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="outline" className="font-mono text-xs">
                          {session.id}
                        </Badge>
                        <Badge className="bg-primary/10 text-primary border-primary/20">{session.course}</Badge>
                        {session.flagged && (
                          <Badge
                            variant="destructive"
                            className="bg-destructive/10 text-destructive border-destructive/20"
                          >
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            Flagged
                          </Badge>
                        )}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-muted-foreground">Student:</span>{" "}
                          <span className="font-medium">{session.student}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Tutor:</span>{" "}
                          <span className="font-medium">{session.tutor}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="font-mono font-medium">{session.duration}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-1" />
                          Monitor
                        </Button>
                        <Button size="sm" variant="ghost">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Disputes Tab */}
        <TabsContent value="disputes" className="space-y-4">
          <Card className="p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-1">Recent Disputes</h2>
              <p className="text-sm text-muted-foreground">Review and resolve payment disputes</p>
            </div>

            <div className="space-y-3">
              {recentDisputesData.map((dispute) => (
                <Card key={dispute.id} className="p-4">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="outline" className="font-mono text-xs">
                          {dispute.id}
                        </Badge>
                        {dispute.status === "pending" ? (
                          <Badge className="bg-amber-500/10 text-amber-700 border-amber-500/20">Pending Review</Badge>
                        ) : (
                          <Badge className="bg-primary/10 text-primary border-primary/20">
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            Resolved
                          </Badge>
                        )}
                        <span className="text-xs text-muted-foreground">{dispute.date}</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
                        <div>
                          <span className="text-muted-foreground">Student:</span>{" "}
                          <span className="font-medium">{dispute.student}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Tutor:</span>{" "}
                          <span className="font-medium">{dispute.tutor}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Amount:</span>{" "}
                          <span className="font-medium">{dispute.amount}</span>
                        </div>
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">Reason:</span> <span>{dispute.reason}</span>
                      </div>
                    </div>
                    {dispute.status === "pending" && (
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="text-primary border-primary/30 bg-transparent">
                          <CheckCircle2 className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-destructive border-destructive/30 bg-transparent"
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Tutor Verification Tab */}
        <TabsContent value="tutors" className="space-y-4">
          <Card className="p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-1">Tutor Verification Queue</h2>
              <p className="text-sm text-muted-foreground">Review and approve new tutor applications</p>
            </div>

            <div className="space-y-3">
              {tutorVerificationData.map((tutor) => (
                <Card key={tutor.id} className="p-4">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="outline" className="font-mono text-xs">
                          {tutor.id}
                        </Badge>
                        <Badge className="bg-amber-500/10 text-amber-700 border-amber-500/20">Pending Review</Badge>
                        <span className="text-xs text-muted-foreground">Submitted {tutor.submitted}</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
                        <div>
                          <span className="text-muted-foreground">Name:</span>{" "}
                          <span className="font-medium">{tutor.name}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">School:</span>{" "}
                          <span className="font-medium">{tutor.school}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Courses:</span>{" "}
                          <span className="font-medium">{tutor.courses} selected</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-1" />
                        Review
                      </Button>
                      <Button size="sm" className="bg-primary text-primary-foreground">
                        <CheckCircle2 className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-destructive border-destructive/30 bg-transparent"
                      >
                        <Ban className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Platform Metrics (7 days)</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <span className="text-sm text-muted-foreground">Total Sessions</span>
                  <span className="text-lg font-bold">1,847</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <span className="text-sm text-muted-foreground">Avg Session Duration</span>
                  <span className="text-lg font-bold">18:32</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <span className="text-sm text-muted-foreground">Total Revenue</span>
                  <span className="text-lg font-bold">$86,742</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <span className="text-sm text-muted-foreground">Active Tutors</span>
                  <span className="text-lg font-bold">342</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <span className="text-sm text-muted-foreground">Active Students</span>
                  <span className="text-lg font-bold">1,289</span>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">SLA Performance</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">p50 Connect Time</span>
                    <span className="text-sm font-semibold text-primary">18s</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: "60%" }} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">p90 Connect Time</span>
                    <span className="text-sm font-semibold text-primary">28s</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: "93%" }} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">p99 Connect Time</span>
                    <span className="text-sm font-semibold text-accent">45s</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-accent" style={{ width: "75%" }} />
                  </div>
                </div>
                <div className="pt-4 border-t border-border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Success Rate</span>
                    <span className="text-sm font-semibold text-primary">98.7%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: "98.7%" }} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Avg Rating</span>
                    <span className="text-sm font-semibold text-primary">4.8/5.0</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: "96%" }} />
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 lg:col-span-2">
              <h3 className="text-lg font-semibold mb-4">Top Courses by Volume</h3>
              <div className="space-y-3">
                {[
                  { course: "CS 101 - Intro to Computer Science", sessions: 247, revenue: "$9,234" },
                  { course: "MATH 221 - Calculus I", sessions: 189, revenue: "$7,056" },
                  { course: "PHYS 201 - Physics I", sessions: 156, revenue: "$5,824" },
                  { course: "CHEM 142 - General Chemistry", sessions: 134, revenue: "$5,002" },
                  { course: "CS 102 - Data Structures", sessions: 98, revenue: "$3,658" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                    <div className="flex-1">
                      <div className="font-medium text-sm mb-1">{item.course}</div>
                      <div className="text-xs text-muted-foreground">{item.sessions} sessions</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-primary">{item.revenue}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
