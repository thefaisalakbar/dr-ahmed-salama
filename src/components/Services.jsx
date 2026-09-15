import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ShieldCheck, Layers, Ruler, HeartHandshake, Hand, AlertTriangle, Sparkles, Droplet } from 'lucide-react'
import { useLang } from '../i18n/LanguageContext.jsx'

const ICONS = [ShieldCheck, Layers, Ruler, HeartHandshake, Hand, AlertTriangle, Sparkles, Droplet]
const SERVICE_IMAGES = [
  {
    src: '/images/gallery-1.jpg',
    alt: 'Child friendly dental consultation',
    label: 'First visits',
  },
  {
    src: '/images/gallery-2.jpg',
    alt: 'Child smiling after treatment',
    label: 'Healthy smiles',
  },
  {
    src: '/images/gallery-3.jpg',
    alt: 'Pediatric dentist treating a child',
    label: 'Gentle care',
  },
]

export default function Services() {
  const ref = useRef(null)
  const { t, lang } = useLang()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.svc-card', {
        scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true },
        y: 32,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.08,
      })
    }, ref)
    return () => ctx.revert()
  }, [lang])

  return (
    <section id="services" ref={ref} className="relative py-24 sm:py-32 px-6 sm:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-16">
          <span className="font-body text-sm font-semibold text-primary-dark">{t.services.eyebrow}</span>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-ink mt-4 leading-[1.1] tracking-tight">
            {t.services.heading}{' '}
            <span className="font-serif italic font-medium text-primary-dark">{t.services.headingAccent}</span>
          </h2>
          <p className="text-muted text-base sm:text-lg mt-5 leading-relaxed">{t.services.sub}</p>
        </div>

        <div className="mb-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {SERVICE_IMAGES.map((image) => (
            <div key={image.label} className="group relative overflow-hidden rounded-[28px] border border-divider bg-surface shadow-sm shadow-primary/5">
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                className="h-64 w-full object-cover object-center transition duration-500 group-hover:scale-105"
                style={{ objectPosition: 'center top' }}
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-deep/85 via-deep/35 to-transparent p-4">
                <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white">
                  {image.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {t.services.items.map((svc, i) => {
            const Icon = ICONS[i]
            return (
              <div
                key={svc.title}
                className="svc-card bg-surface border border-divider rounded-3xl p-6 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500"
              >
                <div className="h-11 w-11 rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
                  <Icon className="h-5 w-5 text-primary-dark" strokeWidth={2.2} />
                </div>
                <h3 className="font-display font-semibold text-lg text-ink leading-snug">{svc.title}</h3>
                <p className="text-muted text-sm mt-2.5 leading-relaxed">{svc.text}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
