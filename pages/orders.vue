<template>
  <ClientOnly>
    <div class="max-w-4xl mx-auto p-6 min-h-screen">
      <h1 class="text-4xl font-extrabold mb-8 text-gray-900 border-b border-gray-300 pb-4">
        Your Orders
      </h1>

      <!-- Loading -->
      <div v-if="loading" class="text-center text-gray-500 py-10 text-lg">
        Loading orders...
      </div>

      <!-- Error -->
      <div v-else-if="error" class="text-red-600 bg-red-100 p-4 rounded mb-6 font-medium">
        {{ error }}
      </div>

      <!-- Empty -->
      <div v-else-if="orders.length === 0" class="text-gray-600 text-center py-20 text-xl italic">
        You haven't placed any orders yet.
      </div>

      <!-- Orders -->
      <ul v-else class="space-y-8">
        <li
          v-for="order in orders"
          :key="order.id"
          class="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow"
        >
          <h2 class="text-2xl font-semibold mb-3 ">
           <span class="text-orange-400">Order</span>: {{ order.order_name || 'Unnamed Order' }}
          </h2>

          <p class="text-lg font-semibold text-green-700 mb-2">
            Total: ${{ order.total_amount.toFixed(2) }}
          </p>

          <p class="text-sm text-gray-500 mb-4">
            Date: <time :datetime="order.created_at">{{ formatDate(order.created_at) }}</time>
          </p>

          <div class="mb-4">
            <h3 class="font-semibold text-gray-800 mb-1">Shipping Address</h3>
            <address class="whitespace-pre-wrap text-gray-700 text-sm leading-relaxed not-italic bg-gray-50 p-3 rounded border border-gray-200">
              {{ order.city }}<br />
              {{ order.address }}
            </address>
          </div>

          <p class="text-sm mb-1">
            <span class="font-semibold">Payment Method:</span> {{ order.payment_method || 'N/A' }}
          </p>

          <p
            v-if="order.notes"
            class="text-sm italic text-gray-600 border-l-4 border-orange-300 pl-3 mt-3"
          >
            <strong>Notes:</strong> {{ order.notes }}
          </p>
        </li>
      </ul>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { useCartStore } from '~/stores/cart'

const cartStore = useCartStore()
const { orders, error, loading, fetchOrders } = cartStore

onMounted(() => {
  fetchOrders()
})

function formatDate(dateStr: string | undefined) {
  if (!dateStr) return 'Unknown date'
  const date = new Date(dateStr)
  return date.toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
</script>
