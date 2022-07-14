<script setup>
  import { useUserStore } from "@/stores/user.store";
  import { storeToRefs } from "pinia";
  import { useRouter } from "vue-router";
import QuizResultsTable from "@/components/QuizResultsTable.vue";

  const router = useRouter();
  const userStore = useUserStore();
  const { currentUser } = storeToRefs(userStore);

  //TODO: guard router, auth needed


  
</script>

<template>
  <main class="page-container">
    <h4>Your quiz results</h4>
    <QuizResultsTable />
  </main>
</template>