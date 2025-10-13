<template>
  <li>
    <div class="flex flex-col items-center relative">
      <div
        class="flex flex-col items-center justify-center text-center rounded-full border-4 border-purple-600 w-16 h-16 bg-white shadow-md relative"
      >
        <img
          v-if="!node.name.includes('Add')"
          src="https://cdn-icons-png.flaticon.com/512/219/219983.png"
          class="w-10 h-10"
        />
        <span v-else class="text-2xl text-orange-500 font-bold">+</span>
      </div>
      <p
        class="mt-1 px-2 py-1 rounded-md bg-purple-700 text-white text-xs font-medium"
      >
        {{ node.name }}
      </p>
    </div>

    <ul v-if="node.children && node.children.length" class="flex justify-center mt-6 space-x-10">
      <TreeNode
        v-for="(child, index) in node.children"
        :key="index"
        :node="child"
      />
    </ul>
  </li>
</template>

<script setup>
import TreeNode from "./TreeNode.vue"; // ✅ important for recursion
defineProps({ node: Object });
</script>
