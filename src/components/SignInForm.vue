<script setup>
import { signInUserWithEmailAndPassword, signInWithGooglePopup } from "@/utils/firebase/firebase-auth.utils";
import { reactive, ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
import PasswordInput from "./PasswordInput.vue";

  const router = useRouter();
  const props = defineProps({
    redirectLocation: String
  });
  const formFields = reactive({
    email: '',
    password: ''
  });
  let errorMsg = ref(null);

  const handlePasswordOnChange = (passwordNew) => {
    formFields.password = passwordNew;
  } 

  const resetFormFields = () => {
    formFields.email = '';
    formFielsd.password = '';
  }

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      await signInUserWithEmailAndPassword(formFields.email, formFields.password);
      redirect();
    } catch (error) {
      switch(error.code) {
        case 'auth/wrong-password':
          errorMsg.value = `Password doesn't match to email`;
          break;
        case 'auth/user-not-found':
          errorMsg.value = 'A user with this email does not exist';
          break;
        default:
          console.error(error);
      }
    }
  };

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
    redirect();
  };

  const redirect = () => {
    router.push(props.redirectLocation);
  }
</script>

<template>
  <q-card class="auth-card">
    <h6 class="auth-card-header text-h6">Sign in with your email and password</h6>
    <q-form @submit="submitHandler">
      <q-input 
        label="Email *" 
        v-model="formFields.email"        
        type="email"
        :rules="[val => !!val || 'Email is required']"
        outlined 
      />
      <PasswordInput 
        :password="formFields.password" 
        @password-on-change="handlePasswordOnChange" 
      />
      <q-chip v-if="errorMsg" class="q-mb-md full-width" outline square color="red" text-color="white" icon="error" :label="errorMsg" />
      <div class="row justify-between">
        <q-btn color="primary" outline rounded @click="signInWithGoogle">
          Log in with Google
        </q-btn>
        <q-btn color="primary" outline rounded type="submit">
          Log in
        </q-btn>
      </div>
    </q-form>
  </q-card>
</template>