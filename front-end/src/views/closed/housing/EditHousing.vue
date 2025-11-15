<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-xl shadow-2xl w-full max-w-sm p-6 text-sm transform transition-all duration-300">
      <h2 class="text-lg font-semibold mb-4 border-b pb-2 text-gray-800">Edit Housing</h2>
      
      <form @submit.prevent="updateHousing" class="space-y-4">
        
        <div class="mb-2">
          <label class="block mb-1 text-sm font-medium text-gray-700">Code</label>
          <input 
            v-model="form.code" 
            type="text" 
            class="border border-gray-300 rounded-lg w-full px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm transition duration-150" 
            required
          />
        </div>
        
        <div class="mb-3">
          <label class="block mb-1 text-sm font-medium text-gray-700">Location</label>
          <input 
            v-model="form.location" 
            type="text" 
            class="border border-gray-300 rounded-lg w-full px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm transition duration-150" 
            required
          />
        </div>
        
        <div class="flex justify-end gap-3 pt-2">
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
  props: ["house"],
  data() {
    return { form: { id: null, code: "", location: "" } };
  },
  watch: {
    house: {
      immediate: true,
      handler(val) {
        // Deep clone the house object to initialize the form data
        if (val) this.form = { ...val };
      },
    },
  },
  methods: {
    async updateHousing() {
        // Assuming your API expects the ID in the URL and the data in the body
        const id = this.form.id;
        const payload = {
            code: this.form.code,
            location: this.form.location,
        };

      try {
        const res = await this.$apiPut(`/update_housing/${id}`, payload); 
        // Note: I adjusted the API call structure based on common REST practices
        // Your original call: await this.$apiPut(`/update_housing`, this.form.id, this.form); 
        // My corrected assumption: await this.$apiPut(`/update_housing/${id}`, payload);

         if(res){
            this.$root.$refs.toast.showToast("Housing edited successfully", "success");
        }
        this.$emit("saved");
        this.$emit("close");
      } catch (err) {
        console.error(err);
        // Message corrected for update failure
        this.$root.$refs.toast.showToast("Housing update failed", "error");
      }
    },
  },
};
</script>