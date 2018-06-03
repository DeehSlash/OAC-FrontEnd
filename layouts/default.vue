<template>
  <nuxt/>
</template>

<style lang="scss">
  html, body, #__nuxt, #__layout {
    width: 100%;
    height: 100%;
  }
</style>

<script>
  export default {
    mounted () {
      this.$vs.theme({
        primary:'rgb(31, 116, 255)',
        success:'rgb(70, 201, 58)',
        danger:'rgb(255, 71, 87)',
        warning:'rgb(255, 186, 0)',
        dark:'rgb(30, 30, 30)'
      })
    }
  }
</script>