<script>
import { PRIORITIES } from '../constants'

export default {
  name: 'TaskForm',
  // Пользовательское событие: родитель получает данные новой задачи
  emits: ['add'],
  data() {
    return {
      title: '',
      description: '',
      priority: 'medium',
      error: '',
      priorities: PRIORITIES,
    }
  },
  methods: {
    submit() {
      const title = this.title.trim()
      if (!title) {
        this.error = 'Введите название задачи'
        this.$refs.titleInput.focus()
        return
      }
      this.$emit('add', {
        title,
        description: this.description.trim(),
        priority: this.priority,
      })
      this.title = ''
      this.description = ''
      this.priority = 'medium'
      this.error = ''
    },
  },
  watch: {
    // Убираем сообщение об ошибке, как только пользователь начал вводить название
    title(value) {
      if (value.trim()) this.error = ''
    },
  },
}
</script>

<template>
  <form class="form" @submit.prevent="submit" novalidate>
    <label class="field">
      <span class="field__label">Название</span>
      <input
        ref="titleInput"
        v-model="title"
        class="input"
        :class="{ 'input--error': error }"
        type="text"
        maxlength="80"
        placeholder="Например, сдать SIS 2"
      />
      <span v-if="error" class="field__error" role="alert">{{ error }}</span>
    </label>

    <label class="field">
      <span class="field__label">Описание</span>
      <textarea
        v-model="description"
        class="input"
        rows="3"
        maxlength="300"
        placeholder="Что нужно сделать"
      ></textarea>
    </label>

    <label class="field">
      <span class="field__label">Приоритет</span>
      <select v-model="priority" class="input">
        <option v-for="p in priorities" :key="p.value" :value="p.value">
          {{ p.label }}
        </option>
      </select>
    </label>

    <BaseButton type="submit">Добавить задачу</BaseButton>
  </form>
</template>
