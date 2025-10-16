<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-lg w-80 p-4 text-xs">
      <h2 class="font-semibold mb-3">Edit Category</h2>
      <form @submit.prevent="updateCategory">
        <div class="mb-2">
          <label class="block mb-1 text-gray-600">Name</label>
          <input v-model="form.name" type="text" class="border rounded w-full px-2 py-1 text-xs" required/>
        </div>
        <div class="mb-3">
          <label class="block mb-1 text-gray-600">Description</label>
          <textarea v-model="form.description" rows="2" class="border rounded w-full px-2 py-1 text-xs"></textarea>
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
  props: ['category'],
  data() {
    return {
      form: { name: '', description: '', id: null }
    };
  },
  watch: {
    category: {
      immediate: true,
      handler(val) {
        if(val) this.form = { ...val };
      }
    }
  },
  methods: {
    async updateCategory() {
      try {
        await this.$apiPut(`/update_category/${this.form.id}/`, this.form);
        this.$emit('saved');
        this.$emit('close');
      } catch(err) { console.error(err); }
    }
  }
};
</script>
