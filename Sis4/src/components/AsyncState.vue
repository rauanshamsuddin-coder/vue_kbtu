<script setup>
defineProps({
  loading: Boolean,
  error: String,
  empty: Boolean,
  emptyText: { type: String, default: 'Nothing to show yet' }
})
defineEmits(['retry'])
</script>

<template>
  <div v-if="loading" class="state">
    <a-spin size="large" tip="Loading" />
  </div>
  <a-result v-else-if="error" status="error" title="Could not load data" :sub-title="error">
    <template #extra>
      <a-button type="primary" @click="$emit('retry')">Retry</a-button>
    </template>
  </a-result>
  <a-empty v-else-if="empty" :description="emptyText" class="state" />
  <slot v-else />
</template>

<style scoped>
.state {
  display: flex;
  justify-content: center;
  padding: 64px 0;
}
</style>
