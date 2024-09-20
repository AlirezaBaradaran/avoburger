<template>
  <div class="bg-white rounded-2xl shadow-md px-8 flex justify-between items-center">
    <!-- Main courses Tab -->
    <button
      @click="setActive('main-courses')"
      :class="activeTab === 'main-courses' ? 'border-b-2 border-black text-black' : 'text-gray-500'"
      class="flex flex-col items-center py-2"
    >
      <span class="py-2">Main courses</span>
    </button>

    <!-- Side dishes Tab -->
    <button
      @click="setActive('side-dishes')"
      :class="activeTab === 'side-dishes' ? 'border-b-2 border-black text-black' : 'text-gray-500'"
      class="flex flex-col items-center py-2"
    >
      <span class="py-2">Side dishes</span>
    </button>

    <!-- Drinks Tab -->
    <button
      @click="setActive('drinks')"
      :class="activeTab === 'drinks' ? 'border-b-2 border-black text-black' : 'text-gray-500'"
      class="flex flex-col items-center py-2"
    >
      <span class="py-2">Drinks</span>
    </button>

    <!-- Other Tab -->
    <button
      @click="setActive('other')"
      :class="activeTab === 'other' ? 'border-b-2 border-black text-black' : 'text-gray-500'"
      class="flex flex-col items-center py-2"
    >
      <span class="py-2">Other</span>
    </button>

    <!-- More Options -->
    <button class="text-gray-500 text-2xl font-bold">
      ⋮
    </button>
  </div>
</template>

<script setup>
// Use useState to manage activeTab across the app
const activeTab = useState('activeTab', () => 'main-courses');

// Method to set the active tab and emit event
const emit = defineEmits(['tab-selected']);

const setActive = (tab) => {
  activeTab.value = tab;
  emit('tab-selected', tab); // Emit the selected tab event to parent component
};
</script>

<style scoped>
</style>
