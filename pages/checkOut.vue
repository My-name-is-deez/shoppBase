<template>
  <ClientOnly>
    <div class="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h1 class="text-2xl font-bold mb-6">Checkout</h1>

      <form @submit.prevent="submitOrder" class="space-y-4">
        <input v-model="orderName" required placeholder="Order name" class="w-full border px-3 py-2 rounded" />
        <input v-model="email" type="email" required placeholder="Email" class="w-full border px-3 py-2 rounded" />
        <input v-model="phone" type="tel" required placeholder="Phone" class="w-full border px-3 py-2 rounded" />
        <input v-model="city" required placeholder="City" class="w-full border px-3 py-2 rounded" />
        <input v-model="address" required placeholder="Address" class="w-full border px-3 py-2 rounded" />

        <textarea v-model="notes" placeholder="Notes (optional)" rows="3" class="w-full border px-3 py-2 rounded"></textarea>

        <select v-model="paymentMethod" required class="w-full border px-3 py-2 rounded">
          <option disabled value="">Select payment</option>
          <option>Cash on Delivery</option>
          <option>Credit Card</option>
          <option>PayPal</option>
        </select>

        <div class="flex justify-between items-center mt-4">
        <button type="submit" :disabled="loading" class="bg-green-600 text-white px-4 py-2 rounded">
            {{ loading ? 'Placing Order...' : 'Place Order' }}
        </button>

        <button type="button" @click="goBackToCart" class="px-4 py-2 rounded border hover:bg-gray-100">
            Cancel / Back to Cart
        </button>

        </div>
      </form>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useCartStore } from '~/stores/cart'
import { useToast } from 'vue-toastification'

const cartStore = useCartStore()
const router = useRouter()

const orderName = ref('')
const email = ref('')
const phone = ref('')
const city = ref('')
const address = ref('')
const notes = ref('')
const paymentMethod = ref('')
const loading = ref(false)
const error = ref<string | null>(null)
const toast= useToast()

async function submitOrder() {
  error.value = null
  loading.value = true

  try {
    await cartStore.placeOrder({
      order_name: orderName.value,
      address: address.value,
      city: city.value,
      phone: phone.value,
      email: email.value,
      payment_method: paymentMethod.value,
      notes: notes.value,
    })
    toast.success('order placed successfully')
    setTimeout(() => router.push('/orders'), 1500)
  } catch (err) {
    error.value = (err as Error).message
  } finally {
    loading.value = false
  }
}

function goBackToCart() {
  router.push('/cart')
}
</script>
