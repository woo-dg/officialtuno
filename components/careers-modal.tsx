"use client"

import type React from "react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, Sparkles, Copy, CheckCircle2, X } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

interface CareersModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CareersModal({ open, onOpenChange }: CareersModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
  })
  const [resume, setResume] = useState<File | null>(null)
  const [fromLinkedIn, setFromLinkedIn] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showThankYou, setShowThankYou] = useState(false)
  const [referralCode, setReferralCode] = useState("")
  const [copied, setCopied] = useState(false)

  const generateReferralCode = (name: string) => {
    const firstThree = name.replace(/\s/g, "").substring(0, 3).toUpperCase()
    const randomNumbers = Math.floor(100 + Math.random() * 900).toString()
    return firstThree + randomNumbers
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    await new Promise((resolve) => setTimeout(resolve, 1500))

    const code = generateReferralCode(formData.name)
    setReferralCode(code)
    setShowThankYou(true)
    setIsSubmitting(false)
  }

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleClose = () => {
    onOpenChange(false)
    setShowThankYou(false)
    setFormData({ name: "", email: "", age: "" })
    setResume(null)
    setFromLinkedIn(false)
    setCopied(false)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResume(e.target.files[0])
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[800px] bg-white border-2 border-border shadow-2xl max-h-[90vh] overflow-y-auto">
        {showThankYou ? (
          <div className="relative py-8 px-4">
            <button
              onClick={handleClose}
              className="absolute top-4 left-4 p-2 rounded-full hover:bg-foreground/5 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5 text-muted-foreground hover:text-foreground" />
            </button>

            <div className="flex flex-col items-center text-center space-y-6 max-w-md mx-auto">
              <div className="p-4 bg-green-50 rounded-full">
                <CheckCircle2 className="w-16 h-16 text-green-600" />
              </div>

              <div className="space-y-2">
                <h2 className="text-3xl font-bold text-foreground">Thank You!</h2>
                <p className="text-muted-foreground text-base leading-relaxed">
                  Your application has been submitted successfully. We'll review it and get back to you soon.
                </p>
              </div>

              <div className="w-full space-y-3 pt-4">
                <p className="text-sm font-semibold text-foreground">Your Referral Code</p>
                <div className="flex items-center gap-3">
                  <div className="flex-1 px-4 py-3 bg-foreground/5 border-2 border-border rounded-lg">
                    <p className="text-2xl font-bold text-foreground tracking-wider">{referralCode}</p>
                  </div>
                  <Button
                    onClick={handleCopyCode}
                    className="h-12 px-6 rounded-lg bg-foreground text-background hover:bg-foreground/90 transition-all"
                  >
                    {copied ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-2" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Share this code with friends who might be interested in joining our team. When they apply and mention
                  your code, you'll both get priority consideration!
                </p>
              </div>
            </div>
          </div>
        ) : (
          <>
            <DialogHeader className="space-y-3 pb-5 border-b border-border/30">
              <div className="flex items-center justify-center">
                <div className="p-2.5 bg-foreground/5 rounded-full">
                  <Sparkles className="w-6 h-6 text-foreground" />
                </div>
              </div>
              <DialogTitle className="text-2xl sm:text-3xl font-bold text-center tracking-tight">
                Apply for Founding Engineer
              </DialogTitle>
              <div className="flex items-center justify-center text-base sm:text-lg font-semibold text-foreground/80">
                $35/hour + equity
              </div>
              <p className="text-center text-muted-foreground text-sm sm:text-base max-w-xl mx-auto leading-relaxed px-4">
                Join our founding team and help build the future of online tutoring. Be part of something special from
                day one.
              </p>
            </DialogHeader>

            <div className="mt-5 mb-4 rounded-xl border-2 border-border/40 bg-foreground/[0.02] p-5">
              <h3 className="text-base font-bold text-foreground mb-4 text-center">Minimum Requirements*</h3>
              <div className="grid md:grid-cols-2 gap-x-6 gap-y-3">
                <div className="flex items-start gap-2.5">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-foreground/60 shrink-0" />
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Must be 18 years of age or older by December
                  </p>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-foreground/60 shrink-0" />
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Proficiency in at least one production-grade programming language (Python, TypeScript, or Go)
                  </p>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-foreground/60 shrink-0" />
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Fluency in English, both technical and written communication
                  </p>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-foreground/60 shrink-0" />
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Working knowledge of Git and GitHub workflows, including version control
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 pt-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-semibold text-foreground">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="h-11 border-2 focus:border-foreground/40 transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-semibold text-foreground">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="h-11 border-2 focus:border-foreground/40 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="age" className="text-sm font-semibold text-foreground">
                  Age
                </Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Enter your age"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  required
                  min="18"
                  max="100"
                  className="h-11 border-2 focus:border-foreground/40 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="resume" className="text-sm font-semibold text-foreground">
                  Resume / CV
                </Label>
                <div className="relative">
                  <input
                    id="resume"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    required
                    className="hidden"
                  />
                  <label
                    htmlFor="resume"
                    className="flex items-center justify-center gap-3 h-24 border-2 border-dashed border-border hover:border-foreground/40 rounded-xl cursor-pointer transition-all duration-300 hover:bg-foreground/5 group"
                  >
                    <Upload className="w-6 h-6 text-muted-foreground group-hover:text-foreground transition-colors" />
                    <div className="text-center">
                      <p className="text-sm font-semibold text-foreground">
                        {resume ? resume.name : "Click to upload resume"}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">PDF, DOC, or DOCX (max 10MB)</p>
                    </div>
                  </label>
                </div>
              </div>

              <div className="flex items-center space-x-3 pt-1">
                <Checkbox
                  id="linkedin"
                  checked={fromLinkedIn}
                  onCheckedChange={(checked) => setFromLinkedIn(checked as boolean)}
                  className="border-2 w-5 h-5"
                />
                <label htmlFor="linkedin" className="text-sm font-medium leading-none cursor-pointer select-none">
                  Coming from LinkedIn?
                </label>
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleClose()}
                  className="flex-1 h-12 rounded-full border-2 hover:bg-foreground/5 font-semibold text-base"
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 h-12 rounded-full bg-foreground text-background hover:bg-foreground/90 hover:scale-[1.02] transition-all duration-300 font-semibold text-base shadow-lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </Button>
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
