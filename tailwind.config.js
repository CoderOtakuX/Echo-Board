/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        "primary": "#3b82f6",
        "primary-dark": "#1d4ed8",
        "accent": "#6366f1",
        "background-light": "#f3f4f6",
        "surface-light": "#ffffff",
        "brut-black": "#000000",
        "accent-yellow": "#FFD700",
      },
      fontFamily: {
        "display": ["Inter", "sans-serif"],
        "body": ["Inter", "sans-serif"],
        "mono": ["JetBrains Mono", "monospace"],
        "jp": ["Noto Sans JP", "sans-serif"],
      },
      borderRadius: {
        "lg": "1rem",
        "xl": "1.5rem",
        "2xl": "2rem",
      },
      boxShadow: {
        'brutalist': '4px 4px 0px 0px #000000',
        'brutalist-sm': '2px 2px 0px 0px #000000',
        'brutalist-hover': '2px 2px 0px 0px #000000',
        'brutalist-thick': '8px 8px 0px 0px #000000',
        'brutalist-thick-hover': '4px 4px 0px 0px #000000',
      },
      animation: {
        'float-slow': 'float 8s ease-in-out infinite',
        'float-medium': 'float 6s ease-in-out infinite',
        'float-fast': 'float 4s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
