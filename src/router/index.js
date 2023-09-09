
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

Vue.use(VueRouter)

export default function () { // { store }
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  // Router.beforeEach((to, from, next) => {
  //   const { requiresAuth } = to.meta;
  //   if (requiresAuth && requiresAuth.some(role => !store.state.showcase.usserInSession.includes(role))) {
  //     next({ name: 'Login'})
  //   } else {
  //     next()
  //   }
  // })
  return Router
}
