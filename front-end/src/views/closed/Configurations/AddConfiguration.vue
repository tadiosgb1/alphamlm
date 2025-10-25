<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-lg w-96 p-4 text-xs overflow-y-auto max-h-[90vh]">
      <h2 class="font-semibold mb-3">Add Configuration</h2>
      <form @submit.prevent="saveConfig">
        <div class="grid grid-cols-1 gap-2">
          <div><label class="block mb-1 text-gray-600">Investment Amount</label>
            <input type="text" v-model="form.investment_amount" class="border rounded w-full px-2 py-1 text-xs" required/></div>

          <div><label class="block mb-1 text-gray-600">Housing/Car Investment</label>
            <input type="text" v-model="form.housing_or_car_investment" class="border rounded w-full px-2 py-1 text-xs" required/></div>

          <div><label class="block mb-1 text-gray-600">SACCO</label>
            <input type="text" v-model="form.sacco" class="border rounded w-full px-2 py-1 text-xs" required/></div>

          <div><label class="block mb-1 text-gray-600">Company Revenue Product (%)</label>
            <input type="text" v-model="form.company_revenue_product_percentage" class="border rounded w-full px-2 py-1 text-xs" required/></div>

            <div><label class="block mb-1 text-gray-600">Company Revenue Product</label>
            <input type="text" v-model="form.company_revenue_product" class="border rounded w-full px-2 py-1 text-xs" required/></div>

          <div><label class="block mb-1 text-gray-600">Product Distribution Reward (%)</label>
            <input type="text" v-model="form.product_disrtribution_reward_percentage" class="border rounded w-full px-2 py-1 text-xs" required/></div>

         <div><label class="block mb-1 text-gray-600">Product Distribution Reward</label>
            <input type="text" v-model="form.product_distribution_reward" class="border rounded w-full px-2 py-1 text-xs" required/></div>

          <div><label class="block mb-1 text-gray-600">Company Revenue Training (%)</label>
            <input type="text" v-model="form.company_revenue_training_percentage" class="border rounded w-full px-2 py-1 text-xs" required/></div>

            <div><label class="block mb-1 text-gray-600">Company Revenue Training </label>
            <input type="text" v-model="form.company_revenue_training" class="border rounded w-full px-2 py-1 text-xs" required/></div>

          <div><label class="block mb-1 text-gray-600">Training Distribution Reward (%)</label>
            <input type="text" v-model="form.training_distribution_reward_percentage" class="border rounded w-full px-2 py-1 text-xs" required/></div>

            <div><label class="block mb-1 text-gray-600">Training Distribution Reward</label>
            <input type="text" v-model="form.training_distribution_reward" class="border rounded w-full px-2 py-1 text-xs" required/></div>

          <div><label class="block mb-1 text-gray-600">Service Charge</label>
            <input type="text" v-model="form.service_charge" class="border rounded w-full px-2 py-1 text-xs" required/></div>
        </div>

        <div class="flex justify-end gap-2 mt-3">
          <button type="button" @click="$emit('close')" class="px-3 py-1 border rounded text-gray-600 hover:bg-gray-100">Cancel</button>
          <button type="submit" class="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded">Save</button>
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
