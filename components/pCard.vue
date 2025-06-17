<template>
  <div class="bg-white shadow-md rounded-xl overflow-hidden transition hover:scale-[1.02]">
    <NuxtLink :to="`/products/${product.id}`" class="block">
      <img :src="product.image_url" :alt="product.name" class="w-full h-48 object-contain bg-gray-100 p-4" />

      <div class="p-4">
        <h2 class="text-lg font-semibold mb-1 truncate">{{ product.name }}</h2>
        <p class="text-sm text-gray-500 mb-2 line-clamp-2">{{ product.description }}</p>
        <div class="flex items-center justify-between mt-4">
          <span class="text-blue-600 font-bold text-lg">${{ product.price.toFixed(2) }}</span>
        </div>
      </div>
    </NuxtLink>

    <div class="px-4 pb-4">
      <button
        @click="handleAddToCart"
        class="w-full bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 text-sm mt-2">
        Add to Cart
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '../types/product'
import { useToast } from 'vue-toastification'
const props = defineProps<{ product: Product }>()
const toast= useToast()

const productStore = useProductsStore()
const handleAddToCart = async () => {
  await productStore.addToCart(props.product.id)
  toast.success('item added to cart!')
}

</script>
