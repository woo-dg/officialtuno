"use client"

import type React from "react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, Sparkles, Copy, CheckCircle2, X } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { supabase } from "@/lib/supabaseClient"

interface CareersModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CareersModal({ open, onOpenChange }: CareersModalProps) {
  const [formData, setFormData] = useState({ name: "", email: "", age: "" })
  const [resume, setResume] = useState<File | null>(null)

  const [hasReferralCode, setHasReferralCode] = useState(false)
  const [inputReferralCode, setInputReferralCode] = useState("")
  const [referralCodeError, setReferralCodeError] = useState("")

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showThankYou, setShowThankYou] = useState(false)
  const [referralCode, setReferralCode] = useState("")
  const [copied, setCopied] = useState(false)

  const VALID_REFERRAL = "TUN089" // the only valid incoming code

  const generateReferralCode = (name: string) => {
    const firstThree = name.replace(/\s/g, "").substring(0, 3).toUpperCase()
    const randomNumbers = Math.floor(100 + Math.random() * 900).toString()
    return firstThree + randomNumbers
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setResume(e.target.files[0])
  }

  const handleCopyCode = () => {
    if (!referralCode) return
    navigator.clipboard.writeText(referralCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const resetAll = () => {
    setFormData({ name: "", email: "", age: "" })
    setResume(null)
    setHasReferralCode(false)
    setInputReferralCode("")
    setReferralCodeError("")
    setShowThankYou(false)
    setIsSubmitting(false)
    setCopied(false)
    setReferralCode("")
  }

  const handleClose = () => {
    resetAll()
    onOpenChange(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setReferralCodeError("")

    if (hasReferralCode) {
      if (!inputReferralCode.trim()) {
        setReferralCodeError("Please enter a referral code")
        return
      }
      if (inputReferralCode.toUpperCase() !== VALID_REFERRAL) {
        setReferralCodeError("Invalid code")
        return
      }
    }

    setIsSubmitting(true)

    try {
      // Upload resume to private bucket
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

      // Insert application row
      const { error: insertErr } = await supabase.from("job_applications").insert([
        {
          name: formData.name,
          email: formData.email,
          age: formData.age ? Number(formData.age) : null,
          resume_path: resumePath,
          input_referral_code: hasReferralCode ? inputReferralCode.toUpperCase() : null,
          referral_code_valid: hasReferralCode ? inputReferralCode.toUpperCase() === VALID_REFERRAL : false,
        },
      ])

      if (insertErr) throw insertErr

      // Success UI
      const code = generateReferralCode(formData.name)
      setReferralCode(code)
      setShowThankYou(true)
    } catch (err: any) {
      setReferralCodeError(err?.message || "Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
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
                  Your application has been submitted successfully. We&apos;ll review it and get back to you soon.
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

                {/* 🔥 Bigger + bold + clearer instruction */}
                <p className="mt-2 text-foreground font-semibold text-base sm:text-lg leading-relaxed">
                  Share this code with friends or family who want to join the waitlist as tutors or students.
                  They should enter this code when they sign up so you both get priority consideration.
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
                <Bullet>Must be 18 years of age or older by December</Bullet>
                <Bullet>Proficiency in Python, TypeScript, or Go</Bullet>
                <Bullet>Fluency in English (technical & written)</Bullet>
                <Bullet>Working knowledge of Git & GitHub</Bullet>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 pt-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Field label="Full Name" id="name">
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="h-11 border-2 focus:border-foreground/40 transition-colors"
                  />
                </Field>

                <Field label="Email Address" id="email">
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="h-11 border-2 focus:border-foreground/40 transition-colors"
                  />
                </Field>
              </div>

              <Field label="Age" id="age">
                <Input
                  id="age"
                  type="number"
                  placeholder="Enter your age"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  required
                  min={18}
                  max={100}
                  className="h-11 border-2 focus:border-foreground/40 transition-colors"
                />
              </Field>

              <Field label="Resume / CV" id="resume">
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
              </Field>

              <div className="space-y-3 pt-1">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="referral"
                    checked={hasReferralCode}
                    onCheckedChange={(checked) => {
                      setHasReferralCode(!!checked)
                      setReferralCodeError("")
                      setInputReferralCode("")
                    }}
                    className="border-2 w-5 h-5"
                  />
                  <label htmlFor="referral" className="text-sm font-medium leading-none cursor-pointer select-none">
                    Received referral code? <span className="text-muted-foreground text-xs">(Optional)</span>
                  </label>
                </div>

                {hasReferralCode && (
                  <div className="ml-8 space-y-1 animate-in fade-in slide-in-from-top-2 duration-300">
                    <Input
                      id="referralCodeInput"
                      type="text"
                      placeholder="Enter your referral code"
                      value={inputReferralCode}
                      onChange={(e) => {
                        setInputReferralCode(e.target.value.toUpperCase())
                        setReferralCodeError("")
                      }}
                      maxLength={6}
                      className="h-10 border-2 focus:border-foreground/40 transition-colors font-mono tracking-wider"
                    />
                    {referralCodeError && <p className="text-xs text-red-600 font-medium">{referralCodeError}</p>}
                  </div>
                )}
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
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

/** Small presentational helpers */
function Field({ label, id, children }: { label: string; id: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-semibold text-foreground">
        {label}
      </Label>
      {children}
    </div>
  )
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2.5">
      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-foreground/60 shrink-0" />
      <p className="text-sm text-muted-foreground leading-relaxed">{children}</p>
    </div>
  )
}
