<template>
  <div class="px-10 pt-3 min-h-screen">
    <!-- Top Bar with Search -->
    <div class="flex justify-start mb-8 w-full">
      <SearchBar @input="handleSearch" />
    </div>

    <div class="mb-8">
      <TabBar @tab-selected="handleTabSelected" />
    </div>

    <!-- Product Grid -->
    <div class="grid grid-cols-4 gap-6">
      <!-- Individual Product Cards -->
      <ProductCard
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
        @view="openViewProductModal(product)"
        @edit="openEditProductModal(product)"
      />

      <!-- Add New Product Card -->
      <div
        class="flex items-center justify-center bg-white border border-2 border-gray-300 rounded-2xl text-gray-400 cursor-pointer min-h-[300px]"
        @click="openAddProductModal"
      >
      <span class="flex flex-col items-center font-bold text-black text-xl ">
  <span class="inline-block">+</span>
  <span class="inline-block ">Add new</span>
  <span class="inline-block">product</span>
</span>
      </div>
    </div>

    <!-- Add/Edit Product Modal -->
    <transition name="fade">
      <div v-if="showProductModal" class="fixed inset-0 z-50 bg-gray-900 bg-opacity-50 flex items-center justify-center">
        <ProductForm
          :product="selectedProduct"
          :is-edit="isEditMode"
          @close="closeProductModal"
          @submit="handleProductSubmit"
        />
      </div>
    </transition>

    <!-- View Product Modal -->
    <transition name="fade">
      <div v-if="showViewProductModal" class="fixed inset-0 z-50 bg-gray-900 bg-opacity-50 flex items-center justify-center">
        <ViewProductModal :product="selectedProduct" @close="closeViewProductModal" />
      </div>
    </transition>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import mockData from '@/assets/mockdata.json'; // Directly import the JSON file

// Initialize states using useState for persistent data
const products = useState('products', () => []); // Global state for products
const searchQuery = useState('searchQuery', () => ''); // Global search query state
const selectedTab = useState('selectedTab', () => 'main-courses'); // Tab state
const showProductModal = useState('showProductModal', () => false); // Modal visibility state
const showViewProductModal = useState('showViewProductModal', () => false); // View modal visibility
const selectedProduct = useState('selectedProduct', () => null); // Selected product state for viewing/editing
const isEditMode = useState('isEditMode', () => false); // To track if we are editing a product or adding a new one

// Use mock data directly
onMounted(() => {
  products.value = mockData;
});

// Computed property for filtered products based on search query and selected tab
const filteredProducts = computed(() => {
  return products.value.filter(product => {
    const searchLower = searchQuery.value.toLowerCase();
    const matchesTab = product.category === selectedTab.value; // Match the category

    // Check if the product name or ingredients contain the search query
    const matchesName = product.name.toLowerCase().includes(searchLower);
    const matchesIngredients = product.selectedIngredients.some(ingredient =>
      ingredient.name.toLowerCase().includes(searchLower)
    );

    return (matchesName || matchesIngredients) && matchesTab;
  });
});

// Handle search input
const handleSearch = (query) => {
  searchQuery.value = query;
};

// Handle tab selection
const handleTabSelected = (tab) => {
  selectedTab.value = tab;
};

// Open modal to add new product
const openAddProductModal = () => {
  selectedProduct.value = null;
  isEditMode.value = false;
  showProductModal.value = true;
};

// Open modal to edit product
const openEditProductModal = (product) => {
  selectedProduct.value = { ...product }; // Create a copy of the product
  isEditMode.value = true;
  showProductModal.value = true;
};

// Open modal to view product details
const openViewProductModal = (product) => {
  selectedProduct.value = { ...product }; // Create a copy of the product
  showViewProductModal.value = true;
};

// Close product modal
const closeProductModal = () => {
  showProductModal.value = false;
  selectedProduct.value = null;
};

// Close view product modal
const closeViewProductModal = () => {
  showViewProductModal.value = false;
  selectedProduct.value = null;
};

// Handle form submit (Add/Edit)
const handleProductSubmit = (submittedProduct) => {
  if (isEditMode.value) {
    // Edit product logic
    const index = products.value.findIndex((p) => p.id === submittedProduct.id);
    if (index !== -1) {
      products.value[index] = { ...submittedProduct };
    }
  } else {
    // Add new product logic
    submittedProduct.id = products.value.length + 1;
    submittedProduct.category = selectedTab.value 
    products.value.push({ ...submittedProduct });
    
  }
  closeProductModal();
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to  {
  opacity: 0;
}
</style>
