<template>
  <section class="relative overflow-hidden py-28">

    <!-- Smooth background gradient -->
    <div class="absolute inset-0 bg-gradient-to-br from-green-200 via-white to-green-300"></div>

    <!-- Decorative floating waves -->
    <div class="absolute inset-0 opacity-25 pointer-events-none select-none">
      <div class="hero-wave bg-green-300"></div>
      <div class="hero-wave2 bg-green-400"></div>
    </div>

    <!-- Hero Content -->
    <div class="relative z-10 max-w-4xl mx-auto px-6 text-center">
      <h1
        class="text-4xl md:text-5xl font-extrabold text-green-800 mb-5 animate-fadeUp"
      >
        Earn, Save & Own Your Dream Home
      </h1>

      <p
        class="max-w-2xl mx-auto text-lg text-gray-700 leading-relaxed mb-8 animate-fadeUp"
        style="animation-delay: 0.2s"
      >
        Join <strong class="text-green-800">Networking Alpha</strong> — a platform designed to help you
        earn commissions while saving towards your dream home. When you reach 50%,
        we help you complete the journey.
      </p>

      <button
        @click="goToRegister"
        class="px-10 py-3 rounded-xl font-semibold bg-green-600 text-white hover:bg-green-700 transition animate-fadeUp"
        style="animation-delay: 0.4s"
      >
        Get Started
      </button>
    </div>
  </section>
</template>

<script>
export default {
  methods: {
    goToRegister() {
      this.$router.push("/register");
    },
  },
};
</script>

<style scoped>
/* Subtle fade-up animation */
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeUp {
  opacity: 0;
  animation: fadeUp 0.9s ease forwards;
}

/* Floating wave blobs */
.hero-wave {
  position: absolute;
  top: -10%;
  left: -10%;
  width: 300px;
  height: 300px;
  filter: blur(90px);
  border-radius: 50%;
}

.hero-wave2 {
  position: absolute;
  bottom: -10%;
  right: -10%;
  width: 450px;
  height: 450px;
  filter: blur(120px);
  border-radius: 50%;
}

section {
  font-family: "Poppins", sans-serif;
}
</style>
