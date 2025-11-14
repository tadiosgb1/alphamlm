<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <!-- Header -->
    <h1 class="text-3xl font-bold text-gray-800 mb-6">Cycle History</h1>

    <!-- Filters -->
    <div class="bg-white p-5 rounded-xl shadow mb-8">
      <h2 class="text-lg font-semibold mb-4">Show Filters</h2>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="text-gray-600">From Date</label>
          <input type="date" class="w-full mt-1 p-2 border rounded-md" />
        </div>
        <div>
          <label class="text-gray-600">To Date</label>
          <input type="date" class="w-full mt-1 p-2 border rounded-md" />
        </div>
        <div class="flex items-end">
          <button class="bg-blue-600 text-white px-5 py-2 rounded-md shadow hover:bg-blue-700 mr-3">View</button>
          <button class="border px-4 py-2 rounded-md shadow hover:bg-gray-100">⟳</button>
        </div>
      </div>
    </div>

    <!-- Table -->
    <div class="bg-white p-5 rounded-xl shadow">
      <h2 class="text-xl font-semibold mb-4">Cycle History</h2>

      <div class="overflow-x-auto">
        <table class="min-w-full border">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-4 py-2 border text-left">#</th>
              <th class="px-4 py-2 border text-left">Contributed Member</th>
              <th class="px-4 py-2 border text-left">Beneficiary Member</th>
              <th class="px-4 py-2 border text-left">Total Pair</th>
              <th class="px-4 py-2 border text-left">Date</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="row in sampleData" :key="row.id" class="hover:bg-gray-50">
              <td class="px-4 py-2 border">{{ row.id }}</td>
              <td class="px-4 py-2 border">{{ row.contributed }}</td>
              <td class="px-4 py-2 border">{{ row.beneficiary }}</td>
              <td class="px-4 py-2 border font-semibold">{{ row.totalPair }}</td>
              <td class="px-4 py-2 border">{{ row.date }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CycleHistoryReport",
  data() {
    return {
      sampleData: [
        {
          id: 1,
          contributed: "Kaslaem Mucheye, Teshome (Kash05x1)",
          beneficiary: "Hana Teshager (Enatx)",
          totalPair: 6,
          date: "Jan 13th 2025 - 11:24AM",
        },
        {
          id: 2,
          contributed: "Ewnetu Ayichew, Kassahaw (Ewunetu24)",
          beneficiary: "Hana Teshager (Enatx)",
          totalPair: 5,
          date: "Dec 3rd 2024 - 4:57PM",
        },
        {
          id: 3,
          contributed: "Banchialem Birku, Hailu (Banchu25x1)",
          beneficiary: "Hana Teshager (Enatx)",
          totalPair: 4,
          date: "Nov 5th 2024 - 1:42AM",
        },
        {
          id: 4,
          contributed: "Dessalegn Alem, Azale (Dessie24)",
          beneficiary: "Hana Teshager (Enatx)",
          totalPair: 3,
          date: "Nov 4th 2024 - 3:03PM",
        },
        {
          id: 5,
          contributed: "Hailu Melaku, Workeneh (Hailu17)",
          beneficiary: "Hana Teshager (Enatx)",
          totalPair: 2,
          date: "Sep 24th 2024 - 4:40PM",
        },
        {
          id: 6,
          contributed: "Hana Mekonnen (hana12)",
          beneficiary: "Hana Teshager (Enatx)",
          totalPair: 1,
          date: "Oct 30th 2022 - 1:19PM",
        },
      ],
    };
  },
};
</script>

<style scoped>
</style>