<script>
import { PRIORITIES } from '../constants'

// Переиспользуемый компонент одной задачи.
// Данные приходят через props, действия уходят родителю через события.
export default {
  name: 'TaskItem',
  props: {
    task: { type: Object, required: true },
  },
  emits: ['toggle', 'delete', 'update', 'change-priority'],
  data() {
    return {
      editing: false,
      draftTitle: '',
      draftDescription: '',
      priorities: PRIORITIES,
    }
  },
  computed: {
    createdLabel() {
      return new Date(this.task.createdAt).toLocaleString('ru-RU', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    },
    statusLabel() {
      return this.task.completed ? 'Выполнена' : 'Активна'
    },
    priorityLabel() {
      return this.priorities.find((p) => p.value === this.task.priority)?.label
    },
    canSave() {
      return this.draftTitle.trim().length > 0
    },
  },
  methods: {
    startEdit() {
      this.draftTitle = this.task.title
      this.draftDescription = this.task.description
      this.editing = true
      this.$nextTick(() => this.$refs.titleInput?.focus())
    },
    cancelEdit() {
      this.editing = false
    },
    save() {
      if (!this.canSave) return
      this.$emit('update', this.task.id, {
        title: this.draftTitle.trim(),
        description: this.draftDescription.trim(),
      })
      this.editing = false
    },
    onPriorityChange(event) {
      this.$emit('change-priority', this.task.id, event.target.value)
    },
  },
}
</script>

<template>
  <article
    class="task"
    :class="[`task--${task.priority}`, { 'task--done': task.completed }]"
  >
    <!-- Режим просмотра -->
    <template v-if="!editing">
      <header class="task__head">
        <h3 class="task__title">{{ task.title }}</h3>
        <BaseBadge :tone="task.completed ? 'done' : 'active'">
          {{ statusLabel }}
        </BaseBadge>
      </header>

      <p v-if="task.description" class="task__desc">{{ task.description }}</p>
      <p v-else class="task__desc muted">Без описания</p>

      <p class="task__meta muted">Создана: {{ createdLabel }}</p>

      <div class="task__footer">
        <label class="task__priority">
          <span>Приоритет</span>
          <select
            class="input input--compact"
            :value="task.priority"
            :aria-label="`Приоритет: ${priorityLabel}`"
            @change="onPriorityChange"
          >
            <option v-for="p in priorities" :key="p.value" :value="p.value">
              {{ p.label }}
            </option>
          </select>
        </label>

        <div class="task__actions">
          <BaseButton small @click="$emit('toggle', task.id)">
            {{ task.completed ? 'Вернуть в работу' : 'Выполнить' }}
          </BaseButton>
          <BaseButton small variant="ghost" @click="startEdit">Изменить</BaseButton>
          <BaseButton small variant="danger" @click="$emit('delete', task.id)">
            Удалить
          </BaseButton>
        </div>
      </div>
    </template>

    <!-- Режим редактирования -->
    <form v-else class="form" @submit.prevent="save" @keydown.esc="cancelEdit">
      <label class="field">
        <span class="field__label">Название</span>
        <input
          ref="titleInput"
          v-model="draftTitle"
          class="input"
          type="text"
          maxlength="80"
        />
      </label>
      <label class="field">
        <span class="field__label">Описание</span>
        <textarea
          v-model="draftDescription"
          class="input"
          rows="3"
          maxlength="300"
        ></textarea>
      </label>
      <div class="task__actions">
        <BaseButton type="submit" small :disabled="!canSave">Сохранить</BaseButton>
        <BaseButton type="button" small variant="ghost" @click="cancelEdit">
          Отмена
        </BaseButton>
      </div>
    </form>
  </article>
</template>
