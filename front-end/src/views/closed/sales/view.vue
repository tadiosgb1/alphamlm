<template>
  <div class="p-4 text-sm text-gray-800">
    <!-- Header -->
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-lg font-semibold">Sales</h1>
      <button
        @click="showAdd = true"
        class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-xs"
      >
        + Add Sale
      </button>
    </div>

    <!-- Search + Page Size -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
      <input
        v-model="searchQuery"
        @input="fetchSales(1)"
        type="text"
        placeholder="Search by seller/buyer..."
        class="border rounded-md px-2 py-1 text-xs w-full sm:w-64 focus:outline-none focus:ring-1 focus:ring-blue-400"
      />
      <div class="flex items-center gap-2 text-xs">
        <label>Show</label>
        <select v-model="pageSize" @change="fetchSales(1)" class="border rounded-md px-1 py-0.5 text-xs">
          <option v-for="size in [1,5,10,20,50,100]" :key="size" :value="size">{{ size }}</option>
        </select>
        <span>entries</span>
      </div>
    </div>

    <!-- Table / List -->
    <div class="overflow-x-auto border rounded-lg shadow-sm">
      <!-- Desktop Table -->
      <table class="min-w-full text-xs hidden sm:table">
        <thead class="bg-gray-200 text-gray-700 uppercase text-[11px]">
          <tr>
            <th class="px-3 py-2 text-left">#</th>
            <th class="px-3 py-2 text-left">Quantity</th>
            <th class="px-3 py-2 text-left">Price</th>
            <th class="px-3 py-2 text-left">Sub Total</th>
            <th class="px-3 py-2 text-left">Seller</th>
            <th class="px-3 py-2 text-left">Buyer</th>
            <th class="px-3 py-2 text-left">Created</th>
            <th class="px-3 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white">
          <tr v-for="(sale, index) in sales" :key="sale.id" class="border-t hover:bg-gray-50">
            <td class="px-3 py-2">{{ (currentPage-1)*pageSize + index + 1 }}</td>
            <td class="px-3 py-2">{{ sale.quantity }}</td>
            <td class="px-3 py-2">{{ sale.price }}</td>
            <td class="px-3 py-2">{{ sale.sub_total }}</td>
            <td class="px-3 py-2">{{ sale.seller?.email || '-' }}</td>
            <td class="px-3 py-2">{{ sale.buyer?.email || '-' }}</td>
            <td class="px-3 py-2 text-gray-500">{{ new Date(sale.created_at).toLocaleDateString() }}</td>
            <td class="px-3 py-2 flex gap-2">
              <button @click="openEditModal(sale)" class="text-blue-500 hover:text-blue-700" title="Edit">✎</button>
              <button @click="deleteSale(sale.id)" class="text-red-500 hover:text-red-700" title="Delete">🗑</button>
            </td>
          </tr>
          <tr v-if="sales.length===0">
            <td colspan="8" class="text-center py-3 text-gray-400">No sales found.</td>
          </tr>
        </tbody>
      </table>

      <!-- Mobile List -->
      <div class="sm:hidden">
        <div v-for="sale in sales" :key="sale.id" class="border-b py-2 px-2 mb-2 bg-white rounded shadow-sm">
          <div class="flex justify-between">
            <div><span class="font-semibold">Qty:</span> {{ sale.quantity }}</div>
            <div><span class="font-semibold">Price:</span> {{ sale.price }}</div>
          </div>
          <div><span class="font-semibold">Sub Total:</span> {{ sale.sub_total }}</div>
          <div><span class="font-semibold">Seller:</span> {{ sale.seller?.email || '-' }}</div>
          <div><span class="font-semibold">Buyer:</span> {{ sale.buyer?.email || '-' }}</div>
          <div class="text-gray-500"><span class="font-semibold">Created:</span> {{ new Date(sale.created_at).toLocaleDateString() }}</div>
          <div class="flex gap-2 mt-1">
            <button @click="openEditModal(sale)" class="text-blue-500 hover:text-blue-700 text-xs">✎ Edit</button>
            <button @click="deleteSale(sale.id)" class="text-red-500 hover:text-red-700 text-xs">🗑 Delete</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div class="flex items-center justify-between mt-4 text-xs">
      <span>Page {{ currentPage }} of {{ totalPages }} ({{ totalCount }} total)</span>
      <div class="flex items-center gap-1">
        <button @click="fetchSales(previousPage ? currentPage-1 : currentPage)" :disabled="!previousPage" class="px-2 py-1 border rounded hover:bg-gray-100 disabled:opacity-50">◀ Prev</button>
        <button @click="fetchSales(nextPage ? currentPage+1 : currentPage)" :disabled="!nextPage" class="px-2 py-1 border rounded hover:bg-gray-100 disabled:opacity-50">Next ▶</button>
      </div>
    </div>

    <!-- Add & Edit Modals -->
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
      selectedSale: null
    };
  },
  methods: {
    async fetchSales(page = 1) {
      try {
        const params = { page, page_size: this.pageSize, search: this.searchQuery || undefined };
        const res = await this.$apiGet("/get_sales", params);
        const data = res.data || {};
        this.sales = data || [];
        this.totalCount = data.count || 0;
        this.totalPages = data.total_pages || 1;
        this.currentPage = data.current_page || 1;
        this.nextPage = !!data.next;
        this.previousPage = !!data.previous;
      } catch (err) {
        console.error(err);
        this.sales = [];
      }
    },
    openEditModal(sale) {
      this.selectedSale = sale;
      this.showEdit = true;
    },
    async deleteSale(id) {
      if (!confirm("Are you sure you want to delete this sale?")) return;
      try {
        await this.$apiDelete(`/delete_sale/${id}/`);
        this.fetchSales(this.currentPage);
      } catch (err) {
        console.error(err);
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
