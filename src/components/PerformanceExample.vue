<template>
  <p>
    <label>
      Algorithm
      <label>
        <input
          type="radio"
          value="peak"
          v-model="algorithm"
        > Peak
      </label>

      <label>
        <input
          type="radio"
          value="average"
          v-model="algorithm"
        > Average
      </label>
    </label>  
  </p>   
  <p>
    <label>
      Meter is running
      <input
        type='checkbox'
        v-model='running'
      />
    </label>
    {{ running }}
  </p>
  <p>
    <label>
      Select source
      <select
        name='sourceUlr'
        v-model='sourceUrl'
      >
        <option value="https://lib.replayer.app/decisions-by-lidija-roos.ogg">Decisions by Lidija Roos (ogg, different domain, CORS enabled)</option>
        <option value="https://lib.replayer.app/lidija_roos-not_for_sale.mp3">Not for sale by Lidija Roos (mp3, different domain, CORS enabled)</option>
        <option value="https://lib.replayer.app/eyes-have-not-seen-by-lidija-roos.flac">
          Eyes have not seen by Lidia Roos (mp3, different domain, CORS enabled)</option>
          <option value="https://lib.replayer.app/test/sine%20chirp%2012Hz5-20kHz%201_3oct_sec%20lr-inphase.wav">
          Sine Chirp 12.5Hz-20kHz, 1/3 of a an Octave per second, 0dBFS (wav, different domain, CORS enabled)</option>
        <option value="https://previews.cambridge-mt.com/Fever_Full_Preview.mp3">
          Fever by Mirroman (mp3, different domain, no CORS)</option>
      </select>
    </label>
    {{ sourceUrl }}
  </p>
  <audio
    :src='sourceUrl'
    crossorigin="anonymous"
    ref='audioElement'
    controls
    @play="resumeAudioContext()"
  >
  </audio>
  <p>
    <label>
      Instance count
      <input
        type='number'
        v-model='instanceCount'
        min='0'
        step='1'
      />
    </label>
    {{ instanceCount }}
  </p>
  <div v-for="(item, index) in [...Array(instanceCount).keys()]" :key="item">
<span>Audio level meter instance number {{index + 1}}:</span>
  <AudioLevelMeter
    :key='index'
    v-if="audioSource && audioContext"  
    :audioSource="audioSource"
    :audioContext="audioContext"
    :algorithm="algorithm"
    :running='running'
  />
</div>

</template>
<script setup lang='ts'>
import AudioLevelMeter from './AudioLevelMeter.vue';
import { onMounted, onUnmounted, ref, ShallowRef, shallowRef } from 'vue';

const algorithm = ref('peak');
const running = ref(false)
const sourceUrl = ref('https://lib.replayer.app/lidija_roos-not_for_sale.mp3')
const instanceCount = ref(0);


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
