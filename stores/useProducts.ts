import { defineStore } from 'pinia'
import type { Product } from '~/types/product'

export const useProductsStore = defineStore('products', {
  state: () => ({
    products: [] as Product[],
    error: null as string | null
  }),

  actions: {
/// all products are fetched from the Supabase database
    async fetchProducts() {
      const toast=useToast()
      try {
        const config = useRuntimeConfig()
        const response = await fetch(
          `${config.public.supabaseUrl}/rest/v1/products?select=*`,
          {
            headers: {
              apikey: config.public.supabaseKey,
              Authorization: `Bearer ${config.public.supabaseKey}`
            }
          }
        )
        this.products = await response.json()
      } catch (err: any) {
        this.error = err.message
        console.error('Fetch error:', err)
      }
    },
/// addToCart method to add a product to the user's cart
   async addToCart(productId: string, quantity = 1) {
  try {
    const config = useRuntimeConfig()
    const supabase = useSupabaseClient()

    // Get current session including access_token
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
      throw new Error('User not logged in')
    }

    const accessToken = session.access_token

    const response = await fetch(`${config.public.supabaseUrl}/rest/v1/cart_items`, {
      method: 'POST',
      headers: {
        apikey: config.public.supabaseKey,
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal'
      },
      body: JSON.stringify([
        {
          user_id: session.user.id,
          product_id: productId,
          quantity
        }
      ])
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Failed to add to cart')
    }
  } catch (err: any) {
    console.error('Add to cart error:', err.message)
    this.error = err.message
  }
},
/// fetch by category
async fetchProductsByCategory(category: string) {
  try {
    const config = useRuntimeConfig()
    const response = await fetch(
      `${config.public.supabaseUrl}/rest/v1/products?select=*&category=eq.${encodeURIComponent(category)}`,
      {
        headers: {
          apikey: config.public.supabaseKey,
          Authorization: `Bearer ${config.public.supabaseKey}`
        }
      }
    )

    if (!response.ok) {
      throw new Error('Failed to fetch products by category')
    }

    this.products = await response.json()
  } catch (err: any) {
    this.error = err.message
    console.error('Fetch category error:', err)
  }
}



  }
})
