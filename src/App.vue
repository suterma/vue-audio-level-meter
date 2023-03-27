<script setup lang="ts">
import AudioLevelMeter from './components/AudioLevelMeter.vue';
import { onMounted, ref, ShallowRef, shallowRef } from 'vue';

/**
 *  Defining the AudioContext
 *  @devdoc webkitAudioContext supports older versions of Safari
 */
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();
const context = shallowRef(audioContext);

/** Audio element to use
 * @devdoc The audio element is intentionally not added to the DOM, to keep it unaffected of unmounts during vue-router route changes.
 */
const audioElement = ref<InstanceType<typeof HTMLAudioElement> | null>(null);

// NOTE: When creating the audio source as a MediaElementAudioSourceNode, if the source URL is not CORS-enabled, the MediaElementAudioSourceNode outputs all zeroes.
// Thus, no audio is heard and also the level meter shows no data
//TODO: first check whether the resource allows for CORS, then enable the MediaElementAudioSourceNode and the level meter. Otherwise,
//do not use the MediaElementAudioSourceNode and the meter, and just let the audio element play it's content directly to the output.
/** The optional audio source node, required when for metering is requested
 */
const audioSource: ShallowRef<InstanceType<
  typeof MediaElementAudioSourceNode
> | null> = shallowRef(null);

onMounted(() => {
  // Note that you can only access the ref after the component is mounted.
  if (audioElement.value) {
    audioSource.value = context.value.createMediaElementSource(
      audioElement.value
    );
    audioSource.value.connect(context.value.destination);
  }
});
</script>

<template>
  //TODO write about d type for webkitAudioContext
  //TODO write about CORS-enabled
  //TODO write about mounting
  //TODO write about the key 
  //TODO create the minimal example


  //TODO try also a CORS-restricted file src="lidija_roos-not_for_sale.mp3" src
  ="https://lib.replayer.app/your-light-by-lidija-roos.mp3"

  <audio
    @click="audioContext.resume()"
    src="lidija_roos-not_for_sale.mp3"
    ref="audioElement"
    controls
  ></audio>
  //NOTE If you change the source, you need to use :key="props.mediaUrl"
  <AudioLevelMeter
    v-if="audioSource"
    :audioSource="audioSource"
    :audioContext="context"
  >
  </AudioLevelMeter>
</template>

<style scoped>
 
</style>
