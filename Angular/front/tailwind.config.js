/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts,scss}', './public/index.html'],
  theme: {
    extend: {
      fontFamily: {
        cairo: ['Cairo', 'Tajawal', 'sans-serif'],
        tajawal: ['Tajawal', 'Cairo', 'sans-serif']
      },
      colors: {
        skyerp: {
          50: '#f5f8ff',
          100: '#eef2ff',
          200: '#dbe8ff',
          300: '#b6d5ff',
          400: '#80aeff',
          500: '#4a7dff',
          600: '#1e56f7',
          700: '#153fc0',
          800: '#102f90',
          900: '#0b1e60'
        },
        brand: {
          DEFAULT: '#0b1e60', // Dark Navy Blue
          light: '#eef2ff',
          primary: '#102f90',
          hover: '#153fc0'
        },
        accent: {
          DEFAULT: '#16a34a', // Green
          light: '#f0fdf4',
          hover: '#15803d'
        }
      },
      borderRadius: {
        'card-lg': '1rem',
        'card-md': '0.75rem',
        'card-sm': '0.5rem'
      },
      boxShadow: {
        'soft-card': '0 20px 40px rgba(15, 23, 42, 0.08)'
      }
    }
  },
  plugins: []
};
