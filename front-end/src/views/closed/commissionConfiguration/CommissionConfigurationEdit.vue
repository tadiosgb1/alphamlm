<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-lg w-full max-w-md p-4 text-xs">
      <h2 class="font-semibold mb-3 text-base">Edit Commission Configuration</h2>

      <div class="grid grid-cols-2 gap-2">
        <div v-for="(value, key) in form" :key="key">
          <label class="block font-semibold mb-1 capitalize">{{ key.replace('_', ' ') }}</label>
          <input
            v-model="form[key]"
            type="text"
            class="w-full border rounded p-1"
          />
        </div>
      </div>

      <div class="flex justify-end gap-2 mt-4">
        <button @click="$emit('close')" class="px-3 py-1 border rounded">Cancel</button>
        <button @click="update" class="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded">
          Update
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: { configuration: { type: Object, required: true } },
  data() {
    return { form: { ...this.configuration } };
  },
  methods: {
    async update() {
      try {
        await this.$apiPatch(`/update_commission_configuration/${this.form.id}/`, this.form);
        this.$emit("close");
      } catch (err) {
        console.error("Failed to update configuration:", err);
      }
    },
  },
};
</script>
