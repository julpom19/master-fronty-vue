<script setup>
import { useCategoriesStore } from "@/stores/categories.store";
import { useQuizzesStore } from "@/stores/quizzes.store";
import { computed, reactive, watch } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";

  const router = useRouter();
  const route = useRoute();

  const categoriesStore = useCategoriesStore();
  const categoryId = computed(() => route.params.categoryId);
  const category = computed(() => categoriesStore.getCategoryById(categoryId.value));

  const quizzesStore = useQuizzesStore();
  const quizId = computed(() => route.params.quizId);
  const quiz = computed(() => quizzesStore.getQuizById(quizId.value));

  const quizResultId = computed(() => route.params.quizResultId);
  const userId = computed(() => route.params.userId);

  const current = computed(() => route.name);
</script>

<template>
  <q-breadcrumbs class="text-primary">
    <q-breadcrumbs-el icon="home" to="/" />
    <q-breadcrumbs-el v-if="category" :label="category?.title" :to="`/${categoryId}`" />
    <q-breadcrumbs-el v-if="quiz" :label="quiz?.title" :to="`/${categoryId}/${quizId}`" />
    <q-breadcrumbs-el v-if="current === 'auth'" label="Authentication" to="/auth" />
    <q-breadcrumbs-el v-if="current === 'quiz-results'" label="Quiz Results" to="/quiz-results" />
    <q-breadcrumbs-el v-if="current === 'quiz-result'" label="Quiz Result" :to="`/quiz-results/:userId/:quizResultId`" />
  </q-breadcrumbs>    
</template>