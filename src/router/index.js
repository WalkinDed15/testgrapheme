import Vue from 'vue'
import VueRouter from 'vue-router'
import Info from '../views/Info.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Info',
        component: Info
    },
    {
        path: '/pay',
        name: 'pay',
        component: () => import('../views/Pay.vue')
    },
    {
        path: '/finish',
        name: 'finish',
        component: () => import('../views/Finish.vue')
    }
]

const router = new VueRouter({
    routes
})

export default router
