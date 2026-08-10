/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"Ubuntu Mono"', '"DejaVu Sans Mono"', 'Consolas', 'monospace'],
        sans: ['"Liberation Sans"', 'Arial', 'Helvetica', 'sans-serif'],
      },
      colors: {
        // kernel.org-inspired palette: near-black background, off-white text,
        // muted amber/orange accent (the classic Tux/kernel.org link color),
        // and a desaturated steel-blue for secondary accents.
        kbg: {
          DEFAULT: '#0d1117',
          panel: '#11161d',
          raised: '#161c25',
          border: '#232b36',
        },
        ktext: {
          DEFAULT: '#c9d1d9',
          muted: '#8b96a5',
          dim: '#5b6573',
        },
        kamber: {
          DEFAULT: '#e8a33d',
          bright: '#ffb84d',
          dim: '#8a6222',
        },
        ksteel: {
          DEFAULT: '#5b8cad',
          bright: '#7fb0d1',
        },
        kgood: '#4f9d69',
        kwarn: '#c9a227',
        kbad: '#c2543f',
        kdebian: {
          DEFAULT: '#d70a53',
          dim: '#8a0836',
        },
        kfedora: {
          DEFAULT: '#3c6eb4',
          bright: '#5296e5',
        },
      },
      boxShadow: {
        panel: '0 0 0 1px rgba(255,255,255,0.03), 0 1px 2px rgba(0,0,0,0.4)',
      },
    },
  },
  plugins: [],
}
