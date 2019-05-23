<template>
    <form @submit.prevent="handler">
        <div class="row">
            <div class="col-lg-6 mb-3">
                <b-form-input id="title" v-model="transaction.title" placeholder="Title"></b-form-input>
            </div>
            <div class="col-lg-6 mb-3">
                <b-form-select placeholder="Category" v-model="transaction.category"
                               :options="$store.getters.getCategoriesOptions"></b-form-select>
            </div>
            <div class="col-lg-6">
                <datetime placeholder="Date" v-model="transaction.date" type="datetime"
                          input-class="form-control mb-3"></datetime>
            </div>
            <div class="col-lg-6 mb-3">
                <b-form-input type="number" min="0" id="amount" v-model.number="transaction.amount"
                              placeholder="Amount"></b-form-input>
            </div>
        </div>
        <button-component>{{submitText}}</button-component>
    </form>
</template>

<script>
    import ButtonComponent from '@/components/ButtonComponent.vue'

    export default {
        name: "CategoryInput",
        props: ['handler', 'transaction', 'submitText'],
        components: {ButtonComponent},
    }
</script>

<style scoped>

</style>