export interface CartItem {
  id: string
  user_id: string
  product_id: string
  quantity: number
  created_at: string
  updated_at: string
  product?: {
    name: string
    price: number
    image_url: string
  }
}