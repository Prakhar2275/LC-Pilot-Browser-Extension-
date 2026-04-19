/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        lc: {
          bg:      '#1a1a1a',   // main background
          surface: '#282828',   // cards / panels
          border:  '#3e3e3e',   // dividers
          orange:  '#ffa116',   // LeetCode accent
          'orange-dark': '#e08e00',
          text:    '#eff1f6',   // primary text
          muted:   '#8d8d8d',   // secondary text
          green:   '#00b8a3',   // easy
          red:     '#ff375f',   // hard
        },
      },
    },
  },
  plugins: [],
}
