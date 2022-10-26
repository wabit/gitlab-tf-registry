import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import axios from 'axios'
import VueCodeHighlight from 'vue-code-highlight';


Vue.config.productionTip = false
Vue.prototype.$http = axios
import VueSessionStorage from "vue-sessionstorage"
Vue.use(VueSessionStorage, VueCodeHighlight)


new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')