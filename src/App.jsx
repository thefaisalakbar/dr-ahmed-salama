import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { LanguageProvider } from './i18n/LanguageContext.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Services from './components/Services.jsx'
import WhyUs from './components/WhyUs.jsx'
import Gallery from './components/Gallery.jsx'
import Testimonials from './components/Testimonials.jsx'
import Insurance from './components/Insurance.jsx'
import Faq from './components/Faq.jsx'
import ContactForm from './components/ContactForm.jsx'
import Footer from './components/Footer.jsx'
import WhatsAppButton from './components/WhatsAppButton.jsx'
import ChatWidget from './components/ChatWidget.jsx'

gsap.registerPlugin(ScrollTrigger)

function Shell() {
  useEffect(() => {
    const t1 = setTimeout(() => ScrollTrigger.refresh(), 200)
    const t2 = setTimeout(() => ScrollTrigger.refresh(), 1000)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  return (
    <div className="relative">
      <div className="noise-overlay" />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <WhyUs />
        <Gallery />
        <Testimonials />
        <Insurance />
        <Faq />
        <ContactForm />
      </main>
      <Footer />
      <WhatsAppButton />
      <ChatWidget />
    </div>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <Shell />
    </LanguageProvider>
  )
}
