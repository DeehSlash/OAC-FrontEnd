<template>
  <v-stage :config="canvas" ref="stage">

    <v-layer>
      <v-rect :config="background"/>
    </v-layer>

    <v-layer>
      <v-rect v-for="(obstacle, i) in obstacles" :key="i" :config="obstacle"/>
    </v-layer>

    <v-layer>
      <v-image :config="car"/>
    </v-layer>

  </v-stage>
</template>

<script>
  export default {
    mounted () {
      this.carImage = new Image()
      this.carImage.src = '/car.png'
    },

    data() {
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

        carImage: ''
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

      car () {
        return {
          x: 15,
          y: 15,
          width: 50,
          height: 27,
          // angle: 0,
          // speed: 2,
          // mod: 0,
          image: this.carImage
        }
      }
    }
  }
</script>