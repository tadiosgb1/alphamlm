<template>
  <div class="p-4 text-sm text-gray-800">
    <!-- Header -->
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-lg font-semibold">Commissions</h1>
      <button
        @click="openAddModal"
        class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-xs"
      >
        + Add Commission
      </button>
    </div>

    <!-- Search + Page Size -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
      <input
        v-model="searchQuery"
        @input="fetchCommissions(1)"
        type="text"
        placeholder="Search by seller/buyer..."
        class="border rounded-md px-2 py-1 text-xs w-full sm:w-64 focus:outline-none focus:ring-1 focus:ring-blue-400"
      />
      <div class="flex items-center gap-2 text-xs">
        <label>Show</label>
        <select
          v-model="pageSize"
          @change="fetchCommissions(1)"
          class="border rounded-md px-1 py-0.5 text-xs"
        >
          <option v-for="size in [5,10,20,50,100]" :key="size" :value="size">{{ size }}</option>
        </select>
        <span>entries</span>
      </div>
    </div>

    <!-- Desktop Table -->
    <div class="overflow-x-auto border rounded-lg shadow-sm hidden md:block">
      <table class="min-w-full text-xs">
        <thead class="bg-gray-200 text-gray-700 uppercase text-[11px]">
          <tr>
            <th class="px-3 py-2 text-left">#</th>
            <th class="px-3 py-2 text-left">Amount</th>
            <th class="px-3 py-2 text-left">Sale</th>
            <th class="px-3 py-2 text-left">Seller</th>
            <th class="px-3 py-2 text-left">Buyer</th>
            <th class="px-3 py-2 text-left">Created</th>
            <th class="px-3 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white">
          <tr
            v-for="(commission, index) in commissionsArray"
            :key="commission.id"
            class="border-t hover:bg-gray-50"
          >
            <td class="px-3 py-2">{{ (currentPage - 1) * pageSize + index + 1 }}</td>
            <td class="px-3 py-2 font-medium">{{ parseFloat(commission.amount || 0).toFixed(2) }}</td>

            <!-- Sale -->
            <td class="px-3 py-2">
              <span>{{ commission.sale?.id || '-' }}</span>
              <button
                v-if="commission.sale?.id"
                @click="goToSaleDetail(commission.sale.id)"
                class="text-blue-600 hover:text-blue-800 ml-1"
                title="View Sale Detail"
              >
                
              </button>
            </td>

            <!-- Seller -->
            <td class="px-3 py-2">
              <span>{{ commission.sale?.seller?.email || '-' }}</span>
              <button
                v-if="commission.sale?.seller?.id"
                @click="goToUserDetail(commission.sale.seller.id)"
                class="text-green-600 hover:text-green-800 ml-1"
                title="View Seller Detail"
              >
                
              </button>
            </td>

            <!-- Buyer -->
            <td class="px-3 py-2">
              <span>{{ commission.sale?.buyer?.email || '-' }}</span>
              <button
                v-if="commission.sale?.buyer?.id"
                @click="goToUserDetail(commission.sale.buyer.id)"
                class="text-purple-600 hover:text-purple-800 ml-1"
                title="View Buyer Detail"
              >
                
              </button>
            </td>

            <td class="px-3 py-2 text-gray-500">
              {{ new Date(commission.created_at).toLocaleDateString() }}
            </td>

            <td class="px-3 py-2 flex gap-2">
              <button @click="editCommission(commission)" class="text-blue-500 hover:text-blue-700" title="Edit">✎</button>
              <button @click="deleteCommission(commission.id)" class="text-red-500 hover:text-red-700" title="Delete">🗑</button>
            </td>
          </tr>

          <tr v-if="commissionsArray.length === 0">
            <td colspan="7" class="text-center py-3 text-gray-400">No commissions found.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Mobile Card View -->
    <div class="md:hidden space-y-3">
      <div
        v-for="(commission, index) in commissionsArray"
        :key="commission.id"
        class="bg-white border rounded-lg shadow-sm p-3"
      >
        <div class="flex justify-between items-center mb-2">
          <h2 class="font-semibold text-gray-700">#{{ (currentPage - 1) * pageSize + index + 1 }}</h2>
          <div class="flex gap-2">
            <button @click="editCommission(commission)" class="text-blue-500 hover:text-blue-700" title="Edit">✎</button>
            <button @click="deleteCommission(commission.id)" class="text-red-500 hover:text-red-700" title="Delete">🗑</button>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-y-1 text-xs text-gray-700">
          <div><span class="font-medium">Amount:</span> {{ parseFloat(commission.amount || 0).toFixed(2) }}</div>
          <div><span class="font-medium">Sale ID:</span> {{ commission.sale?.id || '-' }}</div>
          <div><span class="font-medium">Seller:</span> {{ commission.sale?.seller?.email || '-' }}</div>
          <div><span class="font-medium">Buyer:</span> {{ commission.sale?.buyer?.email || '-' }}</div>
          <div><span class="font-medium">Created:</span> {{ new Date(commission.created_at).toLocaleDateString() }}</div>
        </div>

        <div class="mt-2 flex justify-end gap-3 text-xs">
          <button
            v-if="commission.sale?.id"
            @click="goToSaleDetail(commission.sale.id)"
            class="text-blue-600 hover:text-blue-800"
          >🔍 Sale</button>
          <button
            v-if="commission.sale?.seller?.id"
            @click="goToUserDetail(commission.sale.seller.id)"
            class="text-green-600 hover:text-green-800"
          >👤 Seller</button>
          <button
            v-if="commission.sale?.buyer?.id"
            @click="goToUserDetail(commission.sale.buyer.id)"
            class="text-purple-600 hover:text-purple-800"
          >👤 Buyer</button>
        </div>
      </div>

      <p v-if="commissionsArray.length === 0" class="text-center text-gray-400 py-3">
        No commissions found.
      </p>
    </div>

    <!-- Pagination -->
    <div class="flex items-center justify-between mt-4 text-xs">
      <span>Page {{ currentPage }} of {{ totalPages }} ({{ count }} total)</span>
      <div class="flex items-center gap-1">
        <button
          @click="fetchCommissions(currentPage - 1)"
          :disabled="!previousPage"
          class="px-2 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
        >
          ◀ Prev
        </button>
        <button
          @click="fetchCommissions(currentPage + 1)"
          :disabled="!nextPage"
          class="px-2 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
        >
          Next ▶
        </button>
      </div>
    </div>

    <!-- Add/Edit Modal -->
    <div
      v-if="showAddEditModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg shadow-lg w-80 p-4 text-xs">
        <h2 class="font-semibold mb-3">
          {{ editMode ? 'Edit Commission' : 'Add Commission' }}
        </h2>
        <form @submit.prevent="saveCommission">
          <div class="mb-2">
            <label class="block mb-1 text-gray-600">Amount</label>
            <input
              v-model="form.amount"
              type="text"
              class="border rounded w-full px-2 py-1 text-xs"
              required
            />
          </div>
          <div class="mb-2">
            <label class="block mb-1 text-gray-600">Sale ID</label>
            <input
              v-model="form.sale"
              type="number"
              class="border rounded w-full px-2 py-1 text-xs"
              required
            />
          </div>
          <div class="flex justify-end gap-2">
            <button
              type="button"
              @click="showAddEditModal = false"
              class="px-3 py-1 border rounded text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded"
            >
              {{ editMode ? 'Update' : 'Save' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Modal -->
    <div
      v-if="showDeleteModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg shadow-lg w-80 p-4 text-xs">
        <h2 class="font-semibold mb-3">Delete Commission</h2>
        <p>Are you sure you want to delete this commission?</p>
        <div class="flex justify-end gap-2 mt-3">
          <button
            @click="showDeleteModal = false"
            class="px-3 py-1 border rounded text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            @click="confirmDelete"
            class="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      commissionsArray: [],
      count: 0,
      totalPages: 1,
      currentPage: 1,
      pageSize: 10,
      nextPage: null,
      previousPage: null,
      searchQuery: "",

      // Add/Edit modal
      showAddEditModal: false,
      editMode: false,
      form: { amount: "", sale: null },

      // Delete modal
      showDeleteModal: false,
      commissionToDelete: null,
    };
  },
  methods: {
    async fetchCommissions(page = 1) {
      try {
        const params = { page, page_size: this.pageSize, search: this.searchQuery || undefined };
        const res = await this.$apiGet("/get_commissions", params);
        const data = res.data || {};
        this.commissionsArray = data || [];
        this.count = data.count || 0;
        this.totalPages = data.total_pages || 1;
        this.currentPage = data.current_page || 1;
        this.nextPage = !!data.next;
        this.previousPage = !!data.previous;
      } catch (err) {
        console.error(err);
        this.commissionsArray = [];
      }
    },
    openAddModal() {
      this.editMode = false;
      this.form = { amount: "", sale: null };
      this.showAddEditModal = true;
    },
    editCommission(commission) {
      this.editMode = true;
      this.form = { amount: commission.amount, sale: commission.sale?.id };
      this.showAddEditModal = true;
    },
    async saveCommission() {
      try {
        if (this.editMode) {
          await this.$apiPatch(`/update_commission/${this.form.sale}/`, this.form);
        } else {
          await this.$apiPost("/post_commission", this.form);
        }
        this.showAddEditModal = false;
        this.fetchCommissions(this.currentPage);
      } catch (err) {
        console.error(err);
      }
    },
    deleteCommission(id) {
      this.commissionToDelete = id;
      this.showDeleteModal = true;
    },
    async confirmDelete() {
      try {
        await this.$apiDelete(`/delete_commission/${this.commissionToDelete}/`);
        this.showDeleteModal = false;
        this.fetchCommissions(this.currentPage);
      } catch (err) {
        console.error(err);
      }
    },
    goToSaleDetail(id) {
      this.$router.push(`/sale_detail/${id}`);
    },
    goToUserDetail(id) {
      this.$router.push(`/user_detail/${id}`);
    },
  },
  mounted() {
    this.fetchCommissions();
  },
};
</script>

<style scoped>
table th, table td { white-space: nowrap; }
</style>
