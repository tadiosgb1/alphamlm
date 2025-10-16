<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-lg w-80 p-4 text-xs">
      <h2 class="font-semibold mb-3">Add Package</h2>
      <form @submit.prevent="savePackage">
        <div class="mb-2">
          <label class="block mb-1 text-gray-600">Name</label>
          <input v-model="form.name" type="text" class="border rounded w-full px-2 py-1 text-xs" required/>
        </div>
        <div class="mb-2">
          <label class="block mb-1 text-gray-600">Type</label>
          <select v-model="form.package_type" class="border rounded w-full px-2 py-1 text-xs">
            <option value="product">Product</option>
            <option value="service">Service</option>
          </select>
        </div>
        <div class="mb-2">
          <label class="block mb-1 text-gray-600">Price</label>
          <input v-model="form.price" type="text" class="border rounded w-full px-2 py-1 text-xs"/>
        </div>
        <div class="mb-2">
          <label class="block mb-1 text-gray-600">Cost</label>
          <input v-model="form.cost" type="text" class="border rounded w-full px-2 py-1 text-xs"/>
        </div>
        <div class="mb-3">
          <label class="block mb-1 text-gray-600">Category</label>
          <select v-model="form.category" class="border rounded w-full px-2 py-1 text-xs">
            <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
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
  props:['categories'],
  data(){ return { form:{ name:'', package_type:'product', price:'', cost:'', category:0 } }; },
  methods:{
    async savePackage(){
      try{ await this.$apiPost('/post_package', this.form); this.$emit('saved'); this.$emit('close'); }
      catch(err){ console.error(err); }
    }
  }
};
</script>
