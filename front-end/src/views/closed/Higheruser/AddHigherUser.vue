<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-xl shadow-2xl w-full max-w-sm p-6 text-sm">
      <div class="flex justify-between items-center mb-4 border-b pb-2">
        <h2 class="text-lg font-semibold text-gray-800">Add HigherUser</h2>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600">&times;</button>
      </div>

      <form @submit.prevent="submitForm" class="space-y-4 max-h-[80vh] overflow-y-auto p-2">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <label>Email</label>
            <input v-model="form.email" type="text" required class="border rounded p-2 w-full"/>
          </div>
          <div>
            <label>Phone Number</label>
            <input v-model="form.phone_number" type="text" required class="border rounded p-2 w-full"/>
          </div>
          <div>
            <label>First Name</label>
            <input v-model="form.first_name" type="text" required class="border rounded p-2 w-full"/>
          </div>
          <div>
            <label>Middle Name</label>
            <input v-model="form.middle_name" type="text" required class="border rounded p-2 w-full"/>
          </div>
          <div>
            <label>Last Name</label>
            <input v-model="form.last_name" type="text" required class="border rounded p-2 w-full"/>
          </div>
          <div>
            <label>Address</label>
            <input v-model="form.address" type="text" required class="border rounded p-2 w-full"/>
          </div>
          <div>
            <label>Bank Name</label>
            <input v-model="form.bank_name" type="text" required class="border rounded p-2 w-full"/>
          </div>
          <div>
            <label>Account Number</label>
            <input v-model="form.account_number" type="text" required class="border rounded p-2 w-full"/>
          </div>
          <div>
            <label>Tree Position</label>
            <input v-model="form.tree_position" type="text" required class="border rounded p-2 w-full"/>
          </div>
          <div>
            <label>Referal Code</label>
            <input v-model="form.referal_code" type="text" required class="border rounded p-2 w-full"/>
          </div>
          <div>
            <label>Password</label>
            <input v-model="form.password" type="text" required class="border rounded p-2 w-full"/>
          </div>
        </div>

        <div class="flex justify-end gap-3 pt-2">
          <button type="button" @click="$emit('close')" class="px-4 py-2 border rounded-lg">Cancel</button>
          <button type="submit" class="px-4 py-2 bg-green-500 text-white rounded-lg">Add</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: { data: Object },
  data() {
    return {
      form: {
        email: this.data?.email || '',
        phone_number: this.data?.phone_number || '',
        password: this.data?.password || '',
        first_name: this.data?.first_name || '',
        middle_name: this.data?.middle_name || '',
        last_name: this.data?.last_name || '',
        address: this.data?.address || '',
        bank_name: this.data?.bank_name || '',
        account_number: this.data?.account_number || '',
        tree_position: this.data?.tree_position || '',
        referal_code: this.data?.referal_code || localStorage.getItem('referalCode') || ''
      }
    };
  },
  methods: {
    async submitForm() {
      try {
        const res = await this.$apiPost("/sign_up", this.form);
        if (res) this.$root.$refs.toast.showToast('Added successfully', 'success');
        this.$emit("saved");
        this.$emit("close");
      } catch (e) {
        console.error(e);
      }
    }
  }
};
</script>
