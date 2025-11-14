<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <div class="bg-white shadow rounded-lg p-6">
      <h2 class="text-2xl font-bold mb-4">Carry History</h2>

      <!-- Summary Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div class="p-4 bg-green-50 rounded shadow">
          <p class="text-gray-600">Total Pair</p>
          <p class="text-3xl font-bold text-green-600">31</p>
        </div>
        <div class="p-4 bg-blue-50 rounded shadow">
          <p class="text-gray-600">Total Left</p>
          <p class="text-3xl font-bold text-blue-600">30625</p>
        </div>
        <div class="p-4 bg-red-50 rounded shadow">
          <p class="text-gray-600">Total Right</p>
          <p class="text-3xl font-bold text-red-600">41820</p>
        </div>
        <div class="p-4 bg-yellow-50 rounded shadow">
          <p class="text-gray-600">Today's Pair</p>
          <p class="text-3xl font-bold text-yellow-600">0</p>
        </div>
      </div>

      <!-- Filters -->
      <div class="bg-gray-50 p-4 rounded mb-6 flex items-end gap-4">
        <div>
          <label class="text-sm">From Date</label>
          <input type="date" v-model="filter.from" class="border rounded p-2 w-full" />
        </div>
        <div>
          <label class="text-sm">To Date</label>
          <input type="date" v-model="filter.to" class="border rounded p-2 w-full" />
        </div>
        <button @click="applyFilter" class="bg-blue-600 text-white px-4 py-2 rounded">View</button>
        <button @click="resetFilter" class="bg-gray-300 px-3 py-2 rounded">⟳</button>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="min-w-full border text-sm">
          <thead class="bg-gray-200">
            <tr>
              <th class="p-2 border">#</th>
              <th class="p-2 border text-left">Cycle</th>
              <th class="p-2 border">Left Carry</th>
              <th class="p-2 border">Right Carry</th>
              <th class="p-2 border">Left Pair</th>
              <th class="p-2 border">Right Pair</th>
              <th class="p-2 border">Weak Side</th>
              <th class="p-2 border">Pair Amount</th>
              <th class="p-2 border">Net Pair Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, i) in list" :key="item.id" class="hover:bg-gray-100">
              <td class="p-2 border">{{ i + 1 }}</td>
              <td class="p-2 border">{{ item.cycle }}</td>
              <td class="p-2 border">{{ item.leftCarry }}</td>
              <td class="p-2 border">{{ item.rightCarry }}</td>
              <td class="p-2 border">{{ item.leftPair }}</td>
              <td class="p-2 border">{{ item.rightPair }}</td>
              <td class="p-2 border">{{ item.weakSide }}</td>
              <td class="p-2 border">{{ item.pairAmount }}</td>
              <td class="p-2 border">{{ item.netPairAmount }}</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filter: { from: '', to: '' },

      list: [
        {
          id: 1,
          cycle: '2025-01',
          leftCarry: 42300,
          rightCarry: 38200,
          leftPair: 12000,
          rightPair: 12000,
          weakSide: 'Right',
          pairAmount: 2500,
          netPairAmount: 2000
        },
        {
          id: 2,
          cycle: '2025-02',
          leftCarry: 35000,
          rightCarry: 41000,
          leftPair: 14000,
          rightPair: 14000,
          weakSide: 'Left',
          pairAmount: 2600,
          netPairAmount: 2100
        }
      ]
    }
  },

  methods: {
    applyFilter() {
      console.log('Filtering...', this.filter)
    },
    resetFilter() {
      this.filter = { from: '', to: '' }
    }
  }
}
</script>

<style scoped>
</style>