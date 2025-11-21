<template>
  <div class="page bg-white m-3">
    <!-- Search -->
    <div class="search-bar">
      <input v-model="search" placeholder="Search Email or ID" />
      <button @click="searchUser">Search</button>
    </div>

    <!-- Tree -->
    <div class="tree-wrapper" v-if="!loading">
      <ul class="tree">
        <TreeNode :node="tree" @add="onAddHere" />
      </ul>
    </div>

    <div v-if="loading" class="loading">Loading tree…</div>
  </div>
</template>

<script>
import TreeNode from "./TreeNode.vue";

export default {
  components: { TreeNode },
  data() {
    return {
      tree: null,
      loading: true,
      search: "",
      _idCounter: 0,
    };
  },

  methods: {
    async fetchTree() {
      const userId =
        this.search ||
        this.$route.query.userId ||
        localStorage.getItem("userId");
      const res = await this.$apiGetById("/get_user_tree", userId);
      const root = res.data ?? res;
      this.tree = this.normalize(root);
      this.loading = false;
    },

    // ensures each node has exactly 3 children (fill placeholders)
    normalize(node) {
      const copy = {
        ...node,
        children: Array.isArray(node.children)
          ? node.children.map((c) => this.normalize(c))
          : [],
        placeholder: false,
        _renderId: "n" + this._idCounter++,
      };

      while (copy.children.length < 3) {
        copy.children.push({
          id: null,
          email: null,
          placeholder: true,
          children: [],
          _renderId: "p" + this._idCounter++,
        });
      }

      return copy;
    },

    searchUser() {
      this.fetchTree();
    },

    onAddHere(node) {
      alert("Add new user under this node");
    },
  },

  mounted() {
    this.fetchTree();
  },
};
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.tree-wrapper {
  width: 100%;
  overflow-x: auto; /* HORIZONTAL SCROLL FOR MOBILE */
  padding: 30px;
}

.tree {
  display: flex;
  justify-content: center;
}

.search-bar {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.loading {
  font-size: 20px;
  color: #666;
}
</style>
