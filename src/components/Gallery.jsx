import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLang } from '../i18n/LanguageContext.jsx'

const IMAGES = [
  '/images/gallery-1.jpg',
  '/images/gallery-2.jpg',
  '/images/gallery-3.jpg',
  '/images/gallery-4.jpg',
  '/images/gallery-5.jpg',
]

export default function Gallery() {
  const ref = useRef(null)
  const { t, lang } = useLang()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.gallery-item', {
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
    <section id="gallery" ref={ref} className="relative py-24 sm:py-32 px-6 sm:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-14">
          <span className="font-body text-sm font-semibold text-primary-dark">{t.gallery.eyebrow}</span>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-ink mt-4 leading-[1.1] tracking-tight">
            {t.gallery.heading}{' '}
            <span className="font-serif italic font-medium text-primary-dark">{t.gallery.headingAccent}</span>
          </h2>
          <p className="text-muted text-base sm:text-lg mt-5 leading-relaxed">{t.gallery.sub}</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {IMAGES.map((src, i) => (
            <figure
              key={src}
              className={`gallery-item relative overflow-hidden rounded-3xl bg-divider/40 ${
                i === 0 ? 'col-span-2 row-span-2 lg:col-span-2 lg:row-span-2' : ''
              }`}
              style={{ aspectRatio: i === 0 ? '1 / 1' : '3 / 4' }}
            >
              <img
                src={src}
                alt=""
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover object-center"
                style={{ objectPosition: i === 0 ? 'center center' : 'center top' }}
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-deep/80 to-transparent p-4 text-white text-xs sm:text-sm font-medium">
                {t.gallery.captions[i]}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
