<script setup>
import { computed } from 'vue'
import { useFetch } from '../composables/useFetch'
import { getUsers, getCourses, getAssignments } from '../api'
import AsyncState from '../components/AsyncState.vue'

const { data, loading, error, execute } = useFetch(async () => {
  const [users, courses, assignments] = await Promise.all([
    getUsers(),
    getCourses(),
    getAssignments()
  ])
  return {
    data: {
      users: users.data,
      courses: courses.data,
      assignments: assignments.data
    }
  }
})

const done = computed(() => data.value?.assignments.filter((a) => a.completed).length ?? 0)
const total = computed(() => data.value?.assignments.length ?? 0)
const percent = computed(() => (total.value ? Math.round((done.value / total.value) * 100) : 0))
const recent = computed(() => data.value?.assignments.slice(0, 6) ?? [])
</script>

<template>
  <AsyncState :loading="loading" :error="error" @retry="execute">
    <template v-if="data">
      <a-row :gutter="[16, 16]">
        <a-col :xs="24" :md="8">
          <a-card>
            <a-statistic title="Students" :value="data.users.length" />
          </a-card>
        </a-col>
        <a-col :xs="24" :md="8">
          <a-card>
            <a-statistic title="Courses" :value="data.courses.length" />
          </a-card>
        </a-col>
        <a-col :xs="24" :md="8">
          <a-card>
            <a-statistic title="Assignments" :value="total" />
          </a-card>
        </a-col>
        <a-col :xs="24" :md="10">
          <a-card title="Completion">
            <div class="center">
              <a-progress type="circle" :percent="percent" />
            </div>
            <p class="note">{{ done }} of {{ total }} assignments completed</p>
          </a-card>
        </a-col>
        <a-col :xs="24" :md="14">
          <a-card title="Recent assignments">
            <a-list :data-source="recent" size="small">
              <template #renderItem="{ item }">
                <a-list-item>
                  <span>{{ item.title }}</span>
                  <a-tag :color="item.completed ? 'green' : 'orange'">
                    {{ item.completed ? 'Done' : 'Pending' }}
                  </a-tag>
                </a-list-item>
              </template>
            </a-list>
          </a-card>
        </a-col>
      </a-row>
    </template>
  </AsyncState>
</template>

<style scoped>
.center {
  display: flex;
  justify-content: center;
}
.note {
  text-align: center;
  margin: 16px 0 0;
}
</style>
