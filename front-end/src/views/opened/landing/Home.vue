<template>
  <div class="min-h-screen bg-gradient-to-r from-blue-50 via-white to-green-50">
    <!-- HEADER -->
    <Header @show-login="showLoginModal = true" />

   <!-- HERO -->
<Mlmhero />


<Bg />
    <!-- WHY CHOOSE US SECTION -->
    <section class="py-20 max-w-6xl mx-auto px-6">
      <h2 class="text-3xl font-bold text-center text-green-800 mb-12">Why Choose Us</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white p-6 rounded-2xl shadow-lg text-center hover:shadow-xl transition">
          <i class="fas fa-hand-holding-usd text-4xl text-green-700 mb-4"></i>
          <h3 class="font-bold text-xl mb-2">Earn Money</h3>
          <p class="text-gray-600 text-sm">Promote our products and earn competitive commissions for every sale. The more effort you put, the higher your reward.</p>
        </div>
        <div class="bg-white p-6 rounded-2xl shadow-lg text-center hover:shadow-xl transition">
          <i class="fas fa-home text-4xl text-green-700 mb-4"></i>
          <h3 class="font-bold text-xl mb-2">Own Your Dream Home</h3>
          <p class="text-gray-600 text-sm">Reach 50% of your savings and Networking Alpha helps complete the rest. Your dream home is now achievable.</p>
        </div>
        <div class="bg-white p-6 rounded-2xl shadow-lg text-center hover:shadow-xl transition">
          <i class="fas fa-users text-4xl text-green-700 mb-4"></i>
          <h3 class="font-bold text-xl mb-2">Community Support</h3>
          <p class="text-gray-600 text-sm">Join a community of networkers, learn business skills, and grow with support and mentorship from experts.</p>
        </div>
      </div>
    </section>

  <section>
    <Products />
  </section>
    <!-- REGISTRATION FORM -->
    <section
      v-if="showForm"
      class="max-w-3xl mx-auto mt-12 px-6 py-10 bg-white rounded-2xl shadow-xl"
    >
      <h3 class="text-2xl font-bold mb-6 text-green-800">Join Networking Alpha</h3>
      <form @submit.prevent="submitForm" class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input v-model="form.first_name" type="text" placeholder="First Name" class="input" />
        <input v-model="form.last_name" type="text" placeholder="Last Name" class="input" />
        <input v-model="form.phone_number" type="text" placeholder="Phone Number" class="input" />
        <input v-model="form.email" type="email" placeholder="Email" class="input" />
        <input v-model="form.password" type="password" placeholder="Password" class="input" />
        <div class="col-span-full">
          <button
            type="submit"
            class="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg text-lg font-semibold"
          >
            Register & Start Saving
          </button>
        </div>
      </form>
    </section>

    <!-- FAQs -->
    <section class="bg-green-50 py-20">
      <Fqs />
    </section>


    <Footer />
  </div>
</template>

<script>
import Header from './header.vue';
import Fqs from './fqs.vue';
import Footer from './footer.vue';
import Bg from './bg.vue'
import Products from './products.vue'
import Mlmhero from './mlmHero.vue'

export default {
  components: { Header, Fqs, Footer,Bg ,Products,Mlmhero},
  data() {
    return {
      showLoginModal: false,
      showForm: false,
      products: [
        { id: 1, name: 'Solar Home System', description: 'Eco-friendly solar kits for sustainable home energy.', price: 14500, image: '@/assets/img/solar.jpg' },
        { id: 2, name: 'Smart Furniture', description: 'Modern, space-saving designs for contemporary homes.', price: 9800, image: '@/assets/img/furniture.jpg' },
        { id: 3, name: 'Building Materials', description: 'High-quality cement, steel, and finishing materials.', price: 26500, image: '@/assets/img/materials.jpg' },
        { id: 4, name: 'Home Security System', description: 'AI-powered smart cameras and intrusion alerts.', price: 7500, image: '@/assets/img/security.jpg' },
        { id: 5, name: 'Interior Design Kits', description: 'Modern interior materials to customize your home.', price: 12800, image: '@/assets/img/interior.jpg' },
        { id: 6, name: 'Water Purification System', description: 'Clean water technology for healthy living.', price: 5200, image: '@/assets/img/water.jpg' },
      ],
      form: { first_name: '', last_name: '', email: '', phone_number: '', password: '' },
    };
  },
  methods: {
    goToRegister() {
      this.showForm = true;
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    },
    async submitForm() {
      try {
        const res = await fetch('https://your-api.com/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.form),
        });
        if (res.ok) alert('Registration successful!');
        else alert('Something went wrong.');
      } catch (err) {
        alert('Network error.');
      }
    },
  },
};
</script>

<style scoped>
.input {
  @apply border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-green-400;
}
</style>
