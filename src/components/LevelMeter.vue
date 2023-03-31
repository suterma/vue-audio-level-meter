<template>
  <meter class="level-meter" ref="levelMeter" :min="minLevel" :low="lowLevel" :high="highLevel" :max="maxLevel"
    :value="value">
    <slot></slot>
  </meter>
</template>

<script setup lang="ts">
import { useElementBounding } from '@vueuse/core';
import {
  defineProps,
  ref,
  computed,
} from 'vue';

/** An simple level meter, with three distinct ranges.
 * @remarks Internally uses the <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meter">HTML meter element</a>, 
 * with the min, low, high and max level as exposed properties.
 * @remarks For the CSS classes see https://developer.mozilla.org/en-US/docs/Web/CSS/::-webkit-meter-bar
 * With this component, coloring is however different, offering a different color per range.
 * @remarks The default slot is the meter content.
 */

const props = defineProps({
  /** The minimum level
 */
  minLevel: {
    type: Number,
    required: true
  },

  /** The low level
*/
  lowLevel: {
    type: Number,
    required: true,
  },

  /** The high level
*/
  highLevel: {
    type: Number,
    required: true,

  },

  /** The maximum level
*/
  maxLevel: {
    type: Number,
    required: true,
  },

  /** The level value
*/
  value: {
    type: Number,
    required: true,
  },

});

const levelMeter = ref(null);

/** The styles for the meter range element are dynamically calculated to be able to
 * use a pixel-defined gradient. This makes the gradient regions visually fixed with regard to the meter scale
 * (non-dependent from the actual meter value)
 * @devdoc See https://stackoverflow.com/a/69078238/79485 for the v-bind mechanism
 */
const { width } = useElementBounding(levelMeter);

/** The value range. */
const range = computed(() => props.maxLevel - props.minLevel)

const widthMax = computed(() => {
  return `${width.value}px`;
});

const widthHigh = computed(() => {
  return `${width.value * (1 - (1 / range.value) * (props.maxLevel - props.highLevel))}px`;
});

const widthLow = computed(() => {
  return `${width.value * (1 - (1 / range.value) * (props.maxLevel - props.lowLevel))}px`;
});

const widthMinimum = computed(() => {
  return `${0}px`;
});

</script>
<style lang="css">
meter.level-meter {
  width: 100%;
  height: 1em;
  /* Required to get rid of the default background property
   * @devoc "background" (without -color) is additionally required for Firefox
   */
  background-color: #000;
  background: #000;
  /* do not show a border (border none seems not to work)*/
  border: none;
  border-radius: 4px;
}

/* ------------------------------------------------------------------------- */

/** The styles for the meter bar (Firefox)
* @devdoc For Firefox (moz), see https://support.mozilla.org/en-US/questions/1308191 
* These must stand separately from webkit, because otherwise they would disturb each other 
*/
meter.level-meter::-moz-meter-bar {
  background-image: linear-gradient(90deg,
      #62c462 v-bind('widthMinimum'),
      #62c462 v-bind('widthLow'),
      #f9e406 v-bind('widthLow'),
      #f9e406 v-bind('widthHigh'),
      #ee5f5b v-bind('widthHigh'),
      #ee5f5b v-bind('widthMax'));
}

/* ------------------------------------------------------------------------- */

/** The styles for the meter bar (Chrome and Webkit) 
* @devdoc For webkit, see https://css-tricks.com/html5-meter-element/ 
* @devdoc https://developer.mozilla.org/en-US/docs/Web/CSS/::-webkit-meter-bar */
meter.level-meter::-webkit-meter-bar {
  /* Required to get rid of the default background property */
  background: none;
  /* do not show a border (border none seems not to work)*/
  border: 0px;
  /* Show similar radius for the meter border as for the meter background */
  border-radius: 4px;
  /* Show similar height for the meter border as for the meter background */
  height: 1em;
}

meter.level-meter::-webkit-meter-optimum-value,
meter.level-meter::-webkit-meter-suboptimum-value,
meter.level-meter::-webkit-meter-even-less-good-value {
  background-image: linear-gradient(90deg,
      #62c462 v-bind('widthMinimum'),
      #62c462 v-bind('widthLow'),
      #f9e406 v-bind('widthLow'),
      #f9e406 v-bind('widthHigh'),
      #ee5f5b v-bind('widthHigh'),
      #ee5f5b v-bind('widthMax'));
}
</style>
