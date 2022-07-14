<script setup>
  import { ref } from "@vue/reactivity";
import { onBeforeRouteUpdate, useRoute, useRouter } from "vue-router";
  import SignInForm from "../components/SignInForm.vue";
  import SignUpForm from "../components/SignUpForm.vue";
  
  const route = useRoute();
  
  let showSignInForm = ref(true);
  let from = ref('/');
  // const from = location.state?.from?.pathname || "/"; TODO: 

  const toggleForm = () => {
    showSignInForm.value = !showSignInForm.value;
  }
</script>

<template>
  <q-page class="row justify-center">
  <div v-if="showSignInForm">
    <SignInForm />
    <p class="text-right text-subtitle1">
      Need an account?
      <q-btn @click="toggleForm" flat color="primary" class="auth-btn">
        Sign up
      </q-btn>
    </p>    
  </div>
  <div v-else>
    <SignUpForm />
    <p class="text-right text-subtitle1">
      Already have an account?
      <q-btn @click="toggleForm" flat color="primary" class="auth-btn">
        Sign in
      </q-btn>
    </p>    
  </div>
  </q-page>  
</template>

<style scoped lang="scss">
  .auth-btn {
    padding-left: 8px;
    padding-right: 8px;
  }

  .auth-card {
    max-width: 400px;
    border-radius: 10px;
    padding: 20px 20px;
    margin: 20px;

    :deep(.auth-card-header) {
      margin: 0 0 20px;
      text-align: center;
    }
    
  }

</style>