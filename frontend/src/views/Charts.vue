<template>
    <div>
        <input-box title="Generate chart">
            <form @submit.prevent="generateChart">
                <div class="form-group">
                    <b-form-select v-model="newChartData.chartType" :options="chartTypes"></b-form-select>
                    <small class="form-text text-muted">Select chart type</small>
                </div>
                <b-form-checkbox v-model="newChartData.allCategories" name="checkbox-1" class="mb-3">
                    Select all categories
                </b-form-checkbox>
                <div class="form-group">
                    <b-form-select :disabled="newChartData.allCategories" multiple placeholder="Categories"
                                   v-model="newChartData.categories"
                                   :options="$store.getters.getCategoriesOptions"></b-form-select>
                    <small class="form-text text-muted">
                        Hold down the Ctrl (windows) / Command (Mac) button to select multiple categories
                    </small>
                </div>
                <div class="form-group">
                    <b-form-select v-model="newChartData.transactionType" :options="transactionTypes"></b-form-select>
                    <small class="form-text text-muted">Select payment type</small>
                </div>
                <div class="row">
                    <div class="col-lg-6">
                        <datetime placeholder="From date" v-model="newChartData.dateFrom" type="date" class="mb-3"
                                  input-class="form-control mb-3"></datetime>
                    </div>
                    <div class="col-lg-6">
                        <datetime placeholder="To date" v-model="newChartData.dateTo" type="date" class="mb-3"
                                  input-class="form-control mb-3"></datetime>
                    </div>
                </div>
                <button-component>Generate</button-component>
            </form>
        </input-box>
        <input-box title="Chart">
            <highcharts :options="chartOptions"></highcharts>
        </input-box>
    </div>
</template>

<script>
    import InputBox from '@/components/InputBox.vue'
    import ButtonComponent from '@/components/ButtonComponent.vue'
    import {Chart} from 'highcharts-vue'

    export default {
        name: "Charts",
        components: {InputBox, ButtonComponent, highcharts: Chart},
        data() {
            return {
                datacollection: null,
                newChartData: {
                    transactionType: 'e',
                    chartType: 'pie',
                    allCategories: false,  // for instant select all categories
                    categories: [],
                    dateFrom: null,
                    dateTo: null,
                },
                chartTypes: [
                    {value: 'pie', text: 'Pie'},
                    {value: 'line', text: 'Line Chart'},
                ],
                transactionTypes: [
                    {value: 'e', text: 'Expense'},
                    {value: 'i', text: 'Income'},
                ],
                chartOptions: {
                    chart: {
                        type: 'line',
                        backgroundColor: '#fbfbfb'
                    },
                    title: {
                        text: 'Chart'
                    },
                    series: [{
                        data: [
                            [new Date("2014-07-09T12:30:41Z").getTime(), 1],
                            [new Date("2015-07-09T12:30:41Z").getTime(), 3],
                        ]
                    }],
                    xAxis: {
                        type: 'datetime'
                    },
                }
            }
        },
        methods: {
            generateChart() {
                this.$store.dispatch('getChart', {
                    transactionType: this.newChartData.transactionType,
                    dateFrom: this.newChartData.dateFrom,
                    dateTo: this.newChartData.dateTo,
                    categories: this.newChartData.categories,
                    allCategories: this.newChartData.allCategories,
                }).then(data => {
                    if (this.newChartData.chartType == 'line') {
                        let result = []

                        data.forEach((d) => {
                            result.push([new Date(d.date).getTime(), d.amount])
                        })

                        console.log(result)

                        this.chartOptions.series = [{data: result}]
                    }
                })
            }
        },
        created() {
            this.$store.dispatch('updateCategories')
            this.$Progress.finish()
        }
    }
</script>

<style scoped>

</style>