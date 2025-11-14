<template>
  <div class="p-6 text-sm text-gray-800">
    <!-- Header -->
    <h1 class="text-2xl font-semibold mb-6">Referral List</h1>

    <!-- Filter Section -->
    <div class="bg-white p-4 rounded-lg shadow mb-6">
      <h2 class="font-medium mb-3">Referral List</h2>
      <div class="flex flex-col sm:flex-row gap-3 sm:items-end">
        <div class="flex-1">
          <label class="block text-xs mb-1">Username</label>
          <input
            v-model="filters.username"
            type="text"
            placeholder="Enter username"
            class="border rounded-md px-2 py-1 w-full focus:ring-1 focus:ring-blue-400 text-xs"
          />
        </div>

        <div class="flex gap-2">
          <button
            @click="search"
            class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-xs"
          >
            View
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

    <!-- Action Buttons -->
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
            <th class="px-3 py-2 text-left">#</th>
            <th class="px-3 py-2 text-left">Name</th>
            <th class="px-3 py-2 text-left">Upline user</th>
            <th class="px-3 py-2 text-left">Join date</th>
            <th class="px-3 py-2 text-left">Email</th>
            <th class="px-3 py-2 text-left">Phone</th>
            <th class="px-3 py-2 text-left">Current package</th>
            <th class="px-3 py-2 text-left">Current rank</th>
            <th class="px-3 py-2 text-center">Go to tree</th>
          </tr>
        </thead>
        <tbody class="bg-white">
          <tr
            v-for="(ref, i) in filteredReferrals"
            :key="ref.id"
            class="border-t hover:bg-gray-50"
          >
            <td class="px-3 py-2">{{ i + 1 }}</td>
            <td class="px-3 py-2 font-medium">{{ ref.name }}</td>
            <td class="px-3 py-2">{{ ref.upline }}</td>
            <td class="px-3 py-2 text-gray-500">{{ ref.joined }}</td>
            <td class="px-3 py-2">{{ ref.email }}</td>
            <td class="px-3 py-2">{{ ref.phone }}</td>
            <td class="px-3 py-2">{{ ref.package }}</td>
            <td class="px-3 py-2">{{ ref.rank }}</td>
            <td class="px-3 py-2 text-center">
              <button class="text-blue-500 hover:text-blue-700">🌳</button>
            </td>
          </tr>

          <tr v-if="filteredReferrals.length === 0">
            <td colspan="9" class="text-center py-3 text-gray-400">
              No referral records found.
            </td>
          </tr>
        </tbody>
      </table>
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
      return this.referrals.filter((r) => r.name.toLowerCase().includes(query));
    },
  },
  async mounted() {
    const params = {
      email: "laxoha5974@fanwn.comrfrc",
    };
    const res = await this.$apiGet(`/get_users`, params);
    console.log("res user by email", res);
  },
  methods: {
    search() {
      // Computed handles filtering automatically
    },
    reset() {
      this.filters.username = "";
    },
  },
};
</script>
