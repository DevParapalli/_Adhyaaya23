const daisyui = require("daisyui");
const typography = require("@tailwindcss/typography");
const forms = require("@tailwindcss/forms");

const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {}
  },
  daisyui: {
    themes: ['night']
  },

  plugins: [forms, typography, daisyui]
};

module.exports = config;