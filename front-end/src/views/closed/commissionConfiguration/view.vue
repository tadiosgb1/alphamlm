<template>
  <div class=" bg-gray-50 min-h-screen text-base text-gray-800">
    <div class="max-w-7xl mx-auto bg-white  rounded-md overflow-hidden border border-gray-200 p-4">

      <div class="flex items-center justify-between border-b pb-4 mb-4 border-gray-200">
        <h1 class="text-xl font-semibold text-gray-800">Commission Configurations</h1>
        
        <button
          @click="openAddModal"
          class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md transition duration-150 flex items-center"
        >
          + Add Configuration
        </button>
      </div>

      <div class="hidden sm:block overflow-x-auto border border-gray-200 rounded-lg">
        <table class="min-w-full text-sm divide-y divide-gray-200">
          <thead class="bg-gray-100">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">#</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Direct Bonus</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Indirect Bonus</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Rank Achievement</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Unilevel Bonus</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Loyality Bonus</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="(item, index) in configurations"
              :key="item.id"
              class="hover:bg-gray-50 transition duration-150"
            >
              <td class="px-6 py-3 whitespace-nowrap">{{ index + 1 }}</td>
              <td class="px-6 py-3 whitespace-nowrap">{{ item.direct_bonus }}</td>
              <td class="px-6 py-3 whitespace-nowrap">{{ item.indirect_bonus }}</td>
              <td class="px-6 py-3 whitespace-nowrap">{{ item.rank_achievement }}</td>
              <td class="px-6 py-3 whitespace-nowrap">{{ item.unilevel_bonus }}</td>
              <td class="px-6 py-3 whitespace-nowrap">{{ item.loyality_bonus }}</td>
              <td class="px-6 py-3 whitespace-nowrap flex gap-3">
                <button
                  @click="editConfiguration(item)"
                  class="text-green-500 hover:text-green-700 transition duration-150"
                  title="Edit"
                >
                  <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button
                  @click="askDeleteConfirmation(item)"
                  class="text-red-500 hover:text-red-700 transition duration-150"
                  title="Delete"
                >
                  <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </td>
            </tr>

            <tr v-if="configurations.length === 0">
              <td colspan="7" class="text-center py-8 text-gray-400 italic">
                No configurations found.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="block sm:hidden space-y-4">
        <div
          v-for="(item, index) in configurations"
          :key="item.id"
          class="bg-white border border-gray-200 rounded-lg shadow-sm p-4 divide-y divide-gray-100"
        >
          <div class="flex justify-between items-center pb-2">
            <h2 class="font-bold text-gray-800">Config #{{ index + 1 }}</h2>
            <div class="flex gap-3">
              <button
                @click="editConfiguration(item)"
                class="text-green-500 hover:text-green-700 transition duration-150"
                title="Edit"
              >
                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button
                @click="askDeleteConfirmation(item)"
                class="text-red-500 hover:text-red-700 transition duration-150"
                title="Delete"
              >
                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-y-2 text-sm pt-2">
            <div><span class="font-medium text-gray-600">Direct Bonus:</span> <span class="text-gray-900">{{ item.direct_bonus }}</span></div>
            <div><span class="font-medium text-gray-600">Indirect Bonus:</span> <span class="text-gray-900">{{ item.indirect_bonus }}</span></div>
            <div><span class="font-medium text-gray-600">Rank Achievement:</span> <span class="text-gray-900">{{ item.rank_achievement }}</span></div>
            <div><span class="font-medium text-gray-600">Unilevel Bonus:</span> <span class="text-gray-900">{{ item.unilevel_bonus }}</span></div>
            <div><span class="font-medium text-gray-600">Loyality Bonus:</span> <span class="text-gray-900">{{ item.loyality_bonus }}</span></div>
          </div>
        </div>

        <div v-if="configurations.length === 0" class="text-center py-6 text-gray-400 italic">
          No configurations found.
        </div>
      </div>
    </div>

    <CommissionConfigurationAdd
      v-if="showAddModal"
      @close="showAddModal = false; fetchConfigurations()"
    />
    <CommissionConfigurationEdit
      v-if="showEditModal"
      :configuration="selectedConfiguration"
      @close="showEditModal = false; fetchConfigurations()"
    />

    <ConfirmModal
      v-if="confirmVisible"
      :visible="confirmVisible"
      title="Confirm Deletion"
      message="Are you sure you want to delete this commission configuration?"
      @confirm="confirmDelete"
      @cancel="confirmVisible = false"
    />
  </div>
</template>

<script>
import CommissionConfigurationAdd from "./CommissionConfigurationAdd.vue";
import CommissionConfigurationEdit from "./CommissionConfigurationEdit.vue";
import ConfirmModal from "@/components/ConfirmModal.vue";

export default {
  components: { CommissionConfigurationAdd, CommissionConfigurationEdit,ConfirmModal },
  data() {
    return {
      configurations: [],
      showAddModal: false,
      showEditModal: false,
      selectedConfiguration: null,
      CommissionconfigurationToDelete :null,
      confirmVisible:null
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
     askDeleteConfirmation(Commissionconfiguration) {
      this.CommissionconfigurationToDelete = Commissionconfiguration;
      this.confirmVisible = true;
    },
     async confirmDelete() {
      this.confirmVisible = false;
      try {
        const res = await this.$apiDelete(
          `/delete_commission_configuration/${this.CommissionconfigurationToDelete.id}`
        );
        if (res && res.error){
      this.$root.$refs.toast.showToast(res.error || "Failed to delete property", "error");

        } else{
        this.$root.$refs.toast.showToast(res.message, "success");
        await this.fetchConfigurations();
        }
      } catch (err) {
        console.error(err);
       this.$root.$refs.toast.showToast("Failed to delete property", "error");
      }
      this.CommissionconfigurationToDelete = null;
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
/* Ensure table cells do not wrap for better alignment in the desktop view */
table th, table td { white-space: nowrap; }
</style>