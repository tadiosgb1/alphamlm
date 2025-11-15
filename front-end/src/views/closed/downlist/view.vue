<template>
  <div class="p-6 bg-gray-50 min-h-screen text-sm text-gray-800">
    <h1 class="text-xl font-bold text-gray-800 mb-6 border-b pb-3">Downline List</h1>

    <div class="bg-white p-4 rounded-xl shadow-lg mb-6 border border-gray-200">
      <h2 class="font-semibold text-gray-700 mb-3">Filter Downline</h2>
      <div class="flex flex-col sm:flex-row gap-4 sm:items-end">
        <div class="flex-1">
          <label class="block text-xs font-medium text-gray-600 mb-1">Username (Email)</label>
          <input
            v-model="filters.username"
            type="text"
            placeholder="Enter username (email)"
            class="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500 text-sm shadow-sm"
          />
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-600 mb-1">From Level</label>
          <select
            v-model="filters.fromLevel"
            class="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white shadow-sm"
          >
            <option value="">Any Level</option>
            <option v-for="lvl in 20" :key="lvl" :value="lvl">
              Level {{ lvl }}
            </option>
          </select>
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-600 mb-1">To Level</label>
          <select
            v-model="filters.toLevel"
            class="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white shadow-sm"
          >
            <option value="">Any Level</option>
            <option v-for="lvl in 20" :key="lvl" :value="lvl">
              Level {{ lvl }}
            </option>
          </select>
        </div>

        <div class="flex gap-2">
          <button
            @click="search"
            class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md transition duration-150"
          >
            Search
          </button>
          <button
            @click="reset"
            class="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm shadow-md transition duration-150"
            title="Reset Filters"
          >
            <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 0020.42 18m-4.048-7.587l.42-2.126M18 9h4.5v1.5m-3.91 3.587l-.42 2.126M6 15a8.001 8.001 0 0015.356-2H20.42M4 12h4.5v1.5M10 20l-1-1 1-1m-1-5l1-1-1-1" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <div class="flex justify-end gap-3 mb-4">
      <button
        class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-1 shadow-md transition duration-150"
      >
        <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3M3 17v-4a1 1 0 011-1h16a1 1 0 011 1v4m-5 4H8a2 2 0 01-2-2v-3a2 2 0 012-2h8a2 2 0 012 2v3a2 2 0 01-2 2z" />
        </svg>
        <span>Create Excel</span>
      </button>
      <button
        class="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm flex items-center gap-1 shadow-md transition duration-150"
      >
        <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h4m-4 0v-2m4 2v-2m-4 2h4m-4 0a1 1 0 01-1-1v-2a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1zM7 10V7a3 3 0 013-3h4a3 3 0 013 3v3" />
        </svg>
        <span>Print</span>
      </button>
    </div>

    <div class="bg-white shadow-xl overflow-hidden rounded-xl border border-gray-200">
      <div class="overflow-x-auto">
        <table class="min-w-full text-sm divide-y divide-gray-200">
          <thead class="bg-gray-100 text-gray-700 uppercase text-xs font-semibold">
            <tr>
              <th class="px-6 py-3 text-left">SL NO</th>
              <th class="px-6 py-3 text-left">Email</th>
              <th class="px-6 py-3 text-left">Wallet Balance</th>
              <th class="px-6 py-3 text-left">Phone</th>
              <th class="px-6 py-3 text-left">Date of Joining</th>
              <th class="px-6 py-3 text-left">User Level</th>
              <th class="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="(user, i) in filteredList"
              :key="user.id + '-' + i"
              class="hover:bg-green-50 transition duration-150"
            >
              <td class="px-6 py-4 whitespace-nowrap">{{ i + 1 }}</td>

              <td class="px-6 py-4 whitespace-nowrap font-medium text-gray-800">
                {{ user.email }}
              </td>

              <td class="px-6 py-4 whitespace-nowrap text-green-700 font-medium">{{ user.wallet_balance }} Birr</td>

              <td class="px-6 py-4 whitespace-nowrap">{{ user.phone }}</td>

              <td class="px-6 py-4 whitespace-nowrap text-gray-500">
                {{ formatDate(user.date_joined) }}
              </td>

              <td class="px-6 py-4 whitespace-nowrap font-semibold">{{ user.level }}</td>

              <td class="px-6 py-4 whitespace-nowrap text-center space-x-3">
                <button
                  @click="goSpecificTree(user.id)"
                  class="text-green-500 hover:text-green-700 font-medium"
                  title="View Genealogy Tree"
                >
                  Go Tree
                </button>
                <button 
                  v-if="user.has_children1" 
                  @click="downList(user.id)"
                  class="text-green-500 hover:text-green-700 font-medium"
                  title="View Sub-Downlist"
                >
                  Downlist
                </button>
              </td>
            </tr>

            <tr v-if="filteredList.length === 0">
              <td colspan="7" class="text-center py-6 text-gray-400 italic">
                No records found matching the criteria.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
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
          !this.filters.fromLevel || u.level >= parseInt(this.filters.fromLevel);

        const matchesTo =
          !this.filters.toLevel || u.level <= parseInt(this.filters.toLevel);

        return matchesName && matchesFrom && matchesTo;
      });
    },
  },

  methods: {
    async loadTree() {
      try {
        // Fetch the user ID from the route query, defaulting to 2 (or a root ID)
        const userId = this.$route.query.userId || 2; 

        // Assume /get_user_tree/:userId is the endpoint structure based on usage
        const res = await this.$apiGetById(`/get_user_tree`, userId); 
        
        // Recursively flatten the tree, starting from the children of the root user
        this.users = this.flattenTree(res.children); 
      } catch (err) {
        console.error("Failed to load user tree:", err);
        // Optionally set users to [] on error
        this.users = [];
      }
    },

    // Renamed to follow standard camelCase convention
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
        // Prepare the user object
        const user = {
          id: c.id,
          email: c.email,
          phone: c.phone_number,
          date_joined: c.date_joined,
          level: c.level,
          wallet_balance: c.wallet_balance,
          // Add a helper flag to enable/disable the "Downlist" button
          has_children: c.children && c.children.length > 0
        };

        flat.push(user);

        // If this child has more children, flatten them too
        if (user.has_children) {
          flat = flat.concat(this.flattenTree(c.children));
        }
      }

      return flat;
    },

    // Re-load the tree with current filters (though filtering is client-side)
    search() {
      // Since filtering is computed property (client-side), searching just forces a re-render.
      // If loadTree used filters, we would call it here: this.loadTree();
    },

    reset() {
      this.filters = { username: "", fromLevel: "", toLevel: "" };
    },

    formatDate(date) {
      // Ensure date is valid before formatting
      if (!date) return '-';
      return new Date(date).toLocaleString();
    },
  },
  // Ensure we call loadTree again if the route query changes (e.g., when navigating to a sub-downlist)
  watch: {
    '$route.query.userId': 'loadTree'
  }
};
</script>

<style scoped>
/* Standardizing table layout */
.overflow-x-auto table th, .overflow-x-auto table td { white-space: nowrap; }
</style>