import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { StudentDashboard } from "@/components/student/dashboard"

export default function StudentDashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <StudentDashboard />
      </main>
      <Footer />
    </div>
  )
}
