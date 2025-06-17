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

      <!-- Action buttons -->
      <div class="flex items-center gap-4">
        <NuxtLink  v-if="!user" to="/login" class="text-sm px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
         Login
        </NuxtLink>
       <button v-if="user"
        @click="logout"
        class="text-sm px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
         Logout
        </button>

        <NuxtLink to="/cart" class="relative text-sm px-4 py-2 bg-gray-100 rounded hover:bg-gray-200 flex items-center gap-2">
          🛒
          <span>Cart</span>
          <span class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">2</span>
        </NuxtLink>
      </div>
      <img 
      class=" h-10 w-10 rounded-full object-cover ml-10 cursor-pointer"
      v-if="user" :src="user?.user_metadata?.avatar_url" alt="">
    </div>
  </nav>
  <categores/>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient()
const user = useSupabaseUser()

async function logout() {
  const { error } = await supabase.auth.signOut()
  if (!error) {
    navigateTo('/')
  } else {
    console.log('Logout failed:', error.message)
  }
}
</script>
