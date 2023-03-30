<template>
  <div class="columns is-desktop">
    <div class="column">
      <p>You need:
      <ul>
        <li>a running <a href="https://developer.mozilla.org/en-US/docs/Web/API/AudioContext"> Audio Context</a> from the
          Web Audio API</li>
        <li>an <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio">HTML audio element</a> with:
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
        code='<audio 
      src="lidija_roos-not_for_sale.mp3" 
      ref="audioElement" 
      controls @play="resumeAudioContext()"></audio>
  <AudioLevelMeter 
      v-if="audioSource" 
      :audioSource="audioSource" 
      :audioContext="context"/>'
      />
      <p>Here's how to set up the audio source and audio context for the above template:</p>
      <highlightjs
        language='vue-typescript'
        code="<script setup lang='ts'> 
  import AudioLevelMeter from './AudioLevelMeter.vue';
  import { onMounted, onUnmounted, ref, ShallowRef, shallowRef } from 'vue';

  /**
    *  Creating the AudioContext to use
    *  @devdoc webkitAudioContext supports older versions of Safari
    */
  const context = shallowRef(
    new (window.AudioContext || window.webkitAudioContext)()
  );

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
    if (context.value.state === 'suspended') {
      await context.value.resume();
    }
  }

  /** @devdoc Note that you can only access the ref after the component is mounted. */
  onMounted(() => {
    if (audioElement.value) {
      audioSource.value = context.value.createMediaElementSource(
        audioElement.value
      );
      audioSource.value.connect(context.value.destination);
    }
  });

  /** @devdoc A little housekeeping */
  onUnmounted(() => {
    audioSource.value?.disconnect(context.value.destination);
    // The media element and the source will be garbage collected
  });
  </script>
  "
      />
      <p>You might use an audio element event to resume the audio context, if required, like this example does.</p>
      <p>
        At component mount time, the ref is invoked to actually create an audio node
        for the analyzer.
      </p>
      <p>
        //TODO finish these snippets with the example, once it's complete

      </p>
    </div>
  </div>
</template>
<script setup lang="ts">
import BasicExample from '../components/BasicExample.vue';
</script>