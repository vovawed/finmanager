import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Datetime from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.css'
Vue.use(Datetime)


import Paginate from 'vuejs-paginate'

Vue.component('paginate', Paginate)


import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)


import {library} from '@fortawesome/fontawesome-svg-core'
import {
    faBars,
    faExchangeAlt,
    faCaretUp,
    faCaretDown,
    faChartBar,
    faChartLine,
    faSignOutAlt,
    faSignInAlt,
    faTrash,
    faPen
} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

library.add(faBars, faExchangeAlt, faCaretUp, faCaretDown, faChartBar, faChartLine, faSignOutAlt, faTrash, faPen, faSignInAlt)

Vue.component('font-awesome-icon', FontAwesomeIcon)


Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: function (h) {
        return h(App)
    }
}).$mount('#app')
