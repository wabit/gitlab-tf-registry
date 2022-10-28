import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import axios from 'axios'
import VueCodeHighlight from 'vue-code-highlight';
import VueSessionStorage from "vue-sessionstorage"


Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.use(VueSessionStorage, VueCodeHighlight)


new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')