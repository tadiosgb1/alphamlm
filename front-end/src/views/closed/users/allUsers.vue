<template>
  <div class="text-sm text-gray-800">
    <!-- Header -->
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-lg font-semibold">All Users</h1>
      <button
        @click="showAdd = true"
        class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-xs"
      >
        + Add User
      </button>
    </div>

    <!-- Search + Page Size -->
    <div
      class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2"
    >
      <input
        v-model="searchQuery"
        @input="fetchUsers(1)"
        type="text"
        placeholder="Search by name or email..."
        class="border rounded-md px-2 py-1 text-xs w-full sm:w-64 focus:outline-none focus:ring-1 focus:ring-blue-400"
      />
      <div class="flex items-center gap-2 text-xs">
        <label>Show</label>
        <select
          v-model="pageSize"
          @change="fetchUsers(1)"
          class="border rounded-md px-1 py-0.5 text-xs"
        >
          <option v-for="size in [1, 5, 10, 20, 100]" :key="size" :value="size">
            {{ size }}
          </option>
        </select>
        <span>entries</span>
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto border rounded-lg shadow-sm">
      <table class="min-w-full text-xs hidden sm:table">
        <thead class="bg-gray-200 text-gray-600 uppercase text-[11px]">
          <tr>
            <th class="px-3 py-2 text-left">#</th>
            <th class="px-3 py-2 text-left">Email</th>
            <th class="px-3 py-2 text-left">Full Name</th>
            <th class="px-3 py-2 text-left">Phone</th>
            <th class="px-3 py-2 text-left">Wallet</th>
            <th class="px-3 py-2 text-left">Active</th>
            <th class="px-3 py-2 text-left">Joined</th>
            <th class="px-3 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white">
          <tr
            v-for="(user, index) in users"
            :key="user.id"
            class="border-t hover:bg-gray-50"
          >
            <td class="px-3 py-2">
              {{ (currentPage - 1) * pageSize + index + 1 }}
            </td>
            <td class="px-3 py-2 font-medium">{{ user.email }}</td>
            <td class="px-3 py-2">
              {{ user.first_name }} {{ user.middle_name }} {{ user.last_name }}
            </td>
            <td class="px-3 py-2">{{ user.phone_number || "-" }}</td>
            <td class="px-3 py-2">{{ user.wallet_balance }}</td>
            <td class="px-3 py-2">
              <span :class="user.is_active ? 'text-green-600' : 'text-red-500'">
                {{ user.is_active ? "Yes" : "No" }}
              </span>
            </td>
            <td class="px-3 py-2 text-gray-500">
              {{ formatDate(user.date_joined) }}
            </td>
            <td class="px-3 py-2">
              <button
                class="text-blue-500 hover:text-blue-700 mr-2"
                @click="openEdit(user)"
              >
                ✎
              </button>
              <button
                class="text-red-500 hover:text-red-700"
                @click="deleteUser(user.id)"
              >
                🗑
              </button>
            </td>
          </tr>

          <tr v-if="users.length === 0">
            <td colspan="8" class="text-center py-3 text-gray-400">
              No users found.
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Mobile List -->
      <div class="sm:hidden flex flex-col gap-2">
        <div
          v-for="user in users"
          :key="user.id"
          class="border rounded p-2 bg-white shadow-sm"
        >
          <div class="flex justify-between items-center">
            <span class="font-medium">{{ user.email }}</span>
            <div>
              <button
                class="text-blue-500 hover:text-blue-700 mr-2"
                @click="openEdit(user)"
              >
                ✎
              </button>
              <button
                class="text-red-500 hover:text-red-700"
                @click="deleteUser(user.id)"
              >
                🗑
              </button>
            </div>
          </div>
          <p class="text-gray-500 text-[11px] mt-1">
            {{ user.first_name }} {{ user.last_name }}
          </p>
          <p class="text-gray-500 text-[11px] mt-1">
            Phone: {{ user.phone_number || "-" }}
          </p>
          <p class="text-gray-500 text-[11px] mt-1">
            Wallet: {{ user.wallet_balance }}
          </p>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div class="flex items-center justify-between mt-4 text-xs">
      <span
        >Page {{ currentPage }} of {{ totalPages }} ({{ count }} total)</span
      >
      <div class="flex items-center gap-1">
        <button
          @click="fetchUsers(currentPage - 1)"
          :disabled="!previousPage"
          class="px-2 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
        >
          ◀ Prev
        </button>
        <button
          @click="fetchUsers(currentPage + 1)"
          :disabled="!nextPage"
          class="px-2 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
        >
          Next ▶
        </button>
      </div>
    </div>

    <!-- Modals -->
    <AddUser v-if="showAdd" @close="showAdd = false" @saved="fetchUsers" />
    <EditUser
      v-if="showEdit"
      :user="selectedUser"
      @close="showEdit = false"
      @saved="fetchUsers"
    />
  </div>
</template>

<script>
import AddUser from "./AddUser.vue";
import EditUser from "./EditUser.vue";

export default {
  components: { AddUser, EditUser },
  data() {
    return {
      users: [],
      count: 0,
      totalPages: 1,
      currentPage: 1,
      pageSize: 10,
      nextPage: null,
      previousPage: null,
      searchQuery: "",
      showAdd: false,
      showEdit: false,
      selectedUser: null,
    };
  },
  methods: {
    async fetchUsers(page = 1) {
      try {
        const params = {
          page,
          page_size: this.pageSize,
          search: this.searchQuery || undefined,
        };
        const res = await this.$apiGet("/get_users", params);

        console.log("res of users", res);

        this.users = res.data || [];
        this.count = res.count;
        this.totalPages = res.total_pages;
        this.currentPage = res.current_page;
        this.nextPage = res.next;
        this.previousPage = res.previous;
      } catch (err) {
        console.error(err);
      }
    },
    openEdit(user) {
      this.selectedUser = user;
      this.showEdit = true;
    },
    async deleteUser(id) {
      if (!confirm("Are you sure you want to delete this user?")) return;
      try {
        await this.$apiDelete(`/delete_user/${id}/`);
        this.fetchUsers(this.currentPage);
        this.$root.$refs.toast.showToast(
          "User deleted successfully",
          "success"
        );
      } catch (err) {
        console.error(err);
        this.$root.$refs.toast.showToast("Failed to delete user", "error");
      }
    },
    formatDate(dateStr) {
      return new Date(dateStr).toLocaleDateString();
    },
  },
  mounted() {
    this.fetchUsers();
  },
};
</script>
