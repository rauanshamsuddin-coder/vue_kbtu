<script setup>
import { ref, computed, reactive, watch } from 'vue'
import { message } from 'ant-design-vue'
import { useFetch } from '../composables/useFetch'
import { getUsers, createUser, removeUser } from '../api'
import AsyncState from '../components/AsyncState.vue'

const { data, loading, error, execute } = useFetch(getUsers)

const students = ref([])
const search = ref('')
const modalOpen = ref(false)
const saving = ref(false)
const formRef = ref()
const form = reactive({ name: '', email: '', company: '', city: '' })

watch(data, (value) => {
  if (value) students.value = value
})

const rules = {
  name: [{ required: true, message: 'Enter a name' }],
  email: [
    { required: true, message: 'Enter an email' },
    { type: 'email', message: 'Enter a valid email' }
  ]
}

const columns = [
  { title: 'Name', dataIndex: 'name', sorter: (a, b) => a.name.localeCompare(b.name) },
  { title: 'Email', dataIndex: 'email' },
  { title: 'Company', key: 'company' },
  { title: 'City', key: 'city', sorter: (a, b) => (a.address?.city || '').localeCompare(b.address?.city || '') },
  { title: '', key: 'actions', width: 100 }
]

const filtered = computed(() => {
  const q = search.value.trim().toLowerCase()
  if (!q) return students.value
  return students.value.filter(
    (s) => s.name.toLowerCase().includes(q) || s.email.toLowerCase().includes(q)
  )
})

async function submit() {
  try {
    await formRef.value.validate()
  } catch {
    return
  }
  saving.value = true
  try {
    const response = await createUser({
      name: form.name,
      email: form.email,
      company: { name: form.company },
      address: { city: form.city }
    })
    students.value = [{ ...response.data, id: Date.now() }, ...students.value]
    message.success('Student added')
    modalOpen.value = false
    formRef.value.resetFields()
  } catch (e) {
    message.error(e.userMessage || 'Could not add the student')
  } finally {
    saving.value = false
  }
}

async function remove(id) {
  try {
    await removeUser(id)
    students.value = students.value.filter((s) => s.id !== id)
    message.success('Student removed')
  } catch (e) {
    message.error(e.userMessage || 'Could not remove the student')
  }
}
</script>

<template>
  <a-card>
    <div class="toolbar">
      <a-input-search v-model:value="search" placeholder="Search by name or email" allow-clear class="search" />
      <a-button type="primary" @click="modalOpen = true">Add student</a-button>
    </div>
    <AsyncState :loading="loading" :error="error" :empty="!loading && !error && !students.length" empty-text="No students yet" @retry="execute">
      <a-table :columns="columns" :data-source="filtered" row-key="id" :pagination="{ pageSize: 6 }" :scroll="{ x: 700 }">
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'name'">
            <a-avatar class="avatar">{{ record.name[0] }}</a-avatar>
            {{ record.name }}
          </template>
          <template v-else-if="column.key === 'company'">
            <a-tag color="blue">{{ record.company?.name }}</a-tag>
          </template>
          <template v-else-if="column.key === 'city'">
            {{ record.address?.city }}
          </template>
          <template v-else-if="column.key === 'actions'">
            <a-popconfirm title="Remove this student?" ok-text="Remove" cancel-text="Cancel" @confirm="remove(record.id)">
              <a-button type="link" danger>Remove</a-button>
            </a-popconfirm>
          </template>
        </template>
      </a-table>
    </AsyncState>
  </a-card>

  <a-modal v-model:open="modalOpen" title="Add student" ok-text="Save student" :confirm-loading="saving" @ok="submit">
    <a-form ref="formRef" :model="form" :rules="rules" layout="vertical">
      <a-form-item label="Name" name="name">
        <a-input v-model:value="form.name" />
      </a-form-item>
      <a-form-item label="Email" name="email">
        <a-input v-model:value="form.email" />
      </a-form-item>
      <a-form-item label="Company" name="company">
        <a-input v-model:value="form.company" />
      </a-form-item>
      <a-form-item label="City" name="city">
        <a-input v-model:value="form.city" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<style scoped>
.toolbar {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}
.search {
  max-width: 320px;
}
.avatar {
  margin-right: 8px;
  background: #1677ff;
}
</style>
