<script setup>
  import { createAuthUserWithEmailAndPassword } from "@/utils/firebase/firebase-auth.utils";
import { createUserDocumentFromAuth } from "@/utils/firebase/firebase-store.utils";
import { reactive, ref } from "@vue/reactivity";
  import { useRouter } from "vue-router";
  import PasswordInput from "./PasswordInput.vue";

  const router = useRouter();
  const props = defineProps({
    redirectLocation: String
  });
  const formFields = reactive({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  let errorMsg = ref(null);

  const handlePasswordOnChange = (passwordValue, passwordKey) => {
    formFields[passwordKey] = passwordValue;
  } 

  const resetFormFields = () => {
    formFields.email = '';
    formFielsd.password = '';
  }

  const submitHandler = async (event) => {
    event.preventDefault();

    if(formFields.password !== formFields.confirmPassword) {
      errorMsg.value = 'Password confirmation error';
      return;
    }

    try {
      const { user: userAuth } = await createAuthUserWithEmailAndPassword(formFields.email, formFields.password);
      const user = {
        ...userAuth,
        displayName: formFields.displayName
      }
      await createUserDocumentFromAuth(user);
      redirect();
    } catch (error) {
      switch(error.code) {
        case 'auth/email-already-in-use':
          errorMsg.value = 'This email is already in use';
          break;
        default:
          errorMsg.value = 'Can not register user. Please, try later';
      }
      console.log('Error with user\'s sign up', error);
    }
  };

  const redirect = () => {
    // router.push(props.redirectLocation);
  }
</script>

<template>
  <q-card class="auth-card">
    <h6 class="auth-card-header text-h6">Sign up with your email and password</h6>
    <q-form @submit="submitHandler">
    <q-input 
        label="Display name *" 
        v-model="formFields.displayName"        
        :rules="[val => !!val || 'Name is required']"
        outlined 
      />
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
        label="Password *" 
        name="password"
      />
      <PasswordInput 
        :password="formFields.confirmPassword" 
        @password-on-change="handlePasswordOnChange"
        label="Confirm Password *" 
        name="confirmPassword"
      />
      <q-chip v-if="errorMsg" class="q-mb-md full-width" outline square color="red" text-color="white" icon="error" :label="errorMsg" />
      <div class="row justify-end">
        <q-btn color="primary" outline rounded type="submit">
          Sign up
        </q-btn>
      </div>      
    </q-form>
  </q-card>
</template>
