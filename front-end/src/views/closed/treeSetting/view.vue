<template>
  <div class="p-4 text-sm text-gray-800">
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-lg font-semibold">Tree Settings</h1>
      <button
        @click="showAdd = true"
        class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-xs"
      >
        + Add Tree Setting
      </button>
    </div>

    <!-- Responsive layout -->
    <div class="border rounded-lg shadow-sm overflow-x-auto hidden sm:block">
      <table class="min-w-full text-xs">
        <thead class="bg-gray-200 text-gray-600 uppercase text-[11px]">
          <tr>
            <th class="px-3 py-2 text-left">#</th>
            <th class="px-3 py-2 text-left">Max Children</th>
            <th class="px-3 py-2 text-left">Created At</th>
            <th class="px-3 py-2 text-left">Updated At</th>
            <th class="px-3 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white">
          <tr
            v-for="(item, index) in settings"
            :key="item.id"
            class="border-t hover:bg-gray-50"
          >
            <td class="px-3 py-2">{{ index + 1 }}</td>
            <td class="px-3 py-2">{{ item.max_children }}</td>
            <td class="px-3 py-2">{{ formatDate(item.created_at) }}</td>
            <td class="px-3 py-2">{{ formatDate(item.updated_at) }}</td>
            <td class="px-3 py-2">
              <button
                class="text-blue-500 hover:text-blue-700 mr-2"
                @click="openEdit(item)"
              >
                ✎
              </button>
            </td>
          </tr>
          <tr v-if="settings.length === 0">
            <td colspan="5" class="text-center py-3 text-gray-400">
              No tree settings found.
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Mobile cards -->
    <div class="grid gap-3 sm:hidden">
      <div
        v-for="(item, index) in settings"
        :key="item.id"
        class="border rounded-lg p-3 bg-white shadow-sm"
      >
        <p class="font-semibold">Tree #{{ index + 1 }}</p>
        <p>Max Children: <span class="font-medium">{{ item.max_children }}</span></p>
        <p>Created: {{ formatDate(item.created_at) }}</p>
        <p>Updated: {{ formatDate(item.updated_at) }}</p>
        <div class="mt-2 flex gap-3">
          <button
            class="text-blue-500 hover:text-blue-700"
            @click="openEdit(item)"
          >
            ✎ Edit
          </button>
        </div>
      </div>
    </div>

    <!-- Modals -->
    <AddTreeSetting v-if="showAdd" @close="showAdd = false; fetchSettings()" />
    <EditTreeSetting
      v-if="showEdit"
      :setting="selectedSetting"
      @close="showEdit = false; fetchSettings()"
    />
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
