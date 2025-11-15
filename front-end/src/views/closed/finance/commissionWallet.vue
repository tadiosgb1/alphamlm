<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <div class="max-w-7xl mx-auto">
      
      <h1 class="text-xl font-semibold text-gray-800 mb-6">Income details</h1>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow-md p-5 flex items-center justify-start border border-gray-200 col-span-1">
          <div class="flex items-center">
            <span class="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full mr-3">ETB</span>
            <div>
              <p class="text-gray-500 text-sm">Total Income</p>
              <p class="text-2xl font-bold text-green-600">45,800.00</p>
            </div>
          </div>
        </div>
        <div class="col-span-2"></div> 
      </div>

      <div class="bg-white rounded-lg shadow-md p-5 mb-8 border border-gray-200">
        <h2 class="text-md font-medium text-gray-700 mb-4">Show filters</h2>
        <div class="flex flex-wrap items-end gap-4">
          
          <div>
            <label for="date-range" class="block text-sm font-medium text-gray-700">Date range</label>
            <select id="date-range" v-model="filters.dateRange" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md shadow-sm">
              <option value="Custom">Custom</option>
              <option value="Today">Today</option>
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
              <tr v-for="transaction in incomeTransactions" :key="transaction.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ transaction.id }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ transaction.paymentSource }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ transaction.beneficiaryMember }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ transaction.contributedMember }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                  <span class="text-green-600">ETB {{ transaction.amount }}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ transaction.dateOfTransaction }}</td>
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
  name: 'CommissionWallet',
  data() {
    return {
      filters: {
        dateRange: 'Custom',
        fromDate: '',
        toDate: '',
        amountType: 'Please select',
      },
      // The headers are different and fewer than the BussnessWallet page
      tableHeaders: [
        { label: '#', key: 'id' },
        { label: 'Payment source', key: 'paymentSource' },
        { label: 'Beneficiary member', key: 'beneficiaryMember' },
        { label: 'Contributed member', key: 'contributedMember' },
        { label: 'Amount', key: 'amount' },
        { label: 'Date of transaction', key: 'dateOfTransaction' },
      ],
      // Data directly mimics the rows in your "Income details" screenshot
      incomeTransactions: [
        {
          id: 1,
          paymentSource: 'Match Bonus',
          beneficiaryMember: 'Hana Teshager(Enatx)',
          contributedMember: 'Tiluhune Mucheye,teshome(Tilesh15)',
          amount: '1800', 
          dateOfTransaction: 'Feb 22nd 2025-2:19PM',
        },
        {
          id: 2,
          paymentSource: 'Match Bonus',
          beneficiaryMember: 'Hana Teshager(Enatx)',
          contributedMember: 'Kasalem Mucheye,teshome(Kash05)',
          amount: '1800',
          dateOfTransaction: 'Jan 12th 2025-11:21AM',
        },
        {
          id: 3,
          paymentSource: 'Match Bonus',
          beneficiaryMember: 'Hana Teshager(Enatx)',
          contributedMember: 'Ahmed Sualh,hassen(Ahemed03l)',
          amount: '1800',
          dateOfTransaction: 'Dec 12th 2024-2:18PM',
        },
        {
          id: 4,
          paymentSource: 'Match Bonus',
          beneficiaryMember: 'Hana Teshager(Enatx)',
          contributedMember: 'Ahmed Sualh,hassen(Ahemed03i)',
          amount: '1800',
          dateOfTransaction: 'Dec 12th 2024-2:15PM',
        },
        {
          id: 5,
          paymentSource: 'Match Bonus',
          beneficiaryMember: 'Hana Teshager(Enatx)',
          contributedMember: 'Ahmed Sualh,hassen(Ahemed03)',
          amount: '1800',
          dateOfTransaction: 'Dec 12th 2024-2:07PM',
        },
        {
          id: 6,
          paymentSource: 'Match Bonus',
          beneficiaryMember: 'Hana Teshager(Enatx)',
          contributedMember: 'Eleabet Arega,alebel(Elessa19)',
          amount: '1800',
          dateOfTransaction: 'Nov 28th 2024-12:15PM',
        },
        {
          id: 7,
          paymentSource: 'Match Bonus',
          beneficiaryMember: 'Hana Teshager(Enatx)',
          contributedMember: 'Nelima Maru,Mohammed(Neyima7)',
          amount: '1800',
          dateOfTransaction: 'Nov 29th 2024-4:37PM',
        },
        // Add more transactions as needed
      ],
    };
  },
  computed: {
    // This function would apply filters if implemented, but for now returns all data
    filteredTransactions() {
      // Logic to filter this.incomeTransactions based on this.filters
      return this.incomeTransactions;
    },
  },
  methods: {
    applyFilters() {
      console.log('Applying filters:', this.filters);
      // Implement data fetching or filtering logic here
    },
    resetFilters() {
      this.filters = {
        dateRange: 'Custom',
        fromDate: '',
        toDate: '',
        amountType: 'Please select',
      };
      console.log('Filters reset');
      // Re-display unfiltered data
    },
  },
};
</script>

<style scoped>
/* No scoped CSS needed as we are using Tailwind CSS for all styling */
</style>