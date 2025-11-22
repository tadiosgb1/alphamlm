<template>
  <div class="p-6 bg-gray-50 min-h-screen font-sans">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-semibold text-gray-800">MLM Dashboard</h1>
      <select v-model="role" class="px-3 py-1 rounded border bg-white shadow-sm">
        <option value="admin">Admin</option>
        <option value="promoter">Promoter</option>
      </select>
    </div>

    <!-- Load child component based on role -->
    <component :is="currentDashboard" />
  </div>
</template>

<script>
import PromoterDashboard from './PromoterDashboard.vue'
import AdminDashboard from './AdminDashboard.vue'

export default {
  components: { PromoterDashboard, AdminDashboard },
  data() {
    return {
      role: 'promoter'
    }
  },
  computed: {
    currentDashboard() {
      return this.role === 'admin' ? 'AdminDashboard' : 'PromoterDashboard'
    }
  }
}
</script>
