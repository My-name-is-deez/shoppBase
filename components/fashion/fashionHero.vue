<template>
  <div
    class="relative h-96 md:h-[28rem] rounded-xl shadow-lg overflow-hidden mx-4 mt-7 bg-blue-100 flex items-center"
  >
    <!-- Text section -->
    <div class="p-8 max-w-xl text-left flex-1">
      <h2 class="text-4xl font-bold text-black mb-4">Discover the Latest Fashion</h2>
      <p class="text-lg text-gray-700 mb-6">
        Explore the newest trends, stylish outfits, and top brands all in one place.
      </p>
      <NuxtLink
        to="/categorys/fashion"
        class="inline-block bg-orange-800 hover:bg-orange-500 text-white font-semibold py-2 px-6 rounded transition"
      >
        Shop Fashion
      </NuxtLink>
    </div>

    <!-- Image section -->
    <div
      class="flex-1 h-full bg-cover bg-center rounded-r-xl"
      style="background-image: url('/fashion hero.png');"
    ></div>
  </div>
</template>
