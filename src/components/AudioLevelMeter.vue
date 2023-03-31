<template>
  <LevelMeter :disabled="disabled" :minLevel="minLevel" :lowLevel='optimumLevel' :highLevel='overloadLevel'
    :maxLevel="fullScaleLevel" :value="clampedLevel" title="dBFS (peak)">
    {{ clampedLevel }} dbFS
  </LevelMeter>
  <span :class='{ disabled: disabled }'>{{ clampedLevelText }} </span> dB
</template>

<script setup lang="ts">
import {
  onMounted,
  defineProps,
  onUnmounted,
  ref,
  PropType,
  computed,
} from 'vue';
import LevelMeter from './LevelMeter.vue';

/** An simple audio level meter (visualizer), for a single audio source node, using the Web Audio API.
 * @remarks Internally uses the Web Audio API's AnalyserNode. Therefore, because it down-mixes time domain data (See https://webaudio.github.io/web-audio-api/#time-domain-down-mixing), the level is only mono.
 */

const props = defineProps({
  /** The audio source node to use.
   */
  audioSource: {
    type: AudioNode,
    required: true,
  },
  /** The audio context to use.
   */
  audioContext: {
    //Defining other than straight AudioContext is necessary for iOS < v14 compatibility of the compiled code
    type: null as unknown as PropType<AudioContext>,
    required: true,
  },

  /** The minimum level value to display, in [dBFS]. Default is -48.
    * @remarks This indicates the level to use for the low end in the display.
 */
  minLevel: {
    type: Number,
    required: false,
    default: -48
  },

  /** The optimum level value to display, in [dBFS]. Default is -12.
   * @remarks The term optimum does make little sense in already processed signals. 
   * Here, however, it is used to indicate the start of the "yellow" area in the display.
*/
  optimumLevel: {
    type: Number,
    required: false,
    default: -12
  },

  /** The overload level value to display, in [dBFS]. Default is -3.
   * @remarks The term overload does make little sense in already processed signals. 
   * Here, however, it is used to indicate the start of the "red" area in the display.
*/
  overloadLevel: {
    type: Number,
    required: false,
    default: -3
  },

  /** The full scale level value (max value) to display, in [dBFS]. Default is 0.
   * @remarks A definition of "Full Scale" does make little sense in already processed signals. 
   * Here, however, it is used to indicate the level to use for the top end in the display.
 */
  fullScaleLevel: {
    type: Number,
    required: false,
    default: 0
  },

  /** Whether to show the component in a disabled state
   * @devdoc This attribute is processed with "fallthrough", to propagate the state to the inner elements.
   */
  disabled: Boolean,
});

let analyser: AnalyserNode;

/** Whether the float time domain data can be obtained.
 * @devdoc The float time domain version is not available for Safari on iOS below version 14.5
 * (See https://caniuse.com/mdn-api_analysernode_getfloattimedomaindata)
 *  * The byte time domain version is available with Safari from iOS version 6.
 * (See https://caniuse.com/mdn-api_analysernode_getbytetimedomaindata)
 */
let canUseFloatTimeDomainData: boolean;

/** The float data buffer to possibly use.
 */
let floatSampleBuffer: Float32Array;

/** The byte data buffer to possibly use, as an alternative, when float data is not available.
 * @remarks The 8bit data only covers a dynamic range of about 36dB.
 */
let byteSampleBuffer: Uint8Array;

let loopRequestId: number;

const levelMeter = ref(null);

/** The value of the signal Starts with the minimum level. */
const value = ref(props.minLevel);

/** The value, the meter actually displays in dBFS. */
const clampedLevel = computed(() => Math.min(props.fullScaleLevel, Math.max(props.minLevel, value.value)))

/** The textual representation of the signal level. */
const clampedLevelText = computed(() => isFinite(value.value) ? value.value.toFixed(2) : '—')

/** The value range, the meter displays in dB. */
const range = computed(() => props.fullScaleLevel - props.minLevel)



onMounted(() => {
  console.debug('AudioLevelMeter::onMounted');

  analyser = props.audioContext.createAnalyser();

  canUseFloatTimeDomainData =
    typeof analyser.getFloatTimeDomainData === 'function';

  // Time domain samples are always provided with the count of
  // fftSize (which is always a power of two) even though there is no FFT involved.
  // The value of 1024 has been empirically determined to be high enough to also include
  // bass and drum kick sounds in the calculated level at a reasonable degree.
  // You may set to a higher value to trade computational expense for more accuracy.
  analyser.fftSize = 1024;

  if (canUseFloatTimeDomainData) {
    floatSampleBuffer = new Float32Array(analyser.fftSize);
  } else {
    byteSampleBuffer = new Uint8Array(analyser.fftSize);
  }

  props.audioSource.connect(analyser);
  loop();
});

onUnmounted(() => {
  cancelAnimationFrame(loopRequestId);
  analyser.disconnect(); //the input
});


function loop() {
  if (canUseFloatTimeDomainData) {
    analyser.getFloatTimeDomainData(floatSampleBuffer);
  } else {
    analyser.getByteTimeDomainData(byteSampleBuffer);
  }

  // Compute average power over the interval.
  let sumOfSquares = 0;
  let avgPowerDecibels: number;

  if (canUseFloatTimeDomainData) {
    for (let i = 0; i < floatSampleBuffer.length; i++) {
      const sample = floatSampleBuffer[i];
      if (sample) {
        sumOfSquares += sample ** 2;
      }
    }
    avgPowerDecibels = 10 * Math.log10(sumOfSquares / floatSampleBuffer.length);
  } else {
    for (let i = 0; i < byteSampleBuffer.length; i++) {
      const sample = byteSampleBuffer[i];
      if (sample) {
        sumOfSquares += (sample / 128 - 1) ** 2;
      }
    }
    avgPowerDecibels = 10 * Math.log10(sumOfSquares / byteSampleBuffer.length);
  }

  // Compute peak power over the interval.
  let peakInstantaneousPower = 0;
  let peakInstantaneousPowerDecibels: number;
  if (canUseFloatTimeDomainData) {
    for (let i = 0; i < floatSampleBuffer.length; i++) {
      const sample = floatSampleBuffer[i];
      if (sample) {
        const power = sample ** 2;
        peakInstantaneousPower = Math.max(power, peakInstantaneousPower);
      }
    }
  } else {
    for (let i = 0; i < byteSampleBuffer.length; i++) {
      const sample = byteSampleBuffer[i];
      if (sample) {
        const power = (sample / 128 - 1) ** 2;
        peakInstantaneousPower = Math.max(power, peakInstantaneousPower);
      }
    }
  }
  peakInstantaneousPowerDecibels = 10 * Math.log10(peakInstantaneousPower);

  value.value = peakInstantaneousPowerDecibels;

  loopRequestId = requestAnimationFrame(loop);
}
</script>