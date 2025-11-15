<template>
  <div class=" bg-gray-50 min-h-screen text-base text-gray-800">
    <div class="max-w-7xl mx-auto bg-white rounded-md overflow-hidden border border-gray-200 p-4">

      <div class="flex items-center justify-between border-b pb-4 mb-4 border-gray-200">
        <h1 class="text-xl font-semibold text-gray-800">Unilevel Configurations</h1>
        
        <button
          @click="showAdd = true"
          class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md transition duration-150 flex items-center"
        >
          + Add Configuration
        </button>
      </div>

      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
        <input
          v-model="searchQuery"
          @input="fetchConfigurations(1)"
          type="text"
          placeholder="Search by level or category..."
          class="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full sm:w-80 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm transition duration-150"
        />
        <div class="flex items-center gap-2 text-sm">
          <label class="text-gray-600 font-medium">Show</label>
          <select v-model="pageSize" @change="fetchConfigurations(1)" class="border border-gray-300 rounded-lg px-2 py-1 text-sm focus:ring-green-500 focus:border-green-500">
            <option v-for="size in [1,5,10,20,50,100]" :key="size" :value="size">{{ size }}</option>
          </select>
          <span class="text-gray-600">entries</span>
        </div>
      </div>

      <div class="overflow-x-auto border border-gray-200 rounded-lg">
        <table class="min-w-full text-sm divide-y divide-gray-200 hidden sm:table">
          <thead class="bg-gray-100">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">#</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Level</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Percentage</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Category</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Created</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="(conf, index) in configurations" :key="conf.id" class="hover:bg-gray-50 transition duration-150">
              <td class="px-6 py-3 whitespace-nowrap">{{ (currentPage-1)*pageSize + index + 1 }}</td>
              <td class="px-6 py-3 whitespace-nowrap">{{ conf.level }}</td>
              <td class="px-6 py-3 whitespace-nowrap font-medium text-green-600">{{ conf.percentage }}%</td>
              <td class="px-6 py-3 whitespace-nowrap">{{ conf.category }}</td>
              <td class="px-6 py-3 whitespace-nowrap text-gray-500">{{ new Date(conf.created_at).toLocaleDateString() }}</td>
              <td class="px-6 py-3 whitespace-nowrap flex gap-3">
                <button @click="openEditModal(conf)" class="text-green-500 hover:text-green-700 transition duration-150" title="Edit">
                  <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button @click=" askDeleteConfirmation(conf)" class="text-red-500 hover:text-red-700 transition duration-150" title="Delete">
                  <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </td>
            </tr>
            <tr v-if="configurations.length===0">
              <td colspan="6" class="text-center py-8 text-gray-400 italic">No configurations found.</td>
            </tr>
          </tbody>
        </table>

        <div class="sm:hidden space-y-3 p-4">
          <div v-for="conf in configurations" :key="conf.id" class="border border-gray-200 rounded-lg p-3 bg-white shadow-sm">
            <div class="flex justify-between items-start mb-2 border-b pb-2">
              <span class="font-bold text-gray-800">Level {{ conf.level }}</span>
              <div class="flex gap-3 text-sm">
                <button @click="openEditModal(conf)" class="text-green-500 hover:text-green-700 font-medium flex items-center gap-1">
                    <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                    Edit
                </button>
                <button @click=" askDeleteConfirmation(conf)" class="text-red-500 hover:text-red-700 font-medium flex items-center gap-1">
                    <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    Delete
                </button>
              </div>
            </div>
            
            <div class="space-y-1 text-sm pt-2">
              <div><span class="font-medium text-gray-600">Percentage:</span> <span class="font-bold text-green-600">{{ conf.percentage }}%</span></div>
              <div><span class="font-medium text-gray-600">Category:</span> {{ conf.category }}</div>
              <div class="text-gray-500"><span class="font-medium text-gray-600">Created:</span> {{ new Date(conf.created_at).toLocaleDateString() }}</div>
            </div>
          </div>
           <div v-if="configurations.length === 0" class="text-center py-6 text-gray-400 italic">
              No configurations found.
           </div>
        </div>
      </div>

      <div class="flex flex-col sm:flex-row items-center justify-between mt-4 text-sm gap-2">
        <span class="text-gray-600">Showing page **{{ currentPage }}** of **{{ totalPages }}** ({{ totalCount }} total entries)</span>
        <div class="flex items-center gap-1">
          <button 
            @click="fetchConfigurations(currentPage - 1)" 
            :disabled="!previousPage" 
            class="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium transition duration-150"
          >
            &lt; Previous
          </button>
          <button 
            @click="fetchConfigurations(currentPage + 1)" 
            :disabled="!nextPage" 
            class="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium transition duration-150"
          >
            Next &gt;
          </button>
        </div>
      </div>
    </div>

    <UnilevelAdd v-if="showAdd" @close="showAdd=false; fetchConfigurations()" />
    <UnilevelEdit v-if="showEdit" :configuration="selectedConfiguration" @close="showEdit=false; fetchConfigurations()" />

    <ConfirmModal
        v-if="confirmVisible"
        :visible="confirmVisible"
        title="Confirm Deletion"
        message="Are you sure you want to delete this unilevel configuration?"
        @confirm="confirmDelete"
        @cancel="confirmVisible = false"
      />
</div>
</template>

<script>
import UnilevelAdd from './UnilevelAdd.vue';
import UnilevelEdit from './UnilevelEdit.vue';
import ConfirmModal from "@/components/ConfirmModal.vue";

export default {
  components: { UnilevelAdd, UnilevelEdit,ConfirmModal },
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
      selectedConfiguration: null,
       unilevelconfigurationToDelete:null,
      confirmVisible:null
    };
  },
  methods: {
    async fetchConfigurations(page = 1) {
      try {
        const params = { page, page_size: this.pageSize, search: this.searchQuery || undefined };
        const res = await this.$apiGet("/get_unilevel_configurations", params);
        const data = res.data || {};
        
        // This line is kept exactly as in your original script to avoid modifying API response handling
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
     askDeleteConfirmation(unilevelconfiguration) {
      this.unilevelconfigurationToDelete = unilevelconfiguration;
      this.confirmVisible = true;
    },
    async confirmDelete() {
      this.confirmVisible = false;
      try {
        const res = await this.$apiDelete(
          `/delete_unilevel_configuration/${this.unilevelconfigurationToDelete.id}`
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
      this.unilevelconfigurationToDelete = null;
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