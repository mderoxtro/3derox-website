import { defineStore } from 'pinia';

const storeUrl = 'http://localhost:3000';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

interface ProductState {
  items: Record<string, Product>;
  ids: number[];
}

export const useProductStore = defineStore({
  id: 'products',

  state: (): ProductState => ({
    items: {},
    ids: [],
  }),

  getters: {
    list(): Product[] {
      return this.ids.map((i) => this.items[i]);
    },

    loaded(): boolean {
      return this.ids.length > 0;
    },
  },

  actions: {
    async fetchAll() {
      if (this.loaded) return;

      const res = await fetch(`${storeUrl}/allParts`);
      const data: Product[] = await res.json();
      this.ids = data.map((product) => {
        this.items[product.deroxNum] = product;
        return product.deroxNum;
      });
    },
  },
});
