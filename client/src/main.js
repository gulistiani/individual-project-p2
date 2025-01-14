import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueYoutube from 'vue-youtube'
Vue.use(VueYoutube)

import VueSweetalert2 from 'vue-sweetalert2';
Vue.use(VueSweetalert2);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
