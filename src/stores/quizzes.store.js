import { defineStore } from 'pinia';
import { getQuizzesByCategory } from '@/utils/firebase/firebase-store.utils';

export const useQuizzesStore = defineStore('quizzes', {
  state: () => ({
    quizzesByCategories: {},
    isLoading: false,
    error: null
  }),
  getters: {
    getQuizzesByCategory: (state) => {
      return (categoryId) => state.quizzesByCategories[categoryId];
    },
    getQuizById: (state) => {
      return (quizId) => {
        for(const quizzes of Object.values(state.quizzesByCategories)) {
          const quiz = quizzes.find(quiz => quiz.id === quizId);
          if(quiz) return quiz;
        }
      };
    },
  },
  actions: {
    async fetchQuizzesByCategoryAsync(categoryId) {
      this.isLoading = true;
      try {
        this.quizzesByCategories[categoryId] = await getQuizzesByCategory(categoryId);
      } catch (error) {
        this.error = error;
      } finally {
        this.isLoading = false;
      }
    },
    setErrorHandled() {
      this.error = null;
    }
  }
});