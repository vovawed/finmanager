import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from './router'

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'
axios.defaults.baseURL = 'http://127.0.0.1:8001/api/'

const authToken = localStorage.getItem('authToken')
if (authToken) {
    axios.defaults.headers['Authorization'] = "Token " + authToken
}

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        loggedIn: false,
        user: '',
        // Categories
        categories: [],
        // Transactions
        transactions: [],
        transactionsCount: 0,
    },
    getters: {
        getAuth(state) {
            return state.loggedIn
        },
        getUserInfo(state) {
            return state.user
        },
        // Categories
        getCategories(state) {
            return state.categories
        },
        getCategoriesOptions(state) {
            // TODO: замутити тут генератор
            let result = [{
                value: null, disabled: true, text: 'Category'
            }];
            let fullTypeTitle = function (type) {
                return (type === 'e') ? 'Expense' : 'Income'
            };
            state.categories.forEach((category) => {
                result.push({
                    'value': category.pk, 'text': category.title + ' - ' + fullTypeTitle(category.transaction_type)
                })
            })
            return result
        },
        // Transactions
        getTransactions(state) {
            let result = state.transactions

            result.forEach((transaction) => {
                let category = state.categories.find(obj => {
                    return obj.pk === transaction.category
                })

                transaction.category_str = category.title
            })
            return result
        },
        getTransactionsCount(state) {
            return state.transactionsCount
        }
    },
    mutations: {
        setLoggined(state) {
            state.loggedIn = true
        },
        setToken(state, token) {
            localStorage.setItem('authToken', token)
            state.loggedIn = true
            axios.defaults.headers['Authorization'] = "Token " + localStorage.getItem('authToken')
            router.push('/')
        },
        setLoggedOut(state) {
            state.loggedIn = false
        },
        setUserInfo(state, value) {
            state.user = value
        },
        // Categories
        setCategories(state, value) {
            state.categories = value
        },
        // Transactions
        setTransactions(state, value) {
            state.transactions = value
        },
        setTransactionsCount(state, value) {
            state.transactionsCount = value
        }
    },
    actions: {
        // Auth
        login(context, payload) {
            return axios.post('auth/token/login/', payload)
                .then(response => {
                    context.commit('setToken', response.data.auth_token)
                })
                .catch(e => {
                    console.log(e)
                })
        },
        logout(context) {
            return axios.post('auth/token/logout/')
                .then(response => {
                    context.commit('setLoggedOut')
                    delete axios.defaults.headers['Authorization']
                    localStorage.removeItem('authToken')
                    router.push('login')
                })
                .catch(e => {
                    console.log(e)
                })
        },
        // Categories
        updateCategories(context) {
            return axios.get('categories/')
                .then(response => {
                    context.commit('setCategories', response.data)
                })
                .catch(e => {
                    console.log(e)
                })
        },
        addCategory(context, payload) {
            return axios.post('categories/', payload)
                .then(response => {
                    context.dispatch('updateCategories')
                })
                .catch(e => {
                    console.log(e)
                })
        },
        updateCategory(context, payload) {
            return axios.put('categories/' + payload.pk + '/', {
                title: payload.title, transaction_type: payload.type
            })
                .then(response => {
                    context.dispatch('updateCategories')
                })
                .catch(e => {
                    console.log(e)
                })
        },
        deleteCategory(context, pk) {
            this._vm.$Progress.start()
            return axios.delete('categories/' + pk + '/')
                .then(response => {
                    context.dispatch('updateCategories')
                    this._vm.$Progress.finish()
                })
                .catch(e => {
                    console.log(e)
                })
        },
        // Transactions
        updateTransactions(context, page = 1) {
            return axios.get('transactions/?limit=10&offset=' + (page * 10 - 10))
                .then(response => {
                    context.commit('setTransactions', response.data.results)
                    context.commit('setTransactionsCount', response.data.count)
                })
                .catch(e => {
                    console.log(e)
                })
        },
        addTransaction(context, payload) {
            return axios.post('transactions/', payload)
                .then(response => {
                    context.dispatch('updateTransactions')
                })
                .catch(e => {
                    console.log(e)
                })
        },
        updateTransaction(context, payload) {
            return axios.put('transactions/' + payload.pk + '/', {
                title: payload.title, category: payload.category, date: payload.date, amount: payload.amount
            })
                .then(response => {
                    context.dispatch('updateTransactions')
                })
                .catch(e => {
                    console.log(e)
                })
        },
        deleteTransaction(context, pk) {
            this._vm.$Progress.start()
            return axios.delete('transactions/' + pk + '/')
                .then(response => {
                    context.dispatch('updateTransactions')
                    this._vm.$Progress.finish()
                })
                .catch(e => {
                    console.log(e)
                })
        },
        // Charts
        getLineChart(context, payload) {
            return axios.post('chart/line/', payload)
                .then(response => {
                    return response.data
                })
                .catch(e => {
                    console.log(e)
                })
        },
        getPieChart(context, payload) {
            return axios.post('chart/pie/', payload)
                .then(response => {
                    return response.data
                })
                .catch(e => {
                    console.log(e)
                })
        },
    }
})
