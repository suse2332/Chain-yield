/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/context/**/*.{ts,tsx}",
    "./src/hooks/**/*.{ts,tsx}",
  ],
  darkMode: 'class', // Enable class-based dark mode toggling
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',    // Bright blue
        secondary: '#2563eb',  // Darker blue
        background: '#0f172a', // Dark navy background
        textPrimary: '#e0e7ff',// Light periwinkle text
        vipIron: '#a8a29e',    // Iron gray
        vipBronze: '#cd7f32',  // Bronze
        vipSilver: '#c0c0c0',  // Silver
        vipGold: '#ffd700',    // Gold
        vipPlatinum: '#e5e4e2',// Platinum light gray
        vipDiamond: '#b9f2ff', // Diamond light blue
        vipBlackDiamond: '#0f172a', // Black diamond dark (same as bg)
        vipCrown: '#ff4500',   // Crown bright orange-red
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-blue': '0 0 10px 3px rgba(59, 130, 246, 0.7)',
        'glow-gold': '0 0 10px 3px rgba(255, 215, 0, 0.7)',
      },
    },
  },
  plugins: [],
};
