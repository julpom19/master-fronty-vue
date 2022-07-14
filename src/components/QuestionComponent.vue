<script setup>
	import { ref } from "@vue/reactivity";
	import { computed, watch } from "@vue/runtime-core";

	const emit = defineEmits(['answerOnChange']);	
	const props = defineProps({
		question: Object
	});	

	let selectedAnswer = ref(props.question.selectedAnswerId);

  const options = computed(() => props.question.answers.map(a => ({
		label: a.content,
		value: a.id
	})));

	watch(selectedAnswer, () => {
		emit('answerOnChange', props.question.id, selectedAnswer.value);
	});	

  watch(props, () => {
    selectedAnswer.value = props.question.selectedAnswerId;
  });
</script>

<template>
  <q-card class="question-card shadow-8">
		<h6 class="header">{{ question.content }}</h6>
		<q-option-group
      v-model="selectedAnswer"
      :options="options"
    />	
	</q-card>
</template>

<style scoped lang="scss">
  .question-card {
    border-radius: 10px;
    padding: 24px;
    margin: 24px 0;

    .header {
      margin-top: 0;
      margin-bottom: 0;
      font-weight: 500;
    }
  }
</style>