<script setup>
import { ref, computed, watch } from 'vue'
import { message } from 'ant-design-vue'
import { useFetch } from '../composables/useFetch'
import { getAssignments, updateAssignment } from '../api'
import AsyncState from '../components/AsyncState.vue'

const { data, loading, error, execute } = useFetch(getAssignments)

const items = ref([])
const filter = ref('all')
const pendingId = ref(null)

watch(data, (value) => {
  if (value) items.value = value
})

const options = [
  { label: 'All', value: 'all' },
  { label: 'Done', value: 'done' },
  { label: 'Pending', value: 'pending' }
]

const columns = [
  { title: 'Assignment', dataIndex: 'title' },
  { title: 'Student', dataIndex: 'userId', width: 120 },
  { title: 'Status', key: 'status', width: 140 },
  { title: 'Done', key: 'toggle', width: 100 }
]

const filtered = computed(() => {
  if (filter.value === 'done') return items.value.filter((i) => i.completed)
  if (filter.value === 'pending') return items.value.filter((i) => !i.completed)
  return items.value
})

async function toggle(record, checked) {
  pendingId.value = record.id
  try {
    await updateAssignment(record.id, checked)
    record.completed = checked
    message.success(checked ? 'Marked as done' : 'Marked as pending')
  } catch (e) {
    message.error(e.userMessage || 'Could not update the assignment')
  } finally {
    pendingId.value = null
  }
}
</script>

<template>
  <a-card>
    <div class="toolbar">
      <a-segmented v-model:value="filter" :options="options" />
    </div>
    <AsyncState :loading="loading" :error="error" :empty="!loading && !error && !items.length" empty-text="No assignments yet" @retry="execute">
      <a-table :columns="columns" :data-source="filtered" row-key="id" :pagination="{ pageSize: 8 }" :scroll="{ x: 600 }">
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'userId'">
            Student {{ record.userId }}
          </template>
          <template v-else-if="column.key === 'status'">
            <a-tag :color="record.completed ? 'green' : 'orange'">
              {{ record.completed ? 'Done' : 'Pending' }}
            </a-tag>
          </template>
          <template v-else-if="column.key === 'toggle'">
            <a-switch :checked="record.completed" :loading="pendingId === record.id" @change="(checked) => toggle(record, checked)" />
          </template>
        </template>
      </a-table>
    </AsyncState>
  </a-card>
</template>

<style scoped>
.toolbar {
  margin-bottom: 16px;
}
</style>
