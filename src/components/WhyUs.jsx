import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { GraduationCap, HeartHandshake, BookOpenCheck, Smile } from 'lucide-react'
import { useLang } from '../i18n/LanguageContext.jsx'

const ICONS = [GraduationCap, HeartHandshake, BookOpenCheck, Smile]

export default function WhyUs() {
  const ref = useRef(null)
  const { t, lang } = useLang()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.pillar-card', {
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
    <section id="why-us" ref={ref} className="relative py-24 sm:py-32 px-6 sm:px-10 lg:px-16 bg-deep text-white overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-10" />
      <div className="absolute -top-20 end-[-10%] h-96 w-96 rounded-full bg-primary/20 blur-3xl" />

      <div className="relative max-w-7xl mx-auto">
        <div className="max-w-2xl mb-16">
          <span className="font-body text-sm font-semibold text-primary-light">{t.whyUs.eyebrow}</span>
          <h2 className="font-display font-bold text-3xl sm:text-5xl mt-4 leading-[1.1] tracking-tight">
            {t.whyUs.heading}{' '}
            <span className="font-serif italic font-medium text-primary-light">{t.whyUs.headingAccent}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {t.whyUs.items.map((item, i) => {
            const Icon = ICONS[i]
            return (
              <div key={item.title} className="pillar-card bg-white/5 border border-white/10 rounded-3xl p-7 hover:bg-white/[0.08] transition-colors duration-500">
                <div className="h-11 w-11 rounded-2xl bg-primary/20 flex items-center justify-center mb-6">
                  <Icon className="h-5 w-5 text-primary-light" strokeWidth={2.2} />
                </div>
                <h3 className="font-display font-semibold text-lg leading-snug">{item.title}</h3>
                <p className="text-white/60 text-sm mt-3 leading-relaxed">{item.text}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
