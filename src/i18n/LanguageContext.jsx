import { createContext, useContext, useEffect, useState } from 'react'
import { translations } from './translations.js'

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en')
  const t = translations[lang]

  useEffect(() => {
    document.documentElement.lang = lang === 'ar' ? 'ar' : 'en'
    document.documentElement.dir = t.dir
  }, [lang, t.dir])

  const toggleLang = () => setLang((l) => (l === 'en' ? 'ar' : 'en'))

  return (
    <LanguageContext.Provider value={{ lang, t, toggleLang, isRtl: t.dir === 'rtl' }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLang() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang must be used within LanguageProvider')
  return ctx
}
