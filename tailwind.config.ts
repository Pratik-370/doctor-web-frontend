import type { Config } from 'tailwindcss';

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        care: {
          purple: {
            DEFAULT: '#5b14b8',
            light: '#a44cff',
            deep: '#28006d',
            dark: '#3f1d8b',
            accent: '#ab8efd',
          },
          teal: {
            DEFAULT: '#006971',
            light: '#76f1ff',
          },
          bg: {
            workspace: '#f8f9fa',
            sidebar: '#f3f4f5',
            card: '#ffffff',
          },
          text: {
            primary: '#191c1d',
            secondary: '#494552',
            muted: '#7a7583',
            subtle: '#cbc4d4',
          },
          border: {
            DEFAULT: '#e1e3e4',
            input: '#cbc4d4',
            button: '#7a7583',
          },
          status: {
            critical: '#ba1a1a',
            'critical-bg': '#ffdad6',
            success: '#006971',
            'success-bg': '#76f1ff',
            warning: '#b45309',
            'warning-bg': '#fef3c7',
          },
        },
      },
      fontFamily: {
        sans: [
          'Plus Jakarta Sans',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
      },
      borderRadius: {
        card: '20px',
        'auth-card': '24px',
      },
      boxShadow: {
        card: '0px 2px 8px 0px rgba(0, 0, 0, 0.05)',
        'card-hover': '0px 4px 16px 0px rgba(0, 0, 0, 0.08)',
        topbar: '0px 1px 1px 0px rgba(0, 0, 0, 0.05)',
        'auth-card': '0px 2px 32px 0px rgba(40, 0, 109, 0.08)',
      },
    },
  },
  plugins: [],
} satisfies Config;
