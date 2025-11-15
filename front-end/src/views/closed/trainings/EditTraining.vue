<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-xl shadow-2xl w-full max-w-sm p-6 text-sm transform transition-all duration-300">
      <h2 class="text-lg font-semibold mb-4 border-b pb-2 text-gray-800">Edit Training</h2>
      
      <form @submit.prevent="updateTraining" class="space-y-4">
        
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
  props:['training'],
  data(){ 
    return { 
        form:{ id:null, name:'', price:'', cost:'' } 
    }; 
},
  watch:{
    training:{ 
        immediate:true, 
        handler(val){ 
            if(val) this.form = {...val}; 
        } 
    }
  },
  methods:{
    async updateTraining(){ 
      console.log("form id",this.form.id);

        const id = this.form.id;
        const payload = {
            name: this.form.name,
            // Convert to numbers for API payload
            price: Number(this.form.price) || 0,
            cost: Number(this.form.cost) || 0,
        };

      try{
        // Correcting the likely intended API call structure:
        const res = await this.$apiPut(`/update_training/${id}`, payload); 
        
        if(res){
         this.$root.$refs.toast.showToast("Training successfully edited", "success");
        }
        this.$emit('saved'); 
        this.$emit('close');
       }
      catch(err){ 
            console.error(err);
            this.$root.$refs.toast.showToast("Training edit failed", "error");
       }
    }
  }
};
</script>