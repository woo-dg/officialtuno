"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, TrendingDown } from "lucide-react"
import { useEffect, useState } from "react"

interface CourseStats {
  course: string
  school: string
  p90Time: number
  tutorsOnline: number
}

// Mock data - in production this would come from an API
const mockCourseStats: CourseStats[] = [
  { course: "CS 101", school: "MIT", p90Time: 24, tutorsOnline: 12 },
  { course: "MATH 221", school: "Stanford", p90Time: 28, tutorsOnline: 8 },
  { course: "PHYS 201", school: "Berkeley", p90Time: 31, tutorsOnline: 5 },
  { course: "CHEM 142", school: "Harvard", p90Time: 26, tutorsOnline: 9 },
]

export function LiveSLAWidget() {
  const [stats, setStats] = useState<CourseStats[]>(mockCourseStats)

  useEffect(() => {
    // Simulate live updates
    const interval = setInterval(() => {
      setStats((prev) =>
        prev.map((stat) => ({
          ...stat,
          p90Time: Math.max(15, Math.min(35, stat.p90Time + (Math.random() - 0.5) * 4)),
          tutorsOnline: Math.max(3, Math.min(15, stat.tutorsOnline + Math.floor((Math.random() - 0.5) * 3))),
        })),
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="container py-20">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            <TrendingDown className="mr-1.5 h-3.5 w-3.5" />
            Live Stats
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Real-Time Availability</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See current connection times and tutor availability by course and campus.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{stat.course}</h3>
                  <p className="text-sm text-muted-foreground">{stat.school}</p>
                </div>
                <Badge variant={stat.tutorsOnline > 7 ? "default" : "secondary"}>{stat.tutorsOnline} online</Badge>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <span className="text-2xl font-bold">{Math.round(stat.p90Time)}s</span>
                <span className="text-sm text-muted-foreground">p90 connect time</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
