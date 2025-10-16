<template>
  <div class="p-4 text-sm text-gray-800">
    <!-- Header -->
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-lg font-semibold">Wallet Transactions</h1>
      <button
        @click="showAdd = true"
        class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-xs"
      >
        + Add Transaction
      </button>
    </div>

    <!-- Search + Page Size -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
      <input
        v-model="searchQuery"
        @input="fetchTransactions(1)"
        type="text"
        placeholder="Search by user email or type..."
        class="border rounded-md px-2 py-1 text-xs w-full sm:w-64 focus:outline-none focus:ring-1 focus:ring-blue-400"
      />
      <div class="flex items-center gap-2 text-xs">
        <label>Show</label>
        <select v-model="pageSize" @change="fetchTransactions(1)" class="border rounded-md px-1 py-0.5 text-xs">
          <option v-for="size in [1,5,10,20,50,100]" :key="size" :value="size">{{ size }}</option>
        </select>
        <span>entries</span>
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto border rounded-lg shadow-sm">
      <table class="min-w-full text-xs hidden sm:table">
        <thead class="bg-gray-200 text-gray-700 uppercase text-[11px]">
          <tr>
            <th class="px-3 py-2 text-left">#</th>
            <th class="px-3 py-2 text-left">User</th>
            <th class="px-3 py-2 text-left">Amount</th>
            <th class="px-3 py-2 text-left">Type</th>
            <th class="px-3 py-2 text-left">Reference ID</th>
            <th class="px-3 py-2 text-left">Created</th>
            <th class="px-3 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white">
          <tr v-for="(t,index) in transactions" :key="t.id" class="border-t hover:bg-gray-50">
            <td class="px-3 py-2">{{ (currentPage-1)*pageSize + index + 1 }}</td>
            <td class="px-3 py-2">{{ t.user.email }}</td>
            <td class="px-3 py-2">{{ t.amount }}</td>
            <td class="px-3 py-2">{{ t.type }}</td>
            <td class="px-3 py-2">{{ t.reference?.id || '-' }}</td>
            <td class="px-3 py-2 text-gray-500">{{ new Date(t.created_at).toLocaleString() }}</td>
            <td class="px-3 py-2 flex gap-2">
              <button @click="openEditModal(t)" class="text-blue-500 hover:text-blue-700" title="Edit">✎</button>
              <button @click="deleteTransaction(t.id)" class="text-red-500 hover:text-red-700" title="Delete">🗑</button>
            </td>
          </tr>
          <tr v-if="transactions.length===0">
            <td colspan="7" class="text-center py-3 text-gray-400">No transactions found.</td>
          </tr>
        </tbody>
      </table>

      <!-- Mobile List -->
      <div class="sm:hidden">
        <div v-for="t in transactions" :key="t.id" class="border-b py-2 px-2 mb-2 bg-white rounded shadow-sm">
          <div><span class="font-semibold">User:</span> {{ t.user.email }}</div>
          <div><span class="font-semibold">Amount:</span> {{ t.amount }}</div>
          <div><span class="font-semibold">Type:</span> {{ t.type }}</div>
          <div><span class="font-semibold">Reference ID:</span> {{ t.reference?.id || '-' }}</div>
          <div class="text-gray-500"><span class="font-semibold">Created:</span> {{ new Date(t.created_at).toLocaleString() }}</div>
          <div class="flex gap-2 mt-1">
            <button @click="openEditModal(t)" class="text-blue-500 hover:text-blue-700 text-xs">✎ Edit</button>
            <button @click="deleteTransaction(t.id)" class="text-red-500 hover:text-red-700 text-xs">🗑 Delete</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div class="flex items-center justify-between mt-4 text-xs">
      <span>Page {{ currentPage }} of {{ totalPages }} ({{ totalCount }} total)</span>
      <div class="flex items-center gap-1">
        <button @click="fetchTransactions(previousPage ? currentPage-1 : currentPage)" :disabled="!previousPage" class="px-2 py-1 border rounded hover:bg-gray-100 disabled:opacity-50">◀ Prev</button>
        <button @click="fetchTransactions(nextPage ? currentPage+1 : currentPage)" :disabled="!nextPage" class="px-2 py-1 border rounded hover:bg-gray-100 disabled:opacity-50">Next ▶</button>
      </div>
    </div>

    <!-- Modals -->
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
