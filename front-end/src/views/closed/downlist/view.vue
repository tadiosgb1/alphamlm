<template>
  <div class="p-6 text-sm text-gray-800">
    <!-- Header -->
    <h1 class="text-2xl font-semibold mb-6">Downline List</h1>

    <!-- Filters -->
    <div class="bg-white p-4 rounded-lg shadow mb-6">
      <h2 class="font-medium mb-3">Show filters</h2>
      <div class="flex flex-col sm:flex-row gap-3 sm:items-end">
        <div class="flex-1">
          <label class="block text-xs mb-1">Username</label>
          <input
            v-model="filters.username"
            type="text"
            placeholder="Enter username (email)"
            class="border rounded-md px-2 py-1 w-full focus:ring-1 focus:ring-blue-400 text-xs"
          />
        </div>
        <div>
          <label class="block text-xs mb-1">From Level</label>
          <select
            v-model="filters.fromLevel"
            class="border rounded-md px-2 py-1 text-xs focus:ring-1 focus:ring-blue-400"
          >
            <option value="">Please select</option>
            <option v-for="lvl in 20" :key="lvl" :value="lvl">
              Level {{ lvl }}
            </option>
          </select>
        </div>
        <div>
          <label class="block text-xs mb-1">To Level</label>
          <select
            v-model="filters.toLevel"
            class="border rounded-md px-2 py-1 text-xs focus:ring-1 focus:ring-blue-400"
          >
            <option value="">Please select</option>
            <option v-for="lvl in 20" :key="lvl" :value="lvl">
              Level {{ lvl }}
            </option>
          </select>
        </div>

        <div class="flex gap-2">
          <button
            @click="search"
            class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-xs"
          >
            Search
          </button>
          <button
            @click="reset"
            class="bg-gray-200 hover:bg-gray-300 px-3 py-1.5 rounded-md text-xs"
          >
            ↻
          </button>
        </div>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex justify-end gap-2 mb-3">
      <button
        class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-xs flex items-center gap-1"
      >
        ⬇ Create Excel
      </button>
      <button
        class="bg-gray-200 hover:bg-gray-300 px-3 py-1.5 rounded-md text-xs flex items-center gap-1"
      >
        🖨 Print
      </button>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto border rounded-lg shadow-sm">
      <table class="min-w-full text-xs">
        <thead class="bg-gray-200 text-gray-600 uppercase text-[11px]">
          <tr>
            <th class="px-3 py-2 text-left">SL NO</th>
            <th class="px-3 py-2 text-left">Email</th>
            <th class="px-3 py-2 text-left">Wallet Balance</th>
            <th class="px-3 py-2 text-left">Phone</th>
            <th class="px-3 py-2 text-left">Date of Joining</th>
            <th class="px-3 py-2 text-left">User Level</th>
            <th class="px-3 py-2 text-center">Go to Tree</th>
          </tr>
        </thead>

        <tbody class="bg-white">
          <tr
            v-for="(user, i) in filteredList"
            :key="user.id + '-' + i"
            class="border-t hover:bg-gray-50"
          >
            <td class="px-3 py-2">{{ i + 1 }}</td>

            <td class="px-3 py-2 font-medium">
              {{ user.email }}
            </td>

            <td class="px-3 py-2">{{ user.wallet_balance }} Birr</td>

            <td class="px-3 py-2">{{ user.phone }}</td>

            <td class="px-3 py-2 text-gray-500">
              {{ formatDate(user.date_joined) }}
            </td>

            <td class="px-3 py-2">{{ user.level }}</td>

            <td class="px-3 py-2 text-center">
              <button
                @click="goSpecificTree(user.id)"
                class="text-blue-500 hover:text-blue-700"
              >
                Go Tree
              </button>
              <button
                v-if="subdownlist"
                @click="downlist(user.id)"
                class="text-blue-500 hover:text-blue-700"
              >
                Downlist
              </button>
            </td>
          </tr>

          <tr v-if="filteredList.length === 0">
            <td colspan="7" class="text-center py-3 text-gray-400">
              No records found.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "DownlineList",

  data() {
    return {
      filters: {
        username: "",
        fromLevel: "",
        toLevel: "",
      },

      users: [], // Flatten tree goes here
    };
  },

  created() {
    this.loadTree();
  },

  computed: {
    filteredList() {
      return this.users.filter((u) => {
        const matchesName =
          !this.filters.username ||
          u.email?.toLowerCase().includes(this.filters.username.toLowerCase());

        const matchesFrom =
          !this.filters.fromLevel || u.level >= this.filters.fromLevel;

        const matchesTo =
          !this.filters.toLevel || u.level <= this.filters.toLevel;

        return matchesName && matchesFrom && matchesTo;
      });
    },
  },

  methods: {
    async loadTree() {
      try {
        const userId = this.$route.query.userId || 2;

        const res = await this.$apiGetById(`/get_user_tree`, userId);
        // Recursively flatten the tree
        this.users = this.flattenTree(res.children);
      } catch (err) {
        console.error("Failed to load user tree:", err);
      }
    },

    downList(userId) {
      this.$router.push({
        path: "/dashboard/downlist",
        query: { userId: userId },
      });
    },
    goSpecificTree(userId) {
      this.$router.push({
        path: "/dashboard/genealogy-tree",
        query: { userId: userId },
      });
    },

    // --- 🔥 FLATTEN NESTED CHILDREN RECURSIVELY ---
    flattenTree(children) {
      let flat = [];

      for (let c of children) {
        flat.push({
          id: c.id,
          email: c.email,
          phone: c.phone_number,
          date_joined: c.date_joined,
          level: c.level,
          wallet_balance: c.wallet_balance,
        });

        // If this child has more children, flatten them too
        if (c.children && c.children.length > 0) {
          flat = flat.concat(this.flattenTree(c.children));
        }
      }

      return flat;
    },

    search() {},

    reset() {
      this.filters = { username: "", fromLevel: "", toLevel: "" };
    },

    formatDate(date) {
      return new Date(date).toLocaleString();
    },
  },
};
</script>

<style scoped></style>
