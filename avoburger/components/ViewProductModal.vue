<template>
    <div class="fixed top-0 px-10 right-0 w-1/3 h-full bg-white p-6 shadow-lg z-50">
      <!-- Close Button -->
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-bold">View Product</h2>
        <button class="text-gray-500 text-2xl font-bold" @click="closeAndClear()">×</button>
      </div>
  
      <!-- Form Inputs (disabled in view mode) -->
      <form class="space-y-4">
        <!-- Product Name -->
        <div>
          <label for="name" class="block pb-2 text-sm font-medium text-gray-700">Name of the product</label>
          <input
            id="name"
            name="name"
            v-model="formData.name"
            type="text"
            class="block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
            disabled
          />
        </div>
  
        <!-- Ingredients (Multi-select) -->
        <div>
          <label for="ingredients" class="block pb-2 text-sm font-medium text-gray-700">Ingredients</label>
          <multiselect
            v-model="formData.selectedIngredients"
            :options="allIngredients"
            :multiple="true"
            placeholder="Select ingredients"
            label="name"
            track-by="name"
            class="border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
            disabled
          />
        </div>
  
        <!-- Vegan Checkbox -->
        <div class="grid grid-cols-2 mb-4">
          <label class="inline-flex items-center cursor-default">
            <input
              type="checkbox"
              name="isVegan"
              v-model="formData.isVegan"
              class="sr-only peer"
              disabled
            />
            <div class="w-7 h-7 border-2 border-gray-300 rounded-lg peer-checked:bg-green-500 peer-checked:border-green-500 flex items-center justify-center transition">
              <i v-if="formData.isVegan" class="fas fa-check text-white"></i>
            </div>
            <span class="ml-3 text-sm text-gray-900 flex items-center">
              <i class="fas fa-leaf text-green-500 mr-1"></i> Suitable for vegans
            </span>
          </label>
        </div>
  
        <!-- Weight and Calories -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label for="weight" class="block pb-2 text-sm font-medium text-gray-700">Weight in grams</label>
            <input
              id="weight"
              name="weight"
              v-model="formData.weight"
              type="number"
              class="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
              disabled
            />
          </div>
          <div>
            <label for="calories" class="block pb-2 text-sm font-medium text-gray-700">Calories</label>
            <input
              id="calories"
              name="calories"
              v-model="formData.calories"
              type="number"
              class="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
              disabled
            />
          </div>
        </div>
  
        <!-- Price -->
        <div class="relative">
          <label for="price" class="block text-sm font-medium text-gray-700">Price of the product</label>
          <div class="mt-1 flex">
            <span class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 text-gray-500 text-sm">
              <i class="fas fa-dollar-sign"></i>
            </span>
            <input
              id="price"
              name="price"
              v-model="formData.price"
              type="number"
              step="0.01"
              class="block w-full p-2 border border-l-0 border-gray-300 rounded-r-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
              disabled
            />
          </div>
        </div>
  
        <!-- File Upload -->
        <div>
          <!-- Image Preview -->
          <div v-if="formData.fileName" class="mt-2">
            <img :src="formData.fileName" alt="Product Image" class="w-full h-20 w-20 object-cover rounded-md">
          </div>
        </div>
  
        <!-- Close Button Only (no submit button) -->
        <div class="p-10 absolute bottom-0 left-0 right-0">
          <button
            type="button"
            class="w-full flex items-center justify-center bg-black text-white py-3 px-6 rounded-md hover:bg-gray-800"
            @click="$emit('close')"
          >
            Close
          </button>
        </div>
      </form>
    </div>
  </template>
  
  <script setup>
  import { watchEffect } from 'vue';
  import Multiselect from 'vue-multiselect';
  
  // Props passed to detect view mode
  const props = defineProps({
    product: Object, // Product to be viewed
  });
  
  const emit = defineEmits(['close']); // Only emit close event
  
  // Using useState to manage state across the app
  const formData = useState('formData', () => ({
    name: '',
    selectedIngredients: [],
    isVegan: false,
    weight: '',
    calories: '',
    price: '',
    fileName: null,
  }));
  
  // Ingredients array
  const allIngredients = useState('allIngredients', () => [
    { name: 'Wheat bun' },
    { name: 'Veggie Patty' },
    { name: 'Lettuce' },
    { name: 'Jalapeno Peppers' },
  ]);
  
  const closeAndClear = () => {
  resetForm();
  emit('close');
}

// Reset form
const resetForm = () => {
  formData.value = {
    name: '',
    selectedIngredients: [],
    isVegan: false,
    weight: '',
    calories: '',
    price: '',
    fileName: null,
  };
};

  // Use watchEffect to populate formData with product data for viewing
  watchEffect(() => {
    if (props.product) {
      formData.value = { ...props.product }; // Populate form with product data for viewing
    }
  });
  </script>
  
  <style scoped>
  </style>
  