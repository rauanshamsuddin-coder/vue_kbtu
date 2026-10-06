<script>
import { PRIORITIES, STATUSES } from '../constants'

export default {
  name: 'TaskFilters',
  props: {
    search: { type: String, default: '' },
    status: { type: String, default: 'all' },
    priority: { type: String, default: 'all' },
  },
  // Работает с v-model:search, v-model:status, v-model:priority
  emits: ['update:search', 'update:status', 'update:priority', 'reset'],
  data() {
    return {
      statuses: STATUSES,
      priorities: [{ value: 'all', label: 'Любой' }, ...PRIORITIES],
    }
  },
  computed: {
    isFiltered() {
      return this.search !== '' || this.status !== 'all' || this.priority !== 'all'
    },
  },
}
</script>

<template>
  <div class="filters">
    <label class="field filters__search">
      <span class="field__label">Поиск по названию</span>
      <input
        class="input"
        type="search"
        placeholder="Начните вводить название"
        :value="search"
        @input="$emit('update:search', $event.target.value)"
      />
    </label>

    <label class="field">
      <span class="field__label">Статус</span>
      <select
        class="input"
        :value="status"
        @change="$emit('update:status', $event.target.value)"
      >
        <option v-for="s in statuses" :key="s.value" :value="s.value">
          {{ s.label }}
        </option>
      </select>
    </label>

    <label class="field">
      <span class="field__label">Приоритет</span>
      <select
        class="input"
        :value="priority"
        @change="$emit('update:priority', $event.target.value)"
      >
        <option v-for="p in priorities" :key="p.value" :value="p.value">
          {{ p.label }}
        </option>
      </select>
    </label>

    <BaseButton v-if="isFiltered" variant="ghost" @click="$emit('reset')">
      Сбросить
    </BaseButton>
  </div>
</template>
