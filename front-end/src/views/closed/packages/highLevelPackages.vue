<template>
  <div class="p-4 text-sm text-gray-800">
    <!-- Header -->
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-lg font-semibold">Packages</h1>
      <button @click="showAdd=true" class="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-lg text-xs shadow-md transition duration-150">
        + Add Package
      </button>
    </div>

    <!-- Search + Page Size -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
      <input v-model="searchQuery" @input="fetchPackages(1)" type="text" placeholder="Search by name..."
        class="border border-gray-300 rounded-lg px-3 py-1.5 text-xs w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm transition duration-150"/>
      <div class="flex items-center gap-2 text-xs">
        <label class="font-medium text-gray-600">Show</label>
        <select v-model="pageSize" @change="fetchPackages(1)" class="border border-gray-300 rounded-lg px-2 py-1 text-xs focus:ring-2 focus:ring-green-500">
          <option v-for="size in [1,5,10,20,100]" :key="size" :value="size">{{ size }}</option>
        </select>
        <span class="text-gray-600">entries</span>
      </div>
    </div>

    <!-- Table / List -->
    <div class="overflow-x-auto border rounded-xl ">
      <!-- Desktop Table -->
      <table class="min-w-full text-xs hidden sm:table">
        <thead class="bg-gray-100 text-gray-600 uppercase text-[11px] border-b">
          <tr>
            <th class="px-4 py-3 text-left">#</th>
            <th class="px-4 py-3 text-left">Name</th>
            <th class="px-4 py-3 text-left">Type</th>
            <th class="px-4 py-3 text-left">Price</th>
            <th class="px-4 py-3 text-left">Cost</th>
            <th class="px-4 py-3 text-left">Category</th>
            <th class="px-4 py-3 text-left">Created</th>
            <th class="px-4 py-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white">
          <tr v-for="(pkg,index) in packages" :key="pkg.id" class="border-t hover:bg-green-50/50 transition duration-100">
            <td class="px-4 py-3">{{ (currentPage-1)*pageSize + index + 1 }}</td>
            <td class="px-4 py-3 font-medium">{{ pkg.name }}</td>
            <td class="px-4 py-3">{{ pkg.package_type }}</td>
            <td class="px-4 py-3">{{ pkg.price }}</td>
            <td class="px-4 py-3">{{ pkg.cost }}</td>
            <td class="px-4 py-3">{{ getCategoryName(pkg.category) }}</td>
            <td class="px-4 py-3 text-gray-500">{{ formatDate(pkg.created_at) }}</td>
            <td class="px-4 py-3 whitespace-nowrap">
              <button class="text-green-500 hover:text-green-700 mr-3" @click="openEdit(pkg)" title="Edit">
                <!-- Icon: Pencil -->
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-7-7l4 4m-4-4l-4 4m1-11a2 2 0 012-2h4a2 2 0 012 2v4a2 2 0 01-2 2h-4a2 2 0 01-2-2v-4z" />
                </svg>
              </button>
              <button class="text-red-500 hover:text-red-700" @click="openDeleteConfirm(pkg.id)" title="Delete">
                <!-- Icon: Trash -->
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.86 12.89A2 2 0 0116.14 22H7.86a2 2 0 01-1.99-1.11L5 7m5 4v6m4-6v6m4-10H5a2 2 0 01-2-2V4a2 2 0 012-2h14a2 2 0 012 2v1a2 2 0 01-2 2z" />
                </svg>
              </button>
            </td>
          </tr>
          <tr v-if="packages.length===0">
            <td colspan="8" class="text-center py-5 text-gray-400">No packages found.</td>
          </tr>
        </tbody>
      </table>

      <!-- Mobile List -->
      <div class="sm:hidden flex flex-col gap-3 p-3">
        <div v-for="(pkg,index) in packages" :key="pkg.id" class="border border-gray-200 rounded-lg p-3 bg-white shadow-sm">
          <div class="flex justify-between items-start mb-1">
            <span class="font-semibold text-sm">{{ pkg.name }}</span>
            <div class="flex space-x-2">
              <button class="text-green-500 hover:text-green-700" @click="openEdit(pkg)" title="Edit">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-7-7l4 4m-4-4l-4 4m1-11a2 2 0 012-2h4a2 2 0 012 2v4a2 2 0 01-2 2h-4a2 2 0 01-2-2v-4z" /></svg>
              </button>
              <button class="text-red-500 hover:text-red-700" @click="openDeleteConfirm(pkg.id)" title="Delete">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.86 12.89A2 2 0 0116.14 22H7.86a2 2 0 01-1.99-1.11L5 7m5 4v6m4-6v6m4-10H5a2 2 0 01-2-2V4a2 2 0 012-2h14a2 2 0 012 2v1a2 2 0 01-2 2z" /></svg>
              </button>
            </div>
          </div>
          <p class="text-gray-600 text-[11px]"><span class="font-medium">Type:</span> {{ pkg.package_type }} | <span class="font-medium">Price:</span> {{ pkg.price }} | <span class="font-medium">Cost:</span> {{ pkg.cost }}</p>
          <p class="text-gray-600 text-[11px]"><span class="font-medium">Category:</span> {{ getCategoryName(pkg.category) }}</p>
          <p class="text-gray-500 text-[10px] mt-1">Created: {{ formatDate(pkg.created_at) }}</p>
        </div>
        <div v-if="packages.length===0" class="text-center py-5 text-gray-400">No packages found.</div>
      </div>
    </div>

    <!-- Pagination -->
    <div class="flex items-center justify-between mt-4 text-xs">
      <span class="text-gray-600">Showing <span class="font-semibold">{{ (currentPage-1)*pageSize + 1 }}</span> to <span class="font-semibold">{{ Math.min(currentPage*pageSize, count) }}</span> of <span class="font-semibold">{{ count }}</span> entries</span>
      <div class="flex items-center gap-2">
        <button @click="fetchPackages(currentPage-1)" :disabled="!previousPage" class="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150">
          <span class="hidden sm:inline">◀ Previous</span>
          <span class="sm:hidden">◀</span>
        </button>
        <button @click="fetchPackages(currentPage+1)" :disabled="!nextPage" class="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150">
          <span class="hidden sm:inline">Next ▶</span>
          <span class="sm:hidden">▶</span>
        </button>
      </div>
    </div>

    <!-- Modals -->
    <AddPackage v-if="showAdd" :categories="categories" @close="showAdd=false" @saved="fetchPackages"/>
    <EditPackage v-if="showEdit" :categories="categories" :packageData="selectedPackage" @close="showEdit=false" @saved="fetchPackages"/>

    <!-- Delete Confirmation Modal (Custom UI to replace confirm()) -->
    <div v-if="showDeleteConfirm" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-xl shadow-2xl w-full max-w-xs p-6 text-sm">
        <h3 class="text-lg font-bold text-red-600 mb-3">Confirm Deletion</h3>
        <p class="text-gray-700 mb-6">Are you sure you want to delete this package? This action cannot be undone.</p>
        <div class="flex justify-end gap-3">
          <button @click="showDeleteConfirm=false; packageToDeleteId=null" class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition duration-150">
            Cancel
          </button>
          <button @click="deletePackage" class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-md transition duration-150">
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AddPackage from './AddPackage.vue';
import EditPackage from './EditPackage.vue';

