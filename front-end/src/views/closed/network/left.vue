<template>
  <div class="tree-container">
    <svg ref="svgRef"></svg>
  </div>
</template>

<script>
import * as d3 from "d3";

export default {
  mounted() {
    const sampleTree = {
      id: 1,
      email: "Parent User",
      children: [
        {
          id: 2,
          email: "Child One",
          children: [
            { id: 5, email: "Grandchild 1-1", children: [
              { id: 6, email: "Grandchild 2-1", children: [] },
              { id: 7, email: "Grandchild 2-2", children: [] }
            ] }
          ]
        },
        {
          id: 3,
          email: "Child Two",
          children: [
            { id: 6, email: "Grandchild 2-1", children: [] },
            { id: 7, email: "Grandchild 2-2", children: [] }
          ]
        },
        {
          id: 4,
          email: "Child Three",
          children: []
        }
      ]
    };

    const normalized = this.normalizeTree(sampleTree);
    this.renderTree(normalized);
  },

  methods: {
    normalizeTree(node) {
      if (!node) return null;
      const copy = {
        id: node.id,
        email: node.email ?? `User ${node.id}`,
        placeholder: false,
        children: Array.isArray(node.children)
          ? node.children.map(c => this.normalizeTree(c))
          : []
      };

      while (copy.children.length < 3) {
        copy.children.push({
          id: null,
          email: "+ Add",
          placeholder: true,
          children: []
        });
      }
      return copy;
    },

    renderTree(treeData) {
      const svg = d3.select(this.$refs.svgRef);
      svg.selectAll("*").remove();

      // Compute required width and height dynamically
      const depth = this.getMaxDepth(treeData);
      const nodeCount = this.getNodeCount(treeData);

      const svgWidth = Math.max(1600, depth * 220); // horizontal expansion
      const svgHeight = Math.max(800, nodeCount * 50); // vertical expansion

      svg.attr("width", svgWidth)
         .attr("height", svgHeight);

      const g = svg.append("g").attr("transform", "translate(50,50)");

      const root = d3.hierarchy(treeData, d => d.children);

      const treeLayout = d3.tree()
        .size([svgHeight - 100, svgWidth - 100]) // natural width & height
        .separation((a, b) => a.parent === b.parent ? 2 : 3);

      treeLayout(root);

      // Links
      g.selectAll(".link")
        .data(root.links())
        .enter()
        .append("path")
        .attr("fill", "none")
        .attr("stroke", "#ccc")
        .attr("stroke-width", 2)
        .attr("d", d3.linkHorizontal().x(d => d.y).y(d => d.x));

      // Nodes
      const node = g.selectAll(".node")
        .data(root.descendants())
        .enter()
        .append("g")
        .attr("transform", d => `translate(${d.y},${d.x})`)
        .on("click", (event, d) => {
          if (d.data.placeholder) {
            alert("Add user here!");
            return;
          }
          if (d.children) { d._children = d.children; d.children = null; }
          else { d.children = d._children; d._children = null; }
          this.renderTree(treeData);
        });

      // Rectangles
      node.append("rect")
        .attr("x", d => -((d.data.email.length * 7 + 20) / 2))
        .attr("y", -18)
        .attr("width", d => d.data.email.length * 7 + 20)
        .attr("height", 36)
        .attr("rx", 12)
        .attr("ry", 12)
        .attr("fill", d => d.data.placeholder ? "#f3f4f6" : "#69b3a2")
        .attr("stroke", "#333");

      // Text
      node.append("text")
        .attr("text-anchor", "middle")
        .attr("dy", 5)
        .text(d => d.data.email)
        .style("fill", d => d.data.placeholder ? "#10b981" : "#fff")
        .style("font-size", "12px");
    },

    getMaxDepth(node) {
      if (!node.children || node.children.length === 0) return 1;
      return 1 + Math.max(...node.children.map(c => this.getMaxDepth(c)));
    },

    getNodeCount(node) {
      if (!node) return 0;
      let count = 1;
      if (node.children) {
        node.children.forEach(c => count += this.getNodeCount(c));
      }
      return count;
    }
  }
};
</script>

<style scoped>
.tree-container {
  width: 100%;
  height: 800px;
  overflow: auto; /* scrollbars appear when tree is large */
  border: 1px solid #ddd;
  background: #f9f9f9;
}
</style>
