<template>
    <div class="columns is-desktop">
        <div class="column">
            <p>This is the most basic example:
            <ul>
                <li>Having or creating a running <b>audio context</b></li>
                <li>Declaring an <b>audio element</b> with a source, a ref, optionally some controls and the ability to
                    resume the audio context, if required</li>
                <li>Showing an <b>AudioLevelMeter</b> component which gets an audio context and the
                    MediaElementAudioSourceNode from the audio element</li>
            </ul>
            </p>
            <p>
                The using component should declare the audio element, with the given source URL, and a
                ref to it. At component mount time, the ref is invoked to actually create an audio node
                for the analyzer.
            </p>
            <highlightjs language='vue-template' code='<audio 
    src="lidija_roos-not_for_sale.mp3" 
    ref="audioElement" 
    controls @play="resumeAudioContext()"></audio>
<AudioLevelMeter 
    v-if="audioSource" 
    :audioSource="audioSource" 
    :audioContext="context"/>' />
    <highlightjs language='vue-typescript'
                code="import AudioPeaks from 'vue-peaks/src/components/AudioPeaks.vue';" />
        </div>
        <div class="column">
            <div class="box">
                <audio src="lidija_roos-not_for_sale.mp3" ref="audioElement" controls @play="resumeAudioContext()"></audio>
                <AudioLevelMeter v-if="audioSource" :audioSource="audioSource" :audioContext="context" />
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import AudioLevelMeter from './../components/AudioLevelMeter.vue';
import { onMounted, ref, ShallowRef, shallowRef } from 'vue';

/**
 *  Defining the AudioContext
 *  @devdoc webkitAudioContext supports older versions of Safari
 */
const context = shallowRef(new (window.AudioContext || window.webkitAudioContext)());

/** Audio element to use
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

/** Resumes the audio context after manual page interaction, if necessary.
 */
 async function resumeAudioContext() {
    if (context.value.state === 'suspended') {
        await context.value.resume();
        console.info('Resumed audio context');
    }

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
