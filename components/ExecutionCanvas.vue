<template>
  <div>
    <div class="header">
      <vs-row>
        <vs-col vs-type="flex" vs-justify="flex-start" vs-w="6">
          <nuxt-link to="/">
            <vs-button vs-type="dark-gradient" vs-icon="arrow_back">Back</vs-button>
          </nuxt-link>
          <vs-button vs-type="danger-gradient" vs-icon="clear" @click="resetCarPosition">Reset Car Position</vs-button>
          <vs-button vs-type="dark-gradient" vs-icon="code" @click="changeCode">Change ANN Code</vs-button>
        </vs-col>
        <vs-col vs-type="flex" vs-align="center" vs-justify="flex-end" vs-w="6">
          <vs-chip vs-color="dark">ANN code:<br>{{ code }}</vs-chip>
          <vs-chip vs-color="danger">Distance:<br>{{ `${distance[0]}, ${distance[1]}, ${distance[2]}` }}</vs-chip>
          <vs-chip vs-color="primary">Last movement:<br>{{ lastMovement }}</vs-chip>
          <vs-button :class="state.type" :vs-icon="state.icon" @click="start" vs-width="120px">{{ state.text }}</vs-button>
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
      // Check if code exists
      this.checkCode()

      // Initialize car image
      this.car.image = new Image()
      this.car.image.src = '/car.png'

      this.ctx = this.$refs.layer.getStage().getContext()

      // Calculate the first distance 
      this.distance[0] = this.calculateDistance('top')
      this.distance[1] = this.calculateDistance('middle')
      this.distance[2] = this.calculateDistance('bottom')

      this.getMovements()
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

        lastMovement: '',

        state: {
          started: false,
          text: 'Start',
          type: 'vs-button-success-gradient',
          icon: 'play_arrow'
        },

        ctx: null,

        newCode: ''
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
              this.car.x + ((this.car.width / 2) + 40) * Math.cos(Math.PI / 180 * this.car.rotation),
              this.car.y + ((this.car.width / 2) + 40) * Math.sin(Math.PI / 180 * this.car.rotation)
            ],
            stroke: 'green'
          },
          {
            name: 'top',
            points: [
              this.car.x + (this.car.width / 2) * Math.cos(Math.PI / 180 * this.car.rotation),
              this.car.y + (this.car.width / 2) * Math.sin(Math.PI / 180 * this.car.rotation),
              this.car.x + ((this.car.width / 2) + 40) * Math.cos(Math.PI / 180 * (this.car.rotation - 25)),
              this.car.y + ((this.car.width / 2) + 40) * Math.sin(Math.PI / 180 * (this.car.rotation - 25))
            ],
            stroke: 'green'
          },
          {
            name: 'bottom',
            points: [
              this.car.x + (this.car.width / 2) * Math.cos(Math.PI / 180 * this.car.rotation),
              this.car.y + (this.car.width / 2) * Math.sin(Math.PI / 180 * this.car.rotation),
              this.car.x + ((this.car.width / 2) + 40) * Math.cos(Math.PI / 180 * (this.car.rotation + 25)),
              this.car.y + ((this.car.width / 2) + 40) * Math.sin(Math.PI / 180 * (this.car.rotation + 25))
            ],
            stroke: 'green'
          }
        ]
      },

      trainingData () {
        return this.$store.getters.getTrainingData
      },

      code () {
        return this.$store.getters.getCode
      },

      delay () {
        return this.$store.getters.getDelay
      }
    },

    methods: {
      checkCode () {
        if(!this.$store.getters.getCode) {
          this.$vs.alert({
            title: 'Error',
            text: 'No ANN code was found, did you skip the Training process?',
            textConfirm: 'Go To Training',
            color: 'danger',
            confirm: () => {
              this.$nuxt.$router.replace({ path: '/training' })
            }
          })
        }
      },

      changeCode () {
        this.$vs.prompt({
          title: 'Change ANN Code',
          text: 'Enter the ANN Code you wish to use',
          color: 'primary',
          input: {
            placeholder: 'ANN Code',
            value: this.newCode,
            maxLength: 6,
            type: 'text'
          },
          confirm: value => {
            this.newCode = value
            this.$store.dispatch('codeExists', this.newCode)
              .then(exists => {
                if(exists)
                  this.$vs.notify({
                    title: 'Success',
                    text: `Using code ${this.newCode}`,
                    color: 'success',
                    time: 5000
                  })
                else
                  this.$vs.notify({
                    title: 'Error',
                    text: `Code ${this.newCode} was not found on the server`,
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

      start () {
        if(!this.state.started) {
          this.state.started = true
          this.state.text = 'Pause',
          this.state.type = 'vs-button-warning-gradient',
          this.state.icon = 'pause'
        } else {
          this.state.started = false
          this.state.text = 'Continue',
          this.state.type = 'vs-button-success-gradient',
          this.state.icon = 'play_arrow'
        }
      },

      getMovements () {
        setTimeout(() => {
          if (this.state.started) {
            this.getNextMovement()
          }

          this.getMovements()
        }, this.delay)
      },

      getNextMovement () {
        this.$store.dispatch('getNextMovement', this.distance)
          .then(key => {
            this.keyHandler(key)
            this.lastMovement = key
            return true
          })
          .catch(e => {
            this.$vs.notify({
              title: 'Error',
              text: `Failed to communicate with the API: ${e.message}`,
              color: 'danger',
              time: 5000
            })
            return false
          })
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