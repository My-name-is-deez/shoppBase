<template>
  <div class="py-8">
    <Carousel
      :value="fashionProducts"
      :numVisible="5"
      :numScroll="1"
      circular
      :autoplayInterval="2000"
      :responsiveOptions="responsiveOptions"
    >
      <template #item="{ data }">
        <div
          @click="goToDetails(data.id)"
          class="cursor-pointer rounded-xl bg-white shadow p-4 flex flex-col items-center text-center space-y-2 transition-transform hover:scale-105 duration-300 hover:bg-gray-300"
        >
          <img
            :src="data.image_url || '/fallback-image.jpg'"
            :alt="data.name"
            class="w-full h-48 object-contain bg-gray-100 rounded-lg"
          />
          <h3 class="text-lg font-semibold">{{ data.name }}</h3>
          <p class="text-blue-500 font-bold">${{ data.price.toFixed(2) }}</p>
        </div>
      </template>
    </Carousel>
  </div>
</template>

<script setup lang="ts">
const productStore = useProductsStore()

onMounted(async () => {
  await productStore.fetchProducts()
})

const fashionProducts = computed(() =>
  productStore.products.filter(p =>
    p.category?.toLowerCase() === 'fashion'
  )
)

function goToDetails(id: number | string) {
  navigateTo(`/products/${id}`)
}

// Responsive settings: 5 items on large screens, fewer on small
const responsiveOptions = [
  {
    breakpoint: '1200px',
    numVisible: 4,
    numScroll: 1
  },
  {
    breakpoint: '992px',
    numVisible: 3,
    numScroll: 1
  },
  {
    breakpoint: '768px',
    numVisible: 2,
    numScroll: 1
  },
  {
    breakpoint: '560px',
    numVisible: 1,
    numScroll: 1
  }
]
</script>
