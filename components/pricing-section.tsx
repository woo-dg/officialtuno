import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Shield, CreditCard } from "lucide-react"

export function PricingSection() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-3 sm:mb-4">
              Simple, Fair Pricing
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground">
              Pay only for the time you use. No subscriptions, no hidden fees.
            </p>
          </div>

          <Card className="p-6 sm:p-8 md:p-10">
            <div className="text-center mb-6 sm:mb-8">
              <div className="mb-3 sm:mb-4">
                <span className="text-4xl sm:text-5xl font-bold">$0.62</span>
                <span className="text-xl sm:text-2xl text-muted-foreground">/minute</span>
              </div>
              <Badge variant="secondary" className="mb-2">
                5 minute minimum
              </Badge>
              <p className="text-xs sm:text-sm text-muted-foreground">Starting at $3.10 per session</p>
            </div>

            <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              <div className="flex items-start gap-3">
                <Check className="h-4 w-4 sm:h-5 sm:w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm sm:text-base">Instant matching</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Connect with a tutor in ~30 seconds</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-4 w-4 sm:h-5 sm:w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm sm:text-base">Course-specific experts</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Tutors verified for your exact course</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-4 w-4 sm:h-5 sm:w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm sm:text-base">Session recordings</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Access recordings and notes anytime</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-4 w-4 sm:h-5 sm:w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm sm:text-base">Shared whiteboard</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Real-time collaboration with LaTeX & code support</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 pt-5 sm:pt-6 border-t border-border">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                <Shield className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span>Secure escrow via Stripe</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                <CreditCard className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span>Dispute protection</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
