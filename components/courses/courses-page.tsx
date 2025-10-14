"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Clock, Users, TrendingUp, CheckCircle2 } from "lucide-react"
import Link from "next/link"

const schools = [
  { name: "MIT", courses: 45 },
  { name: "Stanford", courses: 52 },
  { name: "Harvard", courses: 38 },
  { name: "Berkeley", courses: 41 },
  { name: "Princeton", courses: 29 },
  { name: "Yale", courses: 33 },
]

const courses = [
  {
    code: "CS 101",
    name: "Introduction to Computer Science",
    school: "MIT",
    tutorsOnline: 12,
    p90Time: 24,
    coverageHours: "24/7",
    popularity: "high",
  },
  {
    code: "CS 102",
    name: "Data Structures and Algorithms",
    school: "MIT",
    tutorsOnline: 8,
    p90Time: 28,
    coverageHours: "8 AM - 12 AM",
    popularity: "high",
  },
  {
    code: "MATH 221",
    name: "Calculus I",
    school: "Stanford",
    tutorsOnline: 15,
    p90Time: 22,
    coverageHours: "24/7",
    popularity: "high",
  },
  {
    code: "MATH 222",
    name: "Calculus II",
    school: "Stanford",
    tutorsOnline: 9,
    p90Time: 31,
    coverageHours: "7 AM - 11 PM",
    popularity: "medium",
  },
  {
    code: "PHYS 201",
    name: "Physics I: Mechanics",
    school: "Berkeley",
    tutorsOnline: 6,
    p90Time: 35,
    coverageHours: "9 AM - 10 PM",
    popularity: "medium",
  },
  {
    code: "CHEM 142",
    name: "General Chemistry",
    school: "Harvard",
    tutorsOnline: 11,
    p90Time: 26,
    coverageHours: "24/7",
    popularity: "high",
  },
  {
    code: "ECON 101",
    name: "Principles of Microeconomics",
    school: "Princeton",
    tutorsOnline: 5,
    p90Time: 38,
    coverageHours: "10 AM - 9 PM",
    popularity: "medium",
  },
  {
    code: "BIO 101",
    name: "Introduction to Biology",
    school: "Yale",
    tutorsOnline: 7,
    p90Time: 29,
    coverageHours: "8 AM - 11 PM",
    popularity: "medium",
  },
]

export function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSchool, setSelectedSchool] = useState<string>("all")

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSchool = selectedSchool === "all" || course.school === selectedSchool
    return matchesSearch && matchesSchool
  })

  return (
    <div className="container py-12">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Course Coverage</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse available courses across top universities. See real-time tutor availability and connection times.
          </p>
        </div>

        {/* School Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {schools.map((school) => (
            <Card
              key={school.name}
              className="p-4 text-center hover:border-primary/50 transition-colors cursor-pointer"
            >
              <p className="font-semibold mb-1">{school.name}</p>
              <p className="text-sm text-muted-foreground">{school.courses} courses</p>
            </Card>
          ))}
        </div>

        {/* Search and Filters */}
        <Card className="p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search courses by code or name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedSchool} onValueChange={setSelectedSchool}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="All Schools" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Schools</SelectItem>
                {schools.map((school) => (
                  <SelectItem key={school.name} value={school.name}>
                    {school.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Course List */}
        <div className="space-y-4">
          {filteredCourses.map((course) => (
            <Card key={`${course.school}-${course.code}`} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-lg">{course.code}</h3>
                    <Badge variant="outline">{course.school}</Badge>
                    {course.popularity === "high" && (
                      <Badge variant="default" className="gap-1">
                        <TrendingUp className="h-3 w-3" />
                        Popular
                      </Badge>
                    )}
                  </div>
                  <p className="text-muted-foreground mb-3">{course.name}</p>

                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-primary" />
                      <span>
                        <span className="font-semibold">{course.tutorsOnline}</span> tutors online
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <span>
                        <span className="font-semibold">{course.p90Time}s</span> avg connect time
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span>Coverage: {course.coverageHours}</span>
                    </div>
                  </div>
                </div>

                <Button asChild>
                  <Link href="/student/find-tutor">Find Tutor</Link>
                </Button>
              </div>

              {course.p90Time <= 30 && (
                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    Meets our 30-second connection guarantee
                  </p>
                </div>
              )}
            </Card>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <Card className="p-12 text-center">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold mb-2">No courses found</h3>
            <p className="text-sm text-muted-foreground mb-4">Try adjusting your search or filters</p>
          </Card>
        )}

        {/* Request Course */}
        <Card className="p-6 mt-8 bg-secondary/30">
          <div className="text-center">
            <h3 className="font-semibold mb-2">Don't see your course?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Request coverage for a new course and we'll work to add qualified tutors
            </p>
            <Button variant="outline" className="bg-transparent">
              Request a Course
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
