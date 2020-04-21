import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource';

Vue.use(VueResource);
Vue.http.options.root="https://vuejs-example-ac492.firebaseio.com/";


/* Servislerin arasına girmek için interceptorlar kullanılır*/
/*Post metodunu gelince onu put a çevir ve devam et .  next() metodunu isteği devam ettiriyor*/

Vue.http.interceptors.push((request,next)=>{
  /*if(request.method == "POST"){
    request.method = "PUT"
  }
  next();*/
})

new Vue({
  el: '#app',
  render: h => h(App)
})
