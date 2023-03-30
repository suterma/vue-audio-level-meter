<template>
  <p>
    <label>
      Minimum level (sensitivity) (-96dBFS - 0 dBFS)
      <input
        type='range'
        min='-96'
        max='0'
        v-model='minLevel'
      />
    </label>
    {{ minLevel }}
  </p>
  <p>
    <label>
      Optimum level (-24dBFS - 0 dBFS)
      <input
        type='range'
        min='-24'
        max='0'
        v-model='optimumLevel'
      />
    </label>
    {{ optimumLevel }}
  </p>
  <p>
    <label>
      Overload level (-15dBFS - +9 dBFS)
      <input
        type='range'
        min='-15'
        max='9'
        v-model='overloadLevel'
      />
    </label>
    {{ overloadLevel }}
  </p>
  <p>
    <label>
      Full scale level (-12dBFS - +12 dBFS)
      <input
        type='range'
        min='-12'
        max='12'
        v-model='fullScaleLevel'
      />
    </label>
    {{ fullScaleLevel }}
  </p>
  <audio
    src='lidija_roos-not_for_sale.mp3'
    ref='audioElement'
    controls
    @play="resumeAudioContext()"
  >
  </audio>
  <AudioLevelMeter
    v-if="audioSource && audioContext"
    :minLevel='minLevel'
    :optimumLevel='optimumLevel'
    :overloadLevel='overloadLevel'
    :fullScaleLevel='fullScaleLevel'
    :audioSource="audioSource"
    :audioContext="audioContext"
  />
</template>
<script setup lang='ts'>
import AudioLevelMeter from './AudioLevelMeter.vue';
import { onMounted, onUnmounted, ref, ShallowRef, shallowRef } from 'vue';

const minLevel = ref(-48);
const optimumLevel = ref(-12);
const overloadLevel = ref(-3);
const fullScaleLevel = ref(0);


/**
 *  The AudioContext to use
 *  @devdoc webkitAudioContext supports older versions of Safari
 */
const audioContext = shallowRef<InstanceType<typeof AudioContext> | null>(null);

/** A reference to the audio element to use
 */
const audioElement = ref<InstanceType<typeof HTMLAudioElement> | null>(null);

/** The audio source node to use by the meter
 */
const audioSource: ShallowRef<InstanceType<
  typeof MediaElementAudioSourceNode
> | null> = shallowRef(null);

/** Resumes the audio context after the user's first page interaction, if necessary.
 */
async function resumeAudioContext() {
  if (audioContext.value?.state === 'suspended') {
    await audioContext.value.resume();
    console.debug("audio context resumed")
  }
}

/** @devdoc Note that you can only access the ref after the component is mounted. */
onMounted(() => {
  audioContext.value = (new (window.AudioContext || window.webkitAudioContext)());
  if (audioElement.value) {
    audioSource.value = audioContext.value.createMediaElementSource(
      audioElement.value
    );
    audioSource.value.connect(audioContext.value.destination);
  }
});

/** @devdoc A little housekeeping */
onUnmounted(() => {
  if (audioContext.value) {
    audioSource.value?.disconnect(audioContext.value.destination);
    audioContext.value.close();
  }
  // The media element and the source will be garbage collected
});
</script>
