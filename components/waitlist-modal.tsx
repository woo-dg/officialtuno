"use client"

import type React from "react"
import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Check } from "lucide-react"
import { supabase } from "@/lib/supabaseClient"   // <-- make sure this exists

interface WaitlistModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function WaitlistModal({ open, onOpenChange }: WaitlistModalProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [userType, setUserType] = useState<"student" | "tutor">("student")
  const [isReferred, setIsReferred] = useState(false)
  const [referrerEmail, setReferrerEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMsg(null)

    try {
      // optional client-side sanity: if checked, require an "@"
      if (isReferred && referrerEmail && !referrerEmail.includes("@")) {
        throw new Error("Please enter a valid referrer email.")
      }

      const { error } = await supabase.from("waitlist_emails").insert([
        {
          name,
          email,
          user_type: userType,      // matches your existing column
          referred: isReferred,     // new column
          referrer_email: isReferred ? referrerEmail || null : null, // new column
          source_path: typeof window !== "undefined" ? window.location.pathname : null,
        },
      ])

      if (error) throw error

      // success UI
      setSubmitted(true)
      setTimeout(() => {
        setSubmitted(false)
        setName("")
        setEmail("")
        setUserType("student")
        setIsReferred(false)
        setReferrerEmail("")
        onOpenChange(false)
      }, 3000)
    } catch (err: any) {
      console.error(err)
      setErrorMsg(err?.message ?? "Something went wrong. Try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg animate-slide-up bg-white">
        {!submitted ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-semibold">Join the waitlist</DialogTitle>
              <DialogDescription className="text-base">
                Join the waitlist to be the first to connect with tutors instantly.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-6 mt-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="font-medium">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="font-medium">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12"
                />
              </div>

              <div className="space-y-3">
                <Label className="font-medium">I'm interested as a</Label>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    type="button"
                    variant={userType === "student" ? "default" : "outline"}
                    className={`h-9 text-sm font-medium rounded-lg transition-all ${
                      userType === "student"
                        ? "bg-foreground text-background hover:bg-foreground/90"
                        : "bg-transparent hover:bg-secondary"
                    }`}
                    onClick={() => setUserType("student")}
                  >
                    Student
                  </Button>
                  <Button
                    type="button"
                    variant={userType === "tutor" ? "default" : "outline"}
                    className={`h-9 text-sm font-medium rounded-lg transition-all ${
                      userType === "tutor"
                        ? "bg-foreground text-background hover:bg-foreground/90"
                        : "bg-transparent hover:bg-secondary"
                    }`}
                    onClick={() => setUserType("tutor")}
                  >
                    Tutor
                  </Button>
                </div>
              </div>

              <div className="space-y-3 pt-2 border-t border-border/50">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="referred"
                    checked={isReferred}
                    onChange={(e) => setIsReferred(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded border-gray-300 text-foreground focus:ring-2 focus:ring-foreground cursor-pointer"
                  />
                  <Label htmlFor="referred" className="font-medium text-sm leading-relaxed cursor-pointer">
                    I was referred by someone who applied for the Founding Engineer role
                  </Label>
                </div>

                {isReferred && (
                  <div className="space-y-2 pl-7 animate-in fade-in slide-in-from-top-2 duration-200">
                    <Label htmlFor="referrerEmail" className="text-sm font-medium text-muted-foreground">
                      Referrer's Email
                    </Label>
                    <Input
                      id="referrerEmail"
                      type="email"
                      placeholder="referrer@email.com"
                      value={referrerEmail}
                      onChange={(e) => setReferrerEmail(e.target.value)}
                      required={isReferred}
                      className="h-11"
                    />
                  </div>
                )}
              </div>

              {errorMsg && <p className="text-sm text-red-600">{errorMsg}</p>}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 text-base font-semibold rounded-full bg-foreground text-background hover:bg-foreground/90"
              >
                {isSubmitting ? "Submitting..." : "Join the Waitlist"}
              </Button>
            </form>
          </>
        ) : (
          <div className="py-12 text-center">
            <div className="w-16 h-16 bg-foreground rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-background" />
            </div>
            <DialogTitle className="text-2xl font-semibold mb-2">You&apos;re on the list!</DialogTitle>
            <DialogDescription className="text-base">We&apos;ll reach out soon.</DialogDescription>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
