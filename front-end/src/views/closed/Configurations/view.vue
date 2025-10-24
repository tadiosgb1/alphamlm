<template>
  <div class="p-4 text-sm text-gray-800">
    <!-- Header -->
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-lg font-semibold">Configuration Settings</h1>
    </div>

    <!-- Tabs -->
    <div class="border-b border-gray-200 mb-4">
      <nav class="flex flex-wrap gap-3 text-sm font-medium">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          @click="activeTab = tab.key"
          :class="[
            'px-4 py-2 rounded-t-md transition-all duration-200',
            activeTab === tab.key
              ? 'bg-blue-600 text-white shadow'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          ]"
        >
          {{ tab.label }}
        </button>
      </nav>
    </div>

    <!-- Tab Content -->
    <div class="bg-white border rounded-lg shadow-sm p-4">
      <component :is="activeComponent" />
    </div>
  </div>
</template>

<script>
import SystemConfiguration from "./systemConfigurations.vue";
import CommissionConfiguration from "../commissionConfiguration/view.vue";
import UnilevelConfiguration from "../unilevelConfigurations/view.vue";

export default {
  name: "ConfigurationPage",
  components: {
    SystemConfiguration,
    CommissionConfiguration,
    UnilevelConfiguration,
  },
  data() {
    return {
      activeTab: "system",
      tabs: [
        { key: "system", label: "System Configuration" },
        { key: "commission", label: "Commission Configuration" },
        { key: "unilevel", label: "Unilevel Configuration" },
      ],
    };
  },
  computed: {
    activeComponent() {
      switch (this.activeTab) {
        case "commission":
          return "CommissionConfiguration";
        case "unilevel":
          return "UnilevelConfiguration";
        default:
          return "SystemConfiguration";
      }
    },
  },
};
</script>

<style scoped>
/* Optional subtle animation when switching tabs */
.component-enter-active,
.component-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.component-enter-from,
.component-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
