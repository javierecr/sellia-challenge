/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'selector',
  theme: {
    extend: {
      gridTemplateColumns: {
        '1-auto': '1fr auto',
      },
      gridTemplateRows: {
        // Simple 16 row grid
        'auto-1': 'auto 1fr',
        'auto-1-auto': 'auto 1fr auto',
      },
      maxWidth: {
        '80/100': '80%',
        '50/100': '50%',
      },
    },
  },
  plugins: [],
}
