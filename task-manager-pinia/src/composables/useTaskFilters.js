import { storeToRefs } from 'pinia'
import { useTasksStore } from '../stores/tasks'

export function useTaskFilters() {
  const store = useTasksStore()
  const { filter, search } = storeToRefs(store)

  const filterOptions = [
    { value: 'all', label: 'Все' },
    { value: 'active', label: 'Активные' },
    { value: 'done', label: 'Выполненные' }
  ]

  function resetFilters() {
    filter.value = 'all'
    search.value = ''
  }

  return { filter, search, filterOptions, resetFilters }
}
