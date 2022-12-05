import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/product/:productId',
      name: 'productDetail',
      component: () => import('../components/Product.vue'),
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('../views/CartView.vue'),
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('../views/MainView.vue')
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import('../views/ProjectView.vue')
    },
    {
      path: '/projects/88',
      name: '88transam',
      component: () => import('../views/projects/88View.vue')
    },
    {
      path: '/projects/89',
      name: '89transam',
      component: () => import('../views/projects/89View.vue')
    },
    {
      path: '/projects/screw',
      name: 'screwcovers',
      component: () => import('../views/projects/ScrewView.vue')
    },
    {
      path: '/projects/welder',
      name: 'millerwelder',
      component: () => import('../views/projects/WelderView.vue')
    },
    {
      path: '/projects/vibrate',
      name: 'vibdamp',
      component: () => import('../views/projects/VibrateView.vue')
    },
    {
      path: '/projects/bobber',
      name: 'fishbob',
      component: () => import('../views/projects/BobberView.vue')
    },
    {
      path: '/projects/32',
      name: '32ford',
      component: () => import('../views/projects/32View.vue')
    },
    {
      path: '/projects/grout',
      name: 'groutswivel',
      component: () => import('../views/projects/GroutView.vue')
    },
    {
      path: '/projects/eevee',
      name: 'eevee',
      component: () => import('../views/projects/EeveeView.vue')
    },
    {
      path: '/design',
      name: 'design',
      component: () => import('../views/DesignView.vue')
    },
    {
      path: '/parts',
      name: 'parts',
      component: () => import('../views/PartsView.vue')
    },
    {
      path: '/partDetail',
      name: 'part_detail',
      component: () => import('../views/DetailView.vue'),
      props: true,
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: () => import('../views/CheckoutView.vue'),
    },
    {
      path: '/checkout/cancel',
      name: 'checkoutCancel',
      component: () => import ('../views/CheckoutCancel.vue')
    },
    {
      path: '/checkout/complete',
      name: 'checkoutComplete',
      component: () => import('../views/CheckoutComplete.vue')
    }
  ]
})

export default router
