import { defineStore } from 'pinia';
import { getQuestionsByCategoryAndQuiz } from '@/utils/firebase/firebase-store.utils';

export const useQuestionsStore = defineStore('questions', {
  state: () => ({
    questionsByQuiz: {},
    isLoading: false,
    error: null
  }),
  getters: {
    getQuestionsByQuiz: (state) => {
      return (quizId) => state.questionsByQuiz[quizId];
    },
  },
  actions: {
    async fetchQuestionsByCategoryAndQuizAsync(categoryId, quizId) {
      if(Object.keys(this.questionsByQuiz).length > 0) {
        return Promise.resolve();
      }

      this.isLoading = true;
      try {
        this.questionsByQuiz[quizId] = await getQuestionsByCategoryAndQuiz(categoryId, quizId);
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