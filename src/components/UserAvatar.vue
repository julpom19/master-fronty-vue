<script setup>
import { useUserStore } from "@/stores/user.store";
import { signOutUser } from "@/utils/firebase/firebase-auth.utils";
import { computed } from "@vue/runtime-core";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

  const router = useRouter();

  const userStore = useUserStore();
  const { currentUser } = storeToRefs(userStore);

  const userName = computed(() => {
    const name = currentUser?.value.displayName;
    return name ? 
      `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`
      : '';
  });
      

  const signOutHandler = async () => {
    await signOutUser();
  };
  
  const signInHandler = async () => {
    router.push('/auth');
  };

  const navigateToQuizResultsPage = () => {
    router.push('/quiz-results');
  };

  const settings = [
    {
      title: 'Quiz Results',
      onClickHandler: navigateToQuizResultsPage,
    },{
      title: 'Logout',
      onClickHandler: signOutHandler,
    }];
</script>

<template>
  <q-btn v-if="currentUser" round>
    <q-avatar color="blue-2" size="lg">
      {{ userName }}
      <q-menu
          anchor="bottom middle" 
          self="top end"
          :offset="[0, 5]"
        >
          <q-list style="min-width: 100px">
            <q-item 
              v-for="setting in settings" 
              :key="setting.title" 
              @click="setting.onClickHandler"
              clickable 
              v-close-popup 
            >
              <q-item-section>{{ setting.title }}</q-item-section>
            </q-item>            
          </q-list>
        </q-menu>
    </q-avatar>
  </q-btn>
  <q-btn v-else color="primary" outline rounded @click="signInHandler">
    LOG IN
  </q-btn>
</template>