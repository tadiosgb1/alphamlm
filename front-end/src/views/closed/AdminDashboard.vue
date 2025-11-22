<template>
  <div class="p-6 bg-gray-50 min-h-screen font-sans">
    <!-- TOP CARDS -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div class="p-4 rounded-xl shadow bg-white border border-green-200">
        <h3 class="text-gray-600 text-sm">Total Promoters</h3>
        <p class="text-3xl font-bold text-green-700 mt-1">{{ adminStats.totalPromoters }}</p>
      </div>

      <div class="p-4 rounded-xl shadow bg-white border border-green-200">
        <h3 class="text-gray-600 text-sm">Pending Payouts</h3>
        <p class="text-3xl font-bold text-green-700 mt-1">{{ adminStats.pendingPayouts }}</p>
      </div>

      <div class="p-4 rounded-xl shadow bg-white border border-green-200">
        <h3 class="text-gray-600 text-sm">Solved Payouts</h3>
        <p class="text-3xl font-bold text-green-700 mt-1">{{ adminStats.solvedPayouts }}</p>
      </div>

      <div class="p-4 rounded-xl shadow bg-white border border-green-200">
        <h3 class="text-gray-600 text-sm">Total Company Revenue</h3>
        <p class="text-3xl font-bold text-green-700 mt-1">{{ formatAmount(adminStats.totalRevenue) }}</p>
      </div>

      <div class="p-4 rounded-xl shadow bg-white border border-green-200">
        <h3 class="text-gray-600 text-sm">Total Housing Revenue</h3>
        <p class="text-3xl font-bold text-green-700 mt-1">{{ formatAmount(adminStats.totalHousing) }}</p>
      </div>

      <div class="p-4 rounded-xl shadow bg-white border border-green-200">
        <h3 class="text-gray-600 text-sm">Total SACCO Capital</h3>
        <p class="text-3xl font-bold text-green-700 mt-1">{{ formatAmount(adminStats.totalSacco) }}</p>
      </div>

      <div class="p-4 rounded-xl shadow bg-white border border-green-200">
        <h3 class="text-gray-600 text-sm">Total Service Charge</h3>
        <p class="text-3xl font-bold text-green-700 mt-1">{{ formatAmount(adminStats.totalServiceCharge) }}</p>
      </div>
    </div>

    <!-- MAIN TABS -->
    <div class="bg-white rounded-xl border shadow p-4">
      <div class="flex gap-4 border-b pb-2 text-sm font-medium">
        <button v-for="tab in tabs" :key="tab" @click="activeTab = tab"
          :class="[
            'px-3 py-1 rounded-t-md',
            activeTab === tab ? 'text-green-700 border-b-2 border-green-600' : 'text-gray-500'
          ]">{{ tab }}</button>
      </div>

      <div class="mt-6">
        <!-- SALES OVERVIEW -->
        <div v-if="activeTab==='Sales Overview'">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div class="p-4 rounded-xl border bg-gray-50 shadow-sm">
              <h3 class="text-sm font-semibold mb-2">Total Sales by Promoters</h3>
              <apexchart type="area" height="200" :options="salesByPromoterOptions" :series="salesByPromoterSeries" />
            </div>
            <div class="p-4 rounded-xl border bg-gray-50 shadow-sm">
              <h3 class="text-sm font-semibold mb-2">Sales by Network</h3>
              <apexchart type="bar" height="200" :options="salesByNetworkOptions" :series="salesByNetworkSeries" />
            </div>
            <div class="p-4 rounded-xl border bg-gray-50 shadow-sm">
              <h3 class="text-sm font-semibold mb-2">Sales by PV</h3>
              <apexchart type="line" height="200" :options="salesByPVOptions" :series="salesByPVSeries" />
            </div>
          </div>
        </div>

        <!-- TRANSACTIONS & PAYOUTS -->
        <div v-if="activeTab==='Transactions & Payouts'">
          <div class="flex gap-3 mb-4">
            <button @click="txnSub='Transactions'" 
              :class="txnSub==='Transactions' ? 'bg-green-600 text-white px-3 py-1 rounded-full':'border px-3 py-1 rounded-full'">Transactions</button>
            <button @click="txnSub='Payouts'" 
              :class="txnSub==='Payouts' ? 'bg-green-600 text-white px-3 py-1 rounded-full':'border px-3 py-1 rounded-full'">Payouts</button>
          </div>

          <!-- Transactions -->
          <div v-if="txnSub==='Transactions'" class="p-4 rounded-xl border bg-gray-50 shadow-sm">
            <h4 class="font-semibold mb-2">All Transactions</h4>
            <table class="w-full text-sm border-t border-b">
              <thead class="text-xs text-gray-500 border-b">
                <tr><th class="py-2">Date</th><th class="py-2">Promoter</th><th class="py-2">Type</th><th class="py-2">Amount</th></tr>
              </thead>
              <tbody>
                <tr v-for="t in transactions" :key="t.id">
                  <td class="py-2">{{ t.date }}</td>
                  <td class="py-2">{{ t.promoter }}</td>
                  <td class="py-2">{{ t.type }}</td>
                  <td class="py-2" :class="t.debit?'text-red-600':'text-green-700'">{{ t.amount }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Payouts -->
          <div v-if="txnSub==='Payouts'" class="p-4 rounded-xl border bg-gray-50 shadow-sm">
            <h4 class="font-semibold mb-2">All Payouts</h4>
            <table class="w-full text-sm border-t border-b">
              <thead class="text-xs text-gray-500 border-b">
                <tr><th class="py-2">Date</th><th class="py-2">Promoter</th><th class="py-2">Amount</th><th class="py-2">Status</th></tr>
              </thead>
              <tbody>
                <tr v-for="p in payouts" :key="p.id">
                  <td class="py-2">{{ p.date }}</td>
                  <td class="py-2">{{ p.promoter }}</td>
                  <td class="py-2 text-green-700">{{ p.amount }}</td>
                  <td class="py-2">{{ p.status }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- REVENUE DISTRIBUTION -->
        <div v-if="activeTab==='Revenue Distribution'" class="p-4 rounded-xl border bg-gray-50 shadow-sm">
          <h4 class="font-semibold mb-2">Company Revenue Distribution</h4>
          <apexchart type="donut" height="280" :options="companyRevenueOptions" :series="companyRevenueSeries" />
        </div>

        <!-- BONUS DISTRIBUTION -->
        <div v-if="activeTab==='Bonus Distribution'" class="p-4 rounded-xl border bg-gray-50 shadow-sm">
          <h4 class="font-semibold mb-2">Promoters Bonus Distribution</h4>
          <table class="w-full text-sm border-t border-b">
            <thead class="text-xs text-gray-500 border-b">
              <tr><th class="py-2">Bonus Type</th><th class="py-2">Total Amount Given</th></tr>
            </thead>
            <tbody>
              <tr v-for="(amt,key) in bonusDistribution" :key="key">
                <td class="py-2">{{ key }}</td>
                <td class="py-2 text-green-700">{{ formatAmount(amt) }}</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import ApexCharts from 'vue3-apexcharts'

export default {
  components:{ apexchart:ApexCharts },
  data(){
    return {
      activeTab:'Sales Overview',
      tabs:['Sales Overview','Transactions & Payouts','Revenue Distribution','Bonus Distribution'],
      txnSub:'Transactions',

      adminStats:{
        totalPromoters: 200,
        pendingPayouts: 50,
        solvedPayouts: 120,
        totalRevenue: 1250000,
        totalHousing: 120000,
        totalSacco: 15000,
        totalServiceCharge: 24000
      },

      transactions:[
        {id:1,date:'2025-11-20',promoter:'John Doe',type:'Sale',amount:1200,debit:false},
        {id:2,date:'2025-11-19',promoter:'Jane Doe',type:'Direct Bonus',amount:560,debit:false},
        {id:3,date:'2025-11-18',promoter:'John Doe',type:'Payout',amount:2400,debit:true},
      ],

      payouts:[
        {id:1,date:'2025-11-20',promoter:'John Doe',amount:2400,status:'Pending'},
        {id:2,date:'2025-11-18',promoter:'Jane Doe',amount:560,status:'Solved'},
      ],

      salesByPromoterSeries:[{name:'Sales',data:[12000,15000,17000,21000]}],
      salesByPromoterOptions:{ chart:{toolbar:{show:false}}, xaxis:{categories:['John','Jane','Mike','Anna']}, colors:['#16a34a'] },

      salesByNetworkSeries:[{name:'Left',data:[5000,6000,7000]},{name:'Center',data:[4000,5000,6000]},{name:'Right',data:[3000,4000,5000]}],
      salesByNetworkOptions:{ chart:{toolbar:{show:false}}, xaxis:{categories:['Jun','Jul','Aug']}, colors:['#16a34a','#4ade80','#86efac'] },

      salesByPVSeries:[{name:'PV',data:[2000,2500,3000,4000]}],
      salesByPVOptions:{ chart:{toolbar:{show:false}}, xaxis:{categories:['Jun','Jul','Aug','Sep']}, colors:['#15803d'] },

      companyRevenueSeries:[560000,62000,15000,24000],
      companyRevenueOptions:{ labels:['Product Sales','Training','SACCO','Service Charge'], colors:['#16a34a','#4ade80','#86efac','#bbf7d0'] },

      bonusDistribution:{
        'Direct Bonus':1200,
        'Indirect Bonus':300,
        'Rank Achievement':500,
        'Unilevel Bonus':150,
        'Loyality Bonus':60,
        'Fast Track Bonus':0,
        'Display Bonus':0,
        'Incentive Bonus':150,
        'Profit Share Bonus':250
      }
    }
  },
  methods:{
    formatAmount(v){ return 'ETB '+Number(v).toLocaleString() }
  }
}
</script>

<style scoped>
.bg-white:hover{ transform:translateY(-2px); transition: all 0.2s ease; }
</style>
