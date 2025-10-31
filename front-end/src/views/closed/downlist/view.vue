<template>
  <div class="p-6 text-sm text-gray-800">
    <!-- Header -->
    <h1 class="text-2xl font-semibold mb-6">Downline List</h1>

    <!-- Filters -->
    <div class="bg-white p-4 rounded-lg shadow mb-6">
      <h2 class="font-medium mb-3">Show filters</h2>
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
        <div>
          <label class="block text-xs mb-1">From Level</label>
          <select
            v-model="filters.fromLevel"
            class="border rounded-md px-2 py-1 text-xs focus:ring-1 focus:ring-blue-400"
          >
            <option value="">Please select</option>
            <option v-for="lvl in 5" :key="lvl" :value="lvl">Level {{ lvl }}</option>
          </select>
        </div>
        <div>
          <label class="block text-xs mb-1">To Level</label>
          <select
            v-model="filters.toLevel"
            class="border rounded-md px-2 py-1 text-xs focus:ring-1 focus:ring-blue-400"
          >
            <option value="">Please select</option>
            <option v-for="lvl in 5" :key="lvl" :value="lvl">Level {{ lvl }}</option>
          </select>
        </div>
        <div class="flex gap-2">
          <button
            @click="search"
            class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-xs"
          >
            Search
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

    <!-- Actions -->
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
            <th class="px-3 py-2 text-left">SL NO</th>
            <th class="px-3 py-2 text-left">Name</th>
            <th class="px-3 py-2 text-left">Current Package</th>
            <th class="px-3 py-2 text-left">Sponsor Name</th>
            <th class="px-3 py-2 text-left">Date of Joining</th>
            <th class="px-3 py-2 text-left">User Level</th>
            <th class="px-3 py-2 text-center">Go to Tree</th>
          </tr>
        </thead>
        <tbody class="bg-white">
          <tr
            v-for="(user, i) in filteredList"
            :key="user.id"
            class="border-t hover:bg-gray-50"
          >
            <td class="px-3 py-2">{{ i + 1 }}</td>
            <td class="px-3 py-2 font-medium">{{ user.name }}</td>
            <td class="px-3 py-2">{{ user.package }}</td>
            <td class="px-3 py-2">{{ user.sponsor }}</td>
            <td class="px-3 py-2 text-gray-500">{{ user.joined }}</td>
            <td class="px-3 py-2">{{ user.level }}</td>
            <td class="px-3 py-2 text-center">
              <button class="text-blue-500 hover:text-blue-700">🌳</button>
            </td>
          </tr>

          <tr v-if="filteredList.length === 0">
            <td colspan="7" class="text-center py-3 text-gray-400">
              No records found.
            </td>
          </tr>
        </tbody>
      </table>
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
      users: [
        {
          id: 1,
          name: "Gizachew Bayable (samil123)",
          package: "Silver",
          sponsor: "Shewangzaw Belay (Shewa)",
          joined: "Sep 22nd 2022 - 10:47PM",
          level: 1,
        },
        {
          id: 2,
          name: "Masersha Dessie (Agumas)",
          package: "Silver",
          sponsor: "Shewangzaw Belay (Shewa)",
          joined: "Aug 6th 2022 - 9:40PM",
          level: 1,
        },
        {
          id: 3,
          name: "Henok Tesfaye (Etcarejr)",
          package: "Silver",
          sponsor: "Shewangzaw Belay (Shewa)",
          joined: "Aug 15th 2022 - 6:05PM",
          level: 2,
        },
        {
          id: 4,
          name: "Ephrem Abebe (epha23)",
          package: "Silver",
          sponsor: "Shewangzaw Belay (Shewa)",
          joined: "Oct 12th 2022 - 9:18PM",
          level: 2,
        },
        {
          id: 5,
          name: "Netsanet Guade (santa)",
          package: "Silver",
          sponsor: "Masersha Dessie (Agumas)",
          joined: "Sep 18th 2022 - 11:03AM",
          level: 2,
        },
      ],
    };
  },
  computed: {
    filteredList() {
      return this.users.filter((u) => {
        const matchesName =
          !this.filters.username ||
          u.name.toLowerCase().includes(this.filters.username.toLowerCase());
        const matchesFrom =
          !this.filters.fromLevel || u.level >= this.filters.fromLevel;
        const matchesTo =
          !this.filters.toLevel || u.level <= this.filters.toLevel;
        return matchesName && matchesFrom && matchesTo;
      });
    },
  },
  methods: {
    search() {
      // For now, computed handles filtering automatically
    },
    reset() {
      this.filters = { username: "", fromLevel: "", toLevel: "" };
    },
  },
};
</script>
