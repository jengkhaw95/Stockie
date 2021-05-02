module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      cursor: ["hover", "focus", "disabled"],
      opacity: ["disabled"],
    },
  },
  plugins: [],
  important: true,
};
