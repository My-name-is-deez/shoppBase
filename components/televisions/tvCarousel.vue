<template>
  <div class="py-10 px-4 bg-gray-100">
    <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">Top TVs for You</h2>

    <Carousel
      :value="tvProducts"
      :numVisible="numVisible"
      :numScroll="1"
      circular
      :autoplayInterval="5000"
      class="custom-carousel"
    >
      <template #item="{ data }">
        <Card
          class="mx-2 cursor-pointer transition-transform hover:scale-105 duration-300 hover:bg-gray-300"
          @click="goToDetails(data.id)"
        >
          <template #header>
            <div class="flex justify-center">
              <img :src="data.image_url" alt="TV image" class="w-60 h-40 object-cover" />
            </div>
          </template>
          <template #title>
            <div class="text-lg font-semibold text-center">{{ data.name }}</div>
          </template>
          <template #content>
            <p class="text-blue-600 font-bold text-center">${{ data.price.toFixed(2) }}</p>
          </template>
        </Card>
      </template>
    </Carousel>
  </div>
</template>

<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'
const { width } = useWindowSize()

const productStore = useProductsStore()

// Load products
onMounted(async () => {
  await productStore.fetchProducts()
})

// Responsive number of visible items
const numVisible = computed(() => {
  if (width.value < 640) return 1
  if (width.value < 1024) return 2
  return 3
})

// Filter only TVs
const tvProducts = computed(() =>
  productStore.products.filter(p => p.category?.toLowerCase() === 'television')
)

function goToDetails(id: string | number) {
  navigateTo(`/products/${id}`)
}
</script>
