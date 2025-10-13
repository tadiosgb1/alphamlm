<template>
  <div>
    <transition name="slide">
      <aside
        class="w-64 flex flex-col fixed md:relative z-15 h-full transition-all duration-300 bg-white mt-0 lg:mt-1"
      >
        <!-- Sidebar Title -->
        <div
          v-if="showTitle"
          class="flex flex-row space-x-4 p-4 text-center font-bold text-lg text-white bg-orange-500 sticky top-0 z-10"
        >
          <div class="w-12 h-12 bg-white rounded-full">
            <img
              src="../../assets/img/logo1.jpg"
              alt="Logo"
              class="h-10 w-10 rounded-full pl-1 pt-1"
            />
          </div>
          <p class="mt-3">Alpha PMS</p>
        </div>

        <!-- Navigation -->
        <div class="flex-1 overflow-y-auto">
          <ul class="p-3 space-y-1">
            <li v-for="item in filteredMenuItems" :key="item.route">
              <router-link
                :to="{ name: item.route }"
                class="flex items-center px-3 py-1 rounded-md hover:bg-orange-100 text-sm font-medium transition-all duration-200"
                :class="{
                  'bg-orange-50 text-orange-600 font-semibold':
                    $route.name === item.route,
                }"
              >
                <i
                  :class="[item.icon, 'w-4 text-sm mr-2']"
                  :style="{
                    color: $route.name === item.route ? '#f97316' : item.color,
                  }"
                ></i>
                <span class="whitespace-nowrap">{{ item.name }}</span>
              </router-link>
            </li>
          </ul>
        </div>
      </aside>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showTitle: false,
      is_superuser: false,
      menuItems: [
        {
          name: "Dashboard",
          route: "first-dash",
          icon: "fas fa-gauge", // ✅ updated from deprecated tachometer-alt
          color: "#f97316",
        },
       
        {
          name: "Groups",
          route: "groups",
          icon: "fas fa-layer-group", // ✅ valid
          color: "#6366f1",
          permission: "",
        },
        {
          name: "Permissions",
          route: "permissions_view",
          icon: "fas fa-shield-halved", // ✅ modern version of fa-shield-alt
          color: "#10b981",
          permission: "",
        },
        {
          name: "Users",
          route: "user_view",
          icon: "fas fa-user", // ✅ valid
          color: "#60a5fa",
          permission: "",
        },
      
        {
          name: "Transactions",
          route: "transactions",
          icon: "fas fa-arrows-rotate", // ✅ better for transactions
          color: "#22c55e",
        },
        {
          name: "Reports",
          route: "reports",
          icon: "fas fa-chart-line", // ✅ fa-file-alt → fa-chart-line (better match)
          color: "#22c55e",
        },
        {
          name: "Notifications",
          route: "notifications",
          icon: "fas fa-bell", // ✅ fa-money-bill-wave → fixed
          color: "#22c55e",
        },
         {
          name: "Contacts",
          route: "contacts",
          icon: "fas fa-user", // ✅ fa-money-bill-wave → fixed
          color: "#22c55e",
        },
      ],
    };
  },
  computed: {
    filteredMenuItems() {
      return this.menuItems.filter((item) => {
        if (item.is_superuser && !this.is_superuser) return false;
        if (item.permission) {
          return this.$hasPermission(item.permission);
        }
        return true;
      });
    },
  },
  mounted() {
    this.is_superuser = localStorage.getItem("is_superuser") === "true";
    this.screenWidth = window.innerWidth;
    if (this.screenWidth < 1024) {
      this.showTitle = true;
    }
  },
};
</script>
