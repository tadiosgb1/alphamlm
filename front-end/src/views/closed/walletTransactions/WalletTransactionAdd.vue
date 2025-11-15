<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-xl shadow-2xl w-full max-w-sm p-6 transform transition-all duration-300 border border-gray-200">
      
      <div class="border-b pb-3 mb-4 border-green-100">
          <h2 class="text-lg font-semibold text-gray-800">Add Wallet Transaction</h2>
      </div>

      <form @submit.prevent="saveTransaction" class="space-y-4">
        
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">Amount</label>
          <input 
            v-model="form.amount" 
            type="text" 
            class="border border-gray-300 rounded-lg w-full px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm" 
            required 
            placeholder="e.g., 100.00"
          />
        </div>
        
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">Type</label>
          <select 
            v-model="form.type" 
            class="border border-gray-300 rounded-lg w-full px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm appearance-none bg-white"
          >
            <option value="credit">Credit (Increase Wallet)</option>
            <option value="debit">Debit (Decrease Wallet)</option>
          </select>
        </div>
        
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">User ID</label>
          <input 
            v-model.number="form.user" 
            type="number" 
            class="border border-gray-300 rounded-lg w-full px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm" 
            required 
            placeholder="e.g., 5"
          />
        </div>
        
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">Reference ID (Optional)</label>
          <input 
            v-model.number="form.reference" 
            type="number" 
            class="border border-gray-300 rounded-lg w-full px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm"
            placeholder="e.g., 1024"
          />
        </div>
        
        <div class="flex justify-end gap-3 pt-2 border-t border-gray-100">
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
  data() {
    return {
      form: { amount: "", type: "credit", user: 0, reference: 0 }
    };
  },
  methods: {
    async saveTransaction() {
      try {
        await this.$apiPost("/post_wallet_transaction", this.form);
        this.$emit('close');
      } catch(err) { console.error(err); }
    }
  }
};
</script>