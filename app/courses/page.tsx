import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CoursesPage } from "@/components/courses/courses-page"

export default function Courses() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <CoursesPage />
      </main>
      <Footer />
    </div>
  )
}
