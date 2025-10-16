<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-lg shadow-lg w-full max-w-sm p-4">
      <h2 class="font-semibold mb-3 text-sm">Add Unilevel Configuration</h2>
      <form @submit.prevent="saveConfiguration">
        <div class="mb-2">
          <label class="block mb-1 text-gray-600 text-xs">Level</label>
          <input v-model.number="form.level" type="number" min="1" class="border rounded w-full px-2 py-1 text-xs" required />
        </div>
        <div class="mb-2">
          <label class="block mb-1 text-gray-600 text-xs">Percentage</label>
          <input v-model="form.percentage" type="text" class="border rounded w-full px-2 py-1 text-xs" required />
        </div>
        <div class="mb-2">
          <label class="block mb-1 text-gray-600 text-xs">Category</label>
          <input v-model.number="form.category" type="number" class="border rounded w-full px-2 py-1 text-xs" />
        </div>
        <div class="flex justify-end gap-2 mt-2">
          <button type="button" @click="$emit('close')" class="px-3 py-1 border rounded text-gray-600 hover:bg-gray-100">Cancel</button>
          <button type="submit" class="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded">Save</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: { level: 1, percentage: "0.00", category: 0 }
    };
  },
  methods: {
    async saveConfiguration() {
      try {
        await this.$apiPost("/post_unilevel_configuration", this.form);
        this.$emit('close');
      } catch (err) {
        console.error(err);
      }
    }
  }
};
</script>
