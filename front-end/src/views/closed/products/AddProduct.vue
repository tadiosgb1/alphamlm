<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-xl shadow-2xl w-full max-w-sm p-6 text-sm transform transition-all duration-300">
      <h2 class="text-lg font-semibold mb-4 border-b pb-2 text-gray-800">Add New Product</h2>
      
      <form @submit.prevent="saveProduct" class="space-y-3">
        
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">Name</label>
          <input 
            v-model="form.name" 
            type="text" 
            class="border border-gray-300 rounded-lg w-full px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm transition duration-150" 
            required
          />
        </div>
        
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">Description</label>
          <textarea 
            v-model="form.description" 
            rows="2" 
            class="border border-gray-300 rounded-lg w-full px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm transition duration-150"
          ></textarea>
        </div>
        
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">Quantity</label>
          <input 
            v-model="form.quantity" 
            type="number" 
            inputmode="numeric" 
            min="0"
            class="border border-gray-300 rounded-lg w-full px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm transition duration-150"
          />
        </div>
        
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">Price</label>
          <input 
            v-model="form.price" 
            type="number" 
            step="0.01" 
            min="0"
            inputmode="decimal"
            class="border border-gray-300 rounded-lg w-full px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm transition duration-150"
          />
        </div>
        
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">Cost</label>
          <input 
            v-model="form.cost" 
            type="number" 
            step="0.01" 
            min="0"
            inputmode="decimal"
            class="border border-gray-300 rounded-lg w-full px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm transition duration-150"
          />
        </div>
        
        <div class="flex items-center gap-2 pt-1">
          <input 
            type="checkbox" 
            v-model="form.is_service" 
            id="service"
            class="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
          />
          <label for="service" class="text-sm font-medium text-gray-700">Is Service?</label>
        </div>
        
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">Category</label>
          <select 
            v-model="form.category" 
            class="border border-gray-300 rounded-lg w-full px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500 shadow-sm"
          >
            <option :value="0" disabled>Select a category</option>
            <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
          </select>
        </div>
        
        <div class="flex justify-end gap-3 pt-4">
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
  props: ['categories'],
  data() {
    return {
      form: { name:'', description:'', quantity:0, price:0, cost:0, is_service:false, category:0 }
    };
  },
  methods: {
    async saveProduct() {
      try {
      // Ensure numeric fields are correctly typed before sending
      const payload = {
          ...this.form,
          quantity: Number(this.form.quantity) || 0,
          price: Number(this.form.price) || 0,
          cost: Number(this.form.cost) || 0,
      };

      const res =  await this.$apiPost('/post_product', payload);

       if(res){
         this.$root.$refs.toast.showToast("Product successfully registered", "success");
      }
        this.$emit('saved');
        this.$emit('close');
      } catch(err){ 
          console.error(err);
          this.$root.$refs.toast.showToast("Failed to add product", "error");
       }

    }
  }
};
</script>