<template>
  <div class=" bg-gray-50 min-h-screen text-base text-gray-800">
    <div class="max-w-7xl mx-auto bg-white  rounded-md overflow-hidden border border-gray-200 p-4">

      <div class="flex items-center justify-between border-b pb-4 mb-4 border-gray-200">
        <h1 class="text-xl font-semibold text-gray-800">Tree Settings</h1>
        
        <button
          @click="showAdd = true"
          class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md transition duration-150 flex items-center"
        >
          + Add Tree Setting
        </button>
      </div>

      <div class="overflow-x-auto border border-gray-200 rounded-lg hidden sm:block">
        <table class="min-w-full text-sm divide-y divide-gray-200">
          <thead class="bg-gray-100">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">#</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Max Children</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Created At</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Updated At</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="(item, index) in settings"
              :key="item.id"
              class="hover:bg-gray-50 transition duration-150"
            >
              <td class="px-6 py-3 whitespace-nowrap">{{ index + 1 }}</td>
              <td class="px-6 py-3 whitespace-nowrap font-medium text-gray-900">{{ item.max_children }}</td>
              <td class="px-6 py-3 whitespace-nowrap text-gray-500">{{ formatDate(item.created_at) }}</td>
              <td class="px-6 py-3 whitespace-nowrap text-gray-500">{{ formatDate(item.updated_at) }}</td>
              <td class="px-6 py-3 whitespace-nowrap">
                <button
                  class="text-green-500 hover:text-green-700 transition duration-150"
                  @click="openEdit(item)"
                  title="Edit"
                >
                  <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
              </td>
            </tr>
            <tr v-if="settings.length === 0">
              <td colspan="5" class="text-center py-8 text-gray-400 italic">
                No tree settings found.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="grid gap-3 sm:hidden">
        <div
          v-for="(item, index) in settings"
          :key="item.id"
          class="border border-gray-200 rounded-lg p-4 bg-white shadow-sm"
        >
          <div class="flex justify-between items-start mb-2 border-b pb-2">
            <p class="text-lg font-bold text-gray-800">Setting #{{ index + 1 }}</p>
            <button
              class="text-green-500 hover:text-green-700 text-sm font-medium flex items-center gap-1 transition duration-150"
              @click="openEdit(item)"
            >
              <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
              Edit
            </button>
          </div>
          <div class="space-y-1 text-sm">
            <p><span class="font-medium text-gray-600">Max Children:</span> <span class="font-bold text-gray-900">{{ item.max_children }}</span></p>
            <p class="text-gray-600"><span class="font-medium">Created:</span> {{ formatDate(item.created_at) }}</p>
            <p class="text-gray-600"><span class="font-medium">Updated:</span> {{ formatDate(item.updated_at) }}</p>
          </div>
        </div>
        <div v-if="settings.length === 0" class="text-center py-6 text-gray-400 italic">
          No tree settings found.
        </div>
      </div>

      <AddTreeSetting v-if="showAdd" @close="showAdd = false; fetchSettings()" />
      <EditTreeSetting
        v-if="showEdit"
        :setting="selectedSetting"
        @close="showEdit = false; fetchSettings()"
      />
    </div>
  </div>
</template>

<script>
import AddTreeSetting from "./AddTreeSetting.vue";
import EditTreeSetting from "./EditTreeSetting.vue";

export default {
  components: { AddTreeSetting, EditTreeSetting },
  data() {
    return {
      settings: [],
      showAdd: false,
      showEdit: false,
      selectedSetting: null,
    };
  },
  methods: {
    async fetchSettings() {
      try {
        const res = await this.$apiGet("/get_tree_settings");
        // Keeping original data assignment logic
        this.settings = res.data || []; 
      } catch (err) {
        console.error("Failed to fetch tree settings:", err);
      }
    },
    formatDate(dateStr) {
      return new Date(dateStr).toLocaleString();
    },
    openEdit(item) {
      this.selectedSetting = { ...item };
      this.showEdit = true;
    },
  },
  mounted() {
    this.fetchSettings();
  },
};
</script>

<style scoped>
/* Ensure table cells do not wrap for better alignment in the desktop view */
table th, table td { white-space: nowrap; }
</style>