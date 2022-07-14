<script setup>
  import { useRoute, useRouter } from 'vue-router';
  import { useQuizzesStore } from '../stores/quizzes.store';
  import { storeToRefs } from 'pinia';
  import { computed, onMounted, watch } from 'vue';
  import { useCategoriesStore } from '../stores/categories.store';
  import { DBEntityNotFoundError } from '../utils/errors.utils';
  import QuizCard from '@/components/QuizCard.vue';
import CircularProgress from '@/components/CircularProgress.vue';

  const route = useRoute();
  const router = useRouter();
  const categoryId = route.params.categoryId;
  const quizzesStore = useQuizzesStore();
  const categoriesStore = useCategoriesStore();

  const { isLoading, error } = storeToRefs(quizzesStore);
  const quizzes = computed(() => quizzesStore.getQuizzesByCategory(categoryId));

  onMounted(() => {
    categoriesStore.fetchCategoriesAsync();
    quizzesStore.fetchQuizzesByCategoryAsync(categoryId);
  });

  watch(error, (error) => {
    if(error && error.name === DBEntityNotFoundError.name) {
      router.push('/');
      quizzesStore.setErrorHandled();
    }
  });

</script>

<template>
  <div class="page-container">
    <CircularProgress v-if="isLoading" />
    <div v-else class="row q-mt-xl justify-around">
      <div 
        v-for="quiz in quizzes"
        :key="quiz.id"
        class="col-6 col-sm-4 col-md-3"
      >
        <QuizCard          
          :categoryId="categoryId"
          :quiz="quiz" />   
      </div>         
    </div>
  </div>
</template>