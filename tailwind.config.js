/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,jsx,js}"],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin'),
    function ({ addUtilities }) {
      addUtilities({
        '.hide-scrollbar': {
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          '-ms-overflow-style': 'none',  
          'scrollbar-width': 'none',  
        },
      }, ['responsive'])
    }
  ],
}
