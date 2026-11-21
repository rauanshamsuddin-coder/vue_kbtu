import { reactive } from 'vue'
import { message } from 'ant-design-vue'
import { useTasksStore } from '../stores/tasks'

const emptyForm = () => ({ title: '', description: '', priority: 'medium', dueDate: null })

export function useTaskForm() {
  const store = useTasksStore()
  const form = reactive(emptyForm())

  const priorityOptions = [
    { value: 'low', label: 'Низкий' },
    { value: 'medium', label: 'Средний' },
    { value: 'high', label: 'Высокий' }
  ]

  const rules = {
    title: [
      { required: true, message: 'Введите название задачи', trigger: 'blur' },
      { min: 3, message: 'Минимум 3 символа', trigger: 'blur' }
    ]
  }

  const reset = () => Object.assign(form, emptyForm())

  // вызывается по @finish (форма уже прошла валидацию)
  function submit() {
    store.addTask({ ...form })
    message.success('Задача добавлена')
    reset()
  }

  return { form, rules, priorityOptions, submit, reset }
}
