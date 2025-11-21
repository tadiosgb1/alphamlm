<template>
  <li>
    <div class="node-box" :class="{ placeholder: node.placeholder }">
      <template v-if="!node.placeholder">
        <strong>{{ node.email || 'User ' + node.id }}</strong>
        <div>ID: {{ node.id }}</div>
      </template>

      <template v-else>
        <button @click="$emit('add', node)" class="add-btn">+ Add</button>
      </template>
    </div>

    <!-- Children -->
    <ul v-if="node.children && node.children.length" class="children">
      <TreeNode
        v-for="child in node.children"
        :key="child._renderId"
        :node="child"
        @add="$emit('add', $event)"
      />
    </ul>
  </li>
</template>

<script>
export default {
  name: "TreeNode",
  props: {
    node: { type: Object, required: true }
  }
};
</script>

<style scoped>
li {
  list-style-type: none;
  text-align: center;
  position: relative;
  padding: 20px 5px 0 5px;
}

li::before,
li::after {
  content: "";
  position: absolute;
  top: 0;
  border-top: 2px solid #ccc;
  width: 50%;
  height: 20px;
}

li::before {
  right: 50%;
  border-right: 2px solid #ccc;
}

li::after {
  left: 50%;
  border-left: 2px solid #ccc;
}

li:only-child::after,
li:only-child::before {
  display: none;
}

li:first-child::before {
  border: none;
}

li:last-child::after {
  border: none;
}

.children {
  padding-top: 20px;
  display: flex;
  justify-content: center;
}

.node-box {
  padding: 10px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 10px;
  min-width: 180px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.15);
}

.placeholder {
  background: #f3f4f6;
  border-style: dashed;
}

.add-btn {
  background: #10b981;
  color: white;
  padding: 4px 10px;
  border-radius: 5px;
}
</style>
