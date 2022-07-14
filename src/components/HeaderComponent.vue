<script setup>
import UserAvatar from './UserAvatar.vue';
import HeaderNavigation from './HeaderNavigation.vue';

</script>

<template>
  <q-header elevated class="bg-white header row justify-between items-center">
    <router-link to="/">
      <img src="@/assets/logo-master-fronty.png"/>
    </router-link>
    <HeaderNavigation />
    <UserAvatar />
  </q-header>
</template>

<style scoped lang="scss">
  .header {
    min-height: 64px;
    padding: 0 24px;

    img {
      object-fit: cover;
      width: 100px;
      height: 100%;
    }
  }
</style>