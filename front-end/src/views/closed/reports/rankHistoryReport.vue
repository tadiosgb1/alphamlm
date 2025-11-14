<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <!-- Header -->
    <div class="bg-white shadow-md rounded-lg p-6 mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Rank History Report</h1>
    </div>

    <!-- Filters -->
    <div class="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 class="text-lg font-semibold text-gray-700 mb-4">Show Filters</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="text-sm font-medium text-gray-600">Date Range</label>
          <select v-model="selectedRange" class="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500">
            <option value="overall">Overall</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
        </div>
        <div class="flex items-end space-x-4">
          <button @click="applyFilters" class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">View</button>
          <button @click="resetFilters" class="p-2 border rounded-lg hover:bg-gray-200">
            <i class="fa fa-refresh"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Table -->
    <div class="bg-white shadow-md rounded-lg overflow-hidden">
      <table class="min-w-full text-left border-collapse">
        <thead class="bg-indigo-50 text-gray-700 text-sm uppercase">
          <tr>
            <th class="p-3">#</th>
            <th class="p-3">User Name</th>
            <th class="p-3">Full Name</th>
            <th class="p-3">Phone</th>
            <th class="p-3">Email</th>
            <th class="p-3">Current Rank</th>
            <th class="p-3">Previous Rank</th>
            <th class="p-3">Status</th>
            <th class="p-3">Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="rankData.length === 0">
            <td colspan="9" class="text-center p-6 text-gray-500">No details found</td>
          </tr>
          <tr v-for="(item, index) in rankData" :key="index" class="border-b hover:bg-gray-50 text-sm">
            <td class="p-3">{{ index + 1 }}</td>
            <td class="p-3">{{ item.username }}</td>
            <td class="p-3">{{ item.fullName }}</td>
            <td class="p-3">{{ item.phone }}</td>
            <td class="p-3">{{ item.email }}</td>
            <td class="p-3 font-semibold text-green-700">{{ item.currentRank }}</td>
            <td class="p-3">{{ item.previousRank }}</td>
            <td class="p-3">
              <span :class="{
                'text-green-600 font-semibold': item.status === 'Promoted',
                'text-red-600 font-semibold': item.status === 'Demoted',
              }">
                {{ item.status }}
              </span>
            </td>
            <td class="p-3">{{ item.date }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedRange: "overall",
      rankData: [
        {
          username: "Johndoe01",
          fullName: "John Doe",
          phone: "+251 911223344",
          email: "john@example.com",
          currentRank: "Silver",
          previousRank: "Bronze",
          status: "Promoted",
          date: "2025-11-14",
        },
        {
          username: "Marta23",
          fullName: "Marta Kebede",
          phone: "+251 922334455",
          email: "marta@example.com",
          currentRank: "Bronze",
          previousRank: "Silver",
          status: "Demoted",
          date: "2025-11-10",
        },
      ],
    };
  },
  methods: {
    applyFilters() {
      console.log("Applying filters for:", this.selectedRange);
    },
    resetFilters() {
      this.selectedRange = "overall";
    },
  },
};
</script>

<style scoped>
</style>
