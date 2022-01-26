const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./_site/**/*.html"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      blue: colors.blue,
      indigo: colors.indigo,
    },
    fontFamily: {
      sans: [
        "Fira Mono",
        "ui-sans-serif",
        "system-ui",
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",
        "Roboto",
        "Helvetica Neue",
        "Arial",
        "Noto Sans",
        "sans-serif",
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Segoe UI Symbol",
        "Noto Color Emoji",
      ],
      serif: [
        "Playfair Display",
        "Georgia",
        "Cambria",
        "Times New Roman",
        "Times",
        "serif",
      ],
    },
  },
  variants: {
    display: ["responsive", "group-hover", "group-focus"],
  },
  plugins: [],
};
