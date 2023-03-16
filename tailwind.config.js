/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx}",
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
   
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
            sans: ['Poppins', 'sans-serif'],
        },
        screens: {
            '2xl': '1450px',
            'xl': '1200px',
            'lg': '940px',
            'md': '700px',
            'sm': '620px',
        }
      },
    },
    plugins: [],
  }