<script setup>
  import { useQuizResultsStore } from '@/stores/quiz-results.store';
  import { useUserStore } from '@/stores/user.store';
  import { reactive } from '@vue/reactivity';
  import { watchEffect } from '@vue/runtime-core';
  import { storeToRefs } from 'pinia';
  import { useRouter } from 'vue-router';
import CircularProgress from './CircularProgress.vue';

  const router = useRouter();
  const quizResultsStore = useQuizResultsStore();
  const { quizResults: quizResultsFromState, isLoading } = storeToRefs(quizResultsStore);

  const userStore = useUserStore();
  const { currentUser } = storeToRefs(userStore);

  const quizResults = reactive([]);

  watchEffect(() => {
    if(currentUser && currentUser.value.uid) {
      quizResultsStore.fetchQuizResultsAsync(currentUser.value.uid);
    }
  });

  watchEffect(() => {
    if(quizResultsFromState && quizResultsFromState.value) {
      quizResults.length = 0;
      quizResults.push(...quizResultsFromState.value.map((qResult, index) => {
            qResult.index = index + 1;
            qResult.score = qResult.correctAnswersAmount + ' of ' + qResult.answers.length;
            qResult.date = new Date(qResult.date).toLocaleDateString("en-US");
            return qResult;
          }))
    }
  });

  const onHandleRowClick = (params) => {
    router.push(`/quiz-results/${currentUser.uid}/${params.id}`);
  }

  const columns = [
    { name: 'index', label: '#', field: 'index', align: 'left', },
    { name: 'quizTitle', label: 'Quiz', field: 'quizTitle', align: 'left', },
    { name: 'categoryTitle', label: 'Category', field: 'categoryTitle', align: 'left', },
    { name: 'date', label: 'Date', field: 'date', align: 'left', },
    { name: 'score', label: 'Score', field: 'score', align: 'left', },
  ];

  const handleRowClick = (_, quiz) => {
    router.push(`/quiz-results/${currentUser.value.uid}/${quiz.id}`);
  };

</script>

<template>
  <CircularProgress v-if="isLoading" />
  <q-table
    v-else
    :rows="quizResults"
    :columns="columns"
    row-key="name"
    :pagination="{rowsPerPage: 100}"
    @row-click="handleRowClick"
  />
</template>
