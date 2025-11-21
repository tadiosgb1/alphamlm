<template>
  <div class="page bg-white m-3 shadow-xl">
    <!-- Search -->
    <div class="search-bar">
      <input v-model="search" class="border border-gray-300 rounded-lg px-4 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm transition duration-150" placeholder="Search Email or ID" />
      <button @click="searchUser">Search</button>
    </div>

    <div class="tree-wrapper" v-if="!loading">
      <svg ref="svgRef" :width="width" :height="height"></svg>
    </div>

    <div v-if="loading" class="loading">Loading tree…</div>
  </div>
</template>

<script>
import * as d3 from "d3";

export default {
  data() {
    return {
      tree: null,
      loading: true,
      search: "",
      _idCounter: 0,
      width: 800,
      height: 600,
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
      this.renderTree();
    },

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
      this.loading = true;
      this.fetchTree();
    },

    renderTree() {
      if (!this.tree) return;

      const svg = d3.select(this.$refs.svgRef);
      svg.selectAll("*").remove(); // clear previous tree

      const root = d3.hierarchy(this.tree, d => d.children);
      root.x0 = this.height / 2;
      root.y0 = 0;

      const treeLayout = d3.tree().size([this.height, this.width - 160]);
      treeLayout(root);

      const g = svg.append("g").attr("transform", "translate(80,0)");

      // Links
      const link = g.selectAll(".link")
        .data(root.links())
        .enter()
        .append("path")
        .attr("class", "link")
        .attr("fill", "none")
        .attr("stroke", "#ccc")
        .attr("stroke-width", 2)
        .attr("d", d3.linkHorizontal()
          .x(d => d.y)
          .y(d => d.x));

      // Nodes
      const node = g.selectAll(".node")
        .data(root.descendants())
        .enter()
        .append("g")
        .attr("class", "node")
        .attr("transform", d => `translate(${d.y},${d.x})`)
        .style("cursor", "pointer")
        .on("click", (event, d) => this.toggleNode(d));

      node.append("circle")
        .attr("r", 20)
        .attr("fill", d => d.data.placeholder ? "#f3f4f6" : "#69b3a2")
        .attr("stroke", "#333");

      node.append("text")
        .attr("dy", 4)
        .attr("x", 0)
        .attr("text-anchor", "middle")
        .text(d => d.data.placeholder ? "+ Add" : d.data.email || `User ${d.data.id}`)
        .style("font-size", "12px")
        .style("fill", d => d.data.placeholder ? "#10b981" : "#000")
        .on("click", (event, d) => {
          if (d.data.placeholder) alert("Add new user under this node");
          event.stopPropagation(); // prevent node toggle
        });
    },

    toggleNode(d) {
      if (d.children) {
        d._children = d.children;
        d.children = null;
      } else {
        d.children = d._children;
        d._children = null;
      }
      this.renderTree();
    }
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
  overflow: auto;
  padding: 30px;
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

.link {
  fill: none;
  stroke: #555;
  stroke-width: 2px;
}
</style>
