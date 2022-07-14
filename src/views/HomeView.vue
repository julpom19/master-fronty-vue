<script setup>
  import { useCategoriesStore } from '@/stores/categories.store';
  import { onMounted } from 'vue';
  import { storeToRefs } from 'pinia';
  import CategoryCard from '@/components/CategoryCard.vue';
import CircularProgress from '@/components/CircularProgress.vue';

  const categoriesStore = useCategoriesStore();
  const { categories, isLoading } = storeToRefs(categoriesStore);

  onMounted(() => {
    categoriesStore.fetchCategoriesAsync();
  });
</script>

<template>
  <main class="page-container">
    <h3 class="header text-weight-bold text-center">
      Train yourself to master the force of coding!
    </h3>
    <p class="info-text text-center">
      Take quizzes to test your knowledge in the world of frontend development.
      Discover your strengths and weaknesses in order to improve your professional skills
    </p>
    <CircularProgress v-if="isLoading" />
    <div v-else class="row justify-around q-mt-xl">
      <div 
        v-for="category in categories" 
        :key="category.id"
        class="col-6 col-sm-4 col-md-3"
        >
        <CategoryCard :category="category" />
      </div>      
    </div>
  </main>
</template>

<style scoped>
  .header {
    margin-bottom: 20px;
  }
  .info-text {
    font-size: 18px;
  }  
</style>>
