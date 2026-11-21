import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useLocalStorage } from '../composables/useLocalStorage'

export const useTasksStore = defineStore('tasks', () => {
  // ---- state ----
  const tasks = useLocalStorage('tasks', [])
  const filter = ref('all') // all | active | done
  const search = ref('')

  // ---- getters ----
  const total = computed(() => tasks.value.length)
  const doneCount = computed(() => tasks.value.filter((t) => t.done).length)
  const activeCount = computed(() => total.value - doneCount.value)
  const progress = computed(() =>
    total.value ? Math.round((doneCount.value / total.value) * 100) : 0
  )

  const filteredTasks = computed(() => {
    const q = search.value.trim().toLowerCase()
    return tasks.value
      .filter((t) => {
        if (filter.value === 'active' && t.done) return false
        if (filter.value === 'done' && !t.done) return false
        return t.title.toLowerCase().includes(q)
      })
      .sort((a, b) => b.createdAt - a.createdAt)
  })

  // ---- actions ----
  function addTask({ title, description = '', priority = 'medium', dueDate = null }) {
    tasks.value.push({
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      priority,
      dueDate,
      done: false,
      createdAt: Date.now()
    })
  }

  function updateTask(id, changes) {
    const task = tasks.value.find((t) => t.id === id)
    if (task) Object.assign(task, changes)
  }

  function toggleTask(id) {
    const task = tasks.value.find((t) => t.id === id)
    if (task) task.done = !task.done
  }

  function removeTask(id) {
    tasks.value = tasks.value.filter((t) => t.id !== id)
  }

  function clearCompleted() {
    tasks.value = tasks.value.filter((t) => !t.done)
  }

  return {
    tasks, filter, search,
    total, doneCount, activeCount, progress, filteredTasks,
    addTask, updateTask, toggleTask, removeTask, clearCompleted
  }
})
