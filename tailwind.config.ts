import type { Config } from "tailwindcss"
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./styles/**/*.{css,scss}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
export default config
