<template>
  <div class="max-w-8xl mx-auto px-4">
    <div
      class="relative h-80 md:h-96 rounded-xl overflow-hidden bg-center bg-cover flex items-center"
      style="background-image: url('https://www.ineedamobile.com/wp-content/uploads/2018/04/Refurbished-Mobile-Phones.png')"
    >
      <!-- Overlay -->
      <div class="absolute inset-0 bg-black/40"></div>

      <!-- Text & Button Wrapper -->
      <div class="relative z-10 max-w-md text-white ml-8">
        <h2 class="text-3xl font-bold mb-4">
          Discover the Latest Mobile Phones
        </h2>
        <p class="mb-6">
          Explore a wide range of refurbished and new smartphones to keep you connected with the world.
        </p>
        <button
          @click="navigateTo('/categorys/mobiles')"
          class="bg-blue-600 px-6 py-3 text-lg font-semibold rounded-full hover:bg-blue-700 transition duration-300"
        >
          Check Phones
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const navigateTo = useRouter().push
</script>
