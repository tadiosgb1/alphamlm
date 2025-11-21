<template>
  <div class="min-h-screen relative overflow-hidden bg-gradient-to-br from-green-100 via-white to-green-200">

 
    <!-- Decorative Brand Waves -->
    <div class="absolute inset-0 opacity-20 pointer-events-none select-none">
      <div class="wave w-64 h-64 bg-green-300"></div>
      <div class="wave2 w-96 h-96 bg-green-400"></div>
    </div>

    <!-- Products Section -->
    <section class="relative z-10 py-24 max-w-7xl mx-auto px-6">
      <h1 class="text-4xl md:text-5xl font-extrabold text-center text-green-800 mb-16">
        Our Products
      </h1>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

        <!-- Product Card -->
        <div
          v-for="(p, i) in products"
          :key="p.id"
          class="rounded-2xl bg-white overflow-hidden transform transition-all duration-500 hover:scale-[1.02]"
          :style="{ animationDelay: (i * 0.25) + 's' }"
          v-show="contentVisible"
        >

          <!-- Image OR Green Placeholder -->
          <div class="w-full h-56 bg-green-200 flex items-center justify-center overflow-hidden">
            <img
              v-if="validImage(p.image)"
              :src="p.image"
              :alt="p.name"
              class="w-full h-full object-cover transition-opacity duration-500"
            />

            <div
              v-else
              class="w-full h-full bg-gradient-to-br from-gray-300 to-green-200 text-green-900 font-bold text-lg flex items-center justify-center"
            >
              Product Image
            </div>
          </div>

          <!-- Content -->
          <div class="p-6">
            <h3 class="text-xl font-semibold text-green-700">{{ p.name }}</h3>
            <p class="text-gray-600 text-sm mt-2 line-clamp-3">{{ p.description }}</p>

            <p class="mt-4 font-extrabold text-xl text-green-800">{{ p.price }} ETB</p>

            <button
              class="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition"
            >
              View Details
            </button>
          </div>

        </div>

      </div>
    </section>

   
  </div>
</template>

<script>


export default {


  data() {
    return {
      contentVisible: false,
      showLoginModal: false,
      products: [],
    };
  },

  mounted() {
    this.fetchProducts();

    // Reveal animation after API load
    setTimeout(() => {
      this.contentVisible = true;
    }, 300);
  },

  methods: {
    async fetchProducts() {
      try {
        const response = await this.$apiGet("/get_products");
        this.products = response.data || response.results || [];
        console.log("this.products",this.products)
      } catch (error) {
        console.error("Product fetch failed:", error);
      }
    },

    // Validate image from API
    validImage(img) {
      if (!img) return false;
      if (img === "" || img === null || img === undefined) return false;

      // If API returns a relative path like /uploads/image.jpg
      return true;
    },
  },
};
</script>

<style scoped>
/* Smooth stagger animation */
div[v-show] {
  opacity: 0;
  animation: fadeUp 0.9s ease forwards;
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(35px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Floating green waves */
.wave {
  position: absolute;
  top: 10%;
  left: -5%;
  border-radius: 50%;
  filter: blur(80px);
}

.wave2 {
  position: absolute;
  bottom: -10%;
  right: -10%;
  border-radius: 50%;
  filter: blur(120px);
}

section {
  font-family: "Poppins", sans-serif;
}
</style>
