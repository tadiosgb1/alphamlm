<template>
  <div class=" bg-gray-50 min-h-screen text-base text-gray-800">
    <Toast ref="toast"/>
    <div class="max-w-7xl mx-auto bg-white  rounded-md overflow-hidden border border-gray-200 p-4">
      
      <div class="flex items-center justify-between border-b pb-4 mb-4 border-gray-200">
        <h1 class="text-xl font-semibold text-gray-800">System Configuration</h1>
        
        <button
          @click="showAdd = true"
          class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md transition duration-150 flex items-center"
        >
          + Add Configuration
        </button>
      </div>

      <div class="overflow-x-auto hidden md:block border border-gray-200 rounded-lg">
        <table class="min-w-full text-sm divide-y divide-gray-200">
          <thead class="bg-gray-100">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">#</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Investment</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Housing/Car</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">SACCO</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Service Charge</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="(item, index) in configs"
              :key="item.id"
              class="hover:bg-gray-50 transition duration-150"
            >
              <td class="px-6 py-3 whitespace-nowrap">{{ index + 1 }}</td>
              <td class="px-6 py-3 whitespace-nowrap">{{ item.investment_amount }}</td>
              <td class="px-6 py-3 whitespace-nowrap">{{ item.housing_or_car_investment }}</td>
              <td class="px-6 py-3 whitespace-nowrap">{{ item.sacco }}</td>
              <td class="px-6 py-3 whitespace-nowrap">{{ item.service_charge }}</td>
              <td class="px-6 py-3 whitespace-nowrap flex gap-3">
                <button
                  class="text-green-500 hover:text-green-700 transition duration-150"
                  @click="openEdit(item)"
                  title="Edit"
                >
                  <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button
                  class="text-red-500 hover:text-red-700 transition duration-150"
                  @click="askDeleteConfirmation(item)"
                  title="Delete"
                >
                  <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </td>
            </tr>
            <tr v-if="configs.length === 0">
              <td colspan="6" class="text-center py-8 text-gray-400 italic">
                No configurations found.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="md:hidden space-y-4">
        <div
          v-for="(item, index) in configs"
          :key="item.id"
          class="bg-white border border-gray-200 rounded-lg shadow-sm p-4 divide-y divide-gray-100"
        >
          <div class="flex justify-between items-center pb-2">
            <h2 class="font-bold text-gray-800">Configuration #{{ index + 1 }}</h2>
            <div class="flex gap-3">
              <button
                class="text-green-500 hover:text-green-700 transition duration-150"
                @click="openEdit(item)"
                title="Edit"
              >
                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button
                class="text-red-500 hover:text-red-700 transition duration-150"
                @click="askDeleteConfirmation(item)"
                title="Delete"
              >
                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-y-2 text-sm pt-2">
            <div><span class="font-medium text-gray-600">Investment:</span> <span class="text-gray-900">{{ item.investment_amount }}</span></div>
            <div><span class="font-medium text-gray-600">Housing/Car:</span> <span class="text-gray-900">{{ item.housing_or_car_investment }}</span></div>
            <div><span class="font-medium text-gray-600">SACCO:</span> <span class="text-gray-900">{{ item.sacco }}</span></div>
            <div><span class="font-medium text-gray-600">Service Charge:</span> <span class="text-gray-900">{{ item.service_charge }}</span></div>
          </div>
        </div>

        <p v-if="configs.length === 0" class="text-center text-gray-400 py-6 italic">
          No configurations found.
        </p>
      </div>
    </div>

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

    <ConfirmModal
      v-if="confirmVisible"
      :visible="confirmVisible"
      title="Confirm Deletion"
      message="Are you sure you want to delete this system configuration?"
      @confirm="confirmDelete"
      @cancel="confirmVisible = false"
    />
  </div>
</template>

<script>
import AddConfiguration from "./AddConfiguration.vue";
import EditConfiguration from "./EditConfiguration.vue";
import ConfirmModal from "@/components/ConfirmModal.vue";

export default {
  components: { AddConfiguration, EditConfiguration,ConfirmModal },
  data() {
    return {
      configs: [],
      showAdd: false,
      showEdit: false,
      selectedConfig: null,
      systemconfigurationToDelete:null,
      confirmVisible:null
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
    askDeleteConfirmation(systemconfiguration) {
      this.systemconfigurationToDelete = systemconfiguration;
      this.confirmVisible = true;
    },
    async confirmDelete() {
      this.confirmVisible = false;
      try {
        const res = await this.$apiDelete(
          `/delete_configuration/${this.systemconfigurationToDelete.id}`
        );
        if (res && res.error){
      this.$root.$refs.toast.showToast(res.error || "Failed to delete property", "error");

        } else{
        this.$root.$refs.toast.showToast(res.message, "success");
        await this.fetchConfigs();
        }
      } catch (err) {
        console.error(err);
       this.$root.$refs.toast.showToast("Failed to delete property", "error");
      }
      this.systemconfigurationToDelete = null;
    },
  },
  mounted() {
    this.fetchConfigs();
  },
};
</script>