<template>
  <container>
  
    <h1>OAC</h1>
    <h4>Obstacle Avoiding Car</h4>

    <nuxt-link to="/training">
      <vs-button vs-type="primary-gradient" vs-icon="play_arrow" vs-width="200px">Start Training</vs-button>
    </nuxt-link>

    <nuxt-link to="/about">
      <vs-button vs-type="dark-gradient" vs-icon="info" vs-width="200px">About</vs-button>
    </nuxt-link>

    <div class="note">
      <b>Note:</b> this application is targeted for <b>Desktop</b> only.<br>
      A minimum screen resolution of <b>1366 x 768</b> is recommended.
    </div>

  </container>
</template>

<style lang="scss" scoped>
  h1 {
    margin-bottom: 5px;
  }

  h4 {
    margin-bottom: 25px;
  }

  .note {
    margin-top: 25px;
    font-style: italic;
    font-size: 14px;
    line-height: 1.25rem;
  }
</style>

<script>
  import Container from '~/components/Container.vue'

  export default {
    components: {
      Container
    }
  }
</script>