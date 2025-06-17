<template>
  <div class="max-w-screen-xl mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-4">Products</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <PCard
        v-for="product in productStore.products"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const productStore= useProductsStore();
onMounted(async()=>{
  await  productStore.fetchProducts();
})
</script>