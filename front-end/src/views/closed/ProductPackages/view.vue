<template>
  <div class="p-4 text-sm text-gray-800">
    <!-- Header -->
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-lg font-semibold">Product Packages</h1>
      <button @click="showAdd=true" class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-xs">
        + Add Product Package
      </button>
    </div>

    <!-- Search + Page Size -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
      <input v-model="searchQuery" @input="fetchProductPackages(1)" type="text" placeholder="Search..."
        class="border rounded-md px-2 py-1 text-xs w-full sm:w-64 focus:outline-none focus:ring-1 focus:ring-blue-400"/>
      <div class="flex items-center gap-2 text-xs">
        <label>Show</label>
        <select v-model="pageSize" @change="fetchProductPackages(1)" class="border rounded-md px-1 py-0.5 text-xs">
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
            <th class="px-3 py-2 text-left">Product</th>
            <th class="px-3 py-2 text-left">Package</th>
            <th class="px-3 py-2 text-left">Created</th>
            <th class="px-3 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white">
          <tr v-for="(pp,index) in productPackages" :key="pp.id" class="border-t hover:bg-gray-50">
            <td class="px-3 py-2">{{ (currentPage-1)*pageSize + index + 1 }}</td>
            <td class="px-3 py-2">{{ getProductName(pp.product) }}</td>
            <td class="px-3 py-2">{{ getPackageName(pp.package) }}</td>
            <td class="px-3 py-2 text-gray-500">{{ formatDate(pp.created_at) }}</td>
            <td class="px-3 py-2">
              <button class="text-blue-500 hover:text-blue-700 mr-2" @click="openEdit(pp)">✎</button>
              <button class="text-red-500 hover:text-red-700" @click="deleteProductPackage(pp.id)">🗑</button>
            </td>
          </tr>
          <tr v-if="productPackages.length===0">
            <td colspan="5" class="text-center py-3 text-gray-400">No product packages found.</td>
          </tr>
        </tbody>
      </table>

      <!-- Mobile List -->
      <div class="sm:hidden flex flex-col gap-2">
        <div v-for="(pp,index) in productPackages" :key="pp.id" class="border rounded p-2 bg-white shadow-sm">
          <div class="flex justify-between items-center">
            <div>
              <p class="font-medium">{{ getProductName(pp.product) }}</p>
              <p class="text-gray-500 text-[11px]">Package: {{ getPackageName(pp.package) }}</p>
              <p class="text-gray-500 text-[11px]">Created: {{ formatDate(pp.created_at) }}</p>
            </div>
            <div>
              <button class="text-blue-500 hover:text-blue-700 mr-2" @click="openEdit(pp)">✎</button>
              <button class="text-red-500 hover:text-red-700" @click="deleteProductPackage(pp.id)">🗑</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div class="flex items-center justify-between mt-4 text-xs">
      <span>Page {{ currentPage }} of {{ totalPages }} ({{ count }} total)</span>
      <div class="flex items-center gap-1">
        <button @click="fetchProductPackages(currentPage-1)" :disabled="!previousPage" class="px-2 py-1 border rounded hover:bg-gray-100 disabled:opacity-50">◀ Prev</button>
        <button @click="fetchProductPackages(currentPage+1)" :disabled="!nextPage" class="px-2 py-1 border rounded hover:bg-gray-100 disabled:opacity-50">Next ▶</button>
      </div>
    </div>

    <!-- Modals -->
    <AddProductPackage v-if="showAdd" :products="products" :packages="packages" @close="showAdd=false" @saved="fetchProductPackages"/>
    <EditProductPackage v-if="showEdit" :products="products" :packages="packages" :productPackage="selectedPP" @close="showEdit=false" @saved="fetchProductPackages"/>
  </div>
</template>

<script>
import AddProductPackage from './AddProductPackage.vue';
import EditProductPackage from './EditProductPackage.vue';

export default {
  components:{ AddProductPackage, EditProductPackage },
  data(){
    return {
      productPackages: [],
      products: [],
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
      selectedPP:null
    };
  },
  methods:{
    async fetchProductPackages(page=1){
      try{
        const params={page, page_size:this.pageSize, search:this.searchQuery||undefined};
        const res = await this.$apiGet('/get_product_packages', params);
        this.productPackages = res.data || [];
        this.count = res.count;
        this.totalPages = res.total_pages;
        this.currentPage = res.current_page;
        this.nextPage = res.next;
        this.previousPage = res.previous;
      }catch(err){ console.error(err); }
    },
    async fetchProducts(){ const res=await this.$apiGet('/get_products',{page_size:100}); this.products=res.data||[]; },
    async fetchPackages(){ const res=await this.$apiGet('/get_packages',{page_size:100}); this.packages=res.data||[]; },
    getProductName(id){ const p=this.products.find(p=>p.id===id); return p?p.name:'N/A'; },
    getPackageName(id){ const p=this.packages.find(p=>p.id===id); return p?p.name:'N/A'; },
    openEdit(pp){ this.selectedPP=pp; this.showEdit=true; },
    async deleteProductPackage(id){
      if(!confirm('Are you sure?')) return;
      try{ await this.$apiDelete(`/delete_product_package/${id}/`); this.fetchProductPackages(this.currentPage); }
      catch(err){ console.error(err); }
    },
    formatDate(dateStr){ return new Date(dateStr).toLocaleDateString(); }
  },
  mounted(){
    this.fetchProducts();
    this.fetchPackages();
    this.fetchProductPackages();
  }
};
</script>
