<template>
  <ul>
    <li>//TODO Write about the audio context stuff</li>
    //TODO write about CORS-enabled resources and limitations
    <li>//TODO write about mounting</li>
    <li>
      //TODO write about the key: If you change the source, you need
      to use :key="props.mediaUrl"
    </li>
    <li></li>
    <li></li>
    <li></li>
  </ul>

  ___

  <p>With a zero level
    <LevelMeter :minLevel='0' :lowLevel='2' :highLevel='4' :maxLevel='6' :value='0'>test
    </LevelMeter>
  </p>
  <p>With an optimum level
    <LevelMeter :minLevel='0' :lowLevel='2' :highLevel='4' :maxLevel='6' :value='1.2'>test
    </LevelMeter>
  </p>
  <p>With a high level
    <LevelMeter :minLevel='0' :lowLevel='2' :highLevel='4' :maxLevel='6' :value='2.2'>test
    </LevelMeter>
  </p>
  <p>With an high-max level
    <LevelMeter :minLevel='0' :lowLevel='2' :highLevel='4' :maxLevel='6' :value='3.2'>test
    </LevelMeter>
  </p>
  <p>With an high-max level
    <LevelMeter :minLevel='0' :lowLevel='2' :highLevel='4' :maxLevel='6' :value='4.2'>test
    </LevelMeter>
  </p>
  <p>With the max level
    <LevelMeter :minLevel='0' :lowLevel='2' :highLevel='4' :maxLevel='6' :value='5'>test
    </LevelMeter>
  </p>


  <LevelMeter :minLevel='0' :lowLevel='2' :highLevel='4' :maxLevel='5' :value='2.2'>test
  </LevelMeter>
  <LevelMeter :minLevel='0' :lowLevel='2' :highLevel='4' :maxLevel='5' :value='4.2'>test
  </LevelMeter>
  <LevelMeter :minLevel='0' :lowLevel='2' :highLevel='4' :maxLevel='5' :value='5'>test
  </LevelMeter>
</template>
<script setup lang="ts">
import LevelMeter from '../components/LevelMeter.vue';
</script>