import Vue from 'vue'
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate);
import App from './App.vue'

import './assets/style.scss'

Vue.config.productionTip = false;

import {store} from './store/store.js'
import {router} from './routes.js'

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app');
