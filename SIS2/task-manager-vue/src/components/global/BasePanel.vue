<script>
// Глобальный компонент-контейнер с именованным слотом "title" и слотом по умолчанию.
export default {
  name: 'BasePanel',
}
</script>

<template>
  <section class="panel">
    <h2 v-if="$slots.title" class="panel__title">
      <slot name="title" />
    </h2>
    <slot />
  </section>
</template>
