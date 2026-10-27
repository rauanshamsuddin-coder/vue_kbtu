<script setup>
defineProps({ message: { type: String, default: 'Something went wrong.' } })
defineEmits(['retry'])
</script>

<template>
  <div class="error" role="alert">
    <p><strong>Could not load the data.</strong> {{ message }}</p>
    <button class="btn small" @click="$emit('retry')">Try again</button>
  </div>
</template>

<style scoped>
.error { background: #fdeceb; border: 1px solid #f1b9b5; color: var(--danger); padding: 1rem; border-radius: 8px; }
.error p { margin: 0 0 .5rem; }
</style>
