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

    <!-- Selected: {{ algorithm }} -->
  </p>
  <p>
    <label>
      Minimum level (-96dB - 0dB)
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
      Low level (-24dB - 0 dB)
      <input
        type='range'
        min='-24'
        max='0'
        v-model='lowLevel'
      />
    </label>
    {{ lowLevel }}
  </p>
  <p>
    <label>
      High level (-15dB - +9 dB)
      <input
        type='range'
        min='-15'
        max='9'
        v-model='highLevel'
      />
    </label>
    {{ highLevel }}
  </p>
  <p>
    <label>
      Max level (-12dB - +12 dB)
      <input
        type='range'
        min='-12'
        max='12'
        v-model='maxLevel'
      />
    </label>
    {{ maxLevel }}
  </p>
  <p>
    <label>
      Low range color
      <input
        type='color'
        v-model='lowRangeColor'
      />
    </label>
    {{ lowRangeColor }}
  </p>
  <p>
    <label>
      Mid range color
      <input
        type='color'
        v-model='midRangeColor'
      />
    </label>
    {{ midRangeColor }}
  </p>
  <p>
    <label>
      High range color
      <input
        type='color'
        v-model='highRangeColor'
      />
    </label>
    {{ highRangeColor }}
  </p>
  <p>
    <label>
      Background color
      <input
        type='color'
        v-model='backgroundColor'
      />
    </label>
    {{ backgroundColor }}
  </p>
  <p>
    <label>
      Show level bar
      <input
        type='checkbox'
        v-model='showBar'
      />
    </label>
    {{ showBar }}
  </p>
  <p>
    <label>
      Show level text
      <input
        type='checkbox'
        v-model='showText'
      />
    </label>
    {{ showText }}
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
        <option value="https://lib.replayer.app/demo/decisions-by-lidija-roos.ogg">Decisions by Lidija Roos (ogg, different domain, CORS enabled)</option>
        <option value="https://lib.replayer.app/demo/lidija_roos-not_for_sale.mp3">Not for sale by Lidija Roos (mp3, different domain, CORS enabled)</option>
        <option value="https://lib.replayer.app/demo/eyes-have-not-seen-by-lidija-roos.flac">
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
    @play='resumeAudioContext()'
    @playing='updatePlaying(true)'
    @pause='updatePlaying(false)'  >
  </audio>
  <AudioLevelMeter
    v-if="audioSource && audioContext"
    :minLevel='minLevel'
    :lowLevel='lowLevel'
    :highLevel='highLevel'
    :maxLevel='maxLevel'
    :lowRangeColor='lowRangeColor'
    :midRangeColor='midRangeColor'
    :highRangeColor='highRangeColor'
    :backgroundColor='backgroundColor'
    :audioSource="audioSource"
    :audioContext="audioContext"
    :algorithm="algorithm"
    :showBar='showBar'
    :showText='showText'
    :running='running'
  />
</template>
<script setup lang='ts'>
import AudioLevelMeter from './AudioLevelMeter.vue';
import { onMounted, onUnmounted, ref, ShallowRef, shallowRef } from 'vue';

const algorithm = ref('peak');
const minLevel = ref(-48);
const lowLevel = ref(-12);
const highLevel = ref(-3);
const maxLevel = ref(0);
const lowRangeColor = ref('#9a47ff')
const midRangeColor = ref('#31b800')
const highRangeColor = ref('#f59b00')
const backgroundColor = ref('#333333')
const showBar = ref(true)
const showText = ref(true)
const running = ref(false)
const sourceUrl = ref('https://lib.replayer.app/demo/lidija_roos-not_for_sale.mp3')


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

/** Updates the running state according to the playback state
 */
 async function updatePlaying(playing:boolean) {
  running.value = playing;
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
