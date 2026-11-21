<script setup>
import { useTaskFilters } from '../composables/useTaskFilters'

const { filter, search, filterOptions, resetFilters } = useTaskFilters()
</script>

<template>
  <a-space wrap style="margin-bottom: 16px">
    <a-input-search v-model:value="search" placeholder="Поиск по названию" allow-clear style="width: 240px" />
    <a-radio-group v-model:value="filter" :options="filterOptions" option-type="button" />
    <a-button type="link" @click="resetFilters">Сбросить</a-button>
  </a-space>
</template>
