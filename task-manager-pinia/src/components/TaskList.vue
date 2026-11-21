<script setup>
import { storeToRefs } from 'pinia'
import { useTasksStore } from '../stores/tasks'
import { useTaskItem } from '../composables/useTaskItem'

const store = useTasksStore()
const { filteredTasks, doneCount } = storeToRefs(store)
const { priorityInfo, isOverdue, rename, remove, toggle } = useTaskItem()
</script>

<template>
  <a-list :data-source="filteredTasks" bordered item-layout="horizontal">
    <template #header>
      <a-flex justify="space-between" align="center">
        <span>Задачи ({{ filteredTasks.length }})</span>
        <a-button size="small" :disabled="!doneCount" @click="store.clearCompleted()">
          Очистить выполненные
        </a-button>
      </a-flex>
    </template>
    <template #renderItem="{ item }">
      <a-list-item>
        <a-list-item-meta>
          <template #avatar>
            <a-checkbox :checked="item.done" @change="toggle(item.id)" />
          </template>
          <template #title>
            <a-typography-text
              :delete="item.done"
              :editable="{ onChange: (t) => rename(item, t) }"
              :content="item.title"
            />
          </template>
          <template #description>{{ item.description || 'Без описания' }}</template>
        </a-list-item-meta>
        <a-space>
          <a-tag :color="priorityInfo(item.priority).color">{{ priorityInfo(item.priority).label }}</a-tag>
          <a-tag v-if="item.dueDate" :color="isOverdue(item) ? 'red' : 'blue'">{{ item.dueDate }}</a-tag>
          <a-popconfirm title="Удалить задачу?" ok-text="Да" cancel-text="Нет" @confirm="remove(item)">
            <a-button type="text" danger>Удалить</a-button>
          </a-popconfirm>
        </a-space>
      </a-list-item>
    </template>
    <template #footer v-if="!filteredTasks.length">
      <a-empty description="Задач нет — добавьте первую" />
    </template>
  </a-list>
</template>
