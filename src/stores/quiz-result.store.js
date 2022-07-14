import { defineStore } from 'pinia';
import { getQuizResultByUser, submitQuizResult } from '@/utils/firebase/firebase-store.utils';

export const useQuizResultStore = defineStore('quiz-result', {
  state: () => ({
    quizResult: {},
    isSubmitting: false,
    error: null,
    isLoading: false
  }),
  actions: {
    async fetchQuizResultAsync(userId, quizResultId) {
      this.isLoading = true;
      try {
        this.quizResult = await getQuizResultByUser(userId, quizResultId);
      } catch (error) {
        this.error = error;
      } finally {
        this.isLoading = false;
      }
    },
    async submitQuizResultAsync(userId, quizResult) {
      this.isSubmitting = true;
      try {
        this.quizResult = await submitQuizResult(userId, quizResult);
      } catch (error) {
        this.error = error;
      } finally {
        this.isSubmitting = false;
      }
    },
    setErrorHandled() {
      this.error = null;
    }
  }
})