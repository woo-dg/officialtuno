import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, UserCheck, Lock, Eye, AlertCircle, FileText, MessageSquare, CheckCircle2 } from "lucide-react"

const safetyFeatures = [
  {
    icon: UserCheck,
    title: "Verified Tutors",
    description:
      "All tutors undergo ID verification, background checks, and course-specific assessments before joining the platform.",
  },
  {
    icon: Lock,
    title: "Secure Payments",
    description:
      "Payments are held in escrow via Stripe and only released after session completion. Full dispute protection included.",
  },
  {
    icon: Eye,
    title: "Session Monitoring",
    description:
      "All sessions are recorded and monitored by our AI safety system to detect and prevent inappropriate behavior.",
  },
  {
    icon: Shield,
    title: "Privacy Protection",
    description:
      "Your personal information is encrypted and never shared. Students and tutors only see necessary contact details.",
  },
]

const communityGuidelines = [
  {
    title: "Respectful Communication",
    points: [
      "Treat all users with respect and professionalism",
      "No harassment, discrimination, or offensive language",
      "Keep conversations focused on academic topics",
    ],
  },
  {
    title: "Academic Integrity",
    points: [
      "Tutors provide guidance, not complete assignments",
      "Students must do their own work and learning",
      "No sharing of exam answers or academic dishonesty",
    ],
  },
  {
    title: "Platform Usage",
    points: [
      "Use the platform only for legitimate tutoring purposes",
      "No solicitation of off-platform services",
      "Report any suspicious or inappropriate behavior",
    ],
  },
]

const reportingProcess = [
  {
    step: 1,
    title: "Report Incident",
    description: "Use the in-session report button or contact support immediately",
  },
  {
    step: 2,
    title: "Investigation",
    description: "Our safety team reviews session recordings and evidence within 24 hours",
  },
  {
    step: 3,
    title: "Action Taken",
    description: "Appropriate measures including warnings, suspensions, or permanent bans",
  },
  {
    step: 4,
    title: "Follow-up",
    description: "You'll receive updates on the investigation and outcome",
  },
]

export function SafetyPage() {
  return (
    <div className="container py-12">
      <div className="mx-auto max-w-4xl">
        {/* Hero */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            <Shield className="mr-1.5 h-3.5 w-3.5" />
            Safety & Integrity
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight mb-4">Your Safety is Our Priority</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We've built comprehensive safety measures to ensure a secure, trustworthy learning environment for all
            users.
          </p>
        </div>

        {/* Safety Features */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Safety Features</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {safetyFeatures.map((feature, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Community Guidelines */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Community Guidelines</h2>
          <div className="space-y-6">
            {communityGuidelines.map((guideline, index) => (
              <Card key={index} className="p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  {guideline.title}
                </h3>
                <ul className="space-y-2">
                  {guideline.points.map((point, pointIndex) => (
                    <li key={pointIndex} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </section>

        {/* Reporting Process */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Reporting & Enforcement</h2>
          <Card className="p-6">
            <div className="space-y-6">
              {reportingProcess.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold flex-shrink-0">
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* Trust & Safety Team */}
        <section className="mb-16">
          <Card className="p-8 bg-primary/5 border-primary/20">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">24/7 Trust & Safety Team</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  Our dedicated safety team monitors the platform around the clock. If you experience any issues or have
                  concerns, we're here to help immediately.
                </p>
                <div className="flex flex-wrap gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-primary" />
                    <span>Emergency: Use in-session report button</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-primary" />
                    <span>Non-urgent: safety@tuno.com</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Data Privacy */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Data Privacy & Security</h2>
          <Card className="p-6">
            <div className="space-y-4 text-sm text-muted-foreground">
              <p className="leading-relaxed">
                We take your privacy seriously. All personal data is encrypted in transit and at rest using
                industry-standard protocols. Session recordings are stored securely and only accessible to authorized
                personnel for safety and quality purposes.
              </p>
              <p className="leading-relaxed">
                We never sell your data to third parties. Payment information is handled exclusively by Stripe and never
                stored on our servers. You have full control over your data and can request deletion at any time.
              </p>
              <div className="pt-4 border-t border-border">
                <p className="font-medium text-foreground mb-2">Learn More:</p>
                <div className="flex flex-wrap gap-3">
                  <a href="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </a>
                  <span>•</span>
                  <a href="/terms" className="text-primary hover:underline">
                    Terms of Service
                  </a>
                  <span>•</span>
                  <a href="/data-protection" className="text-primary hover:underline">
                    Data Protection
                  </a>
                </div>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </div>
  )
}
