import { defineStore } from 'pinia'
import type { CartItem } from '../types/cartItem'


export const useCartStore = defineStore('cart', {
  state: () => ({
    cartItems: [] as CartItem[],
    orders: [] as any[],
    error: null as string | null,
    loading: false,
  }),

  actions: {
    async fetchCartItems() {
      this.loading = true
      try {
        const config = useRuntimeConfig()
        const supabase = useSupabaseClient()
        const { data: sessionData } = await supabase.auth.getSession()
        const session = sessionData.session
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

        if (!response.ok) throw new Error('Failed to fetch cart items')

        const items: CartItem[] = await response.json()
        this.cartItems = items.map((item) => ({ ...item, product: item.product_id }))
        this.error = null
      } catch (err: any) {
        this.error = err.message
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

        await fetch(`${config.public.supabaseUrl}/rest/v1/cart_items?id=eq.${itemId}`, {
          method: 'DELETE',
          headers: {
            apikey: config.public.supabaseKey,
            Authorization: `Bearer ${data.session.access_token}`,
          },
        })

        this.cartItems = this.cartItems.filter((item) => item.id !== itemId)
      } catch (err: any) {
        this.error = err.message
      }
    },

    async placeOrder(orderDetails: {
      order_name: string
      address: string
      city: string
      phone: string
      email: string
      payment_method: string
      notes: string
    }) {
      this.loading = true
      try {
        const config = useRuntimeConfig()
        const supabase = useSupabaseClient()
        const { data: sessionData } = await supabase.auth.getSession()
        if (!sessionData?.session) throw new Error('User not logged in')

        const userId = sessionData.session.user.id
        const accessToken = sessionData.session.access_token

        const totalAmount = this.cartItems.reduce((sum, item) => {
          const price = item.product?.price ?? 0
          return sum + price * item.quantity
        }, 0)

        const orderPayload = {
          user_id: userId,
          total_amount: totalAmount,
          order_name: orderDetails.order_name,
          address: orderDetails.address,
          city: orderDetails.city,
          phone: orderDetails.phone,
          email: orderDetails.email,
          payment_method: orderDetails.payment_method,
          notes: orderDetails.notes,
        }

        const orderResponse = await fetch(`${config.public.supabaseUrl}/rest/v1/orders`, {
          method: 'POST',
          headers: {
            apikey: config.public.supabaseKey,
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            Prefer: 'return=representation',
          },
          body: JSON.stringify(orderPayload),
        })

        if (!orderResponse.ok) throw new Error('Failed to place order')

        const cartItemIds = this.cartItems.map((item) => item.id)

        await fetch(
          `${config.public.supabaseUrl}/rest/v1/cart_items?id=in.(${cartItemIds.join(',')})`,
          {
            method: 'DELETE',
            headers: {
              apikey: config.public.supabaseKey,
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )

        this.cartItems = []
        this.error = null
      } catch (error: any) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },

    async fetchOrders() {
      this.loading = true
      try {
        const supabase = useSupabaseClient()
        const { data: sessionData } = await supabase.auth.getSession()
        const session = sessionData.session
        if (!session) throw new Error('User not logged in')

        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .eq('user_id', session.user.id)
          .order('created_at', { ascending: false })

        if (error) throw error

        this.orders = data || []
        this.error = null
      } catch (err: any) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },
  },

  persist: {
  paths: ['cartItems'], 
},


})
