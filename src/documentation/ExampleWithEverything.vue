<template>
  <div class="columns is-desktop">
    <div class="column">
      <p>You need everything from the basic example. Additionally, you have the following options:
      <ul>
        <li>Set the algorithm to "peak" or "average"</li>
        <li>Set dynamic range, including the level color inflection levels</li>
        <li>Set the level area colors</li>
        <li>Hide or show the level label</li>
      </ul>
      </p>
      <div class="box">
        <ExtendedExample></ExtendedExample>
      </div>
    </div>
    <div class="column">
      <p>Here's how the template might look like:</p>
      <highlightjs
        language='vue-template'
        code='//TODO"/>'
      />
      <p>Here's how to set up the audio source and audio context for the above template:</p>
      <highlightjs
        language='vue-typescript'
        code='//TODO"/>'
      />
      <p>
        //TODO finish these snippets with the example, once it's complete

      </p>
    </div>
  </div>
</template>
<script setup lang="ts">
import ExtendedExample from '../components/ExtendedExample.vue';
</script>