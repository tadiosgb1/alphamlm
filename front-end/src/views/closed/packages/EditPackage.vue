<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-xl shadow-2xl w-full max-w-sm p-6 text-sm">
      <h2 class="font-bold text-lg text-gray-800 mb-4 border-b pb-2">Edit Package</h2>
      
      <form @submit.prevent="updatePackage">
        <div class="mb-3">
          <label class="block mb-1 font-medium text-gray-700">Name</label>
          <input 
            v-model="form.name" 
            type="text" 
            class="border border-gray-300 rounded-lg w-full px-3 py-1.5 text-xs shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-150" 
            required
          />
        </div>
        
        <div class="mb-3">
          <label class="block mb-1 font-medium text-gray-700">Type</label>
          <select 
            v-model="form.package_type" 
            class="border border-gray-300 rounded-lg w-full px-3 py-1.5 text-xs shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-150"
          >
            <option value="product">Product</option>
            <option value="service">Service</option>
          </select>
        </div>
        
        <div class="mb-3">
          <label class="block mb-1 font-medium text-gray-700">Price</label>
          <input 
            v-model="form.price" 
            type="number" 
            step="0.01"
            class="border border-gray-300 rounded-lg w-full px-3 py-1.5 text-xs shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-150"
          />
        </div>
        
        <div class="mb-3">
          <label class="block mb-1 font-medium text-gray-700">Cost</label>
          <input 
            v-model="form.cost" 
            type="number" 
            step="0.01"
            class="border border-gray-300 rounded-lg w-full px-3 py-1.5 text-xs shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-150"
          />
        </div>
        
        <div class="mb-4">
          <label class="block mb-1 font-medium text-gray-700">Category</label>
          <select 
            v-model="form.category" 
            class="border border-gray-300 rounded-lg w-full px-3 py-1.5 text-xs shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-150"
          >
            <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
          </select>
        </div>
        
        <div class="flex justify-end gap-3 pt-2">
          <button 
            type="button" 
            @click="$emit('close')" 
            class="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 transition duration-150 text-xs font-medium"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-md transition duration-150 text-xs font-medium"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props:['categories','packageData'],
  data(){ 
    return { 
      form:{ 
        id:null, 
        name:'', 
        package_type:'product', 
        price:null, 
        cost:null, 
        category:null 
      } 
    }; 
  },
  watch:{
    packageData:{ 
        immediate:true, 
        handler(val){ 
            if(val) {
                // Ensure price and cost are treated as numbers, even if they come in as strings
                this.form = {
                    ...val,
                    price: val.price !== null ? parseFloat(val.price) : null,
                    cost: val.cost !== null ? parseFloat(val.cost) : null,
                }; 
            }
        } 
    }
  },
  methods:{
    async updatePackage(){
      // Clean up number fields for API submission
      const payload = {
        ...this.form,
        price: this.form.price ? parseFloat(this.form.price) : 0,
        cost: this.form.cost ? parseFloat(this.form.cost) : 0,
      }

      try{ 
          const res = await this.$apiPut(`/update_package`, this.form.id, payload);
          if(res){
            this.$root.$refs.toast.showToast("Package successfully updated", "success");
          }
          this.$emit('saved'); 
          this.$emit('close'); 
      }
      catch(err){ 
          console.error(err);
          this.$root.$refs.toast.showToast("Package edit failed", "error");
       }
    }
  }
};
</script>