import { defineConfig } from "vite";
import { resolve } from 'path'

import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],

  /* path /vue-audio-level-meter/ is suitable for publishing to github pages */
  base: "/vue-audio-level-meter/",

  build: {
    /* Defining the options for "Library Mode" */
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve( __dirname, 'lib/main.ts'),
      name: 'vue-audio-level-meter',
      // the proper extensions will be added
      fileName: 'vue-audio-level-meter',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue', '@vueuse/core',/^.*(.mp3)/, /^.*(.ogg)/],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue',
          '@vueuse/core': '@vueuse/core'
        },
      },
    },

    manifest: true,
    sourcemap: true,
  },
});
