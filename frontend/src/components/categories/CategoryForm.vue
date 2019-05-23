<template>
    <form @submit.prevent="handler">
        <div class="row">
            <div class="col-lg-9">
                <b-form-input id="title" v-model="category.title" placeholder="Title"></b-form-input>
            </div>
            <div class="col-lg-3 mb-3">
                <b-form-select v-model="category.type" :options="categoryTypes"></b-form-select>
            </div>
        </div>
        <button-component>{{submitText}}</button-component>
    </form>
</template>

<script>
    import ButtonComponent from '@/components/ButtonComponent.vue'

    export default {
        name: "CategoryInput",
        props: ['handler', 'category', 'submitText'],
        components: {ButtonComponent},
        data() {
            return {
                categoryTypes: [
                    {value: 'e', text: 'Expense'},
                    {value: 'i', text: 'Income'},
                ],
            }
        }
    }
</script>

<style scoped>

</style>