<template>
  <div class="p-6 bg-gray-50 min-h-screen text-base text-gray-800">
    <Toast ref="toast"/>
    <div class="max-w-7xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200">
      
      <div class="px-6 py-4 border-b border-green-500 flex items-center justify-between bg-gray-50">
        <h1 class="text-xl font-semibold text-gray-800">Wallet Transactions</h1>
        
        <button
          @click="showAdd = true"
          class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md transition duration-150 flex items-center"
        >
          + Add Transaction
        </button>
      </div>

      <div class="p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <input
          v-model="searchQuery"
          @input="fetchTransactions(1)"
          type="text"
          placeholder="Search by user email or type..."
          class="border border-gray-300 rounded-lg px-4 py-2 text-sm w-full sm:w-80 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm transition duration-150"
        />
        <div class="flex items-center gap-2 text-sm">
          <label class="text-gray-600">Show</label>
          <select v-model="pageSize" @change="fetchTransactions(1)" class="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-green-500 focus:border-green-500">
            <option v-for="size in [1,5,10,20,50,100]" :key="size" :value="size">{{ size }}</option>
          </select>
          <span class="text-gray-600">entries</span>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 hidden sm:table text-sm">
          <thead class="bg-gray-100">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">#</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">User</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Amount</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Type</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Reference ID</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Created</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="(t,index) in transactions" :key="t.id" class="hover:bg-gray-50 transition duration-150">
              <td class="px-6 py-3 whitespace-nowrap">{{ (currentPage-1)*pageSize + index + 1 }}</td>
              <td class="px-6 py-3 whitespace-nowrap font-medium text-gray-900">{{ t.user.email }}</td>
              <td 
                class="px-6 py-3 whitespace-nowrap font-semibold"
                :class="{ 'text-green-600': t.amount > 0, 'text-red-600': t.amount < 0 }"
              >
                {{ t.amount }}
              </td>
              <td class="px-6 py-3 whitespace-nowrap">
                <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {{ t.type }}
                </span>
              </td>
              <td class="px-6 py-3 whitespace-nowrap text-gray-500">{{ t.reference?.id || '-' }}</td>
              <td class="px-6 py-3 whitespace-nowrap text-gray-500 text-xs">{{ new Date(t.created_at).toLocaleString() }}</td>
              <td class="px-6 py-3 whitespace-nowrap flex gap-3">
                <button @click="openEditModal(t)" class="text-green-500 hover:text-green-700 transition duration-150" title="Edit">
                  <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button @click="deleteTransaction(t.id)" class="text-red-500 hover:text-red-700 transition duration-150" title="Delete">
                  <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </td>
            </tr>
            <tr v-if="transactions.length===0">
              <td colspan="7" class="text-center py-8 text-gray-400 italic">No transactions found.</td>
            </tr>
          </tbody>
        </table>

        <div class="divide-y divide-gray-200 sm:hidden px-4 py-4">
          <div v-for="(t, index) in transactions" :key="t.id" class="py-3">
            <div class="flex justify-between items-center mb-1">
              <div class="text-sm font-semibold text-gray-700">{{ (currentPage-1)*pageSize + index + 1 }}. {{ t.user.email }}</div>
              <span 
                class="font-bold text-sm"
                :class="{ 'text-green-600': t.amount > 0, 'text-red-600': t.amount < 0 }"
              >
                {{ t.amount }}
              </span>
            </div>
            <div class="grid grid-cols-2 gap-y-1 text-xs">
                <div><span class="font-medium text-gray-600">Type:</span> 
                    <span class="inline-flex items-center px-2 py-0.5 rounded-full bg-green-100 text-green-800">{{ t.type }}</span>
                </div>
                <div><span class="font-medium text-gray-600">Created:</span> {{ new Date(t.created_at).toLocaleString() }}</div>
                <div class="col-span-2"><span class="font-medium text-gray-600">Ref ID:</span> {{ t.reference?.id || '-' }}</div>
            </div>
            <div class="flex gap-4 mt-2 border-t border-gray-100 pt-2">
              <button @click="openEditModal(t)" class="text-green-500 hover:text-green-700 text-xs flex items-center gap-1">
                <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg> Edit
              </button>
              <button @click="deleteTransaction(t.id)" class="text-red-500 hover:text-red-700 text-xs flex items-center gap-1">
                <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg> Delete
              </button>
            </div>
          </div>
          <div v-if="transactions.length===0" class="text-center py-6 text-gray-400 italic">No transactions found.</div>
        </div>
      </div>

      <div class="px-6 py-4 flex items-center justify-between mt-0 border-t border-gray-200 bg-gray-50 text-xs sm:text-sm">
        <span class="text-gray-600">Page {{ currentPage }} of {{ totalPages }} ({{ totalCount }} total)</span>
        <div class="flex items-center gap-2">
          <button 
            @click="fetchTransactions(previousPage ? currentPage-1 : currentPage)" 
            :disabled="!previousPage" 
            class="px-3 py-1 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-200 disabled:opacity-50 transition duration-150"
          >
            ◀ Prev
          </button>
          <button 
            @click="fetchTransactions(nextPage ? currentPage+1 : currentPage)" 
            :disabled="!nextPage" 
            class="px-3 py-1 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-200 disabled:opacity-50 transition duration-150"
          >
            Next ▶
          </button>
        </div>
      </div>
    </div>

    <WalletTransactionAdd v-if="showAdd" @close="showAdd=false; fetchTransactions()" />
    <WalletTransactionEdit v-if="showEdit" :transaction="selectedTransaction" @close="showEdit=false; fetchTransactions()" />
  </div>
</template>

<script>
import WalletTransactionAdd from './WalletTransactionAdd.vue';
import WalletTransactionEdit from './WalletTransactionEdit.vue';

export default {
  components: { WalletTransactionAdd, WalletTransactionEdit },
  data() {
    return {
      transactions: [],
      searchQuery: "",
      pageSize: 10,
      totalPages: 1,
      currentPage: 1,
      nextPage: null,
      previousPage: null,
      totalCount: 0,
      showAdd: false,
      showEdit: false,
      selectedTransaction: null
    };
  },
  methods: {
    async fetchTransactions(page = 1) {
      try {
        const params = { page, page_size: this.pageSize, search: this.searchQuery || undefined };
        const res = await this.$apiGet("/get_wallet_transactions", params);
        const data = res.data || {};
        this.transactions = data || [];
        this.totalCount = data.count || 0;
        this.totalPages = data.total_pages || 1;
        this.currentPage = data.current_page || 1;
        this.nextPage = !!data.next;
        this.previousPage = !!data.previous;
      } catch (err) {
        console.error(err);
        this.transactions = [];
      }
    },
    openEditModal(t) {
      this.selectedTransaction = t;
      this.showEdit = true;
    },
    async deleteTransaction(id) {
      if(!confirm("Are you sure you want to delete this transaction?")) return;
      try {
        await this.$apiDelete(`/delete_wallet_transaction/${id}/`);
        this.fetchTransactions(this.currentPage);
      } catch(err) { console.error(err); }
    }
  },
  mounted() { this.fetchTransactions(); }
};
</script>

<style scoped>
table th, table td { white-space: nowrap; }
</style>