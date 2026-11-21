import { message } from 'ant-design-vue'
import { useTasksStore } from '../stores/tasks'

const priorityMap = {
  low: { label: 'Низкий', color: 'green' },
  medium: { label: 'Средний', color: 'orange' },
  high: { label: 'Высокий', color: 'red' }
}

export function useTaskItem() {
  const store = useTasksStore()

  const priorityInfo = (p) => priorityMap[p] ?? priorityMap.medium

  const isOverdue = (task) =>
    !task.done && !!task.dueDate && task.dueDate < new Date().toISOString().slice(0, 10)

  function rename(task, title) {
    if (title.trim().length < 3) return message.warning('Минимум 3 символа')
    store.updateTask(task.id, { title: title.trim() })
  }

  function remove(task) {
    store.removeTask(task.id)
    message.info('Задача удалена')
  }

  return { priorityInfo, isOverdue, rename, remove, toggle: store.toggleTask }
}
