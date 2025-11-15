<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-xl shadow-2xl w-full max-w-sm p-6 text-sm">
      <h2 class="font-bold text-lg text-gray-800 mb-4 border-b pb-2">Add Product Package</h2>
      <form @submit.prevent="savePP">
        <div class="mb-3">
          <label class="block mb-1 font-medium text-gray-700">Product</label>
          <select 
            v-model="form.product" 
            class="border border-gray-300 rounded-lg w-full px-3 py-1.5 text-xs shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-150"
            required
          >
            <option disabled :value="null">Select a product</option>
            <option v-for="p in products" :key="p.id" :value="p.id">{{ p.name }}</option>
          </select>
        </div>
        <div class="mb-4">
          <label class="block mb-1 font-medium text-gray-700">Package</label>
          <select 
            v-model="form.package" 
            class="border border-gray-300 rounded-lg w-full px-3 py-1.5 text-xs shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-150"
            required
          >
            <option disabled :value="null">Select a package</option>
            <option v-for="p in packages" :key="p.id" :value="p.id">{{ p.name }}</option>
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
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props:['products','packages'],
  data(){ return { form:{ product:null, package:null } }; },
  methods:{
    async savePP(){ 
        // Ensure both fields are selected before proceeding
        if (!this.form.product || !this.form.package) {
             this.$root.$refs.toast.showToast("Please select both a Product and a Package.", "warning");
             return;
        }

        try{ 
            const res=await this.$apiPost('/post_product_package', this.form); 
           if(res){
              this.$root.$refs.toast.showToast("Product Package successfully added", "success");
            }
            this.$emit('saved'); 
            this.$emit('close'); 
        } catch(err){ 
            console.error(err); 
            this.$root.$refs.toast.showToast("Product Package add failed", "error");
        } 
    }
  }
};
</script>