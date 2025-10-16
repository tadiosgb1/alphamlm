<template>
  <div class="p-4 text-sm text-gray-800">
    <!-- Header -->
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-lg font-semibold">MLM Settings</h1>
      <button
        @click="showAdd = true"
        class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-xs"
      >
        + Add Setting
      </button>
    </div>

    <!-- Desktop Table -->
    <div class="hidden sm:block overflow-x-auto border rounded-lg shadow-sm">
      <table class="min-w-full text-xs">
        <thead class="bg-gray-200 text-gray-600 uppercase text-[11px]">
          <tr>
            <th class="px-3 py-2 text-left">#</th>
            <th class="px-3 py-2 text-left">Max Level</th>
            <th class="px-3 py-2 text-left">Min Withdrawal</th>
            <th class="px-3 py-2 text-left">Payout Frequency</th>
            <th class="px-3 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white">
          <tr
            v-for="(item, index) in settings"
            :key="item.id"
            class="border-t hover:bg-gray-50"
          >
            <td class="px-3 py-2">{{ index + 1 }}</td>
            <td class="px-3 py-2">{{ item.max_level }}</td>
            <td class="px-3 py-2">{{ item.min_withdrawal_amount }}</td>
            <td class="px-3 py-2">{{ item.payout_frequency }} days</td>
            <td class="px-3 py-2 flex gap-2">
              <button
                class="text-blue-500 hover:text-blue-700"
                @click="openEdit(item)"
                title="Edit"
              >
                ✎
              </button>
              <button
                class="text-red-500 hover:text-red-700"
                @click="deleteSetting(item.id)"
                title="Delete"
              >
                🗑
              </button>
            </td>
          </tr>

          <tr v-if="settings.length === 0">
            <td colspan="5" class="text-center py-3 text-gray-400">
              No settings found.
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Mobile Cards -->
    <div class="block sm:hidden space-y-3">
      <div
        v-for="(item, index) in settings"
        :key="item.id"
        class="border rounded-lg p-3 shadow-sm bg-white"
      >
        <div class="flex justify-between mb-2 text-xs text-gray-600">
          <span>#{{ index + 1 }}</span>
          <div class="flex gap-2">
            <button
              @click="openEdit(item)"
              class="text-blue-500 hover:text-blue-700"
              title="Edit"
            >
              ✎
            </button>
            <button
              @click="deleteSetting(item.id)"
              class="text-red-500 hover:text-red-700"
              title="Delete"
            >
              🗑
            </button>
          </div>
        </div>

        <div class="text-[13px] space-y-1">
          <div><span class="font-semibold">Max Level:</span> {{ item.max_level }}</div>
          <div><span class="font-semibold">Min Withdrawal:</span> {{ item.min_withdrawal_amount }}</div>
          <div><span class="font-semibold">Payout Frequency:</span> {{ item.payout_frequency }} days</div>
        </div>
      </div>

      <div v-if="settings.length === 0" class="text-center py-4 text-gray-400">
        No settings found.
      </div>
    </div>

    <!-- Modals -->
    <AddMlmSetting
      v-if="showAdd"
      @close="showAdd = false"
      @saved="fetchSettings"
    />
    <EditMlmSetting
      v-if="showEdit"
      :setting="selectedSetting"
      @close="showEdit = false"
      @saved="fetchSettings"
    />
  </div>
</template>

<script>
import AddMlmSetting from "./AddMlmSetting.vue";
import EditMlmSetting from "./EditMlmSetting.vue";

export default {
  components: { AddMlmSetting, EditMlmSetting },
  data() {
    return {
      settings: [],
      showAdd: false,
      showEdit: false,
      selectedSetting: null,
    };
  },
  methods: {
    async fetchSettings() {
      try {
        const res = await this.$apiGet("/get_mlm_settings");
        this.settings = res.data || [];
      } catch (err) {
        console.error(err);
        this.settings = [];
      }
    },
    openEdit(item) {
      this.selectedSetting = item;
      this.showEdit = true;
    },
    async deleteSetting(id) {
      if (!confirm("Are you sure?")) return;
      try {
        await this.$apiDelete(`/delete_mlm_setting/${id}/`);
        this.fetchSettings();
      } catch (err) {
        console.error(err);
      }
    },
  },
  mounted() {
    this.fetchSettings();
  },
};
</script>

<style scoped>
table th,
table td {
  white-space: nowrap;
}
</style>
