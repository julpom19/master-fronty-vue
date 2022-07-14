<script setup>
  const props = defineProps({
    handleCardClick: Function
  });
</script>

<template>
  <q-card @click="handleCardClick" class="card shadow-8">
    <q-card-actions class="row justify-center items-center full-height">
      <slot />
    </q-card-actions>    
  </q-card>
</template>

<style scoped lang="scss">
  .card {
    cursor: pointer;
    max-width: 300px;
    height: 150px;
    border-radius: 10px;
    overflow: hidden;

    :hover {
      background-color: #f1eded;
    }
  }
</style>