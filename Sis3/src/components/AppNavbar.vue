<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const router = useRouter()

function logout() {
  auth.logout()
  router.push({ name: 'home' })
}
</script>

<template>
  <nav class="nav">
    <div class="container links">
      <router-link to="/">Home</router-link>
      <router-link to="/products">Products</router-link>
      <router-link v-if="auth.isLoggedIn" to="/profile">Profile</router-link>
      <span class="spacer" />
      <button v-if="auth.isLoggedIn" class="btn ghost small" @click="logout">Log out</button>
      <router-link v-else to="/login" class="btn small">Log in</router-link>
    </div>
  </nav>
</template>

<style scoped>
.nav { background: var(--surface); border-bottom: 1px solid var(--line); }
.links { display: flex; align-items: center; gap: 1.25rem; padding-top: .6rem; padding-bottom: .6rem; }
.links a:not(.btn) { color: var(--ink); text-decoration: none; padding: .25rem 0; border-bottom: 2px solid transparent; }
.links a.router-link-active:not(.btn) { border-color: var(--brand); color: var(--brand); }
.spacer { flex: 1; }
</style>
