<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6 text-sm overflow-y-auto max-h-[90vh] transform transition-all duration-300 border border-gray-200">
      
      <div class="border-b pb-3 mb-4 border-green-100">
          <h2 class="text-lg font-semibold text-gray-800">Add System Configuration</h2>
      </div>

      <form @submit.prevent="saveConfig">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700">Investment Amount</label>
            <input 
              type="text" 
              v-model="form.investment_amount" 
              class="border border-gray-300 rounded-lg w-full px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm" 
              required
            />
          </div>

          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700">Housing/Car Investment</label>
            <input 
              type="text" 
              v-model="form.housing_or_car_investment" 
              class="border border-gray-300 rounded-lg w-full px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm" 
              required
            />
          </div>

          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700">SACCO</label>
            <input 
              type="text" 
              v-model="form.sacco" 
              class="border border-gray-300 rounded-lg w-full px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm" 
              required
            />
          </div>

          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700">Service Charge</label>
            <input 
              type="text" 
              v-model="form.service_charge" 
              class="border border-gray-300 rounded-lg w-full px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm" 
              required
            />
          </div>
          
          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700">Company Revenue Product (%)</label>
            <input 
              type="text" 
              v-model="form.company_revenue_product_percentage" 
              class="border border-gray-300 rounded-lg w-full px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm" 
              required
            />
          </div>

          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700">Company Revenue Product</label>
            <input 
              type="text" 
              v-model="form.company_revenue_product" 
              class="border border-gray-300 rounded-lg w-full px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm" 
              required
            />
          </div>

          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700">Product Distribution Reward (%)</label>
            <input 
              type="text" 
              v-model="form.product_disrtribution_reward_percentage" 
              class="border border-gray-300 rounded-lg w-full px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm" 
              required
            />
          </div>

          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700">Product Distribution Reward</label>
            <input 
              type="text" 
              v-model="form.product_distribution_reward" 
              class="border border-gray-300 rounded-lg w-full px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm" 
              required
            />
          </div>

          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700">Company Revenue Training (%)</label>
            <input 
              type="text" 
              v-model="form.company_revenue_training_percentage" 
              class="border border-gray-300 rounded-lg w-full px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm" 
              required
            />
          </div>

          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700">Company Revenue Training</label>
            <input 
              type="text" 
              v-model="form.company_revenue_training" 
              class="border border-gray-300 rounded-lg w-full px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm" 
              required
            />
          </div>

          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700">Training Distribution Reward (%)</label>
            <input 
              type="text" 
              v-model="form.training_distribution_reward_percentage" 
              class="border border-gray-300 rounded-lg w-full px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm" 
              required
            />
          </div>

          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700">Training Distribution Reward</label>
            <input 
              type="text" 
              v-model="form.training_distribution_reward" 
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
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data(){ return {
    form:{
      investment_amount:'',
       housing_or_car_investment:'',
        sacco:'',
      company_revenue_product_percentage:'',
    company_revenue_product:'',
     product_disrtribution_reward_percentage:'',
     company_revenue_training:'',
      company_revenue_training_percentage:'',
      product_distribution_reward:'',
       training_distribution_reward_percentage:'',
       training_distribution_reward:'',
      service_charge:''
    }
  }; },
  methods:{
    async saveConfig(){
      try{
        await this.$apiPost('/post_configuration', this.form);
        this.$emit('saved'); this.$emit('close');
      }catch(err){ console.error(err); }
    }
  }
};
</script>