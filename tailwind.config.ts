/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    fontWeight: {
      light: 300,
      regular: 400,
      'semi-bold': 500,
      bold: 600,
    },
    colors: {
      transparent: 'transparent',
      white: '#FFFFFF',
      light: {
        400: '#8D8D8D',
        500: '',
        600: '',
      },
      black: '#000000',
      dark: {
        400: '#191919',
        500: '#2B2B2B',
        600: '',
      },
      primary: {
        400: '#61BFFF',
        500: '#3AAFFF',
        600: '#2E8CCC',
      },
      success: {
        400: '',
        500: '#48FEA7',
        600: '',
      },
      warning: {
        400: '',
        500: '',
        600: '',
      },
      alert: {
        400: '',
        500: '#F43F5E',
        600: '',
      }
    },
    extend: {},
  },
  plugins: [],
}

