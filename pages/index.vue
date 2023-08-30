<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
});
const { data: pageData } = await useFetch('/api/routes/home')

</script>

<template>
    <h1>User: {{ pageData.user.name }}</h1>
</template>

<style scoped>

</style>