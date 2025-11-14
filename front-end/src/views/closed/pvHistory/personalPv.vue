<template>
  <div class="p-6 space-y-6">

    <h1 class="text-3xl font-bold text-gray-800">Personal PV Report</h1>

    <!-- Summary Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      
      <div class="bg-white rounded-2xl shadow p-6 flex items-center gap-4">
        <div class="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-xl">
          🌿
        </div>

        <div>
          <p class="text-gray-600 text-sm">Personal PV</p>
          <p class="text-2xl font-semibold text-gray-800 mt-1">{{ personalPV }}</p>
        </div>
      </div>

      <div class="bg-white rounded-2xl shadow p-6 flex items-center gap-4">
        <div class="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center text-xl">
          ⭐
        </div>

        <div>
          <p class="text-gray-600 text-sm">Total Positional Points</p>
          <p class="text-2xl font-semibold text-gray-800 mt-1">{{ totalPositional }}</p>
        </div>
      </div>

    </div>

    <!-- Filter -->
    <div class="bg-white rounded-2xl shadow p-6">
      <div class="flex flex-col md:flex-row items-start md:items-end gap-4">
        
        <div>
          <label class="text-gray-700 text-sm">Date range</label>
          <select v-model="filter" class="px-4 py-2 border rounded-lg">
            <option>Overall</option>
            <option>Today</option>
            <option>This Month</option>
            <option>Last Month</option>
          </select>
        </div>

        <button
          @click="loadPV"
          class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          View
        </button>
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto bg-white shadow rounded-2xl">
      <table class="min-w-full text-sm text-gray-700">
        <thead class="bg-gray-100 text-gray-600 uppercase text-xs">
          <tr>
            <th v-for="(head, i) in tableHeaders" :key="i" class="px-4 py-3 text-left">
              {{ head }}
            </th>
          </tr>
        </thead>

        <tbody>

          <tr v-if="personalPVList.length === 0">
            <td :colspan="tableHeaders.length" class="text-center py-6 text-gray-400 italic">
              No details found
            </td>
          </tr>

          <tr
            v-for="(item, index) in personalPVList"
            :key="index"
            class="border-t hover:bg-gray-50"
          >
            <td class="px-4 py-3">{{ index + 1 }}</td>
            <td class="px-4 py-3">{{ item.username }}</td>
            <td class="px-4 py-3">{{ item.fullname }}</td>
            <td class="px-4 py-3">{{ item.phone }}</td>
            <td class="px-4 py-3">{{ item.email }}</td>
            <td class="px-4 py-3">{{ item.pv }}</td>
            <td class="px-4 py-3">{{ item.positional }}</td>
            <td class="px-4 py-3">{{ item.date }}</td>
            <td class="px-4 py-3">{{ item.type }}</td>
          </tr>

        </tbody>
      </table>
    </div>

  </div>
</template>

<script>
export default {
  name: "PersonalPV",

  data() {
    return {
      personalPV: 120,
      totalPositional: 50,

      filter: "Overall",

      // SAMPLE DATA HERE ⬇⬇⬇
      personalPVList: [
        {
          username: "john123",
          fullname: "John Michael",
          phone: "0912123456",
          email: "john@gmail.com",
          pv: 50,
          positional: 20,
          date: "2025-01-12",
          type: "Product Purchase"
        },
        {
          username: "john123",
          fullname: "John Michael",
          phone: "0912123456",
          email: "john@gmail.com",
          pv: 70,
          positional: 30,
          date: "2025-02-02",
          type: "Package Upgrade"
        }
      ],

      tableHeaders: [
        "#",
        "Username",
        "Full name",
        "Phone",
        "Email",
        "Personal PV",
        "Positional Points",
        "Date",
        "Type"
      ]
    };
  },

  methods: {
    loadPV() {
      console.log("Loading Personal PV Data...");
    }
  }
};
</script>
