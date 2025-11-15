<template>
  <div class="p-6 bg-gray-50 min-h-screen text-sm text-gray-800">
    <h1 class="text-2xl font-bold text-gray-800 mb-6 border-b pb-3">Referral List</h1>

    <div class="bg-white p-4 rounded-xl shadow-lg mb-6 border border-gray-200">
      <h2 class="font-semibold text-gray-700 mb-3">Filter Referral List</h2>
      <div class="flex flex-col sm:flex-row gap-4 sm:items-end">
        <div class="flex-1">
          <label class="block text-xs font-medium text-gray-600 mb-1">Username</label>
          <input
            v-model="filters.username"
            type="text"
            placeholder="Enter username"
            class="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500 text-sm shadow-sm"
          />
        </div>

        <div class="flex gap-2">
          <button
            @click="search"
            class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md transition duration-150"
          >
            View
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
              <th class="px-6 py-3 text-left">#</th>
              <th class="px-6 py-3 text-left">Name</th>
              <th class="px-6 py-3 text-left">Upline user</th>
              <th class="px-6 py-3 text-left">Join date</th>
              <th class="px-6 py-3 text-left">Email</th>
              <th class="px-6 py-3 text-left">Phone</th>
              <th class="px-6 py-3 text-left">Current package</th>
              <th class="px-6 py-3 text-left">Current rank</th>
              <th class="px-6 py-3 text-center">Go to tree</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="(ref, i) in filteredReferrals"
              :key="ref.id"
              class="hover:bg-green-50 transition duration-150"
            >
              <td class="px-6 py-4 whitespace-nowrap">{{ i + 1 }}</td>
              <td class="px-6 py-4 whitespace-nowrap font-medium">{{ ref.name }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ ref.upline }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-gray-500">{{ ref.joined }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ ref.email }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ ref.phone }}</td>
              <td class="px-6 py-4 whitespace-nowrap font-medium text-green-700">{{ ref.package }}</td>
              <td class="px-6 py-4 whitespace-nowrap font-medium">{{ ref.rank }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-center">
                <button class="text-green-500 hover:text-green-700 transition duration-150" title="Go to Genealogy Tree">
                  🌳
                </button>
              </td>
            </tr>

            <tr v-if="filteredReferrals.length === 0">
              <td colspan="9" class="text-center py-6 text-gray-400 italic">
                No referral records found.
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
  name: "ReferralList",
  data() {
    return {
      filters: {
        username: "",
      },
      referrals: [
        {
          id: 1,
          name: "Shewangzaw Muluye, Belay (Shewangzawx)",
          upline: "Genet Dedefa (Genet00)",
          joined: "Sep 24th 2024 - 4:06PM",
          email: "shewangzawmuluye9@gmail.com",
          phone: "+251 0949906060",
          package: "Silver NP",
          rank: "PROMOTER",
        },
        {
          id: 2,
          name: "Tadesse Gebremicheal (Tadesse123)",
          upline: "Shewangzaw Muluye (Shewangzawx)",
          joined: "Oct 2nd 2024 - 5:15PM",
          email: "tadesse.dev@example.com",
          phone: "+251 0911223344",
          package: "Silver NP",
          rank: "MEMBER",
        },
      ],
    };
  },
  computed: {
    filteredReferrals() {
      if (!this.filters.username) return this.referrals;
      const query = this.filters.username.toLowerCase();
      // Filtering by name, email, or phone for better search capability
      return this.referrals.filter((r) => 
          r.name.toLowerCase().includes(query) ||
          r.email.toLowerCase().includes(query) ||
          r.phone.includes(query) // Assuming phone search doesn't require lowercasing
        );
    },
  },
  async mounted() {
    // Example API call preserved
    const params = {
      email: "laxoha5974@fanwn.comrfrc",
    };
    try {
        const res = await this.$apiGet(`/get_users`, params);
        console.log("res user by email", res);
    } catch (err) {
        console.error("Failed to fetch user by email:", err);
    }
  },
  methods: {
    search() {
      // Filtering is handled automatically by the computed property, 
      // but keeping this method for external search trigger if needed.
    },
    reset() {
      this.filters.username = "";
    },
  },
};
</script>

<style scoped>
/* Standardizing table layout */
.overflow-x-auto table th, .overflow-x-auto table td { white-space: nowrap; }
</style>