<template>
  <div class="max-w-6xl mx-auto px-4 py-6">
    <!-- Back Button -->
    <button 
      @click="navigateTo('/')"
      class="mb-6 inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition"
    >
      <span class="mr-1 text-xl">←</span> Back to Products
    </button>

    <!-- Product Card -->
    <div class="bg-white rounded-2xl shadow-md overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Product Image -->
      <div class="p-6 bg-gray-50 flex items-center justify-center">
        <img 
          :src="product.image_url" 
          :alt="product.name"
          class="w-full max-w-md h-auto object-contain rounded-lg shadow"
        />
      </div>

      <!-- Product Info -->
      <div class="p-6 flex flex-col justify-between">
        <div>
          <h1 class="text-3xl font-bold mb-2 text-gray-900">{{ product.name }}</h1>
          <p class="text-2xl text-blue-600 font-semibold mb-4">${{ product.price.toFixed(2) }}</p>

          <div class="mb-6">
            <h3 class="text-lg font-semibold text-gray-800 mb-1">Description</h3>
            <p class="text-gray-700 leading-relaxed">{{ product.description }}</p>
          </div>
        </div>

        <button 
          @click="handleAddToCart"
          class="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-xl transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import type { Product } from '~/types/product'
import { useToast } from 'vue-toastification'

const toast=useToast()
const route = useRoute()
const product = ref<Product>({
  id: '',
  name: '',
  description: '',
  price: 0,
  image_url: '',
  category: '',
  company:''
})
const productStore = useProductsStore()
onMounted(async ()=>{
    await productStore.fetchProducts();
    const productId = route.params.id as string;
    const foundProduct = productStore.products.find(p => p.id === productId);
    if (foundProduct) {
      product.value = foundProduct;
    } else {
      console.error('Product not found');
    }
})


const handleAddToCart = async () => {
  await productStore.addToCart(product.value.id)
  toast.success('item added to cart!')
}

</script>