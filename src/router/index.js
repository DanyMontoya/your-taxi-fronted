import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Ingresar.vue'
import Usuario from '@/views/Usuario.vue'
import { TrackOpTypes } from 'vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/layouts/MainLayout.vue'),
      children: [
        { path: '', name: 'index', component: () => import('@/views/Index.vue') },
        {
          path: 'registrarse',
          name: 'registrarse',
          component: () => import('@/views/Registrarse.vue'),
        },
        { path: 'tutorial', name: 'tutorial', component: () => import('@/views/Tutorial.vue') },
        { path: 'ingresar', name: 'ingresar', component: Login },
        { path: 'usuario', name: 'usuario', component: Usuario },
        {
          path: 'sobre_nosotros',
          name: 'sobre_nosotros',
          component: () => import('@/views/Sobre_nosotros.vue'),
        },
        { path: 'reservar', name: 'reservar', component: () => import('@/views/Reservar.vue') },
        {
          path: 'solicitar_servicio',
          name: 'solicitar_servicio',
          component: () => import('@/views/Solicitar_servicio.vue'),
        },
        {
          path: 'administrador',
          name: 'administrador',
          component: () => import('@/views/Administrador.vue'),
        },
        { path: 'servicios', name: 'servicios', component: () => import('@/views/Servicios.vue') },
        {
          path: 'perfil_usuario',
          name: 'perfil_usuario',
          component: () => import('@/views/Perfil_usuario.vue'),
        },
        {
          path: 'sobre_mi_cuenta',
          name: 'sobre_mi_cuenta',
          component: () => import('@/views/Sobre_mi_cuenta.vue'),
          props: true,
        },
        {
          path: 'perfil_usuario',
          name: 'perfil_usuario',
          component: () => import('@/views/Perfil_usuario.vue'),
          props: true,
        },
      ],
    },
  ],
})

export default router
