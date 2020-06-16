let Vue 
class Store{
    constructor(options){
        this.state = new Vue({   // 强依赖   state 的变化 触发视图的变化
            data:options.state
        })
        this.mutations = options.mutations
        this.actions  = options.actions

        options.getters && this.handleGetters(options.getters)
    }
    commit=(type,arg)=>{
        console.log(this)
        this.mutations[type](this.state,arg)
    }
    dispatch(type,arg){
        this.actions[type]({
            commit:this.commit,
            state:this.state
        },arg)
    }
    handleGetters(getters){
        this.getters = {};
         // 遍历getters所有key
        Object.keys(getters).forEach(key=>{
            // 为this.getters定义若干属性，这些属性是只读的
            // $store.getters.score
            Object.defineProperty(this.getters,key,{  //每次获取this.getters 的所有属性时 都会触发get
                get:()=>{
                    return getters[key](this.state)
                }
            })
        })
    }
}


function install(_Vue){
    Vue = _Vue
    Vue.mixin({
        beforeCreate() {
            if(this.$options.store){
                Vue.prototype.$store = this.$options.store
            }
        },
    })
}
export default {Store,install}