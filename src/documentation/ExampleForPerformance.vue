<template>
  <div class="columns is-desktop">
    <div class="column">
      <p>This allows to run an arbitrary amount of audio level meters to evaluate it's memory and CPU performance over time.
      </p>
      <div class="box">
        <PerformanceExample></PerformanceExample>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
 import PerformanceExample from '../components/PerformanceExample.vue';
</script>