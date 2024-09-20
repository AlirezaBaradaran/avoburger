<template>
  <div class="flex h-screen bg-gray-50">
    <!-- Sidebar -->
    <aside class="w-1/5 bg-white shadow-md pt-6 flex flex-col justify-between">
      
      <!-- Top Section: Logo and Menu -->
      <div>
        <!-- Logo -->
        <div class="flex justify-center items-center space-x-2 mb-14">
          <div class="bg-green-500 rounded-full w-6 h-6"></div>
          <span class="text-xl font-bold">avoburger</span>
        </div>

        <!-- Menu Items -->
        <nav>
          <SidebarMenuItem to="/" label="Dashboard">
            <template #icon>
              <i class="fas fa-home"></i> <!-- Font Awesome icon for Home -->
            </template>
          </SidebarMenuItem>

          <SidebarMenuItem to="/orders" label="Orders" badge="12">
            <template #icon>
              <i class="fas fa-list"></i> <!-- Font Awesome icon for List -->
            </template>
          </SidebarMenuItem>

          <SidebarMenuItem to="/products" label="Products">
            <template #icon>
              <i class="fas fa-box"></i> <!-- Font Awesome icon for Products (Box) -->
            </template>
          </SidebarMenuItem>

          <SidebarMenuItem to="/restaurants" label="Restaurants">
            <template #icon>
              <i class="fas fa-store"></i> <!-- Font Awesome icon for Store -->
            </template>
          </SidebarMenuItem>

          <SidebarMenuItem to="/drivers" label="Drivers">
            <template #icon>
              <i class="fas fa-car"></i> <!-- Font Awesome icon for Car/Drivers -->
            </template>
          </SidebarMenuItem>
        </nav>
      </div>
      
      <!-- Bottom Section -->
      <div class="space-y-6">
        <!-- Daily Report Button -->
        <div class="text-center">
          <p class="text-sm text-gray-400 mb-2">Done for the day?</p>
          <button class="w-48 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
            <i class="fas fa-paper-plane pr-2"></i>
            Send daily report
          </button>
        </div>

        <!-- User Profile -->
        <hr />
        <div class="flex items-center space-x-3 px-6 pb-3 rounded-md">
          <img class="w-10 h-10 rounded-full" src="https://via.placeholder.com/40" alt="User Avatar">
          <div class="flex-1">
            <p class="text-sm font-medium">Annalisa Wallis</p>
          </div>
          <button class="text-gray-500 text-2xl font-bold">⋮</button>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="w-full pb-8 bg-neutral-100 overflow-y-auto">
      <NuxtPage />
    </main>
  </div>
</template>
