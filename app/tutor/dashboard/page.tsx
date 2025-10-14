import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { TutorDashboard } from "@/components/tutor/dashboard"

export default function TutorDashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <TutorDashboard />
      </main>
      <Footer />
    </div>
  )
}
