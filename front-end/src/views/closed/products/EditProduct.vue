<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-xl shadow-2xl w-full max-w-sm p-6 text-sm transform transition-all duration-300">
      <h2 class="text-lg font-semibold mb-4 border-b pb-2 text-gray-800">Edit Product</h2>
      
      <form @submit.prevent="updateProduct" class="space-y-3">
        
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
            id="service_edit"
            class="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
          />
          <label for="service_edit" class="text-sm font-medium text-gray-700">Is Service?</label>
        </div>
        
        <div>
          <label class="block mb-1 text-sm font-medium text-gray-700">Category</label>
          <select 
            v-model="form.category" 
            class="border border-gray-300 rounded-lg w-full px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500 shadow-sm"
          >
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
            Update
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: ['product', 'categories'],
  data() {
    return { form: { id:null, name:'', description:'', quantity:'', price:'', cost:'', is_service:false, category:0 } };
  },
  watch: {
    product: { 
        immediate:true, 
        handler(val){ 
            if(val) this.form = {
                // Ensure form fields are initialized safely, especially for optional fields like description
                id: val.id,
                name: val.name || '',
                description: val.description || '',
                quantity: val.quantity === undefined ? '' : val.quantity,
                price: val.price === undefined ? '' : val.price,
                cost: val.cost === undefined ? '' : val.cost,
                is_service: !!val.is_service,
                category: val.category || 0 // Default to 0 if category is null/undefined
            }; 
        } 
    }
  },
  methods: {
    async updateProduct() {
        const id = this.form.id;
        const payload = {
            name: this.form.name,
            description: this.form.description,
            // Ensure numeric fields are correctly typed
            quantity: Number(this.form.quantity) || 0,
            price: Number(this.form.price) || 0,
            cost: Number(this.form.cost) || 0,
            is_service: this.form.is_service,
            category: this.form.category,
        };

      try {
       // Assuming $apiPut accepts URL, then ID, then payload, or simply URL/ID, then payload
       // Correcting the likely intended API call structure:
       const res = await this.$apiPut(`/update_product/${id}`, payload); 
        
       if(res){
         this.$root.$refs.toast.showToast("Product successfully edited", "success");
       }
     
        this.$emit('saved');
        this.$emit('close');
      } catch(err){ 
          console.error(err); 
          this.$root.$refs.toast.showToast("Failed to edit product", "error");
      }
    }
  }
};
</script>