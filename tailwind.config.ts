import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        secondary: ["Arial"],
      },
      fontSize: {
        smaller: "0.875rem",
        small: "1rem",
        medium: "1.25rem",
        big: "2rem",
        extraLarge1: "2.5rem",
        extraLarge: "3.5rem",
        ultraLarge: "5rem",
      },
      colors: {
        azulPalido: "#AED9E0",
        amareloPadrao: "#FDD56A",
        verdePastel: "#B5EAD7",
        rosaClaro: "#F9B3C1",

        azulEscuro: "#0098BA",
        amareloForte: "#FDF2A2",
        verdeForte: "#D7F677",
        azulForte: "#69E5FD",
        rosaForte: "#FBB4D4",
        branco: "#FDFEFF",

        azulEscuroSombra: "#077493",
        amareloForteSombra: "#FDF2A2",
        verdeForteSombra: "#A0BD3F",
        azulForteSombra: "#51BAD0",
        rosaForteSombra: "#D38CB4",
        brancoSombra: "#BEE6F2",
      },
      dropShadow: {
        sombra: "0px 10px 1px rgba(116, 147, 100, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
