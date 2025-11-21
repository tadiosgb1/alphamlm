<template>
  <section class="relative overflow-hidden pt-24 pb-20 bg-white">
    <!-- Light Green Wave Layers (Soft Tones) -->
    <div class="absolute top-0 left-0 w-full">
      
      <!-- Very Soft Green (Top Layer) -->
      <svg class="w-full" viewBox="0 0 1440 200">
        <path
          fill="#E8F7EE"
          d="M0,40L80,60C160,80,320,120,480,136C640,152,800,144,960,122C1120,100,1280,64,1360,48L1440,32V0H0Z"
        />
      </svg>

      <!-- Soft Mint Green -->
      <svg class="w-full -mt-10 opacity-70" viewBox="0 0 1440 200">
        <path
          fill="#D4F1DF"
          d="M0,80L80,96C160,112,320,144,480,160C640,176,800,176,960,160C1120,144,1280,112,1360,96L1440,80V200H0Z"
        />
      </svg>

      <!-- Softest Green (almost white) -->
      <svg class="w-full -mt-10 opacity-50" viewBox="0 0 1440 200">
        <path
          fill="#F2FBF6"
          d="M0,120L80,136C160,152,320,168,480,176C640,184,800,184,960,176C1120,168,1280,152,1360,144L1440,136V200H0Z"
        />
      </svg>
    </div>

    <!-- Content (on white zone) -->
    <div class="relative z-10 max-w-5xl mx-auto px-6 mt-12">
      <h2 class="text-4xl font-extrabold text-green-800 text-center mb-6">
        About Networking Alpha
      </h2>

      <p class="text-gray-700 text-center max-w-3xl mx-auto text-base leading-relaxed">
        Networking Alpha empowers ambitious networkers and aspiring homeowners across Ethiopia.
        Our structured platform helps you earn commissions while saving for your future home —
        all within a trusted, supportive ecosystem built for real growth and practical opportunity.
      </p>

      <div class="text-center mt-8">
        <router-link
          to="/about"
          class="inline-block bg-yellow-400 text-green-900 font-semibold px-8 py-3 rounded-xl hover:bg-yellow-500 transition-all duration-300"
        >
          Read More
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "BgSection",
};
</script>

<style scoped>
section {
  animation: fadeIn 0.9s ease forwards;
  opacity: 0;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}
</style>
