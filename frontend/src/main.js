import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'


// Keep token in axios headers
const token = localStorage.getItem('user-token')
if(token){
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}
axios.defaults.baseURL = process.env.VUE_APP_API

axios.interceptors.request.use((config) => {
  store.commit('setLoading',true)
  return config
},(error) => {
  store.commit('setLoading',false)
  return Promise.reject(error)
})

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  setTimeout(() => {
    store.commit('setLoading',false)
  },500)
  return response;
}, function (error) {
  store.commit('setLoading',false)
  return Promise.reject(error);
});

// Ionicons handle error
Vue.config.ignoredElements = [/^ion-/]

Vue.config.productionTip = false

Vue.prototype.$api = process.env.VUE_APP_API 

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
