import Vue from 'vue'
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css' //vuesax styles

Vue.use(Vuesax, {
  theme: {
    colors: {
      primary:'rgb(31, 116, 255)',
      success:'rgb(70, 201, 58)',
      danger:'rgb(255, 71, 87)',
      warning:'rgb(255, 186, 0)',
      dark:'rgb(30, 30, 30)'
    }
  }
})