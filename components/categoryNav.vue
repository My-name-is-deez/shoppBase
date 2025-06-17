<template>
  <nav class="w-full bg-white shadow-sm border-b">
    <div class="max-w-7xl mx-auto px-4">
      <ul class="flex gap-4 overflow-x-auto py-3 scrollbar-hide whitespace-nowrap items-center justify-between">
        <li
          v-for="(category, index) in categories"
          :key="index"
        >
          <NuxtLink
            :to="`/categorys/${category}`"
            class="text-sm font-medium text-gray-600 hover:text-blue-600 cursor-pointer transition-colors duration-200"
          >
            {{ category }}
          </NuxtLink>
        </li>
      </ul>
    </div>
  </nav>
</template>


<script setup lang="ts">
const categories = [
  "Gaming",
  "Electronics",
  "Air Condition",
  "Fashion",
  "Perfumes",
  "Mobiles",
  "Headphones",
  "Television",
  "Laptops",
  "Watches"
];
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
