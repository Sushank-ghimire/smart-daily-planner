/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        light: {
          primary: '#3A86FF',
          secondary: '#FFBE0B',
          background: '#F9FAFB',
          card: '#FFFFFF',
          textPrimary: '#1F2937',
          textSecondary: '#6B7280',
          border: '#E5E7EB',
          statusbar: '#3A86FF',
        },
        dark: {
          primary: '#3A86FF',
          secondary: '#FFBE0B',
          background: '#0F172A',
          card: '#1E293B',
          textPrimary: '#F1F5F9',
          textSecondary: '#94A3B8',
          border: '#334155',
          statusbar: '#0F172A',
        },
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};
