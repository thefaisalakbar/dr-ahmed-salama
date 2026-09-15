import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ArrowRight, Phone, GraduationCap } from 'lucide-react'
import { useLang } from '../i18n/LanguageContext.jsx'
import { doctorInfo } from '../i18n/translations.js'

export default function Hero() {
  const ref = useRef(null)
  const { t, lang } = useLang()

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return
    const ctx = gsap.context(() => {
      gsap.from('.hero-credential', { y: 20, opacity: 0, duration: 0.8, delay: 0.15, ease: 'power3.out' })
      gsap.from('.hero-line-1', { y: 40, opacity: 0, duration: 1, delay: 0.3, ease: 'power3.out' })
      gsap.from('.hero-line-2', { y: 60, opacity: 0, duration: 1.2, delay: 0.5, ease: 'power3.out' })
      gsap.from('.hero-cta, .hero-meta', { y: 24, opacity: 0, duration: 0.8, delay: 0.8, stagger: 0.12, ease: 'power3.out' })
      gsap.from('.hero-photo', { scale: 0.92, opacity: 0, duration: 1.1, delay: 0.4, ease: 'power3.out' })
    }, ref)
    return () => ctx.revert()
  }, [lang])

  return (
    <section id="home" ref={ref} className="relative min-h-[100dvh] w-full overflow-hidden bg-deep">
      <div className="absolute inset-0 grid-bg opacity-[0.15]" />
      <div className="absolute -top-24 start-[-10%] h-96 w-96 rounded-full bg-primary/25 blur-3xl" />
      <div className="absolute bottom-0 end-[-5%] h-80 w-80 rounded-full bg-accent/15 blur-3xl" />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 end-[18%] h-2 w-2 rounded-full bg-primary-light/70 animate-float" style={{ animationDelay: '0s' }} />
        <div className="absolute top-[55%] end-[10%] h-1.5 w-1.5 rounded-full bg-white/40 animate-float" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-[40%] end-[26%] h-1 w-1 rounded-full bg-accent/70 animate-float" style={{ animationDelay: '3s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-36 pb-20 min-h-[100dvh] flex items-center">
        <div className="grid lg:grid-cols-12 gap-12 items-center w-full">
          <div className="lg:col-span-7">
            <p className="hero-credential inline-flex items-center gap-2 font-body text-xs sm:text-sm text-primary-light/90 mb-6 border border-primary-light/25 rounded-full px-4 py-1.5">
              <GraduationCap className="h-3.5 w-3.5" />
              {t.hero.credential}
            </p>
            <h1 className="font-display font-bold text-white leading-[1.05] tracking-tight text-4xl sm:text-6xl lg:text-7xl text-balance">
              <span className="hero-line-1 block">{t.hero.line1}</span>
              <span className="hero-line-2 block font-serif italic font-medium text-primary-light mt-1">
                {t.hero.line2}
              </span>
            </h1>
            <p className="hero-meta mt-8 max-w-xl text-white/70 text-base sm:text-lg leading-relaxed">
              {t.hero.subtext}
            </p>
            <div className="hero-cta mt-10 flex flex-wrap gap-3">
              <a
                href="#contact"
                className="magnetic-btn group inline-flex items-center gap-2 bg-primary text-white font-semibold px-6 py-3.5 rounded-full shadow-2xl shadow-primary/30"
              >
                {t.hero.ctaPrimary}
                <ArrowRight className="h-4 w-4 rtl:rotate-180 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
              </a>
              <a
                href={`tel:${doctorInfo.phoneTel}`}
                className="lift-on-hover inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white border border-white/20 font-medium px-6 py-3.5 rounded-full"
              >
                <Phone className="h-4 w-4" />
                {t.hero.ctaSecondary}
              </a>
            </div>
            <p className="hero-meta mt-8 text-white/50 text-sm font-medium">
              {t.hero.trust}
            </p>
          </div>

          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="hero-photo relative">
              <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-primary/40 via-transparent to-accent/30 blur-2xl" />
              <img
                src="/images/headshot.jpg"
                alt={lang === 'ar' ? doctorInfo.nameAr : doctorInfo.name}
                className="relative h-64 w-64 sm:h-80 sm:w-80 rounded-[2.5rem] object-cover border-4 border-white/10 shadow-2xl"
              />
              <div className="absolute -bottom-4 -start-4 bg-surface rounded-2xl px-4 py-3 shadow-xl flex items-center gap-2">
                <span className="relative h-2 w-2 rounded-full bg-emerald-500">
                  <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-75" />
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-ink/70 whitespace-nowrap">
                  {lang === 'ar' ? 'يستقبل مرضى جدد' : 'Accepting new patients'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
