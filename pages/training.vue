<template>
  <container>

    <page-title>Training</page-title>
    <training-canvas/>

  </container>
</template>

<script>
  import Container from '~/components/Container'
  import PageTitle from '~/components/PageTitle'
  import TrainingCanvas from '~/components/TrainingCanvas'

  export default {
    components: {
      Container,
      PageTitle,
      TrainingCanvas
    }
  }
</script>
