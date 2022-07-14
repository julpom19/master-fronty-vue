import { defineStore } from 'pinia'
import { getCategories } from '@/utils/firebase/firebase-store.utils';

export const useCategoriesStore = defineStore('categories',{
  state: () => ({
    categories: [],
    isLoading: false,
    error: null,
  }),
  getters: {
    getCategoryById: (state) => {
      return (categoryId) => state.categories.find(c => c.id === categoryId)
    }
  },
  actions: {
    async fetchCategoriesAsync() {
      if(this.categories.length > 0) {
        return Promise.resolve();
      }
      this.isLoading = true;
      try {
        this.categories = await getCategories();
      } catch (error) {
        this.error = error;
      } finally {
        this.isLoading = false;
      }
    }
  }
})
