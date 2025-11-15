<template>
  <div class=" bg-gray-50 min-h-screen text-base text-gray-800">
    <div class="max-w-7xl mx-auto">
      
      <div class="mb-6 flex items-center justify-between ">
        <h1 class="text-xl font-bold text-gray-800 mt-5">Configuration Settings</h1>
      </div>

      <div class="mb-6">
        <nav class="flex flex-wrap gap-1 border-b border-gray-200">
          <button
            v-for="tab in tabs"
            :key="tab.key"
            @click="activeTab = tab.key"
            :class="[
              'px-6 py-3 text-sm font-medium transition-all duration-300 relative',
              activeTab === tab.key
                ? 'text-green-600'
                : 'text-gray-600 hover:text-green-700 hover:bg-gray-100',
            ]"
          >
            {{ tab.label }}
            <span
              v-if="activeTab === tab.key"
              class="absolute bottom-0 left-0 w-full h-0.5 bg-green-500 transform scale-x-100"
            ></span>
          </button>
        </nav>
      </div>

      <div class="bg-white rounded-xl shadow-lg p-3 ">
        <transition name="component" mode="out-in">
            <component :is="activeComponent" :key="activeTab" />
        </transition>
      </div>
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