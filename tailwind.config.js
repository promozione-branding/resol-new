/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#030303",       // page background — true black, needed for the
                               // metallic/iridescent coil to read correctly
        paper: "#EDEAE2",     // primary text, warm off-white rather than pure white
        muted: "rgba(237,234,226,0.56)",
        hairline: "rgba(237,234,226,0.12)",
        ice: "#8FCFE0",       // single accent, echoes the coil's cool rim light
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
      },
      maxWidth: {
        prose: "38rem",
      },
    },
  },
  plugins: [],
};
