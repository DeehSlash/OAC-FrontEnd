<template>
  <container>

    <page-title>Training</page-title>
    <training-canvas/>

  </container>
</template>

<script>
  import Container from '~/components/Container.vue'
  import PageTitle from '~/components/PageTitle.vue'
  import TrainingCanvas from '~/components/TrainingCanvas.vue'

  export default {
    components: {
      Container,
      PageTitle,
      TrainingCanvas
    }
  }
</script>
