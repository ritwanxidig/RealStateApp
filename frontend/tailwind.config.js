/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // adding image background
      backgroundImage: {
        "hero-pattern":
          "url('src/assets/images/backgrounds/rocket.png')",
      },
    },
  },
  plugins: [],
};
