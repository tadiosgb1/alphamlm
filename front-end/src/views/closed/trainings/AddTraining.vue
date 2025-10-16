<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-lg w-80 p-4 text-xs">
      <h2 class="font-semibold mb-3">Add Training</h2>
      <form @submit.prevent="saveTraining">
        <div class="mb-2">
          <label class="block mb-1 text-gray-600">Name</label>
          <input v-model="form.name" type="text" class="border rounded w-full px-2 py-1 text-xs" required/>
        </div>
        <div class="mb-2">
          <label class="block mb-1 text-gray-600">Price</label>
          <input v-model="form.price" type="text" class="border rounded w-full px-2 py-1 text-xs"/>
        </div>
        <div class="mb-3">
          <label class="block mb-1 text-gray-600">Cost</label>
          <input v-model="form.cost" type="text" class="border rounded w-full px-2 py-1 text-xs"/>
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
  data(){ return { form:{ name:'', price:'', cost:'' } }; },
  methods:{
    async saveTraining(){
      try{ await this.$apiPost('/post_training', this.form); this.$emit('saved'); this.$emit('close'); }
      catch(err){ console.error(err); }
    }
  }
};
</script>
