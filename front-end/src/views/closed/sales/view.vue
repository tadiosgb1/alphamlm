<template>
  <div class="p-4 text-sm text-gray-800">
    <!-- Header -->
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-xl font-bold text-gray-700">Sales Record</h1>
      <button
        @click="showAdd = true"
        class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-md transition duration-150 text-xs font-medium"
      >
        + Add Sale
      </button>
    </div>

    <!-- Search + Page Size -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
      <input
        v-model="searchQuery"
        @input="fetchSales(1)"
        type="text"
        placeholder="Search by seller/buyer..."
        class="border border-gray-300 rounded-lg px-3 py-1.5 text-xs w-full sm:w-72 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-150"
      />
      <div class="flex items-center gap-2 text-xs text-gray-600">
        <label>Show</label>
        <select v-model="pageSize" @change="fetchSales(1)" class="border border-gray-300 rounded-lg px-2 py-1 text-xs focus:ring-green-500 focus:border-green-500">
          <option v-for="size in [1,5,10,20,50,100]" :key="size" :value="size">{{ size }}</option>
        </select>
        <span>entries</span>
      </div>
    </div>

    <!-- Table / List -->
    <div class="overflow-x-auto border border-gray-200 rounded-xl ">
      <!-- Desktop Table -->
      <table class="min-w-full text-xs hidden sm:table">
        <thead class="bg-gray-100 text-gray-700 uppercase">
          <tr>
            <th class="px-4 py-3 text-left">#</th>
            <th class="px-4 py-3 text-left">Quantity</th>
            <th class="px-4 py-3 text-left">Price</th>
            <th class="px-4 py-3 text-left">Sub Total</th>
            <th class="px-4 py-3 text-left">Seller</th>
            <th class="px-4 py-3 text-left">Buyer</th>
            <th class="px-4 py-3 text-left">Created</th>
            <th class="px-4 py-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white">
          <tr v-for="(sale, index) in sales" :key="sale.id" class="border-t hover:bg-green-50/50 transition duration-75">
            <td class="px-4 py-2 font-medium text-gray-600">{{ (currentPage-1)*pageSize + index + 1 }}</td>
            <td class="px-4 py-2">{{ sale.quantity }}</td>
            <td class="px-4 py-2">{{ parseFloat(sale.price).toFixed(2) }}</td>
            <td class="px-4 py-2 font-semibold text-green-700">{{ parseFloat(sale.sub_total).toFixed(2) }}</td>
            <td class="px-4 py-2 text-gray-500">{{ sale.seller?.email || '-' }}</td>
            <td class="px-4 py-2 text-gray-500">{{ sale.buyer?.email || '-' }}</td>
            <td class="px-4 py-2 text-gray-500">{{ new Date(sale.created_at).toLocaleDateString() }}</td>
            <td class="px-4 py-2 flex gap-3">
              <button @click="openEditModal(sale)" class="text-green-600 hover:text-green-800 transition duration-150" title="Edit">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zm-3.182 3.182l-.828.828-5 5V16h2.828l5-5 .828-.828-2.828-2.828z"/></svg>
              </button>
              <button @click="confirmDelete(sale.id)" class="text-red-500 hover:text-red-700 transition duration-150" title="Delete">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 10-2 0v6a1 1 0 102 0V8z" clip-rule="evenodd" /></svg>
              </button>
            </td>
          </tr>
          <tr v-if="sales.length===0">
            <td colspan="8" class="text-center py-4 text-gray-400">No sales found.</td>
          </tr>
        </tbody>
      </table>

      <!-- Mobile List -->
      <div class="sm:hidden p-3 space-y-3">
        <div v-for="(sale, index) in sales" :key="sale.id" class="border border-gray-200 p-3 bg-white rounded-lg shadow-sm">
          <div class="flex justify-between items-start mb-2 border-b pb-2">
            <div class="text-xs font-semibold text-gray-600">Sale #{{ (currentPage-1)*pageSize + index + 1 }}</div>
            <div class="flex gap-2">
              <button @click="openEditModal(sale)" class="text-green-600 hover:text-green-800 text-xs" title="Edit">✎ Edit</button>
              <button @click="confirmDelete(sale.id)" class="text-red-500 hover:text-red-700 text-xs" title="Delete">🗑 Delete</button>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-y-1 text-xs">
             <div><span class="font-medium">Quantity:</span> {{ sale.quantity }}</div>
             <div><span class="font-medium">Price:</span> {{ sale.price }}</div>
             <div class="col-span-2 text-sm font-bold text-green-700"><span class="font-medium text-gray-700">Total:</span> {{ sale.sub_total }}</div>
             <div class="col-span-2 text-gray-500"><span class="font-medium text-gray-700">Seller:</span> {{ sale.seller?.email || 'N/A' }}</div>
             <div class="col-span-2 text-gray-500"><span class="font-medium text-gray-700">Buyer:</span> {{ sale.buyer?.email || 'N/A' }}</div>
             <div class="col-span-2 text-gray-500"><span class="font-medium text-gray-700">Created:</span> {{ new Date(sale.created_at).toLocaleDateString() }}</div>
          </div>
        </div>
        <div v-if="sales.length===0" class="text-center py-4 text-gray-400">No sales found.</div>
      </div>
    </div>

    <!-- Pagination -->
    <div class="flex items-center justify-between mt-4 text-xs">
      <span class="text-gray-600">Page {{ currentPage }} of {{ totalPages }} ({{ totalCount }} total)</span>
      <div class="flex items-center gap-2">
        <button @click="fetchSales(previousPage ? currentPage-1 : currentPage)" :disabled="!previousPage" class="px-3 py-1 border rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150">
          ◀ Prev
        </button>
        <button @click="fetchSales(nextPage ? currentPage+1 : currentPage)" :disabled="!nextPage" class="px-3 py-1 border rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150">
          Next ▶
        </button>
      </div>
    </div>

    <!-- Add & Edit Modals (Using your original close/refresh logic) -->
    <SaleAdd v-if="showAdd" @close="showAdd=false; fetchSales()" />
    <SaleEdit v-if="showEdit" :sale="selectedSale" @close="showEdit=false; fetchSales()" />
  </div>
