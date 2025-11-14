<template>
  <div class="p-6 space-y-6">

    <h1 class="text-3xl font-bold text-gray-800">Group PV History</h1>

    <!-- Summary Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      
      <div class="bg-white rounded-2xl shadow p-6 flex items-center gap-4">
        <div class="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-xl">
          👥
        </div>

        <div>
          <p class="text-gray-600 text-sm">Group PV</p>
          <p class="text-2xl font-semibold text-gray-800 mt-1">{{ groupPV }}</p>
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
      <div class="flex gap-4 items-end">

        <div>
          <label class="text-gray-700 text-sm">Date range</label>
          <select v-model="filter" class="px-4 py-2 border rounded-lg">
            <option>Overall</option>
            <option>Today</option>
            <option>This Month</option>
          </select>
        </div>

        <button
          @click="loadGroupPV"
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
            <th v-for="(h, i) in tableHeaders" :key="i" class="px-4 py-3 text-left">
              {{ h }}
            </th>
          </tr>
        </thead>

        <tbody>

          <tr v-if="groupList.length === 0">
            <td :colspan="tableHeaders.length" class="text-center py-6 text-gray-400 italic">
              No details found
            </td>
          </tr>

          <tr
            v-for="(item, index) in groupList"
            :key="index"
            class="border-t hover:bg-gray-50"
          >
            <td class="px-4 py-3">{{ index + 1 }}</td>
            <td class="px-4 py-3">{{ item.contributor }}</td>
            <td class="px-4 py-3">{{ item.beneficiary }}</td>
            <td class="px-4 py-3">{{ item.groupPV }}</td>
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
  name: "GroupPV",

  data() {
    return {
      groupPV: 450,
      totalPositional: 180,

      filter: "Overall",

      // SAMPLE DATA FOR GROUP PV ⬇⬇⬇
      groupList: [
        {
          contributor: "maria22",
          beneficiary: "john123",
          groupPV: 120,
          positional: 50,
          date: "2025-02-01",
          type: "Downline Purchase"
        },
        {
          contributor: "tesfanet",
          beneficiary: "john123",
          groupPV: 330,
          positional: 130,
          date: "2025-02-15",
          type: "Activation"
        }
      ],

      tableHeaders: [
        "#",
        "Contributed Member",
        "Beneficiary Member",
        "Group PV",
        "Positional Points",
        "Date",
        "Type"
      ]
    };
  },

  methods: {
    loadGroupPV() {
      console.log("Loading Group PV...");
    }
  }
};
</script>
