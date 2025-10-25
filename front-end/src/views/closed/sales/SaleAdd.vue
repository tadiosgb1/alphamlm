<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-lg shadow-lg w-full max-w-sm p-4">
      <h2 class="font-semibold mb-3 text-sm">Add Sale</h2>
      <form @submit.prevent="saveSale">
        <div class="mb-2">
          <label class="block mb-1 text-gray-600 text-xs">Quantity</label>
          <input v-model.number="form.quantity" type="number" min="1" step="1" class="border rounded w-full px-2 py-1 text-xs" required />
        </div>
        <div class="mb-2">
          <label class="block mb-1 text-gray-600 text-xs">Price</label>
          <input v-model.number="form.price" type="number" min="0" step="0.01" class="border rounded w-full px-2 py-1 text-xs" required />
        </div>
        <div class="mb-2">
          <label class="block mb-1 text-gray-600 text-xs">Sub Total</label>
          <input v-model.number="form.sub_total" type="number" min="0" step="0.01" class="border rounded w-full px-2 py-1 text-xs" required />
        </div>
        <div class="mb-2">
          <label class="block mb-1 text-gray-600 text-xs">Package ID</label>
          <input v-model.number="form.package_id" type="number" class="border rounded w-full px-2 py-1 text-xs" />
        </div>
        <div class="mb-2">
          <label class="block mb-1 text-gray-600 text-xs">Seller ID</label>
          <input v-model.number="form.seller_id" type="number" class="border rounded w-full px-2 py-1 text-xs" />
        </div>
        <div class="mb-2">
          <label class="block mb-1 text-gray-600 text-xs">Buyer ID</label>
          <input v-model.number="form.buyer_id" type="number" class="border rounded w-full px-2 py-1 text-xs" />
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
      form: {
        quantity: 1,
        price: 0,
        sub_total: 0,
        package_id: null,
        seller_id: null,
        buyer_id: null
      }
    };
  },
  methods: {
    async saveSale() {
      try {
       const res= await this.$apiPost("/post_sale", this.form);
       if(res){
         this.$root.$refs.toast.showToast("Training Successfully registered", "success");
       }
        this.$emit('close');
      } catch (err) {
        console.error(err);
         this.$root.$refs.toast.showToast("Training delete failed", "error");
      }
    }
  }
};
</script>
