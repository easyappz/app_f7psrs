/* Tailwind config scoped for CRA in /react */
module.exports = {
  content: ['./public/index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#F8FAFC',
          100: '#EDF2F7',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1F2937',
          900: '#0F172A',
        },
      },
      boxShadow: {
        soft: '0 2px 6px rgba(15, 23, 42, 0.06)',
      },
    },
  },
  plugins: [],
};
