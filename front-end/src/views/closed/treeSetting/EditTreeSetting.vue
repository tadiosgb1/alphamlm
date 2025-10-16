<template>
  <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 p-4">
    <div class="bg-white p-5 rounded-lg shadow-lg w-full max-w-sm">
      <h2 class="text-lg font-semibold mb-3">Edit Tree Setting</h2>

      <div class="mb-3">
        <label class="block text-xs font-medium mb-1">Max Children</label>
        <input
          v-model="form.max_children"
          type="number"
          class="border w-full rounded p-2 text-sm"
        />
      </div>

      <div class="flex justify-end gap-2">
        <button @click="$emit('close')" class="text-gray-600 text-sm">Cancel</button>
        <button
          @click="update"
          class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-sm"
        >
          Update
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["setting"],
  data() {
    return {
      form: { ...this.setting },
    };
  },
  methods: {
    async update() {
      try {
        await this.$apiPut(`/update_tree_setting/${this.form.id}/`, this.form);
        this.$emit("close");
      } catch (err) {
        console.error("Failed to update tree setting:", err);
      }
    },
  },
};
</script>
