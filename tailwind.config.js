/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // H2maps Custom Color Palette
        'h2-white': '#FFFFFF',     // Branco puro
        'h2-dark': '#3A3735',     // Cinza escuro para textos
        'h2-light-green': '#DCEBE1', // Verde claro para fundos
        'h2-dark-green': '#00402A', // Verde escuro
        'h2-medium-green': '#008C39', // Verde médio
        'h2-primary': '#00A443',  // Verde principal
        'h2-vibrant': '#26BF64',  // Verde vibrante
        'h2-bright': '#5BD38C',   // Verde claro vibrante
        'h2-blue': '#0792E5',     // Azul para destaques
        'h2-orange': '#E3850D',   // Laranja para alertas
      },
      backgroundImage: {
        'h2-gradient': 'linear-gradient(135deg, #00A443 0%, #0792E5 50%, #E3850D 100%)',
        'h2-gradient-subtle': 'linear-gradient(135deg, rgba(0, 164, 67, 0.1) 0%, rgba(7, 146, 229, 0.1) 50%, rgba(227, 133, 13, 0.1) 100%)',
      }
    },
  },
  plugins: [],
}