import { Hero } from '@/components/landing/hero'
import { Services } from '@/components/landing/services'
import { Portfolio } from '@/components/landing/portfolio'
import { HowItWorks } from '@/components/landing/how-it-works'
import { Testimonials } from '@/components/landing/testimonials'
import { ContactForm } from '@/components/landing/contact-form'
import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <Services />
        <Portfolio />
        <HowItWorks />
        <Testimonials />
        <ContactForm />
      </main>
      <Footer />
    </div>
  )
}
