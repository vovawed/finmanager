<template>
    <div id="transaction">
        <input-box title="New transaction">
            <transaction-form
                    :handler="addTransaction"
                    :transaction="newTransaction"
                    submitText="Add new transaction">
            </transaction-form>
        </input-box>
        <list-table>
            <template v-slot:tr>
                <th scope="col">Title</th>
                <th scope="col">Category</th>
                <th scope="col">Date</th>
                <th scope="col">Amount</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
            </template>
            <template v-slot:tbody>
                <tr v-for="transaction in $store.getters.getTransactions">
                    <td>{{transaction.title}}</td>
                    <td>
                        {{transaction.category_str}}
                    </td>
                    <td>{{transaction.date_str}}</td>
                    <td class="min-width">{{transaction.amount}}$</td>
                    <td @click="updateTransactionModalShow(transaction.pk, transaction.title,
                    transaction.category, transaction.date, transaction.amount)">
                        <font-awesome-icon icon="pen"></font-awesome-icon>
                    </td>
                    <td @click="$store.dispatch('deleteTransaction', transaction.pk)">
                        <font-awesome-icon icon="trash" class="text-danger"></font-awesome-icon>
                    </td>
                </tr>
            </template>
        </list-table>
        <b-modal size="lg" v-model="updateModalShow" hide-footer title="Edit">
            <transaction-form :handler="updateTransaction" :transaction="updatingTransaction"
                              submit-text="Update transaction"></transaction-form>
        </b-modal>
        <paginate
                :page-count="$store.getters.getTransactionsCount/10"
                :click-handler="updatePage"
                :prev-text="'Prev'"
                :next-text="'Next'"
                :container-class="'pagination justify-content-center'"
                :page-link-class="'page-link'"
                :page-class="'page-item'"
                :prev-class="'page-item'"
                :prev-link-class="'page-link'"
                :next-class="'page-item'"
                :next-link-class="'page-link'">
        </paginate>
    </div>
</template>

<script>
    import InputBox from '@/components/InputBox.vue'
    import ListTable from '@/components/ListTable.vue'
    import TransactionForm from '@/components/transactions/TransactionForm.vue'

    export default {
        name: "Transactions",
        components: {InputBox, ListTable, TransactionForm},
        data() {
            return {
                newTransaction: {
                    title: '',
                    category: null,
                    amount: null,
                    date: ''
                },
                updatingTransaction: {
                    pk: 0,
                    title: '',
                    category: null,
                    amount: null,
                    date: ''
                },
                transactions: [],
                updateModalShow: false,
            }
        },
        methods: {
            addTransaction() {
                this.$store.dispatch('addTransaction',
                    {
                        title: this.newTransaction.title, category: this.newTransaction.category,
                        date: this.newTransaction.date, amount: this.newTransaction.amount
                    })
                this.newTransaction = {
                    title: '',
                    category: null,
                    amount: null,
                    date: ''
                }
            },
            updatePage(page = 1) {
                this.$store.dispatch('updateTransactions', page)
            },
            updateTransactionModalShow(pk, title, category, date, amount) {
                this.updatingTransaction = {
                    pk: pk,
                    title: title,
                    category: category,
                    date: date,
                    amount: amount,
                }
                this.updateModalShow = true
            },
            updateTransaction() {
                this.$store.dispatch('updateTransaction', this.updatingTransaction)
                this.updateModalShow = false
            }
        },
        created() {
            this.$store.dispatch('updateCategories')
            this.$Progress.set(50)
            this.$store.dispatch('updateTransactions')
            this.$Progress.finish()
        }
    }
</script>

<style scoped lang="less">

</style>