<script setup>
  import { ref } from "@vue/reactivity";
  import { onBeforeMount, onBeforeUnmount } from "@vue/runtime-core";
  import { onBeforeRouteLeave, useRouter } from "vue-router";
  
  const router = useRouter();
  const props = defineProps({
    preventPageLeave: Boolean
  });
  const showDialog = ref(false);
  const nextRouterLocation = ref(null);
  const pathLeaveConfirmed = ref(false);

  onBeforeRouteLeave((to, from) => {
    if(!props.preventPageLeave || pathLeaveConfirmed.value) return true;
    nextRouterLocation.value = to.fullPath;
    showDialog.value = true;
    return false;
  });

  const handlePageReload = event => {
    if (!props.preventPageLeave) return;
    event.preventDefault();
    event.returnValue = "";
  };

  onBeforeMount(() => {
    window.addEventListener('beforeunload', handlePageReload); 
  });

  onBeforeUnmount(() => {
    window.removeEventListener('beforeunload', handlePageReload);
  });

  const handleNoClick = () => {
    showDialog.value = false;
  };

  const handleYesClick = () => {
    showDialog.value = false;
    pathLeaveConfirmed.value = true;
    router.push(nextRouterLocation.value);
  }; 
</script>

<template>
  <q-dialog v-model="showDialog" persistent>
    <q-card class="dialog-card">     

      <q-card-section class="row items-center q-pl-lg">  
        <h5 class="q-mt-xs q-mb-md">Warning</h5>      
        <span class="caption">You have not finished quiz. Current result will be lost. Do you want to proceed anyway?</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="No" color="primary" @click="handleNoClick" />
        <q-btn flat label="Yes" color="primary" @click="handleYesClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped lang="scss">
  .dialog-card {
    border-radius: 10px;
    .caption {
      font-size: 16px;
    }
  }
</style>