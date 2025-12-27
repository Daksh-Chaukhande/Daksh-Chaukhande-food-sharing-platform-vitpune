import { Header } from './Header'
import { Footer } from './Footer'

export function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-1 py-8">
        {children}
      </main>
      <Footer />
    </div>
  )
}
