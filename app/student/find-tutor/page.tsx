"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BookOpen, Calculator, Clock, MessageSquare, Video, Star, Calendar, Pencil } from "lucide-react"

export default function FindTutorPage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
          {/* Floating Widgets */}
          <div className={`absolute inset-0 transition-all duration-1500 ${isVisible ? "opacity-100" : "opacity-0"}`}>
            {/* Top Left - Book Icon */}
            <div className="absolute top-[12%] left-[5%] md:left-[8%] animate-float" style={{ animationDelay: "0s" }}>
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-3xl bg-gradient-to-br from-blue-400 to-blue-600 shadow-2xl flex items-center justify-center transform hover:scale-110 transition-transform">
                <BookOpen className="w-10 h-10 md:w-12 md:h-12 text-white" />
              </div>
            </div>

            {/* Left Side - Calculator Icon */}
            <div className="absolute top-[50%] left-[3%] md:left-[5%] animate-float" style={{ animationDelay: "0.5s" }}>
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-purple-400 to-purple-600 shadow-2xl flex items-center justify-center transform hover:scale-110 transition-transform">
                <Calculator className="w-8 h-8 md:w-10 md:h-10 text-white" />
              </div>
            </div>

            {/* Bottom Left - Pencil Icon */}
            <div
              className="absolute bottom-[15%] left-[8%] md:left-[12%] animate-float"
              style={{ animationDelay: "1s" }}
            >
              <div className="w-18 h-18 md:w-22 md:h-22 rounded-3xl bg-gradient-to-br from-yellow-300 to-orange-400 shadow-2xl flex items-center justify-center transform hover:scale-110 transition-transform">
                <Pencil className="w-9 h-9 md:w-11 md:h-11 text-white" />
              </div>
            </div>

            {/* Top Right - Calendar Icon */}
            <div
              className="absolute top-[10%] right-[5%] md:right-[8%] animate-float"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-3xl bg-gradient-to-br from-pink-400 to-red-500 shadow-2xl flex items-center justify-center transform hover:scale-110 transition-transform">
                <Calendar className="w-10 h-10 md:w-12 md:h-12 text-white" />
              </div>
            </div>

            {/* Right Side - Video Icon */}
            <div
              className="absolute top-[48%] right-[3%] md:right-[6%] animate-float"
              style={{ animationDelay: "0.7s" }}
            >
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-2xl flex items-center justify-center transform hover:scale-110 transition-transform">
                <Video className="w-10 h-10 md:w-12 md:h-12 text-white" />
              </div>
            </div>

            {/* Bottom Right - Clock Icon */}
            <div
              className="absolute bottom-[18%] right-[8%] md:right-[12%] animate-float"
              style={{ animationDelay: "1.2s" }}
            >
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-slate-600 to-slate-800 shadow-2xl flex items-center justify-center transform hover:scale-110 transition-transform">
                <Clock className="w-8 h-8 md:w-10 md:h-10 text-white" />
              </div>
            </div>

            {/* Top Center Left - Message Icon */}
            <div
              className="absolute top-[28%] left-[15%] md:left-[18%] animate-float"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="w-14 h-14 md:w-18 md:h-18 rounded-2xl bg-gradient-to-br from-teal-400 to-cyan-500 shadow-2xl flex items-center justify-center transform hover:scale-110 transition-transform">
                <MessageSquare className="w-7 h-7 md:w-9 md:h-9 text-white" />
              </div>
            </div>

            {/* Bottom Center Right - Star Icon */}
            <div
              className="absolute bottom-[32%] right-[16%] md:right-[20%] animate-float"
              style={{ animationDelay: "0.9s" }}
            >
              <div className="w-14 h-14 md:w-18 md:h-18 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-500 shadow-2xl flex items-center justify-center transform hover:scale-110 transition-transform">
                <Star className="w-7 h-7 md:w-9 md:h-9 text-white" />
              </div>
            </div>
          </div>

          <div className="relative z-10 text-center px-6 md:px-12 max-w-3xl lg:max-w-4xl mx-auto">
            <h1
              className={`text-6xl md:text-7xl lg:text-8xl font-light tracking-tight text-balance mb-8 transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              Coming Soon
            </h1>
            <p
              className={`text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto transition-all duration-1000 delay-200 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              We're working hard to bring you the best tutoring experience. Join the waitlist to be notified when we
              launch.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
