/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'slide-in': {
          '0%': { right: '-300px' },
          '100%': { right: '1.25rem' },
        },
      },
      animation: {
        'slide-in': 'slide-in 0.5s ease-out',
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      "light",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "autumn",
      "business",
      "acid",
      "lemonade",
      "night",
      "coffee",
      "winter",
      "dim",
      "nord",
      "sunset",
    ],
    darkTheme: false, // Disable dark theme detection
    base: true, // Apply daisyUI base styles
    styled: true, // Apply daisyUI theme styles
    utils: true, // Enable daisyUI utilities
    rtl: false, // Enable or disable right-to-left layout support
    prefix: "", // Add prefix for daisyUI classes (e.g., 'daisy-')
    logs: true, // Enable logs to check if daisyUI is working
  },
}
