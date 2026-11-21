<script setup>
import { storeToRefs } from 'pinia'
import { useTasksStore } from '../stores/tasks'

const store = useTasksStore()
const { total, activeCount, doneCount, progress } = storeToRefs(store)
</script>

<template>
  <a-card style="margin-bottom: 16px">
    <a-row :gutter="16">
      <a-col :span="8"><a-statistic title="Всего" :value="total" /></a-col>
      <a-col :span="8"><a-statistic title="Активные" :value="activeCount" /></a-col>
      <a-col :span="8"><a-statistic title="Выполнено" :value="doneCount" /></a-col>
    </a-row>
    <a-progress :percent="progress" style="margin-top: 12px" />
  </a-card>
</template>
