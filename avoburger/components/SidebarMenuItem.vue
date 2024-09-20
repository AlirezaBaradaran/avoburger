<template>
  <NuxtLink :to="to" class="flex items-center py-4 px-12  hover:bg-gray-100"
    :class="{'bg-green-50 border-r-4 border-green-500 ': isActive}">
    <span class="mr-3">
      <slot name="icon"></slot>
    </span>
    <span class="flex-1 font-bold">{{ label }}</span>
    <span v-if="badge" class="bg-green-500 font-bold text-black text-xs rounded-full py-1 px-3">{{ badge }}</span>
  </NuxtLink>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

// Props
const props = defineProps({
  to: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  badge: {
    type: String,
    default: null
  }
});

// Accessing the route
const route = useRoute();

// Computed property for isActive
const isActive = computed(() => route.path === props.to);
</script>

<style scoped>
</style>
