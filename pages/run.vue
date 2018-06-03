<template>
  <container>

    <page-title>Execution</page-title>
    <execution-canvas/>

  </container>
</template>

<script>
  import Container from '~/components/Container.vue'
  import PageTitle from '~/components/PageTitle.vue'
  import ExecutionCanvas from '~/components/ExecutionCanvas.vue'

  export default {
    components: {
      Container,
      PageTitle,
      ExecutionCanvas
    }
  }
</script>
