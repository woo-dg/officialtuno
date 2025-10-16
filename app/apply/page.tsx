"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Upload, Link2, Check } from "lucide-react"
import Image from "next/image"

export default function ApplyPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [contentLink, setContentLink] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [submissionType, setSubmissionType] = useState<"link" | "upload">("link")
  const [submitted, setSubmitted] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-background to-cyan-50/20">
        <header className="fixed top-0 left-0 right-0 z-50 h-20 bg-background/80 backdrop-blur-sm border-b border-border">
          <div className="container mx-auto px-6 lg:px-12 h-full">
            <div className="flex h-full items-center justify-between">
              <Link href="/" className="flex items-center gap-2">
                <Image
                  src="/tuno-logo.png"
                  alt="Tuno"
                  width={180}
                  height={90}
                  className="object-contain h-16 w-auto"
                  priority
                />
              </Link>
            </div>
          </div>
        </header>

        <div className="pt-32 pb-20 px-6">
          <div className="container mx-auto max-w-3xl">
            <div className="space-y-8">
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold">Application Submitted</h1>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                  Thank you for applying to be a UGC creator for Tuno. We'll review your submission and get back to you
                  within 3-5 business days.
                </p>
              </div>
              <Link href="/">
                <Button variant="outline" className="gap-2 bg-transparent">
                  <ArrowLeft className="w-4 h-4" />
                  Return to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-background to-cyan-50/20">
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(var(--rotate));
          }
          50% {
            transform: translateY(-15px) rotate(var(--rotate));
          }
        }
        
        @keyframes zoom {
          0%, 100% {
            transform: scale(1) rotate(var(--rotate));
          }
          50% {
            transform: scale(1.05) rotate(var(--rotate));
          }
        }
        
        .float-card {
          animation: float 6s ease-in-out infinite;
        }
        
        .zoom-card {
          animation: zoom 4s ease-in-out infinite;
        }
      `}</style>

      <header className="fixed top-0 left-0 right-0 z-50 h-20 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-6 lg:px-12 h-full">
          <div className="flex h-full items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/tuno-logo.png"
                alt="Tuno"
                width={180}
                height={90}
                className="object-contain h-16 w-auto"
                priority
              />
            </Link>
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Make main fill viewport minus header height for all screens */}
      <main className="grid grid-cols-1 lg:grid-cols-2 pt-20 min-h-[calc(100vh-5rem)]">
        {/* Left side - Creative collage (unchanged, hidden on small) */}
        <div className="relative overflow-hidden hidden lg:flex items-center justify-center p-12">
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="absolute top-[15%] left:[10%] w-64 h-48 bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-white float-card"
              style={{ "--rotate": "-12deg" } as React.CSSProperties}
            >
              <div className="w-full h-full bg-gradient-to-br from-cyan-100 to-blue-200 flex items-center justify-center">
                <span className="text-6xl">📚</span>
              </div>
            </div>

            <div
              className="absolute top-[45%] right-[15%] w-56 h-40 bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-white zoom-card"
              style={{ "--rotate": "6deg" } as React.CSSProperties}
            >
              <div className="w-full h-full bg-gradient-to-br from-blue-100 to-cyan-200 flex items-center justify-center">
                <span className="text-5xl">🎓</span>
              </div>
            </div>

            <div
              className="absolute bottom-[20%] left-[15%] w-48 h-36 bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-white float-card"
              style={{ "--rotate": "12deg", animationDelay: "1s" } as React.CSSProperties}
            >
              <div className="w-full h-full bg-gradient-to-br from-cyan-50 to-blue-100 flex items-center justify-center">
                <span className="text-4xl">✨</span>
              </div>
            </div>

            <svg className="absolute top-[25%] right-[25%] w-32 h-32 text-yellow-400 opacity-80" viewBox="0 0 100 100">
              <path
                d="M 20 50 Q 30 20, 50 30 T 80 50"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>

            <svg className="absolute bottom-[35%] right-[10%] w-24 h-24 text-pink-300 opacity-70" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="4" />
              <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="3" />
            </svg>

            <div className="absolute top-[35%] left-[35%] text-6xl transform -rotate-12 drop-shadow-lg">🔥</div>
            <div className="absolute bottom-[40%] right-[35%] text-5xl transform rotate-12 drop-shadow-lg">💡</div>
            <div className="absolute top-[60%] left-[25%] text-4xl transform -rotate-6 drop-shadow-lg">⭐</div>
          </div>

          <div
            className="relative z-10 text-center space-y-6 bg-white/95 backdrop-blur-sm p-10 shadow-2xl max-w-lg"
            style={{
              clipPath:
                "polygon(8% 5%, 12% 2%, 18% 0%, 25% 1%, 32% 0%, 40% 2%, 48% 0%, 56% 1%, 64% 0%, 72% 3%, 78% 1%, 85% 4%, 90% 2%, 94% 6%, 97% 12%, 99% 20%, 100% 28%, 99% 36%, 100% 44%, 99% 52%, 100% 60%, 98% 68%, 100% 76%, 97% 84%, 94% 90%, 90% 95%, 85% 98%, 78% 100%, 70% 99%, 62% 100%, 54% 98%, 46% 100%, 38% 99%, 30% 100%, 22% 97%, 15% 99%, 10% 95%, 6% 90%, 3% 84%, 1% 76%, 0% 68%, 2% 60%, 0% 52%, 1% 44%, 0% 36%, 2% 28%, 1% 20%, 3% 12%, 5% 8%)",
            }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              Create content that makes learning go viral
            </h2>
            <p className="text-xl text-muted-foreground font-medium">Join Tuno&apos;s creator community</p>
          </div>
        </div>

        {/* Right side - Application form (scrolls independently if needed) */}
        <div className="flex items-start lg:items-center justify-center px-6 lg:px-12 py-8">
          <div className="w-full max-w-xl space-y-8 min-h-[calc(100vh-5rem)] overflow-y-auto pb-8">
            <div className="space-y-3 pt-2">
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground">UGC Creator Application</h1>
              <p className="text-base text-muted-foreground leading-relaxed">
                Show us your viral content or platform and join our creator community.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-semibold text-foreground">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  required
                  className="w-full h-12 pl-0 pr-4 text-base bg-transparent border-0 border-b-2 border-border outline-none focus:outline-none focus:border-foreground rounded-none text-foreground placeholder:text-muted-foreground transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-semibold text-foreground">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  required
                  className="w-full h-12 pl-0 pr-4 text-base bg-transparent border-0 border-b-2 border-border outline-none focus:outline-none focus:border-foreground rounded-none text-foreground placeholder:text-muted-foreground transition-colors"
                />
              </div>

              <div className="space-y-3 pt-2">
                <label className="text-sm font-semibold text-foreground">Submit your work</label>
                <div className="flex gap-3 border-b-2 border-border pb-3">
                  <button
                    type="button"
                    onClick={() => setSubmissionType("link")}
                    className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium transition-colors ${
                      submissionType === "link"
                        ? "text-foreground border-b-2 border-foreground -mb-[14px]"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Link2 className="w-4 h-4" />
                    Link
                  </button>
                  <button
                    type="button"
                    onClick={() => setSubmissionType("upload")}
                    className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium transition-colors ${
                      submissionType === "upload"
                        ? "text-foreground border-b-2 border-foreground -mb-[14px]"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Upload className="w-4 h-4" />
                    Upload
                  </button>
                </div>
              </div>

              {submissionType === "link" ? (
                <div className="space-y-2">
                  <label htmlFor="link" className="text-sm font-semibold text-foreground">
                    Link to Content
                  </label>
                  <input
                    id="link"
                    type="url"
                    value={contentLink}
                    onChange={(e) => setContentLink(e.target.value)}
                    placeholder="Link to viral video or social media platform"
                    required
                    className="w-full h-12 pl-0 pr-4 text-base bg-transparent border-0 border-b-2 border-border outline-none focus:outline-none focus:border-foreground rounded-none text-foreground placeholder:text-muted-foreground transition-colors"
                  />
                  <p className="text-xs text-muted-foreground pt-1">Share your viral content or social media profile</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <label htmlFor="file" className="text-sm font-semibold text-foreground">
                    Upload Proof
                  </label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-foreground/40 transition-colors">
                    <input
                      id="file"
                      type="file"
                      onChange={handleFileChange}
                      accept="image/*,video/*,.pdf"
                      className="hidden"
                      required
                    />
                    <label htmlFor="file" className="cursor-pointer">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                      {file ? (
                        <p className="font-semibold text-sm text-foreground">{file.name}</p>
                      ) : (
                        <>
                          <p className="font-semibold text-sm mb-1 text-foreground">Click to upload</p>
                          <p className="text-xs text-muted-foreground">Screenshots, videos, or PDFs</p>
                        </>
                      )}
                    </label>
                  </div>
                </div>
              )}

              <div className="pt-4 pb-2">
                <Button type="submit" size="lg" className="w-full h-11 text-base font-semibold">
                  Submit Application
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}
