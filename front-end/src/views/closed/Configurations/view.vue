<template>
  <div class="p-4 text-sm text-gray-800">
    <!-- Header -->
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-lg font-semibold">System Configuration</h1>
      <button
        @click="showAdd = true"
        class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-xs"
      >
        + Add Configuration
      </button>
    </div>

    <!-- Desktop Table -->
    <div class="overflow-x-auto border rounded-lg shadow-sm hidden md:block">
      <table class="min-w-full text-xs">
        <thead class="bg-gray-200 text-gray-600 uppercase text-[11px]">
          <tr>
            <th class="px-3 py-2 text-left">#</th>
            <th class="px-3 py-2 text-left">Investment</th>
            <th class="px-3 py-2 text-left">Housing/Car</th>
            <th class="px-3 py-2 text-left">SACCO</th>
            <th class="px-3 py-2 text-left">Service Charge</th>
            <th class="px-3 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white">
          <tr
            v-for="(item, index) in configs"
            :key="item.id"
            class="border-t hover:bg-gray-50"
          >
            <td class="px-3 py-2">{{ index + 1 }}</td>
            <td class="px-3 py-2">{{ item.investment_amount }}</td>
            <td class="px-3 py-2">{{ item.housing_or_car_investment }}</td>
            <td class="px-3 py-2">{{ item.sacco }}</td>
            <td class="px-3 py-2">{{ item.service_charge }}</td>
            <td class="px-3 py-2">
              <button
                class="text-blue-500 hover:text-blue-700 mr-2"
                @click="openEdit(item)"
              >
                ✎
              </button>
              <button
                class="text-red-500 hover:text-red-700"
                @click="deleteConfig(item.id)"
              >
                🗑
              </button>
            </td>
          </tr>
          <tr v-if="configs.length === 0">
            <td colspan="6" class="text-center py-3 text-gray-400">
              No configurations found.
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Mobile List View -->
    <div class="md:hidden space-y-3">
      <div
        v-for="(item, index) in configs"
        :key="item.id"
        class="bg-white border rounded-lg shadow-sm p-3"
      >
        <div class="flex justify-between mb-1">
          <h2 class="font-semibold text-gray-700">#{{ index + 1 }}</h2>
          <div class="flex gap-2">
            <button
              class="text-blue-500 hover:text-blue-700"
              @click="openEdit(item)"
            >
              ✎
            </button>
            <button
              class="text-red-500 hover:text-red-700"
              @click="deleteConfig(item.id)"
            >
              🗑
            </button>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-y-1 text-xs text-gray-700">
          <div><span class="font-medium">Investment:</span> {{ item.investment_amount }}</div>
          <div><span class="font-medium">Housing/Car:</span> {{ item.housing_or_car_investment }}</div>
          <div><span class="font-medium">SACCO:</span> {{ item.sacco }}</div>
          <div><span class="font-medium">Service Charge:</span> {{ item.service_charge }}</div>
        </div>
      </div>

      <p v-if="configs.length === 0" class="text-center text-gray-400 py-3">
        No configurations found.
      </p>
    </div>

    <!-- Modals -->
    <AddConfiguration
      v-if="showAdd"
      @close="showAdd = false"
      @saved="fetchConfigs"
    />
    <EditConfiguration
      v-if="showEdit"
      :config="selectedConfig"
      @close="showEdit = false"
      @saved="fetchConfigs"
    />
  </div>
</template>

<script>
import AddConfiguration from "./AddConfiguration.vue";
import EditConfiguration from "./EditConfiguration.vue";

export default {
  components: { AddConfiguration, EditConfiguration },
  data() {
    return {
      configs: [],
      showAdd: false,
      showEdit: false,
      selectedConfig: null,
    };
  },
  methods: {
    async fetchConfigs() {
      try {
        const res = await this.$apiGet("/get_configurations");
        this.configs = res.data || [];
      } catch (err) {
        console.error(err);
      }
    },
    openEdit(item) {
      this.selectedConfig = item;
      this.showEdit = true;
    },
    async deleteConfig(id) {
      if (!confirm("Are you sure?")) return;
      try {
        await this.$apiDelete(`/delete_configuration/${id}/`);
        this.fetchConfigs();
      } catch (err) {
        console.error(err);
      }
    },
  },
  mounted() {
    this.fetchConfigs();
  },
};
</script>
