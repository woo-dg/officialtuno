import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Shield, CreditCard } from "lucide-react"

export function PricingSection() {
  return (
    <section className="container py-20 bg-secondary/30">
      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Simple, Fair Pricing</h2>
          <p className="text-lg text-muted-foreground">
            Pay only for the time you use. No subscriptions, no hidden fees.
          </p>
        </div>

        <Card className="p-8 md:p-10">
          <div className="text-center mb-8">
            <div className="mb-4">
              <span className="text-5xl font-bold">$0.62</span>
              <span className="text-2xl text-muted-foreground">/minute</span>
            </div>
            <Badge variant="secondary" className="mb-2">
              5 minute minimum
            </Badge>
            <p className="text-sm text-muted-foreground">Starting at $3.10 per session</p>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-3">
              <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Instant matching</p>
                <p className="text-sm text-muted-foreground">Connect with a tutor in ~30 seconds</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Course-specific experts</p>
                <p className="text-sm text-muted-foreground">Tutors verified for your exact course</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Session recordings</p>
                <p className="text-sm text-muted-foreground">Access recordings and notes anytime</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Shared whiteboard</p>
                <p className="text-sm text-muted-foreground">Real-time collaboration with LaTeX & code support</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-6 pt-6 border-t border-border">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="h-4 w-4" />
              <span>Secure escrow via Stripe</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CreditCard className="h-4 w-4" />
              <span>Dispute protection</span>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
