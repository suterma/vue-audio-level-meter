<template>
  <div class="columns is-desktop">
    <div class="column">
      <cite>vue-audio-level-meter</cite> is a simple, lightweight and fast audio (peak) level meter
      working with the <a href='https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API'>Web Audio API</a>. It
      displays
      the audio level using an
      <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meter">HTML meter</a>
      element, with some level range coloring. All styles are
      customizable either directly via
      <a href="https://vuejs.org/guide/components/props.html">
        Vue properties</a>, or using
      <a href='https://developer.mozilla.org/en-US/docs/Web/CSS/Class_selectors'>
        selectors for the given CSS classes</a> on the rendered HTML elements.
    </div>
    <div class="column">
      <h4>Limitations</h4>
      <ul>
        <li>Processing sound requires a <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS">CORS</a>-enabled
          source and a
          running <a href='https://developer.mozilla.org/en-US/docs/Web/API/AudioContext'>Audio Context</a>.
          <br />See <a href="https://github.com/esonderegger/web-audio-peak-meter#frequently-encountered-problems">Evan
            Sonderegger's notes about frequently encountered problems</a> to learn more.
        </li>
        <li><cite>vue-audio-level-meter</cite> requires <a href="https://vuejs.org/">Vue3</a>. If you are looking for a
          pure JavaScript base solution, you
          might want to consider <a href='https://github.com/esonderegger/web-audio-peak-meter'>
            <cite>web-audio-peak-meter</cite></a> by Evan Sonderegger.
        </li>
        <li>Only a horizontal mode is available.</li>
        <li>No gauge level labels are available.</li>
        <li>The bar is only in mono.</li>
      </ul>
    </div>
  </div>
</template>
