import { defineStore } from 'pinia';
import { CART_STORAGE } from '../composables/usePersistCart.js';
import { useProductStore } from './productStore.js';

export interface Purchase {
  productId: number;
  quantity: number;
  newProdId: string;
}

interface CartState {
  contents: Record<string, Purchase>;
}

export interface CartPreview {
  id: number;
  image: string;
  require: number;
  title: string;
  quantity: number;
  indCost: number;
  cost: number;
}

export const useCartStore = defineStore({
  id: 'cart',

  state: (): CartState => ({
    contents: JSON.parse(localStorage.getItem(CART_STORAGE) as string) ?? {},
  }),

  getters: {
    count(): number {
      return Object.keys(this.contents).reduce((acc, id) => {
        return acc + this.contents[id].quantity;
      }, 0);
    },

    total(): number {
      const products = useProductStore();
      return Object.keys(this.contents).reduce((acc, id) => {
        return acc + products.items[id].price * this.contents[id].quantity;
      }, 0);
    },

    formattedCart(): CartPreview[] {
      const products = useProductStore();
      if (!products.loaded) return [];

      return Object.keys(this.contents).map((productId) => {
        const purchase = this.contents[productId];
        let custom = ""
        if(purchase.newProdId){
          custom = "Customized: " + purchase.newProdId
        }

        let displayId = purchase.productId
        if(purchase.newProdId){
          displayId = purchase.newProdId
        }

        return {
          id: displayId,
          image: products.items[purchase.productId].photos[0].url,
          require: products.items[purchase.productId].reqQty,
          title: products.items[purchase.productId].description,
          quantity: purchase.quantity,
          custom,
          indCost: products.items[purchase.productId].price,
          cost: purchase.quantity * products.items[purchase.productId].price,
        };
      });
    },
  },

  actions: {
    add(productId: string) {
      if (this.contents[productId]) {
        this.contents[productId].quantity += 1;
      } else {
        this.contents[productId] = {
          productId,
          quantity: 1,
        };
      }
    },
    addComplex(productId: string, colorSelect: string, designSelect: string, dimInput: string){
      console.log(productId + colorSelect + designSelect + dimInput)
      let newProdId = productId
      if(colorSelect !== 'colorSelected'){
        newProdId += colorSelect
      }
      if(designSelect !== 'designSelected') {
        newProdId += designSelect
      }
      if(dimInput){
        newProdId += "Dim" + dimInput
      }
      console.log(newProdId)
      if(this.contents[productId]){
        if(this.contents[productId].newProdId == newProdId){
          this.contents[productId].quantity += 1
        }
      } else {
        this.contents[productId] = {
          productId,
          newProdId,
          quantity: 1,
        }
      }
    },
    remove(productId: string) {
      if (!this.contents[productId]) {
        return;
      }

      this.contents[productId].quantity -= 1;

      if (this.contents[productId].quantity === 0) {
        delete this.contents[productId];
      }
    },
    removeAll() {
      this.contents = {}
    }
  },
});
