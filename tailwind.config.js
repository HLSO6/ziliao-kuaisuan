/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#5BAF7D',
        lightGreen: '#F3FAF5',
        cardBg: '#FFFFFF',
        darkText: '#1F2937',
        secondaryText: '#6B7280',
        lightGreenAccent: '#DDF3E4',
      },
    },
  },
  plugins: [],
};