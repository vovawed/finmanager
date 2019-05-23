import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/login',
            name: 'login',
            component: function () {
                return import(/* webpackChunkName: "about" */ './views/Login.vue')
            }
        },
        {
            path: '/categories',
            name: 'categories',
            component: function () {
                return import(/* webpackChunkName: "about" */ './views/Categories.vue')
            }
        },
        {
            path: '/transactions',
            name: 'transactions',
            component: function () {
                return import(/* webpackChunkName: "about" */ './views/Transactions.vue')
            }
        },
        {
            path: '/',
            name: 'dashboard',
            component: function () {
                return import(/* webpackChunkName: "about" */ './views/Dashboard.vue')
            }
        },
        {
            path: '/',
            name: 'charts',
            component: function () {
                return import(/* webpackChunkName: "about" */ './views/Dashboard.vue')
            }
        },
    ]
})
