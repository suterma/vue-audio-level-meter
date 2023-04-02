<template>
  <div class="columns is-desktop">
    <div class="column">
      <p>You need:
      <ul>
        <li>a running <a href="https://developer.mozilla.org/en-US/docs/Web/API/AudioContext"> Audio Context</a> from the
          Web Audio API</li>
        <li>an <a href="https://developer.mozilla.org/en-US/docs/Web/API/AudioNode">Audio node</a>, as a source,
          for example from an <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio">HTML audio element</a> with:
          <ul>
            <li>the <code>src</code> set</li>
            <li>a <code>ref</code> defined</li>
            <li>optionally the default <code>controls</code> (or your own controls)</li>
          </ul>
        </li>
        <li>an <b>AudioLevelMeter</b> component instance with the <code>audioContext</code> and the
          <code>audioSource</code> properties set
        </li>
      </ul>
      </p>
      <div class="box">
        <BasicExample></BasicExample>
      </div>
    </div>
    <div class="column">
      <p>Here's how the template might look like:</p>
      <highlightjs
        language='vue-template'
        code="<template>
  <audio
    src='lidija_roos-not_for_sale.mp3'
    ref='audioElement'
    controls
    @play='resumeAudioContext()'
  >
  </audio>
  <AudioLevelMeter
    v-if='audioSource && audioContext'
    :audioSource='audioSource'
    :audioContext='audioContext'
  />
</template>"
      />
      <p>
      <details>
    <summary>Click to see how to set up the audio source and audio context for the above template:</summary>

      <highlightjs
        language='vue-typescript'
        code="<script setup lang='ts'>
import AudioLevelMeter from 'vue-audio-level-meter/src/components/AudioLevelMeter.vue';
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
    console.debug('audio context resumed')
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
</script>"
      /> </details>
      Or <a href="https://github.com/suterma/vue-audio-level-meter/blob/main/src/components/BasicExample.vue">review this example on GitHub</a>.
      <hr></p>
      <h4>Notes</h4>
        <ul>
          <li>
        You might use an audio element event to resume the audio context, if required, like the above example does.
      </li>
      <li>
        At component mount time, the ref is invoked to actually create an audio node
        for the analyzer.
      </li>
    </ul>   
    </div>
  </div>
</template>
<script setup lang="ts">
import BasicExample from '../components/BasicExample.vue';
</script>