</template>

<script>
import SaleAdd from './SaleAdd.vue';
import SaleEdit from './SaleEdit.vue';

export default {
  components: { SaleAdd, SaleEdit },
  data() {
    return {
      sales: [],
      searchQuery: "",
      pageSize: 10,
      totalPages: 1,
      currentPage: 1,
      nextPage: null,
      previousPage: null,
      totalCount: 0,
      showAdd: false,
      showEdit: false,
      selectedSale: null,
      showConfirm: false, // For future custom confirm modal
      deleteId: null, // To hold the ID of the sale to delete
    };
  },
  methods: {
    async fetchSales(page = 1) {
      try {
        const params = { page, page_size: this.pageSize, search: this.searchQuery || undefined };
        const res = await this.$apiGet("/get_sales", params);
        const data = res.data || {};

        // *************** RETAINING USER'S ORIGINAL LOGIC FOR DATA ASSIGNMENT ***************
        this.sales = data || [];
        this.totalCount = data.count || 0;
        this.totalPages = data.total_pages || 1;
        this.currentPage = data.current_page || 1;
        this.nextPage = !!data.next;
        this.previousPage = !!data.previous;
        // ***********************************************************************************

      } catch (err) {
        console.error("Error fetching sales:", err);
        // Note: Assumes $root.$refs.toast exists for showing errors
        this.$root.$refs.toast.showToast("Failed to fetch sales data.", "error");
        this.sales = [];
      }
    },
    openEditModal(sale) {
      this.selectedSale = sale;
      this.showEdit = true;
    },
    confirmDelete(id) {
        // Use confirm() as per previous logic, but log a toast on success/failure
        if (confirm("Are you sure you want to delete this sale?")) {
            this.deleteSale(id);
        }
    },
    async deleteSale(id) {
      try {
        await this.$apiDelete(`/delete_sale/${id}/`);
        this.$root.$refs.toast.showToast("Sale deleted successfully", "success");
        this.fetchSales(this.currentPage);
      } catch (err) {
        console.error("Error deleting sale:", err);
        this.$root.$refs.toast.showToast("Failed to delete sale", "error");
      }
    }
  },
  mounted() {
    this.fetchSales();
  }
};
</script>

<style scoped>
table th, table td { white-space: nowrap; }
</style>