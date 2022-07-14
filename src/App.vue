<script setup>
  import { RouterLink, RouterView } from 'vue-router'
  import FooterComponent from '@/components/FooterComponent.vue'
  import HeaderComponent from '@/components/HeaderComponent.vue'
  import { onAuthStateChangedListener } from './utils/firebase/firebase-auth.utils';
  import { createUserDocumentFromAuth } from './utils/firebase/firebase-store.utils';
  import { useUserStore } from './stores/user.store';
  import { onBeforeUnmount, onMounted } from '@vue/runtime-core';
  
  const userStore = useUserStore();
  let unsubscribe;

  onMounted(() => {
    unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      userStore.currentUser = user;
    });
  });

  onBeforeUnmount(() => {
    unsubscribe();
  });

</script>

<!--<template>-->
<!--  <header>-->
<!--    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />-->

<!--    <div class="wrapper">-->
<!--      <HelloWorld msg="You did it!" />-->

<!--      <nav>-->
<!--        <RouterLink to="/">Home</RouterLink>-->
<!--        <RouterLink to="/about">About</RouterLink>-->
<!--      </nav>-->
<!--    </div>-->
<!--  </header>-->

<!--  <RouterView />-->
<!--</template>-->


<template>
  <q-layout view="hHh lpR fFf">
    <HeaderComponent />
    <q-page-container class="app-container column justify-between">
      <router-view />
      <FooterComponent />
    </q-page-container>    
  </q-layout>
</template>

<style scoped>
  .app-container {
    min-height: 100vh;
  }
</style>
