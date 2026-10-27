<template>
  <div class="wrap" role="status" aria-live="polite">
    <div class="spinner" />
    <p class="muted">Loading…</p>
  </div>
</template>

<style scoped>
.wrap { display: grid; place-items: center; padding: 3rem 0; }
.spinner { width: 36px; height: 36px; border: 4px solid var(--line); border-top-color: var(--brand); border-radius: 50%; animation: spin .8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
@media (prefers-reduced-motion: reduce) { .spinner { animation-duration: 3s; } }
</style>
