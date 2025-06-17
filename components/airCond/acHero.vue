<template>
  <div
    class="relative h-96 md:h-[28rem] bg-cover bg-center rounded-xl shadow-lg overflow-hidden mx-4"
    style="background-image: url('https://learn.sensibo.com/hubfs/image_2023-11-20_10-40-17%20%281%29.png');"
  >
 <!-- https://static.vecteezy.com/system/resources/thumbnails/049/372/114/small_2x/a-white-air-conditioner-is-mounted-on-the-wall-in-a-room-with-a-red-and-blue-wall-the-room-has-a-bright-and-sunny-atmosphere-with-a-potted-plant-in-the-corner-photo.jpg -->
    <!-- Overlay -->
    <div class="absolute inset-0 bg-black/10"></div>

    <!-- Text & Button -->
    <div class="relative z-10 h-full flex items-center px-6 md:px-12 max-w-xl text-white">
      <div>
        <h2 class="text-3xl md:text-4xl font-bold mb-4">Stay Cool with Our Air Conditioners</h2>
        <p class="mb-6 text-sm md:text-base">
          Browse our range of energy-efficient and powerful air conditioners—perfect for every room and budget.
        </p>
        <button
          @click="navigateTo('/categorys/air condition')"
          class="bg-white text-blue-700 font-semibold px-6 py-3 rounded-full hover:bg-blue-700 hover:text-white transition"
        >
          Check Out ACs
        </button>
      </div>
    </div>
  </div>
 
</template>

<script setup lang="ts">
const navigateTo = useRouter().push
</script>
