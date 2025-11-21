<template>
  <header
    class="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-lg border-b border-green-200/40"
  >
    <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

      <!-- Logo + Brand -->
      <div
        class="flex items-center space-x-3 cursor-pointer"
        @click="$router.push('/')"
      >
        <div class="h-12 w-12 rounded-full overflow-hidden border border-green-300">
          <img
            src="@/assets/img/logo1.jpg"
            alt="Networking Alpha Logo"
            class="w-full h-full object-cover"
          />
        </div>

        <span class="text-2xl font-extrabold text-green-800 tracking-wide">
          Networking Alpha
        </span>
      </div>

      <!-- Desktop Navigation -->
      <nav class="hidden md:flex items-center space-x-8 font-semibold">
        <router-link to="/" class="nav-link">Home</router-link>
        <router-link to="/products" class="nav-link">Products</router-link>
        <router-link to="/opportunity" class="nav-link">Opportunity</router-link>
        <router-link to="/compensation-plan" class="nav-link">Compensation Plan</router-link>
        <router-link to="/how-it-works" class="nav-link">How It Works</router-link>
        <router-link to="/about" class="nav-link">About</router-link>
        <router-link to="/contact-us" class="nav-link">Contact</router-link>
      </nav>

      <!-- Desktop Login Button -->
      <div class="hidden md:flex">
        <button
          @click="goToLogin"
          class="px-6 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition shadow-sm"
        >
          <i class="fas fa-user mr-2"></i> Login
        </button>
      </div>

      <!-- Mobile Menu Toggle -->
      <button
        @click="mobileMenuOpen = !mobileMenuOpen"
        class="md:hidden text-green-900 text-3xl"
      >
        <i class="fas" :class="mobileMenuOpen ? 'fa-times' : 'fa-bars'"></i>
      </button>
    </div>

    <!-- Mobile Slide Menu -->
    <transition name="slide">
      <div
        v-if="mobileMenuOpen"
        class="md:hidden bg-green-50 border-t border-green-200 px-6 pb-6 pt-3 space-y-4"
      >
        <router-link to="/" class="mobile-link" @click="closeMenu">Home</router-link>
        <router-link to="/products" class="mobile-link" @click="closeMenu">Products</router-link>
        <router-link to="/opportunity" class="mobile-link" @click="closeMenu">Opportunity</router-link>
        <router-link to="/compensation-plan" class="mobile-link" @click="closeMenu">Compensation Plan</router-link>
        <router-link to="/how-it-works" class="mobile-link" @click="closeMenu">How It Works</router-link>
        <router-link to="/about" class="mobile-link" @click="closeMenu">About</router-link>
        <router-link to="/contact-us" class="mobile-link" @click="closeMenu">Contact</router-link>

        <button
          @click="goToLogin"
          class="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
        >
          <i class="fas fa-user mr-2"></i> Login
        </button>
      </div>
    </transition>
  </header>
</template>

<script>
export default {
  data() {
    return {
      mobileMenuOpen: false,
    };
  },
  methods: {
    goToLogin() {
      this.$router.push("/login");
    },
    closeMenu() {
      this.mobileMenuOpen = false;
    },
  },
};
</script>

<style scoped>
/* Desktop nav link styling */
.nav-link {
  @apply text-green-700 hover:text-green-900 transition;
}

/* Mobile menu link styling */
.mobile-link {
  @apply block text-green-800 font-medium text-lg hover:text-green-900 transition;
}

/* Slide animation */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.25s ease;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
