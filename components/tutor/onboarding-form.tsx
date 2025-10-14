"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Upload, X, CheckCircle2, AlertCircle, DollarSign, Sparkles } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { useRouter } from "next/navigation"

const schools = ["MIT", "Stanford", "Harvard", "Berkeley", "Princeton", "Yale", "Columbia", "Cornell", "UPenn", "Other"]

const availableCourses = [
  { code: "CS 101", name: "Intro to Computer Science" },
  { code: "CS 102", name: "Data Structures" },
  { code: "CS 201", name: "Algorithms" },
  { code: "MATH 221", name: "Calculus I" },
  { code: "MATH 222", name: "Calculus II" },
  { code: "PHYS 201", name: "Physics I" },
  { code: "CHEM 142", name: "General Chemistry" },
  { code: "ECON 101", name: "Microeconomics" },
]

export function TutorOnboardingForm() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const totalSteps = 5

  // Step 1: Personal Info
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")

  // Step 2: ID Verification
  const [idDocument, setIdDocument] = useState<File | null>(null)
  const [idVerified, setIdVerified] = useState(false)

  // Step 3: School Verification
  const [school, setSchool] = useState("")
  const [studentId, setStudentId] = useState("")
  const [transcript, setTranscript] = useState<File | null>(null)

  // Step 4: Course Selection
  const [selectedCourses, setSelectedCourses] = useState<string[]>([])

  // Step 5: Policies
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [agreedToBackground, setAgreedToBackground] = useState(false)
  const [agreedToConduct, setAgreedToConduct] = useState(false)

  const handleIdUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIdDocument(e.target.files[0])
      // Simulate verification
      setTimeout(() => setIdVerified(true), 1500)
    }
  }

  const handleTranscriptUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setTranscript(e.target.files[0])
    }
  }

  const toggleCourse = (courseCode: string) => {
    if (selectedCourses.includes(courseCode)) {
      setSelectedCourses(selectedCourses.filter((c) => c !== courseCode))
    } else {
      setSelectedCourses([...selectedCourses, courseCode])
    }
  }

  const handleComplete = () => {
    router.push("/tutor/dashboard")
  }

  const progress = (step / totalSteps) * 100

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="p-6 bg-gradient-to-br from-card to-primary/5 border-primary/20 shadow-lg">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-primary">
              Step {step} of {totalSteps}
            </span>
            <span className="text-sm font-medium text-muted-foreground">{Math.round(progress)}% complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {step === 1 && (
          <div className="space-y-6 animate-scale-in">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Let's get started</h2>
              <p className="text-sm text-muted-foreground">Tell us a bit about yourself</p>
            </div>

            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                placeholder="John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@university.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2"
              />
              <p className="text-xs text-muted-foreground mt-1.5">Use your university email if possible</p>
            </div>

            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-2"
              />
            </div>

            <Button
              className="w-full shadow-md hover:shadow-lg transition-all"
              size="lg"
              onClick={() => setStep(2)}
              disabled={!fullName || !email || !phone}
            >
              Continue
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-scale-in">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Verify your identity</h2>
              <p className="text-sm text-muted-foreground">Quick and secure verification process</p>
            </div>

            <div>
              <Label>Upload ID Document</Label>
              <div className="mt-2">
                {idDocument ? (
                  <Card className="p-4">
                    <div className="flex items-center gap-3">
                      {idVerified ? (
                        <CheckCircle2 className="h-8 w-8 text-primary flex-shrink-0" />
                      ) : (
                        <AlertCircle className="h-8 w-8 text-muted-foreground flex-shrink-0 animate-pulse" />
                      )}
                      <div className="flex-1">
                        <p className="text-sm font-medium truncate">{idDocument.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {idVerified ? "Verified successfully" : "Verifying..."}
                        </p>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => setIdDocument(null)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                ) : (
                  <label className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary/50 transition-colors">
                    <Upload className="h-10 w-10 text-muted-foreground mb-3" />
                    <span className="text-sm font-medium mb-1">Upload ID Document</span>
                    <span className="text-xs text-muted-foreground">Driver's license, passport, or state ID</span>
                    <input type="file" className="hidden" accept="image/*,.pdf" onChange={handleIdUpload} />
                  </label>
                )}
              </div>
            </div>

            <Card className="p-4 bg-muted/50">
              <p className="text-sm text-muted-foreground leading-relaxed">
                Your ID is used to verify your identity and ensure platform safety. All information is encrypted and
                stored securely.
              </p>
            </Card>

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1 bg-background hover:bg-muted" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button
                className="flex-1 shadow-md hover:shadow-lg transition-all"
                onClick={() => setStep(3)}
                disabled={!idVerified}
              >
                Continue
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-scale-in">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-2">School verification</h2>
              <p className="text-sm text-muted-foreground">Confirm your academic credentials</p>
            </div>

            <div>
              <Label htmlFor="school">School / University</Label>
              <Select value={school} onValueChange={setSchool}>
                <SelectTrigger id="school" className="mt-2">
                  <SelectValue placeholder="Select your school" />
                </SelectTrigger>
                <SelectContent>
                  {schools.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="studentId">Student ID (Optional)</Label>
              <Input
                id="studentId"
                placeholder="123456789"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                className="mt-2"
              />
            </div>

            <div>
              <Label>Upload Transcript or Enrollment Proof</Label>
              <div className="mt-2">
                {transcript ? (
                  <div className="flex items-center gap-3 p-3 border border-border rounded-lg">
                    <div className="flex-1 text-sm truncate">{transcript.name}</div>
                    <Button variant="ghost" size="sm" onClick={() => setTranscript(null)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary/50 transition-colors">
                    <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                    <span className="text-sm text-muted-foreground">Click to upload transcript or proof</span>
                    <input type="file" className="hidden" accept="image/*,.pdf" onChange={handleTranscriptUpload} />
                  </label>
                )}
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1 bg-background hover:bg-muted" onClick={() => setStep(2)}>
                Back
              </Button>
              <Button
                className="flex-1 shadow-md hover:shadow-lg transition-all"
                onClick={() => setStep(4)}
                disabled={!school || !transcript}
              >
                Continue
              </Button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6 animate-scale-in">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Choose your courses</h2>
              <p className="text-sm text-muted-foreground">Select subjects you're qualified to teach</p>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
              {availableCourses.map((course) => (
                <Card
                  key={course.code}
                  className={`p-5 cursor-pointer transition-all hover:scale-[1.02] ${
                    selectedCourses.includes(course.code)
                      ? "border-primary bg-primary/10 shadow-md"
                      : "hover:border-primary/50 hover:shadow-sm"
                  }`}
                  onClick={() => toggleCourse(course.code)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-base">{course.code}</p>
                      <p className="text-sm text-muted-foreground">{course.name}</p>
                    </div>
                    {selectedCourses.includes(course.code) && (
                      <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0" />
                    )}
                  </div>
                </Card>
              ))}
            </div>

            <Card className="p-4 bg-secondary/30">
              <p className="text-sm font-medium mb-2">Assessment Required</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                After signup, you'll complete a short assessment for each selected course to verify your expertise.
              </p>
            </Card>

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1 bg-background hover:bg-muted" onClick={() => setStep(3)}>
                Back
              </Button>
              <Button
                className="flex-1 shadow-md hover:shadow-lg transition-all"
                onClick={() => setStep(5)}
                disabled={selectedCourses.length === 0}
              >
                Continue
              </Button>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-6 animate-scale-in">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Almost there!</h2>
              <p className="text-sm text-muted-foreground">Review and accept our policies</p>
            </div>

            <Card className="p-6 space-y-4">
              <div className="flex items-start gap-3">
                <Checkbox
                  id="terms"
                  checked={agreedToTerms}
                  onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <Label htmlFor="terms" className="cursor-pointer font-medium">
                    Terms of Service
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    I agree to Tuno's terms of service and tutor agreement
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Checkbox
                  id="background"
                  checked={agreedToBackground}
                  onCheckedChange={(checked) => setAgreedToBackground(checked as boolean)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <Label htmlFor="background" className="cursor-pointer font-medium">
                    Background Check Consent
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    I consent to a background check for platform safety
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Checkbox
                  id="conduct"
                  checked={agreedToConduct}
                  onCheckedChange={(checked) => setAgreedToConduct(checked as boolean)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <Label htmlFor="conduct" className="cursor-pointer font-medium">
                    Code of Conduct
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    I agree to maintain professional conduct and follow community guidelines
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/30 shadow-md">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/20 flex-shrink-0">
                  <DollarSign className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-3">Your earning potential</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span>Earn $1.25/minute for tutoring sessions</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span>Instant cash-out available after each session</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span>Surge pricing during peak hours (up to 1.5x)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span>Keep 100% of tips from students</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1 bg-background hover:bg-muted" onClick={() => setStep(4)}>
                Back
              </Button>
              <Button
                className="flex-1 shadow-lg hover:shadow-xl transition-all"
                size="lg"
                onClick={handleComplete}
                disabled={!agreedToTerms || !agreedToBackground || !agreedToConduct}
              >
                Complete Signup
              </Button>
            </div>
          </div>
        )}
      </Card>

      <Card className="p-5 bg-muted/50 border-border/50">
        <div className="flex items-start gap-3 text-sm text-muted-foreground">
          <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            Your application will be reviewed within 24-48 hours. You'll receive an email once approved to start
            tutoring.
          </p>
        </div>
      </Card>
    </div>
  )
}
