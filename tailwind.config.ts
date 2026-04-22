import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './data/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#002045',
        'primary-container': '#1A365D',
        secondary: '#006A68',
        'secondary-container': '#91F0ED',
        background: '#F7F9FB',
        surface: '#FFFFFF',
        'surface-low': '#F2F4F6',
        'surface-muted': '#E6E8EA',
        'text-main': '#191C1E',
        'text-soft': '#43474E',
        outline: '#C4C6CF'
      },
      boxShadow: {
        ambient: '0 12px 32px -4px rgba(25, 28, 30, 0.08)'
      },
      backgroundImage: {
        brand: 'linear-gradient(135deg, #002045, #1A365D)'
      }
    }
  },
  plugins: []
};

export default config;
