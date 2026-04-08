/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './hooks/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primaryGreen: '#8DB336',
        primaryBlue: '#0065A4',
        darkNavy: '#253953',
        gray: '#646E7C',
        amber: '#FBB03B',
        lightGreen: '#EEF5D8',
        border: '#E5E7EB',
        navyDark: '#1E3044',
        error: '#DC2626',
        success: '#16A34A',
      },
    },
  },
  plugins: [],
};
