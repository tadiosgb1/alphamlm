<template>
  <div class="p-4 text-sm text-gray-800">
    <!-- Header -->
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-lg font-semibold">Training Packages</h1>
      <button @click="showAdd=true" class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-xs">
        + Add Training Package
      </button>
    </div>

    <!-- Search + Page Size -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
      <input v-model="searchQuery" @input="fetchTrainingPackages(1)" type="text" placeholder="Search..."
        class="border rounded-md px-2 py-1 text-xs w-full sm:w-64 focus:outline-none focus:ring-1 focus:ring-blue-400"/>
      <div class="flex items-center gap-2 text-xs">
        <label>Show</label>
        <select v-model="pageSize" @change="fetchTrainingPackages(1)" class="border rounded-md px-1 py-0.5 text-xs">
          <option v-for="size in [1,5,10,20,100]" :key="size" :value="size">{{ size }}</option>
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
            <th class="px-3 py-2 text-left">Training</th>
            <th class="px-3 py-2 text-left">Package</th>
            <th class="px-3 py-2 text-left">Created</th>
            <th class="px-3 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white">
          <tr v-for="(tp,index) in trainingPackages" :key="tp.id" class="border-t hover:bg-gray-50">
            <td class="px-3 py-2">{{ (currentPage-1)*pageSize + index + 1 }}</td>
            <td class="px-3 py-2">{{ getTrainingName(tp.training) }}</td>
            <td class="px-3 py-2">{{ getPackageName(tp.package) }}</td>
            <td class="px-3 py-2 text-gray-500">{{ formatDate(tp.created_at) }}</td>
            <td class="px-3 py-2">
              <button class="text-blue-500 hover:text-blue-700 mr-2" @click="openEdit(tp)">✎</button>
              <button class="text-red-500 hover:text-red-700" @click="deleteTrainingPackage(tp.id)">🗑</button>
            </td>
          </tr>
          <tr v-if="trainingPackages.length===0">
            <td colspan="5" class="text-center py-3 text-gray-400">No training packages found.</td>
          </tr>
        </tbody>
      </table>

      <!-- Mobile List -->
      <div class="sm:hidden flex flex-col gap-2">
        <div v-for="(tp,index) in trainingPackages" :key="tp.id" class="border rounded p-2 bg-white shadow-sm">
          <div class="flex justify-between items-center">
            <div>
              <p class="font-medium">{{ getTrainingName(tp.training) }}</p>
              <p class="text-gray-500 text-[11px]">Package: {{ getPackageName(tp.package) }}</p>
              <p class="text-gray-500 text-[11px]">Created: {{ formatDate(tp.created_at) }}</p>
            </div>
            <div>
              <button class="text-blue-500 hover:text-blue-700 mr-2" @click="openEdit(tp)">✎</button>
              <button class="text-red-500 hover:text-red-700" @click="deleteTrainingPackage(tp.id)">🗑</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div class="flex items-center justify-between mt-4 text-xs">
      <span>Page {{ currentPage }} of {{ totalPages }} ({{ count }} total)</span>
      <div class="flex items-center gap-1">
        <button @click="fetchTrainingPackages(currentPage-1)" :disabled="!previousPage" class="px-2 py-1 border rounded hover:bg-gray-100 disabled:opacity-50">◀ Prev</button>
        <button @click="fetchTrainingPackages(currentPage+1)" :disabled="!nextPage" class="px-2 py-1 border rounded hover:bg-gray-100 disabled:opacity-50">Next ▶</button>
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
    async fetchTrainings(){ const res=await this.$apiGet('/get_trainings',{page_size:100}); this.trainings=res.data||[]; },
    async fetchPackages(){ const res=await this.$apiGet('/get_packages',{page_size:100}); this.packages=res.data||[]; },
    getTrainingName(id){ const t=this.trainings.find(t=>t.id===id); return t?t.name:'N/A'; },
    getPackageName(id){ const p=this.packages.find(p=>p.id===id); return p?p.name:'N/A'; },
    openEdit(tp){ this.selectedTP=tp; this.showEdit=true; },
    async deleteTrainingPackage(id){
      if(!confirm('Are you sure?')) return;
      try{ await this.$apiDelete(`/delete_training_package/${id}/`); this.fetchTrainingPackages(this.currentPage); }
      catch(err){ console.error(err); }
    },
    formatDate(dateStr){ return new Date(dateStr).toLocaleDateString(); }
  },
  mounted(){
    this.fetchTrainings();
    this.fetchPackages();
    this.fetchTrainingPackages();
  }
};
</script>
