<script setup>
import { useQuestionsStore } from "@/stores/questions.store";
import { useQuizResultStore } from "@/stores/quiz-result.store";
import { useQuizzesStore } from "@/stores/quizzes.store";
import { reactive } from "@vue/reactivity";
import { computed, onMounted, watch } from "@vue/runtime-core";
import { storeToRefs } from "pinia";
import { useRoute, useRouter } from "vue-router";
import CircularProgress from "@/components/CircularProgress.vue";
import { getQuestionsAnswered } from "@/utils/questions.utils";
import ScoreStats from "@/components/ScoreStats.vue";
import QuestionAnswered from "@/components/QuestionAnswered.vue";

  const router = useRouter();
  const route = useRoute();
  const userId = route.params.userId;
  const quizResultId = route.params.quizResultId;

  const quizResultStore = useQuizResultStore();
  const { quizResult, isLoading: quizResultIsLoading, error } = storeToRefs(quizResultStore);
  
  const quizzesStore = useQuizzesStore();
  const { isLoading: quizzesLoading } = storeToRefs(quizzesStore);
  const quiz = computed(() => {
    if(!quizResult?.value?.quizId) return null;
    return quizzesStore.getQuizById(quizResult.value.quizId);
  });

  const questionsStore = useQuestionsStore();
  const { isLoading: questionsLoading } = storeToRefs(questionsStore);
  const questions = computed(() => {
    if(!quizResult?.value?.quizId) return [];
    return questionsStore.getQuestionsByQuiz(quizResult?.value?.quizId);
  });

  const questionsAnswered = computed(() => {
    if(!quiz?.value?.id || !questions?.value) return [];
    return getQuestionsAnswered(questions.value, quizResult.value.answers);
  });
    
  const isLoading = computed(() => quizResultIsLoading.value || quizzesLoading.value || questionsLoading.value);

  onMounted(() => {
    quizResultStore.quizResult = null;
    quizResultStore.fetchQuizResultAsync(userId, quizResultId);
  });

  watch(quizResult, () => {
    if(quizResult?.value?.id) {
      quizzesStore.fetchQuizzesByCategoryAsync(quizResult.value.categoryId);
      questionsStore.fetchQuestionsByCategoryAndQuizAsync(quizResult.value.categoryId, quizResult.value.quizId)
    }
  });

  watch(error, (error) => {
    if(error && error.name === DBEntityNotFoundError.name) {
      router.push('/');
      quizResultStore.setErrorHandled();
    } //TODO: process other types of errors
  });

</script>

<template>
  <main class="page-container">
    <CircularProgress v-if="isLoading" />
    <div v-else class="row justify-between items-center q-mt-md">
      <div>
        <h3 class="q-mt-sm q-mb-sm">{{ quiz?.title }} Quiz Result</h3>
      </div>
      <div>
        <h6 class="q-ma-none text-bold">Score: {{ quizResult?.correctAnswersAmount }} of {{ questionsAnswered?.length }}</h6>
        <ScoreStats 
          :correct-amount="quizResult?.correctAnswersAmount"
          :total-amount="questionsAnswered.length"
        />
      </div>      
    </div>
    <QuestionAnswered 
      v-for="(question, index) in questionsAnswered"
      :key="question.id"
      :question-answered="question"
      :question-index="index"
    />
  </main>
</template>