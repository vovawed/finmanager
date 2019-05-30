<template>
    <div id="categories">
        <input-box title="New category">
            <category-form :handler="addCategory" :category="newCategory"
                           submit-text="Add new category"></category-form>
        </input-box>
        <list-table>
            <template v-slot:tr>
                <th scope="col">Type</th>
                <th scope="col">Title</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
            </template>
            <template v-slot:tbody>
                <tr v-for="category in $store.getters.getCategories">
                    <td class="min-width">
                        <span v-if="category.transaction_type === 'e'">
                            <font-awesome-icon icon="caret-down" class="mr-1"></font-awesome-icon> Expense
                        </span>
                        <span v-else-if="category.transaction_type === 'i'">
                            <font-awesome-icon icon="caret-up" class="mr-1"></font-awesome-icon> Income
                        </span>
                    </td>
                    <td>{{category.title}}</td>
                    <td @click="updateCategoryModalShow(category.pk, category.title, category.transaction_type)">
                        <font-awesome-icon icon="pen"></font-awesome-icon>
                    </td>
                    <td @click="$store.dispatch('deleteCategory', category.pk)">
                        <font-awesome-icon icon="trash" class="text-danger"></font-awesome-icon>
                    </td>
                </tr>
            </template>
        </list-table>
        <b-modal size="lg" v-model="updateModalShow" hide-footer title="Edit">
            <category-form :handler="updateCategory" :category="updatingCategory"
                           submit-text="Update category"></category-form>
        </b-modal>
    </div>
</template>

<script>
    import InputBox from '@/components/InputBox.vue'
    import ListTable from '@/components/ListTable.vue'
    import CategoryForm from '@/components/categories/CategoryForm.vue'

    export default {
        name: "Categories",
        components: {InputBox, ListTable, CategoryForm},
        data() {
            return {
                newCategory: {
                    title: '',
                    type: 'e'
                },
                updatingCategory: {
                    pk: 0,
                    title: '',
                    type: ''
                },
                categories: [],
                updateModalShow: false,
            }
        },
        methods: {
            addCategory() {
                this.$store.dispatch('addCategory',
                    {title: this.newCategory.title, transaction_type: this.newCategory.type})
                this.newCategory = {
                    title: '',
                    type: 'e'
                }
            },
            updateCategoryModalShow(pk, title, type) {
                this.updatingCategory = {
                    pk: pk,
                    title: title,
                    type: type
                }
                this.updateModalShow = true
            },
            updateCategory() {
                this.$store.dispatch('updateCategory', this.updatingCategory)
                this.updateModalShow = false
            },
            beforeUpdate() {
                this.$Progress.start()
            },
            updated() {
                this.$Progress.finish()
            }
        },
        created() {
            this.$store.dispatch('updateCategories')
            this.$Progress.finish()
        },
        beforeUpdate() {
            this.$Progress.start()
        },
        updated() {
            this.$Progress.finish()
        }
    }
</script>

<style scoped lang="less">

</style>