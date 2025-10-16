<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-lg w-80 p-4 text-xs">
      <h2 class="font-semibold mb-3">Edit MLM Setting</h2>
      <form @submit.prevent="updateSetting">
        <div class="mb-2">
          <label class="block mb-1 text-gray-600">Max Level</label>
          <input type="number" v-model.number="form.max_level" class="border rounded w-full px-2 py-1 text-xs" required/>
        </div>
        <div class="mb-2">
          <label class="block mb-1 text-gray-600">Min Withdrawal Amount</label>
          <input type="text" v-model="form.min_withdrawal_amount" class="border rounded w-full px-2 py-1 text-xs" required/>
        </div>
        <div class="mb-3">
          <label class="block mb-1 text-gray-600">Payout Frequency (days)</label>
          <input type="number" v-model.number="form.payout_frequency" class="border rounded w-full px-2 py-1 text-xs" required/>
        </div>
        <div class="flex justify-end gap-2">
          <button type="button" @click="$emit('close')" class="px-3 py-1 border rounded text-gray-600 hover:bg-gray-100">Cancel</button>
          <button type="submit" class="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded">Update</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props:['setting'],
  data(){ return { form:{ id:null, max_level:0, min_withdrawal_amount:'', payout_frequency:0 } }; },
  watch:{ setting:{ immediate:true, handler(val){ if(val) this.form={...val}; } } },
  methods:{
    async updateSetting(){
      try{
        await this.$apiPut(`/update_mlm_settings/${this.form.id}/`, this.form);
        this.$emit('saved'); this.$emit('close');
      }catch(err){ console.error(err); }
    }
  }
};
</script>
