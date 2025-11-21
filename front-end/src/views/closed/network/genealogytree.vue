<template>
  <div>
    <!-- Search field -->
    <div class="flex items-center gap-2 m-3">
      <input
        v-model="searchId"
        type="number"
        placeholder="Enter user ID"
        class="border rounded p-1"
      />
      <button
        @click="fetchTreeById"
        class="bg-blue-500 text-white px-3 py-1 rounded"
      >
        Search
      </button>
    </div>

    <!-- Loading indicator -->
    <div v-if="loading" class="m-3 text-gray-600">Loading tree...</div>

    <!-- Tree container -->
    <div class="tree-container bg-white shadow-lg m-3 p-2">
      <svg ref="svgRef"></svg>
    </div>

    <!-- AddHigherUser modal -->
    <AddHigherUser
      v-if="showAddUserModal"
      :data="addUserData"
      @close="showAddUserModal = false"
      @saved="fetchTreeById"
    />
  </div>
</template>

<script>
import * as d3 from "d3";
import AddHigherUser from "../Higheruser/AddHigherUser.vue";

export default {
  components: { AddHigherUser },
  data() {
    return {
      treeData: null,
      searchId: "",
      loading: false,
      showAddUserModal: false,
      addUserData: {},
      referal_code:"",
    };
  },

  mounted() {
    this.fetchTreeById();
  },

  methods: {
    async fetchTreeById() {
      const id = this.searchId || 2;
      this.loading = true;
      try {
        const response = await this.$apiGetById("/get_user_tree", id);
        const normalized = this.normalizeTree(response);
        this.treeData = normalized;
        this.renderTree(normalized);
      } catch (err) {
        console.error("Error fetching tree:", err);
      } finally {
        this.loading = false;
      }
    },

    normalizeTree(node) {
      if (!node) return null;
      const copy = {
        id: node.id,
        email: node.first_name  + "  "  + "(" + node.email + ")" ?? `User ${node.id}`,
        placeholder: false,
        children: Array.isArray(node.children)
          ? node.children.map((c) => this.normalizeTree(c))
          : [],
      };

      while (copy.children.length < 3) {
        copy.children.push({
          id: null,
          email: "+ Add",
          placeholder: true,
          referal_code:node.referal_code,
          tree_position: "a", // default, can be dynamic later
          children: [],
        });
      }
      return copy;
    },

    renderTree(treeData) {
      const svg = d3.select(this.$refs.svgRef);
      svg.selectAll("*").remove();

      const depth = this.getMaxDepth(treeData);
      const nodeCount = this.getNodeCount(treeData);

      const svgWidth = Math.max(1600, depth * 220);
      const svgHeight = Math.max(800, nodeCount * 50);

      svg.attr("width", svgWidth).attr("height", svgHeight);

      const g = svg.append("g").attr("transform", `translate(150,50)`);

      const root = d3.hierarchy(treeData, (d) => d.children);

      const treeLayout = d3.tree()
        .size([svgHeight - 100, svgWidth - 200])
        .separation((a, b) => (a.parent === b.parent ? 2 : 3));

      treeLayout(root);

      // Links
      g.selectAll(".link")
        .data(root.links())
        .enter()
        .append("path")
        .attr("fill", "none")
        .attr("stroke", "#ccc")
        .attr("stroke-width", 2)
        .attr("d", d3.linkHorizontal().x((d) => d.y).y((d) => d.x));

      // Nodes
      const nodes = g
        .selectAll(".node")
        .data(root.descendants())
        .enter()
        .append("g")
        .attr("transform", (d) => `translate(${d.y},${d.x})`)
        .attr("cursor", "pointer")
        .on("click", (event, d) => {
          if (d.data.placeholder) {
            // Pass tree_position and referal_code to modal
            this.openAddUserModal({
            tree_position : (d.data.children.length) + 1 || "left",
              referal_code: d.data.referal_code,
              parent_id: d.parent?.data.id || null,
            });
            return;
          }
          if (d.children) {
            d._children = d.children;
            d.children = null;
          } else {
            d.children = d._children;
            d._children = null;
          }
          this.renderTree(treeData);
        });

      // Node rectangles
      nodes
        .append("rect")
        .attr("x", (d) => -((d.data.email.length * 7 + 20) / 2))
        .attr("y", -18)
        .attr("width", (d) => d.data.email.length * 7 + 20)
        .attr("height", 36)
        .attr("rx", 12)
        .attr("ry", 12)
        .attr("fill", (d) => (d.data.placeholder ? "#f3f4f6" : "#69b3a2"))
        .attr("stroke", "#333");

      // Node text
      nodes
        .append("text")
        .attr("text-anchor", "middle")
        .attr("dy", 5)
        .text((d) => d.data.email)
        .style("fill", (d) => (d.data.placeholder ? "#10b981" : "#fff"))
        .style("font-size", "12px");
    },

    openAddUserModal(prefillData) {

      console.log("prefildata",prefillData);

      this.addUserData = prefillData || {};
      this.showAddUserModal = true;
    },

    getMaxDepth(node) {
      if (!node.children || node.children.length === 0) return 1;
      return 1 + Math.max(...node.children.map((c) => this.getMaxDepth(c)));
    },

    getNodeCount(node) {
      if (!node) return 0;
      let count = 1;
      if (node.children) {
        node.children.forEach((c) => (count += this.getNodeCount(c)));
      }
      return count;
    },
  },
};
</script>

<style scoped>
.tree-container {
  width: 100%;
  height: 800px;
  overflow: auto;
  border: 1px solid #ddd;
  background: #f9f9f9;
}
</style>
