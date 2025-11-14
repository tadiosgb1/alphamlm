<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  >
    <div class="bg-white rounded-lg shadow-lg w-80 p-4 text-xs">
      <h2 class="font-semibold mb-3">Add User</h2>
      <form @submit.prevent="saveUser">
        <div class="mb-2">
          <label class="block mb-1 text-gray-600">Email</label>
          <input
            v-model="form.email"
            type="email"
            class="border rounded w-full px-2 py-1 text-xs"
            required
          />
        </div>
        <div class="mb-2">
          <label class="block mb-1 text-gray-600">First Name</label>
          <input
            v-model="form.first_name"
            type="text"
            class="border rounded w-full px-2 py-1 text-xs"
          />
        </div>
        <div class="mb-2">
          <label class="block mb-1 text-gray-600">Middle Name</label>
          <input
            v-model="form.middle_name"
            type="text"
            class="border rounded w-full px-2 py-1 text-xs"
          />
        </div>
        <div class="mb-2">
          <label class="block mb-1 text-gray-600">Last Name</label>
          <input
            v-model="form.last_name"
            type="text"
            class="border rounded w-full px-2 py-1 text-xs"
          />
        </div>
        <div class="mb-2">
          <label class="block mb-1 text-gray-600">Phone Number</label>
          <input
            v-model="form.phone_number"
            type="text"
            class="border rounded w-full px-2 py-1 text-xs"
          />
        </div>
        <div class="mb-3">
          <label class="block mb-1 text-gray-600">Address</label>
          <input
            v-model="form.address"
            type="text"
            class="border rounded w-full px-2 py-1 text-xs"
          />
        </div>
          <div class="mb-3">
          <label class="block mb-1 text-gray-600">Password</label>
          <input
            v-model="form.password"
            type="text"
            class="border rounded w-full px-2 py-1 text-xs"
          />
        </div>
        <div class="flex justify-end gap-2">
          <button
            type="button"
            @click="$emit('close')"
            class="px-3 py-1 border rounded text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded"
          >
            Save
          </button>
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
        email: "",
        first_name: "",
        middle_name: "",
        last_name: "",
        phone_number: "",
        address: "",
        level:4,
        password:""
      },
    };
  },
  methods: {
    async saveUser() {
      try {
        const res = await this.$apiPost("/post_user", this.form);
        if (res) {
          this.$root.$refs.toast.showToast(
            "User added successfully",
            "success"
          );
        }
        this.$emit("saved");
        this.$emit("close");
      } catch (err) {
        console.error(err);
        this.$root.$refs.toast.showToast("Failed to add user", "error");
      }
    },
  },
};
</script>
