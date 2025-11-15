<template>
  <div class="p-4 bg-gray-50 min-h-screen text-sm text-gray-800">
    <!-- Header -->
    <div class="flex items-center justify-between mb-4 border-b pb-3 border-gray-200">
      <h1 class="text-xl font-bold text-gray-800">Packages Management</h1>
    </div>

    <!-- Tabs (Bottom Line Style) -->
    <div class="mb-6">
      <nav class="flex flex-wrap gap-1 border-b border-gray-200">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          @click="activeTab = tab.key"
          :class="[
            'px-6 py-3 text-sm font-medium transition-all duration-300 relative focus:outline-none',
            activeTab === tab.key
              ? 'text-green-600'
              : 'text-gray-600 hover:text-green-700 hover:bg-gray-100',
          ]"
        >
          {{ tab.label }}
          <!-- Active Tab Indicator Line -->
          <span
            v-if="activeTab === tab.key"
            class="absolute bottom-0 left-0 w-full h-0.5 bg-green-500 transform scale-x-100"
          ></span>
        </button>
      </nav>
    </div>

    <!-- Tab Content -->
    <transition name="fade-slide" mode="out-in">
      <div key="activeTab" class="bg-white border border-gray-200 rounded-xl shadow-lg p-4">
        <component :is="activeComponent" />
      </div>
    </transition>
  </div>
</template>

<script>
import HighLevelPackages from "./highLevelPackages.vue";
import ProductPackages from "../ProductPackages/view.vue";
import TrainingPackages from "../TrainingPackages/view.vue";

export default {
  name: "PackagesPage",
  components: {
    HighLevelPackages,
    ProductPackages,
    TrainingPackages,
  },
  data() {
    return {
      activeTab: "high-level",
      tabs: [
        { key: "high-level", label: "High Level Packages" },
        { key: "product", label: "Product Packages" },
        { key: "training", label: "Training Packages" },
      ],
    };
  },
  computed: {
    activeComponent() {
      switch (this.activeTab) {
        case "product":
          return "ProductPackages";
        case "training":
          return "TrainingPackages";
        default:
          return "HighLevelPackages";
      }
    },
  },
};
</script>


