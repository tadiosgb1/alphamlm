<template>
  <div>
    <Toast ref="toast" />
    
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-xl shadow-2xl w-full max-w-sm p-6 text-sm transform transition-all duration-300 border border-gray-200">
        
        <div class="border-b pb-3 mb-4 border-green-100">
            <h2 class="text-xl font-semibold text-gray-800">Add Tree Setting</h2>
        </div>

        <form @submit.prevent="save">
          <div class="space-y-4">
            
            <div>
              <label class="block mb-1 text-sm font-medium text-gray-700">Max Children</label>
              <input
                v-model="form.max_children"
                type="number"
                min="1"
                class="border border-gray-300 rounded-lg w-full px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm"
                placeholder="e.g. 3"
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
  </div>
</template>

<script>
import Toast from "../../../components/Toast.vue";
export default {
   components: { Toast },
  data() {
    return {
      form: { max_children: null },
    };
  },
  methods: {
    async save() {
      try {
        await this.$apiPost("/post_tree_setting", this.form);
        
        // Original logic preserved: Toast is called via $root
         this.$root.$refs.toast.showToast(
          "Property saved successfully ",
          "success"
        );
        this.$emit("close");
      } catch (err) {
        console.error("Failed to add tree setting:", err);
      }
    },
  },
};
</script>