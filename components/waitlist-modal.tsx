"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Check } from "lucide-react"

interface WaitlistModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function WaitlistModal({ open, onOpenChange }: WaitlistModalProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [userType, setUserType] = useState<"student" | "tutor">("student")
  const [isReferred, setIsReferred] = useState(false)
  const [referralCode, setReferralCode] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleReferralCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase()

    // Remove any characters that don't match the expected pattern
    let formatted = ""
    for (let i = 0; i < value.length && i < 6; i++) {
      const char = value[i]
      if (i < 3) {
        // First 3 characters must be letters
        if (/[A-Z]/.test(char)) {
          formatted += char
        }
      } else {
        // Last 3 characters must be numbers
        if (/[0-9]/.test(char)) {
          formatted += char
        }
      }
    }

    setReferralCode(formatted)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)

    setTimeout(() => {
      setSubmitted(false)
      setName("")
      setEmail("")
      setUserType("student")
      setIsReferred(false)
      setReferralCode("")
      onOpenChange(false)
    }, 3000)
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
                <Label htmlFor="name" className="font-medium">
                  Name
                </Label>
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
                <Label htmlFor="email" className="font-medium">
                  Email
                </Label>
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
                    <Label htmlFor="referralCode" className="text-sm font-medium text-muted-foreground">
                      Referral Code
                    </Label>
                    <Input
                      id="referralCode"
                      type="text"
                      placeholder="Enter referral code (e.g., DAV104)"
                      value={referralCode}
                      onChange={handleReferralCodeChange}
                      required={isReferred}
                      maxLength={6}
                      pattern="[A-Z]{3}[0-9]{3}"
                      title="Referral code must be 3 uppercase letters followed by 3 numbers (e.g., DAV104)"
                      className="h-11 uppercase tracking-wider font-mono"
                    />
                  </div>
                )}
              </div>

              <Button
                type="submit"
                className="w-full h-12 text-base font-semibold rounded-full bg-foreground text-background hover:bg-foreground/90"
              >
                Join the Waitlist
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
