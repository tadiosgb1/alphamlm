<template>
  <section
    id="faqs"
    class="bg-gradient-to-br from-orange-50 via-white to-orange-100 py-20 px-6 md:px-16"
  >
    <!-- Header -->
    <div class="max-w-4xl mx-auto text-center mb-16">
      <h2 class="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
        Frequently Asked Questions
      </h2>
      <p class="text-gray-600 text-lg md:text-xl">
        Get answers to common questions about our MLM opportunity, earnings,
        and membership.
      </p>
    </div>

    <!-- FAQs -->
    <div class="max-w-3xl mx-auto space-y-4">
      <div
        v-for="(faq, index) in faqs"
        :key="index"
        class="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300"
      >
        <button
          @click="toggleFaq(index)"
          class="flex justify-between items-center w-full text-left px-6 py-5 font-medium text-gray-800 focus:outline-none"
        >
          <span>{{ faq.question }}</span>
          <svg
            :class="[
              'w-6 h-6 transform transition-transform duration-300',
              openIndex === index ? 'rotate-180 text-orange-500' : 'text-gray-400'
            ]"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <transition
          enter-active-class="transition ease-out duration-300"
          enter-from-class="opacity-0 transform -translate-y-2"
          enter-to-class="opacity-100 transform translate-y-0"
          leave-active-class="transition ease-in duration-200"
          leave-from-class="opacity-100 transform translate-y-0"
          leave-to-class="opacity-0 transform -translate-y-2"
        >
          <div v-if="openIndex === index" class="px-6 pb-6 text-gray-600 text-base leading-relaxed">
            {{ faq.answer }}
          </div>
        </transition>
      </div>
    </div>

    <!-- CTA -->
    <div class="max-w-2xl mx-auto text-center mt-16">
      <h3 class="text-2xl font-bold text-gray-800 mb-2">Still have questions?</h3>
      <p class="text-gray-600 mb-4">Our support team is here to guide you through your journey.</p>
      <a
        href="#contact"
        class="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-full shadow-md transition duration-300"
      >
        Contact Us
      </a>
    </div>
  </section>
</template>

<script>
export default {
  name: "Faqs",
  data() {
    return {
      openIndex: null,
      faqs: [
        {
          question: "What is an MLM business model?",
          answer:
            "A Multi-Level Marketing (MLM) model allows individuals to earn income through direct product sales and by building a network of members who also sell products."
        },
        {
          question: "How do I earn money in your MLM program?",
          answer:
            "You earn commissions from your direct sales and bonuses from the performance of your downline members. The more your team grows, the greater your potential earnings."
        },
        {
          question: "Is there a joining fee?",
          answer:
            "Yes, a one-time registration fee is required to access your member dashboard, training, and starter package."
        },
        {
          question: "Do I need to recruit people to earn?",
          answer:
            "While recruitment helps expand your network and income, you can still earn through personal product sales alone."
        },
        {
          question: "How can I track my performance and earnings?",
          answer:
            "Your member dashboard includes detailed reports, charts, and summaries of your sales, downline activities, and commissions in real time."
        },
        {
          question: "When are commissions paid?",
          answer:
            "Commissions are calculated weekly and can be withdrawn directly to your preferred payment method once the minimum payout balance is reached."
        }
      ]
    };
  },
  methods: {
    toggleFaq(index) {
      this.openIndex = this.openIndex === index ? null : index;
    }
  }
};
</script>

<style scoped>
/* Optional subtle animation */
#faqs {
  animation: fadeIn 0.6s ease-in-out;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
