import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import MapDespesas from './components/MapDespesas.vue'
import Despesa from './views/Despesa.vue'
import Pessoa from './views/Pessoa.vue'

Vue.use(Router)

let currentYear = new Date().getFullYear();

let router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: `/${currentYear}/1`
    },
    {
      path: '/despesa/:year/:code',
      name: 'despesa',
      components: {
        default: Despesa,
        map: MapDespesas
      }
    },
    {
      path: '/pessoa/:viewingUser',
      name: 'pessoa',
      component: Pessoa
    },
    {
      path: "/sobre",
      name: "Sobre",
      component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue'),
    },
    {
      path: "/glossario",
      name: "Aprenda + sobre Orçamento Público",
      component: () => import(/* webpackChunkName: "about" */ '@/views/Glossario.vue'),
    },
    {
      path: "/termos-de-uso",
      name: "Termos de Uso",
      component: () => import(/* webpackChunkName: "about" */ '@/views/TermsOfUse.vue'),
    },
    {
      path: '/analises',
      name: 'analises',
      component: () => import(/* webpackChunkName: "analises" */ '@/views/Analises.vue')
    },
    {
      path: '/:year/:page?',
      name: 'home',
      components: {
        default: Home,
        map: MapDespesas
      }
    }
  ]
})

// Used to redirect legacy routes (domain/?/path/to/route -> domain/path/to/route)
router.beforeEach((to, from, next) => {
  let decoded = decodeURIComponent(to.fullPath)
  if (decoded.startsWith('/?/')) {
    next({ path: decoded.slice(2).split('?')[0] })
  } else {
    next()
  }
})

export default router
