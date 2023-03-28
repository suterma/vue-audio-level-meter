<script setup lang="ts">
import AudioLevelMeter from './../components/AudioLevelMeter.vue';
import { onMounted, ref, ShallowRef, shallowRef } from 'vue';


/**
 *  Defining the AudioContext
 *  @devdoc webkitAudioContext supports older versions of Safari
 */
const AudioContext = window.AudioContext; //TODO later also use || window.webkitAudioContext;
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

/** Toggles playback
 * @devdoc Directly uses the audio element instead of the peaks.js player API 
 * to allow control even when the waveform is not yet ready.
 */
 function resumeAudioContext() {
    console.info("Resuming audio context");
    context.value.resume()
}

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
<template  
>



//TODO write about d type for webkitAudioContext //TODO write about
  CORS-enabled //TODO write about mounting //TODO write about the key //TODO
  create the minimal example //TODO try also a CORS-restricted file
  src="lidija_roos-not_for_sale.mp3" src
  ="https://lib.replayer.app/your-light-by-lidija-roos.mp3"


  <audio
    @click="resumeAudioContext()"
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


  <!-- <p>vue-peaks provides three modes of operation:
  <ul>
    <li><b>Simple mode</b>: just set the media URL, and all views are automatically rendered by default</li>
    <li><b>Slot mode</b>: the media element and additional views are provided using named slots</li>
    <li><b>External mode</b>: the media element and additional views are referenced by id or HTML element references
    </li>
  </ul>
  </p>
  <h4 class="title is-4">Just using a media source URL ("simple" mode)</h4>

  <div class="columns is-desktop">
    <div class="column">
      <p>
        By default, the
        <a href="https://github.com/suterma/vue-peaks/blob/main/src/components/AudioPeaks.vue">AudioPeaks Vue
          component</a>
        template has a new audio element, with the given source URL, and both view panes
        (overview and zoom, which are rendered with a default size) and a controls pane. A new audio context is
        created
        and
        used to compute the
        waveform.
      </p>
      <highlightjs language='vue-typescript' code="import AudioPeaks from 'vue-peaks/src/components/AudioPeaks.vue';" />
      <highlightjs language='vue-template' code="<AudioPeaks src='https://domain/file.mp3' />" />
    </div>
    <div class="column">
      <div class="box">
        <AudioPeaks src="https://suterma.github.io/vue-peaks/lidija_roos-not_for_sale.mp3" />
      </div>
    </div>
  </div>



  <h4 class="title is-4">Providing a media element ("slot" mode)</h4>
  <div class="columns is-desktop">
    <div class="column">
      <p>
        To provide your own media element, just place it inside the AudioPeaks element (a.k.a. the slot). Vue-peaks will
        use
        the first audio element in the slot. A new audio context is created and used to compute the waveform.
      </p>
    </div>
    <div class="column">
      <highlightjs language='vue-template' code="<AudioPeaks>
  <span>You can also add additional HTML content.</span>
  <audio controls style='width: 100%;'>
    <source src='https://domain/file.mp3' />
  </audio>
</AudioPeaks>" />
    </div>
    <div class="column is-narrow">
      <div class="box">
        <AudioPeaks>
          <span class="tag is-danger is-large is-multiline">You can also add additional HTML content.</span>
          <audio controls style='width: 100%;'>
            <source src='https://suterma.github.io/vue-peaks/lidija_roos-not_for_sale.mp3' />
          </audio>
        </AudioPeaks>
      </div>
    </div>
  </div>

  <h4 class="title is-4">Using a specified media element ("external" mode)</h4>
  <div class="columns is-desktop">
    <div class="column">
      <p>
        If you already have an existing media element, you can reference it by it's (unique) id, or as an
        HTMLMediaElement
        object. A new audio context is
        created and used to compute the waveform.
      </p>
      <p>
        There are also properties available for overview area and the zoom view area.
      </p>
    </div>
    <div class="column">
      <highlightjs language='vue-template' code="<audio controls id='externalMediaElement'>
  <source src='https://domain/file.mp3' />
</audio>
<div><span class='tag is-danger is-large'>
    Using the external media element above.</span></div>
<AudioPeaks mediaElementId='externalMediaElement'>
</AudioPeaks>" />
    </div>
    <div class="column is-narrow">
      <div class="box">
        <audio controls id='externalMediaElement'>
          <source src='https://suterma.github.io/vue-peaks/lidija_roos-not_for_sale.mp3' />
        </audio>
        <div><span class='tag is-danger is-large'>
            Using the external media element above.</span></div>
        <AudioPeaks mediaElementId='externalMediaElement'>
        </AudioPeaks>
      </div>
    </div>
  </div> -->
</template>
