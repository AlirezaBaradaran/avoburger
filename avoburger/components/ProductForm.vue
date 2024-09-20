<template>
  <div class="fixed top-0 px-10 right-0 w-1/3 h-full bg-white p-6 shadow-lg z-50">
    <!-- Close Button -->
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-xl font-bold">{{ isEdit ? 'Edit Product' : 'Add New Product' }}</h2>
      <button class="text-gray-500 text-2xl font-bold" @click="closeAndClear()">×</button>
    </div>

    <!-- Form Inputs -->
    <form @submit.prevent="submitForm" class="space-y-4">
      <!-- Product Name -->
      <div>
        <label for="name" class="block pb-2 text-sm font-medium text-gray-700">Name of the product</label>
        <input
          id="name"
          name="name"
          v-model="formData.name"
          type="text"
          class="block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
        />
        <p v-if="errors.name" class="text-red-500 text-xs mt-1">{{ errors.name }}</p>
      </div>

      <!-- Ingredients (Multi-select) -->
      <div>
        <label for="ingredients" class="block pb-2 text-sm font-medium text-gray-700">Ingredients</label>
        <multiselect
          v-model="formData.selectedIngredients"
          :options="allIngredients"
          :multiple="true"
          :close-on-select="false"
          placeholder="Select ingredients"
          label="name"
          track-by="name"
          class="border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
        />
      </div>

      <!-- Vegan Checkbox -->
      <div class="grid grid-cols-2 mb-4">
        <label class="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            name="isVegan"
            v-model="formData.isVegan"
            class="sr-only peer"
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
          />
          <p v-if="errors.weight" class="text-red-500 text-xs mt-1">{{ errors.weight }}</p>
        </div>
        <div>
          <label for="calories" class="block pb-2 text-sm font-medium text-gray-700">Calories</label>
          <input
            id="calories"
            name="calories"
            v-model="formData.calories"
            type="number"
            class="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
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
          />
        </div>
        <p v-if="errors.price" class="text-red-500 text-xs mt-1">{{ errors.price }}</p>
      </div>

      <!-- File Upload -->
      <div>
        <div class="flex items-center justify-between">
          <div>
            <label for="photo" class="block text-sm font-medium text-gray-700">Upload photo</label>
            <div class="text-gray-500 text-xs">JPG, max. 2MB</div>
          </div>
          <label class="flex items-center justify-center w-64 py-2 px-4 bg-gray-100 border border-gray-300 rounded-lg shadow-sm cursor-pointer hover:bg-gray-200 transition-all duration-200 ease-in-out">
            <i class="fas fa-upload mr-2 text-gray-500"></i> <span class="text-gray-700">Choose photo...</span>
            <input
              id="photo"
              name="photo"
              type="file"
              accept=".jpg,.jpeg"
              class="hidden"
              @change="handleFileChange"
            />
          </label>
        </div>
        <p v-if="errors.fileName" class="text-red-500 text-xs mt-1">{{ errors.fileName }}</p>

        <!-- Progress Bar -->
        <div v-if="progress > 0" class="mt-2">
          <div class="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div :style="{ width: progress + '%' }" class="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full transition-all duration-500 ease-out"></div>
          </div>
        </div>
        
      </div>

      <!-- Submit Button -->
      <div class="p-10 absolute bottom-0 left-0 right-0">
        <button
          type="submit"
          class="w-full flex items-center justify-center bg-black text-white py-3 px-6 rounded-md hover:bg-gray-800"
        >
          <i class="fas fa-plus mr-2"></i>
          {{ isEdit ? 'Save Changes' : 'Add product to the menu' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { watchEffect, ref } from 'vue';
import Multiselect from 'vue-multiselect';

// Props passed to detect edit mode and pre-fill form
const props = defineProps({
  product: Object, // Product to be edited (null if adding)
  isEdit: Boolean, // Detect if we're in edit mode
});

const emit = defineEmits(['submit', 'close']); // Emit events

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

const progress = useState('progress', () => 0);
const errors = useState('errors', () => ({}));

// Ingredients array
const allIngredients = useState('allIngredients', () => [
  { name: 'Wheat bun' },
  { name: 'Veggie Patty' },
  { name: 'Lettuce' },
  { name: 'Jalapeno Peppers' },
  { name: 'Tomato' },
  { name: 'Corn' },
  { name: 'Mayo sauce' },
]);

// Use watchEffect to watch for changes in the product prop (when editing)
watchEffect(() => {
  if (props.product && props.isEdit) {
    formData.value = { ...props.product }; // Populate form with product data for editing
  }
});

// Handle file input change
const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file && file.size <= 2 * 1024 * 1024) { // File size check (2MB)
    const reader = new FileReader();
    reader.readAsDataURL(file); // Convert file to Base64 string
    reader.onload = () => {
      formData.value.fileName = reader.result; // Store file as Base64 string
    };
    uploadFile(file);
  } else {
    alert("File size must be less than 2MB.");
    formData.value.fileName = '';
    progress.value = 0;
  }
};

// clear and close 
const closeAndClear = () => {
  resetForm();
  emit('close');
};

// Simulate file upload
const uploadFile = (file) => {
  progress.value = 0;
  const interval = setInterval(() => {
    progress.value += 10;
    if (progress.value >= 100) {
      clearInterval(interval);
    }
  }, 200); // Simulate progress every 200ms
};

// Form submission handler
const submitForm = () => {
  // Reset errors
  errors.value = {};

  // Validate form
  if (validateForm()) {
    emit('submit', formData.value); // Emit form data to parent
    resetForm();
  }
};

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
  progress.value = 0;
};

// Validate form
const validateForm = () => {
  let valid = true;
  
  if (!formData.value.name) {
    errors.value.name = 'Product name is required.';
    valid = false;
  }
  
  if (!formData.value.weight || formData.value.weight <= 0) {
    errors.value.weight = 'Weight must be greater than zero.';
    valid = false;
  }

  if (!formData.value.price || formData.value.price <= 0) {
    errors.value.price = 'Price must be greater than zero.';
    valid = false;
  }
  
  if (!formData.value.fileName) {
    errors.value.fileName = 'Product image is required.';
    valid = false;
  }

  return valid;
};
</script>

<style scoped>

</style>
