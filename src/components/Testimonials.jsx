import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Quote, Info } from 'lucide-react'
import { useLang } from '../i18n/LanguageContext.jsx'

export default function Testimonials() {
  const ref = useRef(null)
  const { t, lang } = useLang()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.testimonial-card', {
        scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true },
        y: 32,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.1,
      })
    }, ref)
    return () => ctx.revert()
  }, [lang])

  return (
    <section ref={ref} className="relative py-24 sm:py-32 px-6 sm:px-10 lg:px-16 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-6">
          <span className="font-body text-sm font-semibold text-primary-dark">{t.testimonials.eyebrow}</span>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-ink mt-4 leading-[1.1] tracking-tight">
            {t.testimonials.heading}{' '}
            <span className="font-serif italic font-medium text-primary-dark">{t.testimonials.headingAccent}</span>
          </h2>
        </div>

        <div className="mb-12 inline-flex items-start gap-2.5 bg-accent/10 border border-accent/25 rounded-2xl px-4 py-3 max-w-2xl">
          <Info className="h-4 w-4 text-accent-dark mt-0.5 shrink-0" />
          <p className="text-accent-dark text-xs sm:text-sm leading-relaxed">{t.testimonials.note}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {t.testimonials.items.map((item) => (
            <div key={item.text} className="testimonial-card bg-surface border border-divider rounded-3xl p-7">
              <Quote className="h-6 w-6 text-primary/40" />
              <p className="text-ink text-[15px] leading-relaxed mt-4">{item.text}</p>
              <p className="text-muted text-xs font-semibold uppercase tracking-wide mt-5">{item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
