import { ref, watch } from 'vue'

// Реактивная переменная, которая автоматически сохраняется в localStorage
export function useLocalStorage(key, initialValue) {
  let start = initialValue
  try {
    const raw = localStorage.getItem(key)
    if (raw) start = JSON.parse(raw)
  } catch {
    // повреждённые данные — используем значение по умолчанию
  }

  const state = ref(start)

  watch(
    state,
    (value) => {
      try {
        localStorage.setItem(key, JSON.stringify(value))
      } catch {
        // хранилище недоступно
      }
    },
    { deep: true }
  )

  return state
}
