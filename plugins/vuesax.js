import Vue from 'vue'
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css' //vuesax styles

// ! Setting theme with SSR causes a document is not defined bug. Adding the condition below temporarily corrects it, but it's not the correct way to solve it. Check this issue for more details: https://github.com/lusaxweb/vuesax/issues/83
if (process.browser) {
  Vue.use(Vuesax, {
    server: true,
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
}