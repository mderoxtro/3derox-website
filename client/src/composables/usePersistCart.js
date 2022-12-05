import { onUnmounted } from 'vue'
import { useCartStore } from '../stores/cartStore'

export const CART_STORAGE = 'CART_STORAGE'
export const ID_STORAGE = 'ID_STORAGE'
export const URL_STORAGE = 'URL_STORAGE'

export const usePersistCart = () => {
  const cartStore = useCartStore()

  const unsub = cartStore.$subscribe(() => {
    localStorage.setItem(CART_STORAGE, JSON.stringify(cartStore.contents))
    localStorage.setItem(ID_STORAGE, JSON.stringify(cartStore.orderID))
    localStorage.setItem(URL_STORAGE, JSON.stringify(cartStore.approveUrl))
  })

  onUnmounted(() => {
    unsub()
  })
}
