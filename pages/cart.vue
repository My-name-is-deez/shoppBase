<template>
  <ClientOnly>
    <div class="max-w-4xl mx-auto p-4">
      <h1 class="text-3xl font-bold mb-6">Your Cart</h1>

      <div v-if="loading" class="text-center py-10">Loading cart...</div>
      <div v-else-if="error" class="text-red-600 mb-4">{{ error }}</div>
      <div v-else-if="cartItems.length === 0" class="text-gray-600">Your cart is empty.</div>

      <div v-else>
        <ul class="space-y-4 mb-8">
          <li
            v-for="item in cartItems"
            :key="item.id"
            class="flex items-center gap-4 border p-4 rounded shadow"
          >
            <img
              :src="item.product?.image_url"
              :alt="item.product?.name"
              class="w-24 h-24 object-contain rounded"
            />
            <div class="flex-1">
              <h2 class="text-xl font-semibold">{{ item.product?.name }}</h2>
              <p class="text-gray-700">
                ${{ item.product?.price ? item.product.price.toFixed(2) : '0.00' }}
              </p>
              <p class="text-sm text-gray-500">Quantity: {{ item.quantity }}</p>
            </div>
            <div class="font-bold text-lg">
              ${{ item.product?.price ? (item.product.price * item.quantity).toFixed(2) : '0.00' }}
            </div>
            <button
              @click="removeItem(item.id)"
              class="text-red-600 hover:text-red-800 font-bold text-xl"
              aria-label="Remove item"
              title="Remove item from cart"
            >
              &times;
            </button>
          </li>
        </ul>

        <button
          @click="placeOrder"
          class="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition w-full"
        >
          Order Now
        </button>
      </div>
    </div>
  </ClientOnly>
</template>


<script setup lang="ts">
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'
import { useCartStore } from '~/stores/cart'
import { useSupabaseClient } from '#imports'

const router = useRouter()
const toast = useToast()
const cartStore = useCartStore()
const supabase = useSupabaseClient()

const cartItems = computed(() => cartStore.cartItems)
const error = computed(() => cartStore.error)
const loading = computed(() => cartStore.loading)

const sessionLoaded = ref(false)

watchEffect(async () => {
  const { data } = await supabase.auth.getSession()
  if (data.session && !sessionLoaded.value) {
    sessionLoaded.value = true
    await cartStore.fetchCartItems()
  }
})

async function removeItem(itemId: string) {
  await cartStore.removeFromCart(itemId)
}

function placeOrder() {
  router.push('/checkout')
}
</script>


