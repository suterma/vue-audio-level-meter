<script setup lang="ts">
import ExampleWithTheBasics from './documentation/ExampleWithTheBasics.vue';
import Credits from './documentation/Credits.vue';
import DemoWidget from './documentation/DemoWidget.vue';
</script>

<template>
  <section class="hero is-light">
    <div class="hero-body has-text-centered">
      <img
        alt="vue-audio-level-meter logo"
        class="logo"
        src="./assets/vue-audio-level-meter-logo.svg"
        width="125"
        height="125"
      />

      <h1 class="title is-1">vue-audio-level-meter</h1>
      <h2 class="subtitle is-3">
        A simple audio (peak) level meter for Vue.js.
      </h2>
    </div>
  </section>

  <section class="section">
    <div class="no-container">
      <div class="columns">
        <div class="column is-2">
          <aside class="is-medium menu">
            <p class="menu-label">Topics</p>
            <ul class="menu-list">
              <li><a href="#basic-examples"> Basic examples</a></li>
              <!-- <li><a href="#available-properties"> Properties</a></li>
              <li><a href="#setting-styles">Setting styles</a></li>
              <li><a href="#using-slots">Using slots</a></li>
              <li><a href="#using-options">Options</a></li>
              <li><a href="#accessing-instance">Accessing the instance</a></li>
              <li><a href="#using-reactivity">Using reactivity</a></li> -->
              <li><a href="#player-widget">A widget</a></li>
              <li><a href="#credits">Credits</a></li>
            </ul>
          </aside>
        </div>
        <div class="column is-10">
          <div class="content">
            <!-- <h3 id="introduction" class="title is-3">Introduction</h3> -->
            <article class="example">
              //TODO



//TODO write about d type for webkitAudioContext //TODO write about
  CORS-enabled //TODO write about mounting //TODO write about the key //TODO
  create the minimal example //TODO try also a CORS-restricted file
  src="lidija_roos-not_for_sale.mp3" src
  ="https://lib.replayer.app/your-light-by-lidija-roos.mp3"

  //NOTE If you change the source, you need to use :key="props.mediaUrl"

              <!-- <Introduction /> -->
            </article>

            <h3 id="basic-examples" class="title is-3">Basic example</h3>
            <article class="example">
              <ExampleWithTheBasics />
            </article>

            <h3 id="audio-level-meter-widget" class="title is-3">
              An audio level meter widget including a player
            </h3>
            <article class="example">
              <DemoWidget />
            </article>

            <h3 id="credits" class="title is-3">Credits</h3>
            <article class="example">
              <Credits />
            </article>
          </div>
        </div>
      </div>
    </div>
  </section>

  <footer class="footer">
    <section class="section">
      <div class="container has-text-centered">
        <p>
          <a href="https://github.com/suterma/vue-audio-level-meter"
            >vue-audio-level-meter</a
          >
          is created with love by
          <a href="https://marcelsuter.ch">Marcel Suter</a> for the
          <a href="http://replayer.app">Replayer</a>
          project.
        </p>
      </div>
    </section>
  </footer>
</template>

<style scoped>
.logo {
  display: block;
  margin: 0 auto 2rem;
}
</style>
