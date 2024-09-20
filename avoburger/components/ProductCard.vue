<template>
  <div class="bg-white p-6 pt-12 rounded-2xl shadow-md hover:shadow-lg transition transform hover:scale-105 relative">
    <!-- Floating Product Image -->
    <div class="absolute -top-3 left-1/2 transform -translate-x-1/2">
      <img
        :src="product.fileName"
        :alt="product.name"
        class="w-32 h-32 rounded-full shadow-lg"
      />
      <!-- Conditionally Render the Green Leaf Icon for Vegan Products -->
      <span v-if="product.isVegan" class="absolute top-6 -right-12 p-1 bg-white rounded-full">
        <i class="fas fa-leaf text-green-500"></i>
      </span>
    </div>

    <!-- Product Info -->
    <div class="pt-16 mt-4 text-center"> <!-- Padding to compensate for floating image -->
      <h3 class="text-lg font-bold">{{ product.name }}</h3>
      <p class="text-gray-500 text-sm">{{ product.weight }}g</p>
      <p class="text-gray-600 text-sm mt-2">
        {{ formatIngredients(product.selectedIngredients) }}
      </p>

      <!-- Price and Action Buttons -->
      <div class="flex justify-between items-center mt-4">
        <!-- Price -->
        <span class="text-xl font-bold">${{ product.price }}</span>

        <!-- Action Buttons -->
        <div class="flex space-x-2">
          <!-- Eye Icon (View) -->
          <button @click="$emit('view', product)" class="bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300">
            <i class="fas fa-eye text-gray-600"></i>
          </button>

          <!-- Gear Icon (Settings) -->
          <button @click="$emit('edit', product)" class="bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300">
            <i class="fas fa-cog text-gray-600"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

// Define props using Composition API
const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});
const formatIngredients = (ingredients) => {
  if (Array.isArray(ingredients)) {
    return ingredients.map(ingredient => ingredient.name).join(', ');
  }
  return '';
};
</script>

<style scoped>
</style>
