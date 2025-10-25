<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-lg w-80 p-4 text-xs">
      <h2 class="font-semibold mb-3">Add Promoter Buyer</h2>
      <form @submit.prevent="saveItem">
        <div class="mb-3">
          <label class="block mb-1 text-gray-600">Promoter ID</label>
          <input v-model="form.promoter" type="number" class="border rounded w-full px-2 py-1 text-xs" required />
        </div>
        <div class="mb-3">
          <label class="block mb-1 text-gray-600">Buyer ID</label>
          <input v-model="form.buyer" type="number" class="border rounded w-full px-2 py-1 text-xs" required />
        </div>
        <div class="flex justify-end gap-2">
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
    return { form: { promoter: '', buyer: '' } };
  },
  methods: {
    async saveItem() {
      try {
        const res = await this.$apiPost('/post_promoter_buyer', this.form);
        if (res) this.$root.$refs.toast.showToast("Saved successfully", "success");
        this.$emit('saved');
        this.$emit('close');
      } catch (err) {
        console.error(err);
        this.$root.$refs.toast.showToast("Save failed", "error");
      }
    },
  },
};
</script>
