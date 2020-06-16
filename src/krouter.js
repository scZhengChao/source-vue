import Home from "./views/Home";
import About from "./views/About";
import Vue from "vue";   // 这个vue 就是 main.js 里的vue  
Vue.zc = 'zhengchao'
class VueRouter{
    constructor(options){
        this.$options = options;
        this.routeMap = {}

        // 路由响应式 其实很重要的一部分是借助了 vue 的响应式原理 ; 强绑定 ； 必须用在vue上
        this.app = new Vue({
            data:{
                current:"/"
            }
        })
    }
    init(){
        this.bindEvents() ; //监听url变化
        this.createRouteMap(this.$options) ; //解析路由配置
        this.initComponent() ; //实现两个组件 router-view  router-link
    }
    bindEvents(){
        window.addEventListener('load',this.onHashChange.bind(this))
        window.addEventListener('hashchange',this.onHashChange.bind(this))
    }
    onHashChange(){
        this.app.current = window.location.hash.slice(1) || '/';  // #/about  ==> /about
    }
    createRouteMap(options){
        options.routes.forEach(item=>{
            this.routeMap[item.path] = item.component
        })
    }
    initComponent(){
        // router-view router-link
        Vue.component('router-link',{  
            props:{to:String},
            render(h) {
                // h => createElement  h(tag,data,children)
                return h('a',{attrs:{href:'#'+this.to}},[
                    this.$slots.default
                ])
            },
        });
        Vue.component('router-view',{     //这里没有解决路由嵌套的问题   // 全局的组件 任意data 的都会出发全局组件的跟新
            render:h=>{
                console.log(this.routeMap[this.app.current])
                const comp = this.routeMap[this.app.current]
                return h(comp)
            },
        })
    }

}

VueRouter.install=function(Vue){
    //mixin 混入
    Vue.mixin({
        beforeCreate() {
            // this 是vue 实咧
            if(this.$options.router){  // 只在跟组件执行一次
                Vue.prototype.$router = this.$options.router;
                this.$options.router.init()
            }
        },
    }) 

}
Vue.use(VueRouter)
export default new VueRouter({
    routes: [{ path: "/", component: Home }, { path: "/about", component: About }]
})