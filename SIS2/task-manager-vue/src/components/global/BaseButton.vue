<script>
// Глобальный компонент-кнопка. Содержимое передаётся через слот.
export default {
  name: 'BaseButton',
  props: {
    variant: {
      type: String,
      default: 'primary',
      validator: (value) => ['primary', 'ghost', 'danger'].includes(value),
    },
    small: { type: Boolean, default: false },
  },
}
</script>

<template>
  <button class="btn" :class="[`btn--${variant}`, { 'btn--small': small }]">
    <slot />
  </button>
</template>
