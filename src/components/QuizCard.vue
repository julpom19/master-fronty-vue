<script setup>
  import { useRouter } from 'vue-router';
  import CardComponent from './CardComponent.vue';

  const router = useRouter();
  const props = defineProps({
    quiz: Object,
    categoryId: String
  });

  const handleCardClick = () => {
    router.push(`/${props.categoryId}/${props.quiz.id}`);
  }
</script>

<template>
  <CardComponent :handle-card-click="handleCardClick">
    <h6 class="text-bold">{{ quiz.title }}</h6>
  </CardComponent>
</template>