<template>
  <div class="max-w-4xl mx-auto py-10 px-4">
    <h1 class="text-3xl font-bold text-gray-800 mb-6">
      Brand: {{ company }}
    </h1>

    <div v-if="filteredProducts.length === 0" class="text-gray-600">
      No products found for this brand.
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <div
        v-for="product in filteredProducts"
        :key="product.id"
        class="border rounded-lg p-4 shadow hover:shadow-lg transition cursor-pointer"
        @click="goToDetails(product.id)"
      >
        <img
          :src="product.image_url"
          :alt="product.name"
          class="w-full h-56 object-cover rounded mb-4"
        />
        <h2 class="text-lg font-semibold">{{ product.name }}</h2>
        <p class="text-blue-600 font-bold">${{ product.price.toFixed(2) }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const company = route.params.name as string

const productStore = useProductsStore()

onMounted(async () => {
  await productStore.fetchProducts()
})

const filteredProducts = computed(() =>
  productStore.products.filter(
    (p) => p.company?.toLowerCase() === company.toLowerCase()
  )
)

function goToDetails(id: string | number) {
  navigateTo(`/products/${id}`)
}
</script>
