<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-lg w-80 p-4 text-xs">
      <h2 class="font-semibold mb-3">Add Product Package</h2>
      <form @submit.prevent="savePP">
        <div class="mb-2">
          <label class="block mb-1 text-gray-600">Product</label>
          <select v-model="form.product" class="border rounded w-full px-2 py-1 text-xs">
            <option v-for="p in products" :key="p.id" :value="p.id">{{ p.name }}</option>
          </select>
        </div>
        <div class="mb-3">
          <label class="block mb-1 text-gray-600">Package</label>
          <select v-model="form.package" class="border rounded w-full px-2 py-1 text-xs">
            <option v-for="p in packages" :key="p.id" :value="p.id">{{ p.name }}</option>
          </select>
        </div>
        <div class="flex justify-end gap-2">
          <button type="button" @click="$emit('close')" class="px-3 py-1 border rounded text-gray-600 hover:bg-gray-100">Cancel</button>
          <button type="submit" class="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded">Save</button>
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
    async savePP(){ try{ const res=await this.$apiPost('/post_product_package', this.form); 
       if(res){
          this.$root.$refs.toast.showToast("Package Successfully added", "success");
        }
    this.$emit('saved'); this.$emit('close'); } catch(err){ console.error(err); 
      this.$root.$refs.toast.showToast("Product Package add failed", "error");
    } }
  }
};
</script>
