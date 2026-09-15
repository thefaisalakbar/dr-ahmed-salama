/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#2F9C93',
        'primary-dark': '#227C75',
        'primary-light': '#A8DCD6',
        accent: '#F08A5D',
        'accent-dark': '#D96F42',
        background: '#FAF9F6',
        surface: '#FFFFFF',
        ink: '#182625',
        muted: '#5F706D',
        divider: '#E3E7E4',
        deep: '#0E2422',
      },
      fontFamily: {
        display: ['"Poppins"', 'system-ui', 'sans-serif'],
        serif: ['"Fraunces"', 'serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        arabic: ['"IBM Plex Sans Arabic"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2.5xl': '1.25rem',
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
        '7xl': '4rem',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'blink': 'blink 1s step-end infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
