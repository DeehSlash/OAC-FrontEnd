import Vue from 'vue'
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css' //vuesax styles

// ! Setting theme with SSR causes a document is not defined bug. Adding the condition below temporarily corrects it, but it's not the correct way to solve it. Check this issue for more details: https://github.com/lusaxweb/vuesax/issues/83
Vue.use(Vuesax)