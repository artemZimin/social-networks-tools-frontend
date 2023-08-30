<script setup lang="ts">
import axios from "~/utils/axios";

const loading = ref(false);
const error = ref("");
const errors = ref({});
const email = ref("");
const password = ref("");

const token = useCookie('token')

const submitHandler = async () => {
  loading.value = true;
  errors.value = {}
  error.value = ''

  try {
    const response = await axios.post("/api/v1/auth", {
      email: email.value,
      password: password.value
    });

    const responseToken = response.data?.token

    if (responseToken) {
      token.value = responseToken.toString()
    } else {
      throw new Error('Something went wrong')
    }
  } catch (e) {
    const responseErrors = e?.response?.data?.errors;

    if (responseErrors) {
      password.value = ''
      errors.value = responseErrors;
    } else {
      error.value = e?.message ?? ''
    }

  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <v-container>
    <v-form @submit.prevent="submitHandler">
      <h1 class="text-h3 mb-3">Войти в систему</h1>
      <v-alert
        v-if="error"
        variant="outlined"
        type="error"
        prominent
        border="top"
      >
        {{ error }}
      </v-alert>
      <v-text-field v-model="email" :disabled="loading" variant="underlined" label="Email" :error="Boolean(errors.email)" :error-messages="errors.email" />
      <v-text-field v-model="password" :disabled="loading" variant="underlined" type="password" label="Пароль"
                    :error="Boolean(errors.password)" :error-messages="errors.password" />
      <div class="mt-3">
        <v-btn color="primary" :loading="loading" type="submit">Войти</v-btn>
        <NuxtLink href="/register">
          <v-btn color="primary" variant="text">
            Создать новый аккаунт
          </v-btn>
        </NuxtLink>
      </div>
    </v-form>
  </v-container>
</template>

<style scoped>

</style>