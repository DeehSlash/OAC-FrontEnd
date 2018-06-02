<template>
  <container>
  
    <h1>OAC</h1>
    <h4>Obstacle Avoiding Car</h4>

    <nuxt-link to="/training">
      <vs-button vs-type="primary-gradient" vs-width="200px" href="/teste">Start Training</vs-button>
    </nuxt-link>
  
  </container>
</template>

<style lang="scss" scoped>
  h1 {
    margin-bottom: 5px;
  }

  h4 {
    margin-bottom: 25px;
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