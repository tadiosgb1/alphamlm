<template>
  <div class="p-4 bg-gray-50 min-h-screen text-sm text-gray-800">
    <div class="flex items-center justify-between mb-4 border-b pb-3 border-gray-200">
      <h1 class="text-xl font-bold text-gray-800">Trainings</h1>
      <button @click="showAdd=true" 
        class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md transition duration-150 flex items-center space-x-1"
      >
        <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        <span>Add Training</span>
      </button>
    </div>

    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
      <input 
        v-model="searchQuery" 
        @input="fetchTrainings(1)" 
        type="text" 
        placeholder="Search by name..."
        class="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm transition duration-150"
      />
      <div class="flex items-center gap-2 text-sm text-gray-600">
        <label>Show</label>
        <select v-model="pageSize" @change="fetchTrainings(1)" 
          class="border border-gray-300 rounded-lg px-2 py-1 text-sm bg-white focus:ring-green-500 focus:border-green-500"
        >
          <option v-for="size in [1,5,10,20,100]" :key="size" :value="size">{{ size }}</option>
        </select>
        <span>entries</span>
      </div>
    </div>

    <div class="bg-white  overflow-hidden rounded-xl border border-gray-200">
      <div class="overflow-x-auto">
        <table class="min-w-full text-sm hidden sm:table">
          <thead class="bg-gray-100 text-gray-700 uppercase text-xs font-semibold">
            <tr>
              <th class="px-6 py-3 text-left">#</th>
              <th class="px-6 py-3 text-left">Name</th>
              <th class="px-6 py-3 text-left">Price</th>
              <th class="px-6 py-3 text-left">Cost</th>
              <th class="px-6 py-3 text-left">Created</th>
              <th class="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="(training,index) in trainings" :key="training.id" 
              class="hover:bg-green-50 transition duration-150"
            >
              <td class="px-6 py-4 whitespace-nowrap">{{ (currentPage-1)*pageSize + index + 1 }}</td>
              <td class="px-6 py-4 whitespace-nowrap font-semibold">{{ training.name }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-gray-600">{{ training.price }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-gray-600">{{ training.cost }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-gray-500">{{ formatDate(training.created_at) }}</td>
              <td class="px-6 py-4 whitespace-nowrap space-x-3">
                <button 
                  class="text-green-500 hover:text-green-700 transition duration-150" 
                  @click="openEdit(training)" 
                  title="Edit"
                >
                  <svg class="h-5 w-5 inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                </button>
                <button 
                  class="text-red-500 hover:text-red-700 transition duration-150" 
                  @click="deleteTraining(training.id)" 
                  title="Delete"
                >
                  <svg class="h-5 w-5 inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </td>
            </tr>
            <tr v-if="trainings.length===0">
              <td colspan="6" class="text-center py-6 text-gray-400 italic">No trainings found.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="sm:hidden flex flex-col gap-2 p-4">
        <div v-for="(training,index) in trainings" :key="training.id" 
          class="border border-gray-200 rounded-lg p-3 bg-white shadow-sm hover:bg-green-50 transition duration-150"
        >
          <div class="flex justify-between items-start">
            <span class="font-bold text-gray-800">{{ training.name }}</span>
            <div class="flex gap-3 text-sm">
              <button class="text-green-500 hover:text-green-700" @click="openEdit(training)">
                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
              </button>
              <button class="text-red-500 hover:text-red-700" @click="deleteTraining(training.id)">
                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              </button>
            </div>
          </div>
          <p class="text-gray-500 text-xs mt-2 pt-2 border-t border-gray-100">
            <span class="font-medium">Price:</span> {{ training.price }}, 
            <span class="font-medium">Cost:</span> {{ training.cost }}
          </p>
          <p class="text-gray-500 text-xs mt-1">
            <span class="font-medium">Created:</span> {{ formatDate(training.created_at) }}
          </p>
          <p class="text-xs text-gray-500 mt-1">#{{ (currentPage-1)*pageSize + index + 1 }}</p>
        </div>
        <div v-if="trainings.length === 0" class="text-center py-4 text-gray-400 italic">No trainings found.</div>
      </div>
    </div>

    <div class="flex items-center justify-between mt-6 text-sm text-gray-600">
      <span>Showing {{ (currentPage - 1) * pageSize + 1 }} to {{ Math.min(currentPage * pageSize, count) }} of {{ count }} total entries</span>
      <div class="flex items-center gap-2">
        <button @click="fetchTrainings(currentPage-1)" :disabled="!previousPage" 
          class="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 text-xs"
        >
          &larr; Prev
        </button>
        <span class="px-3 py-1 bg-green-600 text-white rounded-lg font-medium text-xs">{{ currentPage }}</span>
        <button @click="fetchTrainings(currentPage+1)" :disabled="!nextPage" 
          class="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 text-xs"
        >
          Next &rarr;
        </button>
      </div>
    </div>

    <AddTraining v-if="showAdd" @close="showAdd=false" @saved="fetchTrainings"/>
    <EditTraining v-if="showEdit" :training="selectedTraining" @close="showEdit=false" @saved="fetchTrainings"/>
  </div>
</template>

<script>
import AddTraining from './AddTraining.vue';
import EditTraining from './EditTraining.vue';

export default {
  components:{ AddTraining, EditTraining },
  data(){
    return {
      trainings: [],
      count:0,
      totalPages:1,
      currentPage:1,
      pageSize:10,
      nextPage:null,
      previousPage:null,
      searchQuery:'',
      showAdd:false,
      showEdit:false,
      selectedTraining:null
    };
  },
  methods:{
    async fetchTrainings(page=1){
      try{
        const params = { page, page_size:this.pageSize, search:this.searchQuery || undefined };
        const res = await this.$apiGet('/get_trainings', params);
        this.trainings = res.data || res.results || [];
        this.count = res.count || this.trainings.length;
        this.totalPages = res.total_pages || 1;
        this.currentPage = res.current_page || page;
        this.nextPage = !!res.next;
        this.previousPage = !!res.previous;
      }catch(err){ console.error(err); }
    },
    openEdit(training){ this.selectedTraining=training; this.showEdit=true; },
    async deleteTraining(id){
      if(!confirm('Are you sure you want to delete this training?')) return;
      try{
        // Assuming the API expects the ID in the path for DELETE
        const res= await this.$apiDelete(`/delete_training/${id}`); 
        if(res){
           this.$root.$refs.toast.showToast("Training successfully deleted", "success");
        } 
        this.fetchTrainings(this.currentPage); 
      }
      catch(err){ 
            console.error(err);
            this.$root.$refs.toast.showToast("Training deletion failed", "error");
       }
    },
    formatDate(dateStr){ 
        if (!dateStr) return '-';
        try {
            return new Date(dateStr).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        } catch {
            return dateStr;
        }
    }
  },
  mounted(){ this.fetchTrainings(); }
};
</script>

<style scoped>
/* Standardizing table layout */
.overflow-x-auto table th, .overflow-x-auto table td { white-space: nowrap; }
</style>