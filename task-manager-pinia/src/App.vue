<script setup>
import ruRU from 'ant-design-vue/es/locale/ru_RU'
import TaskForm from './components/TaskForm.vue'
import TaskStats from './components/TaskStats.vue'
import TaskFilters from './components/TaskFilters.vue'
import TaskList from './components/TaskList.vue'
</script>

<template>
  <a-config-provider :locale="ruRU">
    <a-layout style="min-height: 100vh">
      <a-layout-header style="color: #fff; font-size: 18px">Task Manager</a-layout-header>
      <a-layout-content style="padding: 24px; max-width: 1100px; width: 100%; margin: 0 auto">
        <a-row :gutter="24">
          <a-col :xs="24" :md="9"><TaskForm /></a-col>
          <a-col :xs="24" :md="15">
            <TaskStats />
            <TaskFilters />
            <TaskList />
          </a-col>
        </a-row>
      </a-layout-content>
    </a-layout>
  </a-config-provider>
</template>
