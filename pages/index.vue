<template>
  <container>
  
    <h1>OAC</h1>
    <h4>Obstacle Avoiding Car</h4>

    <nuxt-link to="/training">
      <vs-button vs-type="primary-gradient" vs-icon="play_arrow" vs-width="200px">Start Training</vs-button>
    </nuxt-link>

    <vs-button vs-type="primary-gradient" vs-icon="code" vs-width="200px" @click="enterCode">Enter ANN Code</vs-button>

    <nuxt-link to="/settings">
      <vs-button vs-type="dark-gradient" vs-icon="settings" vs-width="200px">Settings</vs-button>
    </nuxt-link>

    <nuxt-link to="/about">
      <vs-button vs-type="dark-gradient" vs-icon="info" vs-width="200px">About</vs-button>
    </nuxt-link>

    <div class="note">
      <b>Note:</b> this application is targeted for <b>desktop</b> only.<br>
      A minimum screen resolution of <b>1366 x 768</b> is recommended.<br>
      Tested only on <b>Google Chrome</b>.
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
  import Container from '~/components/Container'

  export default {
    components: {
      Container
    },

    data () {
      return {
        code: ''
      }
    },

    methods: {
      enterCode () {
        this.$vs.prompt({
          title: 'Enter ANN Code',
          text: 'Enter the ANN Code you wish to use',
          color: 'primary',
          input: {
            placeholder: 'ANN Code',
            value: this.code,
            maxLength: 6,
            type: 'text'
          },
          confirm: value => {
            this.code = value
            this.$store.dispatch('codeExists', this.code)
              .then(exists => {
                if(exists) {
                  this.$vs.notify({
                    title: 'Success',
                    text: `Using code ${this.code}`,
                    color: 'success',
                    time: 5000
                  })
                  this.$nuxt.$router.replace({ path: '/run' })
                } else
                  this.$vs.notify({
                    title: 'Error',
                    text: `Code ${this.code} was not found on the server`,
                    color: 'danger',
                    time: 5000
                  })
              })
              .catch(e => {
                this.$vs.notify({
                title: 'Error',
                text: `Failed to communicate with the API: ${e.message}`,
                color: 'danger',
                time: 5000
                })
              })
          }
        })
      }
    }
  }
</script>