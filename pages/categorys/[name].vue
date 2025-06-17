<template>
  <div class="max-w-6xl mx-auto py-10 px-4">
    <h1 class="text-3xl font-bold text-gray-800 mb-8">
      Category: {{ categoryName }}
    </h1>

    <div v-if="products.length === 0" class="text-gray-600">
      No products found in this category.
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <pCard
      v-for="product in products"
      :key="product.id"
      :product="product"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const categoryName = (route.params.name as string).toLowerCase()

const productsStore =  useProductsStore()
 productsStore.fetchProductsByCategory(categoryName)

const products = computed(() => productsStore.products)



</script>
