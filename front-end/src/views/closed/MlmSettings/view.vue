<template>
  <div class=" bg-gray-50 min-h-screen text-base text-gray-800">
    <div class="max-w-7xl mx-auto bg-white  rounded-md overflow-hidden border border-gray-200 p-4">

      <div class="flex items-center justify-between border-b pb-4 mb-4 border-gray-200">
        <h1 class="text-xl font-semibold text-gray-800">MLM Settings</h1>
        
        <button
          @click="showAdd = true"
          class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md transition duration-150 flex items-center"
        >
          + Add Setting
        </button>
      </div>

      <div class="hidden sm:block overflow-x-auto border border-gray-200 rounded-lg">
        <table class="min-w-full text-sm divide-y divide-gray-200">
          <thead class="bg-gray-100">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">#</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Max Level</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Min Withdrawal</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Payout Frequency</th>
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
              <td class="px-6 py-3 whitespace-nowrap">{{ item.max_level }}</td>
              <td class="px-6 py-3 whitespace-nowrap font-medium text-gray-900">{{ item.business_volume_amount_in_sales }}</td>
              <td class="px-6 py-3 whitespace-nowrap">{{ item.payout_frequency }} days</td>
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

            <tr v-if="settings.length === 0">
              <td colspan="5" class="text-center py-8 text-gray-400 italic">
                No settings found.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="block sm:hidden space-y-3">
        <div
          v-for="(item, index) in settings"
          :key="item.id"
          class="border border-gray-200 rounded-lg p-4 bg-white shadow-sm"
        >
          <div class="flex justify-between items-start mb-2 border-b pb-2">
            <span class="text-lg font-bold text-gray-800">Setting #{{ index + 1 }}</span>
            <div class="flex gap-3 text-sm">
              <button
                @click="openEdit(item)"
                class="text-green-500 hover:text-green-700 font-medium flex items-center gap-1"
                title="Edit"
              >
                 <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                 Edit
              </button>
              <button
                @click="askDeleteConfirmation(item)"
                class="text-red-500 hover:text-red-700 font-medium flex items-center gap-1"
                title="Delete"
              >
                <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                Delete
              </button>
            </div>
          </div>

          <div class="text-sm space-y-1">
            <div><span class="font-medium text-gray-600">Max Level:</span> <span class="font-bold">{{ item.max_level }}</span></div>
            <div><span class="font-medium text-gray-600">Min Withdrawal:</span> <span class="font-bold">{{ item.business_volume_amount_in_sales}}</span></div>
            <div><span class="font-medium text-gray-600">Payout Frequency:</span> {{ item.payout_frequency }} days</div>
          </div>
        </div>

        <div v-if="settings.length === 0" class="text-center py-6 text-gray-400 italic">
          No settings found.
        </div>
      </div>

      <AddMlmSetting
        v-if="showAdd"
        @close="showAdd = false"
        @saved="fetchSettings"
      />
      <EditMlmSetting
        v-if="showEdit"
        :setting="selectedSetting"
        @close="showEdit = false"
        @saved="fetchSettings"
      />

      <ConfirmModal
          v-if="confirmVisible"
          :visible="confirmVisible"
          title="Confirm Deletion"
          message="Are you sure you want to delete this MLM settings?"
          @confirm="confirmDelete"
          @cancel="confirmVisible = false"
        />
    </div>
  </div>
</template>

<script>
import AddMlmSetting from "./AddMlmSetting.vue";
import EditMlmSetting from "./EditMlmSetting.vue";
import ConfirmModal from "@/components/ConfirmModal.vue";

export default {
  components: { AddMlmSetting, EditMlmSetting,ConfirmModal },
  data() {
    return {
      settings: [],
      showAdd: false,
      showEdit: false,
      selectedSetting: null,
       mlmsettingsToDelete:null,
      confirmVisible:null
    };
  },
  methods: {
    async fetchSettings() {
      try {
        const res = await this.$apiGet("/get_mlm_settings");
        this.settings = res.data || [];

        console.log("mlm settings",res)
      } catch (err) {
        console.error(err);
        this.settings = [];
      }
    },
    openEdit(item) {
      this.selectedSetting = item;
      this.showEdit = true;
    },
     askDeleteConfirmation(mlmsettings) {
      this.mlmsettingsToDelete = mlmsettings;
      this.confirmVisible = true;
    },
     async confirmDelete() {
      this.confirmVisible = false;
      try {
        const res = await this.$apiDelete(
          `/delete_mlm_setting/${this.mlmsettingsToDelete.id}`
        );
        if (res && res.error){
      this.$root.$refs.toast.showToast(res.error || "Failed to delete property", "error");

        } else{
        this.$root.$refs.toast.showToast(res.message, "success");
        await this.fetchSettings();
        }
      } catch (err) {
        console.error(err);
       this.$root.$refs.toast.showToast("Failed to delete property", "error");
      }
      this.mlmsettingsToDelete = null;
    },
    async deleteSetting(id) {
        // This function is still here but the new confirmDelete is the primary path
      if (!confirm("Are you sure?")) return;
      try {
        await this.$apiDelete(`/delete_mlm_setting/${id}/`);
        this.fetchSettings();
      } catch (err) {
        console.error(err);
      }
    },
  },
  mounted() {
    this.fetchSettings();
  },
};
</script>

