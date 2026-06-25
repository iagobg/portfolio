/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,mdx}",
    "./components/**/*.{js,jsx,mdx}",
    "./content/**/*.mdx"
  ],
  theme: {
    extend: {
      colors: {
        workbench: {
          950: "#090d13",
          925: "#0d121a",
          900: "#10151f",
          850: "#151b25",
          800: "#1a212d",
          750: "#202938",
          700: "#293345",
          600: "#39465c"
        },
        ink: {
          100: "#edf4ff",
          200: "#cbd7e8",
          300: "#9daac0",
          400: "#738099",
          500: "#566176"
        },
        accent: {
          300: "#9fcbff",
          400: "#69adf7",
          500: "#3b8eea",
          600: "#2672c9"
        },
        success: "#a7d189",
        warning: "#e8c36f",
        rose: "#df9a9a"
      },
      boxShadow: {
        focus: "0 0 0 3px rgba(59, 142, 234, 0.45)"
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif"
        ],
        mono: [
          "JetBrains Mono",
          "SFMono-Regular",
          "Consolas",
          "Liberation Mono",
          "monospace"
        ]
      }
    }
  },
  plugins: []
};
