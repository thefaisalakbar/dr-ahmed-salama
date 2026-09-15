import { useEffect, useState } from 'react'
import { Smile, Menu, X, ArrowUpRight, Languages, Phone } from 'lucide-react'
import { useLang } from '../i18n/LanguageContext.jsx'
import { doctorInfo } from '../i18n/translations.js'

export default function Navbar() {
  const { t, lang, toggleLang } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav
        className={`fixed top-4 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 z-50 transition-all duration-500 ${
          scrolled ? 'glass shadow-lg shadow-primary/10' : 'bg-transparent'
        } rounded-full px-4 sm:px-6 py-2.5 w-[calc(100%-2rem)] max-w-5xl`}
      >
        <div className="flex items-center justify-between gap-4">
          <a href="#home" className="flex items-center gap-2 group shrink-0">
            <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-primary">
              <Smile className="h-5 w-5 text-white" strokeWidth={2.3} />
              <span className="absolute inset-0 rounded-full ring-2 ring-primary/30 group-hover:ring-primary/50 transition" />
            </span>
            <span className={`font-display font-bold tracking-tight text-sm sm:text-base leading-tight ${scrolled ? 'text-ink' : 'text-white'} transition-colors`}>
              {lang === 'ar' ? doctorInfo.nameAr : doctorInfo.name}
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-6">
            {t.nav.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-medium lift-on-hover ${
                  scrolled ? 'text-ink/70 hover:text-primary' : 'text-white/90 hover:text-white'
                } transition-colors`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-2">
            <button
              onClick={toggleLang}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold transition-colors ${
                scrolled ? 'text-ink/70 hover:text-primary bg-divider/40' : 'text-white/90 hover:text-white bg-white/10'
              }`}
              aria-label="Toggle language"
            >
              <Languages className="h-3.5 w-3.5" />
              {t.meta.langLabel}
            </button>
            <a
              href="#contact"
              className="magnetic-btn inline-flex items-center gap-1.5 bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg shadow-primary/30"
            >
              {t.nav.cta}
              <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" strokeWidth={2.5} />
            </a>
          </div>

          <button
            onClick={() => setOpen(true)}
            className={`lg:hidden p-2 rounded-full ${scrolled ? 'text-ink' : 'text-white'}`}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-[60] transition-all duration-500 lg:hidden ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-deep/90 backdrop-blur-2xl" onClick={() => setOpen(false)} />
        <div
          className={`absolute top-0 inset-x-0 bg-background rounded-b-5xl px-6 pt-8 pb-12 transition-transform duration-500 ${
            open ? 'translate-y-0' : '-translate-y-full'
          }`}
        >
          <div className="flex items-center justify-between mb-10">
            <span className="font-display font-bold text-lg text-ink">
              {lang === 'ar' ? doctorInfo.nameAr : doctorInfo.name}
            </span>
            <button onClick={() => setOpen(false)} className="p-2 rounded-full bg-divider/40">
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="flex flex-col gap-1">
            {t.nav.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-display text-2xl font-semibold text-ink py-3 border-b border-divider"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="mt-6 flex items-center gap-3">
            <button
              onClick={toggleLang}
              className="flex-1 inline-flex items-center justify-center gap-1.5 bg-divider/40 text-ink px-4 py-3 rounded-full text-sm font-semibold"
            >
              <Languages className="h-4 w-4" />
              {t.meta.langLabel}
            </button>
            <a
              href={`tel:${doctorInfo.phoneTel}`}
              className="flex-1 inline-flex items-center justify-center gap-1.5 bg-divider/40 text-ink px-4 py-3 rounded-full text-sm font-semibold"
            >
              <Phone className="h-4 w-4" />
              {doctorInfo.phoneDisplay}
            </a>
          </div>
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-4 magnetic-btn flex items-center justify-center gap-2 bg-primary text-white px-6 py-4 rounded-full font-semibold w-full"
          >
            {t.nav.cta}
            <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" />
          </a>
        </div>
      </div>
    </>
  )
}
