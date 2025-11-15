<template>
  <div class="p-6 bg-white rounded-lg  text-sm text-gray-800">
    <!-- Header -->
    <div class="flex items-center justify-between mb-5">
      <h1 class="text-xl font-bold text-gray-700">Training Packages Management</h1>
      <button @click="showAdd=true" class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-md transition duration-150 transform hover:scale-[1.01]">
        + Add Training Package
      </button>
    </div>

    <!-- Search + Page Size -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
      <input v-model="searchQuery" @input="fetchTrainingPackages(1)" type="text" placeholder="Search by Training or Package..."
        class="border border-gray-300 rounded-xl px-3 py-1.5 text-xs w-full sm:w-80 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-150"/>
      <div class="flex items-center gap-2 text-xs text-gray-600">
        <label>Show</label>
        <select v-model="pageSize" @change="fetchTrainingPackages(1)" class="border border-gray-300 rounded-lg px-2 py-1 text-xs focus:ring-1 focus:ring-green-400">
          <option v-for="size in [1,5,10,20,100]" :key="size" :value="size">{{ size }}</option>
        </select>
        <span>entries</span>
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto border border-gray-200 rounded-xl ">
      <table class="min-w-full text-xs hidden sm:table">
        <thead class="bg-gray-100 border-b border-gray-200 text-gray-600 uppercase text-[11px] tracking-wider">
          <tr>
            <th class="px-4 py-3 text-left font-medium">#</th>
            <th class="px-4 py-3 text-left font-medium">Training</th>
            <th class="px-4 py-3 text-left font-medium">Package</th>
            <th class="px-4 py-3 text-left font-medium">Created On</th>
            <th class="px-4 py-3 text-left font-medium">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-100">
          <tr v-for="(tp,index) in trainingPackages" :key="tp.id" class="hover:bg-green-50/50 transition duration-100">
            <td class="px-4 py-3">{{ (currentPage-1)*pageSize + index + 1 }}</td>
            <td class="px-4 py-3 font-medium">{{ getTrainingName(tp.training) }}</td>
            <td class="px-4 py-3">{{ getPackageName(tp.package) }}</td>
            <td class="px-4 py-3 text-gray-500">{{ formatDate(tp.created_at) }}</td>
            <td class="px-4 py-3 space-x-2">
              <button title="Edit" class="text-green-600 hover:text-green-800 text-base" @click="openEdit(tp)">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-9-4l9-9m-7 7l-2 2" />
                </svg>
              </button>
              <button title="Delete" class="text-red-500 hover:text-red-700 text-base" @click="deleteTrainingPackage(tp.id)">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </td>
          </tr>
          <tr v-if="trainingPackages.length===0">
            <td colspan="5" class="text-center py-4 text-gray-400">No training packages found.</td>
          </tr>
        </tbody>
      </table>

      <!-- Mobile List -->
      <div class="sm:hidden flex flex-col gap-3 p-3">
        <div v-for="(tp,index) in trainingPackages" :key="tp.id" class="border border-gray-200 rounded-lg p-3 bg-white shadow-sm">
          <div class="flex justify-between items-start">
            <div>
              <p class="font-bold text-gray-700">{{ getTrainingName(tp.training) }}</p>
              <p class="text-gray-500 text-[11px] mt-0.5">Package: {{ getPackageName(tp.package) }}</p>
              <p class="text-gray-500 text-[11px]">Created: {{ formatDate(tp.created_at) }}</p>
            </div>
            <div class="flex space-x-2 pt-1">
              <button title="Edit" class="text-green-600 hover:text-green-800 text-base" @click="openEdit(tp)">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-9-4l9-9m-7 7l-2 2" />
                </svg>
              </button>
              <button title="Delete" class="text-red-500 hover:text-red-700 text-base" @click="deleteTrainingPackage(tp.id)">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div class="flex items-center justify-between mt-5 text-xs text-gray-600">
      <span>Showing {{ (currentPage-1)*pageSize + 1 }} to {{ Math.min(currentPage*pageSize, count) }} of {{ count }} total entries</span>
      <div class="flex items-center gap-2">
        <button @click="fetchTrainingPackages(currentPage-1)" :disabled="!previousPage" 
                class="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 transition duration-150">
          &laquo; Previous
        </button>
        <button @click="fetchTrainingPackages(currentPage+1)" :disabled="!nextPage" 
                class="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 transition duration-150">
          Next &raquo;
        </button>
      </div>
    </div>

    <!-- Modals -->
    <AddTrainingPackage v-if="showAdd" :trainings="trainings" :packages="packages" @close="showAdd=false" @saved="fetchTrainingPackages"/>
    <EditTrainingPackage v-if="showEdit" :trainings="trainings" :packages="packages" :trainingPackage="selectedTP" @close="showEdit=false" @saved="fetchTrainingPackages"/>
  </div>
</template>

<script>
import AddTrainingPackage from './AddTrainingPackage.vue';
import EditTrainingPackage from './EditTrainingPackage.vue';

export default {
  components:{ AddTrainingPackage, EditTrainingPackage },
  data(){
    return {
      trainingPackages: [],
      trainings: [],
      packages: [],
      count:0,
      totalPages:1,
      currentPage:1,
      pageSize:10,
      nextPage:null,
      previousPage:null,
      searchQuery:'',
      showAdd:false,
      showEdit:false,
      selectedTP:null
    };
  },
  methods:{
    async fetchTrainingPackages(page=1){
      try{
        const params={page, page_size:this.pageSize, search:this.searchQuery||undefined};
        const res = await this.$apiGet('/get_training_packages', params);
        this.trainingPackages = res.data || [];
        this.count = res.count;
        this.totalPages = res.total_pages;
        this.currentPage = res.current_page;
        this.nextPage = res.next;
        this.previousPage = res.previous;
      }catch(err){ console.error(err); }
    },
    async fetchTrainings(){ 
        try {
            const res=await this.$apiGet('/get_trainings',{page_size:100}); 
            this.trainings=res.data||[]; 
        } catch(err) { console.error("Error fetching trainings:", err); }
    },
    async fetchPackages(){ 
        try {
            const res=await this.$apiGet('/get_packages',{page_size:100}); 
            this.packages=res.data||[]; 
        } catch(err) { console.error("Error fetching packages:", err); }
    },
    getTrainingName(id){ const t=this.trainings.find(t=>t.id===id); return t?t.name:'N/A'; },
    getPackageName(id){ const p=this.packages.find(p=>p.id===id); return p?p.name:'N/A'; },
    openEdit(tp){ this.selectedTP=tp; this.showEdit=true; },
    async deleteTrainingPackage(id){
        // NOTE: A custom confirmation modal should be implemented here in a production environment.
        // Proceeding directly to deletion for quick prototyping/demo purposes.
      try{ 
            const res=await this.$apiDelete(`/delete_training_package`,id); 
           if(res){
              this.$root.$refs.toast.showToast("Training package successfully deleted", "success");
            } 
            this.fetchTrainingPackages(this.currentPage); 
      }
      catch(err){ 
            console.error(err); 
            this.$root.$refs.toast.showToast("Training package deletion failed", "error");
      }
    },
    formatDate(dateStr){ 
        if (!dateStr) return 'N/A';
        return new Date(dateStr).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }
  },
  mounted(){
    this.fetchTrainings();
    this.fetchPackages();
    this.fetchTrainingPackages();
  }
};
</script>