<template>
  <div>
    <!-- PROMOTER TOP CARDS -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div class="p-4 rounded-xl shadow bg-white border border-green-200">
        <h3 class="text-gray-600 text-sm">Total Downlines</h3>
        <p class="text-3xl font-bold text-green-700 mt-1">{{ promoterStats.totalDownlines }}</p>
        <p class="text-xs text-gray-500">Active: {{ promoterStats.activeDownlines }}</p>
      </div>

      <div class="p-4 rounded-xl shadow bg-white border border-green-200">
        <h3 class="text-gray-600 text-sm">Personal PV</h3>
        <p class="text-3xl font-bold text-green-700 mt-1">{{ promoterStats.personalPV }}</p>
        <p class="text-xs text-gray-500">Period: {{ promoterStats.period }}</p>
      </div>

      <div class="p-4 rounded-xl shadow bg-white border border-green-200">
        <h3 class="text-gray-600 text-sm">Group PV</h3>
        <p class="text-3xl font-bold text-green-700 mt-1">{{ promoterStats.groupPV }}</p>
        <p class="text-xs text-gray-500">Right PV: {{ promoterStats.rightPV }}</p>
      </div>

      <div class="p-4 rounded-xl shadow bg-white border border-green-200">
        <h3 class="text-gray-600 text-sm">Wallet Balance</h3>
        <p class="text-3xl font-bold text-green-700 mt-1">{{ promoterStats.wallet }}</p>
        <p class="text-xs text-gray-500">Updated Now</p>
      </div>
    </div>

    <!-- TABS -->
    <div class="bg-white rounded-xl border shadow p-4">
      <div class="flex gap-4 border-b pb-2 text-sm font-medium">
        <button
          v-for="tab in tabs"
          :key="tab"
          @click="activeTab = tab"
          :class="[
            'px-3 py-1 rounded-t-md',
            activeTab === tab ? 'text-green-700 border-b-2 border-green-600' : 'text-gray-500'
          ]"
        >{{ tab }}</button>
      </div>

      <div class="mt-6">
        <!-- SALES & PV -->
        <div v-if="activeTab === 'Sales & PV'">
          <div class="flex items-center gap-3 mb-4">
            <label>From:</label>
            <input type="date" v-model="salesRange.start" class="border rounded px-2 py-1" />
            <label>To:</label>
            <input type="date" v-model="salesRange.end" class="border rounded px-2 py-1" />
            <button class="px-3 py-1 bg-green-600 text-white rounded" @click="filterSales">Apply</button>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div class="p-4 rounded-xl border bg-gray-50 shadow-sm">
              <h3 class="text-sm font-semibold mb-2">Sales</h3>
              <apexchart type="area" height="200" :options="salesOptions" :series="salesSeries" />
            </div>

            <div class="p-4 rounded-xl border bg-gray-50 shadow-sm">
              <h3 class="text-sm font-semibold mb-2">Personal PV</h3>
              <apexchart type="line" height="200" :options="ppvOptions" :series="ppvSeries" />
            </div>

            <div class="p-4 rounded-xl border bg-gray-50 shadow-sm">
              <h3 class="text-sm font-semibold mb-2">Group PV</h3>
              <apexchart type="bar" height="200" :options="gpvOptions" :series="gpvSeries" />
            </div>
          </div>
        </div>

        <!-- TRANSACTIONS & PAYOUTS -->
        <div v-if="activeTab === 'Transactions & Payouts'">
          <div class="flex gap-3 mb-4">
            <button 
              @click="txnSub = 'Transactions'"
              :class="txnSub==='Transactions' ? 'bg-green-600 text-white px-3 py-1 rounded-full' : 'border px-3 py-1 rounded-full'">Gained Transactions</button>
            <button 
              @click="txnSub = 'Payouts'"
              :class="txnSub==='Payouts' ? 'bg-green-600 text-white px-3 py-1 rounded-full' : 'border px-3 py-1 rounded-full'">Payouts</button>
          </div>

          <!-- TRANSACTIONS: ALL CREDITS -->
          <div v-if="txnSub==='Transactions'" class="p-4 rounded-xl border bg-gray-50 shadow-sm">
            <h4 class="font-semibold mb-2">Credited Transactions</h4>
            <table class="w-full text-sm border-t border-b">
              <thead class="text-xs text-gray-500 border-b">
                <tr><th class="py-2">Date</th><th class="py-2">Source</th><th class="py-2">Amount</th></tr>
              </thead>
              <tbody>
                <tr v-for="t in transactions.filter(tr=>!tr.debit)" :key="t.id">
                  <td class="py-2">{{ t.date }}</td>
                  <td class="py-2">{{ t.note || t.type }}</td>
                  <td class="py-2 text-green-700">{{ t.amount }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- PAYOUTS: ALL DEBITS -->
          <div v-if="txnSub==='Payouts'" class="p-4 rounded-xl border bg-gray-50 shadow-sm">
            <h4 class="font-semibold mb-2">Debited Payouts</h4>
            <table class="w-full text-sm border-t border-b">
              <thead class="text-xs text-gray-500 border-b">
                <tr><th class="py-2">Date</th><th class="py-2">Type</th><th class="py-2">Amount</th></tr>
              </thead>
              <tbody>
                <tr v-for="p in transactions.filter(tr=>tr.debit)" :key="p.id">
                  <td class="py-2">{{ p.date }}</td>
                  <td class="py-2">{{ p.note || p.type }}</td>
                  <td class="py-2 text-red-600">{{ p.amount }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- NETWORK DISTRIBUTION -->
        <div v-if="activeTab === 'Network Distribution'">
          <div class="p-4 rounded-xl border bg-gray-50 shadow-sm">
            <h3 class="text-sm font-semibold mb-3">Network Breakdown</h3>
            <apexchart type="donut" height="260" :options="networkOptions" :series="networkSeries" />
            <div class="mt-3 text-sm text-gray-600">
              Left: {{ networkLabels.left }} • Center: {{ networkLabels.center }} • Right: {{ networkLabels.right }}
            </div>
          </div>
        </div>

        <!-- REVENUE -->
        <div v-if="activeTab === 'Revenue'">
          <div class="p-4 rounded-xl border bg-gray-50 shadow-sm">
            <h3 class="text-sm font-semibold mb-2">Total Revenue: <span class="text-green-700">{{ formatAmount(totalRevenue) }}</span></h3>

            <h4 class="font-semibold mb-2">Revenue Breakdown</h4>
            <table class="w-full text-sm mb-3">
              <thead class="text-xs text-gray-500 border-b">
                <tr><th class="py-2">Source</th><th class="py-2">Amount</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td class="py-2">Product Sale Revenue</td>
                  <td class="py-2 text-right">{{ formatAmount(salesRevenue) }}</td>
                </tr>
                <tr v-for="(amt,key) in myBonuses" :key="key">
                  <td class="py-2">{{ key }}</td>
                  <td class="py-2 text-right">{{ formatAmount(amt) }}</td>
                </tr>
              </tbody>
            </table>

            <h4 class="font-semibold mb-2">Revenue Chart</h4>
            <apexchart type="donut" height="240" :options="revenueOptions" :series="[salesRevenue, bonusRevenue]" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ApexCharts from 'vue3-apexcharts'

export default {
  components: { apexchart: ApexCharts },
  data() {
    return {
      activeTab: 'Sales & PV',
      tabs: ['Sales & PV', 'Transactions & Payouts', 'Network Distribution', 'Revenue'],
      txnSub: 'Transactions',

      promoterStats: {
        totalDownlines: 120,
        activeDownlines: 95,
        personalPV: 1250,
        groupPV: 12450,
        rightPV: 6200,
        wallet: 'ETB 12,450.00',
        period: 'Nov 2025'
      },

      transactions: [
        { id:1, date:'2025-11-20', type:'Payout', amount:'2400', debit:true, balance:'ETB 10,050', note:'Bank payout' },
        { id:2, date:'2025-11-18', type:'Sale', amount:'1200', debit:false, balance:'ETB 12,450', note:'Product sale' },
        { id:3, date:'2025-11-16', type:'Commission', amount:'560', debit:false, balance:'ETB 11,250', note:'Direct bonus' },
        { id:4, date:'2025-10-10', type:'Payout', amount:'200', debit:true, balance:'ETB 10,690', note:'Wallet payout' },
        { id:5, date:'2025-09-04', type:'Bonus', amount:'150', debit:false, balance:'ETB 10,890', note:'Incentive bonus' },
      ],

      salesSeries: [{ name:'Sales', data:[1200,1500,1800,2000,2600,3000] }],
      salesOptions: { chart:{toolbar:{show:false}}, xaxis:{categories:['Jun','Jul','Aug','Sep','Oct','Nov']}, colors:['#16a34a'] },
      salesRange: { start:'', end:'' },

      ppvSeries: [{ name:'Personal PV', data:[300,400,350,500,420,600] }],
      ppvOptions: { chart:{toolbar:{show:false}}, xaxis:{categories:['Jun','Jul','Aug','Sep','Oct','Nov']}, colors:['#15803d'] },

      gpvSeries: [{ name:'Group PV', data:[2000,3200,4100,3900,4500,5100] }],
      gpvOptions: { chart:{toolbar:{show:false}}, xaxis:{categories:['Jun','Jul','Aug','Sep','Oct','Nov']}, colors:['#22c55e'] },

      networkSeries: [45,30,25],
      networkOptions: { labels:['Left','Center','Right'], colors:['#16a34a','#4ade80','#86efac'] },
      networkLabels: { left:54, center:30, right:36 },

      myBonuses: {
        'direct bonus': 1200,
        'indirect bonus': 300,
        'rank achievement': 500,
        'unilevel bonus': 150,
        'loyality bonus': 60,
        'fast track bonus': 0,
        'display bonus': 0,
        'incentive bonus': 150,
        'profit share bonus': 250
      },

      salesRevenue: 12000,
      bonusRevenue: 2760,
      revenueOptions: { labels:['Sales Revenue','Bonus Revenue'], colors:['#16a34a','#4ade80'] }
    }
  },
  computed: {
    totalRevenue() {
      return this.salesRevenue + this.bonusRevenue
    }
  },
  methods: {
    filterSales() {
      alert(`Sales filtered from ${this.salesRange.start || 'default'} to ${this.salesRange.end || 'default 6 months'}`)
    },
    formatAmount(v) {
      if (typeof v === 'string') return v
      return 'ETB ' + Number(v).toLocaleString()
    }
  }
}
</script>

<style scoped>
.bg-white:hover { transform: translateY(-2px); transition: all 0.2s ease; }
</style>
