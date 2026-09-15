import { useState } from 'react'
import { Phone, Mail, MapPin, Clock, ArrowRight, CheckCircle2 } from 'lucide-react'
import { useLang } from '../i18n/LanguageContext.jsx'
import { doctorInfo } from '../i18n/translations.js'

function Field({ label, type = 'text', required, value, onChange }) {
  return (
    <div>
      <label className="text-xs font-semibold text-muted mb-2 block">
        {label} {required && '*'}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-background border border-divider rounded-2xl px-4 py-3.5 text-ink placeholder-muted/60 focus:border-primary focus:ring-4 focus:ring-primary/15 outline-none transition font-body"
      />
    </div>
  )
}

export default function ContactForm() {
  const { t } = useLang()
  const [form, setForm] = useState({ name: '', phone: '', email: '', childAge: '', message: '' })
  const [status, setStatus] = useState('idle')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.phone || !form.email) return
    setStatus('sending')
    setTimeout(() => setStatus('sent'), 1200)
  }

  return (
    <section id="contact" className="relative py-24 sm:py-32 px-6 sm:px-10 lg:px-16 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5">
            <span className="font-body text-sm font-semibold text-primary-dark">{t.contact.eyebrow}</span>
            <h2 className="font-display font-bold text-3xl sm:text-5xl text-ink mt-4 leading-[1.1] tracking-tight">
              {t.contact.heading}{' '}
              <span className="font-serif italic font-medium text-primary-dark">{t.contact.headingAccent}</span>
            </h2>
            <p className="text-muted text-base mt-5 leading-relaxed max-w-md">{t.contact.text}</p>

            <div className="mt-10 space-y-4">
              <a href={`tel:${doctorInfo.phoneTel}`} className="lift-on-hover flex items-center gap-4 group">
                <span className="h-12 w-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary transition shrink-0">
                  <Phone className="h-5 w-5 text-primary-dark group-hover:text-white" />
                </span>
                <span>
                  <span className="block text-xs font-semibold text-muted">{t.contact.details.callLabel}</span>
                  <span className="font-display font-semibold text-ink text-base sm:text-lg" dir="ltr">
                    {doctorInfo.phoneDisplay}
                  </span>
                </span>
              </a>
              <a href={`mailto:${doctorInfo.email}`} className="lift-on-hover flex items-center gap-4 group">
                <span className="h-12 w-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary transition shrink-0">
                  <Mail className="h-5 w-5 text-primary-dark group-hover:text-white" />
                </span>
                <span>
                  <span className="block text-xs font-semibold text-muted">{t.contact.details.emailLabel}</span>
                  <span className="font-display font-semibold text-ink text-base sm:text-lg break-all" dir="ltr">
                    {doctorInfo.email}
                  </span>
                </span>
              </a>
              <div className="flex items-center gap-4">
                <span className="h-12 w-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                  <MapPin className="h-5 w-5 text-primary-dark" />
                </span>
                <span>
                  <span className="block text-xs font-semibold text-muted">{t.contact.details.locationLabel}</span>
                  <span className="font-display font-semibold text-ink text-base sm:text-lg">
                    {t.contact.details.location}
                  </span>
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="h-12 w-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                  <Clock className="h-5 w-5 text-primary-dark" />
                </span>
                <span>
                  <span className="block text-xs font-semibold text-muted">{t.contact.details.hoursLabel}</span>
                  <span className="font-display font-semibold text-ink text-base sm:text-lg">
                    {t.contact.details.hoursValue}
                  </span>
                </span>
              </div>
            </div>

            <div className="mt-8 p-5 rounded-3xl bg-primary/5 border border-primary/15">
              <p className="text-sm text-muted leading-relaxed">{t.contact.privacyNote}</p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="bg-surface border border-divider rounded-5xl p-7 sm:p-10 shadow-xl shadow-primary/5">
              {status !== 'sent' ? (
                <>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field label={t.contact.form.name} required value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
                    <Field label={t.contact.form.phone} type="tel" required value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
                    <Field label={t.contact.form.email} type="email" required value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
                    <Field label={t.contact.form.childAge} value={form.childAge} onChange={(v) => setForm({ ...form, childAge: v })} />
                  </div>
                  <div className="mt-5">
                    <label className="text-xs font-semibold text-muted mb-2 block">{t.contact.form.message}</label>
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      rows={4}
                      className="w-full bg-background border border-divider rounded-2xl px-4 py-3.5 text-ink placeholder-muted/60 focus:border-primary focus:ring-4 focus:ring-primary/15 outline-none transition resize-none font-body"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="magnetic-btn mt-6 w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary text-white font-semibold px-7 py-3.5 rounded-full shadow-lg shadow-primary/30 disabled:opacity-50"
                  >
                    {status === 'sending' ? t.contact.form.sending : t.contact.form.submit}
                    <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                  </button>
                </>
              ) : (
                <div className="text-center py-14">
                  <div className="h-16 w-16 mx-auto rounded-full bg-primary/15 flex items-center justify-center mb-6">
                    <CheckCircle2 className="h-8 w-8 text-primary-dark" />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-ink mb-3">{t.contact.form.sentTitle}</h3>
                  <p className="text-muted max-w-md mx-auto">{t.contact.form.sentText}</p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
