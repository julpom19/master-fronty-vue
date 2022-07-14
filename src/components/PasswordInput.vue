<script setup>
import { ref } from "@vue/reactivity";
import { watch } from "@vue/runtime-core";

  const props = defineProps({
    password: String,
    label: {
      type: String,
      default: 'Password *'
    },
    name: {
      type: String,
      default: 'password'
    }
  });
  const emit = defineEmits(['passwordOnChange']);
  let isPassword = ref(true);  
  let password = ref(props.password);

  watch(password, () => {
    emit('passwordOnChange', password.value, props.name);
  }); 

</script>

<template>
  <q-input 
    :label="label" 
    v-model="password"
    :rules="[val => !!val || 'Password is required', val => val.length >= 6 || 'Password needs to be at least 6 characters long']"
    :type="isPassword ? 'password' : 'text'" 
    outlined   
  >
    <template v-slot:append>
      <q-icon
        :name="isPassword ? 'visibility_off' : 'visibility'"
        class="cursor-pointer"
        @click="isPassword = !isPassword"
      />
    </template>
  </q-input>
</template>