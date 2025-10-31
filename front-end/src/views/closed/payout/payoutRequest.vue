<template>
  <section class="min-h-screen bg-gray-50 p-6 text-sm text-gray-800">
    <!-- Header -->
    <h1 class="text-2xl font-semibold mb-6">Withdraw Request</h1>

    <!-- Summary Section -->
    <div class="grid md:grid-cols-4 gap-4 mb-8">
      <div
        v-for="(item, index) in summary"
        :key="index"
        class="bg-white rounded-lg shadow p-5 border"
      >
        <h2 class="text-xs uppercase text-gray-500 font-medium mb-1">{{ item.title }}</h2>
        <p class="text-xl font-semibold text-gray-700">
          ETB {{ formatAmount(item.amount) }}
        </p>
      </div>
    </div>

    <!-- Payout Request Form -->
    <div class="bg-white rounded-lg shadow p-6 border w-full md:w-3/4 mx-auto">
      <h2 class="text-lg font-semibold text-gray-700 mb-6 text-center">Payout Request</h2>

      <form @submit.prevent="submitRequest" class="space-y-5">
        <!-- Payout Amount -->
        <div>
          <label class="block text-sm font-medium mb-1 text-gray-600">
            Payout Amount *
          </label>
          <input
            v-model="payout.amount"
            type="number"
            min="0"
            class="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Enter payout amount"
          />
        </div>

        <!-- Payout Method -->
        <div>
          <label class="block text-sm font-medium mb-1 text-gray-600">
            Payout Method *
          </label>
          <select
            v-model="payout.method"
            class="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          >
            <option value="bank">Bank</option>
            <option value="mobile">Mobile</option>
            <option value="paypal">PayPal</option>
          </select>
        </div>

        <!-- Transaction Password -->
        <div>
          <label class="block text-sm font-medium mb-1 text-gray-600">
            Transaction Password *
          </label>
          <input
            v-model="payout.password"
            type="password"
            placeholder="Enter transaction password"
            class="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <a href="#" class="text-xs text-blue-500 hover:underline mt-1 inline-block">
            Forgot transaction password?
          </a>
        </div>

        <!-- Submit Button -->
        <div class="flex justify-center">
          <button
            type="submit"
            class="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md px-6 py-2 transition"
          >
            Submit
          </button>
        </div>
      </form>

      <div
        class="bg-yellow-50 border border-yellow-200 text-yellow-800 text-sm rounded-md p-3 mt-6 text-center"
      >
        Transaction Fee: <strong>1%</strong>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "PayoutRequest",

  data() {
    return {
      summary: [
        { title: "Payout Amount", amount: 0 },
        { title: "Minimum Payout Amount", amount: 3000000 },
        { title: "Maximum Payout Amount", amount: 1000000 },
        { title: "Withdrawed Amount", amount: 0 },
      ],
      payout: {
        amount: "",
        method: "bank",
        password: "",
      },
    };
  },

  methods: {
    formatAmount(value) {
      return value.toLocaleString("en-US", { minimumFractionDigits: 2 });
    },

    submitRequest() {
      if (!this.payout.amount || !this.payout.password) {
        alert("⚠️ Please fill all required fields.");
        return;
      }

      // Example API submission (replace with axios)
      console.log("Submitting payout request:", this.payout);
      alert("✅ Payout request submitted successfully!");
    },
  },
};
</script>
