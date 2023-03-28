import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],

  /* path /vue-audio-level-mete/ is suitable for publishing to github pages */
  base: "/vue-audio-level-meter/",

  build: {
    /* Defining the options for "App Mode" */
    rollupOptions: {
      external: [/^.*(.mp3)/, /^.*(.ogg)/],
    },

    manifest: true,
    sourcemap: true,
  },
});
