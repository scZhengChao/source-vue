import Communicate from './communicate'
import SlotsTest from "./slots";
import Recursion from "./recursion";
import FormSample from "./form";
import Tree from "./tree";
import swiper from './swiper'

export default {
    install(Vue){
        Vue.component("Communicate",Communicate)
        Vue.component("SlotsTest",SlotsTest)
        Vue.component("Recursion",Recursion)
        Vue.component("FormSample",FormSample)
        Vue.component("Tree",Tree)
        Vue.component("swiper",swiper)
    }
}