<template>
  <div>
    <Toast ref="toast" />
    <div class="min-h-screen bg-gray-100 p-6">
      <div class="bg-white shadow-md rounded-lg overflow-hidden">
        <!-- Header -->
        <div
          class="bg-white text-black px-6 py-4 text-xl font-bold flex justify-between items-center"
        >
          Users Management
        </div>

        <!-- Tabs -->
        <div class="border-b border-gray-200">
          <nav
            class="-mb-px flex overflow-x-auto no-scrollbar px-2 sm:px-6 space-x-4 sm:space-x-6"
            aria-label="Tabs"
          >
            <button
           
              @click="activeTab = 'allUsers'"
              class="tab-link"
              :class="{ 'tab-active': activeTab === 'allUsers' }"
            >
              All Users
            </button>

            <button
              
              @click="activeTab = 'staffs'"
              class="tab-link"
              :class="{ 'tab-active': activeTab === 'staffs' }"
            >
              Staffs
            </button>
          </nav>
        </div>

        <!-- Tab Content -->
        <div class="p-6">
          <component :is="activeTabComponent" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import allUsers from "./allUsers.vue";
import staffs from "../stafs/view.vue";

export default {
  components: {
    allUsers,
    staffs,
  },
  data() {
    const is_superuser = localStorage.getItem("is_superuser") === "true";

    // Set default tab based on role/permissions
    let defaultTab = "staffs";
    if (is_superuser) {
      defaultTab = "allUsers";
    }

    return {
      is_superuser,
      activeTab: defaultTab,
      showAddUser: false,
    };
  },
  computed: {
    activeTabComponent() {
      return this.activeTab;
    },
  },
};
</script>

<style scoped>
.tab-link {
  @apply whitespace-nowrap py-3 px-4 border-b-2 font-medium text-sm text-gray-500 hover:text-primary hover:border-primary transition;
}
.tab-active {
  @apply border-primary text-primary;
}

/* Hide scrollbar on mobile */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none; /* IE/Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
