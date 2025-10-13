<template>
  <footer class="relative bg-green-700 text-white py-10 mt-20">
    <div class="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
      <div>
        <h3 class="text-xl font-semibold mb-3">Networking Alpha</h3>
        <p class="text-sm text-green-100 leading-relaxed">
          Empowering people through network-based earning, sustainable savings,
          and home ownership. Build your future with us.
        </p>
      </div>

      <div>
        <h4 class="text-lg font-semibold mb-3">Quick Links</h4>
        <ul class="space-y-2 text-green-100">
          <li><a href="#home" class="hover:text-yellow-300">Home</a></li>
          <li><a href="#products" class="hover:text-yellow-300">Products</a></li>
          <li><a href="#about" class="hover:text-yellow-300">About</a></li>
          <li><a href="#faq" class="hover:text-yellow-300">FAQs</a></li>
          <li><a href="#contact" class="hover:text-yellow-300">Contact</a></li>
        </ul>
      </div>

      <div>
        <h4 class="text-lg font-semibold mb-3">Contact</h4>
        <p class="text-sm text-green-100">Email: support@networkingalpha.com</p>
        <p class="text-sm text-green-100">Phone: +251 900 000 000</p>
        <p class="text-sm text-green-100">Addis Ababa, Ethiopia</p>
      </div>
    </div>

    <div class="border-t border-green-600 mt-8 pt-6 text-center text-sm text-green-100">
      © 2025 Networking Alpha. All rights reserved.
    </div>

    <!-- Scroll to Top Button -->
    <button
      v-show="showScrollTop"
      @click="scrollToTop"
      class="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-transform transform hover:-translate-y-1"
    >
      <i class="fas fa-arrow-up text-xl"></i>
    </button>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      showScrollTop: false,
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.showScrollTop = window.scrollY > 200;
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  },
};
</script>
