<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-xl shadow-2xl w-full max-w-sm p-6 text-sm">
      <h2 class="font-bold text-lg text-gray-800 mb-4 border-b pb-2">Add New Sale</h2>
      <form @submit.prevent="saveSale">
        
        <!-- Quantity -->
        <div class="mb-3">
          <label class="block mb-1 font-medium text-gray-700">Quantity</label>
          <input 
            v-model.number="form.quantity" 
            type="number" 
            min="1" 
            step="1" 
            class="border border-gray-300 rounded-lg w-full px-3 py-1.5 text-xs shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-150" 
            required 
          />
        </div>
        
        <!-- Price -->
        <div class="mb-3">
          <label class="block mb-1 font-medium text-gray-700">Price per Unit ($)</label>
          <input 
            v-model.number="form.price" 
            type="number" 
            min="0" 
            step="0.01" 
            class="border border-gray-300 rounded-lg w-full px-3 py-1.5 text-xs shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-150" 
            required 
          />
        </div>
        
        <!-- Sub Total (Read-only/Computed) -->
        <div class="mb-3">
          <label class="block mb-1 font-medium text-gray-700">Sub Total ($)</label>
          <input 
            :value="calculatedSubTotal.toFixed(2)" 
            type="text" 
            class="border border-gray-300 rounded-lg w-full px-3 py-1.5 text-xs bg-gray-100 text-gray-500" 
            readonly 
            title="Calculated automatically (Quantity * Price)"
          />
        </div>
        
        <!-- Package ID -->
        <div class="mb-3">
          <label class="block mb-1 font-medium text-gray-700">Package ID</label>
          <input 
            v-model.number="form.package_id" 
            type="number" 
            class="border border-gray-300 rounded-lg w-full px-3 py-1.5 text-xs shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-150" 
          />
        </div>
        
        <!-- Seller ID -->
        <div class="mb-3">
          <label class="block mb-1 font-medium text-gray-700">Seller ID</label>
          <input 
            v-model.number="form.seller_id" 
            type="number" 
            class="border border-gray-300 rounded-lg w-full px-3 py-1.5 text-xs shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-150" 
          />
        </div>
        
        <!-- Buyer ID -->
        <div class="mb-4">
          <label class="block mb-1 font-medium text-gray-700">Buyer ID</label>
          <input 
            v-model.number="form.buyer_id" 
            type="number" 
            class="border border-gray-300 rounded-lg w-full px-3 py-1.5 text-xs shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-150" 
          />
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
            Save Sale
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
      form: {
        quantity: 1,
        price: 0,
        package_id: null,
        seller_id: null,
        buyer_id: null
      }
    };
  },
  computed: {
    calculatedSubTotal() {
      // Calculate sub_total based on current quantity and price.
      const qty = parseFloat(this.form.quantity) || 0;
      const price = parseFloat(this.form.price) || 0;
      return qty * price;
    }
  },
  methods: {
    async saveSale() {
      // Add the calculated sub_total to the payload before posting
      const payload = {
        ...this.form,
        sub_total: this.calculatedSubTotal
      };
      
      try {
       const res= await this.$apiPost("/post_sale", payload);
       if(res){
         this.$root.$refs.toast.showToast("Sale successfully recorded", "success");
       }
        this.$emit('saved'); // Emit 'saved' to refresh the parent list
        this.$emit('close');
      } catch (err) {
        console.error(err);
        // Corrected toast message
         this.$root.$refs.toast.showToast("Failed to record sale", "error");
      }
    }
  }
};
</script>