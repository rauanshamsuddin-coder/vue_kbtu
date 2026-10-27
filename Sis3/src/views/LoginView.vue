<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const route = useRoute()
const router = useRouter()

const username = ref('emilys')
const password = ref('emilyspass')
const loading = ref(false)
const error = ref(null)

async function submit() {
  loading.value = true
  error.value = null
  try {
    await auth.login(username.value, password.value)
    router.push(route.query.redirect || { name: 'home' })
  } catch (e) {
    error.value = e.userMessage
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <section class="box">
    <h1>Log in</h1>
    <p class="muted">Demo account is filled in for you (DummyJSON).</p>
    <form @submit.prevent="submit">
      <label>Username <input v-model.trim="username" autocomplete="username" required /></label>
      <label>Password <input v-model="password" type="password" autocomplete="current-password" required /></label>
      <p v-if="error" class="err" role="alert">{{ error }}</p>
      <button class="btn" :disabled="loading">{{ loading ? 'Logging in…' : 'Log in' }}</button>
    </form>
  </section>
</template>

<style scoped>
.box { max-width: 380px; margin: 2rem auto; background: #fff; padding: 1.5rem; border: 1px solid var(--line); border-radius: 10px; }
.err { color: var(--danger); }
</style>
