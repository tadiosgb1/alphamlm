
<template>
  <div class="p-6 bg-gray-50 min-h-screen text-sm text-gray-800">
    <!-- Loading -->
    <Loading :visible="loading" message="Loading HigherUser..." />

    <!-- Page Header -->
    <div class="flex items-center justify-between mb-6 border-b pb-4 border-gray-200">
      <h1 class="text-lg font-bold text-gray-800">HigherUser Detail</h1>
    </div>

    <!-- Detail Card -->
    <div class="bg-white overflow-hidden rounded-md border border-gray-200 p-4 hidden md:block space-y-2">
      <div><strong>ID:</strong> {{ item.id }}</div>
      <div><strong>Email:</strong> {{ item.email }}</div><div><strong>Phone_number:</strong> {{ item.phone_number }}</div><div><strong>Password:</strong> {{ item.password }}</div><div><strong>First_name:</strong> {{ item.first_name }}</div><div><strong>Middle_name:</strong> {{ item.middle_name }}</div><div><strong>Last_name:</strong> {{ item.last_name }}</div>
    </div>

    <!-- Mobile View -->
    <div class="md:hidden bg-white rounded-md border border-gray-200 p-4 space-y-2">
      <div><strong>ID:</strong> {{ item.id }}</div>
      <div><strong>Email:</strong> {{ item.email }}</div><div><strong>Phone_number:</strong> {{ item.phone_number }}</div><div><strong>Password:</strong> {{ item.password }}</div><div><strong>First_name:</strong> {{ item.first_name }}</div><div><strong>Middle_name:</strong> {{ item.middle_name }}</div><div><strong>Last_name:</strong> {{ item.last_name }}</div>
    </div>

    <button @click="$router.back()" class="mt-4 text-blue-600 hover:underline">Back</button>
  </div>
</template>

<script>
import Loading from "@/components/Loading.vue";

export default {
  components: { Loading },
  data() {
    return {
      item: {},
      loading: false,
    };
  },
  async mounted() {
    this.loading = true;
    const id = this.$route.params.id;
    try {
      const response = await this.$apiGetById('/higheruser', id);
      this.item = response || {};
    } catch (error) {
      console.error(error);
    } finally {
      this.loading = false;
    }
  },
};
</script>
