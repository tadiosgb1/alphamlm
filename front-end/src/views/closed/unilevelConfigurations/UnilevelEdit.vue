<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-lg shadow-lg w-full max-w-sm p-4">
      <h2 class="font-semibold mb-3 text-sm">Edit Unilevel Configuration</h2>
      <form @submit.prevent="updateConfiguration">
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
          <button type="submit" class="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded">Update</button>
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
      form: { level: this.configuration.level, percentage: this.configuration.percentage, category: this.configuration.category }
    };
  },
  methods: {
    async updateConfiguration() {
      try {
        await this.$apiPut(`/update_unilevel_configuration/${this.configuration.id}/`, this.form);
        this.$emit('close');
      } catch (err) {
        console.error(err);
      }
    }
  }
};
</script>
