<template>
  <div class="py-8">
    <Carousel :value="acProducts" :numVisible="3" :numScroll="1" circular :autoplayInterval="3000">
      <template #item="{ data }">
        <div 
          @click="goToDetails(data.id)" 
          class="cursor-pointer rounded-xl bg-white shadow p-4 flex flex-col items-center text-center space-y-2 transition-transform hover:scale-105 duration-300 hover:bg-gray-300"
        >
          <img :src="data.image_url" :alt="data.name" class="w-full h-48 object-contain bg-gray-100 rounded-lg" />
          <h3 class="text-lg font-semibold">{{ data.name }}</h3>
          <p class="text-blue-600 font-bold">${{ data.price.toFixed(2) }}</p>
        </div>
      </template>
    </Carousel>
  </div>
</template>

<script setup lang="ts">
const productStore = useProductsStore()

// Fetch all products on mount
onMounted(async () => {
  await productStore.fetchProducts()
})

// Computed property to filter only AC products
const acProducts = computed(() => {
  return productStore.products.filter(p => 
    p.category?.toLowerCase() === 'air condition'
  )
})

function goToDetails(id: number | string) {
  navigateTo(`/products/${id}`)
}
</script>
