<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-xl shadow-2xl w-full max-w-sm p-6 text-sm transform transition-all duration-300 border border-gray-200">
      
      <div class="border-b pb-3 mb-4 border-green-100">
          <h2 class="text-xl font-semibold text-gray-800">Edit MLM Setting</h2>
      </div>

      <form @submit.prevent="updateSetting">
        <div class="space-y-4">
          
          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700">Max Level</label>
            <input 
              type="number" 
              v-model.number="form.max_level" 
              min="0"
              class="border border-gray-300 rounded-lg w-full px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm" 
              required
            />
          </div>
          
          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700">Min Withdrawal Amount</label>
            <input 
              type="text" 
              v-model="form.min_withdrawal_amount" 
              class="border border-gray-300 rounded-lg w-full px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm" 
              required
            />
          </div>
          
          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700">Payout Frequency (days)</label>
            <input 
              type="number" 
              v-model.number="form.payout_frequency" 
              min="1"
              class="border border-gray-300 rounded-lg w-full px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm" 
              required
            />
          </div>
        </div>

        <div class="flex justify-end gap-3 mt-5 pt-3 border-t border-gray-100">
          <button 
            type="button" 
            @click="$emit('close')" 
            class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition duration-150 text-sm font-medium"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            class="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-md transition duration-150 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
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
  props:['setting'],
  data(){ 
    return { 
        form:{ id:null, max_level:0, min_withdrawal_amount:'', payout_frequency:0 } 
    }; 
},
  watch:{ 
    setting:{ 
        immediate:true, 
        handler(val){ 
            // Ensure the form is initialized/updated with the prop data
            if(val) this.form={...val}; 
        } 
    } 
},
  methods:{
    async updateSetting(){
      try{
        // Keeping the original API call structure: /endpoint, id, data
        await this.$apiPut(`/update_mlm_setting`,this.form.id, this.form);
        this.$emit('saved'); 
        this.$emit('close');
      }catch(err){ 
        console.error(err); 
        // Add error handling/toast here if available
      }
    }
  }
};
</script>