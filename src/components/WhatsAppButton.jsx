import { useLang } from '../i18n/LanguageContext.jsx'
import { doctorInfo } from '../i18n/translations.js'

export default function WhatsAppButton() {
  const { t } = useLang()
  const number = doctorInfo.whatsapp.replace(/[^\d]/g, '')

  return (
    <a
      href={`https://wa.me/${number}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.whatsappLabel}
      className="fixed bottom-6 start-6 z-40 h-14 w-14 rounded-full bg-[#25D366] shadow-xl shadow-black/20 flex items-center justify-center magnetic-btn"
    >
      <svg viewBox="0 0 24 24" className="h-7 w-7 text-white" fill="currentColor">
        <path d="M12.04 2c-5.46 0-9.9 4.44-9.9 9.9 0 1.75.46 3.45 1.32 4.95L2 22l5.28-1.39a9.9 9.9 0 0 0 4.76 1.21h.01c5.46 0 9.9-4.44 9.9-9.9 0-2.64-1.03-5.13-2.9-6.99A9.82 9.82 0 0 0 12.04 2Zm0 1.67c2.19 0 4.24.85 5.79 2.4a8.2 8.2 0 0 1 2.41 5.83c0 4.55-3.7 8.24-8.25 8.24a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.13.82.84-3.05-.2-.32a8.18 8.18 0 0 1-1.26-4.36c0-4.55 3.7-8.23 8.29-8.23Zm-4.53 4.4c-.15 0-.4.06-.61.29-.21.24-.8.78-.8 1.9s.82 2.2.94 2.36c.12.15 1.6 2.5 3.93 3.42 1.94.76 2.34.61 2.76.57.42-.04 1.36-.55 1.55-1.09.19-.53.19-.99.13-1.09-.06-.09-.21-.15-.44-.27-.23-.12-1.36-.67-1.57-.75-.21-.08-.36-.12-.52.12-.15.24-.6.75-.73.9-.14.15-.27.17-.5.06-.23-.12-.98-.36-1.87-1.15-.69-.61-1.16-1.37-1.29-1.6-.14-.24-.01-.36.1-.48.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.52-1.28-.72-1.75-.19-.46-.38-.4-.52-.4Z" />
      </svg>
    </a>
  )
}
