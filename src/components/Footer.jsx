import { Smile, Phone, Mail, MapPin } from 'lucide-react'
import { useLang } from '../i18n/LanguageContext.jsx'
import { doctorInfo } from '../i18n/translations.js'

export default function Footer() {
  const { t, lang } = useLang()

  return (
    <footer className="relative bg-deep text-white rounded-t-6xl mt-4 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-10" />
      <div className="absolute -top-32 start-1/2 -translate-x-1/2 h-64 w-[40rem] rounded-full bg-primary/20 blur-3xl" />

      <div className="relative px-6 sm:px-10 lg:px-16 pt-16 pb-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-10 border-b border-white/10 pb-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary shrink-0">
                <Smile className="h-5 w-5 text-white" strokeWidth={2.3} />
              </span>
              <span className="font-display font-bold text-lg">{lang === 'ar' ? doctorInfo.nameAr : doctorInfo.name}</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">{t.footer.tagline}</p>
            <div className="flex items-center gap-2 mt-6">
              <span className="relative h-2 w-2 rounded-full bg-emerald-500">
                <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-75" />
              </span>
              <span className="text-[11px] uppercase tracking-widest text-white/60 font-semibold">{t.footer.status}</span>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary-light mb-4">{t.footer.servicesLabel}</p>
            <ul className="space-y-2.5">
              {t.services.items.slice(0, 4).map((s) => (
                <li key={s.title}>
                  <a href="#services" className="text-white/65 hover:text-primary-light transition text-sm">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary-light mb-4">{t.footer.practiceLabel}</p>
            <ul className="space-y-2.5">
              {t.footer.practiceLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-white/65 hover:text-primary-light transition text-sm">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary-light mb-4">{t.footer.contactLabel}</p>
            <ul className="space-y-2.5">
              <li>
                <a href={`tel:${doctorInfo.phoneTel}`} className="flex items-center gap-2 text-white/65 hover:text-primary-light transition text-sm">
                  <Phone className="h-3.5 w-3.5 shrink-0" />
                  <span dir="ltr">{doctorInfo.phoneDisplay}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${doctorInfo.email}`} className="flex items-center gap-2 text-white/65 hover:text-primary-light transition text-sm break-all">
                  <Mail className="h-3.5 w-3.5 shrink-0" />
                  {doctorInfo.email}
                </a>
              </li>
              <li className="flex items-start gap-2 text-white/65 text-sm">
                <MapPin className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                {t.contact.details.location}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-white/50">
          <span>{t.footer.copyright}</span>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-primary-light transition">{t.footer.privacy}</a>
            <a href="#" className="hover:text-primary-light transition">{t.footer.terms}</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
