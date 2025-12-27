export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#145231',
        },
        earth: {
          50: '#faf8f3',
          100: '#f5f1e8',
          200: '#e8e0d5',
          300: '#d4c4b0',
          400: '#b8a284',
          500: '#8b7355',
          600: '#6d5a47',
          700: '#5a493c',
          800: '#47382e',
          900: '#35291f',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
