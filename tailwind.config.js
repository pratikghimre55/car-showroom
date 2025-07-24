
module.exports = {
content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],  theme: {
    extend: {
      colors: {
        'dark-bg': '#0f0f0f',
        'accent': '#ffcc00',
      },
      fontFamily: {
        'oldschool': ['"Courier New"', 'monospace']
      }
    },
  },
  plugins: [],
}
