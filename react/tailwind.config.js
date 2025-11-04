module.exports = {
  content: [
    "./public/index.html",
    "./src/**/*.{js,jsx,ts,tsx,html}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f6f7fb',
          100: '#eef0f7',
          200: '#d7d9e8',
          300: '#b5b9d6',
          400: '#8d93bd',
          500: '#63699f',
          600: '#4c5289',
          700: '#3c416f',
          800: '#2f3358',
          900: '#272a48',
        },
      },
      boxShadow: {
        soft: '0 10px 20px rgba(0,0,0,0.05)',
      },
    },
  },
  plugins: [],
};
