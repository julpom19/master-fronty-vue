<script setup>
  import { reactive } from 'vue';
  import { useRouter } from 'vue-router';
  import CardComponent from './CardComponent.vue';

  const router = useRouter();
  const props = defineProps({
    category: Object
  });

  const handleCardClick = () => {
    router.push(`/${props.category.id}`);
  }
</script>

<template>
  <CardComponent :handle-card-click="handleCardClick">
    <img :src="category.icon" :alt="category.title"/>
    <h4 className="card-title">
      {{ category.title }}
    </h4>
  </CardComponent>
</template>

<style scoped lang="scss">
  .card {
    .card-title {
      color: #525151;
      font-weight: bold;
      margin-left: 20px;
    }

    img {
      width: 64px;
      height: 64px;
    }
  }
</style>