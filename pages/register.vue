<script setup lang="ts">
import axios from "~/utils/axios";

const loading = ref(false);
const error = ref("");
const errors = ref({});
const name = ref("");
const email = ref("");
const password = ref("");

const submitHandler = async () => {
  loading.value = true;
  errors.value = {};
  error.value = "";

  try {
    const response = await axios.post("/api/v1/register", {
      name: name.value,
      email: email.value,
      password: password.value
    });

    navigateTo('login')
  } catch (e) {
    const responseErrors = e?.response?.data?.errors;

    if (responseErrors) {
      errors.value = responseErrors;
    } else {
      error.value = e?.message ?? "";
    }

  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <v-container>
    <v-form @submit.prevent="submitHandler">
      <h1 class="text-h3 mb-3">Создать новый аккаунт</h1>
      <v-alert
        v-if="error"
        variant="outlined"
        type="error"
        prominent
        border="top"
      >
        {{ error }}
      </v-alert>
      <v-text-field v-model="name" :disabled="loading" variant="underlined" label="Имя" :error="Boolean(errors.name)"
                    :error-messages="errors.name" />
      <v-text-field v-model="email" :disabled="loading" variant="underlined" label="Email"
                    :error="Boolean(errors.email)" :error-messages="errors.email" />
      <v-text-field v-model="password" :disabled="loading" variant="underlined" type="password" label="Пароль"
                    :error="Boolean(errors.password)" :error-messages="errors.password" />
      <div class="mt-3">
        <v-btn color="primary" :loading="loading" type="submit">Регистрация</v-btn>
        <NuxtLink href="/login">
          <v-btn color="primary" variant="text">
            Войти в существующий аккаунт
          </v-btn>
        </NuxtLink>
      </div>
    </v-form>
  </v-container>
</template>

<style scoped>

</style>