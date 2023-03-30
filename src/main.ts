import { createApp } from 'vue';
import App from './App.vue';


/** Declaring the AudioContext for webkit
 * @devdoc This is required to have a usable audio context on macOS 12 and below
 * See https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Migrating_from_webkitAudioContext
 * See also https://caniuse.com/?search=%20AudioContext for general support
 * @devdoc I was unable to load this type from a d.ts file, thus I placed it here, according to 
 * a comment by Luiz on https://stackoverflow.com/a/56458070/79485
 */
declare global {
  interface Window {
    webkitAudioContext: any;
  }
}

// Custom CSS mods for this application
import './assets/vue-audio-level-meter-mods.css';

// Syntax highlighter
import hljs from 'highlight.js/lib/core';

import typescript from 'highlight.js/lib/languages/typescript';
hljs.registerLanguage('vue-typescript', typescript);

import xml from 'highlight.js/lib/languages/xml';
hljs.registerLanguage('vue-template', xml);
hljs.registerLanguage('vue-sfc', xml);

import bash from 'highlight.js/lib/languages/bash';
hljs.registerLanguage('bash', bash);

import css from 'highlight.js/lib/languages/css';
hljs.registerLanguage('css', css);

import hljsVuePlugin from '@highlightjs/vue-plugin';

// The style to use (see https://highlightjs.org/static/demo/ to choose)
import 'highlight.js/styles/base16/decaf.css';

createApp(App).use(hljsVuePlugin).mount('#app');
