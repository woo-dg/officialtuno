"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Upload, X, CreditCard, Sparkles, Zap } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { MatchingModal } from "./matching-modal"

const schools = ["MIT", "Stanford", "Harvard", "Berkeley", "Princeton", "Yale", "Columbia", "Cornell", "UPenn", "Other"]

const topicSuggestions = [
  "Homework Help",
  "Exam Prep",
  "Concept Review",
  "Problem Set",
  "Lab Report",
  "Project Help",
  "Debugging",
  "Theory",
]

export function StudentOnboardingForm() {
  const [step, setStep] = useState(1)
  const [school, setSchool] = useState("")
  const [courseCode, setCourseCode] = useState("")
  const [topics, setTopics] = useState<string[]>([])
  const [customTopic, setCustomTopic] = useState("")
  const [description, setDescription] = useState("")
  const [screenshot, setScreenshot] = useState<File | null>(null)
  const [paymentSetup, setPaymentSetup] = useState(false)
  const [showMatching, setShowMatching] = useState(false)

  const addTopic = (topic: string) => {
    if (!topics.includes(topic) && topics.length < 3) {
      setTopics([...topics, topic])
    }
  }

  const removeTopic = (topic: string) => {
    setTopics(topics.filter((t) => t !== topic))
  }

  const handleScreenshotUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setScreenshot(e.target.files[0])
    }
  }

  const handleFindTutor = () => {
    setShowMatching(true)
  }

  return (
    <>
      <Card className="p-6 md:p-8 shadow-xl border-primary/20 animate-scale-in">
        {step === 1 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-2">What do you need help with?</h2>
              <p className="text-sm text-muted-foreground">We'll match you with the perfect tutor</p>
            </div>

            <div>
              <Label htmlFor="school" className="text-base font-semibold">
                School / University
              </Label>
              <Select value={school} onValueChange={setSchool}>
                <SelectTrigger id="school" className="mt-2 h-12">
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
              <Label htmlFor="course" className="text-base font-semibold">
                Course Code
              </Label>
              <Input
                id="course"
                placeholder="e.g., CS 101, MATH 221, PHYS 201"
                value={courseCode}
                onChange={(e) => setCourseCode(e.target.value)}
                className="mt-2 h-12"
              />
              <p className="text-xs text-muted-foreground mt-2">Enter your exact course code for best matching</p>
            </div>

            <div>
              <Label className="text-base font-semibold">Topic Tags</Label>
              <div className="flex flex-wrap gap-2 mt-3 mb-4">
                {topicSuggestions.map((topic) => (
                  <Badge
                    key={topic}
                    variant={topics.includes(topic) ? "default" : "outline"}
                    className="cursor-pointer px-4 py-2 text-sm hover:scale-105 transition-transform"
                    onClick={() => (topics.includes(topic) ? removeTopic(topic) : addTopic(topic))}
                  >
                    {topic}
                    {topics.includes(topic) && <X className="ml-1.5 h-3.5 w-3.5" />}
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Add custom topic"
                  value={customTopic}
                  onChange={(e) => setCustomTopic(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && customTopic.trim()) {
                      addTopic(customTopic.trim())
                      setCustomTopic("")
                    }
                  }}
                  className="h-11"
                />
                <Button
                  variant="outline"
                  onClick={() => {
                    if (customTopic.trim()) {
                      addTopic(customTopic.trim())
                      setCustomTopic("")
                    }
                  }}
                  disabled={topics.length >= 3}
                  className="px-6"
                >
                  Add
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Select up to 3 topics</p>
            </div>

            <div>
              <Label htmlFor="description" className="text-base font-semibold">
                Problem Description (Optional)
              </Label>
              <Textarea
                id="description"
                placeholder="Briefly describe what you're stuck on..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-2 min-h-28 resize-none"
              />
            </div>

            <div>
              <Label className="text-base font-semibold">Upload Screenshot (Optional)</Label>
              <div className="mt-2">
                {screenshot ? (
                  <div className="flex items-center gap-3 p-4 border-2 border-primary/30 bg-primary/5 rounded-xl">
                    <div className="flex-1 text-sm font-medium truncate">{screenshot.name}</div>
                    <Button variant="ghost" size="sm" onClick={() => setScreenshot(null)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center h-36 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all">
                    <Upload className="h-10 w-10 text-muted-foreground mb-3" />
                    <span className="text-sm font-medium mb-1">Click to upload or drag and drop</span>
                    <span className="text-xs text-muted-foreground">PNG, JPG up to 10MB</span>
                    <input type="file" className="hidden" accept="image/*" onChange={handleScreenshotUpload} />
                  </label>
                )}
              </div>
            </div>

            <Button
              className="w-full shadow-lg hover:shadow-xl transition-all"
              size="lg"
              onClick={() => setStep(2)}
              disabled={!school || !courseCode}
            >
              Continue to Payment
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-scale-in">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
                <CreditCard className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Secure payment</h2>
              <p className="text-sm text-muted-foreground">You'll only be charged for time used. Cancel anytime.</p>
            </div>

            <Card className="p-6 bg-gradient-to-br from-primary/10 to-accent/5 border-primary/30 shadow-md">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Rate:</span>
                  <span className="font-bold text-lg text-primary">$1.25/minute</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Minimum:</span>
                  <span className="font-semibold">5 minutes ($6.25)</span>
                </div>
                <div className="h-px bg-border my-2" />
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Authorization hold:</span>
                  <span className="font-semibold">$25.00</span>
                </div>
              </div>
            </Card>

            <div className="space-y-4">
              <div>
                <Label htmlFor="card" className="text-base font-semibold">
                  Card Number
                </Label>
                <Input id="card" placeholder="4242 4242 4242 4242" className="mt-2 h-12" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiry" className="text-base font-semibold">
                    Expiry
                  </Label>
                  <Input id="expiry" placeholder="MM/YY" className="mt-2 h-12" />
                </div>
                <div>
                  <Label htmlFor="cvc" className="text-base font-semibold">
                    CVC
                  </Label>
                  <Input id="cvc" placeholder="123" className="mt-2 h-12" />
                </div>
              </div>
            </div>

            <div className="bg-muted/50 p-5 rounded-xl text-sm border border-border/50">
              <p className="text-muted-foreground leading-relaxed">
                Your payment is held in escrow and only released after the session. You can dispute charges within 24
                hours. All payments are secured by Stripe.
              </p>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1 bg-background hover:bg-muted h-12" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button
                className="flex-1 shadow-lg hover:shadow-xl transition-all h-12 text-base"
                onClick={() => {
                  setPaymentSetup(true)
                  handleFindTutor()
                }}
              >
                <Zap className="mr-2 h-5 w-5" />
                Find Tutor Now
              </Button>
            </div>
          </div>
        )}
      </Card>

      {showMatching && (
        <MatchingModal school={school} courseCode={courseCode} topics={topics} onClose={() => setShowMatching(false)} />
      )}
    </>
  )
}
