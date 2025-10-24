<template>
  <div class="p-4 text-sm text-gray-800">
    <!-- Header -->
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-lg font-semibold">Housing Management</h1>
      <button
        @click="showAdd = true"
        class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-xs"
      >
        + Add Housing
      </button>
    </div>

    <!-- Search + Page Size -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
      <input
        v-model="searchQuery"
        @input="fetchHousing(1)"
        type="text"
        placeholder="Search by code or location..."
        class="border rounded-md px-2 py-1 text-xs w-full sm:w-64 focus:outline-none focus:ring-1 focus:ring-blue-400"
      />
      <div class="flex items-center gap-2 text-xs">
        <label>Show</label>
        <select
          v-model="pageSize"
          @change="fetchHousing(1)"
          class="border rounded-md px-1 py-0.5 text-xs"
        >
          <option v-for="size in [1,5,10,20,100]" :key="size" :value="size">
            {{ size }}
          </option>
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
            <th class="px-3 py-2 text-left">Code</th>
            <th class="px-3 py-2 text-left">Location</th>
            <th class="px-3 py-2 text-left">Created</th>
            <th class="px-3 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white">
          <tr
            v-for="(house, index) in housing"
            :key="house.id"
            class="border-t hover:bg-gray-50"
          >
            <td class="px-3 py-2">
              {{ (currentPage - 1) * pageSize + index + 1 }}
            </td>
            <td class="px-3 py-2 font-medium">{{ house.code }}</td>
            <td class="px-3 py-2">{{ house.location }}</td>
            <td class="px-3 py-2 text-gray-500">
              {{ formatDate(house.created_at) }}
            </td>
            <td class="px-3 py-2">
              <button
                class="text-blue-500 hover:text-blue-700 mr-2"
                @click="openEdit(house)"
              >
                ✎
              </button>
              <button
                class="text-red-500 hover:text-red-700"
                @click="deleteHousing(house.id)"
              >
                🗑
              </button>
            </td>
          </tr>

          <tr v-if="housing.length === 0">
            <td colspan="5" class="text-center py-3 text-gray-400">
              No housing records found.
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Mobile List -->
      <div class="sm:hidden flex flex-col gap-2">
        <div
          v-for="(house, index) in housing"
          :key="house.id"
          class="border rounded p-2 bg-white shadow-sm"
        >
          <div class="flex justify-between items-center">
            <span class="font-medium">{{ house.code }}</span>
            <div>
              <button
                class="text-blue-500 hover:text-blue-700 mr-2"
                @click="openEdit(house)"
              >
                ✎
              </button>
              <button
                class="text-red-500 hover:text-red-700"
                @click="deleteHousing(house.id)"
              >
                🗑
              </button>
            </div>
          </div>
          <p class="text-gray-500 text-[11px] mt-1">
            Location: {{ house.location }}
          </p>
          <p class="text-gray-500 text-[11px] mt-1">
            Created: {{ formatDate(house.created_at) }}
          </p>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div class="flex items-center justify-between mt-4 text-xs">
      <span>Page {{ currentPage }} of {{ totalPages }} ({{ count }} total)</span>
      <div class="flex items-center gap-1">
        <button
          @click="fetchHousing(currentPage - 1)"
          :disabled="!previousPage"
          class="px-2 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
        >
          ◀ Prev
        </button>
        <button
          @click="fetchHousing(currentPage + 1)"
          :disabled="!nextPage"
          class="px-2 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
        >
          Next ▶
        </button>
      </div>
    </div>

    <!-- Modals -->
    <AddHousing
      v-if="showAdd"
      @close="showAdd = false"
      @saved="fetchHousing"
    />
    <EditHousing
      v-if="showEdit"
      :house="selectedHouse"
      @close="showEdit = false"
      @saved="fetchHousing"
    />
  </div>
</template>

<script>
import AddHousing from "./AddHousing.vue";
import EditHousing from "./EditHousing.vue";

export default {
  components: { AddHousing, EditHousing },
  data() {
    return {
      housing: [],
      count: 0,
      totalPages: 1,
      currentPage: 1,
      pageSize: 10,
      nextPage: null,
      previousPage: null,
      searchQuery: "",
      showAdd: false,
      showEdit: false,
      selectedHouse: null,
    };
  },
  methods: {
    async fetchHousing(page = 1) {
      try {
        const params = {
          page,
          page_size: this.pageSize,
          search: this.searchQuery || undefined,
        };
        const res = await this.$apiGet("/get_housings", params);
        this.housing = res.data || [];
        this.count = res.count;
        this.totalPages = res.total_pages;
        this.currentPage = res.current_page;
        this.nextPage = res.next;
        this.previousPage = res.previous;
      } catch (err) {
        console.error(err);
      }
    },
    openEdit(house) {
      this.selectedHouse = house;
      this.showEdit = true;
    },
    async deleteHousing(id) {
      if (!confirm("Are you sure you want to delete this housing record?"))
        return;
      try {
        await this.$apiDelete(`/delete_housing/${id}/`);
        this.fetchHousing(this.currentPage);
      } catch (err) {
        console.error(err);
      }
    },
    formatDate(dateStr) {
      return new Date(dateStr).toLocaleDateString();
    },
  },
  mounted() {
    this.fetchHousing();
  },
};
</script>
