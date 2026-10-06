<script>
// Глобальный компонент-метка (статус, приоритет). Текст — через слот.
export default {
  name: 'BaseBadge',
  props: {
    tone: { type: String, default: 'neutral' },
  },
}
</script>

<template>
  <span class="badge" :class="`badge--${tone}`">
    <slot />
  </span>
</template>
