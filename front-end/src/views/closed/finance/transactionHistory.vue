<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <div class="max-w-7xl mx-auto">
      
      <h1 class="text-xl font-semibold text-gray-800 mb-6">Transfer history</h1>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        
        <div class="bg-white rounded-lg shadow-md p-5 flex items-center justify-start border border-gray-200">
          <div class="flex items-center">
            <span class="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full mr-3">ETB</span>
            <div>
              <p class="text-gray-500 text-sm">Credit Amount</p>
              <p class="text-2xl font-bold text-green-600">0.00</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-md p-5 flex items-center justify-start border border-gray-200">
          <div class="flex items-center">
            <span class="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full mr-3">ETB</span>
            <div>
              <p class="text-gray-500 text-sm">Debit Amount</p>
              <p class="text-2xl font-bold text-blue-600">0.00</p>
            </div>
          </div>
        </div>

        <div class="col-span-1"></div>
      </div>

      <div class="bg-white rounded-lg shadow-md p-5 mb-8 border border-gray-200">
        <h2 class="text-md font-medium text-gray-700 mb-4">Show filters</h2>
        <div class="flex flex-wrap items-end gap-4">
          
          <div>
            <label for="date-range" class="block text-sm font-medium text-gray-700">Date range</label>
            <select id="date-range" v-model="filters.dateRange" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md shadow-sm">
              <option value="Custom">Custom</option>
              <option value="Today">Today</option>
              <option value="Last 7 Days">Last 7 Days</option>
            </select>
          </div>

          <div>
            <label for="from-date" class="block text-sm font-medium text-gray-700">From date</label>
            <input type="date" id="from-date" v-model="filters.fromDate" class="mt-1 block w-full pl-3 pr-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md shadow-sm">
          </div>

          <div>
            <label for="to-date" class="block text-sm font-medium text-gray-700">To date</label>
            <input type="date" id="to-date" v-model="filters.toDate" class="mt-1 block w-full pl-3 pr-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md shadow-sm">
          </div>

          <div>
            <label for="amount-type" class="block text-sm font-medium text-gray-700">Amount type</label>
            <select id="amount-type" v-model="filters.amountType" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md shadow-sm">
              <option value="Please select">Please select</option>
              <option value="Credit">Credit</option>
              <option value="Debit">Debit</option>
            </select>
          </div>

          <button @click="applyFilters" class="px-4 py-2 bg-blue-600 text-white font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out">
            View
          </button>

          <button @click="resetFilters" class="p-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out">
            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004 12m7-7h.582m-6.722 7a8.001 8.001 0 0015.356 2H20v5m-6.722-7h.582"/>
            </svg>
          </button>
        </div>
      </div>

      <div class="bg-white shadow overflow-hidden sm:rounded-lg border border-gray-200">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th v-for="header in tableHeaders" :key="header.key" scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {{ header.label }}
                </th>
              </tr>
            </thead>
            
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-if="filteredTransactions.length === 0">
                <td :colspan="tableHeaders.length" class="px-6 py-12 text-center text-sm text-gray-500 italic">
                  No details found
                </td>
              </tr>

              <tr v-else v-for="transaction in filteredTransactions" :key="transaction.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ transaction.id }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ transaction.paymentSource }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ transaction.beneficiaryMember }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ transaction.contributedMember }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ transaction.dateOfTransaction }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ transaction.transactionNote }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <span :class="{ 'text-green-600': transaction.amount.startsWith('+'), 'text-red-600': transaction.amount.startsWith('-') }">
                    ETB {{ transaction.amount.replace('+', '').replace('-', '') }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  // 1. Component Name
  name: 'TransactionHistory', 
  
  // 2. Component Data
  data() {
    return {
      filters: {
        dateRange: 'Custom',
        fromDate: '',
        toDate: '',
        amountType: 'Please select',
      },
      // Headers exactly as shown in the image
      tableHeaders: [
        { label: '#', key: 'id' },
        { label: 'Payment source', key: 'paymentSource' },
        { label: 'Beneficiary member', key: 'beneficiaryMember' },
        { label: 'Contributed member', key: 'contributedMember' },
        { label: 'Date of transaction', key: 'dateOfTransaction' },
        { label: 'Transaction Note', key: 'transactionNote' },
        { label: 'Amount', key: 'amount' },
      ],
      // Sample data to make the component runnable. Set to empty array to show "No details found" by default, as in the screenshot.
      allTransactions: [
        /*
        // UNCOMMENT THIS DATA TO SEE A FULL TABLE EXAMPLE:
        { id: 101, paymentSource: 'E-Wallet Transfer', beneficiaryMember: 'User A', contributedMember: 'User B', dateOfTransaction: 'Nov 14th 2025-4:00PM', transactionNote: 'Member payout', amount: '-500.00' },
        { id: 102, paymentSource: 'Bonus Credit', beneficiaryMember: 'User X', contributedMember: 'System', dateOfTransaction: 'Nov 10th 2025-9:30AM', transactionNote: 'Welcome bonus', amount: '+100.00' },
        { id: 103, paymentSource: 'E-RegPin', beneficiaryMember: 'User Y', contributedMember: 'Self', dateOfTransaction: 'Oct 30th 2025-1:00PM', transactionNote: 'Pin purchase', amount: '-250.00' },
        */
      ],
    };
  },

  // 3. Computed Properties
  computed: {
    // In a real application, this would apply the filters to this.allTransactions
    filteredTransactions() {
      // Returning the raw data for simplicity. Set to [] initially to match the screenshot.
      return this.allTransactions; 
    },
  },

  // 4. Methods for Interactivity
  methods: {
    applyFilters() {
      // Implement API call or client-side filtering logic here
      alert('Applying filters: ' + JSON.stringify(this.filters));
    },
    
    resetFilters() {
      this.filters = {
        dateRange: 'Custom',
        fromDate: '',
        toDate: '',
        amountType: 'Please select',
      };
      // After resetting, you might want to re-fetch/re-display unfiltered data
      alert('Filters reset!');
    },
  },
};
</script>

<style scoped>
/* No scoped CSS needed when using only Tailwind CSS utility classes */
</style>