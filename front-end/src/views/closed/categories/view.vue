<template>
  <div class="p-4 text-sm text-gray-800">
    <!-- Header -->
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-lg font-semibold">Categories</h1>
      <button @click="showAdd = true" class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-xs">
        + Add Category
      </button>
    </div>

    <!-- Search + Page Size -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
      <input
        v-model="searchQuery"
        @input="fetchCategories(1)"
        type="text"
        placeholder="Search by name..."
        class="border rounded-md px-2 py-1 text-xs w-full sm:w-64 focus:outline-none focus:ring-1 focus:ring-blue-400"
      />
      <div class="flex items-center gap-2 text-xs">
        <label>Show</label>
        <select v-model="pageSize" @change="fetchCategories(1)" class="border rounded-md px-1 py-0.5 text-xs">
          <option v-for="size in [1,5,10,20,100]" :key="size" :value="size">{{ size }}</option>
        </select>
        <span>entries</span>
      </div>
    </div>

    <!-- Table / List -->
    <div class="overflow-x-auto border rounded-lg shadow-sm">
      <!-- Desktop Table -->
      <table class="min-w-full text-xs hidden sm:table">
        <thead class="bg-gray-200 text-gray-600 uppercase text-[11px]">
          <tr>
            <th class="px-3 py-2 text-left">#</th>
            <th class="px-3 py-2 text-left">Name</th>
            <th class="px-3 py-2 text-left">Description</th>
            <th class="px-3 py-2 text-left">Created</th>
            <th class="px-3 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white">
          <tr v-for="(category, index) in categories" :key="category.id" class="border-t hover:bg-gray-50">
            <td class="px-3 py-2">{{ (currentPage - 1) * pageSize + index + 1 }}</td>
            <td class="px-3 py-2 font-medium">{{ category.name }}</td>
            <td class="px-3 py-2 text-gray-600">{{ category.description }}</td>
            <td class="px-3 py-2 text-gray-500">{{ formatDate(category.created_at) }}</td>
            <td class="px-3 py-2">
              <button class="text-blue-500 hover:text-blue-700 mr-2" @click="openEdit(category)">✎</button>
              <button class="text-red-500 hover:text-red-700" @click="deleteCategory(category.id)">🗑</button>
            </td>
          </tr>
          <tr v-if="categories.length === 0">
            <td colspan="5" class="text-center py-3 text-gray-400">No categories found.</td>
          </tr>
        </tbody>
      </table>

      <!-- Mobile List -->
      <div class="sm:hidden flex flex-col gap-2">
        <div v-for="(category, index) in categories" :key="category.id" class="border rounded p-2 bg-white shadow-sm">
          <div class="flex justify-between items-center">
            <span class="font-medium">{{ category.name }}</span>
            <div>
              <button class="text-blue-500 hover:text-blue-700 mr-2" @click="openEdit(category)">✎</button>
              <button class="text-red-500 hover:text-red-700" @click="deleteCategory(category.id)">🗑</button>
            </div>
          </div>
          <p class="text-gray-600 text-[11px] mt-1">{{ category.description }}</p>
          <p class="text-gray-500 text-[11px] mt-1">Created: {{ formatDate(category.created_at) }}</p>
        </div>
        <div v-if="categories.length === 0" class="text-center py-3 text-gray-400">No categories found.</div>
      </div>
    </div>

    <!-- Pagination -->
    <div class="flex items-center justify-between mt-4 text-xs">
      <span>Page {{ currentPage }} of {{ totalPages }} ({{ count }} total)</span>
      <div class="flex items-center gap-1">
        <button @click="fetchCategories(currentPage - 1)" :disabled="!previousPage"
          class="px-2 py-1 border rounded hover:bg-gray-100 disabled:opacity-50">◀ Prev</button>
        <button @click="fetchCategories(currentPage + 1)" :disabled="!nextPage"
          class="px-2 py-1 border rounded hover:bg-gray-100 disabled:opacity-50">Next ▶</button>
      </div>
    </div>

    <!-- Modals -->
    <AddCategory v-if="showAdd" @close="showAdd = false" @saved="fetchCategories"/>
    <EditCategory v-if="showEdit" :category="selectedCategory" @close="showEdit = false" @saved="fetchCategories"/>
  </div>
</template>

<script>
import AddCategory from './AddCategory.vue';
import EditCategory from './EditCategory.vue';

export default {
  components: { AddCategory, EditCategory },
  data() {
    return {
      categories: [],
      count: 0,
      totalPages: 1,
      currentPage: 1,
      pageSize: 10,
      nextPage: null,
      previousPage: null,
      searchQuery: '',
      showAdd: false,
      showEdit: false,
      selectedCategory: null
    };
  },
  methods: {
    async fetchCategories(page = 1) {
      try {
        const params = { page, page_size: this.pageSize, search: this.searchQuery || undefined };
        const res = await this.$apiGet('/get_categories', params);
        this.categories = res.data || [];
        this.count = res.count;
        this.totalPages = res.total_pages;
        this.currentPage = res.current_page;
        this.nextPage = res.next;
        this.previousPage = res.previous;
      } catch (err) { console.error(err); }
    },
    openEdit(category) {
      this.selectedCategory = category;
      this.showEdit = true;
    },
    async deleteCategory(id) {
      if (!confirm('Are you sure?')) return;
      try {
        await this.$apiDelete(`/delete_category/${id}/`);
        this.fetchCategories(this.currentPage);
      } catch (err) { console.error(err); }
    },
    formatDate(dateStr) {
      return new Date(dateStr).toLocaleDateString();
    }
  },
  mounted() {
    this.fetchCategories();
  }
};
</script>
