<script>
export default {
  name: 'TaskStats',
  props: {
    total: { type: Number, required: true },
    active: { type: Number, required: true },
    completed: { type: Number, required: true },
  },
  computed: {
    // Доля выполненных задач для полосы прогресса
    percent() {
      return this.total === 0 ? 0 : Math.round((this.completed / this.total) * 100)
    },
  },
}
</script>

<template>
  <div>
    <dl class="stats">
      <div class="stats__item">
        <dt>Всего</dt>
        <dd>{{ total }}</dd>
      </div>
      <div class="stats__item">
        <dt>Активные</dt>
        <dd>{{ active }}</dd>
      </div>
      <div class="stats__item">
        <dt>Выполненные</dt>
        <dd>{{ completed }}</dd>
      </div>
    </dl>
    <div
      class="progress"
      role="progressbar"
      :aria-valuenow="percent"
      aria-valuemin="0"
      aria-valuemax="100"
    >
      <div class="progress__bar" :style="{ width: percent + '%' }"></div>
    </div>
    <p class="muted">Выполнено {{ percent }}%</p>
  </div>
</template>
