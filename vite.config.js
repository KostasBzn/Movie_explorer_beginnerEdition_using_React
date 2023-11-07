import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/Movie_explorer_beginnerEdition_using_React/",
  plugins: [react()],
});
