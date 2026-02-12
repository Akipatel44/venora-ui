module.exports = {
  content: [
    './src/**/*.{html,ts}'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0ea5a4',
          50: '#eefcfb',
          100: '#dff8f7',
          200: '#bff0ee',
          300: '#9fe7e4',
          400: '#6fd8d6',
          500: '#0ea5a4',
          600: '#0b8f8e',
          700: '#09726f',
          800: '#065554',
          900: '#04383a'
        },
        secondary: {
          DEFAULT: '#7c3aed',
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#7c3aed',
          600: '#6d28d9',
          700: '#5b21b6',
          800: '#4c1d95',
          900: '#3b1574'
        },
        card: '#ffffff',
        input: '#f3f4f6'
      },
      borderRadius: {
        'card': '0.5rem'
      }
    },
  },
  plugins: [],
}
