<template>
  <div class="min-h-screen bg-gradient-to-r from-blue-50 via-white to-green-50">
    <!-- Header -->
    <Header @show-login="showLoginModal = true" />

    <!-- Contact Section -->
    <section id="contact" class="relative overflow-hidden">
      <!-- Wave Background -->
      <div class="absolute inset-0  bg-gradient-to-r from-blue-500 via-white to-green-500 opacity-80">
        <svg class="absolute bottom-0 left-0 w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#FFD54F" fill-opacity="1" d="M0,160L60,165.3C120,171,240,181,360,170.7C480,160,600,128,720,133.3C840,139,960,181,1080,176C1200,171,1320,117,1380,90.7L1440,64V320H0Z"></path>
        </svg>
      </div>

      <!-- Content -->
      <div class="relative z-10 max-w-6xl mx-auto px-6 py-24 flex flex-col md:flex-row items-center justify-between space-y-12 md:space-y-0">
        <!-- Info Card -->
        <div class="bg-yellow-400 text-white rounded-2xl shadow-lg p-10 md:w-1/2 text-center md:text-left">
          <div class="flex justify-center md:justify-start mb-4">
            <div class="bg-white text-yellow-500 rounded-full p-4">
              <i class="fas fa-headset text-3xl"></i>
            </div>
          </div>
          <h3 class="text-2xl font-bold mb-3">Welcome to Networking Alpha Support Center</h3>
          <p class="text-yellow-100 text-sm leading-relaxed">
            Contact us for inquiries, requests, suggestions, or feedback.
            Our team is always ready to assist you via our multiple support channels.
          </p>
          <div class="mt-6 space-y-2 text-white text-sm">
            <p><i class="fas fa-phone mr-2"></i> +251 900 000 000</p>
            <p><i class="fas fa-envelope mr-2"></i> support@networkingalpha.com</p>
            <p><i class="fas fa-map-marker-alt mr-2"></i> Addis Ababa, Ethiopia</p>
          </div>
        </div>

        <!-- Contact Form -->
        <div class="bg-white rounded-2xl shadow-xl p-10 w-full md:w-1/2 border-t-8 border-yellow-400">
          <h3 class="text-2xl font-bold text-sky-700 mb-6">Contact Us</h3>
          <form @submit.prevent="submitForm" class="space-y-5">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input v-model="form.name" type="text" placeholder="Full Name" class="input" required />
              <input v-model="form.email" type="email" placeholder="Email Address" class="input" required />
            </div>
            <input v-model="form.subject" type="text" placeholder="Subject" class="input" required />
            <textarea v-model="form.message" rows="5" placeholder="Your Message..." class="input" required></textarea>
            <button type="submit" class="w-full bg-sky-600 hover:bg-sky-700 text-white py-3 rounded-lg font-semibold shadow-md transition duration-300">
              Send Message
            </button>
          </form>
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
  components: { Header, Footer },
  data() {
    return {
      showLoginModal: false,
      form: { name: '', email: '', subject: '', message: '' },
    };
  },
  methods: {
    async submitForm() {
      try {
        console.log("Form submitted:", this.form);
        alert("Thank you! Your message has been sent successfully.");
        this.form = { name: '', email: '', subject: '', message: '' };
      } catch {
        alert("Something went wrong. Please try again later.");
      }
    },
  },
};
</script>

<style scoped>
.input {
  @apply w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-sky-400 transition;
}
section { font-family: "Poppins", sans-serif; }
</style>
