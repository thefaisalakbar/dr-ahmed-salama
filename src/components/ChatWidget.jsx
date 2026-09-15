import { useEffect, useRef, useState } from 'react'
import { MessageCircle, X, Send, ArrowLeft, MoreVertical, Smile } from 'lucide-react'
import { useLang } from '../i18n/LanguageContext.jsx'

// This client's dedicated n8n chat webhook. Never reuse this URL for another client's build.
const WEBHOOK_URL = 'https://n8n.thefaisalakbar.xyz/webhook/7b041c88-cac3-4ee1-99d1-127cabc68dbc/chat'

function uuid() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID()
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

function extractReplyText(data) {
  if (!data) return null
  if (typeof data === 'string') return data
  if (Array.isArray(data)) return extractReplyText(data[0])
  return data.output || data.text || data.reply || data.message || data.response || null
}

export default function ChatWidget() {
  const { t, isRtl } = useLang()
  const [launcherVisible, setLauncherVisible] = useState(false)
  const [introDismissed, setIntroDismissed] = useState(false)
  const [open, setOpen] = useState(false)
  const [stage, setStage] = useState('lead-form') // 'lead-form' | 'chat'
  const [menuOpen, setMenuOpen] = useState(false)

  const [lead, setLead] = useState({ name: '', phone: '', email: '', question: '', consent: false })
  const [formError, setFormError] = useState('')

  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const [chatError, setChatError] = useState('')
  const sessionIdRef = useRef(null)
  const scrollRef = useRef(null)

  useEffect(() => {
    const id = setTimeout(() => setLauncherVisible(true), 1200)
    return () => clearTimeout(id)
  }, [])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, sending])

  const resetWidget = () => {
    setStage('lead-form')
    setMessages([])
    setLead({ name: '', phone: '', email: '', question: '', consent: false })
    sessionIdRef.current = null
    setMenuOpen(false)
    setChatError('')
  }

  async function callWebhook(sessionId, chatInput, extra = {}) {
    const res = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'sendMessage',
        sessionId,
        chatInput,
        ...extra,
      }),
    })
    if (!res.ok) throw new Error(`Webhook returned ${res.status}`)
    const data = await res.json().catch(() => null)
    return extractReplyText(data) || (typeof data === 'string' ? data : null)
  }

  const handleLeadSubmit = async (e) => {
    e.preventDefault()
    if (!lead.name || !lead.phone || !lead.email || !lead.consent) {
      setFormError(t.chat.required)
      return
    }
    setFormError('')
    const sessionId = uuid()
    sessionIdRef.current = sessionId
    setStage('chat')
    setSending(true)
    setChatError('')

    const introText = lead.question
      ? `New enquiry from ${lead.name} (${lead.phone}, ${lead.email}). They asked: ${lead.question}`
      : `New enquiry from ${lead.name} (${lead.phone}, ${lead.email}). They would like to book an appointment.`

    setMessages([{ role: 'user', text: lead.question || t.chat.leadTitle }])

    try {
      const reply = await callWebhook(sessionId, introText, {
        leadName: lead.name,
        leadPhone: lead.phone,
        leadEmail: lead.email,
        leadQuestion: lead.question,
      })
      setMessages((m) => [...m, { role: 'bot', text: reply || '...' }])
    } catch (err) {
      setChatError(t.chat.errorMsg)
    } finally {
      setSending(false)
    }
  }

  const handleSend = async (e) => {
    e.preventDefault()
    const text = input.trim()
    if (!text || sending) return
    setInput('')
    setMessages((m) => [...m, { role: 'user', text }])
    setSending(true)
    setChatError('')
    try {
      const reply = await callWebhook(sessionIdRef.current, text)
      setMessages((m) => [...m, { role: 'bot', text: reply || '...' }])
    } catch (err) {
      setChatError(t.chat.errorMsg)
    } finally {
      setSending(false)
    }
  }

  return (
    <>
      {/* Launcher + intro bubble */}
      {!open && launcherVisible && (
        <div className="fixed bottom-6 end-6 z-40 flex flex-col items-end gap-3">
          {!introDismissed && (
            <div className="relative max-w-[220px] bg-surface border border-divider rounded-2xl rounded-ee-sm shadow-xl px-4 py-3 text-sm text-ink">
              <button
                onClick={() => setIntroDismissed(true)}
                className="absolute -top-2 -end-2 h-5 w-5 rounded-full bg-ink/80 text-white flex items-center justify-center"
                aria-label="Dismiss"
              >
                <X className="h-3 w-3" />
              </button>
              {t.chat.introBubble}
            </div>
          )}
          <button
            onClick={() => setOpen(true)}
            aria-label={t.chat.openLabel}
            className="h-14 w-14 rounded-full bg-primary shadow-xl shadow-primary/30 flex items-center justify-center magnetic-btn"
          >
            <MessageCircle className="h-6 w-6 text-white" strokeWidth={2.2} />
          </button>
        </div>
      )}

      {/* Chat panel */}
      {open && (
        <div className="fixed inset-0 sm:inset-auto sm:bottom-6 sm:end-6 z-50 sm:w-[380px] sm:h-[600px] sm:max-h-[85dvh] flex flex-col bg-surface sm:rounded-4xl shadow-2xl overflow-hidden border border-divider">
          {/* Header */}
          <div className="glass-dark text-white px-5 py-4 flex items-center gap-3 shrink-0">
            <button
              onClick={() => setOpen(false)}
              className="sm:hidden p-1 -ms-1"
              aria-label={t.chat.backLabel}
            >
              <ArrowLeft className="h-5 w-5 rtl:rotate-180" />
            </button>
            <span className="relative h-10 w-10 rounded-full bg-primary flex items-center justify-center shrink-0">
              <Smile className="h-5 w-5 text-white" />
              <span className="absolute -bottom-0.5 -end-0.5 h-3 w-3 rounded-full bg-emerald-400 border-2 border-deep" />
            </span>
            <div className="flex-1 min-w-0">
              <p className="font-display font-semibold text-sm leading-tight truncate">{t.chat.assistantName}</p>
              <p className="text-white/60 text-xs leading-tight">{t.chat.assistantRole} · {t.chat.online}</p>
            </div>
            <div className="relative">
              <button onClick={() => setMenuOpen((m) => !m)} className="p-1.5" aria-label="Menu">
                <MoreVertical className="h-5 w-5" />
              </button>
              {menuOpen && (
                <div className="absolute end-0 mt-2 w-44 bg-surface text-ink rounded-2xl shadow-xl border border-divider py-1.5 text-sm z-10">
                  <button onClick={resetWidget} className="w-full text-start px-4 py-2 hover:bg-background">
                    {isRtl ? 'محادثة جديدة' : 'New conversation'}
                  </button>
                </div>
              )}
            </div>
            <button onClick={() => setOpen(false)} className="hidden sm:block p-1.5" aria-label="Close">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Body */}
          {stage === 'lead-form' ? (
            <form onSubmit={handleLeadSubmit} className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
              <div>
                <h3 className="font-display font-bold text-lg text-ink">{t.chat.leadTitle}</h3>
                <p className="text-muted text-sm mt-1">{t.chat.leadSub}</p>
              </div>
              <input
                type="text"
                placeholder={t.chat.fields.name}
                required
                value={lead.name}
                onChange={(e) => setLead({ ...lead, name: e.target.value })}
                className="w-full bg-background border border-divider rounded-2xl px-4 py-3 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/15"
              />
              <input
                type="tel"
                placeholder={t.chat.fields.phone}
                required
                value={lead.phone}
                onChange={(e) => setLead({ ...lead, phone: e.target.value })}
                className="w-full bg-background border border-divider rounded-2xl px-4 py-3 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/15"
              />
              <input
                type="email"
                placeholder={t.chat.fields.email}
                required
                value={lead.email}
                onChange={(e) => setLead({ ...lead, email: e.target.value })}
                className="w-full bg-background border border-divider rounded-2xl px-4 py-3 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/15"
              />
              <textarea
                placeholder={t.chat.fields.question}
                rows={3}
                value={lead.question}
                onChange={(e) => setLead({ ...lead, question: e.target.value })}
                className="w-full bg-background border border-divider rounded-2xl px-4 py-3 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/15 resize-none"
              />
              <label className="flex items-start gap-2.5 text-xs text-muted">
                <input
                  type="checkbox"
                  checked={lead.consent}
                  onChange={(e) => setLead({ ...lead, consent: e.target.checked })}
                  className="mt-0.5 h-4 w-4 rounded border-divider accent-primary shrink-0"
                />
                {t.chat.consent}
              </label>
              {formError && <p className="text-xs text-accent-dark">{formError}</p>}
              <button
                type="submit"
                className="magnetic-btn mt-1 inline-flex items-center justify-center gap-2 bg-primary text-white font-semibold px-5 py-3 rounded-full"
              >
                {t.chat.startChat}
              </button>
            </form>
          ) : (
            <>
              <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 flex flex-col gap-3">
                {messages.map((m, i) => (
                  <div key={i} className={`flex items-end gap-2 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    {m.role === 'bot' && (
                      <span className="h-7 w-7 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                        <Smile className="h-3.5 w-3.5 text-primary-dark" />
                      </span>
                    )}
                    <div
                      className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                        m.role === 'user'
                          ? 'bg-primary text-white rounded-ee-sm'
                          : 'bg-background text-ink border border-divider rounded-es-sm'
                      }`}
                    >
                      {m.text}
                    </div>
                  </div>
                ))}
                {sending && (
                  <div className="flex items-end gap-2">
                    <span className="h-7 w-7 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                      <Smile className="h-3.5 w-3.5 text-primary-dark" />
                    </span>
                    <div className="bg-background border border-divider rounded-2xl rounded-es-sm px-4 py-2.5 text-xs text-muted">
                      {t.chat.typing}
                    </div>
                  </div>
                )}
                {chatError && <p className="text-xs text-accent-dark text-center">{chatError}</p>}
              </div>
              <form onSubmit={handleSend} className="shrink-0 border-t border-divider p-3 flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={t.chat.inputPlaceholder}
                  className="flex-1 bg-background border border-divider rounded-full px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/15"
                />
                <button
                  type="submit"
                  aria-label={t.chat.send}
                  disabled={sending}
                  className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center shrink-0 disabled:opacity-50"
                >
                  <Send className="h-4 w-4 rtl:-scale-x-100" />
                </button>
              </form>
            </>
          )}
        </div>
      )}
    </>
  )
}
