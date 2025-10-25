<template>
  <div>
    <Toast ref="toast" />
  <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 p-4">
    <div class="bg-white p-5 rounded-lg shadow-lg w-full max-w-sm">
      <h2 class="text-lg font-semibold mb-3">Add Tree Setting</h2>

      <div class="mb-3">
        <label class="block text-xs font-medium mb-1">Max Children</label>
        <input
          v-model="form.max_children"
          type="number"
          class="border w-full rounded p-2 text-sm"
          placeholder="e.g. 3"
        />
      </div>

      <div class="flex justify-end gap-2">
        <button @click="$emit('close')" class="text-gray-600 text-sm">Cancel</button>
        <button
          @click="save"
          class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-sm"
        >
          Save
        </button>
      </div>
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
