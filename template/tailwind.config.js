/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // SF brand tokens — do not change these
      colors: {
        'sf-purple': '#9945FF',
        'sf-green': '#14F195',
        'sf-cyan': '#00C2FF',
        'sf-red': '#FF4444',
        'sf-yellow': '#FFB800',
        'surface': '#111827',      // card background
        'surface-2': '#1f2937',    // nested card / table row
        'border': '#374151',       // dividers
        'muted': '#6b7280',        // secondary text
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      // Data-density spacing — tighter than Tailwind defaults
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
    },
  },
  plugins: [],
};
