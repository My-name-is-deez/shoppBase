import { defineStore } from 'pinia'
import type { CartItem } from '../types/cartItem'

export const useCartStore = defineStore('cart', {
  state: () => ({
    cartItems: [] as CartItem[],
    error: null as string | null,
    loading: false,
  }),

  actions: {
    async fetchCartItems() {
      this.loading = true
      try {
        const config = useRuntimeConfig()
        const supabase = useSupabaseClient()

        // Wait for session to be ready (retry up to 5 times)
        let session = null
        for (let i = 0; i < 5; i++) {
          const { data } = await supabase.auth.getSession()
          session = data.session
          if (session) break
          await new Promise((r) => setTimeout(r, 300))
        }
        if (!session) throw new Error('User not logged in')

        const userId = session.user.id

        const response = await fetch(
          `${config.public.supabaseUrl}/rest/v1/cart_items?user_id=eq.${userId}&select=*,product_id(*)`,
          {
            headers: {
              apikey: config.public.supabaseKey,
              Authorization: `Bearer ${session.access_token}`,
            },
          }
        )

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || 'Failed to fetch cart items')
        }

        const cartItems: CartItem[] = await response.json()

        this.cartItems = cartItems.map((item) => ({
          ...item,
          product: item.product_id,
        }))
        this.error = null
      } catch (err: any) {
        this.error = err.message
        console.error('Fetch cart error:', err)
      } finally {
        this.loading = false
      }
    },

    async removeFromCart(itemId: string) {
      try {
        const config = useRuntimeConfig()
        const supabase = useSupabaseClient()

        const { data } = await supabase.auth.getSession()
        if (!data.session) throw new Error('User not logged in')

        const response = await fetch(`${config.public.supabaseUrl}/rest/v1/cart_items?id=eq.${itemId}`, {
          method: 'DELETE',
          headers: {
            apikey: config.public.supabaseKey,
            Authorization: `Bearer ${data.session.access_token}`,
          },
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || 'Failed to remove item from cart')
        }

        // Remove item from local state immediately
        this.cartItems = this.cartItems.filter((item) => item.id !== itemId)
        this.error = null
      } catch (err: any) {
        this.error = err.message
        console.error('Remove from cart error:', err)
      }
    },
  },
})
