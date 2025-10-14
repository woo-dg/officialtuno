import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AdminDashboard } from "@/components/admin/admin-dashboard"

export default function AdminPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-muted/30">
        <AdminDashboard />
      </main>
      <Footer />
    </div>
  )
}
