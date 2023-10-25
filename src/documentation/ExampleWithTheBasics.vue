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
  <AudioLevelMeter
    v-if='audioSource && audioContext'
    :running='isPlaying'
    :audioSource='audioSource'
    :audioContext='audioContext'
  />
  <audio
    src='https://lib.replayer.app/lidija_roos-not_for_sale.mp3'
    crossorigin='anonymous'
    ref='audioElement'
    controls
    @play='resumeAudioContext()'
    @playing='updatePlaying(true)'
    @pause='updatePlaying(false)'
  >
  </audio>
</template>"
      />
      <p>
      <a href="https://github.com/suterma/vue-audio-level-meter/blob/main/src/components/BasicExample.vue">Review this example on GitHub</a> 
      to see how to set up the audio source and audio context.
      </p>
      <hr>
      <h4>Notes for this example</h4>
      <p>
        <ul>
          <li>Optionally, as performance optimization, you might also run the audio level meter only when the audio source is actually playing.
        </li>
          <li>
        You might use an audio element event to resume the audio context, if required.
      </li>
      <li>
        At component mount time, the audio element's ref is invoked to create an audio analyzer node for it.
      </li>
    </ul></p>   
    </div>
  </div>
</template>
<script setup lang="ts">
import BasicExample from '../components/BasicExample.vue';
</script>