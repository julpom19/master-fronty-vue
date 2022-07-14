<script setup>
  import { reactive, ref } from "@vue/reactivity";
  import { computed, onMounted, watch, watchEffect } from "@vue/runtime-core";
  import { useRoute, useRouter } from "vue-router";
  import { storeToRefs } from "pinia";

  import { useQuestionsStore } from '@/stores/questions.store.js';
  import { useUserStore } from '@/stores/user.store.js';
  import { useQuizResultStore } from '@/stores/quiz-result.store.js';  
  import { useCategoriesStore } from "@/stores/categories.store";
  import { useQuizzesStore } from "@/stores/quizzes.store";
  import { calculateCorrectAnswersAmount, getQuestionsAnswered } from "@/utils/questions.utils";

  import QuestionComponent from "@/components/QuestionComponent.vue";
  import PreventRouteLeaveDialog from "@/components/PreventRouteLeaveDialog.vue";
  import CircularProgress from "@/components/CircularProgress.vue";

  const route = useRoute();
  const router = useRouter();
  const { categoryId, quizId } = route.params;

  const userQuizAnswers = reactive([]);
  const questions = reactive([]);
  // const isQuizResultDispatched = ref(false);
  const currentQuestionNum = ref(1);  
  const preventPageLeave = ref(false);

  const questionsStore = useQuestionsStore();
  const userStore = useUserStore();
  const quizResultStore = useQuizResultStore();
  const categoriesStore = useCategoriesStore();
  const quizzesStore = useQuizzesStore();

  const { currentUser } = storeToRefs(userStore);
  const { isLoading, error } = storeToRefs(questionsStore);
  const { 
    isSubmitting: isQuizResultSubmitting, 
    quizResult, 
    error: quizResultError 
  } = storeToRefs(quizResultStore);

  const questionsFromStore = computed(() => questionsStore.getQuestionsByQuiz(quizId));
  const quiz = computed(() => quizzesStore.getQuizById(quizId));
  const category = computed(() => categoriesStore.getCategoryById(categoryId));

  watchEffect(() => {
    if(questionsFromStore.value) {
      questions.length = 0;
      questions.push(...questionsFromStore.value.map(q => ({...q, selectedAnswerId: null})))
    }
  });

  onMounted(() => {
    questionsStore.fetchQuestionsByCategoryAndQuizAsync(categoryId, quizId);
    categoriesStore.fetchCategoriesAsync();
    quizzesStore.fetchQuizzesByCategoryAsync(categoryId);
  });

  watch(quizResultError, (error) => {
    //TODO: handleError
  });

  watch(quizResult, () => {
    if(Object.keys(quizResult).length > 0) {
      router.push(`/quiz-results/${currentUser.value.uid}/${quizResult.value.id}`);
    }
  });

  watch(currentUser, () => {
    if(!currentUser) {
      router.push('/auth');
      //TODO: {replace: true, state: {from: location}}
    }
  });

  watch(error, (error) => {
    if(error && error.name === DBEntityNotFoundError.name) {
      router.push(`/${categoryId}`);
      questionsStore.setErrorHandled();
    }
  });

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    preventPageLeave.value = false;

    if(questions.length != userQuizAnswers.length) {
      alert('Please, answer all questions to submit');
      return;
    }

    const correctAnswersAmount = calculateCorrectAnswersAmount(getQuestionsAnswered(questions, userQuizAnswers));
    const answers = JSON.parse(JSON.stringify(userQuizAnswers));

    let quizResult = {
      quizId,
      categoryId,
      date: new Date().getTime(),
      answers,
      quizTitle: quiz.value.title,
      categoryTitle: category.value.title,
      correctAnswersAmount
    };

    quizResultStore.submitQuizResultAsync(currentUser.value.uid, quizResult);
  }

  const answerOnChangeHandler = (questionId, answerId) => {
    if(!answerId) return;
    addUserQuizAnswer(questionId, answerId);
    addAnswerToQuestions(questionId, answerId);
    preventPageLeave.value = true;
  }

  const addUserQuizAnswer = (questionId, answerId) => {    
    const userQuizAnswer = {
      questionId,
      answerId
    };
    const previousAnswerIndex = userQuizAnswers.findIndex(a => a.questionId === questionId);
    if(previousAnswerIndex >= 0) {
      userQuizAnswers.splice(previousAnswerIndex, 1, userQuizAnswer);
    } else {
      userQuizAnswers.push(userQuizAnswer);
    }
  };

  const addAnswerToQuestions = (questionId, answerId) => {
    const questionIndex = questions.findIndex(q => q.id === questionId);
    questions.splice(questionIndex, 1, {
      ...questions[questionIndex],
      selectedAnswerId: answerId
    });
  };

  const backOnClickHandler = () => {
    currentQuestionNum.value--;
  };

  const nextOnClickHandler = () => {
    currentQuestionNum.value++;
  };  

</script>

<template>
  <q-linear-progress v-if="isQuizResultSubmitting" indeterminate />
  <CircularProgress v-if="isLoading" />
  <div v-else class="page-container q-mb-md">
    <h4 class="q-mt-md q-mb-md">
      {{ quiz?.title }} Quiz
    </h4>
    <h5 class="q-mt-md q-mb-md">
      Question {{ currentQuestionNum }} of {{ questions.length }}
    </h5>
    <q-form>
      <QuestionComponent 
        v-if="questions.length && questions[currentQuestionNum - 1]"
        :question="questions[currentQuestionNum - 1]"
        @answerOnChange="answerOnChangeHandler"
      />    
      <q-btn
        @click="backOnClickHandler"
        :disabled="currentQuestionNum === 1"
        color="primary"
        rounded 
        class="q-mr-md"
      >
        BACK
      </q-btn>
      <q-btn
        v-if="currentQuestionNum === questions.length"
        @click="onSubmitHandler"
        :disabled="userQuizAnswers.length < questions.length || isQuizResultSubmitting"
        color="primary"
        rounded 
      >
        SUBMIT
      </q-btn>
      <q-btn
        v-else
        @click="nextOnClickHandler"
        :disabled="currentQuestionNum > userQuizAnswers.length"
        color="primary"
        rounded 
      >
        NEXT
      </q-btn>
    </q-form>
  </div>
  <PreventRouteLeaveDialog :preventPageLeave="preventPageLeave" />
</template>

<style scoped>

</style>