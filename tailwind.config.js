/** @type {import('tailwindcss').Config} */
const withMT = require('@material-tailwind/react/utils/withMT');

export default withMT({
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
      mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
    },
    extend: {
      colors: {
        memeplex: {
          700: '#2B2A33',
          800: '#1F1F1F',
          900: '#141414',
        }
      },
    },
  },
  safelist: [
    'clr-field',
    'control-box-show',
    'control-box-hide',
    'moveable-line',
    'moveable-direction',
    'moveable-control',
    'moveable-rotation',
    'moveable-rotation-control',
    'moveable-rotation-line',
  ],
  plugins: [],
})
