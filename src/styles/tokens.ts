/**
 * CareID Doctor-Web Design Tokens
 * 
 * Source of Truth: Figma Canvas 0:1, production frames:
 * - 1:154 (Dashboard)
 * - 1:2 (Doctor Web Portal - Refined Secure Login)
 * - 1:473 (Grouped Navigation - Patient Profile)
 * - 1:6657 (Patient Directory)
 * - 1:7011 (Create Treatment Offer)
 */

export const colors = {
  // Brand Primary: Gradient & Solids
  brand: {
    gradientStart: '#a44cff', // Electric Violet
    gradientEnd: '#5b14b8',   // Deep Royal Purple
    solidDark: '#3f1d8b',     // Deep Violet
    deepNavy: '#28006d',      // Dark Navy Purple (Text & CTAs)
    accentLight: '#ab8efd',   // Lavender active text
    subtleBg: 'rgba(40, 0, 109, 0.05)', // Card decorative blur
  },

  // Healthcare Accent (Teal / Cyan)
  teal: {
    primary: '#006971',       // Medical Deep Teal
    light: '#76f1ff',         // Cyan Badge Background
    subtleBg: 'rgba(0, 105, 113, 0.05)',
    border: 'rgba(0, 105, 113, 0.2)',
  },

  // Surfaces & Backgrounds
  surface: {
    workspace: '#f8f9fa',     // Main portal workspace background
    sidebar: '#f3f4f5',       // Side navigation bar & input background
    card: '#ffffff',          // Panel / Card surface
    topbar: '#ffffff',        // Top navigation bar
    overlay: 'rgba(255, 255, 255, 0.95)',
  },

  // Text Hierarchy
  text: {
    primary: '#191c1d',       // Page titles, headings, primary values
    secondary: '#494552',     // Subtitles, table headers, inactive nav
    muted: '#7a7583',         // Button borders, subtle timestamps
    subtle: '#cbc4d4',        // Placeholder text
    inverse: '#ffffff',       // Text on dark/gradient buttons
  },

  // Borders & Dividers
  border: {
    default: '#e1e3e4',       // Card and panel borders
    input: '#cbc4d4',         // Form inputs and search bar
    button: '#7a7583',        // Secondary outlined buttons
    subtle: 'rgba(225, 227, 228, 0.5)', // Subtle card dividers
    divider: 'rgba(203, 196, 212, 0.3)', // Sidebar section divider
  },

  // Semantic Status
  status: {
    critical: {
      text: '#ba1a1a',
      bg: '#ffdad6',
      subtleBg: 'rgba(186, 26, 26, 0.05)',
      border: 'rgba(186, 26, 26, 0.3)',
    },
    success: {
      text: '#006971',
      bg: '#76f1ff',
      subtleBg: 'rgba(0, 105, 113, 0.05)',
      border: 'rgba(0, 105, 113, 0.3)',
    },
    warning: {
      text: '#b45309',
      bg: '#fef3c7',
      subtleBg: 'rgba(245, 158, 11, 0.05)',
      border: 'rgba(245, 158, 11, 0.3)',
    },
    info: {
      text: '#3f1d8b',
      bg: '#ede9fe',
      subtleBg: 'rgba(63, 29, 139, 0.05)',
      border: 'rgba(63, 29, 139, 0.2)',
    },
  },
} as const;

export const typography = {
  fontFamily: {
    sans: "'Plus Jakarta Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
  fontSize: {
    stat: ['40px', { lineHeight: '48px', letterSpacing: '-0.8px', fontWeight: '700' }],
    h1: ['32px', { lineHeight: '40px', letterSpacing: '-0.8px', fontWeight: '600' }],
    h2: ['24px', { lineHeight: '32px', letterSpacing: '-0.4px', fontWeight: '600' }],
    h3: ['20px', { lineHeight: '28px', letterSpacing: '-0.2px', fontWeight: '600' }],
    bodyLarge: ['16px', { lineHeight: '24px', fontWeight: '400' }],
    body: ['14px', { lineHeight: '20px', letterSpacing: '0.1px', fontWeight: '400' }],
    bodyMedium: ['14px', { lineHeight: '20px', letterSpacing: '0.1px', fontWeight: '500' }],
    caption: ['12px', { lineHeight: '16px', letterSpacing: '0.5px', fontWeight: '500' }],
  },
} as const;

export const layout = {
  dimensions: {
    topbarHeight: '64px',
    sidebarWidth: '256px',
    contentMaxWidth: '1440px',
    desktopBaseline: '1280px',
    authCardMaxWidth: '480px',
  },
  borderRadius: {
    card: '20px',
    authCard: '24px',
    input: '12px',
    button: '8px',
    badge: '4px',
    pill: '9999px',
  },
  shadows: {
    card: '0px 2px 8px 0px rgba(0, 0, 0, 0.05)',
    cardHover: '0px 4px 16px 0px rgba(0, 0, 0, 0.08)',
    topbar: '0px 1px 1px 0px rgba(0, 0, 0, 0.05)',
    authCard: '0px 2px 32px 0px rgba(40, 0, 109, 0.08)',
  },
} as const;

export default {
  colors,
  typography,
  layout,
};
