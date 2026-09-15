import { ShieldCheck, FileCheck2, HandCoins } from 'lucide-react'
import { useLang } from '../i18n/LanguageContext.jsx'

export default function Insurance() {
  const { t } = useLang()
  const icons = [ShieldCheck, FileCheck2, HandCoins]

  return (
    <section className="relative py-20 sm:py-28 px-6 sm:px-10 lg:px-16">
      <div className="max-w-5xl mx-auto bg-surface border border-divider rounded-5xl p-8 sm:p-14 shadow-sm">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="font-body text-sm font-semibold text-primary-dark">{t.insurance.eyebrow}</span>
            <h2 className="font-display font-bold text-2xl sm:text-4xl text-ink mt-4 leading-[1.15] tracking-tight">
              {t.insurance.heading}{' '}
              <span className="font-serif italic font-medium text-primary-dark">{t.insurance.headingAccent}</span>
            </h2>
            <p className="text-muted text-base mt-5 leading-relaxed">{t.insurance.text}</p>
            <p className="text-muted/80 text-xs mt-4 leading-relaxed">{t.insurance.note}</p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {icons.map((Icon, i) => (
              <div key={i} className="aspect-square rounded-3xl bg-primary/8 flex items-center justify-center">
                <Icon className="h-8 w-8 text-primary-dark" strokeWidth={1.8} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
