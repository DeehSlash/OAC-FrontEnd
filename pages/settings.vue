<template>
  <container>
  
    <page-title>Settings</page-title>

    <span class="text">Delay between each request</span>
    <vs-input-number v-model="delay" vs-min="1" vs-max="1000"/>
    
    <nuxt-link to="/" class="save">
      <vs-button vs-type="success-gradient" vs-icon="done" @click="save">Save Settings</vs-button>
    </nuxt-link>

  </container>
</template>

<style lang="scss" scoped>
  .text {
    margin-top: 15px;
  }
  
  .save {
    margin-top: 25px;
  }
</style>


<script>
  import Container from '~/components/Container'
  import PageTitle from '~/components/PageTitle'

  export default {
    components: {
      Container,
      PageTitle
    },

    created () {
      if (this.$store.getters.getDelay)
        this.delay = this.$store.getters.getDelay
    },

    data () {
      return {
        delay: 50
      }
    },

    methods: {
      save () {
        this.$store.commit('setDelay', parseInt(this.delay))
        this.$vs.notify({
          title: 'Success',
          text: `Settings saved`,
          color: 'success',
          time: 5000
        })
      }
    }
  }
</script>