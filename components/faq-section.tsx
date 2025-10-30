"use client"

import { useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Plus } from "lucide-react"

export function FAQSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("General")

  const categories = ["General", "For Students", "For Tutors", "Pricing", "Technical"]

  const faqs = [
    {
      category: "General",
      question: "How does Tuno work?",
      answer:
        "Tuno connects you with verified tutors in ~30 seconds. Submit your question, get matched with a qualified tutor for your exact course or topic, and start learning right away.",
    },
    {
      category: "Pricing",
      question: "How much does it cost?",
      answer:
        "We use simple block pricing. Most sessions fit in one of three blocks: $8 for 15 minutes, $14 for 30 minutes, or $24 for 60 minutes. You pick the block that matches how stuck you are, and you only pay for that. No subscriptions.",
    },
    {
      category: "For Students",
      question: "Are tutors verified?",
      answer:
        "Yes. Tutors upload transcripts and are approved for the specific courses they teach. Sessions are recorded and reviewed for quality and academic integrity.",
    },
    {
      category: "General",
      question: "How fast can I get help?",
      answer:
        "Most students are matched with a tutor in about 30 seconds. No scheduling, no back-and-forth, just instant help whenever you need it.",
    },
    {
      category: "For Students",
      question: "What subjects do you cover?",
      answer:
        "We cover core subjects like Math, Physics, Chemistry, Biology, Computer Science, and English, plus many university-specific courses. We match on subject and level.",
    },
    {
      category: "For Tutors",
      question: "How do I become a tutor?",
      answer:
        "Join our waitlist and upload your transcript. Once we verify you, you can start accepting sessions immediately. First to accept gets the session, so you never get buried in a marketplace.",
    },
    {
      category: "Technical",
      question: "Is my session private and secure?",
      answer:
        "Yes. Sessions run on our secure platform, are encrypted, and are only used for quality and integrity checks.",
    },
    {
      category: "For Students",
      question: "Can I end a session anytime?",
      answer:
        "Yes. You’re in control. If you finish early, you can wrap up. Our goal is to keep the experience fast and efficient, not to drag it out.",
    },
  ]

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.category === activeCategory &&
      (faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  return (
    <section className="py-12 sm:py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">FAQ</h2>
        </div>

        <div className="mb-6 sm:mb-8">
          <div className="relative w-full">
            <div className="relative">
              <input
                type="text"
                placeholder="Type your question here"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 sm:h-14 pl-0 pr-12 sm:pr-14 text-base bg-transparent border-0 border-b-2 border-border outline-none focus:outline-none focus:border-foreground rounded-none text-foreground placeholder:text-muted-foreground transition-colors"
              />
              <button className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-foreground/5 rounded-full transition-colors">
                <Plus className="w-4 h-4 sm:w-5 sm:h-5 text-foreground" />
              </button>
            </div>
          </div>
        </div>

        <div className="mb-6 sm:mb-8 border-b border-border">
          <div className="flex gap-6 sm:gap-8 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`whitespace-nowrap pb-3 text-sm font-medium transition-colors relative ${
                  activeCategory === category ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {category}
                {activeCategory === category && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground" />}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4 sm:mb-6">
          <p className="text-xs sm:text-sm font-semibold text-foreground">{filteredFaqs.length} Results</p>
        </div>

        <div className="space-y-0 border-t border-border">
          {filteredFaqs.map((faq, index) => (
            <Accordion key={index} type="single" collapsible>
              <AccordionItem value={`item-${index}`} className="border-b border-border">
                <AccordionTrigger className="hover:no-underline py-5 sm:py-6 group">
                  <div className="flex items-center gap-3 sm:gap-4 flex-1 text-left">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-border flex items-center justify-center flex-shrink-0 group-hover:border-foreground/30 transition-colors">
                      <Plus className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                    </div>
                    <span className="text-base font-normal text-foreground pr-2 sm:pr-4">{faq.question}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pl-12 sm:pl-14 pr-3 sm:pr-4 pb-5 sm:pb-6">
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>

        <div className="mt-10 sm:mt-12 text-center">
          <p className="text-sm sm:text-base text-muted-foreground">
            Still have questions?{" "}
            <a href="mailto:support@tuno.com" className="text-foreground font-semibold hover:underline">
              Contact us
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
