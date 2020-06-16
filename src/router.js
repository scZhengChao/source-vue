import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import List from './views/List.vue'
import Detail from './views/Detail.vue'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    children: [
      { path: "/list", name: "list", component: List },
      { path: "detail/:id", component: Detail, props: true },  // ：id 以props 传入 
    ]
  },
  {
    path: '/about',
    name: 'about',
    meta: { auth: true },
  //   beforeEnter(to, from, next) {
  //     // 路由内部知道自己需要认证
  //     if (!window.isLogin) {
  //         // ...
  //     } else {
  //         next();
  //     }
  // },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
  }
]

const router = new Router({
    mode:'history',
    // base:"/zc/"  应用的基路径。例如，如果整个单页应用服务在 /app/ 下，然后 base 就应该设为 "/app/"。  http://localhost:8080/zc/#/about
});
router.addRoutes(routes);  //动态添加路由
// 守卫
router.beforeEach((to, from, next) => {
  // 要访问/about且未登录需要去登录
  if (to.meta.auth && !window.isLogin) {
    // next('/login') 
    if (window.confirm("请登录")) {
      window.isLogin = true;
      next();   // 登录成功，继续  
      
    } else {
      next('/');// 放弃登录，回首页
    }
  } else {
    next(); // 不需登录，继续   
  }
});

export default router
