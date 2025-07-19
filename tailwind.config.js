// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',            // or 'media'
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          50:  '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',    // ← your “dark-600”
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        accent: {
          blue:   '#3b82f6',
          purple: '#a855f7',
          red:    '#ef4444',
        },
      },
    },
  },
  plugins: [],
}
