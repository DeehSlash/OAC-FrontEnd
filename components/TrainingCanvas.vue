<template>
  <div>
    <div class="header">
      <vs-row>
        <vs-col vs-type="flex" vs-justify="flex-start" vs-w="6">
          <nuxt-link to="/">
            <vs-button vs-type="dark-gradient" vs-icon="arrow_back">Back</vs-button>
          </nuxt-link>
          <vs-button vs-type="danger-gradient" vs-icon="clear" @click="clearTrainingData">Clear Training Data</vs-button>
          <vs-button vs-type="danger-gradient" vs-icon="clear" @click="resetCarPosition">Reset Car Position</vs-button>
        </vs-col>
        <vs-col vs-type="flex" vs-align="center" vs-justify="flex-end" vs-w="6">
          <vs-chip vs-color="danger">Distance:<br>{{ `${distance[0]}, ${distance[1]}, ${distance[2]}` }}</vs-chip>
          <vs-chip vs-color="primary">Training Data Entries:<br>{{ trainingData.length }}</vs-chip>
          <vs-button vs-type="success-gradient" vs-icon="done" @click="finish">Finish</vs-button>
        </vs-col>
      </vs-row>
    </div>

    <v-stage :config="canvas" ref="stage">
      <v-layer ref="layer">
        <v-rect :config="background"/>
        <v-rect v-for="(obstacle, i) in obstacles" :key="i" :config="obstacle" :ref="'obstacle' + i"/>
        <v-image :config="_car"/>
        <!-- <v-line v-for="line in lines" :key="line.name" :config="line"/> -->
      </v-layer>
    </v-stage>
  </div>
</template>

<style lang="scss" scoped>
  .header {
    margin-bottom: 5px;
  }
</style>

