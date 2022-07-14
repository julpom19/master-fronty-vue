<script setup>
  const props = defineProps({
    questionAnswered: {
      type: Object,
      required: true
    },
    questionIndex: {
      type: Number,
      required: true
    }
  });
</script>

<template>
  <q-card class="card">
    <h6 class="header">{{ questionIndex + 1 }}. {{ questionAnswered.content}}</h6>
    <q-list bordered separator>
      <q-item 
        v-for="answer in questionAnswered.answers" 
        :key="answer.id"
        :class="{
          'correctly-answered': answer.isSelectedByUser && answer.isCorrect,
          'wrongly-answered': answer.isSelectedByUser && !answer.isCorrect
        }"
      >
        <q-item-section>{{ answer.content }}</q-item-section>
        <q-chip v-if="answer.isCorrect" label="Correct answer" />
      </q-item>
    </q-list>
  </q-card>
</template>

<style lang="scss" scoped>
  .card {
    border-radius: 10px;
    padding: 20px;
    margin: 20px 0;

    .header {
      margin: 0;
      font-weight: bold;
    }

    .correctly-answered {
      background-color: rgba(143, 188, 143, 0.5);
    }

    .wrongly-answered {
      background-color: rgba(238, 127, 127, 0.5);
    }
  }
</style>
