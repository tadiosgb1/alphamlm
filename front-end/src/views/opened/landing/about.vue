<template>
  <div class="min-h-screen bg-gradient-to-r from-green-50 via-white to-green-50">
    <!-- Header -->
    <Header @show-login="showLoginModal = true" />

    <!-- About Section -->
    <section class="py-24 bg-gradient-to-r from-green-200 via-white to-green-100 opacity-90 text-gray-800">
      <div class="max-w-6xl mx-auto px-6 text-center">
        <!-- Title -->
        <h1 class="text-2xl md:text-3xl font-extrabold mb-6 text-gray-900 mt-16">About Networking Alpha</h1>
        <p class="text-xl mb-12 text-gray-700 leading-relaxed">
          Networking Alpha is dedicated to empowering networkers across Ethiopia, providing them with opportunities to earn sustainable income and save for their dream homes. We combine innovation, community-driven initiatives, and unwavering integrity to transform lives and build stronger communities.
        </p>

        <!-- Mission, Vision, Core Values -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-10 text-gray-800 mb-16">
          <div class="bg-white rounded-2xl p-10 shadow-xl hover:shadow-2xl transition-all duration-300">
            <h3 class="text-3xl font-bold mb-4 text-green-700">Our Mission</h3>
            <p class="text-lg leading-relaxed">
              To create a sustainable platform that empowers networkers to earn commissions while achieving long-term goals, including homeownership and financial independence.
            </p>
          </div>
          <div class="bg-white rounded-2xl p-10 shadow-xl hover:shadow-2xl transition-all duration-300">
            <h3 class="text-3xl font-bold mb-4 text-green-700">Our Vision</h3>
            <p class="text-lg leading-relaxed">
              To become the leading networker empowerment platform in Ethiopia, fostering thriving communities where individuals can achieve financial stability and their dream of owning a home.
            </p>
          </div>
          <div class="bg-white rounded-2xl p-10 shadow-xl hover:shadow-2xl transition-all duration-300">
            <h3 class="text-3xl font-bold mb-4 text-green-700">Core Values</h3>
            <ul class="list-disc pl-5 text-lg leading-relaxed">
              <li>Integrity: We uphold honesty and transparency in all our interactions.</li>
              <li>Innovation: We embrace creativity and forward-thinking solutions.</li>
              <li>Customer Focus: Our networkers are at the heart of everything we do.</li>
              <li>Community Empowerment: We foster growth, education, and opportunity for all.</li>
              <li>Excellence: We strive for the highest quality in our services and support.</li>
            </ul>
          </div>
        </div>

        <!-- History Section -->
        <div class="mb-16 text-left">
          <h2 class="text-4xl font-bold mb-6 text-green-800">Our Story</h2>
          <p class="text-lg leading-relaxed mb-4">
            Founded with the belief that financial independence should be accessible to everyone, Networking Alpha has grown from a small network of dedicated individuals into a nationwide platform supporting thousands of networkers. Our journey has been driven by a passion for community empowerment and innovative solutions for sustainable wealth creation.
          </p>
          <p class="text-lg leading-relaxed">
            Over the years, we have expanded our programs, introduced advanced tools for network management, and partnered with local communities to create meaningful impact. Every success story fuels our mission to reach even more networkers and help them realize their dreams.
          </p>
        </div>

        <!-- Team Section -->
        <div class="mb-16">
          <h2 class="text-4xl font-bold mb-6 text-green-800">Meet Our Team</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300">
              <h3 class="text-2xl font-semibold mb-2">Getachew Atsibha</h3>
              <p class="text-gray-700">Founder & CEO</p>
              <p class="mt-3 text-gray-600 text-sm leading-relaxed">
                Visionary leader committed to community empowerment and innovative network solutions.
              </p>
            </div>
            <div class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300">
              <h3 class="text-2xl font-semibold mb-2">Getachew Atsibha</h3>
              <p class="text-gray-700">Head of Operations</p>
              <p class="mt-3 text-gray-600 text-sm leading-relaxed">
                Ensures smooth operations and exceptional support for our networkers across the nation.
              </p>
            </div>
            <div class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300">
              <h3 class="text-2xl font-semibold mb-2">Getachew Atsibha</h3>
              <p class="text-gray-700">Community Engagement Lead</p>
              <p class="mt-3 text-gray-600 text-sm leading-relaxed">
                Drives community programs and outreach initiatives to empower networkers and local neighborhoods.
              </p>
            </div>
          </div>
        </div>

        <!-- Community Impact Section -->
        <div class="mb-16 text-left">
          <h2 class="text-4xl font-bold mb-6 text-green-800">Our Community Impact</h2>
          <p class="text-lg leading-relaxed mb-4">
            Networking Alpha is more than a platform—it's a movement. We invest in educational programs, mentorship, and resources that help networkers develop life skills, financial literacy, and opportunities for growth. By focusing on sustainable development and homeownership, we create a positive ripple effect across families and communities in Ethiopia.
          </p>
          <p class="text-lg leading-relaxed">
            Every milestone we achieve, from the first networker’s home purchase to community-wide development programs, strengthens our commitment to social responsibility and empowerment.
          </p>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <Footer />

    <!-- Login Modal -->
    <LoginModal v-if="showLoginModal" @close="showLoginModal = false" />
  </div>
</template>

<script>
import Header from './header.vue';
import Footer from './footer.vue';
import LoginModal from '../auth/login.vue';

export default {
  components: { Header, Footer, LoginModal },
  data() {
    return { showLoginModal: false };
  },
};
</script>

<style scoped>
section {
  font-family: "Poppins", sans-serif;
}
h1, h2, h3 {
  font-family: "Poppins", sans-serif;
}
</style>
