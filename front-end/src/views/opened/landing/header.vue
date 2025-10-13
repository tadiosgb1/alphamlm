<template>
  <header class="bg-green-700 sticky top-0 z-50 shadow-lg">
    <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
      <!-- Logo -->
      <div class="flex items-center space-x-3">
        <div class="h-12 w-12 bg-white rounded-full overflow-hidden">
          <img src="@/assets/img/logo1.jpg" alt="Networking Alpha" class="w-full h-full object-cover" />
        </div>
        <span class="text-2xl font-bold text-white">Networking Alpha</span>
      </div>

      <!-- Desktop Nav -->
      <nav class="hidden md:flex items-center space-x-6 text-white font-medium">
        <router-link to="/" class="hover:text-yellow-200">Home</router-link>
        <router-link to="/products" class="hover:text-yellow-200">Products</router-link>
        <router-link to="/about" class="hover:text-yellow-200">About</router-link>
        <router-link to="/contact-us" class="hover:text-yellow-200">Contact</router-link>
      </nav>

      <!-- Login -->
      <div class="hidden md:flex items-center space-x-4">
        <button
          @click="login()"
          class="bg-yellow-500 hover:bg-yellow-600 px-5 py-2 rounded-lg font-semibold text-green-900 shadow"
        >
          <i class="fas fa-user mr-2"></i> Login
        </button>
      </div>

      <!-- Mobile Toggle -->
      <button @click="mobileMenuOpen = !mobileMenuOpen" class="md:hidden text-white text-2xl">
        <i class="fas" :class="mobileMenuOpen ? 'fa-times' : 'fa-bars'"></i>
      </button>
    </div>

    <!-- Mobile Menu -->
    <div v-if="mobileMenuOpen" class="md:hidden bg-green-600 text-white px-6 pb-4 space-y-3">
      <router-link to="/" class="block">Home</router-link>
      <router-link to="/products" class="block">Products</router-link>
      <router-link to="/about" class="block">About</router-link>
      <router-link to="/contact-us" class="block">Contact</router-link>
      <button
        @click="$emit('show-login')"
        class="w-full bg-yellow-500 hover:bg-yellow-600 text-green-900 py-2 rounded-lg font-semibold"
      >
        <i class="fas fa-user mr-2"></i> Login
      </button>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      mobileMenuOpen: false,
    };
  },
  methods:{
    login(){
     // alert("jj")
      this.$router.push("/login")
    }
  }
};
</script>
