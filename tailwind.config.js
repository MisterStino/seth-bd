/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // ✅ App Router Support
    "./pages/**/*.{js,ts,jsx,tsx}", // ✅ Pages Router Support
    "./components/**/*.{js,ts,jsx,tsx}", // ✅ Components
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
