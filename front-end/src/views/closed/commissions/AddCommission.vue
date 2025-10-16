<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-lg w-80 p-4 text-xs">
      <h2 class="font-semibold mb-3">Add Commission</h2>
      <form @submit.prevent="saveCommission">
        <div class="mb-2">
          <label class="block mb-1 text-gray-600">Amount</label>
          <input type="text" v-model="form.amount" class="border rounded w-full px-2 py-1 text-xs" required/>
        </div>
        <div class="mb-3">
          <label class="block mb-1 text-gray-600">Sale ID</label>
          <input type="number" v-model="form.sale" class="border rounded w-full px-2 py-1 text-xs" required/>
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
  data(){ return { form:{ amount:'', sale:null } }; },
  methods:{
    async saveCommission(){
      try{ await this.$apiPost('/post_commission', this.form); this.$emit('saved'); this.$emit('close'); }
      catch(err){ console.error(err); }
    }
  }
};
</script>
