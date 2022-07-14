<script setup>
import { computed } from "@vue/runtime-core";

  const props = defineProps({
    correctAmount: {
      type: Number,
      required: true
    },
    totalAmount: {
      type: Number,
      required: true
    }
  });

  const labels = {
    1: 'Bad',
    2: 'Need to study more',
    3: 'Ok',
    4: 'Good',
    5: 'Excellent',
  };

  const labelsCount = Object.keys(labels).length;
  const value = computed(() => {
    return Math.ceil( labelsCount * props.correctAmount / props.totalAmount);
  }); 

</script>

<template>
  <div>
    <q-rating
        v-model="value"
        size="2em"
        color="orange"
        icon="star_border"
        icon-selected="star"
        readonly
      />
    <span class="label">
      {{ labels[value] }}
    </span>
  </div>
</template>

<style scoped>
  .label {
    font-size: 16px;
    vertical-align: bottom;
    margin-left: 8px;
  }
</style>