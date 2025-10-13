<template>
  <div class="min-h-screen bg-gray-50 flex flex-col items-center py-10">
    <!-- Search bar -->
    <div class="flex space-x-2 mb-10">
      <input
        v-model="search"
        type="text"
        placeholder="Username"
        class="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        @click="searchUser"
        class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
      >
        Search
      </button>
    </div>

    <!-- Tree -->
    <div class="tree-container overflow-x-auto w-full flex justify-center">
      <ul class="tree">
        <TreeNode :node="treeData" />
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import TreeNode from "./TreeNode.vue";

const search = ref("");

const treeData = ref({
  name: "Enatx",
  children: [
    {
      name: "Agumas",
      children: [
        {
          name: "Etcarejr",
          children: [{ name: "Add Here" }, { name: "Add Here" }],
        },
        {
          name: "santa",
          children: [{ name: "Add Here" }, { name: "Add Here" }],
        },
      ],
    },
    {
      name: "sami123",
      children: [
        { name: "Add Here" },
        {
          name: "epha23",
          children: [{ name: "Add Here" }, { name: "Add Here" }],
        },
      ],
    },
  ],
});

const searchUser = () => {
  alert(`Searching for user: ${search.value}`);
};
</script>

<style scoped>
.tree {
  position: relative;
  padding-top: 20px;
  text-align: center;
}

.tree ul {
  position: relative;
  padding-top: 20px;
  display: flex;
  justify-content: center;
}

.tree li {
  list-style-type: none;
  position: relative;
  margin: 0 20px;
}

/* Connectors */
.tree li::before,
.tree li::after {
  content: "";
  position: absolute;
  top: 0;
  border-top: 2px solid #ccc;
  width: 50%;
  height: 20px;
}

.tree li::before {
  right: 50%;
  border-right: 2px solid #ccc;
}

.tree li::after {
  left: 50%;
  border-left: 2px solid #ccc;
}

.tree li:only-child::before,
.tree li:only-child::after {
  display: none;
}

.tree li:first-child::before,
.tree li:last-child::after {
  border: 0 none;
}

.tree li:last-child::before {
  border-right: 2px solid #ccc;
}

.tree li:first-child::after {
  border-left: 2px solid #ccc;
}
</style>
