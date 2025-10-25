<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-lg w-80 p-4 text-xs">
      <h2 class="font-semibold mb-3">Edit Promoter Buyer</h2>
      <form @submit.prevent="updateItem">
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
          <button type="submit" class="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded">Update</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: ['item'],
  data() {
    return { form: { id: null, promoter: '', buyer: '' } };
  },
  watch: {
    item: { immediate: true, handler(val) { if (val) this.form = { ...val }; } }
  },
  methods: {
    async updateItem() {
      try {
        const res = await this.$apiPut('/update_promotor_buyer', this.form.id, this.form);
        if (res) this.$root.$refs.toast.showToast("Updated successfully", "success");
        this.$emit('saved');
        this.$emit('close');
      } catch (err) {
        console.error(err);
        this.$root.$refs.toast.showToast("Update failed", "error");
      }
    },
  },
};
</script>
