import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Star, BookOpen, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SessionInfoProps {
  isStudent: boolean
}

export function SessionInfo({ isStudent }: SessionInfoProps) {
  const tutor = {
    name: "Alex Thompson",
    rating: 4.9,
    course: "CS 101",
    school: "MIT",
  }

  const student = {
    name: "Sarah Chen",
    course: "CS 101",
    school: "MIT",
  }

  const sessionDetails = {
    topic: "Algorithm Complexity",
    description: "Need help understanding Big O notation and analyzing time complexity of recursive algorithms.",
    tags: ["Homework Help", "Concept Review"],
  }

  return (
    <div className="p-4 space-y-4">
      {/* Participant Info */}
      <Card className="p-4">
        <div className="flex items-start gap-3 mb-3">
          <Avatar className="h-12 w-12">
            <AvatarFallback className="bg-primary text-primary-foreground">
              {isStudent
                ? tutor.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                : student.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="font-semibold">{isStudent ? tutor.name : student.name}</h3>
            <p className="text-sm text-muted-foreground">
              {isStudent ? tutor.course : student.course} • {isStudent ? tutor.school : student.school}
            </p>
            {isStudent && (
              <div className="flex items-center gap-1 mt-1">
                <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                <span className="text-sm font-medium">{tutor.rating}</span>
              </div>
            )}
          </div>
        </div>
        {isStudent && (
          <Button variant="outline" size="sm" className="w-full bg-transparent">
            View Profile
          </Button>
        )}
      </Card>

      {/* Session Details */}
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <BookOpen className="h-4 w-4 text-primary" />
          <h3 className="font-semibold">Session Details</h3>
        </div>
        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium mb-1">{sessionDetails.topic}</p>
            <p className="text-sm text-muted-foreground leading-relaxed">{sessionDetails.description}</p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {sessionDetails.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </Card>

      {/* AI Pre-Brief (for tutors) */}
      {!isStudent && (
        <Card className="p-4 bg-primary/5 border-primary/20">
          <div className="flex items-start gap-2 mb-2">
            <AlertCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
            <h3 className="font-semibold text-sm">AI Pre-Brief</h3>
          </div>
          <ul className="space-y-1.5 text-sm text-muted-foreground">
            <li>• Student is working on CS 101 homework assignment</li>
            <li>• Focus on Big O notation and recursive algorithms</li>
            <li>• May need visual examples and step-by-step breakdown</li>
            <li>• Previous session covered basic data structures</li>
          </ul>
        </Card>
      )}

      {/* Quick Actions */}
      <Card className="p-4">
        <h3 className="font-semibold text-sm mb-3">Quick Actions</h3>
        <div className="space-y-2">
          <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
            Share Screen
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
            Upload File
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
            Take Snapshot
          </Button>
        </div>
      </Card>
    </div>
  )
}
