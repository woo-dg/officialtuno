"use client"

import type React from "react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, Sparkles, CheckCircle2 } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { supabase } from "@/lib/supabaseClient"

interface CareersModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CareersModal({ open, onOpenChange }: CareersModalProps) {
  const [formData, setFormData] = useState({ name: "", email: "", age: "" })
  const [resume, setResume] = useState<File | null>(null)
  const [fromLinkedIn, setFromLinkedIn] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const resetForm = () => {
    setFormData({ name: "", email: "", age: "" })
    setResume(null)
    setFromLinkedIn(false)
    setErrorMsg(null)
    setIsSubmitting(false)
  }

  const handleClose = () => {
    setSubmitted(false)
    resetForm()
    onOpenChange(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMsg(null)

    try {
      // 1) Optional resume upload (private bucket)
      let resumePath: string | null = null
      if (resume) {
        if (resume.size > 10 * 1024 * 1024) {
          throw new Error("Resume is larger than 10MB.")
        }
        const safeName = resume.name.replace(/\s+/g, "_").slice(0, 60)
        const path = `resumes/${crypto.randomUUID()}_${safeName}`

        const { error: uploadErr } = await supabase
          .storage
          .from("resumes")
          .upload(path, resume, {
            upsert: false,
            cacheControl: "3600",
            contentType: resume.type || "application/octet-stream",
          })

        if (uploadErr) throw uploadErr
        resumePath = path
      }

      // 2) Insert application
      const ageNum = formData.age ? Number(formData.age) : null
      const { error: insertErr } = await supabase
        .from("job_applications")
        .insert([{
          name: formData.name,
          email: formData.email,
          age: ageNum,
          from_linkedin: fromLinkedIn,
          resume_path: resumePath,
        }])

      if (insertErr) throw insertErr

      // 3) Success state (show confirmation instead of closing)
      setSubmitted(true)
    } catch (err: any) {
      console.error("Careers submit error:", err)
      setErrorMsg(err?.message || "Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setResume(e.target.files[0])
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] bg-white border-2 border-border shadow-2xl">
        {!submitted ? (
          <>
            <DialogHeader className="space-y-2 pb-4 border-b border-border/50">
              <div className="flex items-center justify-center gap-3">
                <div className="p-2 bg-foreground/5 rounded-full">
                  <Sparkles className="w-5 h-5 text-foreground" />
                </div>
              </div>
              <DialogTitle className="text-2xl font-bold text-center tracking-tight">
                Apply for Founding Engineer
              </DialogTitle>
              <div className="flex items-center justify-center gap-2 text-base font-semibold text-foreground/80">
                <span>$35/hour + equity</span>
              </div>
              <p className="text-center text-muted-foreground text-sm max-w-md mx-auto">
                Join our founding team and help build the future of online tutoring. Be part of something special from day one.
              </p>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 pt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="name" className="text-sm font-semibold">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="h-10 border-2 focus:border-foreground/40 transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-sm font-semibold">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="h-10 border-2 focus:border-foreground/40 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="age" className="text-sm font-semibold">Age</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Enter your age"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  min={18}
                  max={100}
                  required
                  className="h-10 border-2 focus:border-foreground/40 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="resume" className="text-sm font-semibold">Resume / CV</Label>
                <div className="relative">
                  <input
                    id="resume"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="resume"
                    className="flex items-center justify-center gap-3 h-20 border-2 border-dashed border-border hover:border-foreground/40 rounded-lg cursor-pointer transition-all duration-300 hover:bg-foreground/5 group"
                  >
                    <Upload className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                    <div className="text-center">
                      <p className="text-sm font-medium text-foreground">
                        {resume ? resume.name : "Click to upload resume"}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">PDF, DOC, or DOCX (max 10MB)</p>
                    </div>
                  </label>
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <Checkbox
                  id="linkedin"
                  checked={fromLinkedIn}
                  onCheckedChange={(checked) => setFromLinkedIn(!!checked)}
                  className="border-2"
                />
                <label htmlFor="linkedin" className="text-sm font-medium leading-none cursor-pointer">
                  Coming from LinkedIn?
                </label>
              </div>

              {errorMsg && <p className="text-sm text-red-600">{errorMsg}</p>}

              <div className="flex flex-col sm:flex-row gap-3 pt-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  className="flex-1 h-11 rounded-full border-2 hover:bg-foreground/5 font-semibold"
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 h-11 rounded-full bg-foreground text-background hover:bg-foreground/90 hover:scale-105 transition-all duration-300 font-semibold shadow-lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </Button>
              </div>
            </form>
          </>
        ) : (
          // Success state
          <div className="py-10 text-center">
            <div className="mx-auto mb-4 h-14 w-14 rounded-full bg-foreground text-background flex items-center justify-center">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <DialogTitle className="text-2xl font-bold mb-2">Successfully applied</DialogTitle>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Thanks for applying. We’ll review your application and get back to you soon.
            </p>
            <div className="mt-8">
              <Button
                onClick={handleClose}
                className="h-11 rounded-full bg-foreground text-background hover:bg-foreground/90 transition-all font-semibold"
              >
                Close
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
