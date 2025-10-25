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
          <ul class="px-2 space-y-0">
            <li v-for="item in filteredMenuItems" :key="item.name">
              <!-- Regular menu item -->
              <div v-if="!item.children">
                <router-link
                  :to="{ name: item.route }"
                  class="flex items-center px-3 py-2 rounded-md hover:bg-orange-100 text-sm font-medium transition-all duration-200"
                  :class="{
                    'bg-orange-50 text-orange-600 font-semibold':
                      $route.name === item.route,
                  }"
                >
                  <i
                    :class="[item.icon, 'w-4 text-sm mr-2']"
                    :style="{
                      color: $route.name === item.route
                        ? '#f97316'
                        : item.color,
                    }"
                  ></i>
                  <span>{{ item.name }}</span>
                </router-link>
              </div>

              <!-- Parent item with submenu -->
              <div v-else>
                <button
                  @click="toggleSubmenu(item.name)"
                  class="flex items-center justify-between w-full px-3 py-2 rounded-md hover:bg-orange-100 text-sm font-medium transition-all duration-200"
                  :class="{
                    'bg-orange-50 text-orange-600 font-semibold':
                      isSubmenuOpen(item.name),
                  }"
                >
                  <div class="flex items-center">
                    <i
                      :class="[item.icon, 'w-4 text-sm mr-2']"
                      :style="{ color: item.color }"
                    ></i>
                    <span>{{ item.name }}</span>
                  </div>
                  <i
                    class="fas text-xs ml-2"
                    :class="[
                      isSubmenuOpen(item.name)
                        ? 'fa-chevron-up'
                        : 'fa-chevron-down',
                    ]"
                  ></i>
                </button>

                <!-- Submenu -->
                <transition name="fade">
                  <ul
                    v-if="isSubmenuOpen(item.name)"
                    class="ml-8 mt-2 space-y-1 border-l border-gray-200 pl-3"
                  >
                    <li
                      v-for="sub in item.children"
                      :key="sub.name"
                      class="text-sm"
                    >
                      <router-link
                        :to="{ name: sub.route }"
                        class="flex items-center px-2 py-1 rounded-md hover:bg-orange-50 text-gray-700 transition"
                        :class="{
                          'text-orange-600 font-semibold':
                            $route.name === sub.route,
                        }"
                      >
                        <i
                          :class="[sub.icon, 'w-4 text-sm mr-2']"
                          :style="{
                            color:
                              $route.name === sub.route
                                ? '#f97316'
                                : sub.color,
                          }"
                        ></i>
                        {{ sub.name }}
                      </router-link>
                    </li>
                  </ul>
                </transition>
              </div>
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
      openSubmenus: [], // Track open submenus
      menuItems: [
        {
          name: "Dashboard",
          route: "first-dash",
          icon: "fas fa-gauge",
          color: "#f97316",
        },
        {
          name: "Groups",
          route: "groups",
          icon: "fas fa-layer-group",
          color: "#6366f1",
        },
        {
          name: "Permissions",
          route: "permissions_view",
          icon: "fas fa-shield-halved",
          color: "#10b981",
        },
        {
          name: "Users",
          route: "user_view",
          icon: "fas fa-user",
          color: "#60a5fa",
        },
        {
          name: "Network",
          icon: "fas fa-network-wired",
          color: "#f97316",
          children: [
            {
              name: "Genealogy",
              route: "genealogy-tree",
              icon: "fas fa-sitemap",
              color: "#60a5fa",
            },
            {
              name: "Downlist",
              route: "downlist",
              icon: "fas fa-users",
              color: "#60a5fa",
            },
            {
              name: "Referral List",
              route: "referral-list",
              icon: "fas fa-link",
              color: "#60a5fa",
            },
          ],
        },

         {
          name: "Configurations",
          route: "configurations",
          icon: "fas fa-bell",
          color: "#22c55e",
        },

        {
          name: "Settings",
          route: "settings",
          icon: "fas fa-bell",
          color: "#22c55e",
        },
       

        
          {
          name: "Commissions",
          route: "commissions",
          icon: "fas fa-bell",
          color: "#22c55e",
        },
        

     
  
        {
          name: "Categories",
          route: "categories",
          icon: "fas fa-bell",
          color: "#22c55e",
        },
        {
          name: "Houses",
          route: "housings",
          icon: "fas fa-bell",
          color: "#22c55e",
        },
           {
          name: "Products",
          route: "view_products",
          icon: "fas fa-bell",
          color: "#22c55e",
        },
        
        {
          name: "Trainings",
          route: "trainings",
          icon: "fas fa-bell",
          color: "#22c55e",
        },

        {
          name: "Packages",
          route: "packages",
          icon: "fas fa-bell",
          color: "#22c55e",
        },

        
         {
          name: "Sales",
          route: "sales",
          icon: "fas fa-bell",
          color: "#22c55e",
        },
        
         {
          name: "Wallet Transactions",
          route: "wallet_transactions",
          icon: "fas fa-bell",
          color: "#22c55e",
        },
       
        {
          name: "Notifications",
          route: "notifications",
          icon: "fas fa-bell",
          color: "#22c55e",
        },
        // {
        //   name: "Contacts",
        //   route: "contacts",
        //   icon: "fas fa-user",
        //   color: "#22c55e",
        // },
      ],
    };
  },
  computed: {
    filteredMenuItems() {
      return this.menuItems.filter((item) => {
        if (item.is_superuser && !this.is_superuser) return false;
        if (item.permission && !this.$hasPermission(item.permission))
          return false;
        return true;
      });
    },
  },
  methods: {
    toggleSubmenu(name) {
      if (this.openSubmenus.includes(name)) {
        this.openSubmenus = this.openSubmenus.filter((n) => n !== name);
      } else {
        this.openSubmenus.push(name);
      }
    },
    isSubmenuOpen(name) {
      return this.openSubmenus.includes(name);
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

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
</style>
