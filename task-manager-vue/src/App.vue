<script>
import TaskForm from './components/TaskForm.vue'
import TaskFilters from './components/TaskFilters.vue'
import TaskStats from './components/TaskStats.vue'
import TaskItem from './components/TaskItem.vue'
import { STORAGE_KEY } from './constants'

export default {
  name: 'App',
  components: { TaskForm, TaskFilters, TaskStats, TaskItem },
  data() {
    return {
      tasks: [],
      search: '',
      statusFilter: 'all',
      priorityFilter: 'all',
    }
  },
  computed: {
    // Список после применения поиска и фильтров, новые задачи сверху
    filteredTasks() {
      const query = this.search.trim().toLowerCase()
      return this.tasks
        .filter((task) => {
          const matchesSearch = task.title.toLowerCase().includes(query)
          const matchesStatus =
            this.statusFilter === 'all' ||
            (this.statusFilter === 'completed') === task.completed
          const matchesPriority =
            this.priorityFilter === 'all' || task.priority === this.priorityFilter
          return matchesSearch && matchesStatus && matchesPriority
        })
        .sort((a, b) => b.createdAt - a.createdAt)
    },
    stats() {
      const completed = this.tasks.filter((t) => t.completed).length
      return {
        total: this.tasks.length,
        completed,
        active: this.tasks.length - completed,
      }
    },
    hasFilters() {
      return (
        this.search !== '' ||
        this.statusFilter !== 'all' ||
        this.priorityFilter !== 'all'
      )
    },
  },
  methods: {
    addTask({ title, description, priority }) {
      this.tasks.push({
        id: Date.now() + Math.random(),
        title,
        description,
        priority,
        completed: false,
        createdAt: Date.now(),
      })
    },
    toggleTask(id) {
      const task = this.tasks.find((t) => t.id === id)
      if (task) task.completed = !task.completed
    },
    deleteTask(id) {
      this.tasks = this.tasks.filter((t) => t.id !== id)
    },
    updateTask(id, changes) {
      const task = this.tasks.find((t) => t.id === id)
      if (task) Object.assign(task, changes)
    },
    changePriority(id, priority) {
      this.updateTask(id, { priority })
    },
    resetFilters() {
      this.search = ''
      this.statusFilter = 'all'
      this.priorityFilter = 'all'
    },
    loadTasks() {
      try {
        const saved = localStorage.getItem(STORAGE_KEY)
        this.tasks = saved ? JSON.parse(saved) : []
      } catch {
        this.tasks = []
      }
    },
    saveTasks() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.tasks))
      } catch {
        // хранилище недоступно — работаем без сохранения
      }
    },
    updateTitle() {
      document.title = this.stats.active
        ? `(${this.stats.active}) Менеджер задач`
        : 'Менеджер задач'
    },
  },
  watch: {
    // Сохраняем задачи при любом изменении, в том числе вложенном
    tasks: {
      handler() {
        this.saveTasks()
      },
      deep: true,
    },
    // Показываем число активных задач во вкладке браузера
    'stats.active'() {
      this.updateTitle()
    },
  },
  // Хук жизненного цикла №1: загрузка данных после монтирования
  mounted() {
    this.loadTasks()
    this.updateTitle()
  },
  // Хук жизненного цикла №2: финальное сохранение перед размонтированием
  beforeUnmount() {
    this.saveTasks()
  },
}
</script>

<template>
  <div class="app">
    <header class="app__header">
      <h1>Менеджер задач</h1>
      <p class="muted">Добавляйте, ищите и отмечайте выполненные дела</p>
    </header>

    <main class="app__layout">
      <aside class="app__side">
        <BasePanel>
          <template #title>Новая задача</template>
          <TaskForm @add="addTask" />
        </BasePanel>

        <BasePanel>
          <template #title>Статистика</template>
          <TaskStats
            :total="stats.total"
            :active="stats.active"
            :completed="stats.completed"
          />
        </BasePanel>
      </aside>

      <section class="app__content">
        <BasePanel>
          <template #title>Мои задачи</template>

          <TaskFilters
            v-model:search="search"
            v-model:status="statusFilter"
            v-model:priority="priorityFilter"
            @reset="resetFilters"
          />

          <ul v-if="filteredTasks.length" class="task-list">
            <li v-for="task in filteredTasks" :key="task.id">
              <TaskItem
                :task="task"
                @toggle="toggleTask"
                @delete="deleteTask"
                @update="updateTask"
                @change-priority="changePriority"
              />
            </li>
          </ul>

          <p v-else class="empty">
            <template v-if="tasks.length === 0">
              Задач пока нет. Добавьте первую в форме слева.
            </template>
            <template v-else-if="hasFilters">
              Ничего не найдено. Измените поиск или сбросьте фильтры.
            </template>
          </p>
        </BasePanel>
      </section>
    </main>
  </div>
</template>
