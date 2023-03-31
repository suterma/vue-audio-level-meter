<template>
  <div class="columns is-desktop">
    <div class="column">
      <p>The following options are available:
      <ul>
        <li>Set the algorithm to "peak" or "average"</li>
        <li>Set dynamic range, including the level color inflection levels</li>
        <li>Set the level area colors</li>
        <li>Hide or show the level label or the meter itself</li>
        <li>Change the default appearance through the available CSS classes:</li>
        <ul>
          <dl>
            <dt><code>audio-level-container</code></dt>
            <dd>The surrounding <code>div</code>, for example have a specific background or a margin.</dd>

            <dt><code>audio-level-meter</code></dt>
            <dd>The meter bar</dd>

            <dt><code>audio-level-text</code></dt>
            <dd>The level text</dd>
          </dl>
        </ul>
      </ul>
      </p>
      <div class="box">
        <ExtendedExample></ExtendedExample>
      </div>
    </div>
    <div class="column">
      <p>Here's how the template might look like:</p>
      <highlightjs language='vue-template' code='//TODO"/>' />
      <p>Here's how to set up the audio source and audio context for the above template:</p>
      <highlightjs language='vue-typescript' code='//TODO"/>' />
      <p>
        //TODO finish these snippets with the example, once it's complete

      </p>
    </div>
  </div>
</template>
<script setup lang="ts">
import ExtendedExample from '../components/ExtendedExample.vue';
</script>