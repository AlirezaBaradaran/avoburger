<template>
  <div class="relative w-full max-w-lg">
    <!-- Search Icon -->
    <span class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <i class="fas fa-search text-gray-400"></i>
    </span>
    <!-- Search Input -->
    <input
      type="text"
      placeholder="Search"
      v-model="searchQuery"
      @input="emitSearch"
      class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm text-right"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';

// State for the search query
const searchQuery = ref('');

// Emit search input value to parent
const emit = defineEmits(['input']);
const emitSearch = () => {
  emit('input', searchQuery.value);
};
</script>

<style scoped>
</style>
