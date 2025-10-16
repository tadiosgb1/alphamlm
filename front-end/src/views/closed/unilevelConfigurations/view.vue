<template>
  <div class="p-4 text-sm text-gray-800">
    <!-- Header -->
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-lg font-semibold">Unilevel Configurations</h1>
      <button
        @click="showAdd = true"
        class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-xs"
      >
        + Add Configuration
      </button>
    </div>

    <!-- Search + Page Size -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
      <input
        v-model="searchQuery"
        @input="fetchConfigurations(1)"
        type="text"
        placeholder="Search by level or category..."
        class="border rounded-md px-2 py-1 text-xs w-full sm:w-64 focus:outline-none focus:ring-1 focus:ring-blue-400"
      />
      <div class="flex items-center gap-2 text-xs">
        <label>Show</label>
        <select v-model="pageSize" @change="fetchConfigurations(1)" class="border rounded-md px-1 py-0.5 text-xs">
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
            <th class="px-3 py-2 text-left">Level</th>
            <th class="px-3 py-2 text-left">Percentage</th>
            <th class="px-3 py-2 text-left">Category</th>
            <th class="px-3 py-2 text-left">Created</th>
            <th class="px-3 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white">
          <tr v-for="(conf, index) in configurations" :key="conf.id" class="border-t hover:bg-gray-50">
            <td class="px-3 py-2">{{ (currentPage-1)*pageSize + index + 1 }}</td>
            <td class="px-3 py-2">{{ conf.level }}</td>
            <td class="px-3 py-2">{{ conf.percentage }}%</td>
            <td class="px-3 py-2">{{ conf.category }}</td>
            <td class="px-3 py-2 text-gray-500">{{ new Date(conf.created_at).toLocaleDateString() }}</td>
            <td class="px-3 py-2 flex gap-2">
              <button @click="openEditModal(conf)" class="text-blue-500 hover:text-blue-700" title="Edit">✎</button>
              <button @click="deleteConfiguration(conf.id)" class="text-red-500 hover:text-red-700" title="Delete">🗑</button>
            </td>
          </tr>
          <tr v-if="configurations.length===0">
            <td colspan="6" class="text-center py-3 text-gray-400">No configurations found.</td>
          </tr>
        </tbody>
      </table>

      <!-- Mobile list -->
      <div class="sm:hidden">
        <div v-for="conf in configurations" :key="conf.id" class="border-b py-2 px-2 mb-2 bg-white rounded shadow-sm">
          <div><span class="font-semibold">Level:</span> {{ conf.level }}</div>
          <div><span class="font-semibold">Percentage:</span> {{ conf.percentage }}%</div>
          <div><span class="font-semibold">Category:</span> {{ conf.category }}</div>
          <div class="text-gray-500"><span class="font-semibold">Created:</span> {{ new Date(conf.created_at).toLocaleDateString() }}</div>
          <div class="flex gap-2 mt-1">
            <button @click="openEditModal(conf)" class="text-blue-500 hover:text-blue-700 text-xs">✎ Edit</button>
            <button @click="deleteConfiguration(conf.id)" class="text-red-500 hover:text-red-700 text-xs">🗑 Delete</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div class="flex items-center justify-between mt-4 text-xs">
      <span>Page {{ currentPage }} of {{ totalPages }} ({{ totalCount }} total)</span>
      <div class="flex items-center gap-1">
        <button @click="fetchConfigurations(previousPage ? currentPage-1 : currentPage)" :disabled="!previousPage" class="px-2 py-1 border rounded hover:bg-gray-100 disabled:opacity-50">◀ Prev</button>
        <button @click="fetchConfigurations(nextPage ? currentPage+1 : currentPage)" :disabled="!nextPage" class="px-2 py-1 border rounded hover:bg-gray-100 disabled:opacity-50">Next ▶</button>
      </div>
    </div>

    <!-- Modals -->
    <UnilevelAdd v-if="showAdd" @close="showAdd=false; fetchConfigurations()" />
    <UnilevelEdit v-if="showEdit" :configuration="selectedConfiguration" @close="showEdit=false; fetchConfigurations()" />
  </div>
</template>

<script>
import UnilevelAdd from './UnilevelAdd.vue';
import UnilevelEdit from './UnilevelEdit.vue';

export default {
  components: { UnilevelAdd, UnilevelEdit },
  data() {
    return {
      configurations: [],
      searchQuery: "",
      pageSize: 10,
      totalPages: 1,
      currentPage: 1,
      nextPage: null,
      previousPage: null,
      totalCount: 0,
      showAdd: false,
      showEdit: false,
      selectedConfiguration: null
    };
  },
  methods: {
    async fetchConfigurations(page = 1) {
      try {
        const params = { page, page_size: this.pageSize, search: this.searchQuery || undefined };
        const res = await this.$apiGet("/get_unilevel_configurations", params);
        const data = res.data || {};
        this.configurations = data || [];
        this.totalCount = data.count || 0;
        this.totalPages = data.total_pages || 1;
        this.currentPage = data.current_page || 1;
        this.nextPage = !!data.next;
        this.previousPage = !!data.previous;
      } catch (err) {
        console.error(err);
        this.configurations = [];
      }
    },
    openEditModal(conf) {
      this.selectedConfiguration = conf;
      this.showEdit = true;
    },
    async deleteConfiguration(id) {
      if (!confirm("Are you sure you want to delete this configuration?")) return;
      try {
        await this.$apiDelete(`/delete_unilevel_configuration/${id}/`);
        this.fetchConfigurations(this.currentPage);
      } catch (err) {
        console.error(err);
      }
    }
  },
  mounted() {
    this.fetchConfigurations();
  }
};
</script>

<style scoped>
table th, table td { white-space: nowrap; }
</style>
