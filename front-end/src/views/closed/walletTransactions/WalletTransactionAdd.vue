<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-lg shadow-lg w-full max-w-sm p-4">
      <h2 class="font-semibold mb-3 text-sm">Add Wallet Transaction</h2>
      <form @submit.prevent="saveTransaction">
        <div class="mb-2">
          <label class="block mb-1 text-gray-600 text-xs">Amount</label>
          <input v-model="form.amount" type="text" class="border rounded w-full px-2 py-1 text-xs" required />
        </div>
        <div class="mb-2">
          <label class="block mb-1 text-gray-600 text-xs">Type</label>
          <select v-model="form.type" class="border rounded w-full px-2 py-1 text-xs">
            <option value="credit">Credit</option>
            <option value="debit">Debit</option>
          </select>
        </div>
        <div class="mb-2">
          <label class="block mb-1 text-gray-600 text-xs">User ID</label>
          <input v-model.number="form.user" type="number" class="border rounded w-full px-2 py-1 text-xs" required />
        </div>
        <div class="mb-2">
          <label class="block mb-1 text-gray-600 text-xs">Reference ID</label>
          <input v-model.number="form.reference" type="number" class="border rounded w-full px-2 py-1 text-xs" />
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
      form: { amount: "", type: "credit", user: 0, reference: 0 }
    };
  },
  methods: {
    async saveTransaction() {
      try {
        await this.$apiPost("/post_wallet_transaction", this.form);
        this.$emit('close');
      } catch(err) { console.error(err); }
    }
  }
};
</script>
