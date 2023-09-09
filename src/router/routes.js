const roles = {
  administrador: 'ADMINISTRADOR',
  usuario:'USUARIO'
}

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name:'Login', component: () => import('pages/Index.vue') },
      { path: '/Dashboard', name: 'Dashboard',  meta:{requiresAuth:[roles.administrador,roles.usuario]}, component: () => import('pages/Dashboard.vue') },
      { path: '/Home', name: 'Home',meta:{requiresAuth:[roles.usuario]}, component: () => import('pages/Home.vue') }
    ]
  },

  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
