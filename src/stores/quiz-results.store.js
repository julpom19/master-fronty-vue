import { defineStore } from 'pinia';
import { getQuizResultsByUser } from '@/utils/firebase/firebase-store.utils';

export const useQuizResultsStore = defineStore('quiz-results', {
  state: () => ({
    quizResults: [],
    isLoading: false,
    error: null
  }),
  actions: {
    async fetchQuizResultsAsync(userId) {
      this.isLoading = true;
      try {
        this.quizResults = await getQuizResultsByUser(userId);
      } catch (error) {
        this.error = error;
      } finally {
        this.isLoading = false;
      }
    }
  }
});