export default {
  components:{ AddPackage, EditPackage },
  data(){
    return {
      packages: [],
      categories: [],
      count:0,
      totalPages:1,
      currentPage:1,
      pageSize:10,
      nextPage:null,
      previousPage:null,
      searchQuery:'',
      showAdd:false,
      showEdit:false,
      selectedPackage:null,
      // New state for custom delete confirmation
      showDeleteConfirm: false,
      packageToDeleteId: null,
    };
  },
  methods:{
    async fetchPackages(page=1){
      try{
        const params = { page, page_size:this.pageSize, search:this.searchQuery || undefined };
        const res = await this.$apiGet('/get_packages', params);
        this.packages = res.data || [];
        this.count = res.count;
        this.totalPages = res.total_pages;
        this.currentPage = res.current_page;
        this.nextPage = res.next;
        this.previousPage = res.previous;
      }catch(err){ console.error(err); }
    },
    async fetchCategories(){
      try{
        const res = await this.$apiGet('/get_categories',{page_size:100});
        this.categories = res.data || [];
      }catch(err){ console.error(err); }
    },
    getCategoryName(id){
      const cat = this.categories.find(c=>c.id===id);
      return cat ? cat.name : 'N/A';
    },
    openEdit(pkg){ this.selectedPackage=pkg; this.showEdit=true; },
    openDeleteConfirm(id) {
        this.packageToDeleteId = id;
        this.showDeleteConfirm = true;
    },
    async deletePackage(){
      if (!this.packageToDeleteId) return; // Guard clause

      const id = this.packageToDeleteId;

      // Close modal and reset ID immediately
      this.showDeleteConfirm = false;
      this.packageToDeleteId = null; 

      try{
          const res = await this.$apiDelete(`/delete_package`, id);
          if(res){
            this.$root.$refs.toast.showToast("Package successfully deleted", "success");
          }
          this.fetchPackages(this.currentPage);
       }
      catch(err){ 
          console.error(err);
          this.$root.$refs.toast.showToast("Package delete failed", "error");
       }
    },
    formatDate(dateStr){ return new Date(dateStr).toLocaleDateString(); }
  },
  mounted(){
    this.fetchCategories();
    this.fetchPackages();
  }
};
</script>