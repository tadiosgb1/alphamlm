<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-lg w-96 p-5 text-sm">
      <h2 class="font-semibold mb-4 text-gray-800">Add Promoter Buyer</h2>

      <form @submit.prevent="saveItem" class="space-y-4">
        <!-- Promoter -->
        <div>
          <label class="block mb-1 text-gray-600">Promoter</label>
          <div class="relative">
            <input
              v-model="promoterSearch"
              @input="searchPromoters"
              placeholder="Search promoter..."
              class="border rounded w-full px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              list="promoterList"
              required
            />
            <datalist id="promoterList">
              <option
                v-for="user in promoters"
                :key="user.id"
                :value="user.id + ' - ' + (user.first_name || '') + ' ' + (user.last_name || '')"
              />
            </datalist>
          </div>
        </div>

        <!-- Buyer -->
        <div>
          <label class="block mb-1 text-gray-600">Buyer</label>
          <div class="relative">
            <input
              v-model="buyerSearch"
              @input="searchBuyers"
              placeholder="Search buyer..."
              class="border rounded w-full px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              list="buyerList"
              required
            />
            <datalist id="buyerList">
              <option
                v-for="user in buyers"
                :key="user.id"
                :value="user.id + ' - ' + (user.first_name || '') + ' ' + (user.last_name || '')"
              />
            </datalist>
          </div>
        </div>

        <!-- Buttons -->
        <div class="flex justify-end gap-2 pt-2">
          <button
            type="button"
            @click="$emit('close')"
            class="px-3 py-1 border rounded text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      form: { promoter: "", buyer: "" },
      promoterSearch: "",
      buyerSearch: "",
      promoters: [],
      buyers: [],
      typingTimeout: null,
    };
  },
  methods: {
    // 🔹 SEARCH PROMOTERS
    async searchPromoters() {
      clearTimeout(this.typingTimeout);
      this.typingTimeout = setTimeout(async () => {
        if (this.promoterSearch.length < 2) return;

        try {
          const params = { search: this.promoterSearch };
          const res = await this.$apiGet("/get_users", params);
          this.promoters = res.data || [];
          console.log("Promoters:", this.promoters);
        } catch (err) {
          console.error("Error searching promoters:", err);
        }

        // Auto-assign when exact match is typed
        const match = this.promoters.find(
          (u) =>
            `${u.id} - ${u.first_name || ""} ${u.last_name || ""}`.trim() ===
            this.promoterSearch.trim()
        );
        this.form.promoter = match ? match.id : "";
      }, 400);
    },

    // 🔹 SEARCH BUYERS (same logic)
    async searchBuyers() {
      clearTimeout(this.typingTimeout);
      this.typingTimeout = setTimeout(async () => {
        if (this.buyerSearch.length < 2) return;

        try {
          const res = await axios.get(
            "https://alphapms.sunriseworld.org/api/get_users",
            { params: { search: this.buyerSearch } }
          );
          this.buyers = res.data || [];
          console.log("Buyers:", this.buyers);
        } catch (err) {
          console.error("Error searching buyers:", err);
        }

        const match = this.buyers.find(
          (u) =>
            `${u.id} - ${u.first_name || ""} ${u.last_name || ""}`.trim() ===
            this.buyerSearch.trim()
        );
        this.form.buyer = match ? match.id : "";
      }, 400);
    },

    // 🔹 SAVE FORM
    async saveItem() {
      if (!this.form.promoter || !this.form.buyer) {
        this.$root.$refs.toast.showToast(
          "Please select both promoter and buyer",
          "error"
        );
        return;
      }

      try {
        const res = await this.$apiPost("/post_promoter_buyer", this.form);
        if (res) this.$root.$refs.toast.showToast("Saved successfully", "success");
        this.$emit("saved");
        this.$emit("close");
      } catch (err) {
        console.error("Save failed:", err);
        this.$root.$refs.toast.showToast("Save failed", "error");
      }
    },
  },
};
</script>
