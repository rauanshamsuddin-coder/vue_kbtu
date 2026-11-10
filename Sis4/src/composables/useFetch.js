import { ref, onMounted } from 'vue'

export function useFetch(request, { immediate = true } = {}) {
  const data = ref(null)
  const loading = ref(false)
  const error = ref(null)

  async function execute() {
    loading.value = true
    error.value = null
    try {
      const response = await request()
      data.value = response.data
    } catch (e) {
      error.value = e.userMessage || e.message
    } finally {
      loading.value = false
    }
  }

  if (immediate) onMounted(execute)

  return { data, loading, error, execute }
}
