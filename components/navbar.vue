<template>
  <nav class="bg-gray-50 shadow-md px-4 py-7">
    <div class="max-w-screen-xl mx-auto flex items-center justify-between">
      <!-- Logo and Title -->
      <NuxtLink to="/" class="flex items-center gap-2">
        <img src="/shoplogo.png" alt="Logo" class="h-14 w-20 object-contain" />
        <span class="text-3xl font-bold text-gray-800">ShoppBase</span>
      </NuxtLink>

      <!-- Search bar -->
      <div class="hidden md:flex items-center flex-1 justify-center mx-8">
        <input
          type="text"
          placeholder="Search products..."
          class="w-[400px] px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <!-- Right Buttons -->
      <div class="flex items-center gap-4 relative">
        <!-- Login -->
        <NuxtLink
          v-if="!user"
          to="/login"
          class="text-sm px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Login
        </NuxtLink>

        <!-- Orders -->
        <NuxtLink
          v-if="user"
          to="/orders"
          class="text-sm px-4 py-2 bg-orange-400 text-white rounded hover:bg-orange-600"
        >
          Orders
        </NuxtLink>

        <!-- Cart -->
        <NuxtLink
          to="/cart"
          class="relative text-sm px-4 py-2 bg-gray-100 rounded hover:bg-gray-200 flex items-center gap-2"
        >
          🛒
          <span>Cart</span>
          <span
            class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
          >
            2
          </span>
        </NuxtLink>

        <!-- Avatar Dropdown -->
        <div v-if="user" class="relative">
          <img
            @click="toggleDropdown"
            :src="user.user_metadata?.avatar_url"
            alt="User Avatar"
            class="h-10 w-10 rounded-full object-cover cursor-pointer"
          />

          <div
            v-if="showDropdown"
            class="absolute right-0 mt-2 w-32 bg-white border rounded shadow-md z-10"
          >
            <button
              @click="logout"
              class="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>

  <!-- Categories Section -->
  <categores />
</template>

<script setup lang="ts">
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const showDropdown = ref(false)

function toggleDropdown() {
  showDropdown.value = !showDropdown.value
}

async function logout() {
  const { error } = await supabase.auth.signOut()
  if (!error) {
    navigateTo('/')
  } else {
    console.log('Logout failed:', error.message)
  }
}
</script>
