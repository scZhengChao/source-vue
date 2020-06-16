import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)
import App from './App.vue'

import create from "@/utils/create";
Vue.prototype.$create = create

import addComponent from '@/components'
Vue.use(addComponent)

Vue.config.productionTip = false
// Vue.prototype.$dispatch = function(eventName,data){
//     let parent = this.$parent;
//     while(parent){
//         if(parent){
//             parent.$emit(eventName,data)
//             parent = parent.$parent
//         }else{
//             break;
//         }
//     }
// }

// class Bus{
//     constructor(){
//         this.callbacks = {}
//     }
//     $on(name,fn){
//         this.callbacks[name] = this.callbacks[name] || []
//         this.callbacks[name].push(fn)
//     }
//     $emit(name,args){
//         this.callbacks[name] && this.callbacks[name].forEach(cb=>cb(args))
//     }
// }

// Vue.prototype.$bus = new Bus()

import router from './router'
// import router from './krouter'

import store from './store'
// import store from './kstore'

import axios from 'axios';
Vue.prototype.$http = axios


new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')

