<template>
  <AudioLevelMeter
    v-if='audioSource && audioContext'
    :running='isPlaying'
    :audioSource='audioSource'
    :audioContext='audioContext'
  />
  <audio
    src='https://lib.replayer.app/lidija_roos-not_for_sale.mp3'
    crossorigin="anonymous"
    ref='audioElement'
    controls
    @play='resumeAudioContext()'
    @playing='updatePlaying(true)'
    @pause='updatePlaying(false)'
  >
  </audio>
</template>
<script setup lang='ts'>
import AudioLevelMeter from './AudioLevelMeter.vue';
import { onMounted, onUnmounted, ref, ShallowRef, shallowRef } from 'vue';

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

/** Updates the playback indication
 */
 async function updatePlaying(playing:boolean) {
  isPlaying.value = playing;
  console.debug("isPlaying: ", playing)
}

const isPlaying = ref(false);

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
