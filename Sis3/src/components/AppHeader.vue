<script setup>
import { useAuthStore } from '@/stores/auth'
const auth = useAuthStore()
</script>

<template>
  <header class="header">
    <div class="container bar">
      <router-link to="/" class="logo">ShopVue</router-link>
      <span class="who">{{ auth.isLoggedIn ? `Signed in as ${auth.user?.username}` : 'Browsing as guest' }}</span>
    </div>
  </header>
</template>

<style scoped>
.header { background: var(--ink); color: #fff; }
.bar { display: flex; justify-content: space-between; align-items: center; padding-top: .75rem; padding-bottom: .75rem; }
.logo { color: #fff; font-size: 1.4rem; font-weight: 700; text-decoration: none; }
.who { color: #b8cad5; font-size: .9rem; }
</style>
