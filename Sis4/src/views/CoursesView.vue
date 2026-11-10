<script setup>
import { ref, computed } from 'vue'
import { useFetch } from '../composables/useFetch'
import { getCourses } from '../api'
import AsyncState from '../components/AsyncState.vue'

const { data, loading, error, execute } = useFetch(getCourses)

const instructor = ref(null)
const page = ref(1)
const pageSize = 6

const instructors = computed(() => {
  const ids = [...new Set((data.value || []).map((c) => c.userId))]
  return ids.map((id) => ({ value: id, label: `Instructor ${id}` }))
})

const filtered = computed(() => {
  const list = data.value || []
  return instructor.value ? list.filter((c) => c.userId === instructor.value) : list
})

const visible = computed(() => filtered.value.slice((page.value - 1) * pageSize, page.value * pageSize))

function onFilter() {
  page.value = 1
}
</script>

<template>
  <div class="toolbar">
    <a-select
      v-model:value="instructor"
      :options="instructors"
      placeholder="All instructors"
      allow-clear
      class="select"
      @change="onFilter"
    />
  </div>
  <AsyncState :loading="loading" :error="error" :empty="!loading && !error && !filtered.length" empty-text="No courses found" @retry="execute">
    <a-row :gutter="[16, 16]">
      <a-col v-for="course in visible" :key="course.id" :xs="24" :md="12" :xl="8">
        <a-card :title="`Course ${course.id}`" size="small" class="course">
          <h3 class="name">{{ course.title }}</h3>
          <p class="text">{{ course.body }}</p>
          <a-tag color="geekblue">Instructor {{ course.userId }}</a-tag>
        </a-card>
      </a-col>
    </a-row>
    <a-pagination v-model:current="page" :total="filtered.length" :page-size="pageSize" show-less-items class="pager" />
  </AsyncState>
</template>

<style scoped>
.toolbar {
  margin-bottom: 16px;
}
.select {
  width: 220px;
}
.course {
  height: 100%;
}
.name {
  margin: 0 0 8px;
  font-size: 15px;
  text-transform: capitalize;
}
.text {
  color: rgba(0, 0, 0, 0.65);
}
.pager {
  margin-top: 24px;
  text-align: center;
}
</style>
