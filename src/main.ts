import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "bootstrap/dist/css/bootstrap.min.css";
import lodash from 'lodash'
import VueLodash from 'vue-lodash'

Vue.use(VueLodash, { name: 'custom', lodash: lodash })

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
