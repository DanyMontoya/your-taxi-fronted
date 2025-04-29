import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/layouts/MainLayout.vue'),
      children: [
        { path: '/', name: 'index', component: () => import('@/views/Index.vue') },
        {
          path: '/registrarse',
          name: 'registrarse',
          component: () => import('@/views/Registrarse.vue'),
        },
        { path: '/tutorial', name: 'tutorial', component: () => import('@/views/Tutorial.vue') },
        { path: '/ingresar', name: 'ingresar', component: () => import('@/views/Ingresar.vue') },
        {
          path: '/sobre_nosotros',
          name: 'sobre_nosotros',
          component: () => import('@/views/Sobre_nosotros.vue'),
        },
        { path: '/reservar', name: 'reservar', component: () => import('@/views/Reservar.vue') },
        {
          path: '/solicitar_servicio',
          name: 'solicitar_servicio',
          component: () => import('@/views/Solicitar_servicio.vue'),
        },
        {
          path: '/administrador',
          name: 'administrador',
          component: () => import('@/views/Administrador.vue'),
        },
      ],
    },
  ],
})

export default router
