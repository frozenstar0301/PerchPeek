// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Adjust the paths according to your project structure
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1D4ED8', // Custom primary color (blue)
        secondary: '#9333EA', // Custom secondary color (purple)
        accent: '#F59E0B', // Custom accent color (orange)
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'], // Custom font
      },
      boxShadow: {
        'custom-light': '0 4px 6px rgba(0, 0, 0, 0.1)', // Custom shadow for light effects
        'custom-heavy': '0 10px 15px rgba(0, 0, 0, 0.3)', // Custom shadow for heavy effects
      },
      animation: {
        bounce200: 'bounce 1s infinite 200ms', // Custom animation
      },
    },
  },
  plugins: [],
};
