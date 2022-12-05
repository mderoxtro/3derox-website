import { defineStore } from 'pinia';
import { CART_STORAGE, ID_STORAGE } from '../composables/usePersistCart.js';
import axios from 'axios';
import { useProductStore } from './productStore.js';

export interface Purchase {
  productId: number;
  quantity: number;
  newProdId: string;
}

interface CartState {
  contents: Record<string, Purchase>;
  rates: array;
  orderID: string;
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
    rates: [],
    orderID: JSON.parse(localStorage.getItem(ID_STORAGE) as string) ?? {},
  }),

  getters: {
    count(): number {
      return Object.keys(this.contents).reduce((acc, id) => {
        if(this.contents[id].isShip){
          return acc + 0
        } else {
          return acc + this.contents[id].quantity;
        }
      }, 0);
    },
    hasShipping(state): boolean {
      let allContents = state.contents
      let shipTrue = false
      for(let entry in allContents){
        if(allContents[entry].isShip){
          shipTrue = true
        }
      }
      return shipTrue
    },
    getOrderID(state): string {
      let currentID = state.orderID
      return currentID
    },
    totalWeight(): number {
      const products = useProductStore();
      return Object.keys(this.contents).reduce((acc, id) => {
        let newId = id
        if(id.length > 9){
          if(id.slice(0, 7) == '3DMDKIT'){
            newId = id.slice(0,10)
          } else {
            newId = id.slice(0, 9)
          }
        }
        if(this.contents[id].isShip){
          return acc + 0
        } else {
          return acc + products.items[newId].weight * this.contents[id].quantity;
        }
      }, 0);
    },
    total(): number {
      const products = useProductStore();
      return Object.keys(this.contents).reduce((acc, id) => {
        let newId = id
        if(id.length > 9){
          if(id.slice(0, 7) == '3DMDKIT'){
            newId = id.slice(0,10)
          } else {
            newId = id.slice(0, 9)
          }
        }
        if(this.contents[id].isShip){
          return acc + this.contents[id].cost;
        } else {
          return acc + products.items[newId].price * this.contents[id].quantity;
        }
      }, 0);
    },
    formattedRates(): array {
      return Object.keys(this.rates).map((rateId) => {
        return {
          amount: this.rates[rateId].amount,
          est_days: this.rates[rateId].estimated_days,
          carrier: this.rates[rateId].provider,
          carrier_img: this.rates[rateId].provider_image_75,
          desc: this.rates[rateId].servicelevel.name
        }
      })
    },
    formattedCart(): CartPreview[] {
      const products = useProductStore();
      if (!products.loaded) return [];

      return Object.keys(this.contents).map((productId) => {
        if(this.contents[productId].isShip){
          return {
            isShip: true,
            id: this.contents[productId].rateId,
            image: this.contents[productId].imageUrl,
            require: 1,
            title: this.contents[productId].carrier,
            quantity: 1,
            cost: this.contents[productId].cost,
            indCost: this.contents[productId].cost,
            weight: 0
          }
        }
        const purchase = this.contents[productId];
        let custom = ""
        if(purchase.newProdId){
          custom = "Customized: " + purchase.newProdId
        }

        return {
          id: purchase.productId,
          image: products.items[purchase.productId].photos[0].url,
          require: products.items[purchase.productId].reqQty,
          title: products.items[purchase.productId].description,
          quantity: purchase.quantity,
          custom,
          customId: purchase.newProdId,
          indCost: products.items[purchase.productId].price,
          cost: purchase.quantity * products.items[purchase.productId].price,
          weight: products.items[purchase.productId].weight
        };
      });
    },
  },

  actions: {
    add(productId: string, customId: string) {
      if (this.contents[productId] && !customId) {
        this.contents[productId].quantity += 1;
      } else if (this.contents[customId]){
        this.contents[customId].quantity += 1;
      } else {
        this.contents[productId] = {
          productId,
          newProdId: customId,
          quantity: 1,
        };
      }
    },
    addOrderID(order: string){
      this.orderID = order
    },
    addShip(isShip: boolean, rate: object){
      if(this.contents[rate.desc]){
        return
      } else {
        this.contents[rate.desc] = {
          isShip: true,
          rateId: rate.desc,
          imageUrl: rate.carrier_img,
          title: rate.carrier,
          cost: parseFloat(rate.amount),
          quantity: 1
        }
      }
    },
    addComplex(productId: string, colorSelect: string, designSelect: string, dimInput: string){
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
      if(this.contents[newProdId]){
        this.contents[newProdId].quantity += 1
      } else {
        this.contents[newProdId] = {
          productId,
          newProdId,
          quantity: 1
        }
      }
    },
    remove(productId: string, customId: string) {
      if (!this.contents[productId] && !customId) {
        return
      }
      if(this.contents[customId]){
        this.contents[customId].quantity -= 1
        if(this.contents[customId].quantity <= 0){
          delete this.contents[customId]
        }
      } else if (this.contents[productId]){
        this.contents[productId].quantity -= 1;
        if(this.contents[productId].quantity <= 0){
          delete this.contents[productId]
        }
      }
    },
    removeFull(productId: string, customId: string){
      if (!this.contents[productId] && !customId) {
        return
      }
      if(this.contents[customId]){
        this.contents[customId].quantity = 0
        if(this.contents[customId].quantity <= 0){
          delete this.contents[customId]
        }
      } else if (this.contents[productId]){
        this.contents[productId].quantity = 0;
        if(this.contents[productId].quantity <= 0){
          delete this.contents[productId]
        }
      }
    },
    removeAll() {
      this.contents = {}
    },
    async calcShip(shipment) {
      let allRates = await axios.post('http://localhost:3000/calcship', {
        data: shipment
      })
      this.rates = allRates.data
    }
  },
});
