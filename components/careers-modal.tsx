"use client"

import type React from "react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, Sparkles } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

interface CareersModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CareersModal({ open, onOpenChange }: CareersModalProps) {
  const [formData, setFormData] = useState({ name: "", email: "", age: "" })
  const [resume, setResume] = useState<File | null>(null)
  const [fromLinkedIn, setFromLinkedIn] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((r) => setTimeout(r, 1500)) // simulate
    console.log("Application submitted:", { ...formData, resume: resume?.name, fromLinkedIn })
    setIsSubmitting(false)
    onOpenChange(false)
    setFormData({ name: "", email: "", age: "" })
    setResume(null)
    setFromLinkedIn(false)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setResume(e.target.files[0])
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="
          w-full
          sm:max-w-[640px]
          md:max-w-[820px]
          lg:max-w-[900px]
          bg-white border-2 border-border shadow-2xl
          max-h-[90vh] sm:max-h-[85vh] overflow-y-auto
          px-4 sm:px-6
        "
      >
        <DialogHeader className="space-y-2 sm:space-y-3 pb-4 sm:pb-5 border-b border-border/30">
          <div className="flex items-center justify-center">
            <div className="p-2 bg-foreground/5 rounded-full sm:p-2.5">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />
            </div>
          </div>
          <DialogTitle className="text-xl sm:text-2xl md:text-3xl font-bold text-center tracking-tight">
            Apply for Founding Engineer
          </DialogTitle>
          <div className="flex items-center justify-center text-sm sm:text-base md:text-lg font-semibold text-foreground/80">
            $35/hour + equity
          </div>
          <p className="text-center text-muted-foreground text-xs sm:text-sm md:text-base max-w-xl mx-auto leading-relaxed px-2 sm:px-4">
            Join our founding team and help build the future of online tutoring. Be part of something special from day one.
          </p>
        </DialogHeader>

        {/* Requirements box */}
        <div className="mt-4 mb-3 sm:mb-4 rounded-xl border-2 border-border/40 bg-foreground/[0.02] p-3 sm:p-4">
          <h3 className="text-sm sm:text-base font-bold text-foreground mb-3 text-center">
            Minimum Requirements
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
            {[
              "Must be 18 years of age or older by December",
              "Proficiency in at least one production-grade programming language (Python, TypeScript, or Go)",
              "Fluency in English, both technical and written communication",
              "Working knowledge of Git and GitHub workflows, including version control",
            ].map((t, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-foreground/60 shrink-0" />
                <p className="text-sm text-muted-foreground leading-relaxed">{t}</p>
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 pt-1">
          {/* Name + Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-5">
            <div className="space-y-1.5 sm:space-y-2">
              <Label htmlFor="name" className="text-xs sm:text-sm font-semibold text-foreground">
                Full Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="h-10 sm:h-11 border-2 focus:border-foreground/40"
              />
            </div>

            <div className="space-y-1.5 sm:space-y-2">
              <Label htmlFor="email" className="text-xs sm:text-sm font-semibold text-foreground">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="example@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="h-10 sm:h-11 border-2 focus:border-foreground/40"
              />
            </div>
          </div>

          {/* Age */}
          <div className="space-y-1.5 sm:space-y-2">
            <Label htmlFor="age" className="text-xs sm:text-sm font-semibold text-foreground">
              Age
            </Label>
            <Input
              id="age"
              type="number"
              placeholder="Enter your age"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              required
              min={18}
              max={100}
              className="h-10 sm:h-11 border-2 focus:border-foreground/40"
            />
          </div>

          {/* Resume */}
          <div className="space-y-1.5 sm:space-y-2">
            <Label htmlFor="resume" className="text-xs sm:text-sm font-semibold text-foreground">
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
                className="
                  flex items-center justify-center gap-3
                  h-16 sm:h-20 md:h-24
                  border-2 border-dashed border-border hover:border-foreground/40
                  rounded-lg sm:rounded-xl cursor-pointer transition-all duration-300
                  hover:bg-foreground/5 group
                "
              >
                <Upload className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground group-hover:text-foreground transition-colors" />
                <div className="text-center">
                  <p className="text-sm sm:text-base font-semibold text-foreground">
                    {resume ? resume.name : "Click to upload resume"}
                  </p>
                  <p className="text-[11px] sm:text-xs text-muted-foreground mt-1">PDF, DOC, or DOCX (max 10MB)</p>
                </div>
              </label>
            </div>
          </div>

          {/* LinkedIn */}
          <div className="flex items-center gap-2 sm:gap-3 pt-1">
            <Checkbox
              id="linkedin"
              checked={fromLinkedIn}
              onCheckedChange={(checked) => setFromLinkedIn(checked as boolean)}
              className="border-2 w-4 h-4 sm:w-5 sm:h-5"
            />
            <label
              htmlFor="linkedin"
              className="text-sm sm:text-base font-medium leading-none cursor-pointer select-none"
            >
              Coming from LinkedIn?
            </label>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="h-10 sm:h-12 rounded-full border-2 font-semibold text-sm sm:text-base w-full sm:w-auto"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="h-10 sm:h-12 rounded-full bg-foreground text-background hover:bg-foreground/90 hover:scale-[1.02] transition-all duration-300 font-semibold text-sm sm:text-base shadow-lg w-full sm:w-auto"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
