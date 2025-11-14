<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <!-- Header -->
    <div class="bg-white shadow-md rounded-lg p-6 mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Commission Report</h1>
      <div class="mt-4 flex items-center space-x-6">
        <div class="bg-green-100 text-green-700 p-4 rounded-xl shadow-sm">
          <p class="text-sm font-semibold">Total Commission</p>
          <p class="text-3xl font-bold">ETB 45,800.00</p>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 class="text-lg font-semibold text-gray-700 mb-4">Show Filters</h2>
      <div class="flex items-center space-x-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
          <select v-model="selectedRange" class="border rounded-lg p-2 w-40 focus:ring-2 focus:ring-blue-500">
            <option value="overall">Overall</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
        </div>
        <button @click="applyFilters" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">View</button>
        <button @click="resetFilters" class="p-2 border rounded-lg hover:bg-gray-200">
          <i class="fa fa-refresh"></i>
        </button>
      </div>
    </div>

    <!-- Table -->
    <div class="bg-white shadow-md rounded-lg overflow-hidden">
      <table class="min-w-full text-left border-collapse">
        <thead class="bg-gray-200 text-gray-700 text-sm uppercase">
          <tr>
            <th class="p-3">#</th>
            <th class="p-3">User Name</th>
            <th class="p-3">Full Name</th>
            <th class="p-3">Phone</th>
            <th class="p-3">Email</th>
            <th class="p-3">Amount Type</th>
            <th class="p-3">Total Amount</th>
            <th class="p-3">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in commissionData" :key="index" class="border-b hover:bg-gray-50">
            <td class="p-3">{{ index + 1 }}</td>
            <td class="p-3">{{ item.username }}</td>
            <td class="p-3">{{ item.fullName }}</td>
            <td class="p-3">{{ item.phone }}</td>
            <td class="p-3">{{ item.email }}</td>
            <td class="p-3">{{ item.amountType }}</td>
            <td class="p-3">{{ item.totalAmount }}</td>
            <td class="p-3">{{ item.amount }}</td>
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
      commissionData: [
        {
          username: "Enatx",
          fullName: "Hanna Teshager",
          phone: "+251 904907807",
          email: "muluyehana04@gmail.com",
          amountType: "Match Bonus",
          totalAmount: "ETB 1800",
          amount: "ETB 1800",
        },
        // ... more items if needed
      ],
    };
  },
  methods: {
    applyFilters() {
      console.log("Applying filters for", this.selectedRange);
    },
    resetFilters() {
      this.selectedRange = "overall";
    },
  },
};
</script>

<style scoped>
</style>
