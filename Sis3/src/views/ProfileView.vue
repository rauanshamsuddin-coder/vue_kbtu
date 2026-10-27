<script setup>
import { ref, onMounted } from 'vue'
import { getMe } from '@/api/auth'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'

const me = ref(null)
const loading = ref(false)
const error = ref(null)

async function load() {
  loading.value = true
  error.value = null
  try {
    me.value = (await getMe()).data
  } catch (e) {
    error.value = e.userMessage
  } finally {
    loading.value = false
  }
}
onMounted(load)
</script>

<template>
  <h1>Profile</h1>
  <LoadingSpinner v-if="loading" />
  <ErrorMessage v-else-if="error" :message="error" @retry="load" />
  <section v-else-if="me" class="profile">
    <img :src="me.image" :alt="me.username" />
    <div>
      <h2>{{ me.firstName }} {{ me.lastName }}</h2>
      <p class="muted">@{{ me.username }}</p>
      <p>Email: {{ me.email }}</p>
      <p>Phone: {{ me.phone }}</p>
      <p>Location: {{ me.address?.city }}, {{ me.address?.country }}</p>
    </div>
  </section>
</template>

<style scoped>
.profile { display: flex; gap: 1.5rem; align-items: center; background: #fff; padding: 1.5rem; border: 1px solid var(--line); border-radius: 10px; flex-wrap: wrap; }
.profile img { width: 110px; height: 110px; border-radius: 50%; background: #e8eef2; }
.profile p { margin: .2rem 0; }
</style>
