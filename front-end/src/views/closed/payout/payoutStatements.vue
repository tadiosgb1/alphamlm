<template>
  <section class="min-h-screen bg-gray-50 p-6 text-sm text-gray-800">
    <!-- Header -->
    <h1 class="text-2xl font-semibold mb-6">Withdraw Statements</h1>

    <!-- Summary Cards -->
    <div class="grid md:grid-cols-4 gap-4 mb-8">
      <div
        v-for="(item, index) in summary"
        :key="index"
        class="bg-white rounded-xl shadow p-5 flex flex-col justify-between"
      >
        <div class="flex justify-between items-center mb-2">
          <h2 class="text-xs uppercase text-gray-500 font-medium">{{ item.title }}</h2>
          <span :class="item.color" class="text-xs font-bold">ETB</span>
        </div>
        <p class="text-xl font-semibold">{{ formatAmount(item.amount) }}</p>
      </div>
    </div>

    <!-- Filters -->
    <div class="bg-white rounded-xl shadow p-5 mb-8">
      <h3 class="font-semibold mb-4">Show Filters</h3>

      <div class="grid md:grid-cols-5 gap-4 items-center">
        <!-- Date Range -->
        <div>
          <label class="block text-xs font-medium text-gray-500 mb-1">Date range</label>
          <select
            v-model="filters.range"
            class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
          >
            <option value="custom">Custom</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
        </div>

        <!-- From Date -->
        <div>
          <label class="block text-xs font-medium text-gray-500 mb-1">From date</label>
          <input
            type="date"
            v-model="filters.from"
            class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <!-- To Date -->
        <div>
          <label class="block text-xs font-medium text-gray-500 mb-1">To date</label>
          <input
            type="date"
            v-model="filters.to"
            class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <!-- Amount Type -->
        <div>
          <label class="block text-xs font-medium text-gray-500 mb-1">Amount type</label>
          <select
            v-model="filters.type"
            class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Please select</option>
            <option value="released">Released</option>
            <option value="pending">Pending</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <!-- Buttons -->
        <div class="flex items-end gap-2">
          <button
            @click="filterRecords"
            class="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2"
          >
            View
          </button>
          <button
            @click="resetFilters"
            class="border border-gray-300 rounded-lg px-3 py-2 hover:bg-gray-100"
          >
            ⟳
          </button>
        </div>
      </div>
    </div>

    <!-- Table -->
    <div class="bg-white rounded-xl shadow p-5">
      <table class="w-full border-collapse">
        <thead class="text-xs uppercase bg-gray-100 text-gray-600">
          <tr>
            <th class="py-3 px-2 text-left">#</th>
            <th class="py-3 px-2 text-left">Requested Date</th>
            <th class="py-3 px-2 text-left">Status</th>
            <th class="py-3 px-2 text-left">Trans Fee</th>
            <th class="py-3 px-2 text-left">Amount</th>
            <th class="py-3 px-2 text-left">Reason</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(item, index) in filteredData"
            :key="index"
            class="border-b hover:bg-gray-50"
          >
            <td class="py-3 px-2">{{ index + 1 }}</td>
            <td class="py-3 px-2">{{ item.date }}</td>
            <td class="py-3 px-2">{{ item.status }}</td>
            <td class="py-3 px-2">ETB{{ item.transFee }}</td>
            <td class="py-3 px-2">ETB{{ item.amount }}</td>
            <td class="py-3 px-2">{{ item.reason }}</td>
          </tr>
        </tbody>
      </table>

      <p
        v-if="filteredData.length === 0"
        class="text-center text-gray-400 py-6 text-sm"
      >
        No data found for the selected filters.
      </p>
    </div>
  </section>
</template>

<script>
export default {
  name: "WithdrawStatement",

  data() {
    return {
      summary: [
        { title: "Total Withdrawed Amount", amount: 0, color: "text-green-500" },
        { title: "Total Deleted", amount: 0, color: "text-blue-500" },
        { title: "Total Cancelled", amount: 0, color: "text-red-500" },
        { title: "Total Pending", amount: 0, color: "text-purple-500" },
      ],

      filters: {
        range: "custom",
        from: "",
        to: "",
        type: "",
      },

      records: [
        {
          date: "Feb 25th 2025 - 3:46PM",
          status: "Released",
          transFee: 36,
          amount: 3564,
          reason: "NA",
        },
        {
          date: "Dec 25th 2024 - 4:19PM",
          status: "Released",
          transFee: 296,
          amount: 29304,
          reason: "NA",
        },
        {
          date: "Dec 25th 2023 - 7:50PM",
          status: "Released",
          transFee: 126,
          amount: 12474,
          reason: "NA",
        },
      ],
    };
  },

  computed: {
    filteredData() {
      return this.records.filter((r) => {
        if (this.filters.type && r.status.toLowerCase() !== this.filters.type.toLowerCase()) {
          return false;
        }
        return true;
      });
    },
  },

  methods: {
    formatAmount(value) {
      return value.toLocaleString("en-US", { minimumFractionDigits: 2 });
    },
    filterRecords() {
      console.log("Filters applied:", this.filters);
    },
    resetFilters() {
      this.filters = { range: "custom", from: "", to: "", type: "" };
    },
  },
};
</script>
