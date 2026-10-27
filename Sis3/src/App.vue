<script setup>
import AppHeader from '@/components/AppHeader.vue'
import AppNavbar from '@/components/AppNavbar.vue'
</script>

<template>
  <AppHeader />
  <AppNavbar />
  <main class="container">
    <router-view v-slot="{ Component }">
      <Suspense>
        <component :is="Component" />
        <template #fallback><p class="muted">Loading page…</p></template>
      </Suspense>
    </router-view>
  </main>
</template>
