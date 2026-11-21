<script setup>
import { useTaskForm } from '../composables/useTaskForm'

const { form, rules, priorityOptions, submit } = useTaskForm()
</script>

<template>
  <a-card title="Новая задача">
    <a-form :model="form" :rules="rules" layout="vertical" @finish="submit">
      <a-form-item label="Название" name="title">
        <a-input v-model:value="form.title" placeholder="Что нужно сделать?" />
      </a-form-item>
      <a-form-item label="Описание" name="description">
        <a-textarea v-model:value="form.description" :rows="3" />
      </a-form-item>
      <a-row :gutter="12">
        <a-col :span="12">
          <a-form-item label="Приоритет" name="priority">
            <a-select v-model:value="form.priority" :options="priorityOptions" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="Срок" name="dueDate">
            <a-date-picker v-model:value="form.dueDate" value-format="YYYY-MM-DD" style="width: 100%" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-button type="primary" html-type="submit" block>Добавить задачу</a-button>
    </a-form>
  </a-card>
</template>
