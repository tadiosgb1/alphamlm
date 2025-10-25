<template>
  <div class="p-4 text-sm text-gray-800">
    <!-- Header -->
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-lg font-semibold">Promoter Buyers</h1>
      <button @click="showAdd = true" class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-xs">
        + Add Promoter Buyer
      </button>
    </div>

    <!-- Search + Page Size -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
      <input
        v-model="searchQuery"
        @input="fetchData(1)"
        type="text"
        placeholder="Search by promoter or buyer..."
        class="border rounded-md px-2 py-1 text-xs w-full sm:w-64 focus:outline-none focus:ring-1 focus:ring-blue-400"
      />
      <div class="flex items-center gap-2 text-xs">
        <label>Show</label>
        <select v-model="pageSize" @change="fetchData(1)" class="border rounded-md px-1 py-0.5 text-xs">
          <option v-for="size in [5,10,20,50]" :key="size" :value="size">{{ size }}</option>
        </select>
        <span>entries</span>
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto border rounded-lg shadow-sm">
      <table class="min-w-full text-xs hidden sm:table">
        <thead class="bg-gray-200 text-gray-600 uppercase text-[11px]">
          <tr>
            <th class="px-3 py-2 text-left">#</th>
            <th class="px-3 py-2 text-left">Promoter</th>
            <th class="px-3 py-2 text-left">Buyer</th>
            <th class="px-3 py-2 text-left">Created</th>
            <th class="px-3 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white">
          <tr v-for="(item, index) in list" :key="item.id" class="border-t hover:bg-gray-50">
            <td class="px-3 py-2">{{ (currentPage - 1) * pageSize + index + 1 }}</td>
            <td class="px-3 py-2">{{ item.promoter }}</td>
            <td class="px-3 py-2">{{ item.buyer }}</td>
            <td class="px-3 py-2 text-gray-500">{{ formatDate(item.created_at) }}</td>
            <td class="px-3 py-2">
              <button class="text-blue-500 hover:text-blue-700 mr-2" @click="openEdit(item)">✎</button>
              <button class="text-red-500 hover:text-red-700" @click="deleteItem(item.id)">🗑</button>
            </td>
          </tr>
          <tr v-if="list.length === 0">
            <td colspan="5" class="text-center py-3 text-gray-400">No records found.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="flex items-center justify-between mt-4 text-xs">
      <span>Page {{ currentPage }} of {{ totalPages }} ({{ count }} total)</span>
      <div class="flex items-center gap-1">
        <button @click="fetchData(currentPage - 1)" :disabled="!previousPage"
          class="px-2 py-1 border rounded hover:bg-gray-100 disabled:opacity-50">◀ Prev</button>
        <button @click="fetchData(currentPage + 1)" :disabled="!nextPage"
          class="px-2 py-1 border rounded hover:bg-gray-100 disabled:opacity-50">Next ▶</button>
      </div>
    </div>

    <!-- Modals -->
    <AddPromoterBuyer v-if="showAdd" @close="showAdd=false" @saved="fetchData" />
    <EditPromoterBuyer v-if="showEdit" :item="selectedItem" @close="showEdit=false" @saved="fetchData" />
  </div>
</template>

<script>
import AddPromoterBuyer from './AddPromoterBuyer.vue';
import EditPromoterBuyer from './EditPromoterBuyer.vue';

export default {
  components: { AddPromoterBuyer, EditPromoterBuyer },
  data() {
    return {
      list: [],
      count: 0,
      totalPages: 1,
      currentPage: 1,
      pageSize: 10,
      nextPage: null,
      previousPage: null,
      searchQuery: '',
      showAdd: false,
      showEdit: false,
      selectedItem: null,
    };
  },
  methods: {
    async fetchData(page = 1) {
      try {
        const params = { page, page_size: this.pageSize, search: this.searchQuery || undefined };
        const res = await this.$apiGet('/get_promoter_buyers', params);
        this.list = res.data || [];
        this.count = res.count;
        this.totalPages = res.total_pages;
        this.currentPage = res.current_page;
        this.nextPage = res.next;
        this.previousPage = res.previous;
      } catch (err) { console.error(err); }
    },
    openEdit(item) {
      this.selectedItem = item;
      this.showEdit = true;
    },
    async deleteItem(id) {
      if (!confirm('Are you sure?')) return;
      try {
        const res = await this.$apiDelete(`/delete_promoter_buyer`, id);
        if (res) this.$root.$refs.toast.showToast("Deleted successfully", "success");
        this.fetchData(this.currentPage);
      } catch (err) {
        console.error(err);
        this.$root.$refs.toast.showToast("Delete failed", "error");
      }
    },
    formatDate(dateStr) { return new Date(dateStr).toLocaleDateString(); },
  },
  mounted() {
    this.fetchData();
  },
};
</script>
