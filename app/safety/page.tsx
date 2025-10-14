import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SafetyPage } from "@/components/safety/safety-page"

export default function Safety() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <SafetyPage />
      </main>
      <Footer />
    </div>
  )
}
