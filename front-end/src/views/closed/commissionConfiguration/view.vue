<template>
  <div class="p-4 text-sm text-gray-800">
    <!-- Header -->
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-lg font-semibold">Commission Configurations</h1>
      <button
        @click="openAddModal"
        class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-xs"
      >
        + Add Configuration
      </button>
    </div>

    <!-- Desktop Table -->
    <div class="hidden sm:block overflow-x-auto border rounded-lg shadow-sm">
      <table class="min-w-full text-xs">
        <thead class="bg-gray-200 text-gray-700 uppercase text-[11px]">
          <tr>
            <th class="px-3 py-2 text-left">#</th>
            <th class="px-3 py-2 text-left">Direct Bonus</th>
            <th class="px-3 py-2 text-left">Indirect Bonus</th>
            <th class="px-3 py-2 text-left">Rank Achievement</th>
            <th class="px-3 py-2 text-left">Unilevel Bonus</th>
            <th class="px-3 py-2 text-left">Loyality Bonus</th>
            <th class="px-3 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white">
          <tr
            v-for="(item, index) in configurations"
            :key="item.id"
            class="border-t hover:bg-gray-50"
          >
            <td class="px-3 py-2">{{ index + 1 }}</td>
            <td class="px-3 py-2">{{ item.direct_bonus }}</td>
            <td class="px-3 py-2">{{ item.indirect_bonus }}</td>
            <td class="px-3 py-2">{{ item.rank_achievement }}</td>
            <td class="px-3 py-2">{{ item.unilevel_bonus }}</td>
            <td class="px-3 py-2">{{ item.loyality_bonus }}</td>
            <td class="px-3 py-2 flex gap-2">
              <button
                @click="editConfiguration(item)"
                class="text-blue-500 hover:text-blue-700"
                title="Edit"
              >
                ✎
              </button>
              <button
                @click="deleteConfiguration(item.id)"
                class="text-red-500 hover:text-red-700"
                title="Delete"
              >
                🗑
              </button>
            </td>
          </tr>

          <tr v-if="configurations.length === 0">
            <td colspan="7" class="text-center py-3 text-gray-400">
              No configurations found.
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Mobile Cards -->
    <div class="block sm:hidden space-y-3">
      <div
        v-for="(item, index) in configurations"
        :key="item.id"
        class="border rounded-lg p-3 shadow-sm bg-white"
      >
        <div class="flex justify-between mb-2 text-xs text-gray-600">
          <span>#{{ index + 1 }}</span>
          <div class="flex gap-2">
            <button
              @click="editConfiguration(item)"
              class="text-blue-500 hover:text-blue-700"
              title="Edit"
            >
              ✎
            </button>
            <button
              @click="deleteConfiguration(item.id)"
              class="text-red-500 hover:text-red-700"
              title="Delete"
            >
              🗑
            </button>
          </div>
        </div>

        <div class="text-[13px] space-y-1">
          <div><span class="font-semibold">Direct Bonus:</span> {{ item.direct_bonus }}</div>
          <div><span class="font-semibold">Indirect Bonus:</span> {{ item.indirect_bonus }}</div>
          <div><span class="font-semibold">Rank Achievement:</span> {{ item.rank_achievement }}</div>
          <div><span class="font-semibold">Unilevel Bonus:</span> {{ item.unilevel_bonus }}</div>
          <div><span class="font-semibold">Loyality Bonus:</span> {{ item.loyality_bonus }}</div>
        </div>
      </div>

      <div v-if="configurations.length === 0" class="text-center py-4 text-gray-400">
        No configurations found.
      </div>
    </div>

    <!-- Add/Edit Modals -->
    <CommissionConfigurationAdd
      v-if="showAddModal"
      @close="showAddModal = false; fetchConfigurations()"
    />
    <CommissionConfigurationEdit
      v-if="showEditModal"
      :configuration="selectedConfiguration"
      @close="showEditModal = false; fetchConfigurations()"
    />
  </div>
</template>

<script>
import CommissionConfigurationAdd from "./CommissionConfigurationAdd.vue";
import CommissionConfigurationEdit from "./CommissionConfigurationEdit.vue";

export default {
  components: { CommissionConfigurationAdd, CommissionConfigurationEdit },
  data() {
    return {
      configurations: [],
      showAddModal: false,
      showEditModal: false,
      selectedConfiguration: null,
    };
  },
  methods: {
    async fetchConfigurations() {
      try {
        const res = await this.$apiGet("/get_commission_configurations");
        this.configurations = res.data || [];
      } catch (err) {
        console.error("Failed to fetch configurations:", err);
        this.configurations = [];
      }
    },
    openAddModal() {
      this.showAddModal = true;
    },
    editConfiguration(item) {
      this.selectedConfiguration = { ...item };
      this.showEditModal = true;
    },
    deleteConfiguration(id) {
      alert("Delete not implemented yet");
    },
  },
  mounted() {
    this.fetchConfigurations();
  },
};
</script>

<style scoped>
table th, table td { white-space: nowrap; }
</style>
