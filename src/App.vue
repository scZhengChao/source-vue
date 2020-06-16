<template>
    <div id="app">
        <!-- <Communicate /> -->
        <!-- <SlotsTest/> -->
        <!-- <Recursion></Recursion> -->
        <!-- <FormSample></FormSample> -->
        <!-- <Tree></Tree> -->
        <!-- <swiper></swiper> -->
        <router-view></router-view>
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
   
    </div>
</template>

<script>

    export default {
        name: 'App',
        methods:{
          
        },
        mounted(){
            // 本地mock success
            this.$http({
                url:'/login',
                method:'POST',
                data:{name:'zc',password:'123456'}
            }).then(res=>{
                console.log(res.data)
            })
            console.log(process.env.NODE_ENV)
            console.log(process.env.VUE_APP_BASE_API)
            console.log(process.env.VUE_APP_VERSION)
            console.log(process.env.VUE_APP_abc)
            function handleHistoryState(type) {
                var historyState = window.history[type]
                return  function () {
                    var rv = historyState.apply(this, arguments)
                    // var e = new Event(type.toLowerCase())  // 自定义事件
                    // e.arguments = arguments  // 赋值
                    // window.dispatchEvent(e)  // 触发事件
                    window.onpopstate.apply(this,arguments)
                    return rv
                }
            }
            window.history.pushState = handleHistoryState('pushState')
            window.history.replaceState = handleHistoryState('replaceState')
            window.onpopstate = function(event) {
                        alert("location: " + document.location + ", state: " + JSON.stringify(event.state));
            }
                
         
        }
    }
</script>

<style>
    * {
        margin: 0;
        padding: 0;
    }

    body,
    html {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
        width: 100%;
        height: 100%;
    }
</style>