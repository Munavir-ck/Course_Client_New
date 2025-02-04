/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts}"],
  theme: {
    extend: {
      height: {
        '500': '600px',
      },
      height: {
        '300': '300px',
      },
      margin: {
        'custom-left': '20px', // adds a margin-left of 2rem
      },
      fontFamily: {
        'monospace': ['IBM Plex Serif','serif'],
      },
      colors: {
        'mycolors':'#91c6eb',
        'mycolors_b':'#18355c', // Replace with your HEX color
      },
      safelist: [
        'animate-fade-in_1s_ease-in-out',
        'animate-fade-in-down_1s_ease-in-out',
        // Add any other classes that you want to include in the safelist here
      ],
      
    
    },
  },
  plugins: [],
}
// 'Mogra', cursive