<template>
  <div class="p-4 text-sm text-gray-800">
    <!-- Header -->
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-lg font-semibold">System Settings</h1>
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
    <transition name="fade-slide" mode="out-in">
      <div key="activeTab" class="bg-white border rounded-lg shadow-sm p-4">
        <component :is="activeComponent" />
      </div>
    </transition>
  </div>
</template>

<script>
import TreeLevelSetting from "../treeSetting/view.vue";
import MlmSetting from "../MlmSettings/view.vue";

export default {
  name: "SettingsPage",
  components: {
    TreeLevelSetting,
    MlmSetting,
  },
  data() {
    return {
      activeTab: "tree-level",
      tabs: [
        { key: "tree-level", label: "Tree Level Setting" },
        { key: "mlm", label: "MLM Setting" },
      ],
    };
  },
  computed: {
    activeComponent() {
      switch (this.activeTab) {
        case "mlm":
          return "MlmSetting";
        default:
          return "TreeLevelSetting";
      }
    },
  },
};
</script>

<style scoped>
/* Smooth fade + slide animation */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
