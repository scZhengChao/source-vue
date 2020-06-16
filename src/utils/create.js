import Vue from 'vue'
export default function create(Component, props) {

    //Component 是组件配置  Notice js对象
    //comp 是组件实例
    //Vue.extend(Component) ==> function 构造函数   需要new一下
    //Vue.component('comp',Component)  注册全局组件  



    //方案一： render

    const vm = new Vue({
        render(h){
            // h 就是createElement  返回vnode
            return h(Component,{props})
        }
    }).$mount()   // $mount必须执行 才能得出$el 这是vue 根据虚拟dom得出的真实dom ， 可以不挂载 dom  因为这里想挂载body 但是vue 不允许挂载body

    //手动挂载
    document.body.appendChild(vm.$el)

    //销毁方法
    const comp = vm.$children[0]  //这里用的render 只有一个 子组价 相对于根组件
    comp.remove = function(){
        document.body.removeChild(vm.$el)
        vm.$destroy()
    }
    return comp



    //方案二：  extend 构造函数
    // const comp = Vue.extend(Component)  // 返回一个构造函数
    // const vm = new comp()   // 实例化构造函数
    // vm.title = props.title  
    // vm.message = props.message
    // vm.duration = props.duration
    // document.body.appendChild(vm.$mount().$el)
    // vm.remove = function () {
    //     document.body.removeChild(vm.$el)
    //     vm.$destroy()
    // }
    // return vm
}

