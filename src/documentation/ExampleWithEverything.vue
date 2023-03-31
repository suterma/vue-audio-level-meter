<template>
  <div class="columns is-desktop">
    <div class="column">
      <p>The following options are available:
      <ul>
        <li>Set the algorithm to "peak" or "average"</li>
        <li>Set dynamic range, including the range color inflection levels</li>
        <li>Set the range and background colors with properties</li>
        <li>Hide or show the level label or the meter itself</li>
      </ul>
      </p>
      <p>
        Additionally you can change the appearance via the available CSS classes:
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

      </p>
    </div>
    <div class="column">
      <div class="box">
        <CompleteExample></CompleteExample>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import CompleteExample from '../components/CompleteExample.vue';
</script>