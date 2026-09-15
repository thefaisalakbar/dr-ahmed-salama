import { useState } from 'react'
import { Plus } from 'lucide-react'
import { useLang } from '../i18n/LanguageContext.jsx'

export default function Faq() {
  const { t } = useLang()
  const [openIdx, setOpenIdx] = useState(0)

  return (
    <section id="faq" className="relative py-24 sm:py-32 px-6 sm:px-10 lg:px-16 bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="max-w-2xl mb-14">
          <span className="font-body text-sm font-semibold text-primary-dark">{t.faq.eyebrow}</span>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-ink mt-4 leading-[1.1] tracking-tight">
            {t.faq.heading}{' '}
            <span className="font-serif italic font-medium text-primary-dark">{t.faq.headingAccent}</span>
          </h2>
        </div>

        <div className="flex flex-col divide-y divide-divider border-y border-divider">
          {t.faq.items.map((item, i) => {
            const isOpen = openIdx === i
            return (
              <div key={item.q}>
                <button
                  onClick={() => setOpenIdx(isOpen ? -1 : i)}
                  className="w-full flex items-center justify-between gap-4 py-5 text-start"
                  aria-expanded={isOpen}
                >
                  <span className="font-display font-semibold text-base sm:text-lg text-ink">{item.q}</span>
                  <Plus
                    className={`h-5 w-5 text-primary-dark shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
                  />
                </button>
                <div
                  className="grid transition-[grid-template-rows] duration-300 ease-out"
                  style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                >
                  <div className="overflow-hidden">
                    <p className="text-muted text-[15px] leading-relaxed pb-6 max-w-2xl">{item.a}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
