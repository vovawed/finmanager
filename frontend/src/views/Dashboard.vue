<template>
    <div>
        <dashboard-card
                title="You have"
                :head-text="balance"
                text=".51$">
        </dashboard-card>
        <div class="row">
            <div class="col-4">
                <dashboard-card
                        title="Today"
                        head-text="-15"
                        text=".27$"
                        small-text="-3.2% compared to last week">
                </dashboard-card>
            </div>
            <div class="col-4">
                <dashboard-card
                        title="Last 7 days"
                        head-text="+115"
                        text=".00$"
                        small-text="-3.2% compared to last week">
                </dashboard-card>
            </div>
            <div class="col-4">
                <dashboard-card
                        title="This mount"
                        head-text="+482" text=".72$"
                        small-text="+5% compared to last month">
                </dashboard-card>
            </div>
        </div>
        <small class="text-muted">* Data loads dynamic, so please don't restart the page often</small>
    </div>
</template>

<script>
    import axios from 'axios'

    axios.defaults.xsrfCookieName = 'csrftoken'
    axios.defaults.xsrfHeaderName = 'X-CSRFToken'
    axios.defaults.headers['Authorization'] = "Token " + localStorage.getItem('authToken')

    import DashboardCard from '@/components/DashboardCard.vue'

    export default {
        name: "Dashboard",
        components: {DashboardCard},
        data() {
            return {
                balance: 0,
            }
        },
        methods: {
            updateDashboard(pk) {
                axios.get('http://127.0.0.1:8000/api/dashboard/')
                    .then(response => {
                        this.balance = response.data.balance
                    })
                    .catch(e => {
                        console.log(e)
                    })
            },
        },
        created() {
            this.updateDashboard()
            this.$Progress.finish()
        }
    }
</script>

<style scoped>

</style>