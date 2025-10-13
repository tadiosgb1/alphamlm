<template>
  <div class="min-h-screen bg-gradient-to-r from-green-50 via-white to-green-50">
    <!-- Header -->
    <Header @show-login="showLoginModal = true" />

    <!-- About Section -->
    <section class="py-24  bg-gradient-to-r from-blue-500 via-white to-green-500 opacity-80 text-white">
      <div class="max-w-5xl mx-auto px-6 text-center">
        <h1 class="text-4xl md:text-5xl font-extrabold mb-6 text-gray-500">About Networking Alpha</h1>
        <p class="text-lg mb-12 text-gray-500">
          Networking Alpha empowers networkers to earn commissions while saving for their dream homes.
        </p>

        <!-- Mission, Vision, Core Values -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-green-900">
          <div class="bg-white rounded-2xl p-8 shadow-lg">
            <h3 class="text-2xl font-bold mb-3">Our Mission</h3>
            <p>To provide a sustainable platform for networkers to earn and save towards home ownership.</p>
          </div>
          <div class="bg-white rounded-2xl p-8 shadow-lg">
            <h3 class="text-2xl font-bold mb-3">Our Vision</h3>
            <p>To empower communities and facilitate dream homes for our networkers across Ethiopia.</p>
          </div>
          <div class="bg-white rounded-2xl p-8 shadow-lg">
            <h3 class="text-2xl font-bold mb-3">Core Values</h3>
            <ul class="list-disc pl-5">
              <li>Integrity</li>
              <li>Innovation</li>
              <li>Customer Focus</li>
              <li>Community Empowerment</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <Footer />

  </div>
</template>

<script>
import Header from './header.vue';
import Footer from './footer.vue';
import LoginModal from '../auth/login.vue';

export default {
  components: { Header, Footer},
  data() { return { showLoginModal: false }; },
};
</script>

<style scoped>
section { font-family: "Poppins", sans-serif; }
</style>