<script>
  export default {
    mounted () {
      // Initialize car image
      this.car.image = new Image()
      this.car.image.src = '/car.png'

      // Add Key Down Listener
      window.addEventListener('keydown', this.keyDownEvent)

      this.ctx = this.$refs.layer.getStage().getContext()

      // Calculate the first distance 
      this.distance[0] = this.calculateDistance('top')
      this.distance[1] = this.calculateDistance('middle')
      this.distance[2] = this.calculateDistance('bottom')
    },

    destroyed () {
      // Remove Key Down Listener
      window.removeEventListener('keydown', this.keyDownEvent)
    },

    data () {
      return {
        canvas: {
          width: 1000,
          height: 500
        },

        obstacles: [
          { x: 50, y: 60, width: 100, height: 20, fill: 'black' },
          { x: 200, y: 300, width: 50, height: 30, fill: 'black' },
          { x: 900, y: 300, width: 20, height: 100, fill: 'black' },
          { x: 500, y: 200, width: 30, height: 90, fill: 'black' },
          { x: 100, y: 350, width: 30, height: 30, fill: 'black' },
          { x: 800, y: 30, width: 40, height: 90, fill: 'black' },
          { x: 500, y: 400, width: 50, height: 90, fill: 'black' },
          { x: 500, y: 40, width: 50, height: 20, fill: 'black' },
          { x: 200, y: 150, width: 50, height: 70, fill: 'black' },
          { x: 700, y: 250, width: 100, height: 100, fill: 'black' },
          { x: 250, y: 450, width: 150, height: 30, fill: 'black' }
        ],

        car: {
          x: 450,
          y: 250,
          width: 50,
          height: 27,
          offsetX: 50 / 2,
          offsetY: 27 / 2,
          speed: 2,
          image: '',
          rotation: 0
        },

        distance: [-1, -1, -1],

        ctx: null,

        created: false
      }
    },

    computed: {
      background () {
        return {
          x: 0,
          y: 0,
          width: this.canvas.width,
          height: this.canvas.height,
          fill: 'white',
          stroke: 'black'
        }
      },

      _car () {
        return {
          x: this.car.x,
          y: this.car.y,
          width: this.car.width,
          height: this.car.height,
          offsetX: this.car.offsetX,
          offsetY: this.car.offsetY,
          speed: this.car.speed,
          image: this.car.image,
          rotation: this.car.rotation
        }
      },

      lines () {
        return [
          {
            name: 'middle',
            points: [
              this.car.x + (this.car.width / 2) * Math.cos(Math.PI / 180 * this.car.rotation),
              this.car.y + (this.car.width / 2) * Math.sin(Math.PI / 180 * this.car.rotation),
              this.car.x + ((this.car.width / 2) + 30) * Math.cos(Math.PI / 180 * this.car.rotation),
              this.car.y + ((this.car.width / 2) + 30) * Math.sin(Math.PI / 180 * this.car.rotation)
            ],
            stroke: 'green'
          },
          {
            name: 'top',
            points: [
              this.car.x + (this.car.width / 2) * Math.cos(Math.PI / 180 * this.car.rotation),
              this.car.y + (this.car.width / 2) * Math.sin(Math.PI / 180 * this.car.rotation),
              this.car.x + ((this.car.width / 2) + 30) * Math.cos(Math.PI / 180 * (this.car.rotation - 30)),
              this.car.y + ((this.car.width / 2) + 30) * Math.sin(Math.PI / 180 * (this.car.rotation - 30))
            ],
            stroke: 'green'
          },
          {
            name: 'bottom',
            points: [
              this.car.x + (this.car.width / 2) * Math.cos(Math.PI / 180 * this.car.rotation),
              this.car.y + (this.car.width / 2) * Math.sin(Math.PI / 180 * this.car.rotation),
              this.car.x + ((this.car.width / 2) + 30) * Math.cos(Math.PI / 180 * (this.car.rotation + 30)),
              this.car.y + ((this.car.width / 2) + 30) * Math.sin(Math.PI / 180 * (this.car.rotation + 30))
            ],
            stroke: 'green'
          }
        ]
      },

      trainingData () {
        return this.$store.getters.getTrainingData
      },

      trainingResult () {
        return this.$store.getters.getTrainingResult
      },

      eventListenerAdded () {
        return this.$store.getters.getEventListenerAdded
      }
    },

    methods: {
      clearTrainingData () {
        this.$vs.alert({
          title: 'Clear Training Data',
          text: 'Are you sure you want to clear training data?',
          textConfirm: 'Clear',
          color: 'danger',
          confirm: () => {
            this.$store.commit('clearTrainingData')
            this.$vs.notify({
              title: 'Success',
              text: 'Training data has been successfully cleared',
              color: 'success',
              time: 5000
            })
          }
        })
      },

      resetCarPosition () {
        this.$vs.alert({
          title: 'Reset Car Position',
          text: 'Are you sure you want to reset the car position?',
          textConfirm: 'Reset',
          color: 'danger',
          confirm: () => {
            this.car.x = 450
            this.car.y = 250
            this.car.rotation = 0
            this.$vs.notify({
              title: 'Success',
              text: 'Car position has been successfully reset',
              color: 'success',
              time: 5000
            })
          }
        })
      },

      finish () {
        if (this.trainingData.length === 0) {
          this.$vs.alert({
            title: 'Error',
            text: 'No Training Data has been collected. First, drive a little then go to the next step.',
            textConfirm: 'OK',
            color: 'danger',
          })
          return
        }
        this.$vs.alert({
          title: 'Finish',
          text: 'Are you sure you want to finish the training?',
          textConfirm: 'Finish',
          color: 'success',
          confirm: () => {
            this.$vs.loading({ color: 'success' })
            this.$store.dispatch('createNetwork')
              .then(() => {
                this.$vs.loading.close()
                this.$vs.alert({
                  title: 'Training Result',
                  text: `Error: ${this.trainingResult.error}<br>Iterations: ${this.trainingResult.iterations}<br>Time: ${this.trainingResult.time / 1000} seconds`,
                  textConfirm: 'OK',
                  color: 'success'
                })
                this.$vs.notify({
                  title: 'Success',
                  text: `Network created with code ${this.$store.getters.getCode}`,
                  color: 'success',
                  time: 5000
                })
                this.$nuxt.$router.replace({ path: '/run' })
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
      },

      keyDownEvent (e) {
        if (['w', 'a', 's', 'd'].includes(e.key))
          this.keyHandler(e.key)
      },

      keyHandler (key) {
        // Moves the car based on the pressed key
        switch (key) {
          case 'w':
            this.car.x += this.car.speed * Math.cos(Math.PI / 180 * this.car.rotation)
            this.car.y += this.car.speed * Math.sin(Math.PI / 180 * this.car.rotation)
            break
          case 's':
            this.car.x -= this.car.speed * Math.cos(Math.PI / 180 * this.car.rotation)
            this.car.y -= this.car.speed * Math.sin(Math.PI / 180 * this.car.rotation)
            break
          case 'a':
            this.car.rotation -= 5
            break
          case 'd':
            this.car.rotation += 5
            break
        }

        // If the distance is greater than 0 (obstacle ahead), save it as a training data
        this.$store.commit('addTrainingData', {
          input: [...this.distance],
          output: [key]
        })

        // Recalculate the distance
        this.distance[0] = this.calculateDistance('top')
        this.distance[1] = this.calculateDistance('middle')
        this.distance[2] = this.calculateDistance('bottom')
      },

      calculateDistance (lineName) {
        let x, y, angleMod, cos, sin

        switch (lineName) {
          case 'top':
            angleMod = -30
            break
          case 'middle':
            angleMod = 0
            break
          case 'bottom':
            angleMod = 30
            break
        }

        cos = Math.cos(Math.PI / 180 * (this.car.rotation + angleMod))
        sin = Math.sin(Math.PI / 180 * (this.car.rotation + angleMod))

        for (let i = 0; i <= 30; i++) {
          x = this.car.x + ((this.car.width / 2) + i) * cos
          y = this.car.y + ((this.car.width / 2) + i) * sin

          // Check if out of bounds
          if (this.outOfBound(x, y))
            return i

          // Get hex color  
          let hex = this.getHex(x, y)
          
          // If the pixel is black (obstacle), return the distance
          if (hex === '#000000')
            return i
        }

        // If no obstacle was found, return 41
        return 31
      },

      rgbToHex (r, g, b) {
        if (r > 255 || g > 255 || b > 255)
          throw "Invalid color component"
        return ((r << 16) | (g << 8) | b).toString(16)
      },

      outOfBound (x, y) {
        return ((x < 0 || x > this.canvas.width) || (y < 0 || y > this.canvas.height))
      },

      getHex (x, y) {
        let p = this.ctx.getImageData(x, y, 1, 1).data
        return '#' + ('000000' + this.rgbToHex(p[0], p[1], p[2])).slice(-6)
      }
    }
  }
</script>