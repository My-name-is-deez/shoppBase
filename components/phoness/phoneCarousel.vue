<template>
  <div class="card max-w-8xl mx-auto my-10 px-4">
    <Carousel
      v-if="phones.length"
      :value="phones"
      :numVisible="3"
      :numScroll="1"
      :autoplayInterval="2000"
      circular
      :responsiveOptions="responsiveOptions"
    >
      <template #item="{ data }">
        <div
          @click="goToDetails(data.id)"
          class="cursor-pointer bg-white shadow-md rounded-xl p-4 m-2 text-center transition-transform hover:scale-105 duration-300 hover:bg-gray-300"
        >
          <img
            :src="data.image_url"
            :alt="data.name"
            class="w-48 h-48 object-contain mx-auto mb-4"
          />
          <h3 class="text-lg font-semibold mb-2">{{ data.name }}</h3>
          <p class="text-blue-600 font-bold">${{ data.price.toFixed(2) }}</p>
        </div>
      </template>
    </Carousel>

    <div v-else class="text-center text-gray-500">
      Loading phones...
    </div>
  </div>
</template>


<script setup lang="ts">
const router = useRouter()

// Fetch products
const productsStore = useProductsStore()
onMounted(async () => {
  await productsStore.fetchProducts()
})

// Filter phones
const phones = computed(() =>
  productsStore.products.filter(p =>
    p.category.toLowerCase() === 'mobile' || p.category.toLowerCase() === 'mobiles'
  )
)

// Responsive behavior
const responsiveOptions = [
  {
    breakpoint: '1024px',
    numVisible: 2,
    numScroll: 1,
  },
  {
    breakpoint: '768px',
    numVisible: 1,
    numScroll: 1,
  }
]

// Navigate to product details
const goToDetails = (id: string) => {
  router.push(`/products/${id}`)
}
</script>
