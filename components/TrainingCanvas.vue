<template>
  <div>
    <div class="header">
      <vs-row>
        <vs-col vs-type="flex" vs-justify="flex-start" vs-w="6">
          <nuxt-link to="/">
            <vs-button vs-type="dark-gradient" vs-icon="arrow_back">Back</vs-button>
          </nuxt-link>
          <vs-button vs-type="danger-gradient" vs-icon="clear" @click="resetTrainingData">Reset Training Data</vs-button>
          <vs-button vs-type="danger-gradient" vs-icon="clear" @click="resetCarPosition">Reset Car Position</vs-button>
        </vs-col>
        <vs-col vs-type="flex" vs-align="center" vs-justify="flex-end" vs-w="6">
          <vs-chip vs-icon="info" vs-color="primary" class="chip">Training Data Entries<br>{{ trainingData.length }}</vs-chip>
          <vs-button vs-type="success-gradient" vs-icon="done">Finish</vs-button>
        </vs-col>
      </vs-row>
    </div>

    <v-stage :config="canvas" ref="stage">
      <v-layer ref="layer">
        <v-rect :config="background"/>
        <v-rect v-for="(obstacle, i) in obstacles" :key="i" :config="obstacle" :ref="'obstacle' + i"/>
        <v-image :config="_car"/>
        <!-- <v-line v-for="(line, i) in lines" :key="i" :config="line"/> -->
      </v-layer>
    </v-stage>
  </div>
</template>

<style lang="scss" scoped>
  .header {
    margin-bottom: 5px;
  }

  .chip {
    margin-right: 15px;
  }
</style>

<script>
  export default {
    mounted () {
      // Initialize car image
      this.car.image = new Image()
      this.car.image.src = '/car.png'

      // Add Key Down listener
      window.addEventListener('keydown', (e) => {
        if (['w', 'a', 's', 'd'].includes(e.key))
          this.keyHandler(e.key)
      })

      // Calculate the first distance 
      this.distance = this.calculateDistance()
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
          x: 40,
          y: 30,
          width: 50,
          height: 27,
          offsetX: 50 / 2,
          offsetY: 27 / 2,
          speed: 2,
          image: '',
          rotation: 0
        },

        distance: -1,

        trainingData: []
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
            points: [
              this.car.x + (this.car.width / 2) * Math.cos(Math.PI / 180 * this.car.rotation),
              this.car.y + (this.car.width / 2) * Math.sin(Math.PI / 180 * this.car.rotation),
              this.car.x + ((this.car.width / 2) + 50) * Math.cos(Math.PI / 180 * this.car.rotation),
              this.car.y + ((this.car.width / 2) + 50) * Math.sin(Math.PI / 180 * this.car.rotation)
            ],
            stroke: 'green'
          }
        ]
      }
    },

    methods: {
      resetTrainingData () {
        this.$vs.alert({
          title: 'Reset Training Data',
          text: 'Are you sure you want to reset training data?',
          textConfirm: 'Reset',
          color: 'danger',
          confirm: () => {
            this.trainingData = []
            this.$vs.notify({
              title: 'Success',
              text: 'Training data has been successfully reset',
              color: 'success'
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
            this.car.x = 40
            this.car.y = 30
            this.car.rotation = 0
            this.$vs.notify({
              title: 'Success',
              text: 'Car position has been successfully reset',
              color: 'success'
            })
          }
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

        // If the distance is greater than 0 (obstacle ahead), save it as a training data
        if (this.distance >= 0)
            this.trainingData.push({
              input: [this.distance],
              output: [key]
            })

        // Recalculate the distance
        this.distance = this.calculateDistance()
      },

      calculateDistance () {
        let line = this.lines[0].points
        let x, y
        let cos = Math.cos(Math.PI / 180 * this.car.rotation)
        let sin = Math.sin(Math.PI / 180 * this.car.rotation)

        for(let i = 0; i < this.obstacles.length; i++) {
          let obstacle = this.$refs[`obstacle${i}`][0].getStage()

          for (let j = 0; j < 50; j++) {
            x = this.car.x + ((this.car.width / 2) + j) * cos
            y = this.car.y + ((this.car.width / 2) + j) * sin

            if (obstacle.intersects({ x, y })) {
              console.log('INTERSECTS')
              return j
            }
          }
        }
        
        return -1
      }
    }
  }
</script>