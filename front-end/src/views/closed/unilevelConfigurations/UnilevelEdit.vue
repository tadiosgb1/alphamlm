<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-xl shadow-2xl w-full max-w-sm p-6 text-sm overflow-y-auto max-h-[90vh] transform transition-all duration-300 border border-gray-200">
      
      <div class="border-b pb-3 mb-4 border-green-100">
          <h2 class="text-xl font-semibold text-gray-800">Edit Unilevel Configuration</h2>
      </div>

      <form @submit.prevent="updateConfiguration">
        <div class="space-y-4">
          
          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700">Level</label>
            <input 
              v-model.number="form.level" 
              type="number" 
              min="1" 
              class="border border-gray-300 rounded-lg w-full px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm" 
              required 
            />
          </div>
          
          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700">Percentage</label>
            <input 
              v-model="form.percentage" 
              type="text" 
              class="border border-gray-300 rounded-lg w-full px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm" 
              required 
            />
          </div>
          
          <div>
            <label class="block mb-1 text-sm font-medium text-gray-700">Category</label>
            <input 
              v-model.number="form.category" 
              type="number" 
              class="border border-gray-300 rounded-lg w-full px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm" 
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
  props: { configuration: { type: Object, required: true } },
  data() {
    return {
      form: { 
          level: this.configuration.level, 
          percentage: this.configuration.percentage, 
          category: this.configuration.category 
      }
    };
  },
  methods: {
    async updateConfiguration() {
      try {
        await this.$apiPut(`/update_unilevel_configuration`,this.configuration.id, this.form);
        this.$emit('close');
      } catch (err) {
        console.error(err);
      }
    }
  }
};
</script>